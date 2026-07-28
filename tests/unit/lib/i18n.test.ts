import { describe, it, expect } from 'vitest';
import {
  LOCALES,
  LOCALE_PATHS,
  DEFAULT_LOCALE,
  localeByPath,
  isLocalePath,
  getLocaleInfo,
  getLocaleFromId,
  getSlugFromId,
  localizedPath,
  resolveEntry,
  distinctSlugs,
  resolveLocalizedList,
  getTranslationLocales,
  hreflangAlternates,
} from '@lib/i18n';

describe('LOCALES table', () => {
  it('has en-us as DEFAULT_LOCALE', () => {
    expect(DEFAULT_LOCALE).toBe('en-us');
    expect(LOCALE_PATHS).toContain(DEFAULT_LOCALE);
  });

  it('maps every path to its own info in localeByPath', () => {
    for (const locale of LOCALES) {
      expect(localeByPath[locale.path]).toEqual(locale);
    }
  });

  it('isLocalePath narrows known paths and rejects unknown ones', () => {
    expect(isLocalePath('en-us')).toBe(true);
    expect(isLocalePath('ja-jp')).toBe(true);
    expect(isLocalePath('xx-xx')).toBe(false);
    expect(isLocalePath('')).toBe(false);
  });

  it('getLocaleInfo is tolerant of unknown paths', () => {
    expect(getLocaleInfo('en-us')?.code).toBe('en');
    expect(getLocaleInfo('nope')).toBeUndefined();
  });

  it('emits language-only hreflang codes, not path tokens', () => {
    const codes = LOCALES.map((l) => l.code);
    expect(codes).toEqual(['en', 'ja', 'ko']);
  });

  it('emits underscore-region og:locale values', () => {
    const ogLocales = LOCALES.map((l) => l.ogLocale);
    expect(ogLocales).toEqual(['en_US', 'ja_JP', 'ko_KR']);
  });
});

describe('getLocaleFromId / getSlugFromId', () => {
  it('splits a locale-prefixed id into locale and slug', () => {
    expect(getLocaleFromId('en-us/portfolio-v1')).toBe('en-us');
    expect(getSlugFromId('en-us/portfolio-v1')).toBe('portfolio-v1');
  });

  it('handles nested slugs (slug itself containing slashes)', () => {
    expect(getLocaleFromId('ja-jp/deep/nested/slug')).toBe('ja-jp');
    expect(getSlugFromId('ja-jp/deep/nested/slug')).toBe('deep/nested/slug');
  });

  it('returns an empty slug for an id with no locale segment', () => {
    expect(getSlugFromId('portfolio-v1')).toBe('');
    expect(getLocaleFromId('portfolio-v1')).toBe('portfolio-v1');
  });
});

describe('localizedPath', () => {
  it('joins a locale path and segments into a leading/trailing-slashed path', () => {
    expect(localizedPath('en-us', 'writing', 'foo')).toBe('/en-us/writing/foo/');
  });

  it('produces just the locale root when no segments are given', () => {
    expect(localizedPath('en-us')).toBe('/en-us/');
  });

  it('never produces a double locale segment when fed getSlugFromId output', () => {
    const id = 'en-us/foo';
    const slug = getSlugFromId(id);
    const path = localizedPath('en-us', 'writing', slug);
    expect(path).toBe('/en-us/writing/foo/');
    expect(path.match(/en-us/g)).toHaveLength(1);
  });

  it('strips accidental leading/trailing slashes on segments', () => {
    expect(localizedPath('en-us', '/writing/', '/foo/')).toBe('/en-us/writing/foo/');
  });
});

interface Entry {
  id: string;
}

const entries: Entry[] = [
  { id: 'en-us/portfolio-v1' },
  { id: 'en-us/rok-army-comms' },
  { id: 'ja-jp/portfolio-v1' },
];

