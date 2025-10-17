import { Metadata } from 'next'
import { MotionDiv, MotionH1, MotionH2 } from '@/components/animations/MotionWrapper'
import { NeuCard, NeuCardHeader } from '@/components/ui/NeuCard'
import { NeuButton } from '@/components/ui/NeuButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'somaWeave™ - Experience Design',
  description: 'Multi-dimensional experience building where physical spaces, digital interfaces, and service flows converge into one breathing system.',
}

export default function SomaWeavePage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-teal-accent/10 via-transparent to-transparent opacity-30" />

        <div className="container-custom relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-teal-accent/10 border border-teal-accent/30 mb-6">
              <span className="text-sm font-semibold text-teal-accent uppercase tracking-wider">
                Experience Design
              </span>
            </div>

            <MotionH1 className="text-4xl md:text-6xl font-bold mb-6">
              somaWeave™
            </MotionH1>

            <p className="text-xl md:text-2xl text-teal-accent font-semibold mb-8 uppercase tracking-wider">
              Where worlds become seamless
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              The convergence—where physical spaces, digital interfaces, and service choreography
              unite into one breathing system. We design the integration.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* What is somaWeave */}
      <section className="py-16 bg-dark-elevated/30">
        <div className="container-custom">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <MotionH2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              What is somaWeave?
            </MotionH2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                The convergence—where physical spaces, digital interfaces, and service choreography
                unite into one breathing system.
              </p>

              <p>
                We don't design <span className="text-teal-accent">environments</span> OR <span className="text-teal-accent">apps</span> OR <span className="text-teal-accent">services</span>.
                We design the <span className="text-white font-semibold">integrated experience</span> where all
                three feel inseparable.
              </p>

              <p>
                This is OloSoma's signature offering—the full spectrum of transformation where every touchpoint
                is considered, every interaction choreographed, every moment designed.
              </p>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-16">
        <div className="container-custom">
          <MotionH2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ideal for
          </MotionH2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Luxury hospitality environments (hotels, F&B, retail)',
              'Branded experiences (showrooms, pop-ups, installations)',
              'Tech products requiring spatial + digital integration',
              'Service transformations (healthcare, education, co-working)',
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <NeuCard className="h-full">
                  <div className="flex items-start gap-3">
                    <span className="text-teal-accent text-2xl mt-1">—</span>
                    <p className="text-gray-300">{item}</p>
                  </div>
                </NeuCard>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 bg-dark-elevated/30">
        <div className="container-custom">
          <MotionH2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What you receive
          </MotionH2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Spatial Design',
                items: [
                  'Concept development & mood',
                  'Space planning & flow optimization',
                  'Material palette & FF&E direction',
                ],
              },
              {
                title: 'Digital Experience',
                items: [
                  'UX/UI strategy & wireframes',
                  'Interface design & prototyping',
                  'Platform architecture',
                ],
              },
              {
                title: 'Service Choreography',
                items: [
                  'Operational playbooks',
                  'Staff & user experience mapping',
                  'Sensorial touchpoint design',
                ],
              },
            ].map((deliverable, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <NeuCard className="h-full">
                  <NeuCardHeader>
                    <h3 className="text-xl font-bold text-teal-accent">
                      {deliverable.title}
                    </h3>
                  </NeuCardHeader>
                  <ul className="space-y-3">
                    {deliverable.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <span className="text-teal-accent mt-1">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </NeuCard>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline & Format */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <NeuCard className="text-center">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Timeline</h3>
                  <p className="text-4xl font-bold text-teal-accent mb-2">6–12 weeks</p>
                  <p className="text-gray-400">Depending on project complexity</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Format</h3>
                  <p className="text-xl text-gray-300 mb-2">Collaborative design sprints</p>
                  <p className="text-gray-400">Iterative refinement & prototyping</p>
                </div>
              </div>
            </NeuCard>
          </div>
        </div>
      </section>

      {/* Signature Statement */}
      <section className="py-16 bg-dark-elevated/30">
        <div className="container-custom">
          <MotionDiv
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <NeuCard accent>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-4">
                This is OloSoma's <span className="text-teal-accent font-semibold">signature offering</span>—
              </p>
              <p className="text-lg text-gray-400">
                the full spectrum of transformation where physical, digital, and service experiences work in perfect harmony.
              </p>
            </NeuCard>
          </MotionDiv>
        </div>
      </section>

      {/* Next Service + CTA */}
      <section className="py-16">
        <div className="container-custom">
          <MotionDiv
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <NeuCard className="breathing-glow">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to weave your experience?
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Next: <Link href="/services/somaforge" className="text-teal-accent hover:underline">somaForge™</Link> brings
                tangible form to your vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/connect">
                  <NeuButton variant="primary">
                    → Begin with somaWeave
                  </NeuButton>
                </Link>
                <Link href="/services/somaforge">
                  <NeuButton variant="secondary">
                    Explore somaForge™
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
