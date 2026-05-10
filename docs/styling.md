# Styling system

Design tokens live in `src/styles/global.css` as Tailwind v4 `@theme` variables. They generate utilities automatically.

## Tokens → utilities

| Token group | Utility shape | Examples |
| --- | --- | --- |
| `--color-*` | `bg-*` / `text-*` / `border-*` | `bg-bg`, `text-ink-1`, `text-accent-ink` |
| `--font-display\|body\|headline\|serif\|mono` | `font-*` | `font-display` |
| `--text-12 ... --text-104`, plus semantic `--text-display` / `--text-lead` | `text-*` | Paired `--line-height` / `--letter-spacing` / `--font-weight` modifiers |
| `--container-page` (1280px), `--container-reading` (720px) | `max-w-*` | `max-w-page`, `max-w-reading` |
| `--radius-1/2/3` | `rounded-*` | — |
| `--ease-mech`, `--duration-fast/base/slow` | transition tokens | — |
| `--shadow-overlay` | `shadow-*` | — |

**Do not use `--container-content`** — `max-content` is a CSS keyword and would collide with the generated `max-content` utility.

## Component class prefixes

- `gh-*` — site-wide component classes (e.g. `gh-display`, `gh-btn`, `gh-btn-primary`, `gh-meta`, `gh-section`, `gh-section-head`, `gh-section-title`).
- `hp-*` — page-scoped classes for the homepage (hero / about).

Both are defined in `global.css`. Reach for tokens / utilities first; only add a new `gh-*` class when a pattern recurs.

## When in doubt

1. Token first → utility second → new `gh-*` class only if the pattern is repeated.
2. No raw hex when a `--color-*` token already covers it.
3. No new `tailwind.config.*` file. Tailwind v4 CSS-first config is the only source.
