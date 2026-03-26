# Design System (Current)

This guide defines the current Tailwind-first styling workflow for this repository.

## Principles

- Prefer reusable UI components over tag-targeted global CSS.
- Keep layout and interaction patterns consistent across core pages.
- Allow targeted class-based CSS only for page-specific constraints.

## Tailwind-first workflow

1. Start with reusable primitives in `src/components/ui/`.
2. Compose page structure using primitives before adding one-off classes.
3. Use global CSS only for tokens, base fundamentals, and tightly scoped exceptions.
4. Validate changes with desktop and mobile smoke checks on rendered UI.

## Shared primitives

- `src/components/ui/Container.astro` — shared max-width and horizontal padding shell.
- `src/components/ui/NavLink.astro` — primary sticky-navigation link variant.
- `src/components/ui/TextLink.astro` — consistent inline/link variants (`default`, `muted`, `subtle`).
- `src/components/ui/PageSection.astro` — page section wrapper with consistent heading and content rhythm.

## Header/Footer conventions

- Header stays sticky with exactly four primary links: Home, About, Projects, Contact.
- Language switcher in header is a globe-triggered click dropdown (outside the main nav list), closes on outside click and `Esc`, and marks the current language.
- Footer uses visible language links (no dropdown).
- Footer avoids repeating main site navigation; reserve it for language controls, trust signal, and external profile links.

## Global CSS boundaries

- Keep `src/styles/global.css` focused on:
  - theme tokens and base document fundamentals (`html`, `body`, focus visibility),
  - project-detail specific classes (`.project-doc*`) including markdown-like typography in `.project-doc__article`.
- Avoid broad selectors like global `a`, `p`, `h*`, `ul/ol` unless there is a cross-site need.

## Content presentation conventions

- Use short paragraphs and clear section groupings.
- Prefer `TextLink` for narrative links and footer links.
- Keep claims specific and backed by project evidence.

## UI review expectations

After notable styling changes:
1. Check core pages on desktop.
2. Check core pages on mobile viewport width.
3. Refine only confirmed awkward UI (spacing, hierarchy, link/focus behavior).
