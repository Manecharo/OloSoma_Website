'use client'

import { useEffect, useState } from 'react'

export function useIntroSession() {
  // Default to true to avoid flash, will be corrected in useEffect if needed
  const [shouldShowIntro, setShouldShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if intro has been seen this session
    const introSeen = sessionStorage.getItem('olosoma-intro-seen')

    if (introSeen) {
      // Intro was already seen, hide it
      setShouldShowIntro(false)
    }

    setIsLoading(false)
  }, [])

  const markIntroAsSeen = () => {
    sessionStorage.setItem('olosoma-intro-seen', 'true')
    setShouldShowIntro(false)
  }

  return { shouldShowIntro, isLoading, markIntroAsSeen }
}
