/**
 * Shared selector and copy constants for E2E specs.
 * Keep in sync with the app's `data-*` hooks — do not select on Tailwind classes.
 */

export const ROUTES = {
  home: '/',
  work: '/work',
  writing: '/writing',
  contact: '/contact',
  notFound: '/this-page-does-not-exist',
} as const;

export const NAV = {
  work: '/work',
  writing: '/writing',
  contact: '/contact',
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
