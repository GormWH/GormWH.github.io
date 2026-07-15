# tests

Vitest unit + integration suite, plus a deferred Playwright e2e scaffold.

## Layout

- `setup/` — Vitest global setup (loaded via `vitest.config.ts`'s `setupFiles`).
- `fixtures/` — shared test data and helpers used across unit/integration specs.
- `unit/lib/` — unit tests for `src/lib/`.
- `unit/data/` — unit tests for content-collection data shaping/queries.
- `integration/` — tests that cross module boundaries (e.g. multiple `src/lib`
  helpers composed together, or a feature's data pipeline end to end) without
  going through a browser.
- `e2e/` — Playwright scaffold only. See [`e2e/README.md`](e2e/README.md) —
  not implemented yet, folders exist for future work.

## Running

```
pnpm test          # vitest run — single pass, used in CI/pre-push
pnpm test:watch    # vitest — watch mode for local development
pnpm test:e2e      # placeholder — echoes a not-implemented message
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

E2E is intentionally scaffold-only for now — see `e2e/README.md` for what's
planned and why it's deferred.
