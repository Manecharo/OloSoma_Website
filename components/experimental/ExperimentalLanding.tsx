'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { MorphingLightCanvas } from './MorphingLightCanvas'
import { RandomPrintDecoration } from './PrintIcons'
import { SideMenu } from './SideMenu'

/**
 * ExperimentalLanding - Radical grid layout with morphing backgrounds
 *
 * Features:
 * - Asymmetric, magazine-style layouts
 * - Morphing gradient backgrounds
 * - High blur sections for visual contrast
 * - Product-focused sections
 * - Print-inspired decorative elements
 */

interface Product {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  layout: 'left' | 'right' | 'center' | 'full'
  blurEffect?: boolean
}

const products: Product[] = [
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

export function ExperimentalLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', v => setScrollProgress(v))
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#1e1d1d] text-white overflow-hidden">
      {/* Side Menu */}
      <SideMenu />

      {/* Morphing Light Background */}
      <div className="fixed inset-0 z-0">
        <MorphingLightCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Main Content - Add left padding for desktop side menu */}
      <div className="relative z-10 md:pl-20 lg:pl-24">
        {/* Hero Section */}
        <HeroSection scrollProgress={scrollProgress} />

        {/* Product Sections */}
        <div id="services">
          {products.map((product, index) => (
            <ProductSection key={product.id} product={product} index={index} scrollProgress={scrollProgress} />
          ))}
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

