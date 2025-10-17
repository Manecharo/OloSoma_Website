'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

interface UseCursorTrailOptions {
  particleCount?: number
  particleSize?: number
  particleLife?: number
  color?: string
  enabled?: boolean
}

export function useCursorTrail(options: UseCursorTrailOptions = {}) {
  const {
    particleCount = 8, // Increased from 3 to 8 (added 5 particles)
    particleSize = 2,
    particleLife = 1500,
    color = '#62bfa4',
    enabled = true,
  } = options

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  const lastSpawnRef = useRef<number>(0)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !enabled) return

    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '9999'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)
    canvasRef.current = canvas

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      const now = Date.now()
      if (now - lastSpawnRef.current > 60) { // Much slower spawn rate for fluid trail
        lastSpawnRef.current = now

        // Create new particle
        const particle: Particle = {
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.15, // Very slow, fluid movement
          vy: (Math.random() - 0.5) * 0.15,
          life: particleLife,
          maxLife: particleLife,
          size: particleSize + Math.random() * 0.5,
        }
        particlesRef.current.push(particle)

        // Limit particle count
        if (particlesRef.current.length > particleCount) {
          particlesRef.current.shift()
        }
      }
    }

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update particle
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 16 // Decrease life based on frame time

        // Remove dead particles
        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1)
          return
        }

        // Calculate opacity - 40% reduction from 0.21 = 0.126 (about 18% of original)
        const opacity = (particle.life / particle.maxLife) * 0.126

        // Draw ultra-soft glow only (no hard core)
        ctx.save()
        ctx.globalAlpha = opacity

        // Ultra-soft gradient glow - larger and more diffused
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 10 // Much larger, softer glow
        )
        gradient.addColorStop(0, color)
        gradient.addColorStop(0.2, color)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.fillRect(
          particle.x - particle.size * 10,
          particle.y - particle.size * 10,
          particle.size * 20,
          particle.size * 20
        )

        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (canvasRef.current) {
        document.body.removeChild(canvasRef.current)
      }
    }
  }, [enabled, particleCount, particleSize, particleLife, color])

  return null
}
