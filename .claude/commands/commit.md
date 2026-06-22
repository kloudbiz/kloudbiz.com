# /commit — Branch, commit, and push changes

Create a new git branch for the current changes, commit them with a meaningful message, and push to origin.

## Steps

1. **Check status** — run `git status` and `git diff` to understand what changed.
2. **Bump the version** — read the current version from the `<span class="site-version">` in `index.html`, increment the patch number by 1, and write it back. Then stage `index.html` (it will be staged along with any other changes).
   - Parse with: `grep -o 'v[0-9]*\.[0-9]*\.[0-9]*' index.html | head -1`
   - Write back with a `python3` or `sed` one-liner.
   - If `index.html` is not among the changed files, still bump and stage it.
3. **Derive a branch name** from the nature of the changes (e.g. `feat/service-tile-ux`, `fix/form-validation`, `content/update-copy`). Use kebab-case, prefixed with `feat/`, `fix/`, `content/`, or `chore/`.
4. **Create and switch to the branch**: `git checkout -b <branch-name>`
5. **Stage relevant files**: add specific files by name — never `git add .` blindly; skip `.env` or any credential files.
6. **Write a commit message** that explains *why*, not just what. One concise subject line (≤72 chars), plus a body if the change is non-trivial. Include the new version number in the subject line, e.g. `feat: add FAQ section (v1.0.4)`. End with:
   ```
   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   ```
7. **Push** with `git push -u origin <branch-name>`.
8. **Report** the branch name, the new version number, and a link to open a PR on GitHub (`https://github.com/kloudbiz/kloudbiz.com/compare/<branch-name>`).

## Rules

- Never push directly to `main`.
- Never use `--no-verify` or `--force`.
- Always bump the patch version on every commit, no exceptions.
- If there are no changes to commit (other than the version bump itself), say so and stop — do not commit a version bump alone.
- If the push fails due to auth, tell the user and stop — don't retry destructively.
