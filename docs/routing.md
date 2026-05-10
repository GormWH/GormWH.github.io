# Routing & deployment

## Routing

File-based routing under `src/pages/`.

**Live routes:**
- `index.astro`
- `work/index.astro`
- `work/[slug].astro`
- `contact.astro`

The `Header` component also references `/about` and `/blog` — those routes still need to be created.

## Deployment

- Target: GitHub Pages at `https://GormWH.github.io` (user/org root, no project subpath).
- `astro.config.mjs` sets `site: 'https://GormWH.github.io'` (used for canonical URLs and the sitemap).
- **No `base` is set**, so the deploy expects the user/organization Pages root, not a project subpath.
- Deploy gate: `pnpm build` (see [`commands.md`](commands.md)).

## Deploy automation

> **Status: incomplete** — no GitHub Actions / Pages workflow is committed yet, so the deploy is currently manual. Fill in or delete once automation lands.
