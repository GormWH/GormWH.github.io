# Commit messages

## Summary line

- One line, max ~70 chars.
- Use a conventional-commits prefix for source code changes: `feat`, `chore`, `refactor`, `fix`, `docs`, etc.
- Sentence case in the body is fine.

## Body (optional)

- Max **5 lines**, wrapped near 72 chars per line.
- Explain *why* the change exists, not what the diff shows.

## Hard rules

- **No AI / tooling attribution.** Do NOT add `Co-Authored-By: Claude …` or any agent / AI byline. The git author is the human contributor.
- **No internal planning-artifact references.** Do NOT mention `.omc/plans/…`, agent transcripts, or workflow internals (ralph, ralplan, etc.) in commit messages.

## Merges

For `--no-ff` merges, the merge message follows the same rule — usually one line is enough.
