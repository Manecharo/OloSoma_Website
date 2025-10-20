'use client'

import { useEffect, useRef, useState } from 'react'

interface GradientCanvasProps {
  progress: number // 0 to 1
}

export function GradientCanvas({ progress }: GradientCanvasProps) {
  const [rotation, setRotation] = useState(0)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    // Animate rotation very slowly
    const animate = () => {
      setRotation((prev) => (prev + 0.05) % 360)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Calculate opacity based on progress
  const opacity = Math.min(1, progress * 1.2)

  return (
    <div
      className="fixed inset-0 w-full h-full"
      style={{
        opacity,
        transform: `rotate(${rotation * 0.1}deg) scale(${1 + rotation * 0.0001})`,
        transition: 'opacity 0.5s ease-out',
        willChange: 'transform, opacity',
      }}
    >
      {/* Multiple layered gradients for depth and irregularity */}

      {/* Layer 1: Top-left pure black expanding */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 120% at ${20 + Math.sin(rotation * 0.01) * 5}% ${20 + Math.cos(rotation * 0.015) * 5}%,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.95) 20%,
            rgba(0, 0, 0, 0.6) 45%,
            transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Layer 2: Bottom-right 70% black with irregular shape */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 140% 100% at ${75 + Math.sin(rotation * 0.012) * 8}% ${80 + Math.cos(rotation * 0.018) * 6}%,
            rgba(26, 26, 26, 1) 0%,
            rgba(26, 26, 26, 0.9) 15%,
            rgba(26, 26, 26, 0.5) 40%,
            transparent 65%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* Layer 3: Top-right teal accent glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 100% at ${85 + Math.cos(rotation * 0.014) * 6}% ${15 + Math.sin(rotation * 0.016) * 7}%,
            rgba(98, 191, 164, 0.35) 0%,
            rgba(98, 191, 164, 0.2) 25%,
            rgba(98, 191, 164, 0.08) 45%,
            transparent 70%)`,
          filter: 'blur(120px)',
        }}
      />

      {/* Layer 4: Center-left dark gray for additional depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 110% at ${10 + Math.sin(rotation * 0.011) * 4}% ${50 + Math.cos(rotation * 0.013) * 8}%,
            rgba(15, 15, 15, 0.9) 0%,
            rgba(15, 15, 15, 0.5) 30%,
            transparent 60%)`,
          filter: 'blur(90px)',
        }}
      />

      {/* Layer 5: Bottom-left subtle teal undertone */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 90% at ${25 + Math.cos(rotation * 0.017) * 5}% ${85 + Math.sin(rotation * 0.019) * 4}%,
            rgba(98, 191, 164, 0.15) 0%,
            rgba(98, 191, 164, 0.05) 35%,
            transparent 65%)`,
          filter: 'blur(110px)',
        }}
      />

      {/* Layer 6: Additional organic noise layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at ${60 + Math.sin(rotation * 0.02) * 10}% ${40 + Math.cos(rotation * 0.022) * 12}%,
              rgba(10, 10, 10, 0.6) 0%,
              transparent 50%),
            radial-gradient(ellipse 70% 70% at ${40 + Math.cos(rotation * 0.016) * 8}% ${60 + Math.sin(rotation * 0.021) * 9}%,
              rgba(20, 20, 20, 0.5) 0%,
              transparent 55%)`,
          filter: 'blur(130px)',
        }}
      />

      {/* Final overlay for color blending */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 200% 200% at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
