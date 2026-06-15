'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function WishlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return

    if (!EMAIL_REGEX.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setMessage(null)

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; code?: string }
        | null

      if (res.ok && data?.ok) {
        setStatus('success')
        return
      }

      if (res.status === 429 || data?.code === 'rate_limited') {
        setStatus('error')
        setMessage('Too many attempts. Please try again in a minute.')
        return
      }

      if (data?.code === 'invalid') {
        setStatus('error')
        setMessage('Please enter a valid email address.')
        return
      }

      setStatus('error')
      setMessage("Something went wrong on our side. Please try again shortly.")
    } catch {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="flex items-start gap-3 rounded-lg border border-[#62bfa4]/40 bg-[#62bfa4]/10 p-5"
      >
        <svg className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#62bfa4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <div>
          <p className="font-semibold text-white">You&apos;re on the list.</p>
          <p className="mt-1 text-sm text-white/70">
            Check your inbox to confirm your spot — we&apos;ll reach out when OloSoma Manager is ready
            for you to test.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="wishlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="wishlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') {
              setStatus('idle')
              setMessage(null)
            }
          }}
          disabled={status === 'submitting'}
          aria-invalid={status === 'error'}
          aria-describedby={message ? 'wishlist-message' : undefined}
          className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-[#62bfa4] focus:ring-1 focus:ring-[#62bfa4]"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-lg bg-[#62bfa4] px-6 py-3 font-semibold text-[#0a0a0a] transition-all hover:bg-[#62bfa4]/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Adding…' : 'Add me to the wishlist'}
        </button>
      </div>
      {message && (
        <p id="wishlist-message" className="mt-3 text-sm text-[#f2648b]">
          {message}
        </p>
      )}
      <p className="mt-3 text-xs text-white/40">
        No spam. One email when we&apos;re ready for testers — unsubscribe anytime.
      </p>
    </form>
  )
}
