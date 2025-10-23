'use client'

import { MotionDiv, MotionH2 } from '@/components/animations/MotionWrapper'
import { NeuButton } from '@/components/ui/NeuButton'
import { NeuCard } from '@/components/ui/NeuCard'
import Link from 'next/link'

export function ClosingCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-teal-accent/10 via-transparent to-transparent opacity-30" />

      <div className="container-custom relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <NeuCard className="max-w-4xl mx-auto text-center p-8 md:p-12 breathing-glow">
            <MotionH2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Let's transform potential into reality.
            </MotionH2>

            <MotionDiv
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p>
                Whether you're building a luxury hotel experience, launching a digital product,
                or reimagining your brand's physical presence—we're ready.
              </p>
            </MotionDiv>

            <MotionDiv
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link href="/connect">
                <NeuButton variant="primary" className="min-w-[200px]">
                  → Book a discovery call
                </NeuButton>
              </Link>
              <Link href="/connect">
                <NeuButton variant="secondary" className="min-w-[200px]">
                  → Connect with us
                </NeuButton>
              </Link>
            </MotionDiv>

            {/* Optional: Trust indicators hint */}
            <MotionDiv
              className="mt-12 pt-8 border-t border-teal-accent/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="text-sm text-gray-400">
                Trusted by forward-thinking organizations globally
              </p>
            </MotionDiv>
          </NeuCard>
        </MotionDiv>
      </div>
    </section>
  )
}
