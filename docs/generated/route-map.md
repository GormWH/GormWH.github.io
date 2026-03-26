# Route Map

Current route inventory for `GormWH.github.io`.

## Canonical static routes

| Route | Source |
|-------|--------|
| `/{locale}/` | `src/pages/{locale}/index.astro` |
| `/{locale}/about` | `src/pages/{locale}/about.astro` |
| `/{locale}/projects` | `src/pages/{locale}/projects/index.astro` |
| `/{locale}/skills` | `src/pages/{locale}/skills.astro` |
| `/{locale}/contact` | `src/pages/{locale}/contact.astro` |

## Dynamic routes

| Pattern | Source | Data source |
|---------|--------|-------------|
| `/{locale}/projects/{slug}` | `src/pages/{locale}/projects/[...slug].astro` | `getCollection("projects")` |

## Redirect routes (compatibility)

| Route | Source | Redirect target |
|-------|--------|-----------------|
| `/` | `src/pages/index.astro` | `/en/` |
| `/about` | `src/pages/about.astro` | `/en/about` |
| `/projects` | `src/pages/projects/index.astro` | `/en/projects` |
| `/skills` | `src/pages/skills.astro` | `/en/skills` |
| `/contact` | `src/pages/contact.astro` | `/en/contact` |
| `/projects/{slug}` | `src/pages/projects/[...slug].astro` | `/en/projects/{slug}` |

## Notes

- Supported locales are `en`, `ja`, and `ko`.
- Language controls in header and footer keep the current logical page path and switch only locale prefix.
- Add new static routes and patterns here when routing changes.
