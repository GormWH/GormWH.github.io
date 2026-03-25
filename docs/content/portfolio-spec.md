# Portfolio Spec

## Purpose

Define what this personal portfolio should communicate and how content should be structured.

## Required pages

### Home (`/`)
- concise positioning statement
- clear engineering focus
- links to proof (`/projects`) and contact (`/contact`)

### About (`/about`)
- background and transition story
- current engineering interests and strengths
- architecture/system-design perspective

### Projects (`/projects`)
- list all project entries from collection
- each entry links to detail page

### Project Detail (`/projects/{slug}`)
- title and publication date
- markdown body with context, approach, and outcomes

### Skills (`/skills`)
- categorized technical strengths and experience highlights

### Thinking (`/thinking`)
- concise essays/notes on engineering thinking and trade-offs

### Contact (`/contact`)
- current status and opportunity interests
- preferred communication channels

## Non-functional requirements

- Static generation only.
- Fast build and deploy on GitHub Pages.
- Build should validate project content schema.
- Writing should remain concise, concrete, and professional.
