'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MouseBeam } from './MouseBeam'
import { GradientCanvas } from './GradientCanvas'
import { ScrollReveal } from './ScrollReveal'
import { SkipButton } from './SkipButton'

interface IntroExperienceProps {
  onComplete: () => void
}

export function IntroExperience({ onComplete }: IntroExperienceProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<number>(0)
  const currentScrollRef = useRef<number>(0)

  // Total scroll distance (in pixels) to complete intro
  const TOTAL_SCROLL_DISTANCE = typeof window !== 'undefined' ? window.innerHeight * 3 : 3000

  const completeIntro = useCallback(() => {
    setIsComplete(true)

    // Fade out and complete
    setTimeout(() => {
      document.body.style.overflow = ''
      onComplete()
    }, 1200)
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
      // Skip to end immediately for users who prefer reduced motion
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
        }, 1000) // Hold for 1 second at 100%
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

      // Accumulate scroll
      currentScrollRef.current += delta * 2 // Multiply for better sensitivity

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
        }, 1000)
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
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {/* Background Layer - Pure black or animated gradient */}
          <div className="absolute inset-0 bg-black z-0" />

          {/* Gradient Canvas - Reveals as user scrolls */}
          {scrollProgress > 0 && (
            <div className="absolute inset-0 z-5">
              <GradientCanvas progress={scrollProgress} />
            </div>
          )}

          {/* Mouse Beam Effect - Active in Stage 1 (before scrolling starts) */}
          <MouseBeam isActive={scrollProgress < 0.5} />

          {/* Logo and Text Messages */}
          <ScrollReveal scrollProgress={scrollProgress} />

          {/* Skip Button */}
          <SkipButton onSkip={handleSkip} />

          {/* Accessibility announcement */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {scrollProgress === 0 && 'Welcome to OloSoma. Scroll to explore our introduction, or press Escape to skip.'}
            {scrollProgress >= 1 && 'Introduction complete. Loading main content.'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
