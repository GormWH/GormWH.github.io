# Frontend Guide

Practical reference for extending the current frontend safely.

## Inventory

### Layout
- `src/layouts/BaseLayout.astro` — shared HTML shell and page wrapper.

### Shared components
- `src/components/Header.astro` — top navigation links.
- `src/components/pages/projects/ProjectsPost.astro` — project list item renderer.

### Pages
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/projects/index.astro`
- `src/pages/projects/[...slug].astro`
- `src/pages/skills.astro`
- `src/pages/thinking/index.astro`
- `src/pages/contact.astro`

## Add a new static page

1. Create `src/pages/{name}.astro` using `BaseLayout`.
2. Add navigation link in `src/components/Header.astro` when needed.
3. Update `docs/generated/route-map.md`.
4. Build with `npm run build`.

## Add a new project entry

1. Create `projects/{slug}.md`.
2. Follow schema from `src/content.config.ts`.
3. Confirm it appears in `/projects` and `/projects/{slug}` after build.

See `.agents/skills/add-page/SKILL.md` and `.agents/skills/add-project/SKILL.md` for step-by-step procedures.

## Extension rules

- Prefer simple components and clear markup.
- Avoid adding libraries for small presentational tasks.
- Keep page copy focused on personal portfolio objectives (clarity, evidence, contact).
