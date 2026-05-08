# AGENTS.md

Single source of truth for contributors and AI agents. Claude Code reaches this file via `CLAUDE.md`, which is a symlink to this file.

## 1. Project

Astro 6 static site for a personal portfolio, deployed to GitHub Pages at `https://GormWH.github.io` (user/org root, no project subpath).

## 2. Commands

Package manager is **pnpm** (Node `>=22.12.0`). `pnpm-workspace.yaml` allowlists `esbuild` and `sharp` for native builds.

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install deps |
| `pnpm dev` | Astro dev server at `localhost:4321` |
| `pnpm build` | Production build to `./dist/` |
| `pnpm preview` | Serve `./dist/` locally |
| `pnpm check` | Type-check `.astro` + TS via `astro check` |

There is no test suite, no linter, and no formatter wired up — don't invent commands for them. The deploy gate is `pnpm build`. Run `pnpm check` before pushing.

## 3. Architecture

### Stack
- **Astro 6** with the **React** integration (`@astrojs/react`) — React is available for islands but currently every page-level file is `.astro`.
- **Tailwind v4** via the Vite plugin (`@tailwindcss/vite`), configured in `astro.config.mjs`. There is **no `tailwind.config.*`** — all design tokens are declared in `@theme { ... }` inside `src/styles/global.css` (Tailwind v4 CSS-first config).
- TypeScript via `astro/tsconfigs/strictest` (see `tsconfig.json`).

### Path aliases (`tsconfig.json`)
- `@components/*` → `src/components/*` — site-wide chrome (Header, Footer)
- `@layouts/*` → `src/layouts/*` — page shells (currently `BaseLayout.astro` which mounts global CSS, Google Fonts preconnect, Header, `<slot />`, Footer)
- `@features/*` → `src/features/*` — page-scoped sections grouped by route, e.g. `features/home/{Hero,About,Work,Writing,Contact}.astro` composed by `pages/index.astro`

When adding a new page section, follow the **feature-folder** convention (`features/<route>/<Section>.astro`) rather than dumping into `components/`.

### Styling system
Design tokens live in `src/styles/global.css` as Tailwind v4 `@theme` variables. They generate utilities automatically:
- `--color-*` → `bg-*` / `text-*` / `border-*` (e.g. `bg-bg`, `text-ink-1`, `text-accent-ink`)
- `--font-display|body|headline|serif|mono` → `font-display` etc.
- `--text-12 ... --text-104` plus semantic `--text-display` / `--text-lead` (with paired `--line-height` / `--letter-spacing` / `--font-weight` modifiers)
- `--container-page` (1280px) / `--container-reading` (720px) → `max-w-page` / `max-w-reading`. **Do not use `--container-content`** — `max-content` is a CSS keyword and would collide.
- `--radius-1/2/3`, `--ease-mech`, `--duration-fast/base/slow`, `--shadow-overlay`

Component classes prefixed `gh-*` (e.g. `gh-display`, `gh-btn`, `gh-btn-primary`, `gh-meta`, `gh-section`, `gh-section-head`, `gh-section-title`) and page-scoped `hp-*` (homepage hero / about) are also defined in `global.css`. Reach for tokens/utilities first; only add a new `gh-*` class when a pattern recurs.

### Routing & deployment
- File-based routing under `src/pages/`. Live routes: `index.astro`, `work/index.astro`, `work/[slug].astro`, `contact.astro`. The `Header` component also references `/about` and `/blog` — those routes still need to be created.
- `astro.config.mjs` sets `site: 'https://GormWH.github.io'` (used for canonical URLs and the sitemap). No `base` is set, so the deploy expects the user/organization Pages root, not a project subpath.

## 4. Brand voice (when writing copy)

Personal copy uses **`I` voice**, calm and direct (no `we`). Project descriptions use neutral third-person. **No emoji.** Allowed glyphs: `→ · — ※ ✻`. Sentence case for headings; ALL CAPS only for tiny mono labels. Languages in scope: EN / JP / KR — the live hero already mixes all three (`한국어 · 日本語 · English`).

## 5. Commit messages

- **Summary:** one line, max ~70 chars, conventional-commits prefix for source code changes (`feat`, `chore`, `refactor`, `fix`, `docs`, etc.). Sentence case in the body is fine.
- **Body (optional):** max **5 lines**, wrapped near 72 chars per line. Explain *why* the change exists, not what the diff shows.
- **No AI / tooling attribution.** Do NOT add `Co-Authored-By: Claude …` or any agent/AI byline. The git author is the human contributor.
- **No internal planning-artifact references.** Do NOT mention `.omc/plans/…`, agent transcripts, or workflow internals (ralph, ralplan, etc.) in commit messages.
- For `--no-ff` merges, the merge message follows the same rule — usually one line is enough.

## 6. `.claude/` settings

The committed `.claude/settings.json` allowlists a small, conservative set of commands so AI agents don't trigger a permission prompt for routine work: `pnpm install|dev|build|preview|check|astro check`, read-only `git status|diff|log|show`, and the `astro-docs` MCP search. It also wires one PreToolUse hook (`.claude/hooks/block-build-artifacts.py`) that refuses Edit/Write/MultiEdit when the target path has `dist` or `.astro` as a path segment.

Intentionally **not** in the public allowlist (these grant arbitrary code execution or destructive ops):
- `Bash(pnpm exec *)` — would allow `pnpm exec node -e '<anything>'`.
- `Bash(pnpm add *)` and `Bash(pnpm astro add *)` — install hooks run on add.
- `Bash(pnpm astro telemetry *)` — side-effecting.
- `Bash(git push *)`, `Bash(git reset --hard *)`, broad `Bash(git *)` — destructive.

Personal extras live in `.claude/settings.local.json`, which is gitignored. Add what you need locally; don't promote to the committed file without thinking about blast radius.

## 7. Reviewer subagent

`.claude/agents/astro-tailwind-reviewer.md` is a read-only reviewer that enforces the rules in §3 (Tailwind v4 token discipline, no new `tailwind.config.*`, no raw hex when a token exists, no `--container-content`, sections under `features/<route>/`, `gh-*` vs `hp-*` discipline). It is automatically invoked as the last numbered step of the `new-section` skill, and can be invoked manually via `@astro-tailwind-reviewer` whenever you've changed `.astro` files or `src/styles/global.css`.

## 8. `new-section` skill

Run `/new-section <route> <SectionName>` (user-invocable only) to scaffold a new feature-folder section at `src/features/<route>/<SectionName>.astro` using the standard template (`gh-section`, `gh-section-head`, `gh-meta` + numbered label, `gh-section-title`). The skill prints the import line and JSX usage to paste into `src/pages/<route>.astro` (or the route's `index.astro`), and finishes by invoking the reviewer.
