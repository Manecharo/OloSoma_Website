'use client'

import { useEffect, useRef, useState } from 'react'

interface EdgeLightProps {
  intensity?: number
  radius?: number
  color?: string
}

export function EdgeLight({
  intensity = 0.3,
  radius = 200,
  color = '#62bfa4'
}: EdgeLightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0, angle: 0, distance: 1 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Only on desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      // Only show if cursor is within radius
      if (distance > radius) {
        setPosition({ x: 0, y: 0, angle: 0, distance: 1 })
        return
      }

      // Calculate angle from center to cursor (in degrees)
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

      // Calculate normalized distance (0 = center, 1 = edge of radius)
      const normalizedDistance = Math.min(distance / radius, 1)

      // Calculate position on card edge based on angle
      const edgeX = (Math.cos(angle * Math.PI / 180) * 50) + 50 // 0-100%
      const edgeY = (Math.sin(angle * Math.PI / 180) * 50) + 50 // 0-100%

      setPosition({
        x: edgeX,
        y: edgeY,
        angle,
        distance: 1 - normalizedDistance, // Invert: closer = brighter
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [radius])

  const opacity = position.distance * intensity

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit"
      style={{
        opacity: opacity,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      {/* Edge highlight that follows cursor */}
      <div
        className="absolute w-full h-full"
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, ${color} 0%, transparent 60%)`,
          mixBlendMode: 'screen',
          transition: 'background 0.2s ease-out',
        }}
      />

      {/* Subtle border glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(${position.angle}deg,
              ${color}33 0%,
              transparent 30%
            )
          `,
          mixBlendMode: 'overlay',
          transition: 'background 0.3s ease-out',
        }}
      />
    </div>
  )
}
