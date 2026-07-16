# tests

Vitest unit + integration suite, plus a Playwright e2e suite.

## Layout

- `setup/` — Vitest global setup (loaded via `vitest.config.ts`'s `setupFiles`).
- `fixtures/` — shared test data and helpers used across unit/integration specs.
- `unit/lib/` — unit tests for `src/lib/`.
- `unit/data/` — unit tests for content-collection data shaping/queries.
- `integration/` — tests that cross module boundaries (e.g. multiple `src/lib`
  helpers composed together, or a feature's data pipeline end to end) without
  going through a browser.
- `e2e/` — Playwright suite (`*.e2e.ts` specs) driving the built site through
  a real browser. See [`e2e/README.md`](e2e/README.md) for config, personas,
  and known gaps the suite surfaced.

## Running

```
pnpm test              # vitest run — single pass, used in CI/pre-push
pnpm test:watch        # vitest — watch mode for local development
pnpm test:e2e          # rebuild + run the Playwright suite
pnpm test:e2e:fast     # run the Playwright suite against the existing dist/
```

## Environment

Tests run under Vitest's `node` environment, configured via Astro's
`getViteConfig` helper in `vitest.config.ts`. This means path aliases like
`@lib/*` resolve exactly as they do in the Astro build — no separate alias
config to maintain in the test runner.

## Authoring rules

- Import test globals explicitly: `import { describe, it, expect } from 'vitest'`.
  No ambient globals — `vitest.config.ts` does not enable `globals: true`.
- `tests/setup/*` files must include `export {}` so TypeScript treats them as
  modules, not global scripts.
- Avoid unchecked index access (`arr[i]` without a bounds check or an `as`
  assertion) — the repo's `tsconfig` runs strict mode.
- Respect `exactOptionalPropertyTypes`: don't assign `undefined` to an
  optional property; omit the key instead.

## Scope note

`*.e2e.ts` naming keeps the Playwright suite structurally isolated from
Vitest — Vitest's default glob (`**/*.{test,spec}.*`) never collects them, so
`pnpm test` stays fast and e2e stays opt-in via `pnpm test:e2e`. See
`e2e/README.md` for config, personas, and known gaps the suite surfaced.
