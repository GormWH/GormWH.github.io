# Portfolio Spec

## Purpose

Define what this personal portfolio should communicate and how content should be structured.

## Required pages

### Home (`/{locale}/`)
- concise positioning statement
- clear engineering focus
- links to proof (`/{locale}/projects`) and contact (`/{locale}/contact`)
- localized page copy for `ja` and `ko` via translation dictionary keys

### About (`/{locale}/about`)
- background and transition story
- current engineering interests and strengths
- architecture/system-design perspective

### Projects (`/{locale}/projects`)
- list all project entries from collection
- each entry links to detail page

### Project Detail (`/{locale}/projects/{slug}`)
- title and publication date
- markdown body with context, approach, and outcomes

### Skills (`/{locale}/skills`)
- categorized technical strengths and experience highlights

### Contact (`/{locale}/contact`)
- current status and opportunity interests
- preferred communication channels

## Non-functional requirements

- Static generation only.
- Fast build and deploy on GitHub Pages.
- Build should validate project content schema.
- Writing should remain concise, concrete, and professional.
- Footer heading `Open to opportunities` remains in English across locales, while supporting footer text is localized.
