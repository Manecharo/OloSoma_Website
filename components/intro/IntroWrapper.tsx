'use client'

import { ReactNode } from 'react'
import { IntroExperience } from './IntroExperience'
import { useIntroSession } from '@/hooks/useIntroSession'
import { AnimatePresence, motion } from 'framer-motion'

interface IntroWrapperProps {
  children: ReactNode
}

export function IntroWrapper({ children }: IntroWrapperProps) {
  const { shouldShowIntro, isLoading, markIntroAsSeen } = useIntroSession()

  console.log('[IntroWrapper] shouldShowIntro:', shouldShowIntro, 'isLoading:', isLoading)

  const handleIntroComplete = () => {
    console.log('[IntroWrapper] Intro completed, marking as seen')
    markIntroAsSeen()
  }

  // Show nothing while checking session
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-[9999]" />
    )
  }

  return (
    <>
      {/* Intro Experience */}
      {shouldShowIntro && <IntroExperience onComplete={handleIntroComplete} />}

      {/* Main Content - Hidden during intro, fades in after */}
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
