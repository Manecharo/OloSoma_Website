'use client'

import { motion } from 'framer-motion'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { useMagneticEffect } from '@/lib/hooks/useMagneticEffect'
import { TouchRipple } from '@/components/effects/TouchRipple'

interface NeuButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  href?: string
  magnetic?: boolean
  ripple?: boolean
}

export const NeuButton = forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ variant = 'primary', children, className = '', magnetic = true, ripple = true, ...props }, _ref) => {
    const magneticRef = useMagneticEffect<HTMLButtonElement>({
      strength: 0.25,
      radius: 120,
      scale: 1.03,
      glowIntensity: 0.15,
      enabled: magnetic,
    })

    return (
      <motion.button
        ref={magneticRef as any}
        className={`neu-button neu-button-${variant} ${className} relative overflow-hidden`}
        whileHover={{ scale: magnetic ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...(props as any)}
      >
        {ripple && <TouchRipple color="rgba(98, 191, 164, 0.5)" duration={600} maxSize={100} />}
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  }
)

NeuButton.displayName = 'NeuButton'
