'use client'

import { useEffect, useRef, useState } from 'react'

interface GradientCanvasProps {
  progress: number // 0 to 1
}

// Blob configuration inspired by the reference image
interface Blob {
  id: number
  baseX: number
  baseY: number
  size: number
  color: string
  speed: number
  phase: number
  orbitRadius: number
}

export function GradientCanvas({ progress }: GradientCanvasProps) {
  const [time, setTime] = useState(0)
  const animationRef = useRef<number | undefined>(undefined)
  const blobsRef = useRef<Blob[]>([])

  // Initialize blobs once
  useEffect(() => {
    const blobs: Blob[] = []

    // Create 12 smaller, faster floating blobs with mixed colors
    for (let i = 0; i < 12; i++) {
      let color: string

      if (i === 0) {
        // First blob: white/light (the special one)
        color = 'rgba(240, 240, 245, 0.4)'
      } else if (i % 3 === 0) {
        // Every third blob: black/dark gray
        color = 'rgba(15, 15, 15, 0.6)'
      } else {
        // Rest: teal variations
        const tealColors = [
          'rgba(98, 191, 165, 0.66)',    // Main teal
          'rgba(72, 180, 160, 0.11)',    // Darker teal
          'rgba(120, 200, 180, 0.3)',    // Light teal
          'rgba(145, 165, 160, 0.33)',    // Medium teal
        ]
        color = tealColors[(i - 1) % tealColors.length]
      }

      blobs.push({
        id: i,
        // Distribute across canvas with some clustering
        baseX: 10 + (i % 4) * 25 + Math.random() * 15,
        baseY: 10 + Math.floor(i / 4) * 30 + Math.random() * 15,
        // Smaller sizes for better contrast with black: 250-550px
        size: 250 + Math.random() * 300,
        color,
        // Faster speeds for more dynamic movement
        speed: 0.4 + Math.random() * 0.6,
        // Random phase for varied movement
        phase: Math.random() * Math.PI * 2,
        // Orbit radius for floating movement
        orbitRadius: 4 + Math.random() * 10,
      })
    }

    blobsRef.current = blobs
  }, [])

  // Smooth animation loop
  useEffect(() => {
    let startTime = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000
      setTime(elapsed)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

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
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{
        opacity,
        transition: 'opacity 0.8s ease-out',
        willChange: 'opacity',
        background: 'radial-gradient(ellipse at center, rgba(20, 25, 22, 0.95) 0%, rgba(10, 15, 12, 1) 100%)',
      }}
    >
      {blobsRef.current.map((blob) => {
        // Calculate floating position using sine/cosine for organic movement
        const offsetX = Math.sin(time * blob.speed + blob.phase) * blob.orbitRadius
        const offsetY = Math.cos(time * blob.speed * 0.8 + blob.phase) * blob.orbitRadius

        const x = blob.baseX + offsetX
        const y = blob.baseY + offsetY

        return (
          <div
            key={blob.id}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              // High blur for maximum feathering and soft edges
              filter: `blur(${80 + blob.size * 0.15}px)`,
              willChange: 'filter',
              pointerEvents: 'none',
            }}
          />
        )
      })}

      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.3) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
