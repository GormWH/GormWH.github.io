/**
 * Shared selector and copy constants for E2E specs.
 * Keep in sync with the app's `data-*` hooks — do not select on Tailwind classes.
 */

// English is the default locale but still URL-prefixed post-migration — every
// journey navigates under /en-us/ unless it's specifically an i18n or legacy
// redirect assertion (see i18n.e2e.ts).
export const ROUTES = {
  home: '/en-us/',
  work: '/en-us/work/',
  writing: '/en-us/writing/',
  contact: '/en-us/contact/',
  notFound: '/en-us/this-page-does-not-exist',
} as const;

export const NAV = {
  work: '/en-us/work',
  writing: '/en-us/writing',
  contact: '/en-us/contact',
} as const;

export const DATA = {
  tagFilterRoot: '[data-tag-filter-root]',
  tagChip: '[data-tag-filter-chips] [data-tag]',
  tagClear: '[data-tag-filter-clear]',
  entryItem: '[data-tag-filter-list] [data-entry-tags]',
  entryLink: 'a[data-keep-filter]',
  filterEmpty: '[data-tag-filter-empty]',
  filterCount: '[data-tag-filter-count]',
  timelineToggle: '[data-timeline-toggle]',
} as const;

export const EXTERNAL = {
  github: 'https://github.com/GormWH',
  linkedin: 'https://www.linkedin.com/in/su-hong-park-1aa107216/',
} as const;

export const ASSETS = {
  cv: '/CV.pdf',
} as const;

// The 3 supported locales — path token, BCP-47 code, and the switcher's
// visible label (its own script), mirroring src/lib/i18n.ts's LOCALES table.
export const LOCALES = {
  'en-us': { code: 'en', label: 'English' },
  'ja-jp': { code: 'ja', label: '日本語' },
  'ko-kr': { code: 'ko', label: '한국어' },
} as const;

// The 11 legacy (unprefixed) URLs kept alive as meta-refresh stubs. Each
// stub's target is `/en-us${legacyPath}` (a single formula: '/' -> '/en-us/',
// '/work/portfolio-v1/' -> '/en-us/work/portfolio-v1/', etc).
export const LEGACY_ROUTES = {
  home: '/',
  contact: '/contact/',
  work: '/work/',
  writing: '/writing/',
  workSlugs: [
    '/work/portfolio-v1/',
    '/work/rok-army-comms/',
    '/work/osaka-thesis/',
    '/work/utokyo-thesis/',
  ],
  writingSlugs: [
    '/writing/first-time-on-a-mid-sized-team/',
    '/writing/leaving-bitset-after-three-years/',
    '/writing/closer-to-the-decisions/',
  ],
} as const;
