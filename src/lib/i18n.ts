import { absoluteUrl } from './seo';

export interface LocaleInfo {
  /** URL path segment, e.g. 'en-us'. Also the content subdir name under src/content/<collection>/. */
  path: string;
  /** BCP-47 language-only code used for hreflang and <html lang>, e.g. 'en'. */
  code: string;
  /** og:locale value, e.g. 'en_US'. */
  ogLocale: string;
  /** Human-readable label for UI (language switcher), in the language's own script. */
  label: string;
}

export const LOCALES = [
  { path: 'en-us', code: 'en', ogLocale: 'en_US', label: 'English' },
  { path: 'ja-jp', code: 'ja', ogLocale: 'ja_JP', label: '日本語' },
  { path: 'ko-kr', code: 'ko', ogLocale: 'ko_KR', label: '한국어' },
] as const satisfies readonly LocaleInfo[];

export type LocalePath = (typeof LOCALES)[number]['path'];
export type LocaleCode = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: LocalePath = 'en-us';

export const LOCALE_PATHS: readonly LocalePath[] = LOCALES.map((locale) => locale.path);

/** Looks up locale metadata by path, tolerant of unknown/malformed paths (returns undefined). */
export function getLocaleInfo(path: string): LocaleInfo | undefined {
  return LOCALES.find((locale) => locale.path === path);
}

/**
 * Content entry ids are shaped '<localeDir>/<slug>' (e.g. 'en-us/portfolio-v1').
 * These two functions are the only sanctioned way to pull locale/slug out of
 * an id; never hand-parse an id at a call site.
 */
export function getLocaleFromId(id: string): string {
  const parts = id.split('/');
  return parts[0] ?? '';
}

export function getSlugFromId(id: string): string {
  return id.split('/').slice(1).join('/');
}

/**
 * Builds a site-relative path from a locale path and segments, e.g.
 * localizedPath('en-us', 'writing', 'foo') === '/en-us/writing/foo/'.
 * Segments must already be locale-free slugs (i.e. the output of
 * getSlugFromId, never a raw entry.id) — that invariant is what keeps a
 * double locale segment (/en-us/writing/en-us/foo) from ever occurring.
 */
export function localizedPath(localePath: string, ...segments: string[]): string {
  const clean = segments.map((s) => s.replace(/^\/+|\/+$/g, '')).filter((s) => s.length > 0);
  return `/${[localePath, ...clean].join('/')}/`;
}

export interface ResolvedEntry<T extends { id: string }> {
  entry: T;
  isFallback: boolean;
  sourceLocalePath: string;
}

/**
 * Resolves which entry to render for a given slug at a given locale.
 * Returns the requested locale's own entry when it exists (isFallback:
 * false). Otherwise falls back to the source-language entry (preferring
 * DEFAULT_LOCALE, then whichever single entry is available) with
 * isFallback: true and sourceLocalePath pointing at where it actually lives.
 * Returns null when no entry exists for the slug in any locale.
 */
export function resolveEntry<T extends { id: string }>(
  entries: readonly T[],
  slug: string,
  localePath: string,
): ResolvedEntry<T> | null {
  const bySlug = entries.filter((entry) => getSlugFromId(entry.id) === slug);
  if (bySlug.length === 0) return null;

  const real = bySlug.find((entry) => getLocaleFromId(entry.id) === localePath);
  if (real) {
    return { entry: real, isFallback: false, sourceLocalePath: localePath };
  }

  const defaultEntry = bySlug.find((entry) => getLocaleFromId(entry.id) === DEFAULT_LOCALE);
  const fallback = defaultEntry ?? bySlug[0];
  if (!fallback) return null;
  return {
    entry: fallback,
    isFallback: true,
    sourceLocalePath: getLocaleFromId(fallback.id),
  };
}

/** Distinct slugs across all locales, in first-seen order (stable for a pre-sorted `entries` input). */
export function distinctSlugs<T extends { id: string }>(entries: readonly T[]): string[] {
  const seen = new Set<string>();
  const slugs: string[] = [];
  for (const entry of entries) {
    const slug = getSlugFromId(entry.id);
    if (!seen.has(slug)) {
      seen.add(slug);
      slugs.push(slug);
    }
  }
  return slugs;
}

/**
 * Resolves one entry per distinct slug for a given locale — the requested
 * locale's own entry where it exists, else the source-language fallback.
 * This is what listing pages (and the homepage's work/writing sections) must
 * use instead of raw getCollection() output, which mixes every locale's
 * entries together and would otherwise show duplicate slugs side by side.
 */
