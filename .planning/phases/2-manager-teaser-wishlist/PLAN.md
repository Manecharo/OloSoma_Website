# Phase 2 Plan — Manager Teaser + Wishlist

**Goal:** A shareable standalone `/manager` one-pager that sells OloSoma Manager and captures wishlist emails into the existing Manager waitlist.

## Plan 02-01 — Wishlist API proxy route (WISH-02, WISH-04, WISH-05)
- NEW `app/api/wishlist/route.ts` — POST handler. Validates `{ email }` with Zod, then server-side `fetch` to `${MANAGER_WAITLIST_URL}` (default `https://app.olosoma.com/api/waitlist`) with `{ email, source: 'website_manager_teaser' }`.
- Maps upstream status → small JSON the client understands: 200 → `{ ok:true }`; 429 → `{ ok:false, code:'rate_limited' }`; 400 → `{ ok:false, code:'invalid' }`; network/other → `{ ok:false, code:'unreachable' }` (502).
- Never leaks the upstream URL to the client; URL overridable via `MANAGER_WAITLIST_URL` env. 8s timeout via AbortController.

## Plan 02-02 — Manager teaser page (MGR-01..04, WISH-01, WISH-03)
- NEW `app/manager/page.tsx` — server component with `metadata` (title/description/OG) + renders the client teaser.
- NEW `components/manager/ManagerTeaser.tsx` — client component: hero (Olo + tagline), "what it offers" value blocks (Olo guide, 15 specialists, virtual office, document-first intake), and the wishlist form section. Brand dark + teal, Framer Motion, responsive.
- NEW `components/manager/WishlistForm.tsx` — client form: email input + "Add me to the wishlist"; client-side email validation; posts to `/api/wishlist`; distinct states: idle, submitting, success, already-listed (treated as success), invalid, rate_limited, error.

## Verification
- `/manager` reachable, responsive, brand-coherent, metadata present
- Form validates + posts to proxy; states render; proxy hides upstream + handles 429/unreachable
- No Manager-app change required
