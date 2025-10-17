'use client'

import { useEffect, useRef, useState } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
  timestamp: number
}

export function useTouchRipple(color: string = 'rgba(98, 191, 164, 0.4)') {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const addRipple = (e: React.TouchEvent | React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
      timestamp: Date.now(),
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 800)
  }

  return { addRipple, containerRef }
}