describe('resolveEntry', () => {
  it('returns the real entry for the requested locale, not a fallback', () => {
    const result = resolveEntry(entries, 'portfolio-v1', 'ja-jp');
    expect(result?.isFallback).toBe(false);
    expect(result?.entry.id).toBe('ja-jp/portfolio-v1');
    expect(result?.sourceLocalePath).toBe('ja-jp');
  });

  it('falls back to the source locale when the requested locale has no entry', () => {
    const result = resolveEntry(entries, 'portfolio-v1', 'ko-kr');
    expect(result?.isFallback).toBe(true);
    expect(result?.entry.id).toBe('en-us/portfolio-v1');
    expect(result?.sourceLocalePath).toBe('en-us');
  });

  it('falls back to the single available locale for a slug with only one translation', () => {
    const result = resolveEntry(entries, 'rok-army-comms', 'ja-jp');
    expect(result?.isFallback).toBe(true);
    expect(result?.entry.id).toBe('en-us/rok-army-comms');
  });

  it('returns null when the slug does not exist in any locale', () => {
    expect(resolveEntry(entries, 'does-not-exist', 'en-us')).toBeNull();
  });
});

describe('distinctSlugs', () => {
  it('dedupes slugs across locales in first-seen order', () => {
    expect(distinctSlugs(entries)).toEqual(['portfolio-v1', 'rok-army-comms']);
  });

  it('returns an empty array for an empty entry list', () => {
    expect(distinctSlugs([])).toEqual([]);
  });
});

describe('resolveLocalizedList', () => {
  it('returns one resolved entry per distinct slug for the requested locale', () => {
    const result = resolveLocalizedList(entries, 'ja-jp');
    expect(result).toHaveLength(2);

    const portfolio = result.find((r) => getSlugFromId(r.entry.id) === 'portfolio-v1');
    expect(portfolio?.isFallback).toBe(false);
    expect(portfolio?.entry.id).toBe('ja-jp/portfolio-v1');

    const rokArmy = result.find((r) => getSlugFromId(r.entry.id) === 'rok-army-comms');
    expect(rokArmy?.isFallback).toBe(true);
    expect(rokArmy?.entry.id).toBe('en-us/rok-army-comms');
  });

  it('never mixes two locales worth of entries for the same slug', () => {
    const result = resolveLocalizedList(entries, 'en-us');
    const slugs = result.map((r) => getSlugFromId(r.entry.id));
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('getTranslationLocales', () => {
  it('lists only locales with a real translation of the slug', () => {
    expect(getTranslationLocales(entries, 'portfolio-v1').sort()).toEqual(['en-us', 'ja-jp']);
    expect(getTranslationLocales(entries, 'rok-army-comms')).toEqual(['en-us']);
    expect(getTranslationLocales(entries, 'does-not-exist')).toEqual([]);
  });
});

describe('hreflangAlternates', () => {
  it('includes only real translations plus x-default, excluding fallback locales', () => {
    const alternates = hreflangAlternates('work', 'portfolio-v1', entries);
    const hreflangs = alternates.map((a) => a.hreflang).sort();
    expect(hreflangs).toEqual(['en', 'ja', 'x-default']);
    expect(hreflangs).not.toContain('ko');
  });

  it('x-default always points at the DEFAULT_LOCALE URL', () => {
    const alternates = hreflangAlternates('work', 'portfolio-v1', entries);
    const xDefault = alternates.find((a) => a.hreflang === 'x-default');
    expect(xDefault?.href).toBe('/en-us/work/portfolio-v1/');
  });

  it('produces absolute URLs when a site origin is given', () => {
    const alternates = hreflangAlternates('work', 'portfolio-v1', entries, new URL('https://ex.com'));
    const en = alternates.find((a) => a.hreflang === 'en');
    expect(en?.href).toBe('https://ex.com/en-us/work/portfolio-v1/');
  });

  it('produces path-only URLs when no site origin is given', () => {
    const alternates = hreflangAlternates('work', 'rok-army-comms', entries);
    expect(alternates).toEqual([
      { hreflang: 'en', href: '/en-us/work/rok-army-comms/' },
      { hreflang: 'x-default', href: '/en-us/work/rok-army-comms/' },
    ]);
  });
});
