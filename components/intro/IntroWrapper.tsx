'use client'

import { ReactNode, useEffect, useState } from 'react'
import { IntroExperience } from './IntroExperience'
import { LightBeamExperience } from './LightBeamExperience'
import { useIntroSession } from '@/hooks/useIntroSession'
import { AnimatePresence, motion } from 'framer-motion'

interface IntroWrapperProps {
  children: ReactNode
}

export function IntroWrapper({ children }: IntroWrapperProps) {
  const { shouldShowIntro, isLoading, markIntroAsSeen } = useIntroSession()
  const [introMode, setIntroMode] = useState<'default' | 'experimental'>('default')

  // Check for experimental intro query parameter
  useEffect(() => {
    if (typeof window === 'undefined') return

    const searchParams = new URLSearchParams(window.location.search)
    const mode = searchParams.get('intro')

    if (mode === 'experimental') {
      setIntroMode('experimental')
      console.log('🌟 Experimental Light Beam Intro activated')
    } else {
      setIntroMode('default')
    }
  }, [])

  const handleIntroComplete = () => {
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
      {/* Intro Experience - Conditional based on mode */}
      {shouldShowIntro && introMode === 'default' && (
        <IntroExperience onComplete={handleIntroComplete} />
      )}

      {shouldShowIntro && introMode === 'experimental' && (
        <LightBeamExperience onComplete={handleIntroComplete} />
      )}

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
