'use client'

import { NeuCard, NeuCardHeader } from '@/components/ui/NeuCard'
import { NeuButton } from '@/components/ui/NeuButton'
import { MotionDiv, MotionH2 } from '@/components/animations/MotionWrapper'
import Link from 'next/link'

const services = [
  {
    title: 'oloPulse™',
    subtitle: 'Strategy & Vision',
    tagline: 'Where potential finds its path',
    description: 'From spark to blueprint—we define scope, map strategic direction, and chart the journey from concept to integrated reality.',
    href: '/services/olopulse',
    delay: 0,
  },
  {
    title: 'somaWeave™',
    subtitle: 'Experience Design',
    tagline: 'Where worlds become seamless',
    description: 'We design the convergence—where physical spaces, digital interfaces, and service flows unite into one breathing system.',
    href: '/services/somaweave',
    delay: 0.1,
  },
  {
    title: 'somaForge™',
    subtitle: 'Form & Identity',
    tagline: 'Where ideas take shape',
    description: 'From prototype to presence—we materialize your vision with tangible form, sensorial identity, and iterative precision.',
    href: '/services/somaforge',
    delay: 0.2,
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-dark-elevated/30 relative">
      <div className="container-custom">
        <MotionH2
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </MotionH2>

        <MotionDiv
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p>Three integrated offerings that transform vision into reality</p>
        </MotionDiv>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <MotionDiv
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: service.delay, duration: 0.6 }}
            >
              <NeuCard accent className="h-full flex flex-col">
                <NeuCardHeader>
                  <h3 className="text-2xl md:text-3xl font-bold text-teal-accent mb-2">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-300">{service.subtitle}</p>
                </NeuCardHeader>

                <div className="flex-1 space-y-4">
                  <p className="text-sm font-semibold text-teal-accent/80 uppercase tracking-wider">
                    {service.tagline}
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6">
                  <Link href={service.href} className="block">
                    <NeuButton variant="secondary" className="w-full">
                      → Explore {service.title.split('™')[0]}
                    </NeuButton>
                  </Link>
                </div>
              </NeuCard>
            </MotionDiv>
          ))}
        </div>

        {/* Service philosophy statement */}
        <MotionDiv
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-lg text-gray-400 leading-relaxed">
            Each service seamlessly connects—
            <span className="text-teal-accent font-semibold"> oloPulse</span> defines the vision,
            <span className="text-teal-accent font-semibold"> somaWeave</span> designs the experience, and
            <span className="text-teal-accent font-semibold"> somaForge</span> brings it to life.
          </p>
        </MotionDiv>
      </div>
    </section>
  )
}
