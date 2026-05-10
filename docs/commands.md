# Commands

Package manager is **pnpm** (Node `>=22.12.0`). `pnpm-workspace.yaml` allowlists `esbuild` and `sharp` for native builds.

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install deps |
| `pnpm dev` | Astro dev server at `localhost:4321` |
| `pnpm build` | Production build to `./dist/` |
| `pnpm preview` | Serve `./dist/` locally |
| `pnpm check` | Type-check `.astro` + TS via `astro check` |

There is **no test suite, no linter, and no formatter** wired up — don't invent commands for them.

## Gates

- **Deploy gate:** `pnpm build` must succeed.
- **Pre-push:** run `pnpm check` before pushing.
