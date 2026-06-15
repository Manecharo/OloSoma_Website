'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { WishlistForm } from './WishlistForm'

/**
 * ManagerTeaser — standalone one-pager for the OloSoma Manager product.
 * Brand-coherent with the main site (dark base, teal accent, Framer Motion),
 * but self-contained so it works as a shareable teaser link.
 */

const CAPABILITIES = [
  {
    title: 'Olo, your studio guide',
    body: 'A conversational guide that sets up your studio, understands each project, and brings in the right specialist at the right moment — so nothing falls through the cracks.',
  },
  {
    title: 'A full team of 15 specialists',
    body: 'Brand, interiors, UX/UI, copy, concept, sustainability, marketing, project management, finance and more — each a domain expert with real tools, not a generic chatbot.',
  },
  {
    title: 'A studio that runs itself',
    body: 'A living virtual office where your team meets, debates, and produces deliverables. Multi-agent meetings turn a question into minutes, briefs, and next steps.',
  },
  {
    title: 'Start from a document',
    body: 'Drop a brief, a PDF, or a sketch. Olo reads it and proposes the shape of the project — scope, phases, and who should work on it — before you type a word.',
  },
]

const SPECIALIST_CHIPS = [
  'Brand',
  'Interiors',
  'UX / UI',
  'Copywriting',
  'Concept Design',
  'Sustainability',
  'Marketing',
  'Project Management',
  'Finance',
  'The Auditor',
]

export function ManagerTeaser() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[#62bfa4]/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[40vh] w-[40vh] rounded-full bg-[#64b1f2]/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-6 md:px-12">
          <Link href="/" className="relative block h-8 w-32" aria-label="OloSoma home">
            <Image src="/logo.svg" alt="OloSoma" fill className="object-contain object-left" priority />
          </Link>
          <a
            href="#wishlist"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/70 transition-colors hover:border-[#62bfa4] hover:text-white"
          >
            Join the wishlist
          </a>
        </header>

        {/* Hero */}
        <section className="flex flex-col items-center px-6 pb-20 pt-12 text-center md:pt-20">
          {/* Olo orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative mb-10 flex h-28 w-28 items-center justify-center"
          >
            <span className="olo-orbital-pulse absolute h-28 w-28 rounded-full" style={{ background: 'radial-gradient(circle, rgba(98,191,164,0.8) 0%, rgba(98,191,164,0.15) 60%, transparent 75%)' }} />
            <span className="absolute h-40 w-40 rounded-full border border-[#62bfa4]/15" />
            <span className="relative h-14 w-14 rounded-full bg-[#62bfa4]" style={{ boxShadow: '0 0 40px rgba(98,191,164,0.6)' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-[#62bfa4]"
          >
            OloSoma Manager · Private beta
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl lg:text-8xl"
          >
            Run your studio
            <br />
            <span className="text-[#62bfa4]">with Olo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-white/75 md:text-2xl"
          >
            Your AI-guided creative studio manager.{' '}
            <span className="text-white">One platform, 15 specialists, zero admin.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/55"
          >
            Built for architecture, interiors, branding and product studios — OloSoma Manager gives a
            small team the back-office of a big one: a guide, a full bench of specialists, and a studio
            that keeps moving while you focus on the work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10"
          >
            <a
              href="#wishlist"
              className="inline-block rounded-lg bg-[#62bfa4] px-8 py-4 font-semibold text-[#0a0a0a] transition-all hover:bg-[#62bfa4]/90"
            >
              Add me to the wishlist
            </a>
          </motion.div>
        </section>

        {/* What you get */}
        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-sm font-light uppercase tracking-[0.3em] text-[#62bfa4]">
              What you get
            </h2>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  className="bg-[#0a0a0a] p-8 md:p-10"
                >
                  <div className="mb-3 font-mono text-xs text-[#62bfa4]">{`0${i + 1}`}</div>
                  <h3 className="mb-3 text-xl font-bold text-white">{cap.title}</h3>
                  <p className="leading-relaxed text-white/60">{cap.body}</p>
                </motion.div>
              ))}
            </div>

            {/* Specialist chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
                Your bench of specialists
              </p>
              <div className="flex flex-wrap gap-2">
                {SPECIALIST_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/70"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Wishlist */}
        <section id="wishlist" className="scroll-mt-24 px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-14">
            <h2 className="text-3xl font-black uppercase leading-tight tracking-tighter md:text-5xl">
              Be first to <span className="text-[#62bfa4]">test it</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              OloSoma Manager is in private beta. Add your email to the wishlist and we&apos;ll reach out
              when there&apos;s a spot for your studio to try it.
            </p>
            <div className="mt-8">
              <WishlistForm />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 py-10 md:px-12">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-white/40 md:flex-row">
            <div>© {new Date().getFullYear()} OloSoma. All rights reserved.</div>
            <Link href="/" className="uppercase tracking-wide transition-colors hover:text-white/70">
              ← Back to olosoma.com
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
