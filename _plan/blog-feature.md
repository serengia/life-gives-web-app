# Blog Feature — End-to-End Implementation Plan

> **Note on plan location:** Plan mode requires this file at `~/.claude/plans/`. The first implementation step will mirror this document to `life-gives/_plan/blog-feature.md` (the empty `_plan/` folder you asked for already exists at `life-gives/_plan/`).

## Context

The Next.js 14 marketing site at `life-gives/` is currently a single landing page that converts visitors to WhatsApp orders. To support content marketing, organic SEO, and ongoing engagement between book launches, James needs a real, author-driven blog backed by a managed Postgres database.

**Outcome:** A production-ready blog at `/blog` with a password-protected `/admin` authoring UI, persisting posts and tags in Neon Postgres via Drizzle ORM, with full SEO (sitemap, JSON-LD, dynamic OG images), markdown content, and a tag-filterable archive — all visually consistent with the existing navy/gold/Playfair brand.

## Locked Decisions

| Decision | Choice | Why |
|---|---|---|
| Database | **Neon** (serverless Postgres) | Free tier, native Vercel integration, branching for dev |
| ORM | **Drizzle + `@neondatabase/serverless`** | Edge-safe, type-safe, light |
| Content format | **Markdown stored in Postgres** | Rendered server-side via `react-markdown` + `remark-gfm` |
| Authoring | **`/admin` UI in app** | Single-author, password-protected |
| Auth | **`jose` HS256 JWT in httpOnly cookie** | Edge-safe (DIY HMAC fails in middleware); one small dep |
| Tags | **Many-to-many with `/blog/tag/[slug]` filter pages** | SEO + browsing utility |
| Revalidation | **`force-static` + `revalidatePath` from admin actions** | Instant edits; no time-based staleness |
| Status enum | **`draft \| published \| archived`** from day one | Soft-delete safety; no enum migration later |
| Slug rule | **Immutable after first publish** | Avoid breaking inbound links / SEO |

## Critical Pre-Refactor (Step 0)

The header in [`HeroSection.tsx`](life-gives/src/components/sections/HeroSection.tsx) hardcodes its own nav (3 links, not the 6 in `NAV_LINKS`) and lives *inside* the hero `<section>`. The same is true for `Footer.tsx`. Before adding blog routes, extract shared chrome:

1. **New `src/components/SiteHeader.tsx`** (Client Component)
   - Props: `links: {label, href}[]`, `variant: "transparent-over-hero" | "solid"`, `hrefPrefix?: string` (`""` on home, `"/"` on blog pages, so `#pricing` becomes `/#pricing`).
   - Owns scroll-position state and mobile menu (lifted from HeroSection).
2. **Refactor `Footer.tsx`** to consume `NAV_LINKS` from `constants.ts` with the same `hrefPrefix` pattern.
3. **`HeroSection.tsx`** drops its inline header and renders `<SiteHeader links={NAV_LINKS} variant="transparent-over-hero" />`.
4. **New `src/app/blog/layout.tsx`** renders `<SiteHeader links={NAV_LINKS} variant="solid" hrefPrefix="/" />` + children + Footer.

This refactor is mandatory and should land before any blog code.

## Implementation Phases

### Phase 1 — Neon + DB Foundation

**Neon setup (manual, ~5 min):**
1. Sign up at neon.tech, create project `life-gives` in `aws-eu-central-1` (closest to Kenya audience).
2. Copy both **pooled** (`...-pooler.neon.tech`) and **unpooled** (`...neon.tech` direct) connection strings.
3. Create `life-gives/.env.local`:
   ```
   DATABASE_URL=postgresql://...-pooler.neon.tech/neondb?sslmode=require
   DATABASE_URL_UNPOOLED=postgresql://...neon.tech/neondb?sslmode=require
   ADMIN_PASSWORD=<strong-password>
   AUTH_SECRET=<openssl rand -base64 32>
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
4. Add `.env.example` (committed) documenting the same keys with placeholder values.
5. Patch `.gitignore` (line 29) to also ignore plain `.env` and `.env.production`.

**Dependencies to add:**
- Runtime: `drizzle-orm`, `@neondatabase/serverless`, `react-markdown`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-sanitize`, `jose`, `slug`, `zod`, `date-fns`
- Dev: `drizzle-kit`, `@tailwindcss/typography`, `@types/slug`

