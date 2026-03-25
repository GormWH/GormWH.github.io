# Route Map

Current route inventory for `GormWH.github.io`.

## Static routes

| Route | Source |
|-------|--------|
| `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/projects` | `src/pages/projects/index.astro` |
| `/skills` | `src/pages/skills.astro` |
| `/thinking` | `src/pages/thinking/index.astro` |
| `/contact` | `src/pages/contact.astro` |

## Dynamic routes

| Pattern | Source | Data source |
|---------|--------|-------------|
| `/projects/{slug}` | `src/pages/projects/[...slug].astro` | `getCollection("projects")` |

## Notes

- `src/pages/projects/[...slug].astro` generates one page per markdown entry in `projects/`.
- Add new static routes and patterns here when routing changes.
