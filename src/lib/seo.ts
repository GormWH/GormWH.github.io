export interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  articleType?: 'Article' | 'BlogPosting';
  jsonLd?: JsonLdGraph;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

export const SITE_NAME = 'Gorm.';
export const AUTHOR = 'SuHong Park';
export const SITE_LOCALE = 'en_US';
export const DEFAULT_OG_IMAGE = '/og-default.png';
export const DEFAULT_DESCRIPTION = 'SuHong Park — software, hardware, AI tooling.';
export const TWITTER_CARD = 'summary_large_image';
export const GITHUB_URL = 'https://github.com/GormWH';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/gormwh/';

export function absoluteUrl(path: string, site: URL | undefined): string {
  if (!site) return path;
  const base = site.origin;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export interface PersonSchema {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  url: string;
  image?: string;
  sameAs?: string[];
}

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  author: { '@type': 'Person'; name: string };
  image?: string;
  url: string;
}

export interface BlogPostingSchema {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  author: { '@type': 'Person'; name: string };
  image?: string;
  url: string;
}

export type JsonLdGraph = PersonSchema | ArticleSchema | BlogPostingSchema | JsonLdGraph[];

export function buildPersonSchema(opts: { url: string; image?: string }): PersonSchema {
  const sameAs: string[] = [GITHUB_URL, LINKEDIN_URL].filter((u): u is string => Boolean(u));
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR,
    jobTitle: 'Software developer',
    url: opts.url,
    ...(opts.image !== undefined ? { image: opts.image } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

function toIso(d: string | Date): string {
  return d instanceof Date ? d.toISOString() : d;
}

export function buildArticleSchema(opts: {
  url: string;
  headline: string;
  description?: string;
  datePublished: string | Date;
  dateModified?: string | Date;
  image?: string;
}): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    ...(opts.description !== undefined ? { description: opts.description } : {}),
    datePublished: toIso(opts.datePublished),
    ...(opts.dateModified !== undefined ? { dateModified: toIso(opts.dateModified) } : {}),
    author: { '@type': 'Person', name: AUTHOR },
    ...(opts.image !== undefined ? { image: opts.image } : {}),
    url: opts.url,
  };
}

export function buildBlogPostingSchema(opts: {
  url: string;
  headline: string;
  description?: string;
  datePublished: string | Date;
  dateModified?: string | Date;
  image?: string;
}): BlogPostingSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.headline,
    ...(opts.description !== undefined ? { description: opts.description } : {}),
    datePublished: toIso(opts.datePublished),
    ...(opts.dateModified !== undefined ? { dateModified: toIso(opts.dateModified) } : {}),
    author: { '@type': 'Person', name: AUTHOR },
    ...(opts.image !== undefined ? { image: opts.image } : {}),
    url: opts.url,
  };
}

export function serializeJsonLd(graph: JsonLdGraph): string {
  return JSON.stringify(graph).replace(/<\//gi, '<\\/');
}
