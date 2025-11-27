'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MorphingLightCanvas } from '@/components/experimental/MorphingLightCanvas'
import { SideMenu } from '@/components/experimental/SideMenu'

/**
 * Services Page
 *
 * Showcases all OloSoma services with:
 * - Video hero section
 * - Service cards with detailed descriptions
 * - Maintains the design system aesthetics
 */

interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  layout: 'left' | 'right' | 'center' | 'full'
  blurEffect?: boolean
}

const services: Service[] = [
  {
    id: 'spatial-design',
    title: 'Spatial Design',
    subtitle: 'Architecture that shapes experience',
    description:
      'We create immersive environments where form follows emotion. Every surface, every angle, every transition is crafted to evoke wonder and connection.',
    features: ['Interior Architecture', 'Retail Environments', 'Exhibition Design', 'Spatial Branding'],
    layout: 'left',
    blurEffect: true
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    subtitle: 'Identity systems that resonate',
    description:
      'Beyond logos and guidelines—we build living brand ecosystems that evolve with your vision and speak authentically to your audience.',
    features: ['Brand Identity', 'Visual Systems', 'Brand Guidelines', 'Strategic Positioning'],
    layout: 'right',
    blurEffect: false
  },
  {
    id: 'experience-design',
    title: 'Experience Design',
    subtitle: 'Journeys that transform',
    description:
      'We orchestrate multi-sensory narratives that guide users through meaningful moments, creating lasting emotional impact.',
    features: ['User Experience', 'Service Design', 'Customer Journeys', 'Interactive Systems'],
    layout: 'center',
    blurEffect: true
  },
  {
    id: 'product-development',
    title: 'Product Development',
    subtitle: 'Innovation from concept to reality',
    description:
      'Bridging vision and execution, we transform ideas into tangible products that blend aesthetic excellence with functional brilliance.',
    features: ['Product Design', 'Prototyping', 'Manufacturing', 'Launch Strategy'],
    layout: 'left',
    blurEffect: false
  },
  {
    id: 'strategic-communications',
    title: 'Strategic Communications',
    subtitle: 'Narratives that connect',
    description:
      'We craft stories that cut through noise, building authentic connections between brands and the communities they serve.',
    features: ['Content Strategy', 'Campaign Design', 'Digital Presence', 'Community Building'],
    layout: 'full',
    blurEffect: true
  }
]

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#1e1d1d] text-white overflow-hidden">
      {/* Side Menu */}
      <SideMenu />

      {/* Morphing Light Background */}
      <div className="fixed inset-0 z-0">
        <MorphingLightCanvas scrollProgress={0.3} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 md:pl-20 lg:pl-24">
        {/* Hero Section with Video Background */}
        <HeroSection />

        {/* Services Grid */}
        <div id="services-list">
          {services.map((service, index) => (
            <ServiceSection key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
          poster="/images/services-poster.jpg"
        >
          <source src="/videos/services-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1d1d]/60 via-transparent to-[#1e1d1d]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative w-32 h-10 md:w-48 md:h-16 mx-auto">
            <Image src="/logo.svg" alt="OloSoma" fill className="object-contain" priority />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter">
            Our
            <br />
            <span className="text-[#62bfa4]">Services</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-2xl font-light text-white/80 leading-relaxed">
              Design systems across space, product, brand, and digital—with measurable outputs at every stage.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

function ServiceSection({ service, index }: { service: Service; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center px-6 md:px-12 py-24 md:py-32"
    >
      {service.blurEffect && (
        <div className="absolute inset-0 bg-[#1e1d1d]/70 backdrop-blur-[120px]" style={{ zIndex: -1 }} />
      )}

      <div className="max-w-7xl mx-auto w-full">
        {service.layout === 'left' && <LeftLayout service={service} index={index} />}
        {service.layout === 'right' && <RightLayout service={service} index={index} />}
        {service.layout === 'center' && <CenterLayout service={service} index={index} />}
        {service.layout === 'full' && <FullLayout service={service} index={index} />}
      </div>
    </motion.section>
  )
}

function LeftLayout({ service, index }: { service: Service; index: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="md:col-span-7 space-y-6"
      >
        <div className="text-sm font-light text-white/40 tracking-[0.3em] uppercase">0{index + 1}</div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">{service.title}</h2>
        <p className="text-xl md:text-2xl font-light text-white/60">{service.subtitle}</p>
        <p className="text-lg text-white/80 leading-relaxed max-w-2xl">{service.description}</p>
        <div className="grid grid-cols-2 gap-4 pt-6">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-[#62bfa4]" />
              <span className="text-sm font-light text-white/70">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:col-span-5 flex items-center justify-center"
      >
        <div className="w-full aspect-square max-w-md border-2 border-white/10 rounded-2xl backdrop-blur-sm bg-white/5 flex items-center justify-center">
          <div className="text-8xl font-bold text-white/10">{index + 1}</div>
        </div>
      </motion.div>
    </div>
  )
}

function RightLayout({ service, index }: { service: Service; index: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="md:col-span-5 flex items-center justify-center order-2 md:order-1"
      >
        <div className="w-full aspect-square max-w-md border-2 border-white/10 rounded-2xl backdrop-blur-sm bg-white/5 flex items-center justify-center">
          <div className="text-8xl font-bold text-white/10">{index + 1}</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:col-span-7 space-y-6 order-1 md:order-2"
      >
        <div className="text-sm font-light text-white/40 tracking-[0.3em] uppercase">0{index + 1}</div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">{service.title}</h2>
        <p className="text-xl md:text-2xl font-light text-white/60">{service.subtitle}</p>
        <p className="text-lg text-white/80 leading-relaxed max-w-2xl">{service.description}</p>
        <div className="grid grid-cols-2 gap-4 pt-6">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-[#64b1f2]" />
              <span className="text-sm font-light text-white/70">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function CenterLayout({ service, index }: { service: Service; index: number }) {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <div className="text-sm font-light text-white/40 tracking-[0.3em] uppercase">0{index + 1}</div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">{service.title}</h2>
        <p className="text-2xl md:text-3xl font-light text-white/60">{service.subtitle}</p>
        <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">{service.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
          {service.features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center gap-2 text-center">
              <div className="w-2 h-2 rounded-full bg-[#62bfa4]" />
              <span className="text-sm font-light text-white/70">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function FullLayout({ service, index }: { service: Service; index: number }) {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <div className="text-sm font-light text-white/40 tracking-[0.3em] uppercase">0{index + 1}</div>
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold leading-none tracking-tighter max-w-6xl">
          {service.title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-2xl md:text-3xl font-light text-white/60 mb-6">{service.subtitle}</p>
          <p className="text-lg text-white/80 leading-relaxed">{service.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-4 border-l-2 border-white/20 pl-6 py-2">
              <span className="text-lg font-light text-white/90">{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function CTASection() {
  return (
    <section className="relative py-32 px-6 md:px-12">
      <div className="absolute inset-0 bg-[#1e1d1d]/70 backdrop-blur-[120px]" style={{ zIndex: -1 }} />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Ready to <span className="text-[#62bfa4]">Transform</span>?
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life through integrated design systems.
          </p>
          <Link
            href="/connect"
            className="inline-block px-8 py-4 bg-[#62bfa4] text-[#1e1d1d] font-bold rounded-lg hover:bg-[#7dd4ba] transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
        <div>&copy; {new Date().getFullYear()} OloSoma. All rights reserved.</div>
        <div className="flex gap-8">
          <Link href="/" className="hover:text-white/60 transition-colors">
            Home
          </Link>
          <Link href="/connect" className="hover:text-white/60 transition-colors">
            Connect
          </Link>
        </div>
      </div>
    </footer>
  )
}
