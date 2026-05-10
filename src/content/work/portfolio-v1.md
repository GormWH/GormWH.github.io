---
title: "Portfolio v1 — Astro on GitHub Pages"
description: "v1 of this site. Three days from blank repo to deploy on GitHub Pages, with Claude as design partner and PreToolUse guardrails for the collaboration."
date: 2026-05-09
org: "Personal"
tags: ["Astro", "TypeScript", "GitHub Pages"]
important: true
---

- **Design → deploy:** 3 days (2026-05-06 → 2026-05-09)
- **Commits to v1:** 22
- **CD:** GitHub Actions (`.github/workflows/deploy.yml`, push to `main` ships)
- **Content:** Markdown collections (`work`, `writing`) validated by Zod at build time

This is the post about the site that's hosting it. v1 is an Astro site on GitHub Pages, designed with Claude as an iterative partner and shipped with a small set of guardrails so the AI collaboration didn't drift off-system. Below — why I started, why this stack, how I designed it, how I built it.

## Why I started

I needed a surface that actively demonstrates me — not a flattened LinkedIn template, not a static résumé. My path runs across mechanical engineering (B.S. Osaka, M.S. U-Tokyo CFD research), two years as a signaller in the ROK Army, and now software at Bitset. That shape doesn't fit a stock template; it needs an information architecture I control. Shipping v1 was also a forcing function for actually learning the modern static-site stack by putting it in production.

## Why Astro and GitHub Pages

Astro fits a portfolio because it's content-first and ships near-zero JavaScript by default. Three things sealed it for me:

- **Content collections with Zod schemas.** Adding a new project or note is one Markdown file. The schema catches bad dates and missing fields at build time, not at runtime in the browser.
- **Tailwind v4 with no `tailwind.config.*`.** Design tokens live in `@theme` inside `src/styles/global.css`. One stylesheet defines the tokens and generates the utilities. No JS config plumbing to keep in sync.
- **React on tap, not by default.** I can drop a React island into any page when something genuinely needs interactivity, but the cost is opt-in.

GitHub Pages was the deployment target for two reasons. The first is the obvious one — free, no DNS or hosting bill, deploys from `main` via Actions. The second is that most of the work I want this site to point to already lives on GitHub. Co-locating the portfolio with the work it describes felt right.

## How I designed it

I used Claude as a design partner across multiple iterations — Claude proposed UI kits, I critiqued, repeat. The guardrail that kept this from going sideways was a delivery rule: tokens first, visuals second. Claude would deliver only the design tokens — color, type scale, spacing, radii, motion — and I'd land those in `theme.css` before any single kit was imported. Then visuals were applied as compositions of tokens, not as opaque blocks of CSS. I never got locked into one visual proposal; I could swap a kit out and the site stayed coherent because the system underneath was already mine.

## How I implemented it

The implementation story I want to tell isn't about Astro idioms — it's about the AI-collaboration guardrails that made the stack productive. Two of them did most of the work.

A **PreToolUse hook** (`.claude/hooks/block-build-artifacts.py`) refuses any `Edit` / `Write` / `MultiEdit` whose target path contains `dist` or `.astro` as a path segment. Claude can't accidentally edit a build artifact and convince itself it's fixing source. The hook is short and removes a whole category of confused-state bug.

A **read-only reviewer subagent** (`@astro-tailwind-reviewer`) enforces the rules I care about — Tailwind v4 token discipline, no raw hex when a token exists, the `gh-*` versus `hp-*` class split, the feature-folder convention. It runs after any `.astro` or `global.css` edit. Because the agent is read-only, it can't drift the codebase; it can only tell me when I have.

The pattern generalizes. The system underneath the AI is mine; the AI moves fast inside it.
