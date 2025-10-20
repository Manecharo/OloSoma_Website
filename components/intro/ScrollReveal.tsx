'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ScrollRevealProps {
  scrollProgress: number // 0 to 1
}

const messages = [
  { range: [0, 0.25], text: 'Transforming vision into tangible reality.' },
  { range: [0.25, 0.5], text: 'Multidisciplinary expertise. Timeless impact.' },
  { range: [0.5, 0.75], text: 'Architecture • Design • Strategy • Communications' },
  { range: [0.75, 1], text: 'We are OloSoma.' },
]

export function ScrollReveal({ scrollProgress }: ScrollRevealProps) {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null)

  useEffect(() => {
    // Determine which message to show based on scroll progress
    const activeMessage = messages.find(
      (msg) => scrollProgress >= msg.range[0] && scrollProgress < msg.range[1]
    )

    if (activeMessage) {
      setCurrentMessage(activeMessage.text)
    } else if (scrollProgress >= 1) {
      setCurrentMessage(messages[messages.length - 1].text)
    } else {
      setCurrentMessage(null)
    }
  }, [scrollProgress])

  // Calculate logo opacity based on scroll (fades out as gradient appears)
  const logoOpacity = scrollProgress < 0.1 ? 1 : Math.max(0, 1 - (scrollProgress - 0.1) / 0.2)

  // Calculate text opacity
  const textOpacity = scrollProgress > 0.1 ? Math.min(1, (scrollProgress - 0.1) / 0.1) : 0

  // Logo transitions from teal to white as gradient appears
  const logoFilter = scrollProgress > 0.1
    ? `brightness(${1 + scrollProgress * 2}) saturate(${1 - scrollProgress})`
    : 'brightness(1) saturate(1)'

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
      {/* Pulsing Logo - Stage 1 */}
      {scrollProgress < 0.3 && (
        <motion.div
          className="absolute"
          style={{ opacity: logoOpacity }}
          animate={{
            opacity: [logoOpacity * 0.4, logoOpacity * 1, logoOpacity * 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="relative w-64 h-20 md:w-80 md:h-24"
            style={{ filter: logoFilter }}
          >
            <Image
              src="/logo.svg"
              alt="OloSoma"
              fill
              priority
              className="object-contain"
            />
          </div>
        </motion.div>
      )}

      {/* Text Messages - Stage 2 */}
      {scrollProgress >= 0.1 && (
        <div className="max-w-4xl px-6 text-center">
          <AnimatePresence mode="wait">
            {currentMessage && (
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: textOpacity, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-white"
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide">
                  {currentMessage}
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle scroll indicator */}
          {scrollProgress < 0.9 && (
            <motion.div
              className="absolute bottom-16 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4, y: [0, 10, 0] }}
              transition={{
                opacity: { delay: 2, duration: 1 },
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <div className="text-white/40 text-xs tracking-widest">SCROLL</div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
