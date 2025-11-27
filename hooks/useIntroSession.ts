'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const INTRO_SESSION_KEY = 'olosoma_intro_seen'

export function useIntroSession() {
  const [shouldShowIntro, setShouldShowIntro] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Only show intro on home page
    if (pathname !== '/') {
      setShouldShowIntro(false)
      setIsLoading(false)
      return
    }

    // Check sessionStorage to see if intro was already shown this session
    const hasSeenIntro = sessionStorage.getItem(INTRO_SESSION_KEY) === 'true'

    if (hasSeenIntro) {
      setShouldShowIntro(false)
    } else {
      setShouldShowIntro(true)
    }
    setIsLoading(false)
  }, [pathname])

  const markIntroAsSeen = () => {
    // Store in sessionStorage so intro won't show again this session
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true')
    setShouldShowIntro(false)
  }

  return { shouldShowIntro, isLoading, markIntroAsSeen }
}
