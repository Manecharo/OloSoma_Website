'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  getBeamState,
  getCurrentWaypointIndex,
  getWaypointData,
  isTextVisibleAtWaypoint
} from './BeamChoreography'

interface GridTextRevealProps {
  scrollProgress: number
  isMobile: boolean
}

/**
 * GridTextReveal - Waypoint-based text display
 *
 * Shows text at each waypoint when beam pauses
 * Text fades in when beam arrives, fades out when beam leaves
 */
export function GridTextReveal({ scrollProgress, isMobile }: GridTextRevealProps) {
  const beamState = getBeamState(scrollProgress, isMobile)
  const currentWaypointIndex = getCurrentWaypointIndex(scrollProgress)
  const waypointData = getWaypointData(currentWaypointIndex, isMobile)
  const isTextVisible = isTextVisibleAtWaypoint(scrollProgress, currentWaypointIndex)

  // Calculate text illumination based on distance from beam
  const getTextIllumination = (textX: number, textY: number): number => {
    const dx = textX - beamState.x
    const dy = textY - beamState.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Illumination radius (in percentage units) - LARGER for better visibility
    const maxDistance = 60 // Text glows when beam is within 60% distance (increased from 40)
    const illumination = Math.max(0, 1 - distance / maxDistance)

    // Apply power curve for better falloff, stronger glow
    return Math.pow(illumination, 0.5) * beamState.intensity * 1.5 // Stronger illumination
  }

  const textIllumination = waypointData
    ? getTextIllumination(waypointData.position.x, waypointData.position.y)
    : 0

  // Logo appears at final waypoint - updated range
  const logoVisible = scrollProgress >= 0.92
  const logoOpacity = Math.min(1, (scrollProgress - 0.92) / 0.08)

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      {/* Faint pulsating logo BEFORE scroll - appears immediately */}
      {scrollProgress < 0.08 && (
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{
            opacity: [0.1, 0.8, 0.1], // Fade from 10% to 80% and back
            scale: [1, 1.03, 1] // Subtle scale pulsation
          }}
          transition={{
            duration: 1.5, // Human resting heart rate ~60-80 BPM = 0.75-1s per beat
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 100 }} // On top of everything
        >
          <div className="relative w-48 h-16 md:w-64 md:h-20">
            <Image
              src="/logo.svg"
              alt="OloSoma"
              fill
              priority
              className="object-contain"
              style={{
                filter: 'brightness(10) grayscale(1)', // Pure white logo
                opacity: 0.6
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Waypoint Text - Appears at beam position */}
      <AnimatePresence mode="wait">
        {waypointData && waypointData.text && isTextVisible && (
          <motion.div
            key={currentWaypointIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="absolute"
            style={{
              left: `${waypointData.position.x}%`,
              top: `${waypointData.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="px-8 py-6 max-w-md">
              <p
                className="text-xl md:text-2xl lg:text-3xl font-light text-white text-center leading-tight whitespace-pre-line"
                style={{
                  textShadow: `0 0 ${80 * textIllumination}px rgba(98, 191, 164, ${textIllumination * 1.2}),
                               0 0 ${60 * textIllumination}px rgba(255, 255, 255, ${textIllumination * 1.0}),
                               0 0 ${120 * textIllumination}px rgba(100, 177, 242, ${textIllumination * 0.8}),
                               0 0 ${40 * textIllumination}px rgba(98, 191, 164, ${textIllumination * 1.5})`,
                  filter: `brightness(${1 + textIllumination * 2.0})`,
                  opacity: Math.max(0.4, textIllumination * 0.6 + 0.4) // Brighter base, stronger glow
                }}
              >
                {waypointData.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo - Final waypoint with heartbeat */}
      <AnimatePresence>
        {logoVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: logoOpacity, // Fade in based on scroll
              scale: 1 // No scale animation on container
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="relative w-72 h-24 md:w-96 md:h-32 lg:w-[480px] lg:h-36"
              animate={{
                scale: [1, 1.05, 1.02, 1.08, 1], // Heartbeat pattern: rest, small pulse, dip, big pulse, rest
                filter: [
                  'drop-shadow(0 0 60px rgba(98, 191, 164, 0.9)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.6))',
                  'drop-shadow(0 0 70px rgba(98, 191, 164, 1.0)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.7))',
                  'drop-shadow(0 0 65px rgba(98, 191, 164, 0.95)) drop-shadow(0 0 35px rgba(255, 255, 255, 0.65))',
                  'drop-shadow(0 0 75px rgba(98, 191, 164, 1.0)) drop-shadow(0 0 45px rgba(255, 255, 255, 0.75))',
                  'drop-shadow(0 0 60px rgba(98, 191, 164, 0.9)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.6))'
                ]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 0.8, // Pause between heartbeats
                ease: 'easeInOut',
                times: [0, 0.15, 0.25, 0.45, 0.6] // Timing for heartbeat rhythm
              }}
            >
              <Image
                src="/logo.svg"
                alt="OloSoma"
                fill
                priority
                className="object-contain"
                style={{
                  filter: 'brightness(1.5)' // Constant brightness, not scroll-based
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator - Only at very beginning */}
      {scrollProgress < 0.08 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <motion.svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(98, 191, 164, 0.8))'
            }}
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="rgba(98, 191, 164, 1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>

          <span
            className="text-sm text-white/80 tracking-[0.3em] font-light uppercase"
            style={{
              textShadow: '0 0 20px rgba(98, 191, 164, 0.6)',
              textAlign: 'center',
              display: 'block'
            }}
          >
            Scroll
          </span>
        </motion.div>
      )}
    </div>
  )
}
