'use client'

import { useEffect, useState } from 'react'

export function useIntroSession() {
  const [shouldShowIntro, setShouldShowIntro] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if intro has been seen this session
    const introSeen = sessionStorage.getItem('olosoma-intro-seen')

    if (!introSeen) {
      setShouldShowIntro(true)
    }

    setIsLoading(false)
  }, [])

  const markIntroAsSeen = () => {
    sessionStorage.setItem('olosoma-intro-seen', 'true')
    setShouldShowIntro(false)
  }

  return { shouldShowIntro, isLoading, markIntroAsSeen }
}
