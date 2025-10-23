'use client'

import { useEffect, useRef, useState } from 'react'
import { getBeamState, BeamPosition } from './BeamChoreography'

interface LightBeamCanvasProps {
  scrollProgress: number
  isMobile: boolean
}

/**
 * LightBeamCanvas - Directional Cone Spotlight
 *
 * Renders a CONE/SPOTLIGHT shape (NOT circular):
 * - Sharp bright source point (minimal blur)
 * - Expanding cone radiating outward
 * - Blurred colored tips at edges (purple/magenta/pink complementary colors)
 * - Rotates to point in different directions
 */
export function LightBeamCanvas({ scrollProgress, isMobile }: LightBeamCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Handle responsive canvas sizing
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

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true
    })

    if (!ctx) return

    // High DPI support
    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`
    ctx.scale(dpr, dpr)

    const render = () => {
      const beamState = getBeamState(scrollProgress, isMobile)

      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      if (beamState.intensity <= 0) return

      // Render directional cone spotlight
      renderDirectionalCone(ctx, beamState, dimensions)

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [scrollProgress, dimensions, isMobile])

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

/**
 * Renders a directional cone/spotlight beam
 * Sharp at source, blurred with colored edges at tip
 */
function renderDirectionalCone(
  ctx: CanvasRenderingContext2D,
  beam: BeamPosition,
  dimensions: { width: number; height: number }
) {
  const { x, y, angle, size, spread, intensity, blur, isAtWaypoint } = beam

  // Convert percentage to pixels
  const sourceX = (x / 100) * dimensions.width
  const sourceY = (y / 100) * dimensions.height

  // Convert angle to radians
  const angleRad = (angle * Math.PI) / 180

  // Calculate cone endpoint
  const endX = sourceX + Math.cos(angleRad) * size
  const endY = sourceY + Math.sin(angleRad) * size

  // Cone spread (perpendicular to beam direction)
  const spreadRad = (spread * Math.PI) / 180
  const coneWidth = size * Math.tan(spreadRad / 2)

  // Perpendicular direction for cone edges
  const perpAngle = angleRad + Math.PI / 2
  const perpX = Math.cos(perpAngle)
  const perpY = Math.sin(perpAngle)

  // Cone edge points at tip
  const tip1X = endX + perpX * coneWidth
  const tip1Y = endY + perpY * coneWidth
  const tip2X = endX - perpX * coneWidth
  const tip2Y = endY - perpY * coneWidth

  // Save context for transforms
  ctx.save()

  // Layer 1: Heavily blurred outer cone - Purple/magenta complementary colors
  ctx.filter = `blur(${blur * 1.4}px)`
  renderConeGradient(
    ctx,
    sourceX, sourceY,
    tip1X, tip1Y,
    tip2X, tip2Y,
    [
      { stop: 0, color: `rgba(180, 100, 180, ${intensity * 0.02})` }, // Faint purple at source
      { stop: 0.6, color: `rgba(200, 120, 200, ${intensity * 0.15})` }, // Purple
      { stop: 0.85, color: `rgba(220, 100, 180, ${intensity * 0.12})` }, // Magenta
      { stop: 1, color: 'rgba(180, 100, 180, 0)' } // Fade out
    ]
  )

  // Layer 2: Blurred middle cone - Pink accent (#f2648b)
  ctx.filter = `blur(${blur * 0.9}px)`
  renderConeGradient(
    ctx,
    sourceX, sourceY,
    tip1X * 0.9 + sourceX * 0.1, tip1Y * 0.9 + sourceY * 0.1,
    tip2X * 0.9 + sourceX * 0.1, tip2Y * 0.9 + sourceY * 0.1,
    [
      { stop: 0, color: `rgba(242, 100, 139, ${intensity * 0.05})` }, // Pink at source (faint)
      { stop: 0.7, color: `rgba(242, 100, 139, ${intensity * 0.20})` }, // Pink
      { stop: 1, color: 'rgba(242, 100, 139, 0)' } // Fade
    ]
  )

  // Layer 3: Moderate blur - Blue transition (#64b1f2)
  ctx.filter = `blur(${blur * 0.6}px)`
  renderConeGradient(
    ctx,
    sourceX, sourceY,
    tip1X * 0.75 + sourceX * 0.25, tip1Y * 0.75 + sourceY * 0.25,
    tip2X * 0.75 + sourceX * 0.25, tip2Y * 0.75 + sourceY * 0.25,
    [
      { stop: 0, color: `rgba(100, 177, 242, ${intensity * 0.15})` }, // Blue
      { stop: 0.75, color: `rgba(100, 177, 242, ${intensity * 0.25})` },
      { stop: 1, color: 'rgba(100, 177, 242, 0)' }
    ]
  )

  // Layer 4: Core teal cone (#62bfa4) - Light blur
  ctx.filter = `blur(${blur * 0.35}px)`
  renderConeGradient(
    ctx,
    sourceX, sourceY,
    tip1X * 0.65 + sourceX * 0.35, tip1Y * 0.65 + sourceY * 0.35,
    tip2X * 0.65 + sourceX * 0.35, tip2Y * 0.65 + sourceY * 0.35,
    [
      { stop: 0, color: `rgba(98, 191, 164, ${intensity * 0.6})` }, // Teal main
      { stop: 0.6, color: `rgba(98, 191, 164, ${intensity * 0.8})` },
      { stop: 1, color: 'rgba(98, 191, 164, 0)' }
    ]
  )

  // Layer 5: Inner bright cone - Minimal blur
  ctx.filter = `blur(${blur * 0.15}px)`
  renderConeGradient(
    ctx,
    sourceX, sourceY,
    tip1X * 0.5 + sourceX * 0.5, tip1Y * 0.5 + sourceY * 0.5,
    tip2X * 0.5 + sourceX * 0.5, tip2Y * 0.5 + sourceY * 0.5,
    [
      { stop: 0, color: `rgba(200, 240, 230, ${intensity * 0.75})` }, // Bright teal-white
      { stop: 0.7, color: `rgba(140, 215, 195, ${intensity * 0.9})` },
      { stop: 1, color: 'rgba(98, 191, 164, 0)' }
    ]
  )

  // NO SOURCE CIRCLE - beam starts from gradient directly
  ctx.filter = 'none'
  ctx.restore()
}

/**
 * Render a triangular cone gradient
 * sourceX, sourceY = sharp point
 * tip1X, tip1Y = one edge of cone tip
 * tip2X, tip2Y = other edge of cone tip
 */
interface ColorStop {
  stop: number // 0-1
  color: string
}

function renderConeGradient(
  ctx: CanvasRenderingContext2D,
  sourceX: number,
  sourceY: number,
  tip1X: number,
  tip1Y: number,
  tip2X: number,
  tip2Y: number,
  colorStops: ColorStop[]
) {
  // Calculate gradient direction (from source toward midpoint of tip)
  const tipMidX = (tip1X + tip2X) / 2
  const tipMidY = (tip1Y + tip2Y) / 2

  // Create linear gradient from source to tip
  const gradient = ctx.createLinearGradient(
    sourceX, sourceY,
    tipMidX, tipMidY
  )

  colorStops.forEach(({ stop, color }) => {
    gradient.addColorStop(stop, color)
  })

  // Draw triangle (cone shape)
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.moveTo(sourceX, sourceY)
  ctx.lineTo(tip1X, tip1Y)
  ctx.lineTo(tip2X, tip2Y)
  ctx.closePath()
  ctx.fill()
}
