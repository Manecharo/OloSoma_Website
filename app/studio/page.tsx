import { Metadata } from 'next'
import { MotionDiv, MotionH1, MotionH2, MotionH3 } from '@/components/animations/MotionWrapper'
import { NeuCard } from '@/components/ui/NeuCard'
import { NeuButton } from '@/components/ui/NeuButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Studio - Our Philosophy & Approach',
  description: 'The story behind OloSoma—where olo (pure thought) meets soma (tangible form). Our philosophy, approach, and who we serve.',
}

export default function StudioPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <MotionH1 className="text-4xl md:text-6xl font-bold mb-8">
              The story behind the name
            </MotionH1>
          </MotionDiv>
        </div>
      </section>

      {/* olo + soma Definition */}
      <section className="py-16 bg-dark-elevated/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <NeuCard>
                <h2 className="text-4xl font-bold text-gradient-teal mb-6">olo</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  The platonic ideal—pure, pre-existing form.
                </p>
                <p className="text-gray-400">
                  Like a perfect color waiting to be discovered. The unseen logic, the strategic
                  foundation, the "why" before the "what."
                </p>
              </NeuCard>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <NeuCard>
                <h2 className="text-4xl font-bold text-white mb-6">soma</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  The body—physical embodiment.
                </p>
                <p className="text-gray-400">
                  The moment thought becomes thing. The tangible reality, the crafted interface,
                  the designed experience you can touch and feel.
                </p>
              </NeuCard>
            </MotionDiv>
          </div>

          <MotionDiv
            className="text-center mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              This is design in its <span className="text-teal-accent font-semibold">most radical state</span>:
              <br />
              the journey from idea to reality.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Philosophy Deep-Dive */}
      <section className="py-16">
        <div className="container-custom">
          <MotionH2
            className="text-3xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Where Soft Logic Meets Real Form
          </MotionH2>

          <div className="max-w-4xl mx-auto space-y-12">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <NeuCard>
                <h3 className="text-2xl font-bold text-teal-accent mb-4">olo: The Soft Logic</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Pre-form potential. Strategy. The "why" before the "what."
                </p>
                <p className="text-gray-400">
                  Expressed as gradient, pulse, glow—the unseen power beneath every great design.
                  This is where possibility lives before it solidifies into reality.
                </p>
              </NeuCard>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <NeuCard>
                <h3 className="text-2xl font-bold text-white mb-4">soma: The Real Form</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Tangible reality. Interface. The final shape.
                </p>
                <p className="text-gray-400">
                  Expressed through fluid lines, soft edges, tactile precision—the moment potential
                  solidifies into something you can experience, touch, and use.
                </p>
              </NeuCard>
            </MotionDiv>
          </div>

          <MotionDiv
            className="mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <NeuCard accent className="bg-dark-elevated/50">
              <h4 className="text-xl font-semibold text-white mb-4">This philosophy guides every project:</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-teal-accent mt-1">→</span>
                  <span>Strategies that blend in like second skin</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-accent mt-1">→</span>
                  <span>Interfaces that feel like touch</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-accent mt-1">→</span>
                  <span>Products that look like they were always meant to be</span>
                </li>
              </ul>
            </NeuCard>
          </MotionDiv>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 bg-dark-elevated/30">
        <div className="container-custom">
          <MotionH2
            className="text-3xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Who We Serve
          </MotionH2>

          <MotionDiv
            className="max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-gray-300 text-center leading-relaxed">
              We partner with <span className="text-teal-accent font-semibold">visionaries</span> who
              see design as <span className="text-white font-semibold">strategy</span>—not decoration.
            </p>
          </MotionDiv>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Luxury hospitality groups (Europe & Middle East)',
              'Fast-growing tech startups (Latin America & Asia)',
              'Cultural institutions reimagining heritage',
              'Mid-market companies ready to transform',
            ].map((client, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <NeuCard className="h-full">
                  <div className="flex items-start gap-3">
                    <span className="text-teal-accent text-2xl mt-1">—</span>
                    <p className="text-gray-300">{client}</p>
                  </div>
                </NeuCard>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-400">
              If you believe experience drives value, we speak your language.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* The OloSoma Approach */}
      <section className="py-16">
        <div className="container-custom">
          <MotionH2
            className="text-3xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The OloSoma Approach
          </MotionH2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: '1',
                title: 'We start with why.',
                description: 'Every project begins with strategic clarity—understanding your ambition before touching a single pixel or material.',
              },
              {
                number: '2',
                title: 'We design holistically.',
                description: 'Physical, digital, and service layers aren\'t separate—they\'re one integrated experience.',
              },
              {
                number: '3',
                title: 'We prototype rapidly.',
                description: 'Ideas stay ideas until they\'re tested. We build fast, learn faster, and refine obsessively.',
              },
              {
                number: '4',
                title: 'We think globally.',
                description: 'Cross-cultural intelligence isn\'t a feature—it\'s our foundation. European precision meets Latin American warmth meets Asian agility.',
              },
            ].map((step, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <NeuCard className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full neu-card flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-teal-accent">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </NeuCard>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-elevated/30">
        <div className="container-custom">
          <MotionDiv
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <NeuCard className="breathing-glow">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Ready to begin?
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Let's explore how OloSoma can transform your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/connect">
                  <NeuButton variant="primary">
                    → Book a discovery call
                  </NeuButton>
                </Link>
                <Link href="/#services">
                  <NeuButton variant="secondary">
                    Explore our services
                  </NeuButton>
                </Link>
              </div>
            </NeuCard>
          </MotionDiv>
        </div>
      </section>
    </main>
  )
}
