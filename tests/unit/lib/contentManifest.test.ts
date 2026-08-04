// Parity/regression test for the fs-based content manifest used by
// astro.config.mjs's sitemap filter. Deliberately runs against the REAL
// src/content tree (never fixtures) so drift between the manifest and the
// actual content layout is un-mergeable. Written to be migration-agnostic:
// pre-migration (flat ids, no locale subdir) every loop below is a no-op and
// the suite passes trivially; post-migration (task #3) it exercises real
// tuples. See .omc/plans/i18n-url-prefix-plan.md, risk R3.
import { describe, it, expect } from 'vitest';
import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import {
  getContentManifest,
  isFallbackUrl,
  isLegacyStubUrl,
  isSitemapExcluded,
} from '@lib/contentManifest.mjs';

const CONTENT_ROOT = join(process.cwd(), 'src', 'content');
const COLLECTIONS = ['work', 'writing'] as const;
const LOCALE_PATHS = ['en-us', 'ja-jp', 'ko-kr'] as const;

interface Tuple {
  collection: string;
  localePath: string;
  slug: string;
}

// Independent walk + parse, written separately from src/lib/contentManifest.mjs
// so this test actually catches drift rather than re-asserting the same code.
function independentWalk(dir: string): string[] {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return independentWalk(full);
    if (entry.isFile() && entry.name.endsWith('.md')) return [full];
    return [];
  });
}

function expectedManifest(): Tuple[] {
  const expected: Tuple[] = [];
  for (const collection of COLLECTIONS) {
    const collectionRoot = join(CONTENT_ROOT, collection);
    for (const filePath of independentWalk(collectionRoot)) {
      const rel = relative(collectionRoot, filePath).split(sep).join('/');
      const id = rel.replace(/\.md$/, '');
      const parts = id.split('/');
      const localePath = parts[0];
      const slug = parts.slice(1).join('/');
      if (!localePath || !(LOCALE_PATHS as readonly string[]).includes(localePath) || slug === '') {
        continue;
      }
      expected.push({ collection, localePath, slug });
    }
  }
  return expected;
}

function sortTuples(tuples: Tuple[]): Tuple[] {
  return [...tuples].sort((a, b) =>
    `${a.collection}/${a.localePath}/${a.slug}`.localeCompare(`${b.collection}/${b.localePath}/${b.slug}`),
  );
}

describe('getContentManifest / real content tree parity', () => {
  it('matches an independently computed enumeration of the real src/content tree', () => {
    expect(sortTuples(getContentManifest())).toEqual(sortTuples(expectedManifest()));
  });

  it('every manifest tuple corresponds to a real markdown file on disk', () => {
    for (const tuple of getContentManifest()) {
      const filePath = join(CONTENT_ROOT, tuple.collection, tuple.localePath, `${tuple.slug}.md`);
      expect(independentWalk(join(CONTENT_ROOT, tuple.collection))).toContain(filePath);
    }
  });
});

describe('isLegacyStubUrl', () => {
  it('flags URLs with no recognized locale prefix, including the bare root', () => {
    expect(isLegacyStubUrl('/')).toBe(true);
    expect(isLegacyStubUrl('/work/portfolio-v1')).toBe(true);
    expect(isLegacyStubUrl('https://ex.com/contact')).toBe(true);
  });

  it('does not flag URLs that start with a known locale path', () => {
    expect(isLegacyStubUrl('/en-us/')).toBe(false);
    expect(isLegacyStubUrl('/ja-jp/writing/foo')).toBe(false);
    expect(isLegacyStubUrl('https://ex.com/ko-kr/work/bar')).toBe(false);
  });
});

describe('isFallbackUrl / isSitemapExcluded — derived against the real manifest', () => {
  it('never flags a locale root or listing page as fallback', () => {
    for (const localePath of LOCALE_PATHS) {
      expect(isFallbackUrl(`/${localePath}/`)).toBe(false);
      expect(isFallbackUrl(`/${localePath}/work/`)).toBe(false);
      expect(isSitemapExcluded(`/${localePath}/`)).toBe(false);
    }
  });

  it('never flags a real (non-fallback) entry as fallback-excluded', () => {
    for (const tuple of getContentManifest()) {
      const url = `/${tuple.localePath}/${tuple.collection}/${tuple.slug}/`;
      expect(isFallbackUrl(url)).toBe(false);
      expect(isSitemapExcluded(url)).toBe(false);
    }
  });

  it('flags a locale/slug combination as fallback when the slug exists elsewhere but not at that locale', () => {
    const manifest = getContentManifest();
    for (const tuple of manifest) {
      for (const otherLocale of LOCALE_PATHS) {
        if (otherLocale === tuple.localePath) continue;
        const hasOwnEntry = manifest.some(
          (m) => m.collection === tuple.collection && m.slug === tuple.slug && m.localePath === otherLocale,
        );
        if (hasOwnEntry) continue;
        const url = `/${otherLocale}/${tuple.collection}/${tuple.slug}/`;
        expect(isFallbackUrl(url)).toBe(true);
        expect(isSitemapExcluded(url)).toBe(true);
      }
    }
  });

  it('always excludes legacy (locale-free) URLs regardless of fallback status', () => {
    expect(isSitemapExcluded('/work/portfolio-v1')).toBe(true);
    expect(isSitemapExcluded('/')).toBe(true);
  });
});
