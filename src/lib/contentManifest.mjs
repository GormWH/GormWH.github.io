// Plain-JS, fs-based content enumeration usable from astro.config.mjs, where
// `getCollection` is not available. Kept dependency-free (no glob package) —
// just a recursive readdir. Parsing rules here are deliberately the same
// shape as src/lib/i18n.ts's getLocaleFromId/getSlugFromId (id.split('/')),
// duplicated rather than imported so this file has zero dependency on the
// Astro content-collections runtime; tests/unit/lib/contentManifest.test.ts
// pins the two implementations to the same behavior.
import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CONTENT_ROOT = join(__dirname, '..', 'content');
const COLLECTIONS = ['work', 'writing'];
const LOCALE_PATHS = ['en-us', 'ja-jp', 'ko-kr'];

function walkMarkdownFiles(dir) {
  const results = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function idFromPath(collectionRoot, filePath) {
  const rel = relative(collectionRoot, filePath).split(sep).join('/');
  return rel.replace(/\.md$/, '');
}

/**
 * Enumerates real (collection, localePath, slug) tuples by walking
 * src/content/{work,writing} on disk. Ids without a recognized locale
 * prefix are skipped rather than errored — this makes the function
 * migration-agnostic: pre-migration (flat ids, no locale subdir) it
 * returns an empty array; post-migration it reflects the real tree.
 */
export function getContentManifest() {
  const manifest = [];
  for (const collection of COLLECTIONS) {
    const collectionRoot = join(CONTENT_ROOT, collection);
    for (const filePath of walkMarkdownFiles(collectionRoot)) {
      const id = idFromPath(collectionRoot, filePath);
      const parts = id.split('/');
      const localePath = parts[0];
      const slug = parts.slice(1).join('/');
      if (!localePath || !LOCALE_PATHS.includes(localePath) || slug === '') continue;
      manifest.push({ collection, localePath, slug });
    }
  }
  return manifest;
}

function toPathname(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

/**
 * True when `url` is a real content-detail page (/<localePath>/<collection>/<slug>/)
 * that would render fallback (untranslated) content — i.e. no real entry
 * exists at that locale, only at some other (source) locale. Used by the
 * sitemap filter so fallback URLs never compete with their canonical source.
 */
export function isFallbackUrl(url) {
  const segments = toPathname(url).split('/').filter(Boolean);
  const [localePath, collection, ...slugParts] = segments;
  if (!localePath || !LOCALE_PATHS.includes(localePath)) return false;
  if (collection !== 'work' && collection !== 'writing') return false;
  const slug = slugParts.join('/');
  if (slug === '') return false;

  const manifest = getContentManifest();
  const hasAnyEntry = manifest.some((m) => m.collection === collection && m.slug === slug);
  if (!hasAnyEntry) return false;

  const isReal = manifest.some(
    (m) => m.collection === collection && m.localePath === localePath && m.slug === slug,
  );
  return !isReal;
}

/**
 * True when `url` has no recognized locale prefix at all — i.e. it's one of
 * the P4 legacy redirect stubs (or the bare '/'), which must never compete
 * with their /en-us/... canonical target in search.
 */
export function isLegacyStubUrl(url) {
  const segments = toPathname(url).split('/').filter(Boolean);
  const [first] = segments;
  return !first || !LOCALE_PATHS.includes(first);
}

/** Composed predicate for the @astrojs/sitemap `filter` option: exclude legacy stubs and fallback-rendered detail pages. */
export function isSitemapExcluded(url) {
  return isLegacyStubUrl(url) || isFallbackUrl(url);
}
