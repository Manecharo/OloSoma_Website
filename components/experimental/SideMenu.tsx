'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

/**
 * SideMenu - Rational vertical menu with palpitating logo
 *
 * Features:
 * - Logo that pulsates and transitions: main → white → black
 * - Clean navigation links
 * - Responsive (collapses on mobile)
 */

export function SideMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Connect', href: '#connect' }
  ]

  return (
    <>
      {/* Desktop Side Menu */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-20 lg:w-24 bg-[#1e1d1d]/80 backdrop-blur-md border-r border-white/10 flex-col items-center py-8 z-50"
      >
        {/* Palpitating Logo - transitions through colors */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1.02, 1.08, 1], // Heartbeat pattern
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 0.8,
            ease: 'easeInOut',
            times: [0, 0.15, 0.25, 0.45, 0.6]
          }}
          className="relative w-16 lg:w-20 h-8 lg:h-10 mb-12"
        >
          <motion.div
            animate={{
              filter: [
                'brightness(1) invert(0)', // Original colors
                'brightness(10) grayscale(1)', // White
                'brightness(0) invert(1)', // Black
                'brightness(1) invert(0)' // Back to original
              ]
            }}
            transition={{
              duration: 3.6, // 3 beats cycle
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Image
              src="/logo.svg"
              alt="OloSoma"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-8 flex-1 justify-center">
          {menuItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="group relative"
            >
              <span className="writing-vertical text-sm font-light text-white/60 hover:text-white transition-colors duration-300 uppercase tracking-wider">
                {item.label}
              </span>
              <motion.div
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-[#62bfa4] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Social Links - Minimal Icons */}
        <div className="flex flex-col gap-6 mt-auto">
          <a
            href="https://instagram.com/olosoma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="6" r="1" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/company/olosoma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-[#1e1d1d]/80 backdrop-blur-md border border-white/10 flex items-center justify-center"
        aria-label="Menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          className="w-5 h-5 flex flex-col justify-center gap-1.5"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
            className="w-full h-0.5 bg-white/80 block"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="w-full h-0.5 bg-white/80 block"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
            className="w-full h-0.5 bg-white/80 block"
          />
        </motion.div>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden fixed inset-0 bg-[#1e1d1d]/95 backdrop-blur-xl z-40"
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {/* Mobile Logo */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1.02, 1.08, 1],
              filter: [
                'brightness(1) invert(0)',
                'brightness(10) grayscale(1)',
                'brightness(0) invert(1)',
                'brightness(1) invert(0)'
              ]
            }}
            transition={{
              scale: { duration: 1.2, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' },
              filter: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="relative w-32 h-16 mb-8"
          >
            <Image src="/logo.svg" alt="OloSoma" fill className="object-contain" />
          </motion.div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col items-center gap-6">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-2xl font-light text-white/80 hover:text-white transition-colors uppercase tracking-wide"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Mobile Social */}
          <div className="flex gap-8 mt-8">
            <a
              href="https://instagram.com/olosoma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/olosoma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </>
  )
}
