import { describe, it, expect } from 'vitest';
import { collectTags, entryTagsAttr } from '@lib/tagFilter';
import { workEntries, writingEntries } from '../fixtures/entries';

describe('tag collection across content collections', () => {
  it('collects and dedupes tags from work + writing entries', () => {
    const result = collectTags([...workEntries, ...writingEntries]);

    expect(result.every((tag) => tag.length > 0)).toBe(true);
    expect(result).toContain('Astro');
    expect(result).not.toContain('astro');
  });

  it('builds a normalized, space-joined tag attribute', () => {
    expect(entryTagsAttr(['CFD', 'TypeScript'])).toBe('cfd typescript');
  });
});
