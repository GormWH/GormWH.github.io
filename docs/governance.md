# Governance

## Rules

1. **Each rule is owned by exactly one `docs/*.md` file.** Edit the canonical file first; [`AGENTS.md`](../AGENTS.md) is an index. **Enforcement: honor-system** — no automated check.
2. **Information gap → leave a stub, don't leave silence.** If an agent (or contributor) goes looking for project information and finds nothing on the topic, create a stub file in `docs/` (using the template below), and add a row to the [`AGENTS.md`](../AGENTS.md) "Where to look" table.
3. **Hard-rules block in `AGENTS.md` is an intentional Rule 1 exception.** The bullets at the top of [`AGENTS.md`](../AGENTS.md) under "Hard rules that always apply" are duplicated from their canonical `docs/*.md` files because the cost of an agent missing them is much higher than the drift risk. The mapping is:

   | AGENTS.md "Hard rule" bullet | Canonical source |
   | --- | --- |
   | No emoji (allowed glyphs `→ · — ※ ✻`) | [`docs/brand-voice.md`](brand-voice.md) |
   | No `tailwind.config.*` | [`docs/styling.md`](styling.md) |
   | No `--container-content` | [`docs/styling.md`](styling.md) |
   | No AI / tooling attribution in commits | [`docs/commit-style.md`](commit-style.md) |
   | Sections live under `src/features/<route>/` | [`docs/architecture.md`](architecture.md) |

   Edit canonical first, then sync the bullet here.

## Stub template

Use this template for any file created under Rule 2.

```markdown
# <subject>

> **Status: incomplete** — placeholder created on <YYYY-MM-DD> because <who/why> looked for this and found nothing. Fill in or delete.

## Known so far
- <bullet of anything actually known>

## Open questions
- <bullet of what to clarify>
```

## Cross-link contracts

- **AGENTS.md → governance anchor.** [`AGENTS.md`](../AGENTS.md) "Rules for this index" section links to `docs/governance.md#rules`. Renaming the heading `Rules` (above) breaks the link. There must be exactly one `## Rules` H2 in this file.
- **Repo-root-relative paths from AGENTS.md.** [`AGENTS.md`](../AGENTS.md) links to `docs/*.md` via repo-root-relative paths.
- **CLAUDE.md → AGENTS.md symlink.** `CLAUDE.md` at the repo root is a symlink to `AGENTS.md` (also at the repo root). Tools that read `CLAUDE.md` (Claude Code) inherit `AGENTS.md` verbatim. Relative links resolve correctly **only because both files sit at the same depth**. Removing the symlink, replacing it with a regular file, or moving either target to a different directory silently breaks Claude Code context loading and every relative link in `AGENTS.md`.
