# GormWH.github.io

Source for my personal site at [https://GormWH.github.io](https://GormWH.github.io) — built with Astro 6, Tailwind v4 (CSS-first), and React 19 islands.

## Stack

- **Astro 6**, static output. Single page today (`src/pages/index.astro`); routes for `/about`, `/work`, `/blog`, and `/contact` are stubbed in the header but not yet built.
- **React 19** via `@astrojs/react`. Islands are available; nothing currently uses them — every page-level file is `.astro`.
- **Tailwind v4** through the Vite plugin (`@tailwindcss/vite`). Configuration is **CSS-first**: every design token lives in `@theme { ... }` inside `src/styles/global.css`. There is no `tailwind.config.*`.
- **TypeScript** via `astro/tsconfigs/strictest`.
- **pnpm** on **Node ≥ 22.12.0**. `pnpm-workspace.yaml` allowlists native builds for `esbuild` and `sharp`.
- No test runner, linter, or formatter is wired up — that is intentional for now.

## Project structure

```text
src/
├── components/        site chrome (Header, Footer)
├── layouts/           BaseLayout.astro
├── features/home/     page-scoped sections (Hero, About, Work, Writing, Contact)
├── pages/             index.astro
└── styles/            global.css, theme.css — Tailwind v4 @theme tokens
design-system/         read-only brand reference (see below)
public/                favicons
```

Page sections live under `src/features/<route>/<Section>.astro` — a **feature-folder** convention rather than a single shared `components/` bag. `src/components/` is reserved for site-wide chrome.

Path aliases (`tsconfig.json`):

- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@features/*` → `src/features/*`

Component classes are namespaced: `gh-*` for site-wide patterns (`gh-display`, `gh-btn`, `gh-meta`) and `hp-*` for homepage-scoped pieces.

## Styling

Design tokens — colors, typography scale, spacing containers, easing curves, shadows — are declared in `src/styles/global.css` inside Tailwind v4's `@theme { ... }` block. They generate utilities automatically (`bg-bg`, `text-ink-1`, `font-display`, `max-w-page`, etc.). Reach for tokens and utilities first; only add a new `gh-*` class when a pattern recurs.

`design-system/` is a standalone brand kit authored before the Astro build, kept as a **read-only reference** — not shipped, not imported, not part of the build graph. It contains voice and visual rules, original token definitions, and JSX reference UI kits (`ui_kits/{homepage,case_study,blog,resume}/*.jsx`) to **port from** when filling in real Astro sections. The live source of truth for what actually ships is `src/styles/global.css`.

## Develop, build, preview

| Command | What it does |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Astro dev server at `localhost:4321` |
| `pnpm build` | Build the production site to `./dist/` |
| `pnpm preview` | Serve `./dist/` locally |
| `pnpm astro check` | Type-check `.astro` and TypeScript |

## Deployment

The site targets **GitHub Pages** at `https://GormWH.github.io`. `astro.config.mjs` sets `site` to that origin and intentionally leaves `base` unset — the repo deploys at the user/organization Pages root, not a project subpath.

Note: no `.github/workflows/` is committed yet, so the GitHub Pages build is not automated in this repo. Wiring up an Actions workflow is on the to-do list.
