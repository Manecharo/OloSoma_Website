'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MorphingLightCanvas } from './MorphingLightCanvas'
import { RandomPrintDecoration } from './PrintIcons'
import { SocialIcons } from './SocialIcons'

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
      {/* Morphing Light Background */}
      <div className="fixed inset-0 z-0">
        <MorphingLightCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection scrollProgress={scrollProgress} />

        {/* Product Sections */}
        {products.map((product, index) => (
          <ProductSection key={product.id} product={product} index={index} scrollProgress={scrollProgress} />
        ))}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

function HeroSection({ scrollProgress }: { scrollProgress: number }) {
  const opacity = useTransform([scrollProgress], [0, 0.2], [1, 0])

  return (
    <motion.section
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12"
    >
      <RandomPrintDecoration count={12} />

      <div className="max-w-7xl mx-auto">
        {/* Radical asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Main title - occupies left side */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
              style={{
                textShadow: '0 0 60px rgba(98, 191, 164, 0.3)'
              }}
            >
              Systems
              <br />
              of
              <br />
              Meaning
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl font-light text-white/80 max-w-md"
            >
              We design experiences that bridge the physical and digital, creating holistic ecosystems where brands
              thrive.
            </motion.p>
          </div>

          {/* Side content - floating stats/info */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="border-l-2 border-[#62bfa4] pl-6"
            >
              <div className="text-4xl font-bold mb-2">360°</div>
              <div className="text-sm font-light text-white/60 tracking-wide uppercase">Integrated Approach</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="border-l-2 border-[#64b1f2] pl-6"
            >
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-sm font-light text-white/60 tracking-wide uppercase">Core Services</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="border-l-2 border-[#f2648b] pl-6"
            >
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-sm font-light text-white/60 tracking-wide uppercase">Possibilities</div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="text-sm font-light text-white/60 tracking-[0.3em] uppercase">Explore</div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
          />
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
      className={`relative min-h-screen flex items-center px-6 md:px-12 py-24 md:py-32 ${
        product.blurEffect ? 'backdrop-blur-xl' : ''
      }`}
    >
      {product.blurEffect && (
        <div className="absolute inset-0 bg-[#1e1d1d]/40 backdrop-blur-3xl" style={{ zIndex: -1 }} />
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

function Footer() {
  return (
    <footer className="relative py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">Let's Create Together</h3>
            <p className="text-lg text-white/60 max-w-md">
              Ready to transform your vision into reality? We're here to listen, collaborate, and deliver exceptional
              results.
            </p>
            <a
              href="mailto:hello@olosoma.com"
              className="inline-block px-8 py-4 border-2 border-white/30 rounded-full hover:bg-white/10 transition-colors duration-300 text-sm tracking-wide uppercase"
            >
              Start a Project
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <SocialIcons />
          </div>
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
