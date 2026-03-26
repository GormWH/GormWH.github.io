# Content Collections

## Decision

Use one Astro content collection (`projects`) backed by markdown files in `projects/`, with a strict schema in `src/content.config.ts`.

## Context

This repository is a personal portfolio. Project writeups are the main evidence of engineering capability and should be:
- easy to author
- validated at build time
- rendered consistently in listing and detail pages

## Schema (current)

The `projects` schema requires:

- `title: string`
- `pubDate: date`
- `description: string`
- `author: string`
- `image.url: string`
- `image.alt: string`
- `tags: string[]`

## How content is used

1. `src/pages/projects/index.astro` loads all entries via `getCollection("projects")`.
2. `src/pages/projects/[...slug].astro` generates static project detail pages.
3. Markdown body content is rendered via Astro content rendering.

## Trade-offs

- **Pro**: Type-safe, build-time validated content.
- **Pro**: Easy to add/edit projects without touching route logic.
- **Con**: Schema changes require touching all project files.
- **Con**: Rich relational features (cross-linking metadata, taxonomy rules) are manual unless added later.

## Future considerations

- Add optional fields only when they improve storytelling quality (for example `role`, `repoUrl`, `demoUrl`, `outcomes`).
- Keep required fields minimal to reduce friction for frequent updates.
