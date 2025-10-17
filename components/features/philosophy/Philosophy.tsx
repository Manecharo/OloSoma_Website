'use client'

import { MotionDiv, MotionH2, MotionH3 } from '@/components/animations/MotionWrapper'

export function Philosophy() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container-custom">
        {/* Split-screen design: olo vs soma */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-20">
          {/* Olo - The unseen (gradient glow) */}
          <MotionDiv
            className="text-center p-8 md:p-12 rounded-3xl relative overflow-hidden min-h-[300px] flex flex-col justify-center"
            style={{
              background: 'radial-gradient(circle at center, rgba(98,191,164,0.15), rgba(98,191,164,0.05), transparent)'
            }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative z-10">
              <MotionH2
                className="text-5xl md:text-6xl font-bold text-gradient-teal mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                olo
              </MotionH2>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                A pulse of strategy,
                <br />
                culture, and research.
                <br />
                The invisible potential.
              </p>
            </div>
          </MotionDiv>

          {/* Soma - The tangible (neomorphic card) */}
          <MotionDiv
            className="neu-card text-center p-8 md:p-12 min-h-[300px] flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <MotionH2
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              soma
            </MotionH2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              A physical or digital experience
              <br />
              that can be touched,
              <br />
              lived, and felt.
            </p>
          </MotionDiv>
        </div>

        {/* Transformation statement */}
        <MotionDiv
          className="text-center max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <MotionH3 className="text-3xl md:text-4xl font-bold mb-6">
            Where Soft Logic Meets Real Form.
          </MotionH3>

          <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
            <p>
              Olosoma merges strategy with craft, analysis with intuition, logic with emotion.
            </p>
            <p>
              We think like consultants and create like designers.
            </p>
            <p>
              Our work bridges foresight and execution — transforming invisible potential into integrated, living realities.
            </p>

            <p className="text-xl md:text-2xl font-light pt-4">
              Each idea begins as OLO — a pulse of strategy, culture, and research.
              <br className="hidden sm:block" />
              It becomes SOMA — a physical or digital experience that can be touched, lived, and felt.
            </p>

            <p className="text-xl md:text-2xl font-semibold text-teal-accent pt-4">
              We don't just design spaces or brands — we design systems of meaning.
            </p>
          </div>
        </MotionDiv>
      </div>

      {/* Decorative line separator */}
      <MotionDiv
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-teal-accent/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1 }}
      />
    </section>
  )
}
