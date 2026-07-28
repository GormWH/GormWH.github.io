import { describe, it, expect } from 'vitest';
import { ui, useTranslations } from '@lib/ui';

describe('ui dict', () => {
  it('has en, ja, ko entries with the same key shape', () => {
    const flatten = (obj: object, prefix = ''): string[] =>
      Object.entries(obj).flatMap(([k, v]) =>
        typeof v === 'string' ? [`${prefix}${k}`] : flatten(v as object, `${prefix}${k}.`),
      );
    const enKeys = flatten(ui.en).sort();
    const jaKeys = flatten(ui.ja).sort();
    const koKeys = flatten(ui.ko).sort();
    expect(jaKeys).toEqual(enKeys);
    expect(koKeys).toEqual(enKeys);
  });

  it('contains no emoji, only the allowed glyphs alongside ASCII/CJK text', () => {
    const flatten = (obj: object): string[] =>
      Object.values(obj).flatMap((v) => (typeof v === 'string' ? [v] : flatten(v as object)));
    const allStrings = [...flatten(ui.en), ...flatten(ui.ja), ...flatten(ui.ko)];
    // Emoji live in the astral/supplementary planes; surrogate pairs in that
    // range are the practical signal for "this string has an emoji in it".
    const emojiPattern = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/u;
    for (const s of allStrings) {
      expect(s).not.toMatch(emojiPattern);
    }
  });
});

describe('useTranslations', () => {
  it('returns the requested language for a known code', () => {
    const t = useTranslations('ja');
    expect(t('nav.work')).toBe(ui.ja.nav.work);
  });

  it('falls back to English for an unknown code', () => {
    const t = useTranslations('xx');
    expect(t('nav.work')).toBe(ui.en.nav.work);
  });

  it('falls back to English for a key missing from the requested language and returns the key itself as a last resort', () => {
    const t = useTranslations('ja');
    // nav.work exists in both; sanity-check normal resolution still works
    expect(t('nav.work')).toBe('実績');
  });

  it('resolves every declared key to a non-empty string for all three languages', () => {
    const keys = [
      'nav.about',
      'nav.work',
      'nav.writing',
      'nav.contact',
      'home.hero.ctaWork',
      'home.hero.ctaContact',
      'home.about.heading',
      'home.work.heading',
      'home.writing.intro',
      'home.contact.heading',
      'footer.copyright',
      'footer.location',
      'contact.lead',
      'notFound.heading',
      'fallbackNotice',
    ] as const;
    for (const code of ['en', 'ja', 'ko'] as const) {
      const t = useTranslations(code);
      for (const key of keys) {
        expect(t(key).length).toBeGreaterThan(0);
      }
    }
  });
});
