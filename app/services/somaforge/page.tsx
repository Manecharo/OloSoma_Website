import { Metadata } from 'next'
import { MotionDiv, MotionH1, MotionH2 } from '@/components/animations/MotionWrapper'
import { NeuCard, NeuCardHeader } from '@/components/ui/NeuCard'
import { NeuButton } from '@/components/ui/NeuButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'somaForge™ - Form & Identity',
  description: 'Rapid materialization from prototype to presence. We give your vision tangible form, sensorial identity, and iterative precision.',
}

export default function SomaForgePage() {
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
                Form & Identity
              </span>
            </div>

            <MotionH1 className="text-4xl md:text-6xl font-bold mb-6">
              somaForge™
            </MotionH1>

            <p className="text-xl md:text-2xl text-teal-accent font-semibold mb-8 uppercase tracking-wider">
              Where ideas take shape
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              The materialization—where concepts become prototypes, and prototypes become presence.
              We give your vision tangible form through rapid iteration.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* What is somaForge */}
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
              What is somaForge?
            </MotionH2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p className="text-xl md:text-2xl">
                The materialization—where concepts become prototypes, and prototypes become presence.
              </p>

              <p>
                We give your vision <span className="text-teal-accent font-semibold">tangible form</span> through
                rapid iteration, sensorial branding, and industrial-grade execution.
              </p>

              <p className="text-teal-accent font-semibold">
                From sketch to shelf-ready—we refine until it feels inevitable.
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
              'Product design & development (consumer goods, furniture, tech)',
              'Brand identity systems (visual, sensorial, spatial)',
              'Rapid prototyping for startups or R&D teams',
              'Cultural IP development (artisan collaboration, heritage innovation)',
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
                title: 'Industrial Design',
                items: [
                  'Concept sketches to 3D models',
                  'Material exploration & prototyping',
                  'Technical documentation for manufacturing',
                ],
              },
              {
                title: 'Brand & Sensorial Identity',
                items: [
                  'Visual identity (logo, type, color, system)',
                  'Sensorial strategy (sound, texture, scent)',
                  'Brand guidelines & asset library',
                ],
              },
              {
                title: 'Rapid Iteration',
                items: [
                  'Multiple prototype cycles',
                  'User testing & feedback integration',
                  'AI-assisted design exploration',
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
                  <p className="text-4xl font-bold text-teal-accent mb-2">4–10 weeks</p>
                  <p className="text-gray-400">Depending on project scope</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Format</h3>
                  <p className="text-xl text-gray-300 mb-2">Agile sprints</p>
                  <p className="text-gray-400">Tangible milestones & rapid iteration</p>
                </div>
              </div>
            </NeuCard>
          </div>
        </div>
      </section>

      {/* Refinement Statement */}
      <section className="py-16 bg-dark-elevated/30">
        <div className="container-custom">
          <MotionDiv
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <NeuCard accent>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                From sketch to shelf-ready—
                <br />
                we refine until it feels <span className="text-white font-semibold">inevitable</span>.
              </p>
            </NeuCard>
          </MotionDiv>
        </div>
      </section>

      {/* Service Flow + CTA */}
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
                Ready to forge your vision?
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                somaForge brings tangible form to abstract ideas.
              </p>
              <p className="text-gray-400 mb-8 text-base">
                See how all three services connect:
                <Link href="/services/olopulse" className="text-teal-accent hover:underline"> oloPulse</Link> defines the vision,
                <Link href="/services/somaweave" className="text-teal-accent hover:underline"> somaWeave</Link> designs the experience,
                and <span className="text-white">somaForge</span> brings it to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/connect">
                  <NeuButton variant="primary">
                    → Start with somaForge
                  </NeuButton>
                </Link>
                <Link href="/studio">
                  <NeuButton variant="secondary">
                    Learn about our approach
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
