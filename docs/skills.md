# Skills

Project-local skills shipped under `.claude/skills/` (or referenced from there). User-invocable only — not auto-triggered.

## `/new-section <route> <SectionName>`

Scaffolds a new feature-folder section at `src/features/<route>/<SectionName>.astro` using the standard template:

- `gh-section`
- `gh-section-head`
- `gh-meta` + numbered label
- `gh-section-title`

The skill then prints the import line and JSX usage to paste into `src/pages/<route>.astro` (or the route's `index.astro`), and finishes by invoking the [`astro-tailwind-reviewer`](reviewer-subagent.md).
