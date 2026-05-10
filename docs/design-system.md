# Design system

> **Status: incomplete** — placeholder created on 2026-05-10 because the `design-system/` reference kits are load-bearing for new section work but had no entry in `docs/`. Fill in or delete.

## Known so far
- Homepage section components (`src/features/home/*`) port source only from `design-system/ui_kits/homepage/`. They do **not** reference `blog/`, `case_study/`, or other kits.
- The `design-system/` directory has restricted permissions (`drwx------`) on the working copy.
- `design-system/` is **not** in the Astro build graph — nothing is shipped from it; it is reference-only.
- UI kits live at `design-system/ui_kits/{homepage,case_study,blog,resume}/*.jsx` (JSX reference, not Astro components).

## Open questions
- Promotion timing: when (if ever) the `case_study`, `blog`, and `resume` kits get ported into `src/features/<route>/`.
- Whether the per-kit scoping rule (homepage components → homepage kit only) extends to future routes or is homepage-specific.
- Whether `design-system/` should be tracked, gitignored, or remain a permission-locked working-copy reference.
