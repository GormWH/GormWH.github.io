import { describe, it, expect } from 'vitest';
import { normalizeTag, collectTags, entryTagsAttr } from '@lib/tagFilter';

describe('normalizeTag', () => {
  it('lowercases and hyphenates whitespace', () => {
    expect(normalizeTag('GitHub Pages')).toBe('github-pages');
  });

  it('trims surrounding whitespace', () => {
    expect(normalizeTag('  Astro  ')).toBe('astro');
  });

  it('collapses runs of whitespace (tabs, multiple spaces) into a single hyphen', () => {
    expect(normalizeTag('React   Native')).toBe('react-native');
    expect(normalizeTag('React\tNative')).toBe('react-native');
  });

  it('returns an empty string for an empty input', () => {
    expect(normalizeTag('')).toBe('');
  });
});

describe('collectTags', () => {
  it('dedupes by normalized key, keeps first-seen display, sorts by count desc then display asc', () => {
    const entries = [
      { data: { tags: ['Astro', 'React'] } },
      { data: { tags: ['astro', 'Vue', ''] } },
      { data: { tags: ['  ', 'React'] } },
    ];

    const result = collectTags(entries);

    expect(result).toContain('Astro');
    expect(result).toEqual(['Astro', 'React', 'Vue']);
  });

  it('skips whitespace-only and empty tags', () => {
    const entries = [{ data: { tags: ['', '   ', 'Solo'] } }];
    expect(collectTags(entries)).toEqual(['Solo']);
  });
});

describe('entryTagsAttr', () => {
  it('normalizes each tag, drops empties, and joins with a space', () => {
    expect(entryTagsAttr(['GitHub Pages', '', 'Astro'])).toBe('github-pages astro');
  });
});
