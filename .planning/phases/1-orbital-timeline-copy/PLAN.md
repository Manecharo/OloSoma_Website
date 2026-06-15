# Phase 1 Plan — Homepage Orbital Timeline + Copy Precision

**Goal:** Replace the "How We Do It" SVG spiral with an interactive radial orbital timeline of the 5 methodology phases, and remove redundant homepage copy.

## Plan 01-01 — Radial Orbital Timeline component + integration

**Files:**
- NEW `components/ui/RadialOrbitalTimeline.tsx` — generic, props-driven orbital timeline (Tailwind + inline transitions, no new deps)
- EDIT `components/experimental/ExperimentalLanding.tsx` — replace the spiral SVG in `HowWeDoItSection` with the orbital timeline fed the 5 methodology phases; define inline SVG phase icons; trim the now-redundant right-column prose into a concise intro

**Component requirements (ORBIT-01..06):**
- Central glowing teal core + 5 nodes orbiting on a ring, auto-rotating
- Each node: inline SVG icon + label (Foresight, Strategy, Craft, Prototype, Test)
- Click a node → expand a card with description + "connected phases" buttons (relatedIds); clicking a connected phase opens it
- Auto-rotation pauses while a node is open; resumes on background click / close
- Brand teal `#62bfa4` on dark; responsive radius (measured container); `prefers-reduced-motion` disables auto-rotate
- Nodes are real `<button>`s (keyboard accessible, aria-expanded)

## Plan 01-02 — Communication pass

**File:** EDIT `components/experimental/ExperimentalLanding.tsx`
- COPY-01: "40-60%" appears once (keep the stat row; drop the duplicate in prose + business-outcomes list)
- COPY-02: remove the "Business Outcomes" bullet list that duplicates the "Delivered Outcomes" column; keep one concise framework paragraph
- COPY-03: remove fake phone `+1 (234) 567-890` from the footer
- COPY-04: preserve warm-direct brand voice

## Verification
- Section renders orbital timeline; nodes expand; rotation pauses; brand colors; responsive; reduced-motion respected
- No duplicated stats/outcomes; no fake phone
- `npm run build` deferred to Phase 3 (no network locally), but code must be type-correct
