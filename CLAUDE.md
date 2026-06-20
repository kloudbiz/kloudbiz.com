# Kloudbiz — CLAUDE.md

## Project overview

Static website for Kloudbiz, a Melbourne-based digital studio offering websites, Google Business listings, Android/iOS apps, AI learning tools, and digital content. Hosted on GitHub Pages from the `main` branch.

## Repository layout

```
kloudbiz.com/
├── index.html          # Single-page site (all HTML, CSS, JS inline)
├── tasks/              # Task files — one per task, markdown format
│   └── 1.md            # Completed tasks logged here
└── .claude/
    └── commands/
        └── commit.md   # /commit slash command — branch, commit, push
```

## Key facts

- Single-file site: all styles and scripts are inline in `index.html`
- WhatsApp number: `61414491510` (international format for `wa.me` links)
- Dark theme is the default (`data-theme="dark"` on `<body>`)
- No build step, no dependencies, no package.json — edit `index.html` directly

## Deployment

Pushes to `main` are automatically deployed via the GitHub Actions workflow (`.github/workflows/`). Allow ~30 seconds after push for the live site to update.

## Tasks

All tasks are stored in the `tasks/` folder. Each file is named by number (`1.md`, `2.md`, …).

After completing a task, mark it with a status line and summary at the top of the file:

```
STATUS: COMPLETE
SUMMARY: <one or two sentences describing what changed>
---
<original task content below>
```

## Custom skills

| Command   | Description                                         |
|-----------|-----------------------------------------------------|
| `/commit` | Create a new branch, commit staged changes, and push to origin |
