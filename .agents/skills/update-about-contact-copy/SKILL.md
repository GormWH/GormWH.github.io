---
name: update-about-contact-copy
description: Keep About and Contact pages consistent with the current personal narrative.
---

# Update About and Contact Copy

Use this when profile messaging, role focus, or contact CTA changes.

## Scope

- `src/pages/about.astro`
- `src/pages/contact.astro`

## Steps

### 1. Define the narrative delta

Identify what changed:
- current role/focus
- target opportunities
- key strengths or priorities
- preferred contact channel

### 2. Update About page first

In `src/pages/about.astro`, keep this structure:
- background/context
- current engineering focus
- systems/design philosophy
- pointer to `Projects` as evidence

### 3. Align Contact page

In `src/pages/contact.astro`, ensure:
- role interest matches About page wording
- company/current status is up to date
- contact channels are current and intentional

### 4. Keep tone consistent

Guidelines:
- specific and concrete over generic claims
- no contradictory statements between About and Contact
- concise, professional, and human

### 5. Update docs if messaging model changed

If major narrative strategy changed, update:
- `docs/content/direction.md`
- `docs/content/portfolio-spec.md`

## Verification

Run:

```sh
npm run build
```

Then quickly read both pages side by side for consistency.
