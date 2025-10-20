'use client'

import { useEffect, useRef } from 'react'

interface GradientCanvasProps {
  progress: number // 0 to 1
}

export function GradientCanvas({ progress }: GradientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Simple Perlin-like noise function
    const noise = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.01 + t) *
        Math.cos(y * 0.01 + t) *
        Math.sin((x + y) * 0.005 + t * 0.5)
      )
    }

    const animate = () => {
      if (!canvas || !ctx) return

      const width = canvas.width
      const height = canvas.height

      // Increment time very slowly for smooth animation
      timeRef.current += 0.002

      // Create gradient that reveals based on progress
      const revealAmount = progress

      // Fill base black
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, height)

      if (revealAmount > 0) {
        // Create image data for pixel manipulation
        const imageData = ctx.getImageData(0, 0, width, height)
        const data = imageData.data

        // Sample rate for performance (check every 4th pixel)
        const sampleRate = 4

        for (let y = 0; y < height; y += sampleRate) {
          for (let x = 0; x < width; x += sampleRate) {
            const index = (y * width + x) * 4

            // Calculate distance from corners for irregular gradient
            const distTopLeft = Math.sqrt(x * x + y * y) / Math.sqrt(width * width + height * height)
            const distBottomRight = Math.sqrt((width - x) ** 2 + (height - y) ** 2) / Math.sqrt(width * width + height * height)
            const distTopRight = Math.sqrt((width - x) ** 2 + y * y) / Math.sqrt(width * width + height * height)

            // Add noise for irregularity
            const noiseValue = (noise(x, y, timeRef.current) + 1) * 0.5 // Normalize to 0-1

            // Combine distances with noise for organic feel
            const gradientValue = (
              distTopLeft * 0.3 +
              distBottomRight * 0.3 +
              distTopRight * 0.2 +
              noiseValue * 0.2
            )

            // Apply feathering and progress
            const feathering = Math.pow(gradientValue, 2) // Exponential for smooth falloff
            const finalValue = feathering * revealAmount

            // Determine color based on position and noise
            let r, g, b, a

            if (gradientValue < 0.3) {
              // Pure black zone
              r = g = b = 0
              a = 255
            } else if (gradientValue < 0.6) {
              // 70% black zone (#1a1a1a)
              r = g = b = Math.floor(26 * finalValue)
              a = 255
            } else {
              // Olo teal zone (#62BFA4) at 30% opacity
              const tealStrength = Math.min(1, (gradientValue - 0.6) / 0.4) * finalValue * 0.3
              r = Math.floor(98 * tealStrength)
              g = Math.floor(191 * tealStrength)
              b = Math.floor(164 * tealStrength)
              a = Math.floor(255 * tealStrength)
            }

            // Fill the sampled area
            for (let dy = 0; dy < sampleRate && y + dy < height; dy++) {
              for (let dx = 0; dx < sampleRate && x + dx < width; dx++) {
                const i = ((y + dy) * width + (x + dx)) * 4
                // Blend with existing black
                data[i] = Math.max(data[i], r)
                data[i + 1] = Math.max(data[i + 1], g)
                data[i + 2] = Math.max(data[i + 2], b)
                data[i + 3] = 255
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0)

        // Apply blur for additional feathering
        if (revealAmount > 0.1) {
          ctx.filter = `blur(${Math.floor(20 * revealAmount)}px)`
          ctx.drawImage(canvas, 0, 0)
          ctx.filter = 'none'
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [progress])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ willChange: 'transform' }}
    />
  )
}
