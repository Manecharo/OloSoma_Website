<!-- GSD:project-start source:PROJECT.md -->
## Project

**OloSoma Website**

The OloSoma marketing website — a Next.js 15 / React 19 / TypeScript site (Tailwind + Framer Motion + GSAP) that presents OloSoma, a global remote-first strategic design & innovation studio, to prospective clients. It deploys to Vercel from `github.com/Manecharo/OloSoma_Website` (branch `main`). This **v2.0** milestone refines the existing site as a communication exercise — tightening redundant copy, upgrading the homepage process visualization, and adding a standalone teaser landing page for the OloSoma Manager product with email-capture into the existing waitlist.

**Core Value:** Communicate OloSoma clearly and memorably to a prospective client in one scroll — and convert interest in the OloSoma Manager product into a confirmed wishlist email — without redundancy diluting the message.

### Constraints

- **Tech stack**: Stay within the existing stack (Tailwind + Framer Motion). No new heavy UI dependency families — Why: visual consistency + avoid bundle/maintenance bloat.
- **Decoupling**: The website must not depend on the Manager app's source or break it — Why: they are separate apps on separate hosts (Vercel vs Fly); user explicitly required no interference.
- **Rate limit**: The shared waitlist endpoint allows 5 req/min/IP — Why: a server-side proxy from pooled Vercel IPs must tolerate/handle 429s gracefully.
- **Deploy**: Changes land by pushing to `main`; verify locally before pushing — Why: production deploy is automatic on push.
- **Brand**: Teal `#62bfa4` accent on `#1e1d1d` dark base; warm-direct voice — Why: established brand identity.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
