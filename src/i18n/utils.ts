import { ui, defaultLang, type Lang, type UiKey } from './translations';

const LOCALE_PREFIX_RE = /^\/(en|ja|ko)(\/|$)/;

export function getLangFromUrl(url: URL): Lang {
  const first = url.pathname.split('/').filter(Boolean)[0];
  if (first && first in ui) return first as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang | string | undefined) {
  const l = (lang && lang in ui ? lang : defaultLang) as Lang;
  return function t(key: UiKey): string {
    const table = ui[l] as Record<string, string>;
    const fallback = ui[defaultLang] as Record<string, string>;
    return table[key] ?? fallback[key] ?? key;
  };
}

export function stripLocalePrefix(pathname: string): string {
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const m = p.match(LOCALE_PREFIX_RE);
  if (!m) return p;
  const rest = p.slice(m[0].length);
  if (!rest || rest === '/') return '/';
  return rest.startsWith('/') ? rest : `/${rest}`;
}

/**
 * Build a locale-prefixed path. `path` should be site-relative without locale, e.g. `/` or `/projects/foo`.
 */
export function getLocalizedPath(path: string, lang: Lang | string | undefined): string {
  const l = (lang && lang in ui ? lang : defaultLang) as Lang;
  const raw = path.startsWith('/') ? path : `/${path}`;
  const stripped = stripLocalePrefix(raw);
  if (stripped === '/') return `/${l}/`;
  return `/${l}${stripped}`;
}

export function getOtherLocales(current: Lang | string | undefined): Lang[] {
  const c = (current && current in ui ? current : defaultLang) as Lang;
  return (Object.keys(ui) as Lang[]).filter((loc) => loc !== c);
}
