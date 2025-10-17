'use client'

import { MotionDiv, MotionH2, MotionH3 } from '@/components/animations/MotionWrapper'
import { NeuCard } from '@/components/ui/NeuCard'

const founders = [
  {
    name: 'Diogo Leitão',
    role: 'Spatial & Service Design',
    bio: 'Strategic experience architect with roots in European luxury hospitality. Specializes in translating vision into seamless physical environments and operational flows.',
    focus: [
      'Hospitality & HORECA',
      'Luxury retail environments',
      'Service blueprinting',
      'Europe & Middle East markets'
    ],
    delay: 0,
  },
  {
    name: 'Manu Echavarría',
    role: 'Industrial & Digital Design',
    bio: 'Product strategist and rapid prototyper with expertise across Latin America and Asia. Bridges cultural innovation with technology to create tangible, user-centered solutions.',
    focus: [
      'Industrial design & UX/UI',
      'Tech startup ecosystems',
      'Cultural IP innovation',
      'AI-assisted prototyping',
      'Latin America & Asia markets'
    ],
    delay: 0.2,
  },
]

export function DualVision() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container-custom">
        <MotionH2
          className="text-4xl md:text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          About
        </MotionH2>

        <MotionDiv
          className="text-center text-gray-300 mb-16 max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-lg leading-relaxed">
            Olosoma was founded by Diogo Leitão and Manu Echavarría Romero, two designers who believe that the future of design lies in strategic synthesis.
          </p>
          <p className="text-lg leading-relaxed">
            We are architects, product designers, and brand thinkers — working as one body of intelligence.
          </p>
          <p className="text-lg leading-relaxed">
            Our culture is defined by curiosity, precision, and empathy.
          </p>
          <p className="text-lg leading-relaxed">
            We collaborate globally, remotely, and seamlessly, assembling multidisciplinary teams that think deeply and act decisively.
          </p>
          <p className="text-lg leading-relaxed font-semibold text-teal-accent">
            We design for the spaces people inhabit, the objects they use, the brands they trust, and the futures they imagine.
          </p>
        </MotionDiv>

        {/* Founders grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {founders.map((founder) => (
            <MotionDiv
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: founder.delay, duration: 0.6 }}
            >
              <NeuCard className="h-full">
                <div className="space-y-6">
                  {/* Name and role */}
                  <div className="space-y-2">
                    <MotionH3 className="text-2xl md:text-3xl font-bold text-white">
                      {founder.name}
                    </MotionH3>
                    <p className="text-teal-accent text-lg font-medium">
                      {founder.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 leading-relaxed">
                    {founder.bio}
                  </p>

                  {/* Focus areas */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Focus:
                    </p>
                    <ul className="space-y-2">
                      {founder.focus.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <span className="text-teal-accent mt-1">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </NeuCard>
            </MotionDiv>
          ))}
        </div>

        {/* Collaborative statement */}
        <MotionDiv
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="neu-card bg-dark-elevated/50 border border-teal-accent/20">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Together, we design <span className="text-teal-accent font-semibold">complete solutions</span>
              <br className="hidden sm:block" />
              where physical, digital, and service experiences
              <br className="hidden sm:block" />
              work in <span className="text-white font-semibold">perfect harmony</span>.
            </p>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