**New files:**
- `life-gives/drizzle.config.ts` — points at `src/lib/db/schema.ts`, uses `DATABASE_URL_UNPOOLED` for migrations
- `life-gives/src/lib/env.ts` — zod schema validating all envs at module load; export typed `env`
- `life-gives/src/lib/db/schema.ts` — Drizzle schema (below)
- `life-gives/src/lib/db/client.ts` — `export const db = drizzle(neon(env.DATABASE_URL))`
- `life-gives/src/lib/db/queries.ts` — `getPublishedPosts`, `getPostBySlug`, `getAllPostsAdmin`, `getAllTags`, `getPostsByTag`, `getPostCount`

**Schema (key shape):**
```ts
// posts
id: serial().primaryKey()
slug: varchar(200).notNull().unique()
title: varchar(300).notNull()
excerpt: text().notNull()
content: text().notNull()                          // markdown
coverImageUrl: text()
readingTimeMin: integer().notNull().default(1)
status: postStatusEnum.notNull().default("draft")   // pgEnum: draft|published|archived
publishedAt: timestamp({ withTimezone: true, mode: "date" })
createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow()
updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date())

// tags
id, slug (unique), name

// postTags (junction)
postId, tagId — composite PK
```

**Indices:** unique on `posts.slug`, unique on `tags.slug`, partial index `(publishedAt DESC) WHERE status = 'published'`, reverse index on `postTags(tagId, postId)`.

**Package.json scripts:**
```json
"db:generate": "drizzle-kit generate",
"db:migrate":  "drizzle-kit migrate",
"db:studio":   "drizzle-kit studio"
```
(Skip `db:push` — generate+migrate is the prod-safe workflow.)

Run `npm run db:generate && npm run db:migrate` to create tables.

### Phase 2 — Auth & Middleware

**`life-gives/src/lib/auth.ts`:**
- `signSession(payload)` — `new SignJWT({sub:"admin"}).setExpirationTime("7d").sign(secret)` via `jose`
- `verifySession(token)` — `jwtVerify(token, secret, {algorithms:["HS256"]})`
- `getSession()` (Server) — reads cookie via `next/headers`, returns verified payload or `null`
- `setSessionCookie(token)` / `clearSessionCookie()` — Server Action helpers; cookie: `httpOnly`, `secure: env.NODE_ENV === "production"`, `sameSite: "lax"`, `path: "/"`, `maxAge: 7d`
- `verifyPassword(input)` — uses `crypto.timingSafeEqual` against hashed `ADMIN_PASSWORD`

**`life-gives/middleware.ts`:**
- Matches `/admin/:path*` (except `/admin/login`).
- Calls `verifySession` (Edge-safe via `jose`); redirects to `/admin/login?next=...` on failure.

**Login rate limit:** add `@upstash/ratelimit` + `@upstash/redis` (free tier, 10s setup). 5 attempts / 15 min per IP. Acceptable to defer this to Phase 6 polish if Upstash setup is friction.

### Phase 3 — Admin UI

All Server Components + Server Actions; no API routes.

**Routes:**
- `life-gives/src/app/admin/login/page.tsx` — form posting to `loginAction`
- `life-gives/src/app/admin/layout.tsx` — `AdminShell` with sidebar, logout button
- `life-gives/src/app/admin/page.tsx` — dashboard: posts table with status badges and actions
- `life-gives/src/app/admin/posts/new/page.tsx` — `<PostForm />`
- `life-gives/src/app/admin/posts/[id]/edit/page.tsx` — `<PostForm initial={post} />`

**Server actions** (`life-gives/src/app/admin/actions.ts`):
- `loginAction`, `logoutAction`
- `createPost`, `updatePost` (rejects slug change if status is `published`), `publishPost`, `unpublishPost`, `archivePost`, `deletePostHard` (requires explicit confirm token)
- Each mutation calls `revalidatePath("/blog")`, `revalidatePath("/blog/[slug]","page")`, `revalidatePath("/blog/tag/[slug]","page")`, `revalidatePath("/sitemap.xml")`.

**Components:**
- `life-gives/src/components/admin/AdminShell.tsx`
- `life-gives/src/components/admin/PostForm.tsx` — title, slug (auto-generated via `slug` pkg, editable until first publish), excerpt, cover URL, tag multi-select with create-on-the-fly, markdown textarea + **tabbed Write/Preview** (not live keystroke), localStorage autosave keyed by post id
- `life-gives/src/components/admin/PostsTable.tsx`

