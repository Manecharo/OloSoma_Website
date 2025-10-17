'use client'

import { motion } from 'framer-motion'

// Re-export motion components for easy use
export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionH1 = motion.h1
export const MotionH2 = motion.h2
export const MotionH3 = motion.h3
export const MotionP = motion.p
export const MotionButton = motion.button
export const MotionSpan = motion.span

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

// Stagger container for animating children sequentially
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Viewport animation settings
export const viewportSettings = {
  once: true,
  margin: '-100px',
  amount: 0.3,
}
