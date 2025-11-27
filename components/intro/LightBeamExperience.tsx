'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LightBeamCanvas } from './LightBeamCanvas'
import { GridTextReveal } from './GridTextReveal'
import { SkipButton } from './SkipButton'

interface LightBeamExperienceProps {
  onComplete: () => void
}

/**
 * LightBeamExperience
 *
 * Main orchestration component for the experimental light beam intro
 * Features:
 * - Scroll-driven animation with poetic light beam movement
 * - Eclipse-inspired gradient effect
 * - 6×6 grid text reveal system
 * - Black background before first scroll
 * - Skip functionality
 */
export function LightBeamExperience({ onComplete }: LightBeamExperienceProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<number>(0)
  const currentScrollRef = useRef<number>(0)

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Total scroll distance to complete intro (3 viewport heights)
  const TOTAL_SCROLL_DISTANCE = typeof window !== 'undefined' ? window.innerHeight * 3.5 : 3500

  const completeIntro = useCallback(() => {
    setIsComplete(true)

    // Fade out and complete
    setTimeout(() => {
      document.body.style.overflow = ''
      onComplete()
    }, 1500)
  }, [onComplete])

  const handleSkip = useCallback(() => {
    // Animate to 100% quickly
    setScrollProgress(1)
    completeIntro()
  }, [completeIntro])

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Skip to end immediately for accessibility
      completeIntro()
      return
    }

    // Prevent body scroll while intro is active
    document.body.style.overflow = 'hidden'

    // Mouse wheel handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Accumulate scroll
      currentScrollRef.current += e.deltaY

      // Clamp between 0 and total
      currentScrollRef.current = Math.max(0, Math.min(TOTAL_SCROLL_DISTANCE, currentScrollRef.current))

      // Calculate progress (0 to 1)
      const progress = currentScrollRef.current / TOTAL_SCROLL_DISTANCE
      setScrollProgress(progress)

      // Complete when reaching 100%
      if (progress >= 1 && !isComplete) {
        setTimeout(() => {
          completeIntro()
        }, 1200) // Hold at 100% briefly
      }
    }

    // Touch handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()

      const touchY = e.touches[0].clientY
      const delta = touchStartRef.current - touchY

      // Accumulate scroll with sensitivity multiplier
      currentScrollRef.current += delta * 2.5

      // Clamp
      currentScrollRef.current = Math.max(0, Math.min(TOTAL_SCROLL_DISTANCE, currentScrollRef.current))

      // Calculate progress
      const progress = currentScrollRef.current / TOTAL_SCROLL_DISTANCE
      setScrollProgress(progress)

      // Update touch start for next move
      touchStartRef.current = touchY

      // Complete when reaching 100%
      if (progress >= 1 && !isComplete) {
        setTimeout(() => {
          completeIntro()
        }, 1200)
      }
    }

    // Keyboard handler (Escape to skip)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isComplete, completeIntro, handleSkip, TOTAL_SCROLL_DISTANCE])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          {/* Background - Pure black (#1e1d1d) */}
          <div
            className="absolute inset-0 z-0"
            style={{ backgroundColor: '#1e1d1d' }}
          />

          {/* Light Beam Canvas Layer - appears 1 second after logo, instantly (no fade) */}
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress < 0.08 ? 0 : 1 }}
            transition={{ duration: 0.1, delay: 1 }} // 1 second delay, instant transition
          >
            <LightBeamCanvas scrollProgress={scrollProgress} isMobile={isMobile} />
          </motion.div>

          {/* Text and Logo Reveals */}
          <GridTextReveal scrollProgress={scrollProgress} isMobile={isMobile} />

          {/* Skip Button - delayed by 3 seconds to match beam appearance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 3 }}
          >
            <SkipButton onSkip={handleSkip} />
          </motion.div>

          {/* Accessibility announcement */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {scrollProgress === 0 && 'Welcome to OloSoma. Scroll to explore our introduction, or press Escape to skip.'}
            {scrollProgress >= 1 && 'Introduction complete. Loading main content.'}
          </div>

          {/* Debug info (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed top-4 right-4 z-[10000] bg-black/80 text-white p-4 rounded text-xs font-mono">
              <div>Scroll Progress: {(scrollProgress * 100).toFixed(1)}%</div>
              <div>Mode: Light Beam (Experimental)</div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
