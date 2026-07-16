import { describe, it, expect } from 'vitest';
import {
  absoluteUrl,
  serializeJsonLd,
  buildPersonSchema,
  buildArticleSchema,
  buildBlogPostingSchema,
  AUTHOR,
  GITHUB_URL,
  LINKEDIN_URL,
} from '@lib/seo';

describe('absoluteUrl', () => {
  it('returns the path unchanged when site is undefined', () => {
    expect(absoluteUrl('/foo', undefined)).toBe('/foo');
  });

  it('adds a leading slash and prefixes the origin', () => {
    expect(absoluteUrl('bar', new URL('https://ex.com'))).toBe('https://ex.com/bar');
  });

  it('uses the origin only, dropping any path on site', () => {
    expect(absoluteUrl('/a', new URL('https://ex.com/sub/page'))).toBe('https://ex.com/a');
  });
});

describe('serializeJsonLd', () => {
  it('escapes </ so embedded </script> cannot close the surrounding tag', () => {
    const schema = buildArticleSchema({
      url: 'https://ex.com/a',
      headline: 'Title</script>End',
      datePublished: '2024-01-01',
    });
    const result = serializeJsonLd(schema);
    expect(result).toContain('<\\/script>');
    expect(result).not.toContain('</script>');
  });
});

describe('buildPersonSchema', () => {
  it('builds a Person schema without image when none is given', () => {
    const result = buildPersonSchema({ url: 'https://ex.com' });
    expect(result['@type']).toBe('Person');
    expect(result.name).toBe(AUTHOR);
    expect(result.url).toBe('https://ex.com');
    expect(result.sameAs).toEqual([GITHUB_URL, LINKEDIN_URL]);
    expect(result).not.toHaveProperty('image');
  });

  it('includes image when given', () => {
    const result = buildPersonSchema({ url: 'https://ex.com', image: '/x.png' });
    expect(result.image).toBe('/x.png');
  });
});

describe('buildArticleSchema', () => {
  it('converts a Date datePublished to an ISO string', () => {
    const result = buildArticleSchema({
      url: 'https://ex.com/a',
      headline: 'Hello',
      datePublished: new Date('2024-03-01T00:00:00.000Z'),
    });
    expect(result['@type']).toBe('Article');
    expect(result.datePublished).toBe('2024-03-01T00:00:00.000Z');
    expect(result.author).toEqual({ '@type': 'Person', name: AUTHOR });
  });

  it('omits description, dateModified, and image when not provided', () => {
    const result = buildArticleSchema({
      url: 'https://ex.com/a',
      headline: 'Hello',
      datePublished: '2024-03-01',
    });
    expect(result).not.toHaveProperty('description');
    expect(result).not.toHaveProperty('dateModified');
    expect(result).not.toHaveProperty('image');
  });

  it('passes a string datePublished through unchanged', () => {
    const result = buildArticleSchema({
      url: 'https://ex.com/a',
      headline: 'Hello',
      datePublished: '2024-03-01',
    });
    expect(result.datePublished).toBe('2024-03-01');
  });
});

describe('buildBlogPostingSchema', () => {
  it('builds the same shape as buildArticleSchema but with @type BlogPosting', () => {
    const result = buildBlogPostingSchema({
      url: 'https://ex.com/a',
      headline: 'Hello',
      datePublished: new Date('2024-03-01T00:00:00.000Z'),
    });
    expect(result['@type']).toBe('BlogPosting');
    expect(result.datePublished).toBe('2024-03-01T00:00:00.000Z');
    expect(result.author).toEqual({ '@type': 'Person', name: AUTHOR });
  });

  it('omits description, dateModified, and image when not provided', () => {
    const result = buildBlogPostingSchema({
      url: 'https://ex.com/a',
      headline: 'Hello',
      datePublished: '2024-03-01',
    });
    expect(result).not.toHaveProperty('description');
    expect(result).not.toHaveProperty('dateModified');
    expect(result).not.toHaveProperty('image');
  });
});
