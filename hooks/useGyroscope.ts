'use client'

import { useEffect, useState } from 'react'

interface GyroscopePosition {
  x: number // 0 to 100 (percentage)
  y: number // 0 to 100 (percentage)
  isSupported: boolean
}

export function useGyroscope() {
  const [position, setPosition] = useState<GyroscopePosition>({
    x: 50,
    y: 50,
    isSupported: false
  })

  useEffect(() => {
    // Check if DeviceOrientation is supported
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) {
      return
    }

    // Request permission on iOS 13+
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission()
          if (permission !== 'granted') {
            return
          }
        } catch (error) {
          console.warn('Gyroscope permission denied:', error)
          return
        }
      }

      setPosition(prev => ({ ...prev, isSupported: true }))
    }

    requestPermission()

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) return

      // gamma: left/right tilt (-90 to 90)
      // beta: front/back tilt (-180 to 180)

      // Map gamma to X position (0 to 100)
      // gamma: -90 (left) to 90 (right)
      const x = Math.max(0, Math.min(100, ((event.gamma + 90) / 180) * 100))

      // Map beta to Y position (0 to 100)
      // beta: -90 (back) to 90 (forward), normalize around 0
      const normalizedBeta = Math.max(-90, Math.min(90, event.beta))
      const y = Math.max(0, Math.min(100, ((normalizedBeta + 90) / 180) * 100))

      setPosition({ x, y, isSupported: true })
    }

    window.addEventListener('deviceorientation', handleOrientation)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  return position
}
