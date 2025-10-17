import { Metadata } from 'next'
import { MotionDiv, MotionH1 } from '@/components/animations/MotionWrapper'
import { NeuCard } from '@/components/ui/NeuCard'
import { ContactForm } from '@/components/features/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Connect - Let\'s Create Together',
  description: 'Get in touch with OloSoma. Book a discovery call or send us a message about your project.',
}

export default function ConnectPage() {
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
            <MotionH1 className="text-4xl md:text-6xl font-bold mb-8">
              Let's create something inevitable.
            </MotionH1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              We work with organizations that see design as strategy—whether you're building
              a luxury hotel in Dubai, launching a product in São Paulo, or reimagining retail in Singapore.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <NeuCard>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  Send us a message
                </h2>
                <p className="text-gray-400 mb-8">
                  Tell us about your vision, and we'll get back to you within 24 hours.
                </p>
                <ContactForm />
              </NeuCard>
            </MotionDiv>

            {/* Discovery Call */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <NeuCard>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  Book a Discovery Call
                </h2>
                <p className="text-gray-400 mb-6">
                  30-minute video consultation to explore your vision and how OloSoma can help.
                </p>

                {/* Calendly Placeholder */}
                <div className="aspect-[4/3] rounded-lg bg-dark-base/50 border border-teal-accent/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 rounded-full neu-card flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📅</span>
                    </div>
                    <p className="text-gray-400 mb-4">
                      Calendly integration coming soon
                    </p>
                    <p className="text-sm text-gray-500">
                      For now, please use the contact form or email us directly
                    </p>
                  </div>
                </div>

                {/* TODO: Integrate Calendly when ready
                <div className="calendly-inline-widget" data-url="https://calendly.com/your-link" style={{ minWidth: '320px', height: '630px' }}></div>
                <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
                */}
              </NeuCard>

              {/* Contact Info */}
              <NeuCard accent>
                <h3 className="text-xl font-bold mb-4 text-white">Other ways to reach us</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <a
                      href="mailto:hello@olosoma.com"
                      className="text-teal-accent hover:text-teal-accent-light transition-colors text-lg"
                    >
                      hello@olosoma.com
                    </a>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Location</p>
                    <p className="text-gray-300">
                      Based globally
                      <br />
                      <span className="text-sm text-gray-500">
                        Operating across Europe, Middle East, Latin America, and Asia
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Follow us</p>
                    <div className="flex gap-3">
                      {[
                        { name: 'LinkedIn', icon: 'in', href: '#' },
                        { name: 'Instagram', icon: 'ig', href: '#' },
                        { name: 'Behance', icon: 'be', href: '#' },
                      ].map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          className="w-10 h-10 rounded-full neu-card flex items-center justify-center hover:shadow-neu-glow transition-all duration-300 group"
                          aria-label={social.name}
                        >
                          <span className="text-gray-400 group-hover:text-teal-accent transition-colors text-xs font-bold">
                            {social.icon}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </NeuCard>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Services Reminder */}
      <section className="py-16 bg-dark-elevated/30">
        <div className="container-custom">
          <MotionDiv
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Not sure where to start?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Explore our three integrated services to find the right fit for your project.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { name: 'oloPulse™', href: '/services/olopulse', desc: 'Strategy & Vision' },
                { name: 'somaWeave™', href: '/services/somaweave', desc: 'Experience Design' },
                { name: 'somaForge™', href: '/services/somaforge', desc: 'Form & Identity' },
              ].map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="inline-block px-6 py-3 rounded-lg bg-dark-elevated border border-teal-accent/20 hover:border-teal-accent/40 hover:shadow-neu-glow transition-all duration-300 group"
                >
                  <p className="font-semibold text-white group-hover:text-teal-accent transition-colors">
                    {service.name}
                  </p>
                  <p className="text-sm text-gray-400">{service.desc}</p>
                </a>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>
    </main>
  )
}
