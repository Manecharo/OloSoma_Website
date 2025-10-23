'use client'

import { ReactNode } from 'react'
import { LightBeamExperience } from './LightBeamExperience'
import { useIntroSession } from '@/hooks/useIntroSession'
import { motion } from 'framer-motion'

interface IntroWrapperProps {
  children: ReactNode
}

/**
 * IntroWrapper - Manages the light beam intro experience
 *
 * Displays the animated light beam intro on first visit,
 * then shows the main content. Uses session storage to remember
 * if user has seen the intro.
 */
export function IntroWrapper({ children }: IntroWrapperProps) {
  const { shouldShowIntro, isLoading, markIntroAsSeen } = useIntroSession()

  const handleIntroComplete = () => {
    markIntroAsSeen()
  }

  // Show loading screen while checking session
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-[9999]" />
    )
  }

  return (
    <>
      {/* Light Beam Intro Experience */}
      {shouldShowIntro && (
        <LightBeamExperience onComplete={handleIntroComplete} />
      )}

      {/* Main Content */}
      <motion.div
        initial={shouldShowIntro ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: shouldShowIntro ? 0 : 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ pointerEvents: shouldShowIntro ? 'none' : 'auto' }}
      >
        {children}
      </motion.div>
    </>
  )
}
