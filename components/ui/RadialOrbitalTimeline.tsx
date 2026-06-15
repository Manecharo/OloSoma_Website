'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ComponentType,
  type MouseEvent as ReactMouseEvent,
} from 'react'

/**
 * RadialOrbitalTimeline
 *
 * A radial, auto-rotating orbital diagram: a glowing central core with labeled
 * nodes orbiting on a ring. Clicking a node expands a card describing it and
 * surfaces its connected nodes. Auto-rotation pauses while a node is open.
 *
 * Adapted to OloSoma's existing stack (Tailwind + plain React, inline SVG icons,
 * brand teal #62bfa4) — no shadcn/lucide/cva dependencies.
 *
 * Generic and props-driven so it can visualise any small set of related steps.
 */

export interface OrbitalTimelineItem {
  id: number
  /** Short label shown under the node, e.g. "Foresight" */
  title: string
  /** Phase marker shown in the expanded card, e.g. "01" */
  phase: string
  /** Description shown in the expanded card */
  content: string
  /** Inline SVG icon component (receives className) */
  icon: ComponentType<{ className?: string }>
  /** IDs of related nodes, surfaced as quick-jump buttons in the card */
  relatedIds: number[]
}

interface RadialOrbitalTimelineProps {
  timelineData: OrbitalTimelineItem[]
  /** Optional small label rendered in the centre core */
  centerLabel?: string
}

const ACCENT = '#62bfa4'

export default function RadialOrbitalTimeline({
  timelineData,
  centerLabel = 'PROCESS',
}: RadialOrbitalTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [radius, setRadius] = useState<number>(180)
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  // Respect reduced-motion preference: stop the orbit from spinning.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Measure the square container so the orbit radius scales with the viewport.
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0
      // Leave room for the node + its label inside the box.
      setRadius(Math.max(110, width / 2 - 64))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-rotate the orbit unless paused, a node is open, or reduced-motion is on.
  useEffect(() => {
    if (!autoRotate || reducedMotion || expandedId !== null) return
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)))
    }, 50)
    return () => clearInterval(timer)
  }, [autoRotate, reducedMotion, expandedId])

  const centerViewOnNode = useCallback(
    (nodeId: number) => {
      const index = timelineData.findIndex((item) => item.id === nodeId)
      if (index === -1) return
      const targetAngle = (index / timelineData.length) * 360
      setRotationAngle(270 - targetAngle)
    },
    [timelineData]
  )

  const toggleItem = useCallback(
    (id: number) => {
      setExpandedId((prev) => {
        const next = prev === id ? null : id
        if (next === null) {
          setAutoRotate(true)
        } else {
          setAutoRotate(false)
          centerViewOnNode(id)
        }
        return next
      })
    },
    [centerViewOnNode]
  )

  const handleBackgroundClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedId(null)
      setAutoRotate(true)
    }
  }

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radian = (angle * Math.PI) / 180
    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2)))
    return { x, y, zIndex, opacity }
  }

  const isRelatedToActive = (itemId: number): boolean => {
    if (expandedId === null) return false
    const active = timelineData.find((i) => i.id === expandedId)
    return active ? active.relatedIds.includes(itemId) : false
  }

  return (
    <div
      ref={containerRef}
      onClick={handleBackgroundClick}
      className="relative mx-auto aspect-square w-full max-w-[560px] select-none"
    >
      <div
        ref={orbitRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        {/* Central core */}
        <div className="absolute z-10 flex h-16 w-16 items-center justify-center">
          <div
            className={`absolute h-16 w-16 rounded-full opacity-70 ${
              reducedMotion ? '' : 'olo-orbital-pulse'
            }`}
            style={{
              background: `radial-gradient(circle, ${ACCENT}cc 0%, ${ACCENT}33 60%, transparent 75%)`,
            }}
          />
          <div
            className="absolute h-24 w-24 rounded-full border"
            style={{ borderColor: 'rgba(98,191,164,0.15)' }}
          />
          <div
            className="relative flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: ACCENT, boxShadow: `0 0 24px ${ACCENT}aa` }}
          />
          <span className="absolute top-[4.5rem] whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
            {centerLabel}
          </span>
        </div>

        {/* Orbit ring */}
        <div
          className="absolute rounded-full border"
          style={{
            width: radius * 2,
            height: radius * 2,
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        />

        {/* Nodes */}
        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length)
          const isExpanded = expandedId === item.id
          const isRelated = isRelatedToActive(item.id)
          const Icon = item.icon

          return (
            <div
              key={item.id}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
                transition: 'transform 0.7s ease, opacity 0.7s ease',
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(item.id)
                }}
                aria-expanded={isExpanded}
                aria-label={`${item.title} — phase ${item.phase}`}
                className="group relative flex flex-col items-center focus:outline-none"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 focus-visible:ring-2 ${
                    isExpanded
                      ? 'scale-110 border-[#62bfa4] bg-[#62bfa4] text-[#0a0a0a] shadow-[0_0_24px_rgba(98,191,164,0.5)]'
                      : isRelated
                        ? 'border-[#62bfa4] bg-[#62bfa4]/20 text-white'
                        : 'border-white/30 bg-[#1e1d1d]/80 text-white/80 group-hover:border-[#62bfa4]/70 group-hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`mt-2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isExpanded ? 'text-[#62bfa4]' : 'text-white/60 group-hover:text-white/90'
                  }`}
                >
                  {item.title}
                </span>
              </button>

              {isExpanded && (
                <div
                  className="absolute left-1/2 top-[4.75rem] w-64 -translate-x-1/2 rounded-lg border border-[#62bfa4]/30 bg-[#1e1d1d]/95 p-4 text-left shadow-2xl backdrop-blur-md"
                  style={{ boxShadow: '0 0 40px rgba(98,191,164,0.12)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-[#62bfa4]/50" />
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full border border-[#62bfa4]/40 px-2 py-0.5 font-mono text-[10px] tracking-widest text-[#62bfa4]">
                      PHASE {item.phase}
                    </span>
                  </div>
                  <h4 className="mb-1.5 text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs leading-relaxed text-white/70">{item.content}</p>

                  {item.relatedIds.length > 0 && (
                    <div className="mt-3 border-t border-white/10 pt-3">
                      <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/40">
                        Connects to
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.relatedIds.map((relId) => {
                          const rel = timelineData.find((i) => i.id === relId)
                          if (!rel) return null
                          return (
                            <button
                              key={relId}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleItem(relId)
                              }}
                              className="flex items-center gap-1 rounded border border-white/15 px-2 py-1 text-[10px] text-white/70 transition-colors hover:border-[#62bfa4]/60 hover:text-white"
                            >
                              {rel.title}
                              <span aria-hidden className="text-[#62bfa4]">→</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
