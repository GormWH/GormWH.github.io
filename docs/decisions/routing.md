# Routing Architecture

## Decision

Use a simple static routing model in `src/pages/`, with one dynamic route for project details.

## Current route model

- Static pages:
  - `/` (`src/pages/index.astro`)
  - `/about` (`src/pages/about.astro`)
  - `/projects` (`src/pages/projects/index.astro`)
  - `/skills` (`src/pages/skills.astro`)
  - `/thinking` (`src/pages/thinking/index.astro`)
  - `/contact` (`src/pages/contact.astro`)
- Dynamic page:
  - `/projects/{slug}` (`src/pages/projects/[...slug].astro`)

## Why this shape

- Portfolio content is finite and mostly stable.
- Static routes maximize reliability and deployment simplicity.
- Dynamic project pages let markdown entries scale without adding route files manually.

## Implementation notes

- Current page files render directly with `BaseLayout` (no template-layer split yet).
- `getStaticPaths()` in `src/pages/projects/[...slug].astro` maps each collection entry to a route.
- Content and routing are connected through `project.id`.

## Trade-offs

- **Pro**: Very low operational complexity.
- **Pro**: Easy for agents to reason about and extend.
- **Con**: Repeated layout/content patterns can appear across pages until shared page-level components are introduced.

## Future considerations

- If page complexity grows, introduce `src/components/pages/*` templates incrementally.
- If content types expand (for example separate writing posts), add a new collection and dedicated dynamic route.
