---
name: create-work-post
description: Create a new entry in the `work` content collection at `src/content/work/<slug>.md` with the project's standard frontmatter and a neutral third-person body. User-invocable only.
disable-model-invocation: true
---

# create-work-post

Scaffolds a new entry in the `work` content collection defined in `src/content.config.ts`. The collection is consumed by `src/pages/work/index.astro` (the listing) and `src/pages/work/[slug].astro` (the per-entry detail page), and surfaced on the homepage by `src/features/home/Work.astro`.

## Usage

```
/create-work-post
```

Arguments are optional. If the user provides them in any order, parse what you can; otherwise, prompt for the missing fields. The required fields are listed in step 2 below.

## Voice and length

This skill writes entries that describe **projects** (paid work or personal work the user is OK publishing). Per `AGENTS.md` §4 the project copy voice is **neutral third-person, no first-person `I`**. No emoji. Allowed glyphs only: `→ · — ※ ✻`. Keep both `description` and the body short — one tight sentence in `description`, one short paragraph (1–3 sentences) in the body. Existing entries (`src/content/work/*.md`) are the calibration set; match their density and tone.

## Steps

When invoked, perform these steps in order.

### 1. Read the schema

Read `src/content.config.ts` and confirm the `work` collection's required fields. As of writing they are: `title`, `description`, `date` (ISO 8601 — `YYYY-MM-DD`), `org`, `tags` (string array, default `[]`), `important` (bool, default `false`), `draft` (bool, default `false`). If the schema has drifted, follow the schema, not this list.

### 2. Gather inputs

Collect from the user (asking only for what wasn't already provided):

| Field | Notes |
| --- | --- |
| `title` | Sentence case. No trailing period. |
| `description` | One sentence, neutral third-person. Ends with a period. |
| `date` | ISO 8601 only (`YYYY-MM-DD`). Reject loose strings like "March 2024" — the schema warns these silently coerce to month-start in local TZ. |
| `org` | Org or context, e.g. `Bitset`, `U-Tokyo`, `ROK Army`, `Personal`. |
| `tags` | Optional. Comma-separated list; pass through as a YAML array. If empty, omit the key (the schema defaults to `[]`). |
| `important` | Optional, defaults to `false`. Only set `true` for entries that should pin to the top of the listing. |
| `draft` | Optional, defaults to `false`. `true` hides the entry from production builds (still visible in `pnpm dev`). |
| `slug` | Optional. If absent, derive from `title`: lowercase, ASCII-only, words joined with `-`, strip punctuation. Reject collisions with existing files in `src/content/work/`. |
| `body` | Optional. If the user supplies a draft, use it; otherwise compose 1–3 sentences from `title` + `description`, in neutral third-person. |

### 3. Validate

- `slug` matches `^[a-z0-9][a-z0-9-]*$` and does not already exist as `src/content/work/<slug>.md`.
- `date` matches `^\d{4}-\d{2}-\d{2}$` and is a real calendar date.
- `org` is non-empty.
- If any check fails, stop and report the exact rule that failed. Do not write a file.

### 4. Read the template

Read `.claude/skills/create-work-post/template.md`. Substitute placeholders:

| Placeholder | Replace with |
| --- | --- |
| `__TITLE__` | the `title` value (YAML-escape if it contains `:` or quotes) |
| `__DESCRIPTION__` | the `description` value (YAML-escape as above) |
| `__DATE__` | the ISO date, unquoted YAML date literal |
| `__ORG__` | the `org` value (YAML-escape as above) |
| `__TAGS__` | a YAML inline array, e.g. `["Python", "CLI"]`. Omit the entire `tags:` line if the user gave none. |
| `__IMPORTANT__` | `true` or `false`. Omit the line entirely when the value equals the default `false`. |
| `__DRAFT__` | `true` or `false`. Omit the line entirely when the value equals the default `false`. |
| `__BODY__` | the body paragraph(s) |

### 5. Write the file

Target path: `src/content/work/<slug>.md`.

- If the file already exists, stop and tell the user — do not overwrite. Suggest a different slug.
- Otherwise create the file.

### 6. Confirm and hand off

Print:

```
Wrote src/content/work/<slug>.md

This entry is now picked up by:
  - /work                      (listing, src/pages/work/index.astro)
  - /work/<slug>/              (detail, src/pages/work/[slug].astro)
  - The homepage Recent work grid (src/features/home/Work.astro), if it ranks in the top 4 by importance + date.

Run `pnpm build` to verify the schema and routes still build.
```

Substitute the actual slug. Do **not** run `pnpm build` from inside the skill — let the user decide when to verify.

## What this skill does NOT do

- Does not modify `src/content.config.ts`. If a new field is needed, ask the user to update the schema first.
- Does not edit `src/pages/work/*` — those routes already enumerate the collection.
- Does not run `pnpm build`, `pnpm dev`, or `pnpm check`.
- Does not invent `tags` the user didn't ask for. Tag taxonomy is the user's call.
