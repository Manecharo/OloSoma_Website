'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGyroscope } from '@/hooks/useGyroscope'

interface MouseBeamProps {
  isActive: boolean
}

export function MouseBeam({ isActive }: MouseBeamProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [rotation, setRotation] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const animationRef = useRef<number | undefined>(undefined)
  const gyroscope = useGyroscope()

  // Initialize mouse position after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    }
  }, [])

  useEffect(() => {
    // Detect if mobile/tablet
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isActive) return

    // Desktop: Mouse movement
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        // Use exact pixel coordinates for precise centering
        setMousePosition({ x: e.clientX, y: e.clientY })
        setIsMoving(true)

        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        // Set new timeout to fade out after 1 second of no movement
        timeoutRef.current = setTimeout(() => {
          setIsMoving(false)
        }, 1000)
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [isActive, isMobile])

  // Mobile: Use gyroscope (convert percentage to pixels)
  useEffect(() => {
    if (isMobile && gyroscope.isSupported && isActive) {
      const x = (gyroscope.x / 100) * window.innerWidth
      const y = (gyroscope.y / 100) * window.innerHeight
      setMousePosition({ x, y })
      setIsMoving(true)
    }
  }, [gyroscope, isMobile, isActive])

  // Slow continuous rotation animation for directional changes
  useEffect(() => {
    if (!isActive) return

    let startTime = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000
      // Very slow rotation: complete 360° every ~30 seconds
      setRotation((elapsed * 12) % 360)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  if (!isActive) return null

  // Generate fewer, smaller layers with high quality blur for a refined beam
  const layers = []
  const totalLayers = 40

  for (let i = 0; i < totalLayers; i++) {
    const progress = i / totalLayers

    // Much smaller size range: 60px to 800px max
    const size = 60 + Math.pow(progress, 1.5) * 740

    // Moderate blur for smoothness without pixelation: 20px to 150px
    const blur = 20 + progress * 130

    // Smooth opacity gradient with 5 stops
    const opacity1 = Math.max(0, 0.9 - progress * 0.7)
    const opacity2 = Math.max(0, 0.75 - progress * 0.75)
    const opacity3 = Math.max(0, 0.55 - progress * 0.8)
    const opacity4 = Math.max(0, 0.35 - progress * 0.85)
    const opacity5 = Math.max(0, 0.18 - progress * 0.9)

    // Smooth animation timing
    const fadeInDuration = 0.1 + progress * 0.2
    const fadeOutDuration = 0.5 + progress * 0.7
    const scaleDuration = 0.3 + progress * 0.4

    // Master opacity
    const masterOpacity = Math.max(0.4, 0.85 - progress * 0.35)

    // Subtle scale variation
    const scaleFrom = 0.85 + progress * 0.1

    // Add slow directional offset based on rotation and layer
    const angle = (rotation + i * 9) * (Math.PI / 180)
    const offsetDistance = progress * 15
    const offsetX = Math.cos(angle) * offsetDistance
    const offsetY = Math.sin(angle) * offsetDistance

    layers.push(
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: mousePosition.x + offsetX,
          top: mousePosition.y + offsetY,
          width: `${size}px`,
          height: `${size}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle,
            rgba(98, 191, 164, ${opacity1}) 0%,
            rgba(98, 191, 164, ${opacity2}) ${8 + progress * 4}%,
            rgba(98, 191, 164, ${opacity3}) ${20 + progress * 8}%,
            rgba(98, 191, 164, ${opacity4}) ${40 + progress * 15}%,
            rgba(98, 191, 164, ${opacity5}) ${65 + progress * 15}%,
            transparent 100%)`,
          filter: `blur(${blur}px)`,
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        } as React.CSSProperties}
        animate={{
          opacity: isMoving ? masterOpacity : 0,
          scale: isMoving ? 1 : scaleFrom,
        }}
        transition={{
          opacity: {
            duration: isMoving ? fadeInDuration : fadeOutDuration,
            ease: [0.4, 0.0, 0.2, 1],
          },
          scale: {
            duration: scaleDuration,
            ease: [0.4, 0.0, 0.2, 1],
          },
        }}
      />
    )
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        willChange: 'opacity',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {layers}
    </motion.div>
  )
}