**Reading-time helper** (`src/lib/blog/readingTime.ts`): `Math.max(1, Math.ceil(wordCount / 230))`. Computed server-side on every save; never trust client value.

### Phase 4 — Public Blog Pages

- `life-gives/src/app/blog/page.tsx` — Server Component, paginated 8/page (offset). `export const dynamic = "force-static"`. Sets canonical URL per page (`/blog` for page 1, `/blog?page=N` otherwise).
- `life-gives/src/app/blog/[slug]/page.tsx` — Server Component. `generateMetadata` from post (title, excerpt, cover). JSON-LD `BlogPosting` with `publisher.logo` (book cover or wordmark).
- `life-gives/src/app/blog/tag/[tag]/page.tsx` — filtered list.

**Components** (`life-gives/src/components/blog/`):
- `BlogCard.tsx` — gold-on-navy hover state, RevealOnScroll wrapper, reuses existing patterns
- `BlogList.tsx` + `Pagination.tsx`
- `TagPill.tsx`
- `BlogPostBody.tsx` — `react-markdown` with `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-sanitize`. Custom `components.a` injects `rel="noopener noreferrer nofollow ugc"` and `target="_blank"` for external links.

**Styling:** add `@tailwindcss/typography` plugin to `tailwind.config.ts`. Blog pages use `prose prose-invert` against the navy background, with `--tw-prose-links` overridden to gold. Add `scroll-margin-top` to anchor targets to avoid sticky-header overlap.

### Phase 5 — SEO, OG Images, Feed

- **`life-gives/src/app/sitemap.ts`** — query published posts and tags, `lastModified` = `updatedAt`. Include `/blog` index + each post + each tag page.
- **`life-gives/src/app/blog/[slug]/opengraph-image.tsx`** — `next/og`-rendered branded card (navy bg, gold accent, Playfair title, author byline). 30 lines, dramatic share-CTR win.
- **`life-gives/src/app/blog/feed.xml/route.ts`** — RSS feed (Route Handler), published posts, `revalidate` via tag from admin actions.
- **`life-gives/src/app/robots.ts`** — already correct; verify sitemap URL uses `env.NEXT_PUBLIC_SITE_URL`.

### Phase 6 — Polish

- `next.config.mjs` — add `images.remotePatterns` with **explicit hostnames only** (no wildcards). Start with `images.unsplash.com` + your future CDN.
- `src/lib/constants.ts` — add `{ label: "Blog", href: "/blog" }` to `NAV_LINKS`.
- Upstash rate limit on `loginAction` (if not done in Phase 2).
- README / CLAUDE.md note: how to add a post, env requirements, Neon dashboard link.
- Final: copy this plan to `life-gives/_plan/blog-feature.md`.

## File Map (summary)

**New files:** ~30
- `drizzle.config.ts`, `middleware.ts`
- `src/lib/env.ts`, `src/lib/auth.ts`, `src/lib/blog/readingTime.ts`
- `src/lib/db/{schema,client,queries}.ts`
- `src/components/SiteHeader.tsx`
- `src/components/blog/{BlogCard,BlogList,BlogPostBody,Pagination,TagPill}.tsx`
- `src/components/admin/{AdminShell,PostForm,PostsTable}.tsx`
- `src/app/blog/{layout,page}.tsx`
- `src/app/blog/[slug]/{page,opengraph-image}.tsx`
- `src/app/blog/tag/[tag]/page.tsx`
- `src/app/blog/feed.xml/route.ts`
- `src/app/admin/{layout,page,actions}.ts(x)`
- `src/app/admin/login/page.tsx`
- `src/app/admin/posts/new/page.tsx`
- `src/app/admin/posts/[id]/edit/page.tsx`
- `.env.example`, `_plan/blog-feature.md`

