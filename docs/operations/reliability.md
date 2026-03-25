# Reliability

Build and deployment reliability notes for `GormWH.github.io`.

## Pipeline

Workflow file: `.github/workflows/deploy.yml`

| Step | Tool |
|------|------|
| Trigger | Push to `main` / manual dispatch |
| Checkout | `actions/checkout@v5` |
| Build + upload | `withastro/action@v5` |
| Deploy | `actions/deploy-pages@v4` |

## Reliability characteristics

- Static output minimizes runtime failure modes.
- Build catches content schema issues in `projects/*.md`.
- Failed build does not remove the previous successful deployment.

## Recovery

- Build failure: fix and push again.
- Content schema error: update the failing markdown frontmatter/body.
- Full local reproduction:
  - `npm install`
  - `npm run build`

## Runtime dependencies

- Hosting availability depends on GitHub Pages.
- No server/database dependency in this architecture.
