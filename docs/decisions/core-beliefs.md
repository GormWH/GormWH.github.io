# Core Beliefs

Operating principles for humans and agents working in this repository.

## 1. Portfolio outcomes over feature count

The site should improve credibility and clarity, not just add pages. Changes should make profile, project evidence, or contact intent stronger.

## 2. Projects are the proof

`projects/*.md` entries are the most important content assets. They should explain context, constraints, architecture choices, and outcomes.

## 3. Keep architecture simple and explicit

Use static Astro pages and content collections. Avoid unnecessary abstractions unless duplication or risk clearly warrants them.

## 4. Schema is a contract

`src/content.config.ts` defines required project fields. If schema changes, update all affected markdown content together.

## 5. Maintainability beats novelty

Prefer patterns that are easy to extend by future contributors or agents. Keep dependencies and complexity low.

## 6. Documentation is the source of truth

If a workflow or decision matters repeatedly, write it in `docs/` and keep it aligned with code.
