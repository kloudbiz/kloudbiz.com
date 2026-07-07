# Kloudbiz — CLAUDE.md

## Project overview

Static website for Kloudbiz, a Melbourne-based digital studio offering websites, Google Business listings, Android/iOS apps, AI learning tools, and digital content. Hosted on GitHub Pages from the `main` branch.

## Repository layout

```
kloudbiz.com/
├── index.html          # Single-page site (all HTML, CSS, JS inline)
├── poster.html         # Shareable 4:5 WhatsApp poster (self-contained, fluid)
├── public/             # Static assets
│   └── kloudbiz-logo.svg   # Themeable vector wordmark (currentColor)
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

## Design system

All content created for Kloudbiz — pages, sections, posters, emails, assets — MUST be
**mobile-first** and follow this spec. Build for the smallest screen first, then layer
up enhancements with `min-width` media queries. Never let anything overflow the viewport
horizontally on a phone.

### Mobile-first rules

- Design and write CSS for narrow screens first; use `@media (min-width: …)` to scale up,
  not `max-width` to patch desktop down.
- Fluid by default: prefer `clamp()`, `%`, `min()/max()`, and `vw` over fixed `px` widths.
  Grids use `repeat(auto-fit, minmax(…, 1fr))` so they reflow on their own.
- Fixed-ratio graphics (posters, social cards) keep their composition and **scale as one
  unit** to fit the screen. Use a `container-type: inline-size` wrapper sized
  `width: min(<design-width>px, 100vw - margin)` and express every inner size in container
  units (`cqw`) so the whole layout scales proportionally. No JS, no overflow.
- Tap targets ≥ 44px; respect `prefers-reduced-motion`.

### Tokens (defined as CSS variables in `index.html`)

Theme via the `data-theme` attribute on `<body>`; **dark is the default**. Always read
colours from the variables, never hard-code hex in components.

| Token              | Light       | Dark        | Use |
|--------------------|-------------|-------------|-----|
| `--bg`             | `#f4f6fb`   | `#080b16`   | page background |
| `--bg-soft`        | `#eceffa`   | `#0e1326`   | alt background |
| `--surface`        | white .7    | white .052  | glass panel fill |
| `--surface-solid`  | `#ffffff`   | `#171f3a`   | solid cards, inputs, tiles |
| `--border`         | ink .1      | white .13   | hairline borders |
| `--ink`            | `#151a2e`   | `#f2f4fb`   | primary text |
| `--ink-soft`       | `#525a78`   | `#aeb6d6`   | secondary text |
| `--ink-faint`      | `#7b82a0`   | `#828dba`   | muted text |
| `--sky`            | `#3a5ad9`   | `#8aa4ff`   | **primary accent**, links |
| `--coral`          | `#ff6b57`   | `#ff9684`   | warm highlight (sparing) |
| `--sun`            | `#e8a93d`   | `#ffce6e`   | warm highlight (sparing) |
| `--wa-green`       | `#25D366` → `--wa-green-dark` `#149048` | WhatsApp CTAs |

In dark mode the page carries a soft multi-radial `--hero-glow` background, and `.glass`
panels get an `inset 0 1px 0 rgba(255,255,255,.06)` top-highlight for depth.

### Typography & aesthetic

- Fonts: **Space Grotesk** (headings), **Inter** (body/UI), **JetBrains Mono** (eyebrows).
- Frosted `.glass` surfaces, ~22px radius, pill buttons, subtle scroll-reveal.
- Accent strategy: anchor on `--sky`; use `--coral`/`--sun` only as occasional highlights.
  WhatsApp green is reserved for the primary "message us" CTA.
- Keep contrast at WCAG AA or better (verify against `--bg`).

### Voice

Short, professional, confident — written for business owners. **No em-dashes** in copy;
use commas, periods, or a middle dot (`·`).

## Internationalization (i18n)

