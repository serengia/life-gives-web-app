# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is a Next.js 14 marketing/conversion landing page for the book **"LIFE GIVES YOU WHAT YOU SETTLE FOR"** by James Serengia. The site sells two book packages to Kenyan readers (Ksh pricing) and routes all orders through WhatsApp (`wa.me` links).

## Commands

```bash
# Development
npm run dev        # Start dev server at localhost:3000

# Production
npm run build      # Build for production
npm run start      # Run production build locally

# Code quality
npm run lint       # ESLint with Next.js + TypeScript rules
```

No test suite is configured.

## Architecture

**Framework:** Next.js 14 App Router · **Language:** TypeScript (strict) · **Styling:** Tailwind CSS + shadcn/ui · **Icons:** Lucide React

The app is a single-page landing site. `src/app/page.tsx` imports all section components in order and renders them sequentially. There are no routes beyond the root `/`.

### Key directories

- `src/app/` — App Router entry point (`layout.tsx`, `page.tsx`, SEO files `robots.ts`/`sitemap.ts`)
- `src/components/sections/` — 11 page sections rendered in order (Hero → Problem → Solution → WhatsInside → Pricing → Testimonials → Author → FAQ → Order → OrderForm → Footer)
- `src/components/` — Two shared utilities: `FloatingOrderButton.tsx` (sticky CTA) and `RevealOnScroll.tsx` (scroll animation wrapper)
- `src/lib/constants.ts` — Single source of truth for all content data: products, pricing, author info, WhatsApp number, site metadata
- `src/lib/hooks/useInView.ts` — Intersection Observer hook powering scroll-reveal animations

### Data flow

All editable content (product names, prices, features, contact info) lives in `src/lib/constants.ts`. Components consume this data directly — editing copy means editing constants, not component files.

### Order flow

Users click CTAs throughout the page → WhatsApp deep link opens with pre-filled message → order is completed via WhatsApp chat. No backend, no payment gateway.

## Brand

- **Colors:** Navy `#0f172a`, Gold `#d97706`, Light `#f8fafc` (defined in `tailwind.config.ts`)
- **Fonts:** Playfair Display (headings), Inter (body) — loaded via `next/font/google` in `layout.tsx`

## Pre-Launch Checklist

`src/LAUNCH_CHECKLIST.md` tracks items still needed before going live: placeholder images, real WhatsApp number in `constants.ts`, real testimonials, domain/analytics setup.
