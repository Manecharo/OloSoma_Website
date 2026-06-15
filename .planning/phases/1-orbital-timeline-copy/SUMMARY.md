# Phase 1 Summary — Homepage Orbital Timeline + Copy Precision

**Status:** Complete (pending Phase 3 build verification)
**Date:** 2026-06-15

## What shipped

### 01-01 — Radial orbital timeline (ORBIT-01..06)
- NEW `components/ui/RadialOrbitalTimeline.tsx`: generic, props-driven orbital diagram. Central glowing teal core + N nodes on an auto-rotating ring. Click a node → expand a detail card with description + "Connects to" quick-jump buttons. Auto-rotation pauses while a node is open and on background reset. Responsive radius via `ResizeObserver`; `prefers-reduced-motion` disables spin. Nodes are real `<button>`s (keyboard/aria). Built on Tailwind + plain React + inline SVG icons — **zero new dependencies**.
- EDIT `components/experimental/ExperimentalLanding.tsx`: `HowWeDoItSection` now renders the orbital timeline fed the 5 methodology phases (Foresight→Strategy→Craft→Prototype→Test) with relatedIds forming the loop (Test→Foresight). Added 5 inline SVG phase icons. Replaced the spiral SVG and the redundant right-column prose with a concise intro line; per-phase detail now lives in each node's card.
- EDIT `app/globals.css`: added `.olo-orbital-pulse` keyframe in `@layer utilities`.

### 01-02 — Communication pass (COPY-01..04)
- "40-60%" reduced from 3 occurrences to 1 (the stat row).
- Removed the `businessOutcomes` list that duplicated the Delivered Outcomes column; tightened the Value Framework to one complementary paragraph ("One team. One timeline. One bill.").
- Renamed outcome card "40-60% FASTER" → "FASTER DELIVERY".
- Removed the fake placeholder phone (`+1 (234) 567-890`) from the footer.

## Decisions
- Each orbital node carries its own phase description, which let us delete the redundant prose paragraph that previously described all phases at once — advancing both the visual upgrade and the communication goal in one move.

## Verification notes
- Grep-confirmed: no `businessOutcomes` references remain; "40-60%" appears once; no placeholder phone.
- `npm run build` / lint deferred to Phase 3 (no network egress locally; Vercel builds on push). Code is written to be type-correct.

## Commits
- `feat(home): replace spiral process diagram with radial orbital timeline`
- `refactor(home): cut redundant copy in How We Help You + footer`