The site is multilingual. **English is the default**, plus seven Indian languages:
**Marathi, Hindi, Punjabi, Gujarati, Tamil, Telugu, Malayalam**. A language picker sits
next to the theme toggle in the header; the choice is persisted in `localStorage`
(`kb-lang`) and applied on load.

**All primary, user-facing content MUST be provided in every one of these languages by
default.** When you add or change any visible copy, you are not done until its translation
exists in all eight languages.

How it works (all inline in `index.html`):

- Translatable text carries a `data-i18n="key"` attribute; the `I18N` object in the script
  holds one entry per `key` for every language. `applyLang(lang)` swaps `textContent` and
  sets `<html lang>`.
- If an element also contains an icon/SVG, wrap just the text in a `<span data-i18n>` so the
  icon is preserved (the script overwrites `textContent`).
- Strings shown only via JS (the service-picker summary, form status messages) are fetched
  with `t('key')`; add those keys too.

Rules for translations:

- **Accuracy first.** Translate meaning, not word-for-word, and keep it consistent across
  all languages. Every language must have the exact same set of keys (no missing/extra).
- Keep brand and common tech terms in English, as is natural in these languages: Kloudbiz,
  WhatsApp, Google, AI, iOS, iPhone, iPad, Android, Play Store, App Store, DNS, reCAPTCHA.
- Indic scripts render via the system font stack (`system-ui`); no extra web fonts are
  loaded, to keep the page fast.
- The outgoing WhatsApp message stays in English so the business reads every enquiry
  consistently, regardless of the visitor's chosen UI language.

## UX standards

### Typography
- Body: `'Inter', 'Noto Sans', system-ui, sans-serif`
- Headings: `'Space Grotesk'`
- Eyebrows/code: `'JetBrains Mono'`
- Indic languages: `:lang(hi/mr/gu/pa/ta/te/ml)` override to `'Noto Sans', system-ui`
- Noto Sans is loaded from Google Fonts alongside Inter for multilingual support

### Icons
- Lucide is the preferred icon library for all new icons
- Custom inline SVGs are acceptable for brand/social icons (WhatsApp, logo) not in Lucide
- Icons must always accompany a visible label or have a descriptive `aria-label`

### Forms
- No intrusive CAPTCHAs (no reCAPTCHA v2 image challenges)
- Prefer invisible bot protection; if needed use reCAPTCHA v3 or Cloudflare Turnstile
- Inline validation: show `.field.is-invalid` + `.field__error` on blur and submit
- `aria-live="polite"` on all status/error message regions
- `novalidate` on `<form>` to control validation UI ourselves

### Accessibility
- WCAG AA contrast minimum
- `focus-visible` outlines on all interactive elements (use `--sun` token)
- `aria-live="polite"` + `aria-atomic="true"` on dynamic status regions
- Every interactive icon-only element must have an `aria-label`

### Mobile-first
- Tap targets ≥ 44px
- Single-column form layouts on mobile
- Sticky CTA on mobile: icon-only circular pill when viewport < 600px

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

## Versioning

The site carries a visible version number in the footer (`<span class="site-version">` in `index.html`).

- Format: `vMAJOR.MINOR.PATCH` (e.g. `v1.0.4`)
- The **patch** number increments automatically on every `/commit` run
- **Minor** version: bump manually when a meaningful new feature ships
- **Major** version: bump manually for significant redesigns or rebrands
- The version appears in monospace, muted, after the copyright line
- The `/commit` command includes the new version in the commit subject line

## Workflow rules

- **Never commit or push automatically.** After making code or content changes, stop — do not run `/commit` on the user's behalf. The user will explicitly run `/commit` themselves when they are ready.
- Only commit when the user explicitly invokes the `/commit` skill in their message.

## Custom skills

| Command   | Description                                         |
|-----------|-----------------------------------------------------|
| `/commit` | Create a new branch, bump patch version, commit, and push to origin |