**Modified:**
- [`package.json`](life-gives/package.json) — deps + db scripts
- [`tailwind.config.ts`](life-gives/tailwind.config.ts) — `@tailwindcss/typography`
- [`next.config.mjs`](life-gives/next.config.mjs) — `images.remotePatterns`
- [`.gitignore`](life-gives/.gitignore) — add `.env`, `.env.production`
- [`src/lib/constants.ts`](life-gives/src/lib/constants.ts) — add Blog to `NAV_LINKS`
- [`src/components/sections/HeroSection.tsx`](life-gives/src/components/sections/HeroSection.tsx) — drop inline header, use `<SiteHeader>`
- [`src/components/sections/Footer.tsx`](life-gives/src/components/sections/Footer.tsx) — consume `NAV_LINKS` with `hrefPrefix`
- [`src/app/sitemap.ts`](life-gives/src/app/sitemap.ts) — dynamic posts/tags
- [`src/app/robots.ts`](life-gives/src/app/robots.ts) — env-driven host
- [`life-gives/CLAUDE.md`](life-gives/CLAUDE.md) — document blog + admin

## Reused Existing Code

- `cn()` from [`src/lib/utils.ts`](life-gives/src/lib/utils.ts) — class merging in all new components
- `useInView` from [`src/lib/hooks/useInView.ts`](life-gives/src/lib/hooks/useInView.ts) + [`RevealOnScroll`](life-gives/src/components/RevealOnScroll.tsx) — wrap BlogCard and post body sections
- `.btn-gold` / `.btn-outline` / `.section-padding` / `.container-max` from [`src/app/globals.css`](life-gives/src/app/globals.css) — Admin and blog CTAs
- `AUTHOR`, `SITE_META`, `NAV_LINKS` from [`src/lib/constants.ts`](life-gives/src/lib/constants.ts) — bylines, SEO, header
- Tailwind tokens `navy` / `gold` / `font-heading` / `font-body` from [`tailwind.config.ts`](life-gives/tailwind.config.ts) — all new components

## Verification Plan

After implementation, run end-to-end:

1. **Type/lint/build clean:** `npm run lint && npm run build`
2. **DB up:** `npm run db:generate && npm run db:migrate` succeeds; Drizzle Studio (`npm run db:studio`) shows `posts`, `tags`, `post_tags` tables.
3. **Auth flow:**
   - Visit `/admin` → redirects to `/admin/login?next=/admin`.
   - Enter wrong password → friendly error, no token issued.
   - Enter correct password → cookie set, redirect to `/admin`.
   - Logout → cookie cleared, `/admin` re-redirects.
4. **Authoring flow:**
   - Create post with markdown including a link, list, heading, code block → save as draft.
   - Refresh `/admin/posts/[id]/edit` → form rehydrates from DB.
   - Force-reload mid-edit → localStorage autosave restores unsaved changes.
   - Publish → appears at `/blog` instantly (revalidation).
   - Edit slug while published → rejected with clear error.
   - Add two tags during creation → tag rows created, junction populated.
5. **Public reading flow:**
   - `/blog` shows 8 newest published posts, paginated, hover states match brand.
   - Click into a post → markdown renders, headings have anchor links, external links open in new tab with safe `rel`.
   - `/blog/tag/[tag]` shows only matching posts.
   - Drafts/archived posts never appear publicly.
6. **SEO:**
   - View page source on a post: `<meta property="og:image">` resolves to the dynamic OG route and returns a 1200×630 PNG.
   - JSON-LD validates at https://validator.schema.org/ (BlogPosting with publisher.logo).
   - `curl localhost:3000/sitemap.xml` contains all published post URLs and tag URLs with `lastmod` matching `updatedAt`.
   - `curl localhost:3000/blog/feed.xml` returns valid RSS 2.0.
7. **Anchor links:** From `/blog` click "Pricing" in header → lands on `/#pricing` and scrolls to section without flicker.
8. **Mobile:** Lighthouse mobile pass on `/blog` and a post (Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 100, Best Practices ≥ 95).
9. **Security spot-check:** Paste `<script>alert(1)</script>` and `<img src=x onerror=alert(1)>` into post content → renders as text (or stripped by `rehype-sanitize`), never executes.
10. **Neon dashboard:** confirm pooled connection in use, monitoring shows expected query patterns.

## Out of Scope (Explicitly Deferred)

- Image uploads (cover URLs pasted for now; Vercel Blob later)
- Multiple authors / role-based auth
- Comments
- Newsletter integration
- Search across posts (Postgres full-text search is a small Phase 7 if needed)
- Syntax highlighting in code blocks (`rehype-pretty-code` + `shiki` — add only if posts will contain code)
