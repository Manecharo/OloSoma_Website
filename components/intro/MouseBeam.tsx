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
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
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

  if (!isActive) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '60vw',
          height: '60vw',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 0.9) 0%, rgba(98, 191, 164, 0.5) 25%, rgba(98, 191, 164, 0.2) 50%, transparent 75%)',
          filter: 'blur(100px)',
        }}
        animate={{
          opacity: isMoving ? 0.9 : 0,
          scale: isMoving ? 1 : 0.8,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.15 : 1, ease: 'easeOut' },
          scale: { duration: 0.6, ease: 'easeOut' },
          left: { type: 'spring', damping: 25, stiffness: 150 },
          top: { type: 'spring', damping: 25, stiffness: 150 },
        }}
      />
    </motion.div>
  )
}
