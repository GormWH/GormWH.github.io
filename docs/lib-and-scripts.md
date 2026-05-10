# `src/lib/` and `src/scripts/`

> **Status: incomplete** — placeholder created on 2026-05-10 because both directories exist and are imported, but neither appears in the path-aliases table at [`architecture.md`](architecture.md). Fill in or delete.

## Known so far
- `src/lib/tagFilter.ts` holds tag-filter logic (server / build-time).
- `src/scripts/tag-filter.ts` is the corresponding browser entry point.
- Neither path is aliased in `tsconfig.json` `paths` (no `@lib/*` or `@scripts/*` entries).

## Open questions
- Whether to add `@lib/*` and `@scripts/*` aliases for symmetry with `@components/*`, `@layouts/*`, `@features/*`.
- The intended boundary between `lib/` (build-time logic) and `scripts/` (browser entry) — naming convention, file-per-feature vs. shared, etc.
- Whether scripts ship as Astro inline modules, separate `<script>` tags, or via the Vite asset pipeline.
