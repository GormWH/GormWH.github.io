# Security

Security posture for a static personal portfolio site.

## Threat model

In scope:
- dependency supply chain risk
- CI/CD workflow misuse
- content integrity in repository changes
- client-side injection risk through authored markdown

Out of scope:
- auth/session vulnerabilities (no auth)
- server-side API vulnerabilities (no server runtime)
- database threats (no database)

## Current controls

- Minimal direct dependencies (`astro`, `tailwindcss`, `@tailwindcss/vite`).
- GitHub Actions workflow with scoped permissions for Pages deployment.
- Content schema validation via `src/content.config.ts`.
- Static generation reduces runtime attack surface.

## Recommended hygiene

1. Keep dependency updates regular.
2. Require PR review for `main` when collaborating.
3. Avoid embedding unnecessary third-party scripts.
4. Keep personal contact information intentional and reviewed.
