# OloSoma Website

## What This Is

The OloSoma marketing website — a Next.js 15 / React 19 / TypeScript site (Tailwind + Framer Motion + GSAP) that presents OloSoma, a global remote-first strategic design & innovation studio, to prospective clients. It deploys to Vercel from `github.com/Manecharo/OloSoma_Website` (branch `main`). This **v2.0** milestone refines the existing site as a communication exercise — tightening redundant copy, upgrading the homepage process visualization, and adding a standalone teaser landing page for the OloSoma Manager product with email-capture into the existing waitlist.

## Core Value

Communicate OloSoma clearly and memorably to a prospective client in one scroll — and convert interest in the OloSoma Manager product into a confirmed wishlist email — without redundancy diluting the message.

## Requirements

### Validated

<!-- Existing capabilities inferred from the current codebase (brownfield) -->

- ✓ Homepage with brutalist hero, morphing-gradient background, and side menu — existing (`ExperimentalLanding.tsx`)
- ✓ "How We Do It" process section rendered as an animated SVG spiral — existing
- ✓ "How We Help You" value-framework section (challenges vs outcomes) — existing
- ✓ "Who We Are" about section + contact/footer with email capture — existing
- ✓ Services pages (`/services`, `/services/olopulse`, `/services/somaforge`, `/services/somaweave`), `/studio`, `/connect` — existing
- ✓ Contact server action with Zod validation (Resend wiring stubbed) — existing (`app/actions/contact.ts`)
- ✓ Deploys to Vercel on push to `main` — existing

### Active

<!-- v2.0 scope -->

- [ ] Replace the homepage "How We Do It" SVG spiral with a **radial orbital timeline** of the 5-phase methodology (Foresight → Strategy → Craft → Prototype → Test), adapted to the existing Tailwind + Framer Motion stack and brand teal `#62bfa4` (no new heavy dependencies)
- [ ] **Communication/redundancy pass** on the homepage: remove repeated stats ("40-60%" stated 3×), collapse the "Business Outcomes" list that duplicates the "Delivered Outcomes" column, and remove the fake placeholder phone number
- [ ] **OloSoma Manager teaser landing page** — a standalone one-pager route explaining the AI-guided studio-management platform (Olo + 15 specialists, pixel office, document-first project intake) with a clear value proposition and CTA
- [ ] **"Add me to the wishlist" email capture** on the Manager teaser — posts to a website-side API route that proxies server-side to the existing `app.olosoma.com/api/waitlist` endpoint (decoupled; no change to the Manager app)
- [ ] Wishlist form gives clear success / duplicate / error feedback and validates email client-side

### Out of Scope

- Rebuilding the site from scratch — the codebase is sound; v2.0 refines, not replaces
- Adding shadcn/ui + lucide-react + class-variance-authority — the orbital component is adapted to the site's existing stack instead, to avoid dependency sprawl and visual inconsistency
- Modifying the OloSoma Manager app or its Fly/Supabase backend — the website only consumes its public waitlist endpoint
- A new/separate waitlist datastore — reuse the Manager's existing waitlist (single source of truth) per user decision
- Double opt-in UX changes — the confirmation email + confirm page already live on the Manager side; the website only triggers a signup
- Wiring Resend / live contact email — stays stubbed unless separately requested
- CMS (Sanity) integration — content stays in code for launch speed

## Context

- **Stack:** Next.js 15.5 (App Router), React 19, TypeScript 5, Tailwind CSS 3.4, Framer Motion 12, GSAP 3, Zod 4, Resend (installed, not wired). No shadcn/ui, no lucide-react.
- **Homepage architecture:** `app/page.tsx` → `components/experimental/ExperimentalLanding.tsx`, a single client component holding Hero, HowWeDoIt (spiral), HowWeHelpYou, About, Footer sections, over a fixed `MorphingLightCanvas` background. Brand dark base `#1e1d1d`, teal accent `#62bfa4`, secondary accents `#64b1f2` / `#f2648b`.
- **The "second section" the user referenced is "How We Do It"** — currently a custom SVG spiral with 5 waypoints (FORESIGHT, STRATEGY, CRAFT, PROTOTYPE, TEST) and the tagline "Enter anywhere. Return often." This is the section to convert to a radial orbital timeline. The spiral is not reused elsewhere.
- **OloSoma Manager** (separate repo, `olosoma-manager`, live at `app.olosoma.com` on Fly + Supabase): an AI-guided studio-management platform built around "Olo" (the guide) and 15 AI specialists, a pixel-art virtual office, multi-agent meetings, and document-first project intake ("drop a PDF, Olo proposes the project shape"). Marketed tagline already in use: "Your AI-guided creative studio manager. One platform, 15 specialists, zero admin."
- **Existing waitlist backend** (in the Manager app): `POST /api/waitlist` accepts `{ email, source }` (source must match `^[a-zA-Z0-9_-]*$`), is public + unauthenticated, always returns 200 to avoid enumeration, sends a double-opt-in confirmation email, and stores rows in `mgmt_waitlist_signups` (Supabase). Rate limited to **5 requests/min/IP**. There is an admin view of signups inside the Manager app.
- **Brand voice:** warm, knowledgeable, inviting, direct, confident — "experts genuinely excited to collaborate." Avoid corporate-poetic jargon ("synergistic", "systems of meaning"). Get to the point in the first sentence.
- **Environment note:** development happens locally first (`npm install` then `npm run dev`); pushing to `main` auto-deploys via Vercel. The current dev/build environment used to author this milestone has no network egress, so production install/build runs on Vercel.

## Constraints

- **Tech stack**: Stay within the existing stack (Tailwind + Framer Motion). No new heavy UI dependency families — Why: visual consistency + avoid bundle/maintenance bloat.
- **Decoupling**: The website must not depend on the Manager app's source or break it — Why: they are separate apps on separate hosts (Vercel vs Fly); user explicitly required no interference.
- **Rate limit**: The shared waitlist endpoint allows 5 req/min/IP — Why: a server-side proxy from pooled Vercel IPs must tolerate/handle 429s gracefully.
- **Deploy**: Changes land by pushing to `main`; verify locally before pushing — Why: production deploy is automatic on push.
- **Brand**: Teal `#62bfa4` accent on `#1e1d1d` dark base; warm-direct voice — Why: established brand identity.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Adapt the orbital-timeline component to the site's existing Tailwind + Framer Motion stack (inline SVG icons) instead of importing the shadcn/lucide/cva version | Site has no shadcn; importing it would add 3+ deps and clash with existing custom components | — Pending |
| Map the 5 orbital nodes to the existing methodology phases (Foresight → Strategy → Craft → Prototype → Test) | Preserves the section's meaning; only the visualization changes | — Pending |
| Reuse the Manager's existing waitlist via a website-side server proxy route (no CORS, no Manager code change) | Single source of truth for signups; keeps the two apps fully decoupled per user requirement | — Pending |
| Manager teaser lives at a dedicated route on the marketing site (e.g. `/manager`) | User wants the teaser hosted on the website itself, on Vercel | — Pending |
| Trim redundancy in "How We Help You" + footer as part of v2.0 | User framed the whole effort as a communication exercise to increase precision | — Pending |
| Author planning docs directly (no roadmapper agent) for this milestone | Coarse 3-phase scope + deep context already gathered this session; avoids agent latency | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-15 after initialization (v2.0 milestone)*
