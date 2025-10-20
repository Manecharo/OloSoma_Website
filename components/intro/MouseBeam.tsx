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
      {/* Multiple layered spotlight for extreme detail and depth */}

      {/* Core - Brightest center */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '200px',
          height: '200px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 1) 0%, rgba(98, 191, 164, 0.9) 15%, rgba(98, 191, 164, 0.6) 40%, transparent 100%)',
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: isMoving ? 1 : 0,
          scale: isMoving ? 1 : 0.8,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.1 : 1, ease: 'easeOut' },
          scale: { duration: 0.5, ease: 'easeOut' },
        }}
      />

      {/* Inner glow layer 1 */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 0.85) 0%, rgba(98, 191, 164, 0.7) 10%, rgba(98, 191, 164, 0.45) 30%, rgba(98, 191, 164, 0.2) 60%, transparent 100%)',
          filter: 'blur(35px)',
        }}
        animate={{
          opacity: isMoving ? 0.95 : 0,
          scale: isMoving ? 1 : 0.85,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.12 : 1, ease: 'easeOut' },
          scale: { duration: 0.6, ease: 'easeOut' },
        }}
      />

      {/* Inner glow layer 2 */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 0.75) 0%, rgba(98, 191, 164, 0.55) 12%, rgba(98, 191, 164, 0.35) 35%, rgba(98, 191, 164, 0.15) 65%, transparent 100%)',
          filter: 'blur(50px)',
        }}
        animate={{
          opacity: isMoving ? 0.9 : 0,
          scale: isMoving ? 1 : 0.9,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.15 : 1.05, ease: 'easeOut' },
          scale: { duration: 0.65, ease: 'easeOut' },
        }}
      />

      {/* Middle layer 1 */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '900px',
          height: '900px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 0.65) 0%, rgba(98, 191, 164, 0.45) 15%, rgba(98, 191, 164, 0.28) 40%, rgba(98, 191, 164, 0.12) 70%, transparent 100%)',
          filter: 'blur(70px)',
        }}
        animate={{
          opacity: isMoving ? 0.85 : 0,
          scale: isMoving ? 1 : 0.92,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.18 : 1.1, ease: 'easeOut' },
          scale: { duration: 0.7, ease: 'easeOut' },
        }}
      />

      {/* Middle layer 2 */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '1200px',
          height: '1200px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 0.55) 0%, rgba(98, 191, 164, 0.38) 18%, rgba(98, 191, 164, 0.22) 45%, rgba(98, 191, 164, 0.1) 75%, transparent 100%)',
          filter: 'blur(90px)',
        }}
        animate={{
          opacity: isMoving ? 0.8 : 0,
          scale: isMoving ? 1 : 0.94,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.2 : 1.15, ease: 'easeOut' },
          scale: { duration: 0.75, ease: 'easeOut' },
        }}
      />

      {/* Outer layer 1 */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '1600px',
          height: '1600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 0.45) 0%, rgba(98, 191, 164, 0.3) 20%, rgba(98, 191, 164, 0.18) 50%, rgba(98, 191, 164, 0.08) 78%, transparent 100%)',
          filter: 'blur(110px)',
        }}
        animate={{
          opacity: isMoving ? 0.75 : 0,
          scale: isMoving ? 1 : 0.96,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.22 : 1.2, ease: 'easeOut' },
          scale: { duration: 0.8, ease: 'easeOut' },
        }}
      />

      {/* Outer layer 2 */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '2000px',
          height: '2000px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 0.38) 0%, rgba(98, 191, 164, 0.24) 22%, rgba(98, 191, 164, 0.14) 52%, rgba(98, 191, 164, 0.06) 80%, transparent 100%)',
          filter: 'blur(130px)',
        }}
        animate={{
          opacity: isMoving ? 0.7 : 0,
          scale: isMoving ? 1 : 0.97,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.25 : 1.25, ease: 'easeOut' },
          scale: { duration: 0.85, ease: 'easeOut' },
        }}
      />

      {/* Far outer layer 1 */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '2500px',
          height: '2500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 0.3) 0%, rgba(98, 191, 164, 0.18) 25%, rgba(98, 191, 164, 0.1) 55%, rgba(98, 191, 164, 0.04) 82%, transparent 100%)',
          filter: 'blur(150px)',
        }}
        animate={{
          opacity: isMoving ? 0.65 : 0,
          scale: isMoving ? 1 : 0.98,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.28 : 1.3, ease: 'easeOut' },
          scale: { duration: 0.9, ease: 'easeOut' },
        }}
      />

      {/* Far outer layer 2 */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '3000px',
          height: '3000px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 0.25) 0%, rgba(98, 191, 164, 0.14) 28%, rgba(98, 191, 164, 0.08) 58%, rgba(98, 191, 164, 0.03) 85%, transparent 100%)',
          filter: 'blur(170px)',
        }}
        animate={{
          opacity: isMoving ? 0.6 : 0,
          scale: isMoving ? 1 : 0.98,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.3 : 1.35, ease: 'easeOut' },
          scale: { duration: 0.95, ease: 'easeOut' },
        }}
      />

      {/* Extreme outer layer - subtle atmosphere */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '60vw',
          height: '60vw',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(98, 191, 164, 0.2) 0%, rgba(98, 191, 164, 0.1) 30%, rgba(98, 191, 164, 0.05) 60%, rgba(98, 191, 164, 0.02) 88%, transparent 100%)',
          filter: 'blur(200px)',
        }}
        animate={{
          opacity: isMoving ? 0.55 : 0,
          scale: isMoving ? 1 : 0.99,
        }}
        transition={{
          opacity: { duration: isMoving ? 0.32 : 1.4, ease: 'easeOut' },
          scale: { duration: 1, ease: 'easeOut' },
        }}
      />
    </motion.div>
  )
}
