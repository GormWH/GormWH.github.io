# `.claude/` settings

## Committed allowlist (`.claude/settings.json`)

A small, conservative set of commands that AI agents can run without a permission prompt:

- `pnpm install | dev | build | preview | check`
- `astro check`
- Read-only `git status | diff | log | show`
- `astro-docs` MCP search

A PreToolUse hook (`.claude/hooks/block-build-artifacts.py`) refuses Edit / Write / MultiEdit when the target path has `dist` or `.astro` as a path segment.

## Intentionally NOT allowlisted

These grant arbitrary code execution or destructive ops, so they require an explicit prompt:

| Command | Why blocked |
| --- | --- |
| `Bash(pnpm exec *)` | Allows `pnpm exec node -e '<anything>'` |
| `Bash(pnpm add *)`, `Bash(pnpm astro add *)` | Install hooks run on add |
| `Bash(pnpm astro telemetry *)` | Side-effecting |
| `Bash(git push *)`, `Bash(git reset --hard *)`, broad `Bash(git *)` | Destructive |

## Personal extras

`.claude/settings.local.json` is gitignored. Add what you need locally; don't promote to the committed file without thinking about blast radius.
