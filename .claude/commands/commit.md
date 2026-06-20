# /commit — Branch, commit, and push changes

Create a new git branch for the current changes, commit them with a meaningful message, and push to origin.

## Steps

1. **Check status** — run `git status` and `git diff` to understand what changed.
2. **Derive a branch name** from the nature of the changes (e.g. `feat/service-tile-ux`, `fix/form-validation`, `content/update-copy`). Use kebab-case, prefixed with `feat/`, `fix/`, `content/`, or `chore/`.
3. **Create and switch to the branch**: `git checkout -b <branch-name>`
4. **Stage relevant files**: add specific files by name — never `git add .` blindly; skip `.env` or any credential files.
5. **Write a commit message** that explains *why*, not just what. One concise subject line (≤72 chars), plus a body if the change is non-trivial. End with:
   ```
   Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
   ```
6. **Push** with `git push -u origin <branch-name>`.
7. **Report** the branch name and a link to open a PR on GitHub (`https://github.com/kloudbiz/kloudbiz.com/compare/<branch-name>`).

## Rules

- Never push directly to `main`.
- Never use `--no-verify` or `--force`.
- If there are no changes to commit, say so and stop.
- If the push fails due to auth, tell the user and stop — don't retry destructively.
