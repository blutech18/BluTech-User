# BluTech — Portfolio & Commission Platform

BluTech is a freelance portfolio and commission platform built for showcasing services, projects, and accepting client project requests. The site features buttery-smooth animations, a modern dark/light theme, and a fully dynamic content system powered by a shared Neon PostgreSQL database.

## What It Does

- **Services (What I Do)** — A horizontally scrolling card section displaying offered services like Web Development, App Development, UI/UX Design, Backend & APIs, and Automation & AI. Content is dynamically managed from the admin panel.
- **Marquee Carousel** — A continuously scrolling ticker that mirrors the service titles, keeping the brand presence consistent across the page.
- **Recent Projects (Showcase)** — Featured projects displayed as flip cards with gradient backgrounds, tech stacks, and detailed modals. Admin-managed with a "featured" flag.
- **Complete Portfolio** — A full archive of all active projects with staggered reveal animations, category filters, and expandable detail modals.
- **Commission Form** — A contact modal where potential clients submit project requests with name, email, project type, budget, and message. Submissions are stored in the database and trigger an email notification via Resend.

## Tech Stack

- **Framework** — TanStack Start (React 19 + TanStack Router)
- **Hosting** — Cloudflare Workers (edge deployment)
- **Database** — Neon PostgreSQL (serverless)
- **Styling** — Tailwind CSS v4, Framer Motion
- **Validation** — Zod
- **Email** — Resend
- **UI Components** — Radix UI, Lucide Icons, shadcn/ui

## Security

- Rate limiting on commission submissions (3 per 10 min per IP)
- Automatic IP blocking after repeated violations
- XSS sanitization on all user inputs
- SQL injection pattern detection (defense-in-depth over parameterized queries)
- Spam and bot detection on form submissions
- Security headers: CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff
