---
name: new-section
description: Scaffold a new feature-folder section at src/features/<route>/<SectionName>.astro using the project's standard template. User-invocable only.
disable-model-invocation: true
---

# new-section

Scaffolds a new page section that follows the feature-folder convention defined in `AGENTS.md` §3 (Architecture → Path aliases / Routing).

## Usage

```
/new-section <route> <SectionName>
```

Examples:

```
/new-section work CaseStudies
/new-section about Timeline
/new-section blog Recent
```

## Steps

When invoked, perform these steps in order — do not skip the reviewer step.

### 1. Validate args

- `<route>` must be a single lowercase identifier (letters, digits, hyphens). Reject `..`, slashes, or empty.
- `<SectionName>` must be a `PascalCase` identifier valid as both an Astro component name and a JS import binding.
- If either is invalid, stop and tell the user the exact rule that failed.

### 2. Compute derived values

- `slug` = kebab-case of `<SectionName>` (e.g. `CaseStudies` → `case-studies`).
- `id` = `<route>-<slug>` (used as the section's DOM id).
- `number` = the next 2-digit ordinal for sections in this route. Read all existing files in `src/features/<route>/` (if the dir exists), count their `<p class="gh-meta">NN — …</p>` labels, take max+1. If the dir doesn't exist or has no sections, start at `01`. Format with leading zero.

### 3. Read the template

Read `.claude/skills/new-section/template.astro`. Substitute:

| Placeholder | Replace with |
| --- | --- |
| `__SECTION_ID__` | the computed `id` |
| `__SECTION_NUMBER__` | the computed `number` |
| `__SECTION_NAME__` | the original `SectionName` (used in the meta label) |

### 4. Write the new file

Target path: `src/features/<route>/<SectionName>.astro`. If the file already exists, stop and tell the user — do not overwrite.

If `src/features/<route>/` does not yet exist, create it.

### 5. Print the wire-up snippet

The skill does **not** edit `src/pages/<route>.astro` (or `src/pages/<route>/index.astro`). Print the exact lines for the user to paste:

```
Add to src/pages/<route>.astro (or src/pages/<route>/index.astro):

  Frontmatter:
    import <SectionName> from "@features/<route>/<SectionName>.astro";

  Body (inside <BaseLayout>, in the desired position):
    <<SectionName> />
```

Include the actual computed paths in the printed output, not the placeholders.

### 6. Invoke the reviewer

Mention `@astro-tailwind-reviewer` so the reviewer subagent runs against the new file and any other recent `.astro` / `src/styles/global.css` edits. This is a required step, not optional.

## What this skill does NOT do

- It does not edit `src/pages/<route>.astro` (so the user reviews the wire-up before it renders).
- It does not modify `src/styles/global.css` or invent new `gh-*` classes.
- It does not run `pnpm dev` or `pnpm check` — let the user run those.
