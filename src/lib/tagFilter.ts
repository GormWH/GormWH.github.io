export function normalizeTag(t: string): string {
  // Hyphenate whitespace so multi-word tags like "GitHub Pages" become a
  // single token. The filter splits `data-entry-tags` on whitespace, so a
  // raw space in a normalized tag would silently fragment it.
  return t.trim().toLowerCase().replace(/\s+/g, "-");
}

export function collectTags<T extends { data: { tags: string[] } }>(
  entries: T[],
): string[] {
  const counts = new Map<string, { display: string; count: number }>();
  for (const e of entries) {
    for (const raw of e.data.tags) {
      const key = normalizeTag(raw);
      if (!key) continue;
      const existing = counts.get(key);
      if (existing) {
        existing.count++;
      } else {
        counts.set(key, { display: raw, count: 1 });
      }
    }
  }
  return [...counts.values()]
    .sort((a, b) => b.count - a.count || a.display.localeCompare(b.display))
    .map((v) => v.display);
}

export function entryTagsAttr(tags: string[]): string {
  return tags.map(normalizeTag).filter(Boolean).join(" ");
}
