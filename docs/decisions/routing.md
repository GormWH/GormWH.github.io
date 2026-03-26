# Routing Architecture

## Decision

Use a locale-prefixed static routing model in `src/pages/`, with locale-specific dynamic routes for project details.

## Current route model (canonical)

- Locale-prefixed static pages:
  - `/{locale}/` (`src/pages/{locale}/index.astro`)
  - `/{locale}/about` (`src/pages/{locale}/about.astro`)
  - `/{locale}/projects` (`src/pages/{locale}/projects/index.astro`)
  - `/{locale}/skills` (`src/pages/{locale}/skills.astro`)
  - `/{locale}/contact` (`src/pages/{locale}/contact.astro`)
- Locale-prefixed dynamic page:
  - `/{locale}/projects/{slug}` (`src/pages/{locale}/projects/[...slug].astro`)

Supported locales are currently `en`, `ja`, and `ko`.

## Compatibility redirects

- Unprefixed routes (`/`, `/about`, `/projects`, `/skills`, `/contact`) redirect to English-prefixed routes.
- Legacy project detail route (`/projects/{slug}`) redirects to `/en/projects/{slug}`.

## Why this shape

- Portfolio content is finite and mostly stable.
- Static routes maximize reliability and deployment simplicity.
- Dynamic project pages let markdown entries scale without adding route files manually.

## Implementation notes

- Shared page templates are composed from `src/components/pages/*`.
- `getStaticPaths()` in each locale project detail route maps each collection entry to a locale-prefixed page.
- Content and routing are connected through `project.id`.
- Header and footer language switching preserve the current logical page path while changing locale prefix.

## Trade-offs

- **Pro**: Very low operational complexity.
- **Pro**: Easy for agents to reason about and extend.
- **Con**: Repeated layout/content patterns can appear across pages until shared page-level components are introduced.

## Future considerations

- If page complexity grows, introduce `src/components/pages/*` templates incrementally.
- If content types expand (for example separate writing posts), add a new collection and dedicated dynamic route.
