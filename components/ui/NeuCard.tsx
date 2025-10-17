'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useMagneticEffect } from '@/lib/hooks/useMagneticEffect'
import { EdgeLight } from '@/components/effects/EdgeLight'

interface NeuCardProps {
  children: ReactNode
  hover?: boolean
  className?: string
  accent?: boolean
  magnetic?: boolean
  edgeLight?: boolean
}

export function NeuCard({
  children,
  hover = true,
  accent = false,
  magnetic = true,
  edgeLight = true,
  className = ''
}: NeuCardProps) {
  const magneticRef = useMagneticEffect<HTMLDivElement>({
    strength: 0.15,
    radius: 150,
    scale: 1.01,
    glowIntensity: 0.1,
    enabled: magnetic,
  })

  return (
    <motion.div
      ref={magnetic ? magneticRef : undefined}
      className={`neu-card ${accent ? 'neu-card-accent' : ''} ${className} relative`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={hover && !magnetic ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {edgeLight && <EdgeLight intensity={0.25} radius={200} />}
      {children}
    </motion.div>
  )
}

interface NeuCardHeaderProps {
  children: ReactNode
  className?: string
}

export function NeuCardHeader({ children, className = '' }: NeuCardHeaderProps) {
  return (
    <div className={`neu-card-header ${className}`}>
      {children}
    </div>
  )
}
