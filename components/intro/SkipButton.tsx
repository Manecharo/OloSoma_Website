'use client'

import { motion } from 'framer-motion'

interface SkipButtonProps {
  onSkip: () => void
}

export function SkipButton({ onSkip }: SkipButtonProps) {
  return (
    <motion.button
      onClick={onSkip}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Skip introduction"
    >
      <span className="text-sm text-gray-400 tracking-wider font-light relative">
        Skip intro
        <span className="absolute bottom-0 left-0 w-0 h-px bg-teal-accent transition-all duration-300 group-hover:w-full" />
      </span>
    </motion.button>
  )
}
