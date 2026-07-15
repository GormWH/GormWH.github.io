# Testing

## Overview

Vitest runs unit and integration tests against Node. Playwright is a devDependency for future browser E2E coverage but is deferred — no `.spec` files exist yet, see [E2E deferral](#e2e-deferral).

## Directory structure

```
tests/
  setup/          global test setup (imported via vitest.config.ts)
  fixtures/        shared sample data
  unit/
    lib/           tests for src/lib/*
    data/          tests for content/data shapes
  integration/     cross-module tests, no browser
  e2e/             scaffold only — see tests/e2e/README.md
```

## How to run

| Command | Purpose |
| --- | --- |
| `pnpm test` | `vitest run` — unit + integration, single pass |
| `pnpm test:watch` | `vitest` — watch mode |
| `pnpm test:e2e` | placeholder — echoes "not implemented" |

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

## E2E deferral

`tests/e2e/` holds `specs/` and `fixtures/` folders plus a README explaining why Playwright coverage is deferred (no interactive surface heavy enough yet to justify it). See `tests/e2e/README.md` for the intended future `playwright.config.ts` shape and how to run it once specs land.
