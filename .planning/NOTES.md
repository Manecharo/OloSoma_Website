# Notes & Follow-ups — OloSoma Website v2.0

## Open follow-ups

### 1. Test waitlist row to remove (low priority, harmless)
During Phase 2 verification, the `/api/wishlist` proxy was tested with `tester@example.com`.
That email was submitted to the **live** OloSoma Manager waitlist (`app.olosoma.com/api/waitlist`)
and now exists there as an **unverified** signup.

**Impact:**
- It is unverified and will stay that way — the double-opt-in confirmation email was sent to
  `example.com`, an RFC-2606 reserved domain that cannot receive mail, so the link will never be clicked.
- It does not affect the website or the Manager app behaviour. It is one junk row in the
  `mgmt_waitlist_signups` table.
- If left, it simply sits as an unverified entry (it does not count as a confirmed wishlist member).

**How to clean up (whenever convenient):**
- Delete the row from the Manager app's admin waitlist view (WaitlistAdminSection), or
- Delete directly in Supabase: `delete from mgmt_waitlist_signups where email = 'tester@example.com';`

Decision (2026-06-15): leave it for now; handle in the future.

### 2. `/manager` inherits the site-wide intro animation
The teaser page is wrapped by the root layout's `IntroWrapper` (session-gated light-beam intro),
so a first-time visitor sees the brand intro before the teaser. Left as-is (out of scope for v2.0).
Revisit if the teaser should bypass the intro when shared as a standalone link.

### 3. Pre-existing (not introduced by v2.0)
- `app/layout.tsx` OpenGraph references `/og-image.jpg`, but only `/og-image.png` exists in `public/`.
  The `/manager` page correctly uses `/og-image.png`. Consider fixing the global OG image path.
- The homepage footer still declares unused `email`/`message` state (harmless; pre-existing).
