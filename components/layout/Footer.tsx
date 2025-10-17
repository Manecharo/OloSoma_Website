'use client'

import Link from 'next/link'
import { MotionDiv } from '@/components/animations/MotionWrapper'

const footerLinks = {
  company: [
    { name: 'Studio', href: '/studio' },
    { name: 'Services', href: '/#services' },
    { name: 'Connect', href: '/connect' },
  ],
  services: [
    { name: 'oloPulse™', href: '/services/olopulse' },
    { name: 'somaWeave™', href: '/services/somaweave' },
    { name: 'somaForge™', href: '/services/somaforge' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: 'in' },
  { name: 'Instagram', href: '#', icon: 'ig' },
  { name: 'Behance', href: '#', icon: 'be' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-elevated/50 border-t border-teal-accent/10">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full neu-card flex items-center justify-center">
                <span className="text-teal-accent text-xl">∞</span>
              </div>
              <span className="text-xl font-bold text-white">OloSoma</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A global design consultancy where soft logic meets real form.
            </p>
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-2">Based globally</p>
              <p className="text-sm text-gray-400">
                Operating across Europe, Middle East,
                <br />
                Latin America, and Asia
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-teal-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-teal-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">Email</p>
                <a
                  href="mailto:hello@olosoma.com"
                  className="text-teal-accent hover:text-teal-accent-light transition-colors text-sm"
                >
                  hello@olosoma.com
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-3">Follow us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-teal-accent/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} OloSoma Design Consultancy. All rights reserved.
            </p>

            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-teal-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <MotionDiv
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-sm text-gray-600 italic">
            Where potential finds form
          </p>
        </MotionDiv>
      </div>
    </footer>
  )
}
