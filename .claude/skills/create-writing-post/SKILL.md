---
name: create-writing-post
description: Create a new entry in the `writing` content collection at `src/content/writing/<slug>.md` with the project's standard frontmatter and a first-person body. User-invocable only.
disable-model-invocation: true
---

# create-writing-post

Scaffolds a new entry in the `writing` content collection defined in `src/content.config.ts`. The collection is consumed by `src/pages/writing/index.astro` (the listing) and `src/pages/writing/[slug].astro` (the per-entry detail page), and surfaced on the homepage by `src/features/home/Writing.astro`.

## Usage

```
/create-writing-post
```

Arguments are optional. If the user provides them in any order, parse what you can; otherwise, prompt for the missing fields. The required fields are listed in step 2 below.

## What writing posts are for

Per the user's intent for this collection: **insights / TIL / seminar reflections — short personal posts about what the user is thinking or has learned**. Three kinds, fixed by the schema:

- **Note** — short observation or TIL, often <300 words.
- **Essay** — longer think-out-loud piece with an argument.
- **Log** — retrospective or status post about a specific event, talk, or revisit.

If the user is unsure which `kind` fits, default to `Note`.

## Voice and length

Personal copy uses **first-person `I`-voice**, calm and direct (per `AGENTS.md` §4). No `we`. No emoji. Allowed glyphs only: `→ · — ※ ✻`. Sentence case for the title. Keep both `description` and the body conversational. Existing entries (`src/content/writing/*.md`) are the calibration set; match their density and tone.

## Steps

When invoked, perform these steps in order.

### 1. Read the schema

Read `src/content.config.ts` and confirm the `writing` collection's required fields. As of writing they are: `title`, `description`, `date` (ISO 8601 — `YYYY-MM-DD`), `kind` (`'Note' | 'Essay' | 'Log'`, **enum — case-sensitive**), `tags` (string array, default `[]`), `important` (bool, default `false`), `draft` (bool, default `false`). If the schema has drifted, follow the schema, not this list.

### 2. Gather inputs

Collect from the user (asking only for what wasn't already provided):

| Field | Notes |
| --- | --- |
| `title` | Sentence case. No trailing period. |
| `description` | One sentence, first-person, written like a hook line. Ends with a period. |
| `date` | ISO 8601 only (`YYYY-MM-DD`). Reject loose strings like "March 2024" — the schema warns these silently coerce to month-start in local TZ. Default: today's date. |
| `kind` | Exactly one of `Note`, `Essay`, `Log` — case-sensitive. The Zod enum will reject any other value. Default `Note`. |
| `tags` | Optional. Comma-separated list; pass through as a YAML array. If empty, omit the key (the schema defaults to `[]`). |
| `important` | Optional, defaults to `false`. Only set `true` for entries that should pin to the top of the listing. |
| `draft` | Optional, defaults to `false`. `true` hides the entry from production builds (still visible in `pnpm dev`). |
| `slug` | Optional. If absent, derive from `title`: lowercase, ASCII-only, words joined with `-`, strip punctuation, drop articles (`a`, `an`, `the`) when that produces a cleaner slug. Reject collisions with existing files in `src/content/writing/`. |
| `body` | Optional. If the user supplies a draft, use it; otherwise compose 1–3 short paragraphs from `title` + `description`, in `I`-voice. |

### 3. Validate

- `slug` matches `^[a-z0-9][a-z0-9-]*$` and does not already exist as `src/content/writing/<slug>.md`.
- `date` matches `^\d{4}-\d{2}-\d{2}$` and is a real calendar date.
- `kind` is exactly one of `Note`, `Essay`, `Log`.
- If any check fails, stop and report the exact rule that failed. Do not write a file.

### 4. Read the template

Read `.claude/skills/create-writing-post/template.md`. Substitute placeholders:

| Placeholder | Replace with |
| --- | --- |
| `__TITLE__` | the `title` value (YAML-escape if it contains `:` or quotes) |
| `__DESCRIPTION__` | the `description` value (YAML-escape as above) |
| `__DATE__` | the ISO date, unquoted YAML date literal |
| `__KIND__` | one of `Note`, `Essay`, `Log` (in quotes — the enum is string-typed) |
| `__TAGS__` | a YAML inline array, e.g. `["Tooling", "AI"]`. Omit the entire `tags:` line if the user gave none. |
| `__IMPORTANT__` | `true` or `false`. Omit the line entirely when the value equals the default `false`. |
| `__DRAFT__` | `true` or `false`. Omit the line entirely when the value equals the default `false`. |
| `__BODY__` | the body paragraph(s) |

### 5. Write the file

Target path: `src/content/writing/<slug>.md`.

- If the file already exists, stop and tell the user — do not overwrite. Suggest a different slug.
- Otherwise create the file.

### 6. Confirm and hand off

Print:

```
Wrote src/content/writing/<slug>.md

This entry is now picked up by:
  - /writing                   (listing, src/pages/writing/index.astro)
  - /writing/<slug>/           (detail, src/pages/writing/[slug].astro)
  - The homepage Writing list (src/features/home/Writing.astro), if it ranks in the top 4 by importance + date.

Run `pnpm build` to verify the schema and routes still build.
```

Substitute the actual slug. Do **not** run `pnpm build` from inside the skill — let the user decide when to verify.

## What this skill does NOT do

- Does not modify `src/content.config.ts`. If a new `kind` value is needed, ask the user to update the Zod enum first.
- Does not edit `src/pages/writing/*` — those routes already enumerate the collection.
- Does not run `pnpm build`, `pnpm dev`, or `pnpm check`.
- Does not invent `tags` the user didn't ask for. Tag taxonomy is the user's call.
