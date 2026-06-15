import { NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * Wishlist proxy.
 *
 * The marketing site (Vercel) and the OloSoma Manager app (Fly) are fully
 * decoupled. To capture "add me to the wishlist" emails into the Manager's
 * existing waitlist WITHOUT touching that app or exposing it to the browser,
 * this route accepts the email same-origin and forwards it server-side to the
 * Manager's public waitlist endpoint.
 *
 * The upstream URL is overridable via MANAGER_WAITLIST_URL (defaults to prod).
 * The client only ever sees a small, stable JSON shape — never the upstream.
 */

const UPSTREAM_URL =
  process.env.MANAGER_WAITLIST_URL ?? 'https://app.olosoma.com/api/waitlist'

// Tag so signups from the teaser are distinguishable in the Manager admin view.
// Must match the upstream's source regex: ^[a-zA-Z0-9_-]*$
const SOURCE = 'website_manager_teaser'

const bodySchema = z.object({
  email: z.string().email(),
})

type ClientResult =
  | { ok: true }
  | { ok: false; code: 'invalid' | 'rate_limited' | 'unreachable' }

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json<ClientResult>({ ok: false, code: 'invalid' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json<ClientResult>({ ok: false, code: 'invalid' }, { status: 400 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const upstream = await fetch(UPSTREAM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.data.email, source: SOURCE }),
      signal: controller.signal,
      cache: 'no-store',
    })

    // The upstream returns 200 for new / duplicate / already-verified alike
    // (no enumeration leak), so any 2xx is success from the visitor's view.
    if (upstream.ok) {
      return NextResponse.json<ClientResult>({ ok: true })
    }

    if (upstream.status === 429) {
      return NextResponse.json<ClientResult>({ ok: false, code: 'rate_limited' }, { status: 429 })
    }

    if (upstream.status === 400) {
      return NextResponse.json<ClientResult>({ ok: false, code: 'invalid' }, { status: 400 })
    }

    // 5xx or anything unexpected upstream.
    return NextResponse.json<ClientResult>({ ok: false, code: 'unreachable' }, { status: 502 })
  } catch {
    // Network failure, timeout/abort, DNS, etc.
    return NextResponse.json<ClientResult>({ ok: false, code: 'unreachable' }, { status: 502 })
  } finally {
    clearTimeout(timeout)
  }
}
