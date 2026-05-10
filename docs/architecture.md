# Architecture

## Stack

- **Astro 6** with the **React** integration (`@astrojs/react`) — React is available for islands but currently every page-level file is `.astro`.
- **Tailwind v4** via the Vite plugin (`@tailwindcss/vite`), configured in `astro.config.mjs`. There is **no `tailwind.config.*`** — all design tokens live in `@theme { ... }` inside `src/styles/global.css` (Tailwind v4 CSS-first config). See [`styling.md`](styling.md).
- **TypeScript** via `astro/tsconfigs/strictest` (see `tsconfig.json`).

## Path aliases (`tsconfig.json`)

| Alias | Resolves to | Purpose |
| --- | --- | --- |
| `@components/*` | `src/components/*` | Site-wide chrome (Header, Footer) |
| `@layouts/*` | `src/layouts/*` | Page shells (currently `BaseLayout.astro` which mounts global CSS, Google Fonts preconnect, Header, `<slot />`, Footer) |
| `@features/*` | `src/features/*` | Page-scoped sections grouped by route, e.g. `features/home/{Hero,About,Work,Writing,Contact}.astro` composed by `pages/index.astro` |

## Feature-folder convention

When adding a new page section, follow `features/<route>/<Section>.astro` rather than dumping into `components/`. The `new-section` skill scaffolds this layout — see [`skills.md`](skills.md).
