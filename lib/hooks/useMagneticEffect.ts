'use client'

import { useEffect, useRef, RefObject } from 'react'
import { gsap } from 'gsap'

interface UseMagneticEffectOptions {
  strength?: number
  radius?: number
  scale?: number
  glowIntensity?: number
  enabled?: boolean
}

export function useMagneticEffect<T extends HTMLElement>(
  options: UseMagneticEffectOptions = {}
): RefObject<T | null> {
  const {
    strength = 0.3,
    radius = 100,
    scale = 1.02,
    glowIntensity = 0.1,
    enabled = true,
  } = options

  const elementRef = useRef<T>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: 0, y: 0 })
  const glowRef = useRef(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element || !enabled) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Check if desktop (avoid on mobile)
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      if (!element) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = mouseRef.current.x - centerX
      const deltaY = mouseRef.current.y - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance < radius) {
        // Calculate magnetic pull
        const pull = (radius - distance) / radius
        const moveX = deltaX * pull * strength
        const moveY = deltaY * pull * strength
        const scaleValue = 1 + (pull * (scale - 1))

        // Calculate glow intensity
        glowRef.current = pull * glowIntensity

        // Apply transformation with GSAP for smooth animation
        gsap.to(element, {
          x: moveX,
          y: moveY,
          scale: scaleValue,
          duration: 0.3,
          ease: 'power2.out',
        })

        // Apply glow effect
        const currentShadow = getComputedStyle(element).boxShadow
        const glowShadow = `0 0 ${20 + glowRef.current * 20}px rgba(98, 191, 164, ${0.15 + glowRef.current})`

        gsap.to(element, {
          boxShadow: `${currentShadow}, ${glowShadow}`,
          duration: 0.3,
        })
      } else {
        // Reset to original position
        gsap.to(element, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        })

        glowRef.current = 0
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      // Reset element
      if (element) {
        gsap.set(element, { x: 0, y: 0, scale: 1 })
      }
    }
  }, [enabled, strength, radius, scale, glowIntensity])

  return elementRef
}
