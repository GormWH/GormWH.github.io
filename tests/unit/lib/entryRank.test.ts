import { describe, it, expect } from 'vitest';
import { compareEntryPriority } from '@lib/entryRank';
import type { RankableEntry } from '@lib/entryRank';

const entry = (id: string, important: boolean, date: string): RankableEntry => ({
  id,
  data: { important, date: new Date(date) },
});

describe('compareEntryPriority', () => {
  it('orders important entries first, then newest, then id as tiebreaker', () => {
    const sorted = [
      entry('en-us/c', false, '2026-01-01'),
      entry('en-us/b', true, '2024-01-01'),
      entry('en-us/d', false, '2025-01-01'),
      entry('en-us/a', true, '2024-01-01'),
    ].sort(compareEntryPriority);
    expect(sorted.map((e) => e.id)).toEqual(['en-us/a', 'en-us/b', 'en-us/c', 'en-us/d']);
  });
});
