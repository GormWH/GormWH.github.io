# Reviewer subagent — `astro-tailwind-reviewer`

`.claude/agents/astro-tailwind-reviewer.md` is a **read-only** reviewer that enforces the project's architecture and styling rules.

## Enforces

- Tailwind v4 token discipline (see [`styling.md`](styling.md)).
- No new `tailwind.config.*`.
- No raw hex when a `--color-*` token exists.
- No `--container-content` (collides with the `max-content` keyword).
- Sections live under `features/<route>/` (see [`architecture.md`](architecture.md)).
- `gh-*` (site-wide) vs `hp-*` (homepage-scoped) class discipline.

## Invocation

- **Automatic:** the `new-section` skill invokes the reviewer as its last numbered step (see [`skills.md`](skills.md)).
- **Manual:** `@astro-tailwind-reviewer` whenever you've changed `.astro` files or `src/styles/global.css`.

## Note on localized content

The reviewer runs on `.astro` files only, not markdown content. However, when auditing template strings or hardcoded UI copy in `.astro` files:
- CJK characters (Chinese, Japanese, Korean) in **localized content paths** (e.g., `src/features/writing/ja-jp/`, `src/lib/ui.ts` `{ja: '…'}`) are expected and should not be flagged.
- The glyph allowlist (`→ · — ※ ✻`) applies only to English UI chrome and site-wide copy, not to localized article content (see [`docs/brand-voice.md`](brand-voice.md)).
