# Frontend Guide

Practical reference for extending the current frontend safely.

## Inventory

### Layout
- `src/layouts/BaseLayout.astro` — shared HTML shell and page wrapper.

### Shared components
- `src/components/Header.astro` — sticky top navigation and header language dropdown.
- `src/components/Footer.astro` — footer language list and external trust links.
- `src/components/pages/projects/ProjectsPost.astro` — project list item renderer.
- `src/components/ui/Container.astro` — shared layout container shell.
- `src/components/ui/NavLink.astro` — reusable nav link variants for primary navigation.
- `src/components/ui/TextLink.astro` — reusable text link variants.
- `src/components/ui/PageSection.astro` — reusable page section structure.

### Pages
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/projects/index.astro`
- `src/pages/projects/[...slug].astro`
- `src/pages/skills.astro`
- `src/pages/contact.astro`

### Localization source of truth
- `src/i18n/translations.ts` — locale dictionaries (`en`, `ja`, `ko`) for shared UI, accessibility labels, and page component copy.
- `src/i18n/utils.ts` — translation accessor and locale path helpers.
- Language selectors in header/footer always render locale self-names (`English`, `日本語`, `한국어`) regardless of active locale.
- Header nav item set is fixed to Home/About/Projects/Contact unless explicitly changed by product direction.

## Add a new static page

1. Create `src/pages/{name}.astro` using `BaseLayout`.
2. Add navigation link in `src/components/Header.astro` when needed.
3. Update `docs/generated/route-map.md`.
4. Build with `pnpm run build`.

## Add a new project entry

1. Create `projects/{slug}.md`.
2. Follow schema from `src/content.config.ts`.
3. Confirm it appears in `/projects` and `/projects/{slug}` after build.

See `.agents/skills/add-page/SKILL.md` and `.agents/skills/add-project/SKILL.md` for step-by-step procedures.

## Extension rules

- Prefer simple components and clear markup.
- Prefer Tailwind-first composition through `src/components/ui/` primitives before adding page-local utility duplication.
- Keep global CSS narrow and class-scoped for specific cases (for example, `.project-doc__*` detail page behavior).
- Avoid adding libraries for small presentational tasks.
- Keep page copy focused on personal portfolio objectives (clarity, evidence, contact).
