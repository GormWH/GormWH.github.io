---
name: add-page
description: Add a new portfolio page route using the current BaseLayout pattern.
---

# Add a New Page

Use this when adding a new static page in `src/pages/`.

## Steps

### 1. Create the route file

Create `src/pages/{name}.astro`:

```astro
---
import BaseLayout from "@layouts/BaseLayout.astro";
---

<BaseLayout pageTitle="Page Title">
  <article id="{name}" class="p-4">
    <header class="text-2xl">Page Heading</header>
    <p>Page content...</p>
  </article>
</BaseLayout>
```

### 2. Update navigation if this page should be visible

Edit `src/components/Header.astro` and add a link:

```astro
<li><a href="/{name}">Label</a></li>
```

### 3. Keep page objective aligned

Make sure the page helps one of these portfolio goals:
- clarify personal profile and strengths
- improve project evidence and storytelling
- provide clear contact/conversion path

### 4. Update docs

- Add route to `docs/generated/route-map.md`
- If this changes architecture decisions, update `docs/decisions/routing.md`
- If this adds a recurring pattern, update `docs/guides/frontend.md`

## Verification

Run:

```sh
npm run build
```

Confirm build succeeds and the new route is generated.
