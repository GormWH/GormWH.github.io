# AGENTS.md

Single source of truth **index** for contributors and AI agents. Claude Code reaches this file via `CLAUDE.md`, which is a symlink to this file.

Detailed information lives in [`docs/`](docs/README.md). This file stays short on purpose: scan the table, jump to the file you need.

Root `README.md` is visitor-facing; `AGENTS.md` is the contributor index. Subjects covered in both must agree, but tone may differ.

## Project at a glance

Astro 6 static site for a personal portfolio, deployed to GitHub Pages at `https://GormWH.github.io` (user/org root, no project subpath).

- Package manager: **pnpm** (Node `>=22.12.0`).
- Deploy gate: `pnpm build`. Run `pnpm check` before pushing.
- No linter, no formatter. A Vitest unit + integration suite exists.

## Where to look

| Topic | File |
| --- | --- |
| Commands & gates | [`docs/commands.md`](docs/commands.md) |
| Testing (Vitest, structure, E2E deferral) | [`docs/testing.md`](docs/testing.md) |
| Stack, path aliases, feature-folder rule | [`docs/architecture.md`](docs/architecture.md) |
| Tailwind v4 tokens, `gh-*` / `hp-*` conventions | [`docs/styling.md`](docs/styling.md) |
| File-based routes & deploy target | [`docs/routing.md`](docs/routing.md) |
| Copy voice, glyph allowlist, languages | [`docs/brand-voice.md`](docs/brand-voice.md) |
| Commit message rules (no AI byline) | [`docs/commit-style.md`](docs/commit-style.md) |
| `.claude/` allowlist & hooks | [`docs/claude-settings.md`](docs/claude-settings.md) |
| `astro-tailwind-reviewer` subagent | [`docs/reviewer-subagent.md`](docs/reviewer-subagent.md) |
| Project skills (`new-section`, …) | [`docs/skills.md`](docs/skills.md) |
| Content collections & MarkdownLayout (stub) | [`docs/content-pipeline.md`](docs/content-pipeline.md) |
| `design-system/` reference UI kits (stub) | [`docs/design-system.md`](docs/design-system.md) |
| `src/lib/` and `src/scripts/` (stub) | [`docs/lib-and-scripts.md`](docs/lib-and-scripts.md) |

For the index of `docs/` and its contribution rules, see [`docs/README.md`](docs/README.md).

## Rules for this index

See [docs/governance.md](docs/governance.md#rules) for the rules governing this file.

## Hard rules that always apply (do not move into `docs/`)

These are short enough to live here and important enough to be unmissable:

- **No emoji** in copy. Allowed glyphs: `→ · — ※ ✻`. ([`docs/brand-voice.md`](docs/brand-voice.md))
- **No `tailwind.config.*`.** Tokens live in `@theme { ... }` inside `src/styles/global.css`. ([`docs/styling.md`](docs/styling.md))
- **No `--container-content`** — collides with the `max-content` CSS keyword. ([`docs/styling.md`](docs/styling.md))
- **No AI / tooling attribution in commits.** No `Co-Authored-By: Claude …`, no `.omc/plans/…` references. ([`docs/commit-style.md`](docs/commit-style.md))
- **Sections go in `src/features/<route>/`**, not `src/components/`. ([`docs/architecture.md`](docs/architecture.md))
