'use client'

import { useEffect, useRef, useState } from 'react'

interface TextShimmerProps {
  children: string
  className?: string
  radius?: number
  intensity?: number
}

export function TextShimmer({
  children,
  className = '',
  radius = 80,
  intensity = 0.3,
}: TextShimmerProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Only on desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Split text into characters
  const characters = children.split('')

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {characters.map((char, index) => (
        <TextChar
          key={index}
          char={char}
          mousePos={mousePos}
          radius={radius}
          intensity={intensity}
        />
      ))}
    </span>
  )
}

interface TextCharProps {
  char: string
  mousePos: { x: number; y: number }
  radius: number
  intensity: number
}

function TextChar({ char, mousePos, radius, intensity }: TextCharProps) {
  const charRef = useRef<HTMLSpanElement>(null)
  const [brightness, setBrightness] = useState(0)

  useEffect(() => {
    if (!charRef.current) return

    const rect = charRef.current.getBoundingClientRect()
    const charX = rect.left + rect.width / 2
    const charY = rect.top + rect.height / 2

    const deltaX = mousePos.x - charX
    const deltaY = mousePos.y - charY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance < radius) {
      const proximity = 1 - distance / radius
      setBrightness(proximity * intensity)
    } else {
      setBrightness(0)
    }
  }, [mousePos, radius, intensity])

  return (
    <span
      ref={charRef}
      className="inline-block transition-all duration-300 ease-out"
      style={{
        filter: `brightness(${1 + brightness}) blur(${brightness > 0 ? -0.5 : 0}px)`,
        textShadow: brightness > 0.1 ? `0 0 ${brightness * 20}px rgba(98, 191, 164, ${brightness})` : 'none',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  )
}
