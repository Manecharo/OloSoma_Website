'use client'

import { useGyroscope } from '@/lib/hooks/useGyroscope'
import { ReactNode, CSSProperties } from 'react'

interface GyroscopeParallaxProps {
  children: ReactNode
  intensity?: number
  ambientLight?: boolean
  className?: string
}

export function GyroscopeParallax({
  children,
  intensity = 1,
  ambientLight = true,
  className = '',
}: GyroscopeParallaxProps) {
  const { tiltX, tiltY, isSupported } = useGyroscope(15)

  if (!isSupported) {
    return <div className={className}>{children}</div>
  }

  // Calculate parallax offset (subtle 2-3px movement)
  const offsetX = (tiltX / 15) * 3 * intensity
  const offsetY = (tiltY / 15) * 3 * intensity

  // Calculate ambient light position based on tilt
  const lightX = 50 + (tiltX / 15) * 10 // 40-60%
  const lightY = 50 + (tiltY / 15) * 10 // 40-60%

  const style: CSSProperties = {
    transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }

  const lightStyle: CSSProperties = ambientLight
    ? {
        background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(98, 191, 164, 0.08) 0%, transparent 50%)`,
        transition: 'background 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }
    : {}

  return (
    <div className={`relative ${className}`}>
      {ambientLight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={lightStyle}
          aria-hidden="true"
        />
      )}
      <div style={style}>{children}</div>
    </div>
  )
}
