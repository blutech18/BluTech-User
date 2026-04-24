# BluTech — Awwwards-style Portfolio Site

A single-page freelance portfolio for **BluTech**, structurally inspired by lenis.dev but reimagined in a bright, airy "cloud/tech" aesthetic. Buttery-smooth scrolling, massive typography, parallax, and a working commission inquiry form backed by Neon.

---

## Visual Direction

- **Palette**: White / off-white `#F8FAFC` background, Sky `#38BDF8` and Deep Tech Blue `#1D4ED8` accents, navy headings, slate body text.
- **Typography**: Inter (bold, tight tracking) — headings are display-scale design elements (clamp up to ~12rem).
- **Atmosphere**: Floating blurred blue orbs, soft gradient washes, glassmorphism cards with subtle borders.
- **Motion**: Lenis smooth scroll + Framer Motion for text reveal, parallax, sticky scroll, hover micro-interactions. Targets 60fps with `transform`/`opacity` only.

---

## Page Structure (single page, sectioned)

```text
┌─ Nav (minimal, fixed top, blur on scroll) ───────────────────┐
├─ Hero ───────────────────────────────────────────────────────┤
│   "Building the Future. Fluidly." (massive, masked reveal)  │
│   Subheadline + pill CTA (sky→deep blue gradient)           │
│   Floating blurred orbs + glass cards (mouse parallax)      │
├─ Marquee strip (BluTech / Web / Apps / UI/UX / Backend …)   │
├─ Services — sticky split ────────────────────────────────────┤
│   LEFT (sticky): "What I Do" + intro                         │
│   RIGHT (scrolls): 5 cards — Web Dev, App Dev, UI/UX,       │
│                    Backend & APIs, Automation & AI          │
├─ Showcase — Bento grid (mix) ────────────────────────────────┤
│   6–8 asymmetric cells: placeholder projects + tech stack   │
│   Hover: scale + deep-blue overlay with title/tags          │
├─ About / Process — short scroll-reveal section ──────────────┤
├─ Contact CTA — "Start a Project" opens form modal ──────────┤
├─ Footer ─────────────────────────────────────────────────────┤
│   Massive "BLUTECH" wordmark, social links, mailto         │
└──────────────────────────────────────────────────────────────┘
```

---

## Sections in Detail

**Hero** — Full-viewport. Headline reveals line-by-line via mask + Y-translate. Subheadline fades in. Sky→Deep-blue pill CTA "Start a Project" opens contact modal. 3–4 blurred orbs and 2 glass cards drift with mouse position (subtle, throttled).

**Services (sticky)** — Two-column. Left column pinned while the right scrolls 5 cards. Each card: icon, title, 2-line description, tag chips. Soft white background, sky-blue glow ring on hover.

1. Web Development
2. App Development
3. UI / UX Design
4. Backend & APIs
5. Automation & AI Integrations

**Bento Showcase** — Asymmetric grid (varying col/row spans). Mix of:
- Placeholder project cells (gradient cover + title + tags like "SaaS / 2024")
- Tech-stack cells (React, TypeScript, Next.js, Tailwind, Node, Postgres, etc.) with icon + one-line note

Hover scales image 1.03 and slides up a deep-blue overlay revealing title and tags.

**Contact CTA + Modal Form** — Sticky-feel section with big headline "Have an idea? Let's build it." and the same gradient pill button. Clicking opens a modal with: Name, Email, Project Type (select: Web / App / UI/UX / Backend / Automation / Other), Budget range (optional), Message. Zod-validated client + server. On submit → success state with confetti-free, tasteful checkmark animation.

**Footer** — Massive `BLUTECH` wordmark filling viewport width, then a thin row: GitHub · LinkedIn · Twitter · `mailto:`, plus copyright.

---

## Backend (Neon)

A single `commissions` table stores leads:

| column      | type                   | notes              |
|-------------|------------------------|--------------------|
| id          | uuid PK                | gen_random_uuid()  |
| name        | text                   | required, ≤100     |
| email       | text                   | required, valid    |
| project_type| text                   | enum-validated     |
| budget      | text                   | optional           |
| message     | text                   | required, ≤2000    |
| created_at  | timestamptz            | default now()      |

A TanStack Start server function (`createServerFn`, POST) validates the payload with Zod, inserts into Neon, and returns `{ ok: true }`. Basic in-memory rate limit (per-IP, 5/min) to deter spam. No PII returned to client beyond the success flag.

---

## Technical Notes

- **Framework**: TanStack Start (existing), React 19, Tailwind v4, Framer Motion, Lenis (`@studio-freight/lenis`), `lucide-react` icons.
- **Smooth scroll**: Lenis initialized in `__root.tsx` via a small client-only provider; respects `prefers-reduced-motion` (disables Lenis + most animations).
- **Routing**: Single primary route at `/` with sectioned components under `src/components/sections/`. Reusable primitives (`OrbField`, `RevealText`, `GlassCard`, `BentoCell`, `GradientButton`) under `src/components/`.
- **Database access**: Neon via `@neondatabase/serverless` driver inside the server function. Requires a `DATABASE_URL` (Neon connection string) added as a runtime secret — I'll request it during implementation.
- **Performance**: animate `transform`/`opacity` only; orbs use CSS `filter: blur` on GPU layers; Bento images lazy-loaded; reduced-motion fallback drops Lenis and uses instant reveals.
- **Responsive**: Mobile-first. Sticky services collapses to vertical stacked cards on <md. Hero typography scales with `clamp()`. Bento becomes 1–2 col grid on mobile.
- **Accessibility**: semantic landmarks, focus-visible rings on the gradient button, modal traps focus, form errors announced.

---

## What I'll Need From You During Build

- A **Neon `DATABASE_URL`** connection string (I'll prompt for it as a secret).
- Optional: real social links (GitHub / LinkedIn / Twitter / email) — otherwise I'll use placeholders you can swap.

Ready to build when you approve.