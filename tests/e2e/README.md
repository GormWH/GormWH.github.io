# tests/e2e

Status: SCAFFOLD ONLY — not implemented. This directory holds folder structure
and intent for future Playwright coverage. No `.spec` files exist yet.

## Purpose

Browser end-to-end coverage of the deployed static site — real navigation,
real rendering, real interaction — as opposed to the unit/integration suite
under `tests/unit/` and `tests/integration/`, which runs in Node against
Vite-resolved modules with no browser involved.

## Why deferred

The site is a static Astro build with no client-side app logic heavy enough
yet to justify browser automation. Structure is laid down now so the suite
has a home; specs land once there's real interactive surface (search,
filters, animation gating, etc.) worth driving through a browser.

## Layout

- `specs/` — Playwright test files (`*.spec.ts`), one per user flow or page.
- `fixtures/` — shared setup: page objects, seed data, custom fixtures.

## Intended future config

A `playwright.config.ts` at the repo root, once implemented, should:

- Set `testDir: 'tests/e2e/specs'`.
- Point `webServer` at `pnpm preview` (serves the `pnpm build` output from
  `dist/`), not `pnpm dev` — e2e should exercise the built artifact.
- Set `use.baseURL` to `http://localhost:4321` (the `pnpm preview` default).
- Reuse the existing `pnpm exec playwright test` CLI, already available
  since `playwright` is a devDependency.

## Running (once implemented)

```
pnpm build && pnpm exec playwright test
```

Until then, `pnpm test:e2e` only echoes a not-implemented message — see the
`scripts` block in `package.json`.
