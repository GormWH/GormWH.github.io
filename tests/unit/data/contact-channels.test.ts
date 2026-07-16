import { describe, it, expect } from 'vitest';
import { channels } from '../../../src/data/contact-channels';

describe('contact channels', () => {
  it('is a non-empty array', () => {
    expect(channels.length).toBeGreaterThan(0);
  });

  it('has non-empty label, value, and href on every channel', () => {
    for (const channel of channels) {
      expect(channel.label.length).toBeGreaterThan(0);
      expect(channel.value.length).toBeGreaterThan(0);
      expect(channel.href.length).toBeGreaterThan(0);
    }
  });

  it('points external channels to an absolute http(s) URL', () => {
    for (const channel of channels) {
      if (channel.external === true) {
        expect(channel.href.startsWith('http')).toBe(true);
      }
    }
  });

  it('points non-external channels to a site-relative path', () => {
    for (const channel of channels) {
      if (channel.external !== true) {
        expect(channel.href.startsWith('/')).toBe(true);
      }
    }
  });
});
