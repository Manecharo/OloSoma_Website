'use client'

import { MotionDiv, MotionH1 } from '@/components/animations/MotionWrapper'
import { NeuButton } from '@/components/ui/NeuButton'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-teal-accent/5 via-transparent to-transparent opacity-30" />

      <MotionDiv
        className="container-custom text-center z-10 px-4"
        initial="initial"
        animate="animate"
      >
        {/* OloSoma Logo */}
        <MotionDiv
          className="mb-12 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut'
          }}
        >
          <div className="relative w-64 h-20">
            <Image
              src="/logo.svg"
              alt="OloSoma"
              fill
              priority
              className="object-contain"
              onError={(e) => {
                e.currentTarget.src = '/logo.png'
              }}
            />
          </div>
        </MotionDiv>

        <MotionH1
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          The journey of a thought becoming a thing.
        </MotionH1>

        <MotionDiv
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto space-y-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p>
            We are a Strategic Design Studio operating in the spectrum between the visible and the invisible — where ideas acquire form and strategy becomes tangible.
          </p>
          <p>
            From architecture to brand systems, from digital experiences to sensorial worlds, we turn foresight into form and imagination into structure.
          </p>
          <p>
            Every project we create begins with one simple act: making the invisible visible.
          </p>
        </MotionDiv>

        <MotionDiv
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="#services">
            <NeuButton variant="primary" className="breathing-glow">
              Start the journey →
            </NeuButton>
          </Link>
        </MotionDiv>

        {/* Scroll indicator */}
        <MotionDiv
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <MotionDiv
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-teal-accent/60 text-2xl"
          >
            ↓
          </MotionDiv>
        </MotionDiv>
      </MotionDiv>
    </section>
  )
}
