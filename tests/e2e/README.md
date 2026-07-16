# tests/e2e

Status: harness implemented. Playwright + `@playwright/test` run against the
built site; `playwright.config.ts` at the repo root wires it up. Spec files
land under `specs/` (see [Layout](#layout)) — check this directory for the
current set.

## Purpose

Browser end-to-end coverage of the deployed static site — real navigation,
real rendering, real interaction — as opposed to the unit/integration suite
under `tests/unit/` and `tests/integration/`, which runs in Node against
Vite-resolved modules with no browser involved.

## Why now

The app has real interactive surface worth driving through a browser: tag
filtering, the About timeline toggle, and cross-page navigation. Two
personas frame the coverage — recruiter (credibility, CV, contact) and
collaborator (work depth, tag filtering) — plus a cross-cutting resilience
pass (404, console errors, SEO basics, mobile viewport).

## Layout

- `specs/*.e2e.ts` — Playwright test files, one per persona/journey group
  (`recruiter`, `collaborator`, `resilience`). Named `*.e2e.ts` — not
  `*.spec.ts` — so Vitest's default glob (`**/*.{test,spec}.*`) can never
  collect them. Runner isolation is a filename property, not a config line.
- `fixtures/selectors.ts` — shared `data-*` selector and route constants,
  kept in sync with the app's selector hooks. Specs select on role/text/
  `data-*` only, never on Tailwind classes.

## Config

`playwright.config.ts` (repo root):
- `testDir: 'tests/e2e/specs'`, `testMatch: '**/*.e2e.ts'`.
- `webServer` runs `pnpm preview` against the built `dist/` (not `pnpm dev`)
  — e2e exercises what a visitor actually gets, including PROD-only content
  filtering.
- `use.baseURL: 'http://localhost:4321'`, `trace: 'on-first-retry'`.
- Projects: `chromium` (Desktop Chrome) and `mobile` (Pixel 5), for the
  mobile-viewport smoke coverage.
- `forbidOnly`/`retries` gate on `process.env.CI`.

## Running

```
pnpm test:e2e        # pnpm build && pnpm exec playwright test
pnpm test:e2e:fast    # pnpm exec playwright test — skips the rebuild
```

`test:e2e` always rebuilds first so a reused preview server never serves a
stale `dist/`. Use `test:e2e:fast` for tight local iteration once `dist/` is
current.

Requires the Chromium browser binary once: `pnpm exec playwright install
chromium` (CI needs `--with-deps` for the OS-level dependencies).

## Known gaps surfaced by this suite

- **`/CV.pdf` missing.** The Resume/CV link (home Contact, `/contact`,
  Footer) points at `public/CV.pdf`, which doesn't exist — the link 404s.
  The CTA-exists assertion stays green; the asset-resolves-200 check is a
  `test.fixme` pending the real file (content is the site owner's to add).
- **Inconsistent external-link `rel`.** `Footer.astro` uses
  `rel="noreferrer"`; `About.astro`'s bitset link uses
  `rel="noopener noreferrer"`. Not a security issue (`noreferrer` implies
  no-opener in modern browsers) but worth normalizing. Specs assert the
  weaker `noopener|noreferrer` invariant so they tolerate either.
- **Tag-filter count freezes on filter.** `[data-tag-filter-count]` sits
  outside `[data-tag-filter-root]` in `work/index.astro` and
  `writing/index.astro`; `tag-filter.ts` scopes its counter lookup to the
  root, so the header count never updates as chips filter the list. Specs
  assert the visible-item count via the DOM, never the counter span.
