'use client'

import { useEffect, useState } from 'react'

interface GyroscopeData {
  tiltX: number // -15 to 15 degrees
  tiltY: number // -15 to 15 degrees
  isSupported: boolean
}

export function useGyroscope(maxTilt: number = 15): GyroscopeData {
  const [gyroData, setGyroData] = useState<GyroscopeData>({
    tiltX: 0,
    tiltY: 0,
    isSupported: false,
  })

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Check if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isMobile) return

    let isSupported = false

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return

      // Beta: front-to-back tilt (-180 to 180)
      // Gamma: left-to-right tilt (-90 to 90)

      // Normalize to -maxTilt to maxTilt range
      let tiltX = Math.max(-maxTilt, Math.min(maxTilt, event.gamma))
      let tiltY = Math.max(-maxTilt, Math.min(maxTilt, event.beta - 90)) // Adjust for portrait mode

      setGyroData({
        tiltX,
        tiltY,
        isSupported: true,
      })
    }

    // Request permission for iOS 13+
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission()
          if (permission === 'granted') {
            isSupported = true
            window.addEventListener('deviceorientation', handleOrientation, { passive: true })
          }
        } catch (error) {
          console.warn('Device orientation permission denied')
        }
      } else {
        // Non-iOS or older iOS
        isSupported = true
        window.addEventListener('deviceorientation', handleOrientation, { passive: true })
      }

      setGyroData(prev => ({ ...prev, isSupported }))
    }

    requestPermission()

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [maxTilt])

  return gyroData
}
