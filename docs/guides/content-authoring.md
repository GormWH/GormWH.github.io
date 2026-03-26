# Content Authoring Guide

How to write portfolio content that communicates engineering quality.

## Project markdown structure

Recommended body structure for `projects/*.md`:

1. **Context**: What problem existed? Who was affected?
2. **Constraints**: Time, performance, team, platform, or operational limits.
3. **Approach**: Architecture and key implementation decisions.
4. **Trade-offs**: What was chosen and what was intentionally not chosen.
5. **Outcome**: Impact, lessons, or measurable improvements.

## Frontmatter quality

- `title`: clear and specific.
- `description`: one-line outcome-oriented summary.
- `tags`: searchable, technology or domain-specific.
- `image.alt`: meaningful description, not decorative text.

## Writing style

- Prefer concrete statements over general claims.
- Explain decision rationale, not just implementation steps.
- Keep paragraphs short and scannable.

## Consistency with About/Contact

Project writeups should support the same narrative presented in:
- `src/pages/about.astro`
- `src/pages/contact.astro`

If personal focus changes, update those pages and this guide together.
