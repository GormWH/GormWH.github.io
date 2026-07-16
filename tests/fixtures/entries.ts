export interface FixtureEntry {
  data: { tags: string[] };
}

// Deliberate mix of casing/spacing so normalizeTag collapsing is observable.
export const workEntries: FixtureEntry[] = [
  { data: { tags: ['Astro', 'TypeScript'] } },
  { data: { tags: ['astro', 'GitHub Pages'] } },
  { data: { tags: ['CFD', 'TypeScript', 'astro'] } },
];

export const writingEntries: FixtureEntry[] = [
  { data: { tags: ['Note', 'astro'] } },
  { data: { tags: [] } },
];
