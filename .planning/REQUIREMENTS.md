# Requirements: OloSoma Website v2.0

**Defined:** 2026-06-15
**Core Value:** Communicate OloSoma clearly in one scroll, and convert OloSoma Manager interest into a confirmed wishlist email — without redundancy diluting the message.

## v1 Requirements

(v2.0 milestone scope — "v1" of this milestone's work)

### Orbital Timeline

- [ ] **ORBIT-01**: Homepage "How We Do It" section renders a radial orbital timeline (central core + nodes orbiting on a ring) instead of the SVG spiral
- [ ] **ORBIT-02**: The timeline shows the 5 methodology phases — Foresight, Strategy, Craft, Prototype, Test — each as an orbiting node with an icon and label
- [ ] **ORBIT-03**: Clicking/tapping a node expands a card with that phase's description and its connected phases; clicking a connected phase navigates to it
- [ ] **ORBIT-04**: Nodes auto-rotate, pause on interaction, and the visual matches brand teal `#62bfa4` on the dark base (not the demo's purple/blue)
- [ ] **ORBIT-05**: The timeline is responsive, keyboard/tap accessible, and respects `prefers-reduced-motion`
- [ ] **ORBIT-06**: Implemented with the site's existing stack (Tailwind + Framer Motion + inline SVG icons) — no new npm dependencies

### Communication / Copy

- [ ] **COPY-01**: The "40-60%" statistic appears at most once in the "How We Help You" section (currently repeated 3×)
- [ ] **COPY-02**: The redundant "Business Outcomes" list (which duplicates the "Delivered Outcomes" column) is removed or merged so each point is stated once
- [ ] **COPY-03**: The fake placeholder phone number (`+1 (234) 567-890`) is removed from the footer
- [ ] **COPY-04**: No factual/voice regressions — remaining copy still reads in the warm-direct brand voice

### Manager Teaser Landing

- [ ] **MGR-01**: A standalone route (e.g. `/manager`) renders a one-pager teaser for the OloSoma Manager product, reachable directly by URL
- [ ] **MGR-02**: The page explains what the platform offers — Olo as guide, 15 specialists, virtual office, document-first project intake — in brand voice, concise and non-redundant
- [ ] **MGR-03**: The page is visually coherent with the main site (dark base, teal accent, Framer Motion) and responsive
- [ ] **MGR-04**: The page has clear metadata (title/description/OG) for sharing as a standalone teaser

### Wishlist Capture

- [ ] **WISH-01**: The teaser has an "Add me to the wishlist" form capturing a single email with client-side validation
- [ ] **WISH-02**: Submitting posts to a website-side API route that proxies server-side to `app.olosoma.com/api/waitlist` with a `source` tag (e.g. `website_manager_teaser`)
- [ ] **WISH-03**: The form shows distinct success, already-on-list, validation-error, and rate-limited (429) states
- [ ] **WISH-04**: The proxy never exposes the upstream URL/secrets to the client and degrades gracefully if the upstream is unreachable
- [ ] **WISH-05**: No change is required to the Manager app or its backend for this to work

## v2 Requirements

Deferred — acknowledged, not in this milestone.

### Enhancements

- **ENH-01**: Wire live Resend email on the contact form
- **ENH-02**: Add the Manager teaser to site navigation / homepage cross-link (decide after teaser ships)
- **ENH-03**: Analytics event on wishlist conversion

## Out of Scope

| Feature | Reason |
|---------|--------|
| Full site rebuild | Codebase is sound; v2.0 refines |
| shadcn/ui + lucide-react + cva | Adapt to existing stack instead; avoid dependency sprawl |
| Modifying the Manager app/backend | Separate app/host; user requires no interference |
| New/separate waitlist datastore | Reuse Manager waitlist as single source of truth |
| Double opt-in UX on the website | Confirmation email + confirm page already exist on the Manager side |
| Sanity CMS integration | Content stays in code for launch speed |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ORBIT-01 | Phase 1 | Pending |
| ORBIT-02 | Phase 1 | Pending |
| ORBIT-03 | Phase 1 | Pending |
| ORBIT-04 | Phase 1 | Pending |
| ORBIT-05 | Phase 1 | Pending |
| ORBIT-06 | Phase 1 | Pending |
| COPY-01 | Phase 1 | Pending |
| COPY-02 | Phase 1 | Pending |
| COPY-03 | Phase 1 | Pending |
| COPY-04 | Phase 1 | Pending |
| MGR-01 | Phase 2 | Pending |
| MGR-02 | Phase 2 | Pending |
| MGR-03 | Phase 2 | Pending |
| MGR-04 | Phase 2 | Pending |
| WISH-01 | Phase 2 | Pending |
| WISH-02 | Phase 2 | Pending |
| WISH-03 | Phase 2 | Pending |
| WISH-04 | Phase 2 | Pending |
| WISH-05 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0 ✓

(Phase 3 is a cross-cutting polish/verify phase — it re-checks all requirements end-to-end rather than owning new ones.)

---
*Requirements defined: 2026-06-15*
*Last updated: 2026-06-15 after initialization*
