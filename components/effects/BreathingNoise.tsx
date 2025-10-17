'use client'

import { useEffect, useRef } from 'react'

interface BreathingNoiseProps {
  opacity?: number
  speed?: number
  scale?: number
}

export function BreathingNoise({
  opacity = 0.03,
  speed = 8000,
  scale = 1.5,
}: BreathingNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    // Generate Perlin-like noise
    const generateNoise = (time: number) => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      // Use time-based seed for animation
      const seed = Math.sin(time / speed) * 1000

      for (let i = 0; i < data.length; i += 4) {
        // Generate pseudo-random noise with time variation
        const noise = Math.random() * 255
        const variation = Math.sin((i / 4 + seed) * 0.01) * 30

        const value = Math.floor(noise + variation)

        data[i] = value // R
        data[i + 1] = value // G
        data[i + 2] = value // B
        data[i + 3] = Math.random() * 50 // A (transparency)
      }

      ctx.putImageData(imageData, 0, 0)
    }

    // Animation loop
    let startTime = Date.now()
    const animate = () => {
      const currentTime = Date.now() - startTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      generateNoise(currentTime)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      setCanvasSize()
    }
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [opacity, speed, scale])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity,
        mixBlendMode: 'overlay',
        transform: `scale(${scale})`,
      }}
      aria-hidden="true"
    />
  )
}
