'use client'

import { motion } from 'framer-motion'

interface SkipButtonProps {
  onSkip: () => void
}

export function SkipButton({ onSkip }: SkipButtonProps) {
  return (
    <div
      className="fixed top-8 left-0 right-0 z-50"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}
    >
      <motion.button
        onClick={onSkip}
        className="group"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: 'easeOut' }}
        whileHover={{ y: 2 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Skip introduction"
        style={{
          pointerEvents: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <span
            className="text-sm text-white/80 tracking-[0.3em] font-light relative uppercase"
            style={{
              textShadow: '0 0 20px rgba(98, 191, 164, 0.6)',
              textAlign: 'center',
              display: 'block'
            }}
          >
            Skip Intro
            <span
              className="absolute h-px bg-[#62bfa4] transition-all duration-300 group-hover:w-full"
              style={{
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0
              }}
            />
          </span>
        </div>
      </motion.button>
    </div>
  )
}
