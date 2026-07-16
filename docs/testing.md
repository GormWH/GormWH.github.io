# Testing

## Overview

Vitest runs unit and integration tests against Node. Playwright (`@playwright/test`) runs browser E2E coverage against the built site, see [E2E](#e2e).

## Directory structure

```
tests/
  setup/          global test setup (imported via vitest.config.ts)
  fixtures/        shared sample data
  unit/
    lib/           tests for src/lib/*
    data/          tests for content/data shapes
  integration/     cross-module tests, no browser
  e2e/
    specs/         Playwright specs (*.e2e.ts) — recruiter, collaborator, resilience
    fixtures/      selectors.ts — shared data-* selector/route constants
```

## How to run

| Command | Purpose |
| --- | --- |
| `pnpm test` | `vitest run` — unit + integration, single pass |
| `pnpm test:watch` | `vitest` — watch mode |
| `pnpm test:e2e` | `pnpm build && pnpm exec playwright test` — rebuilds, then runs E2E |
| `pnpm test:e2e:fast` | `pnpm exec playwright test` — E2E against the existing `dist/` |

## Test environment

- Environment is `node` via Astro's `getViteConfig`, so `vitest.config.ts` picks up the same Vite pipeline as the app.
- tsconfig path aliases (`@lib/*`, `@scripts/*`, `@components/*`, etc.) resolve inside tests — no separate module-resolution config needed.
- `// @vitest-environment jsdom` per-file is reserved for future DOM-dependent tests; nothing needs it yet.

## Authoring rules (TS strictest)

- Import `describe`, `it`, `expect`, etc. explicitly from `vitest` — no test globals.
- `tests/setup/*` files end with `export {}` to keep them modules under `isolatedModules`.
- `vitest.config.ts` needs `/// <reference types="vitest/config" />` at the top for the `test` key to type-check against `astro/config`'s `defineConfig`.
- Avoid unchecked index access on arrays/objects under `noUncheckedIndexedAccess` — narrow or assert before indexing.
- Respect `exactOptionalPropertyTypes` — don't assign `undefined` to an optional field, omit the key instead.

## Version note

`vitest` is pinned to `^3.2.0` for Vite 7 parity with Astro 6's bundled Vite. Don't bump past what Astro's Vite version supports without checking compatibility first.

## E2E

Playwright (`@playwright/test`) drives Chromium against the built site (`pnpm build` + `pnpm preview`, not `pnpm dev`) via `playwright.config.ts` at the repo root: `testDir: 'tests/e2e/specs'`, `testMatch: '**/*.e2e.ts'`, `chromium` + `mobile` (Pixel 5) projects. Specs select on role/text/`data-*` only, never Tailwind classes.

`*.e2e.ts` naming keeps the suite structurally isolated from Vitest — its default glob never collects `.e2e.ts` files, so no `vitest.config.ts` change was needed.

Requires the browser binary once: `pnpm exec playwright install chromium` (CI needs `--with-deps` for OS-level dependencies).

Three known gaps the suite surfaced (tracked as `test.fixme`/tolerant assertions, not silently hidden):
- `/CV.pdf` is linked (home Contact, `/contact`, Footer) but `public/CV.pdf` doesn't exist — 404. The CTA-exists check is green; the asset-200 check is `test.fixme` pending the real file.
- `Footer.astro` uses `rel="noreferrer"`, `About.astro`'s bitset link uses `rel="noopener noreferrer"` — inconsistent but not a security issue. Specs assert the weaker shared invariant.
- `[data-tag-filter-count]` sits outside `[data-tag-filter-root]` on `/work` and `/writing`, so `tag-filter.ts`'s root-scoped lookup never updates it when chips filter the list. Specs assert visible-item count via the DOM, not the counter span.

See `tests/e2e/README.md` for the full writeup.