function HeroSection({ scrollProgress }: { scrollProgress: number }) {
  // Calculate opacity based on scroll progress
  const opacity = scrollProgress < 0.2 ? 1 - (scrollProgress / 0.2) : 0

  return (
    <motion.section
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-start px-6 md:px-12 py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Brutalist Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Logo Block - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-span-5 bg-black border-4 border-white p-8 md:p-10"
          >
            <motion.div
              animate={{
                filter: [
                  'brightness(1) sepia(0)',
                  'brightness(1.2) sepia(0.3) hue-rotate(150deg)',
                  'brightness(0.9) sepia(0.2)',
                  'brightness(1) sepia(0)'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.33, 0.66, 1]
              }}
              className="relative w-full h-20 md:h-24"
            >
              <Image src="/logo.svg" alt="OloSoma" fill className="object-contain" priority />
            </motion.div>
          </motion.div>

          {/* Main Headline - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 md:col-span-7 bg-[#62bfa4] border-4 border-black p-8 md:p-10 flex items-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tighter text-black">
              Systems
              <br />
              of Meaning
            </h1>
          </motion.div>

          {/* AI Statement - Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-12 md:col-span-7 bg-white border-4 border-black p-8 md:p-10"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-black leading-tight mb-6">
              AI × Design × Technology
            </p>
            <p className="text-base md:text-lg font-bold text-black/70 uppercase tracking-wide">
              Next-Gen Tools. Human Vision.
            </p>
          </motion.div>

          {/* Icon Grid - Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4"
          >
            {/* AI Icon */}
            <div className="bg-black border-4 border-[#62bfa4] p-6 flex flex-col items-center justify-center aspect-square">
              <svg className="w-12 h-12 md:w-16 md:h-16 mb-3" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="28" stroke="#62bfa4" strokeWidth="4" />
                <circle cx="22" cy="26" r="4" fill="#62bfa4" />
                <circle cx="42" cy="26" r="4" fill="#62bfa4" />
                <rect x="20" y="38" width="24" height="4" fill="#62bfa4" />
                <path d="M12 12 L20 20 M44 20 L52 12 M12 52 L20 44 M44 44 L52 52" stroke="#62bfa4" strokeWidth="3" />
              </svg>
              <span className="text-xs font-black uppercase text-[#62bfa4] tracking-wider">AI</span>
            </div>

            {/* Speed Icon */}
            <div className="bg-black border-4 border-white p-6 flex flex-col items-center justify-center aspect-square">
              <svg className="w-12 h-12 md:w-16 md:h-16 mb-3" viewBox="0 0 64 64" fill="none">
                <path d="M8 32 L32 8 L32 28 L56 28 L32 56 L32 36 L8 36 Z" fill="white" />
              </svg>
              <span className="text-xs font-black uppercase text-white tracking-wider">Fast</span>
            </div>

            {/* Precision Icon */}
            <div className="bg-black border-4 border-white p-6 flex flex-col items-center justify-center aspect-square">
              <svg className="w-12 h-12 md:w-16 md:h-16 mb-3" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="4" fill="white" />
                <circle cx="32" cy="32" r="12" stroke="white" strokeWidth="3" />
                <circle cx="32" cy="32" r="20" stroke="white" strokeWidth="2" />
                <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="1" />
                <line x1="32" y1="4" x2="32" y2="12" stroke="white" strokeWidth="3" />
                <line x1="32" y1="52" x2="32" y2="60" stroke="white" strokeWidth="3" />
                <line x1="4" y1="32" x2="12" y2="32" stroke="white" strokeWidth="3" />
                <line x1="52" y1="32" x2="60" y2="32" stroke="white" strokeWidth="3" />
              </svg>
              <span className="text-xs font-black uppercase text-white tracking-wider">Precise</span>
            </div>

            {/* Infinite Icon */}
            <div className="bg-black border-4 border-[#62bfa4] p-6 flex flex-col items-center justify-center aspect-square">
              <svg className="w-12 h-12 md:w-16 md:h-16 mb-3" viewBox="0 0 64 64" fill="none">
                <path
                  d="M8 32 C8 24 12 20 18 20 C24 20 28 24 32 32 C36 40 40 44 46 44 C52 44 56 40 56 32 C56 24 52 20 46 20 C40 20 36 24 32 32 C28 40 24 44 18 44 C12 44 8 40 8 32 Z"
                  stroke="#62bfa4"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
              <span className="text-xs font-black uppercase text-[#62bfa4] tracking-wider">Iterate</span>
            </div>
          </motion.div>

          {/* Bottom Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="col-span-12 bg-[#1e1d1d] border-4 border-white/20 p-6 text-center"
          >
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white/80">
              Where Technology Amplifies Human Creativity
            </p>
          </motion.div>
        </div>

        {/* Scroll Arrow - Brutalist Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-8 h-8 border-4 border-white/60 flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M8 2 L8 14 M3 9 L8 14 L13 9" stroke="white" strokeWidth="2" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function ProductSection({
  product,
  index,
  scrollProgress
}: {
  product: Product
  index: number
  scrollProgress: number
}) {
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
      {product.blurEffect && (
        <div className="absolute inset-0 bg-[#1e1d1d]/70 backdrop-blur-[120px]" style={{ zIndex: -1 }} />
      )}

      <RandomPrintDecoration count={6} />

      <div className="max-w-7xl mx-auto w-full">
        {product.layout === 'left' && <LeftLayout product={product} index={index} />}
        {product.layout === 'right' && <RightLayout product={product} index={index} />}
        {product.layout === 'center' && <CenterLayout product={product} index={index} />}
        {product.layout === 'full' && <FullLayout product={product} index={index} />}
      </div>
    </motion.section>
  )
}

function LeftLayout({ product, index }: { product: Product; index: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
      {/* Content - Left 7 columns */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="md:col-span-7 space-y-6"
      >
        <div className="text-sm font-light text-white/40 tracking-[0.3em] uppercase">0{index + 1}</div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          {product.title}
        </h2>

        <p className="text-xl md:text-2xl font-light text-white/60">{product.subtitle}</p>

        <p className="text-lg text-white/80 leading-relaxed max-w-2xl">{product.description}</p>

        <div className="grid grid-cols-2 gap-4 pt-6">
          {product.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-[#62bfa4]" />
              <span className="text-sm font-light text-white/70">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Visual element - Right 5 columns */}
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

function RightLayout({ product, index }: { product: Product; index: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
      {/* Visual element - Left 5 columns */}
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

      {/* Content - Right 7 columns */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:col-span-7 space-y-6 order-1 md:order-2"
      >
        <div className="text-sm font-light text-white/40 tracking-[0.3em] uppercase">0{index + 1}</div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          {product.title}
        </h2>

        <p className="text-xl md:text-2xl font-light text-white/60">{product.subtitle}</p>

        <p className="text-lg text-white/80 leading-relaxed max-w-2xl">{product.description}</p>

        <div className="grid grid-cols-2 gap-4 pt-6">
          {product.features.map((feature, i) => (
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

function CenterLayout({ product, index }: { product: Product; index: number }) {
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

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
          {product.title}
        </h2>

        <p className="text-2xl md:text-3xl font-light text-white/60">{product.subtitle}</p>

        <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">{product.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
          {product.features.map((feature, i) => (
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

function FullLayout({ product, index }: { product: Product; index: number }) {
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
          {product.title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-2xl md:text-3xl font-light text-white/60 mb-6">{product.subtitle}</p>
          <p className="text-lg text-white/80 leading-relaxed">{product.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {product.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-4 border-l-2 border-white/20 pl-6 py-2">
              <span className="text-lg font-light text-white/90">{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen flex items-center px-6 md:px-12 py-32 md:py-40">
      {/* High blur effect for contrast */}
      <div className="absolute inset-0 bg-[#1e1d1d]/70 backdrop-blur-[120px]" style={{ zIndex: -1 }} />

      <RandomPrintDecoration count={10} />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left Column - Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                About
                <br />
                <span className="text-[#62bfa4]">OloSoma</span>
              </h2>
              <div className="w-20 h-1 bg-[#62bfa4]" />
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                We are architects of experience, crafting systems where design, technology, and human emotion converge
                into something greater than the sum of their parts.
              </p>
              <p>
                Every project is an exploration—a deliberate pursuit of beauty, function, and meaning. We believe the
                most powerful work emerges at the intersection of intuition and intelligence, where AI augments human
                creativity rather than replacing it.
              </p>
              <p>
                Through spatial design, brand systems, and digital experiences, we build environments that don't just
                communicate—they resonate, transform, and endure.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Approach & Values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Approach */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white/90">Our Approach</h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Human-Centered',
                    description: 'Every solution begins with deep empathy for the people who will experience it.'
                  },
                  {
                    title: 'Technologically Advanced',
                    description: 'We harness AI and cutting-edge tools to push the boundaries of what\'s possible.'
                  },
                  {
                    title: 'Aesthetically Rigorous',
                    description: 'Beauty is not decoration—it\'s a fundamental requirement for meaningful work.'
                  },
                  {
                    title: 'Strategically Grounded',
                    description: 'Creative vision must serve business goals and drive measurable impact.'
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="border-l-2 border-[#62bfa4]/40 pl-6 py-2"
                  >
                    <h4 className="font-semibold text-white/90 mb-1">{item.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats or Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                { number: '15+', label: 'Years Combined' },
                { number: '100+', label: 'Projects Delivered' },
                { number: '3', label: 'Continents' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  className="text-center space-y-2"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#62bfa4]">{stat.number}</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="connect" className="relative py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-8 mb-16">
          <h3 className="text-4xl md:text-5xl font-bold">Let's Create Together</h3>
          <p className="text-xl text-white/60">
            Ready to transform your vision into reality? We're here to listen, collaborate, and deliver exceptional
            results.
          </p>
          <a
            href="mailto:hello@olosoma.com"
            className="inline-block px-10 py-5 border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-[#62bfa4] transition-all duration-300 text-sm tracking-wide uppercase font-medium"
          >
            Start a Project
          </a>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <div>© {new Date().getFullYear()} OloSoma. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white/60 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white/60 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
