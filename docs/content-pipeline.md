# Content pipeline

> **Status: incomplete** — placeholder created on 2026-05-10 because the docs restructure had no entry covering content collections or the markdown render path. Fill in or delete.

## Known so far
- Two collections — `work` and `writing` — are defined in `src/content.config.ts` via the `glob` loader.
- The schema enforces ISO-8601 dates.
- `src/layouts/MarkdownLayout.astro` is the render shell for both collections.
- Dynamic routes `src/pages/work/[slug].astro` and `src/pages/writing/[slug].astro` mount entries through that layout.
- A `create-xxx-post` skill (see [`skills.md`](skills.md)) scaffolds a new entry file to start writing.

## Open questions
- Tag taxonomy alignment between `work` and `writing` (one shared vocabulary or two separate ones?).
- Whether draft entries should be excluded from the production build, and how (frontmatter flag vs. directory convention).
- Where collection-list, sidebar, and TOC components belong (currently untracked `src/components/CollectionList.astro`, `CollectionSidebar.astro`, `CollectionToc.astro`, `TagFilter.astro`).
