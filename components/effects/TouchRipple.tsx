'use client'

import { useEffect, useState, useRef } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
  timestamp: number
}

interface TouchRippleProps {
  color?: string
  duration?: number
  maxSize?: number
}

export function TouchRipple({
  color = 'rgba(98, 191, 164, 0.4)',
  duration = 800,
  maxSize = 120,
}: TouchRippleProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left
      const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x,
        y,
        timestamp: Date.now(),
      }

      setRipples(prev => [...prev, newRipple])

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, duration)
    }

    // Listen for both touch and mouse events
    container.addEventListener('touchstart', handleInteraction as EventListener, { passive: true })
    container.addEventListener('mousedown', handleInteraction as EventListener, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleInteraction as EventListener)
      container.removeEventListener('mousedown', handleInteraction as EventListener)
    }
  }, [duration])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ borderRadius: 'inherit' }}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            animation: `ripple-expand ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            width: ${maxSize}px;
            height: ${maxSize}px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
