'use client'

import { useEffect, useRef, useState } from 'react'

interface MorphingLightCanvasProps {
  scrollProgress: number
}

/**
 * MorphingLightCanvas - Deforming organic light shapes
 *
 * Creates fluid, morphing gradient lights that respond to scroll
 * Shapes transform from circles to organic blobs to angular forms
 */
export function MorphingLightCanvas({ scrollProgress }: MorphingLightCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const timeRef = useRef(0)
  const animationFrameRef = useRef<number>()

  // Responsive canvas sizing
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    // High DPI support
    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`
    ctx.scale(dpr, dpr)

    const render = (time: number) => {
      timeRef.current = (time / 1000) * 2 // Convert to seconds and 2x speed

      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Generate multiple morphing shapes with continuous movement
      const scrollOffset = scrollProgress * 200 // Shapes move with scroll

      // Primary teal shapes - dominant color
      renderMorphingShape(ctx, {
        centerX: dimensions.width * 0.15 + Math.sin(timeRef.current * 0.1) * 100,
        centerY: dimensions.height * 0.25 + Math.cos(timeRef.current * 0.15) * 80 - scrollOffset,
        baseRadius: 400 + Math.sin(timeRef.current * 0.2) * 60,
        scrollProgress,
        time: timeRef.current,
        colorStops: [
          { offset: 0, color: 'rgba(98, 191, 164, 0.7)' }, // Teal - main color
          { offset: 0.5, color: 'rgba(98, 191, 164, 0.5)' }, // Teal - main color
          { offset: 0.8, color: 'rgba(242, 100, 139, 0.15)' }, // Pink - subtle detail
          { offset: 1, color: 'rgba(98, 191, 164, 0.1)' }
        ],
        morphSpeed: 0.4,
        shapeVariation: 1
      })

      renderMorphingShape(ctx, {
        centerX: dimensions.width * 0.75 + Math.cos(timeRef.current * 0.12) * 120,
        centerY: dimensions.height * 0.5 + Math.sin(timeRef.current * 0.18) * 100 + scrollOffset * 0.5,
        baseRadius: 450 + Math.cos(timeRef.current * 0.25) * 70,
        scrollProgress,
        time: timeRef.current + 2.5,
        colorStops: [
          { offset: 0, color: 'rgba(98, 191, 164, 0.8)' }, // Teal - main color
          { offset: 0.4, color: 'rgba(98, 191, 164, 0.6)' }, // Teal - main color
          { offset: 0.7, color: 'rgba(100, 177, 242, 0.2)' }, // Blue - subtle detail
          { offset: 1, color: 'rgba(98, 191, 164, 0.15)' }
        ],
        morphSpeed: 0.5,
        shapeVariation: 2
      })

      renderMorphingShape(ctx, {
        centerX: dimensions.width * 0.45 + Math.sin(timeRef.current * 0.15) * 90,
        centerY: dimensions.height * 0.75 + Math.cos(timeRef.current * 0.2) * 70 + scrollOffset,
        baseRadius: 380 + Math.sin(timeRef.current * 0.3) * 50,
        scrollProgress,
        time: timeRef.current + 5,
        colorStops: [
          { offset: 0, color: 'rgba(98, 191, 164, 0.65)' }, // Teal - main color
          { offset: 0.5, color: 'rgba(98, 191, 164, 0.45)' }, // Teal - main color
          { offset: 0.85, color: 'rgba(180, 100, 200, 0.15)' }, // Purple - subtle detail
          { offset: 1, color: 'rgba(98, 191, 164, 0.1)' }
        ],
        morphSpeed: 0.6,
        shapeVariation: 3
      })

      // Additional floating shape - teal dominant
      renderMorphingShape(ctx, {
        centerX: dimensions.width * 0.85 + Math.cos(timeRef.current * 0.08) * 60,
        centerY: dimensions.height * 0.15 + Math.sin(timeRef.current * 0.11) * 50 - scrollOffset * 0.8,
        baseRadius: 320 + Math.sin(timeRef.current * 0.18) * 40,
        scrollProgress,
        time: timeRef.current + 7.5,
        colorStops: [
          { offset: 0, color: 'rgba(98, 191, 164, 0.6)' }, // Teal - main color
          { offset: 0.6, color: 'rgba(98, 191, 164, 0.4)' }, // Teal - main color
          { offset: 0.9, color: 'rgba(100, 177, 242, 0.12)' }, // Blue - subtle detail
          { offset: 1, color: 'rgba(98, 191, 164, 0.08)' }
        ],
        morphSpeed: 0.35,
        shapeVariation: 4
      })

      animationFrameRef.current = requestAnimationFrame(render)
    }

    animationFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions, scrollProgress])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        willChange: 'transform',
        pointerEvents: 'none'
      }}
    />
  )
}

interface MorphingShapeParams {
  centerX: number
  centerY: number
  baseRadius: number
  scrollProgress: number
  time: number
  colorStops: Array<{ offset: number; color: string }>
  morphSpeed: number
  shapeVariation: number
}

function renderMorphingShape(ctx: CanvasRenderingContext2D, params: MorphingShapeParams) {
  const { centerX, centerY, baseRadius, scrollProgress, time, colorStops, morphSpeed, shapeVariation } = params

  // Calculate shape deformation based on scroll and time
  const deformAmount = 0.3 + scrollProgress * 0.4
  const points = 8 + Math.floor(scrollProgress * 4) // More complex shapes as you scroll

  // Create organic blob shape
  ctx.save()
  ctx.filter = `blur(${60 + scrollProgress * 40}px)`

  // Build path with noise-based deformation
  ctx.beginPath()
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2

    // Multi-layered noise for organic movement
    const noise1 = Math.sin(angle * 3 + time * morphSpeed) * deformAmount
    const noise2 = Math.cos(angle * 5 - time * morphSpeed * 0.7) * deformAmount * 0.5
    const noise3 = Math.sin(angle * 2 + time * morphSpeed * 1.3 + shapeVariation) * deformAmount * 0.3

    const radiusVariation = baseRadius * (1 + noise1 + noise2 + noise3)

    const x = centerX + Math.cos(angle) * radiusVariation
    const y = centerY + Math.sin(angle) * radiusVariation

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      // Smooth curves between points
      const prevAngle = ((i - 1) / points) * Math.PI * 2
      const prevNoise1 = Math.sin(prevAngle * 3 + time * morphSpeed) * deformAmount
      const prevNoise2 = Math.cos(prevAngle * 5 - time * morphSpeed * 0.7) * deformAmount * 0.5
      const prevNoise3 = Math.sin(prevAngle * 2 + time * morphSpeed * 1.3 + shapeVariation) * deformAmount * 0.3
      const prevRadius = baseRadius * (1 + prevNoise1 + prevNoise2 + prevNoise3)

      const prevX = centerX + Math.cos(prevAngle) * prevRadius
      const prevY = centerY + Math.sin(prevAngle) * prevRadius

      const cpX = (prevX + x) / 2
      const cpY = (prevY + y) / 2

      ctx.quadraticCurveTo(prevX, prevY, cpX, cpY)
    }
  }
  ctx.closePath()

  // Create radial gradient
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius)
  colorStops.forEach(stop => gradient.addColorStop(stop.offset, stop.color))

  ctx.fillStyle = gradient
  ctx.fill()

  ctx.restore()
}
