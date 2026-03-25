# Design System (Current)

This is a lightweight snapshot of present styling conventions in this repository.

## Principles

- Prioritize readability and signal over decorative complexity.
- Keep layout simple so project content remains the focus.
- Use consistent spacing and heading hierarchy across pages.

## Current conventions

- Layout wrapper: `main` content rendered by `BaseLayout`.
- Common article spacing: `class="p-4"` in page-level `<article>`.
- Heading pattern: page title via `BaseLayout pageTitle`, section header via `text-2xl`.
- Navigation: simple text links in `Header`.

## Content presentation conventions

- Use short paragraphs.
- Use explicit links for projects and external profile/contact destinations.
- Keep claims specific and verifiable by project evidence.

## If evolving the design

When making a noticeable visual shift:
1. Update this file with new shared tokens/patterns.
2. Keep consistency across Home/About/Projects/Contact.
3. Re-check readability on desktop and mobile viewport widths.