export function resolveLocalizedList<T extends { id: string }>(
  entries: readonly T[],
  localePath: string,
): ResolvedEntry<T>[] {
  const results: ResolvedEntry<T>[] = [];
  for (const slug of distinctSlugs(entries)) {
    const resolved = resolveEntry(entries, slug, localePath);
    if (resolved) results.push(resolved);
  }
  return results;
}

/** Locale paths that have a REAL (non-fallback) translation of the given slug. */
export function getTranslationLocales<T extends { id: string }>(
  entries: readonly T[],
  slug: string,
): string[] {
  return entries
    .filter((entry) => getSlugFromId(entry.id) === slug)
    .map((entry) => getLocaleFromId(entry.id));
}

export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

/**
 * hreflang alternates for real translations only, plus x-default pointing at
 * DEFAULT_LOCALE. Fallback-rendered locales are deliberately excluded — they
 * canonicalize to the source and must never appear as their own hreflang
 * cluster member (see plan risk R2).
 */
export function hreflangAlternates<T extends { id: string }>(
  collectionRoute: string,
  slug: string,
  entries: readonly T[],
  site?: URL,
): HreflangAlternate[] {
  const alternates: HreflangAlternate[] = [];
  for (const localePath of getTranslationLocales(entries, slug)) {
    const locale = getLocaleInfo(localePath);
    if (!locale) continue;
    alternates.push({
      hreflang: locale.code,
      href: absoluteUrl(localizedPath(localePath, collectionRoute, slug), site),
    });
  }
  alternates.push({
    hreflang: 'x-default',
    href: absoluteUrl(localizedPath(DEFAULT_LOCALE, collectionRoute, slug), site),
  });
  return alternates;
}

/**
 * hreflang alternates for UI-chrome pages (homepage, contact, listings) that
 * have no fallback concept — every locale always renders its own page, so all
 * locales join the cluster unconditionally, plus x-default.
 */
export function uiPageHreflang(site: URL | undefined, ...segments: string[]): HreflangAlternate[] {
  return [
    ...LOCALES.map((locale) => ({
      hreflang: locale.code,
      href: absoluteUrl(localizedPath(locale.path, ...segments), site),
    })),
    { hreflang: 'x-default', href: absoluteUrl(localizedPath(DEFAULT_LOCALE, ...segments), site) },
  ];
}

/**
 * Language-switcher hrefs for the same logical page across every locale.
 * Every locale x slug combination is statically generated (fallback-rendered
 * when untranslated), so these targets never 404.
 */
export function switcherHrefsFor(...segments: string[]): Record<string, string> {
  return Object.fromEntries(LOCALE_PATHS.map((l) => [l, localizedPath(l, ...segments)]));
}

// A type alias (not an interface) so it gets an implicit index signature —
// Astro's GetStaticPathsItem['props'] requires one.
export type LocalizedDetailProps<T extends { id: string }> = {
  resolved: ResolvedEntry<T>;
  slug: string;
  next: { slug: string; resolved: ResolvedEntry<T> } | null;
  sidebarEntries: T[];
  rawEntries: T[];
};

/**
 * getStaticPaths body shared by the [lang]/<collection>/[slug] detail routes:
 * every locale x distinct-slug combination, resolved to the locale's own
 * entry or the source-language fallback, ordered by `compare` (which also
 * fixes sidebar and next-article order).
 */
export function buildLocalizedDetailPaths<T extends { id: string }>(
  rawEntries: readonly T[],
  compare: (a: T, b: T) => number,
): { params: { lang: string; slug: string }; props: LocalizedDetailProps<T> }[] {
  const slugs = distinctSlugs(rawEntries);
  return LOCALE_PATHS.flatMap((lang) => {
    const resolvedList = slugs
      .map((slug) => ({ slug, resolved: resolveEntry(rawEntries, slug, lang) }))
      .filter((r): r is { slug: string; resolved: ResolvedEntry<T> } => r.resolved !== null)
      .sort((a, b) => compare(a.resolved.entry, b.resolved.entry));

    return resolvedList.map(({ slug, resolved }, idx) => ({
      params: { lang, slug },
      props: {
        resolved,
        slug,
        next: resolvedList[idx + 1] ?? null,
        sidebarEntries: resolvedList.map((r) => r.resolved.entry),
        rawEntries: [...rawEntries],
      },
    }));
  });
}
