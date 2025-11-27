'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { MorphingLightCanvas } from './MorphingLightCanvas'
import { RandomPrintDecoration } from './PrintIcons'
import { SideMenu } from './SideMenu'

/**
 * ExperimentalLanding - Radical grid layout with morphing backgrounds
 *
 * Features:
 * - Asymmetric, magazine-style layouts
 * - Morphing gradient backgrounds
 * - High blur sections for visual contrast
 * - Product-focused sections
 * - Print-inspired decorative elements
 */

// Services have been moved to /services page

export function ExperimentalLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', v => setScrollProgress(v))
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#1e1d1d] text-white overflow-hidden">
      {/* Side Menu */}
      <SideMenu />

      {/* Morphing Light Background */}
      <div className="fixed inset-0 z-0">
        <MorphingLightCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Main Content - Add left padding for desktop side menu */}
      <div className="relative z-10 md:pl-20 lg:pl-24">
        {/* Hero Section */}
        <HeroSection scrollProgress={scrollProgress} />

        {/* How We Do It Section - Spiral Diagram */}
        <HowWeDoItSection />

        {/* How We Help You Section */}
        <HowWeHelpYouSection />

        {/* Who We Are Section (previously About) */}
        <AboutSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

function HeroSection({ scrollProgress }: { scrollProgress: number }) {
  // Calculate opacity based on scroll progress
  const opacity = scrollProgress < 0.2 ? 1 - (scrollProgress / 0.2) : 0

  return (
    <motion.section
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Logo - Top, minimal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32"
        >
          <motion.div
            animate={{
              filter: [
                'brightness(1) sepia(0)',
                'brightness(1.2) sepia(0.3) hue-rotate(150deg)',
                'brightness(0.9) sepia(0.2)',
                'brightness(1) sepia(0)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.33, 0.66, 1]
            }}
            className="relative w-48 md:w-64 h-16 md:h-20 mx-auto md:mx-0"
          >
            <Image src="/logo.svg" alt="OloSoma" fill className="object-contain" priority />
          </motion.div>
        </motion.div>

        {/* Main Content - Brutalist Typography */}
        <div className="space-y-16 md:space-y-24">
          {/* Hero Statement - Updated to Idea makers & Project managers */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter">
              Idea makers &
              <br />
              <span className="text-[#62bfa4]">Project managers</span>
            </h1>
          </motion.div>

          {/* Subtle descriptor line */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl"
          >
            <div className="border-l-4 border-[#62bfa4] pl-6 md:pl-8">
              <p className="text-lg md:text-2xl font-light text-white/80 leading-relaxed">
                Design × Technology × Human Emotion
              </p>
            </div>
          </motion.div>

          {/* Capabilities - Minimal flat icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-8"
          >
            {/* AI Augmented */}
            <div className="flex flex-col gap-3">
              <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="6" fill="#62bfa4" />
                <circle cx="16" cy="16" r="4" fill="white" fillOpacity="0.6" />
                <circle cx="48" cy="16" r="4" fill="white" fillOpacity="0.6" />
                <circle cx="16" cy="48" r="4" fill="white" fillOpacity="0.6" />
                <circle cx="48" cy="48" r="4" fill="white" fillOpacity="0.6" />
                <line x1="32" y1="32" x2="16" y2="16" stroke="#62bfa4" strokeWidth="2" />
                <line x1="32" y1="32" x2="48" y2="16" stroke="#62bfa4" strokeWidth="2" />
                <line x1="32" y1="32" x2="16" y2="48" stroke="#62bfa4" strokeWidth="2" />
                <line x1="32" y1="32" x2="48" y2="48" stroke="#62bfa4" strokeWidth="2" />
              </svg>
              <span className="text-xs md:text-sm font-medium uppercase tracking-widest text-white/60">
                AI Augmented
              </span>
            </div>

            {/* Spatial */}
            <div className="flex flex-col gap-3">
              <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" />
                <rect x="36" y="24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" />
                <rect x="22" y="12" width="20" height="20" stroke="#62bfa4" strokeWidth="3" fill="none" />
              </svg>
              <span className="text-xs md:text-sm font-medium uppercase tracking-widest text-white/60">
                Spatial
              </span>
            </div>

            {/* Strategic */}
            <div className="flex flex-col gap-3">
              <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="24" stroke="white" strokeWidth="2" />
                <circle cx="32" cy="32" r="16" stroke="white" strokeWidth="2" fillOpacity="0.2" />
                <circle cx="32" cy="16" r="4" fill="#62bfa4" />
                <line x1="32" y1="20" x2="32" y2="32" stroke="#62bfa4" strokeWidth="3" />
              </svg>
              <span className="text-xs md:text-sm font-medium uppercase tracking-widest text-white/60">
                Strategic
              </span>
            </div>

            {/* Iterative */}
            <div className="flex flex-col gap-3">
              <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 64 64" fill="none">
                <path
                  d="M10 32 C10 24 14 20 20 20 C26 20 30 24 32 32 C34 40 38 44 44 44 C50 44 54 40 54 32 C54 24 50 20 44 20 C38 20 34 24 32 32 C30 40 26 44 20 44 C14 44 10 40 10 32 Z"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
              <span className="text-xs md:text-sm font-medium uppercase tracking-widest text-white/60">
                Iterative
              </span>
            </div>
          </motion.div>
        </div>

        {/* Minimal scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-6 h-10" viewBox="0 0 24 40" fill="none">
              <rect x="1" y="1" width="22" height="38" rx="11" stroke="white" strokeWidth="2" fill="none" />
              <motion.circle
                cx="12"
                cy="12"
                r="3"
                fill="white"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

/**
 * How We Do It Section - Spiral Diagram
 * Shows the iterative process: Foresight → Strategy → Craft → Prototype → Test → (loops back)
 */
function HowWeDoItSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Spiral phases
  const phases = [
    { label: 'FORESIGHT', angle: 270 },
    { label: 'STRATEGY', angle: 342 },
    { label: 'CRAFT', angle: 54 },
    { label: 'PROTOTYPE', angle: 126 },
    { label: 'TEST', angle: 198 }
  ]

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="relative min-h-screen flex items-center px-6 md:px-12 py-24 md:py-32"
      id="how-we-do-it"
    >
      <div className="absolute inset-0 bg-[#1e1d1d]/50 backdrop-blur-[60px]" style={{ zIndex: -1 }} />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-sm font-light text-[#62bfa4] tracking-[0.3em] uppercase mb-4">
            How We Do It
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Spiral Diagram - Enhanced Graphics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square max-w-lg mx-auto"
          >
            {/* Animated Spiral SVG */}
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Glow filter definitions */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#62bfa4" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#64b1f2" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#62bfa4" stopOpacity="0.8" />
                </linearGradient>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#62bfa4" stopOpacity="1" />
                  <stop offset="70%" stopColor="#62bfa4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#62bfa4" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Outer decorative circle */}
              <circle
                cx="200"
                cy="200"
                r="170"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                fill="none"
              />

              {/* Main spiral path with gradient */}
              <motion.path
                d="M200 35
                   C 295 35, 365 105, 365 200
                   C 365 295, 295 365, 200 365
                   C 105 365, 35 295, 35 200
                   C 35 125, 90 70, 150 70
                   C 230 70, 280 120, 280 190
                   C 280 250, 230 290, 170 290
                   C 120 290, 90 250, 90 200
                   C 90 160, 120 130, 160 130
                   C 195 130, 220 155, 220 190
                   C 220 210, 205 225, 185 225
                   C 168 225, 155 212, 155 195
                   C 155 182, 165 172, 180 172
                   C 192 172, 200 182, 200 195"
                stroke="url(#spiralGradient)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
              />

              {/* Secondary subtle spiral */}
              <motion.path
                d="M200 35
                   C 295 35, 365 105, 365 200
                   C 365 295, 295 365, 200 365
                   C 105 365, 35 295, 35 200
                   C 35 125, 90 70, 150 70
                   C 230 70, 280 120, 280 190
                   C 280 250, 230 290, 170 290
                   C 120 290, 90 250, 90 200
                   C 90 160, 120 130, 160 130
                   C 195 130, 220 155, 220 190"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
              />

              {/* Waypoint dots on the spiral */}
              {phases.map((phase, i) => {
                const radius = 140
                const angleRad = (phase.angle * Math.PI) / 180
                const dotX = 200 + radius * Math.cos(angleRad)
                const dotY = 200 + radius * Math.sin(angleRad)

                return (
                  <motion.g key={`dot-${phase.label}`}>
                    {/* Outer glow ring */}
                    <motion.circle
                      cx={dotX}
                      cy={dotY}
                      r="18"
                      fill="none"
                      stroke="#62bfa4"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                    />
                    {/* Inner dot */}
                    <motion.circle
                      cx={dotX}
                      cy={dotY}
                      r="6"
                      fill="#62bfa4"
                      filter="url(#glow)"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                    />
                  </motion.g>
                )
              })}

              {/* Glowing center point - core */}
              <motion.circle
                cx="200"
                cy="195"
                r="30"
                fill="url(#centerGlow)"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2, duration: 0.6 }}
              />
              <motion.circle
                cx="200"
                cy="195"
                r="12"
                fill="#62bfa4"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2, duration: 0.4 }}
              >
                <animate
                  attributeName="r"
                  values="10;14;10"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </motion.circle>

              {/* Phase labels positioned around spiral */}
              {phases.map((phase, i) => {
                const radius = 175
                const angleRad = (phase.angle * Math.PI) / 180
                const x = 200 + radius * Math.cos(angleRad)
                const y = 200 + radius * Math.sin(angleRad)

                return (
                  <motion.text
                    key={phase.label}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] md:text-xs font-semibold tracking-[0.15em]"
                    fill="#62bfa4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + i * 0.15, duration: 0.4 }}
                  >
                    {phase.label}
                  </motion.text>
                )
              })}

              {/* Connecting lines from dots to labels */}
              {phases.map((phase, i) => {
                const innerRadius = 145
                const outerRadius = 165
                const angleRad = (phase.angle * Math.PI) / 180
                const x1 = 200 + innerRadius * Math.cos(angleRad)
                const y1 = 200 + innerRadius * Math.sin(angleRad)
                const x2 = 200 + outerRadius * Math.cos(angleRad)
                const y2 = 200 + outerRadius * Math.sin(angleRad)

                return (
                  <motion.line
                    key={`line-${phase.label}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#62bfa4"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                  />
                )
              })}
            </svg>

            {/* Tagline below spiral */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="text-center text-sm italic text-white/60 mt-6"
            >
              Enter anywhere. Return often.
            </motion.p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              We work in <span className="font-bold text-white">spirals, not straight lines</span>.
            </p>

            <p className="text-lg text-white/70 leading-relaxed">
              Every project orbits between invisible logic and visible form—starting with foresight
              to decode what's possible, moving through strategy to define what matters, diving into
              craft to make it tangible, prototyping to test it in reality, and continuously looping
              back to refine. You can enter anywhere. We never stop circling closer to the truth.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

/**
 * How We Help You Section
 * Shows the value delivery framework comparing traditional vs OloSoma approach
 */
function HowWeHelpYouSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const challenges = [
    { title: 'MULTIPLE VENDORS', desc: 'Coordinating architects, brand agencies, developers, and marketers' },
    { title: 'EXTENDED TIMELINES', desc: 'Sequential handoffs between disciplines add 4-8 months' },
    { title: 'MISALIGNED OUTPUTS', desc: "Brand doesn't match space; digital doesn't match physical" },
    { title: 'BUDGET OVERRUNS', desc: 'Scope gaps and rework from disconnected teams' },
    { title: 'INCOMPLETE SYSTEMS', desc: 'Missing pieces discovered late; launch delayed' }
  ]

  const outcomes = [
    { title: 'ONE INTEGRATED TEAM', desc: 'All disciplines under one roof, one PM, one contract' },
    { title: '40-60% FASTER', desc: 'Parallel workstreams eliminate sequential delays' },
    { title: 'SYSTEMATIC COHERENCE', desc: 'Space, brand, product, and digital designed as one system' },
    { title: 'FIXED PRICE MODELS', desc: 'Predictable costs; no vendor coordination overhead' },
    { title: 'COMPLETE PACKAGES', desc: 'Launch-ready: strategy, design, assets, and implementation' }
  ]

  const businessOutcomes = [
    '40-60% faster project delivery through parallel workstreams',
    'Eliminates vendor coordination overhead (typically 20-30% of project time)',
    'Reduces scope gaps and rework from misaligned outputs',
    'Provides complete go-to-market packages, not isolated deliverables',
    'Fixed-price or subscription models for predictable budgeting'
  ]

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="relative min-h-screen flex items-center px-6 md:px-12 py-24 md:py-32"
      id="how-we-help"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-sm font-light text-[#62bfa4] tracking-[0.3em] uppercase mb-4">
            How We Help You
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Comparison Table */}
          <div className="space-y-8">
            {/* Challenges vs Outcomes */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {/* Business Challenges Column */}
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6 pb-2 border-b border-white/10">
                  Business Challenges
                </div>
                <div className="space-y-4">
                  {challenges.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="border-l-2 border-white/20 pl-4 py-2"
                    >
                      <div className="text-sm font-medium text-white/80 mb-1">{item.title}</div>
                      <div className="text-xs text-white/50 leading-relaxed">{item.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Delivered Outcomes Column */}
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6 pb-2 border-b border-white/10">
                  Delivered Outcomes
                </div>
                <div className="space-y-4">
                  {outcomes.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                      className="border-l-2 border-[#62bfa4]/40 pl-4 py-2"
                    >
                      <div className="text-sm font-medium text-[#62bfa4] mb-1">{item.title}</div>
                      <div className="text-xs text-white/50 leading-relaxed">{item.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#62bfa4]">40-60%</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Time Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#62bfa4]">20-30%</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Cost Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#62bfa4]">100%</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">System Integration</div>
              </div>
            </motion.div>
          </div>

          {/* Value Framework Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#62bfa4] mb-6">
                Value Delivery Framework
              </h3>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                We compress time-to-market and reduce coordination costs. When you need a new space,
                brand, or product, traditional processes require multiple vendors, lengthy handoffs,
                and misaligned deliverables.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                OloSoma delivers integrated design packages where spatial design, brand identity,
                digital interfaces, product specs, and marketing assets are developed in parallel
                and delivered as one cohesive system. One team. One timeline. One bill.
              </p>
            </div>

            {/* Business Outcomes */}
            <div>
              <h4 className="text-xl font-bold text-[#62bfa4] mb-4">Business Outcomes</h4>
              <ul className="space-y-3">
                {businessOutcomes.map((outcome, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[#62bfa4] mt-1">→</span>
                    <span className="text-white/70">{outcome}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

function AboutSection() {
  return (
    <section id="who-we-are" className="relative min-h-screen flex items-center px-6 md:px-12 py-32 md:py-40">
      {/* High blur effect for contrast */}
      <div className="absolute inset-0 bg-[#1e1d1d]/70 backdrop-blur-[120px]" style={{ zIndex: -1 }} />

      <RandomPrintDecoration count={10} />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-sm font-light text-[#62bfa4] tracking-[0.3em] uppercase mb-4">
            Who We Are
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left Column - Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-[#62bfa4]">OloSoma</span>
              </h3>
              <div className="w-20 h-1 bg-[#62bfa4]" />
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                We are architects of experience, crafting systems where design, technology, and human emotion converge
                into something greater than the sum of their parts.
              </p>
              <p>
                Every project is an exploration—a deliberate pursuit of beauty, function, and meaning. We believe the
                most powerful work emerges at the intersection of intuition and intelligence, where AI augments human
                creativity rather than replacing it.
              </p>
              <p>
                Through spatial design, brand systems, and digital experiences, we build environments that don't just
                communicate—they resonate, transform, and endure.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Approach & Values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Approach */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white/90">Our Approach</h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Human-Centered',
                    description: 'Every solution begins with deep empathy for the people who will experience it.'
                  },
                  {
                    title: 'Technologically Advanced',
                    description: 'We harness AI and cutting-edge tools to push the boundaries of what\'s possible.'
                  },
                  {
                    title: 'Aesthetically Rigorous',
                    description: 'Beauty is not decoration—it\'s a fundamental requirement for meaningful work.'
                  },
                  {
                    title: 'Strategically Grounded',
                    description: 'Creative vision must serve business goals and drive measurable impact.'
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="border-l-2 border-[#62bfa4]/40 pl-6 py-2"
                  >
                    <h4 className="font-semibold text-white/90 mb-1">{item.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats or Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                { number: '15+', label: 'Years Combined' },
                { number: '100+', label: 'Projects Delivered' },
                { number: '3', label: 'Continents' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  className="text-center space-y-2"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#62bfa4]">{stat.number}</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <footer id="connect" className="relative min-h-screen flex items-center px-6 md:px-12 py-32 overflow-hidden">
      {/* Mesmerizing background gradient animation */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #62bfa4 0%, transparent 50%)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 80% 20%, #64b1f2 0%, transparent 40%)'
          }}
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 20% 80%, #f2648b 0%, transparent 40%)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
      </div>

      {/* High blur overlay */}
      <div className="absolute inset-0 bg-[#1e1d1d]/60 backdrop-blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Message */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter"
              >
                Let's
                <br />
                <span className="text-[#62bfa4]">Create</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="border-l-4 border-[#62bfa4] pl-6 md:pl-8"
              >
                <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">
                  Ready to transform vision into reality?
                </p>
              </motion.div>
            </div>

            {/* Animated decorative elements */}
            <div className="flex gap-4 pt-8">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#62bfa4]"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Email */}
            <motion.a
              href="mailto:hello@olosoma.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ x: 8 }}
              className="group block"
            >
              <div className="border-l-2 border-white/20 pl-6 py-4 transition-all duration-300 group-hover:border-[#62bfa4]">
                <div className="text-xs font-medium uppercase tracking-widest text-white/40 mb-2">Email</div>
                <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#62bfa4] transition-colors">
                  hello@olosoma.com
                </div>
              </div>
            </motion.a>

            {/* Phone - Optional */}
            <motion.a
              href="tel:+1234567890"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ x: 8 }}
              className="group block"
            >
              <div className="border-l-2 border-white/20 pl-6 py-4 transition-all duration-300 group-hover:border-[#62bfa4]">
                <div className="text-xs font-medium uppercase tracking-widest text-white/40 mb-2">Phone</div>
                <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#62bfa4] transition-colors">
                  +1 (234) 567-890
                </div>
              </div>
            </motion.a>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="border-l-2 border-white/20 pl-6 py-4"
            >
              <div className="text-xs font-medium uppercase tracking-widest text-white/40 mb-2">Studio</div>
              <div className="text-xl md:text-2xl font-light text-white/70">
                Remote × Global
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-8"
            >
              <div className="text-xs font-medium uppercase tracking-widest text-white/40 mb-4">Connect</div>
              <div className="flex gap-6">
                <motion.a
                  href="https://instagram.com/olosoma"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-12 h-12 border-2 border-white/20 flex items-center justify-center hover:border-[#62bfa4] transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="18" cy="6" r="1" fill="currentColor" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/company/olosoma"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-12 h-12 border-2 border-white/20 flex items-center justify-center hover:border-[#62bfa4] transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40"
        >
          <div>© {new Date().getFullYear()} OloSoma. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="/privacy" className="hover:text-white/60 transition-colors uppercase tracking-wide text-xs">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white/60 transition-colors uppercase tracking-wide text-xs">
              Terms
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
