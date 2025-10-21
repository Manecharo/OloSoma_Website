'use client'

import { useEffect, useState } from 'react'

export function useIntroSession() {
  // Always show intro on every page load
  const [shouldShowIntro, setShouldShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Always show intro - no session check
    setShouldShowIntro(true)
    setIsLoading(false)
  }, [])

  const markIntroAsSeen = () => {
    // Intro completes but doesn't persist - will show again on next visit
    setShouldShowIntro(false)
  }

  return { shouldShowIntro, isLoading, markIntroAsSeen }
}
