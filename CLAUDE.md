# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Astro 6 static site deployed to GitHub Pages at `https://GormWH.github.io`.

## Commands

Package manager is **pnpm** (Node `>=22.12.0`). `pnpm-workspace.yaml` allowlists `esbuild` and `sharp` for native builds.

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install deps |
| `pnpm dev` | Astro dev server at `localhost:4321` |
| `pnpm build` | Production build to `./dist/` |
| `pnpm preview` | Serve `./dist/` locally |
| `pnpm astro check` | Type-check `.astro` + TS (project uses `astro/tsconfigs/strict`) |

There is no test suite, no linter, and no formatter wired up — don't invent commands for them.

## Architecture

### Stack
- **Astro 6** with the **React** integration (`@astrojs/react`) — React is available for islands but currently every page-level file is `.astro`.
- **Tailwind v4** via the Vite plugin (`@tailwindcss/vite`), configured in `astro.config.mjs`. There is **no `tailwind.config.*`** — all design tokens are declared in `@theme { ... }` inside `src/styles/global.css` (Tailwind v4 CSS-first config).

### Path aliases (`tsconfig.json`)
- `@components/*` → `src/components/*` — site-wide chrome (Header, Footer)
- `@layouts/*` → `src/layouts/*` — page shells (currently `BaseLayout.astro` which mounts global CSS, Google Fonts preconnect, Header, `<slot />`, Footer)
- `@features/*` → `src/features/*` — page-scoped sections grouped by route, e.g. `features/home/{Hero,About,Work,Writing,Contact}.astro` composed by `pages/index.astro`

When adding a new page section, follow the **feature-folder** convention (`features/<route>/<Section>.astro`) rather than dumping into `components/`.

### Styling system
Design tokens live in `src/styles/global.css` as Tailwind v4 `@theme` variables. They generate utilities automatically:
- `--color-*` → `bg-*` / `text-*` / `border-*` (e.g. `bg-bg`, `text-ink-1`, `text-accent-ink`)
- `--font-display|body|headline|serif|mono` → `font-display` etc.
- `--text-12 ... --text-104` plus semantic `--text-display` / `--text-lead` (with paired `--line-height` / `--letter-spacing` / `--font-weight` modifiers)
- `--container-page` (1280px) / `--container-reading` (720px) → `max-w-page` / `max-w-reading`. **Do not use `--container-content`** — `max-content` is a CSS keyword and would collide.
- `--radius-1/2/3`, `--ease-mech`, `--duration-fast/base/slow`, `--shadow-overlay`

Component classes prefixed `gh-*` (e.g. `gh-display`, `gh-btn`, `gh-btn-primary`, `gh-meta`) and page-scoped `hp-*` (homepage hero) are also defined in `global.css`. Reach for tokens/utilities first; only add a new `gh-*` class when a pattern recurs.

### Routing & deployment
- File-based routing under `src/pages/`. Currently only `index.astro`. The `Header` component already references `/about`, `/work`, `/blog`, `/contact` — those routes need to be created.
- `astro.config.mjs` sets `site: 'https://GormWH.github.io'` (used for canonical URLs and the sitemap). No `base` is set, so the deploy expects the user/organization Pages root, not a project subpath.
