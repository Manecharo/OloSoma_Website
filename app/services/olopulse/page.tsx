import { Metadata } from 'next'
import { MotionDiv, MotionH1, MotionH2 } from '@/components/animations/MotionWrapper'
import { NeuCard, NeuCardHeader } from '@/components/ui/NeuCard'
import { NeuButton } from '@/components/ui/NeuButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'oloPulse™ - Strategy & Vision',
  description: 'Strategic ignition—from spark to blueprint. We map the invisible logic behind your ambition and chart the journey from concept to integrated reality.',
}

export default function OloPulsePage() {
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
                Strategy & Vision
              </span>
            </div>

            <MotionH1 className="text-4xl md:text-6xl font-bold mb-6">
              oloPulse™
            </MotionH1>

            <p className="text-xl md:text-2xl text-teal-accent font-semibold mb-8 uppercase tracking-wider">
              Where potential finds its path
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              The ignition moment—where ambition meets strategic clarity. We take the invisible
              (your vision, market opportunity, unmet need) and define its scope, direction, and roadmap.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* What is oloPulse */}
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
              What is oloPulse?
            </MotionH2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p className="text-xl md:text-2xl">
                The ignition moment—where ambition meets strategic clarity.
              </p>

              <p>
                We take the <span className="text-teal-accent font-semibold">invisible</span> (your vision, market
                opportunity, unmet need) and define its scope, direction, and roadmap.
              </p>

              <p className="text-teal-accent font-semibold">
                This is where possibility becomes plan.
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
              'Launching a new venture or product line',
              'Redefining brand positioning',
              'Entering unfamiliar markets (geographic or sectoral)',
              'Aligning stakeholders around shared vision',
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
                title: 'Strategic Foundation',
                items: [
                  'Market landscape analysis',
                  'Opportunity mapping & positioning',
                  'Core narrative & messaging framework',
                ],
              },
              {
                title: 'Service Blueprint',
                items: [
                  'User journey mapping (physical + digital)',
                  'Operational flow design',
                  'Touchpoint ecosystem definition',
                ],
              },
              {
                title: 'Roadmap',
                items: [
                  'Phased implementation plan',
                  'Resource requirements',
                  'Success metrics & KPIs',
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
                  <p className="text-4xl font-bold text-teal-accent mb-2">2–4 weeks</p>
                  <p className="text-gray-400">Depending on project scope</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Format</h3>
                  <p className="text-xl text-gray-300 mb-2">Sprint-based collaboration</p>
                  <p className="text-gray-400">Weekly check-ins & iterative refinement</p>
                </div>
              </div>
            </NeuCard>
          </div>
        </div>
      </section>

      {/* Next Service + CTA */}
      <section className="py-16 bg-dark-elevated/30">
        <div className="container-custom">
          <MotionDiv
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <NeuCard className="breathing-glow">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to define your vision?
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Next: <Link href="/services/somaweave" className="text-teal-accent hover:underline">somaWeave™</Link> brings
                your blueprint to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/connect">
                  <NeuButton variant="primary">
                    → Start with oloPulse
                  </NeuButton>
                </Link>
                <Link href="/services/somaweave">
                  <NeuButton variant="secondary">
                    Explore somaWeave™
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
