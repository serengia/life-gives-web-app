# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

Next.js 14 marketing/conversion landing page for **"LIFE GIVES YOU WHAT YOU SETTLE FOR"** by James Serengia. Sells two book packages (Ksh pricing) to Kenyan readers via WhatsApp order flow. Also includes a full blog with a password-protected admin CMS backed by a Neon PostgreSQL database.

## Commands

```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint (Next.js + TypeScript rules)

npm run db:generate  # Generate Drizzle migration files from schema changes
npm run db:migrate   # Apply pending migrations to the database
npm run db:studio    # Open Drizzle Studio (local DB browser)
```

All `db:*` commands load `.env.local` automatically via `--env-file`.

## Architecture

**Stack:** Next.js 14 App Router · TypeScript (strict) · Tailwind CSS · Drizzle ORM + Neon PostgreSQL · `jose` JWT auth

### Landing page

`src/app/page.tsx` renders all section components sequentially — no routing, no state. `src/lib/constants.ts` is the single source of truth for all copy, pricing, products, WhatsApp number, and nav links. Editing copy means editing `constants.ts`, not components.

Order flow: CTA click → `wa.me` deep link with pre-filled WhatsApp message → no backend involved.

### Blog (`/blog`)

Public-facing blog at `/blog` and `/blog/[slug]`. Tag filtering at `/blog/tag/[slug]`. RSS feed at `/blog/feed.xml`. All data comes from Neon Postgres via Drizzle queries in `src/lib/db/queries.ts`. Posts have statuses: `draft | published | archived` — only `published` posts are publicly visible. Pagination is hardcoded to 8 posts per page (`PAGE_SIZE` in `queries.ts`). Blog post content is rendered as Markdown via `react-markdown` with `remark-gfm`, `rehype-sanitize`, `rehype-slug`, and `rehype-autolink-headings`.

### Admin CMS (`/admin`)

Password-protected CRUD interface for blog posts and tags. Protected by `middleware.ts` which validates a JWT session cookie on all `/admin/*` routes except `/admin/login`. Auth lives in `src/lib/auth.ts` — login sets a 7-day `httpOnly` session cookie signed with `AUTH_SECRET`. `ADMIN_PASSWORD` is compared with timing-safe equality.

### Database

Schema in `src/lib/db/schema.ts`: `posts`, `tags`, `post_tags` (M2M join table). Client in `src/lib/db/client.ts` uses `@neondatabase/serverless` + `drizzle-orm/neon-http`. Drizzle config (`drizzle.config.ts`) uses `DATABASE_URL_UNPOOLED` for migrations and `DATABASE_URL` (pooled) for runtime queries.

### Environment variables

Validated at startup by `src/lib/env.ts` (Zod schema — missing vars throw at boot, not at runtime):

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon pooled connection (runtime) |
| `DATABASE_URL_UNPOOLED` | Neon direct connection (migrations) |
| `ADMIN_PASSWORD` | Blog admin login password (min 8 chars) |
| `AUTH_SECRET` | JWT signing secret (min 32 chars) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap/OG tags |

## Brand

- **Colors:** Navy `#0f172a`, Gold `#d97706`, Light `#f8fafc` — defined in `tailwind.config.ts`
- **Fonts:** Playfair Display (headings, class `font-heading`), Inter (body) — via `next/font/google` in `layout.tsx`
- `SiteHeader` receives `links` as a prop from `NAV_LINKS` in `constants.ts` — add/remove nav items there.

## Pre-Launch

`src/LAUNCH_CHECKLIST.md` tracks outstanding items: real testimonials, placeholder images, production WhatsApp number in `constants.ts`, domain, and analytics.
