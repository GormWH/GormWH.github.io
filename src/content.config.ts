import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Use ISO 8601: `YYYY-MM-DD` (or YAML date literal). Loose strings
    // like "March 2024" silently coerce to month-start in local TZ —
    // do NOT rely on this; always write full dates.
    date: z.coerce.date(),
    org: z.string(),
    tags: z.array(z.string()).default([]),
    important: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['Note', 'Essay', 'Log']),
    tags: z.array(z.string()).default([]),
    important: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, writing };
