# Content pipeline

Two collections — `work` and `writing` — defined in `src/content.config.ts` via the `glob` loader. Content is organized by locale subdirs. Entries are rendered through `src/layouts/MarkdownLayout.astro`.

## Entry organization

**Directory structure:**
```
src/content/
  work/
    en-us/
      slug-a.md
      slug-b.md
    ja-jp/
      slug-a.md         # translation of en-us/slug-a
    ko-kr/
  writing/
    en-us/
      slug-x.md
      slug-y.md
    ja-jp/
    ko-kr/
```

**Entry ID shape:** After migration, `entry.id = '<localeDir>/<slug>'`
- `en-us/slug-a`
- `ja-jp/slug-a` (same slug, different locale)
- `en-us/slug-x`

**Slug is the join key:** A translation is recognized by matching ASCII slugs across locale subdirs. No `translationKey` field is used; a file named `slug-a.md` in `ja-jp/` is a translation of the English `en-us/slug-a.md` with zero config.

**Schema:** Both collections enforce ISO-8601 dates via the Astro content config schema.

## Rendering

Dynamic routes `src/pages/[lang]/work/[slug].astro` and `src/pages/[lang]/writing/[slug].astro` mount entries through `MarkdownLayout.astro`.

### Real translations
When a localized entry exists, the page:
- Renders the localized content
- Sets canonical to itself
- Includes its locale in hreflang alternates
- Joins the hreflang cluster for that slug (language-only codes + x-default → `/en-us/…`)

### Fallback (missing translation)
When a localized entry does **not** exist, the page:
- Renders the English source content at the localized URL
- Sets canonical to the source (`/en-us/{collection}/{slug}/`)
- Includes no self-hreflang; excluded from the hreflang cluster
- Displays a localized fallback notice
- Is excluded from the sitemap

### Listing pages
Collection listing pages (`src/pages/[lang]/work/index.astro`, `src/pages/[lang]/writing/index.astro`) show entries that exist in that locale, or if none, the single available entry (usually English). The same filtering applies: real entries receive full hreflang treatment; fallback entries are canonical-ed to source and excluded from sitemap.

## ID parsing utilities

The `src/lib/i18n.ts` module exports:
- `getLocaleFromId(id: string)` — extracts locale dir from `id` (e.g., `'ja-jp'` from `'ja-jp/slug'`)
- `getSlugFromId(id: string)` — extracts slug from `id` (e.g., `'slug'` from `'ja-jp/slug'`)

**Invariant (unit-tested):** URLs and route params always use `getSlugFromId`, never raw `entry.id` — this prevents double-locale segments like `/en-us/writing/en-us/slug`.

## Future: localized slugs + translationKey

Currently deferred. If CJK-slug SEO becomes a priority (e.g., a Japanese article needs a Japanese slug for search visibility), the scheme can evolve to:
- Add an optional `translationKey` field (shared across locales)
- Allow slugs to differ per locale (e.g., `en-us/algorithm-introduction.md` ↔ `ja-jp/アルゴリズム入門.md`)
- Keep shared ASCII slug as fallback join key for backwards compatibility

This change is non-disruptive — the schema and routes already support it.
