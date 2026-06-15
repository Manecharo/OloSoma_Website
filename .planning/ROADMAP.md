# Roadmap: OloSoma Website v2.0

## Overview

v2.0 is a focused refinement of the existing OloSoma marketing site, framed as a communication exercise. Phase 1 upgrades the homepage's process visualization to a radial orbital timeline and trims redundant copy. Phase 2 adds a standalone teaser landing page for the OloSoma Manager product with a wishlist email capture that reuses the existing waitlist backend. Phase 3 is a cross-cutting polish + verification pass before pushing to Vercel.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Homepage Orbital Timeline + Copy Precision** - Replace the spiral process section with a radial orbital timeline and remove redundant homepage copy
- [ ] **Phase 2: Manager Teaser + Wishlist** - Standalone OloSoma Manager teaser one-pager with email capture proxied to the existing waitlist
- [ ] **Phase 3: Polish, Verify & Ship** - End-to-end check, responsive/accessibility/build verification, then push to trigger Vercel

## Phase Details

### Phase 1: Homepage Orbital Timeline + Copy Precision
**Goal**: The homepage "How We Do It" section presents the 5-phase methodology as an interactive radial orbital timeline in brand styling, and the homepage no longer repeats information.
**Depends on**: Nothing (first phase)
**Requirements**: ORBIT-01, ORBIT-02, ORBIT-03, ORBIT-04, ORBIT-05, ORBIT-06, COPY-01, COPY-02, COPY-03, COPY-04
**UI hint**: yes
**Success Criteria** (what must be TRUE):
  1. The "How We Do It" section shows a rotating radial orbital timeline with 5 labeled, icon'd phase nodes (Foresight → Strategy → Craft → Prototype → Test) instead of the spiral
  2. A visitor can click a node to expand its description and jump to connected phases; auto-rotation pauses while a node is open
  3. The timeline uses brand teal `#62bfa4` on the dark base, is responsive, and respects reduced-motion — with no new npm dependencies
  4. The "How We Help You" section states each fact once (no "40-60%" repeated 3×, no duplicated outcomes list) and the fake footer phone number is gone

Plans:
- [x] 01-01: Build the `RadialOrbitalTimeline` component (Tailwind + Framer Motion + inline SVG icons), wire it into `HowWeDoItSection` with the 5 methodology phases
- [x] 01-02: Communication pass — dedupe "How We Help You" copy + remove placeholder phone

### Phase 2: Manager Teaser + Wishlist
**Goal**: A shareable standalone page sells the OloSoma Manager product and lets a visitor join the wishlist, with their email landing in the existing Manager waitlist.
**Depends on**: Phase 1 (shares brand patterns/components)
**Requirements**: MGR-01, MGR-02, MGR-03, MGR-04, WISH-01, WISH-02, WISH-03, WISH-04, WISH-05
**UI hint**: yes
**Success Criteria** (what must be TRUE):
  1. Visiting `/manager` renders a coherent, responsive one-pager explaining Olo + 15 specialists + the platform value, in brand voice
  2. The "Add me to the wishlist" form validates an email and submits without page reload
  3. A successful submit reaches `app.olosoma.com/api/waitlist` via a server-side proxy route (verified by the success/duplicate states), with no Manager-app change
  4. The form shows distinct success, already-listed, validation-error, and rate-limited states; the proxy hides upstream details and degrades gracefully

Plans:
- [x] 02-01: Wishlist API proxy route handler (`/api/wishlist`) + graceful upstream/error handling
- [x] 02-02: Manager teaser page (`/manager`) — hero, value sections, wishlist form component, metadata

### Phase 3: Polish, Verify & Ship
**Goal**: Everything works together, looks right across breakpoints, builds cleanly, and is pushed to deploy.
**Depends on**: Phase 2
**Requirements**: (cross-cutting — re-verifies all v2.0 requirements)
**UI hint**: yes
**Success Criteria** (what must be TRUE):
  1. `npm run build` (and lint/typecheck) pass locally with no new errors
  2. Homepage orbital timeline + Manager teaser render correctly at mobile and desktop widths
  3. All v2.0 requirements (ORBIT/COPY/MGR/WISH) are verified against the running site
  4. Changes are committed and pushed to `main`, triggering the Vercel deploy

Plans:
- [x] 03-01: Build/lint/typecheck fixes, responsive + accessibility QA, requirement re-verification, push

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Homepage Orbital Timeline + Copy Precision | 2/2 | Complete | 2026-06-15 |
| 2. Manager Teaser + Wishlist | 2/2 | Complete | 2026-06-15 |
| 3. Polish, Verify & Ship | 1/1 | Verified — push pending | 2026-06-15 |
