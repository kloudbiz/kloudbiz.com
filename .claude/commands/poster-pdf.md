# /poster-pdf — Export a poster HTML file to PDF

Render one of the files in `posters/` to a print-accurate PDF, using a real Chromium
engine (not a screenshot) so gradients, fonts, and the container-query (`cqw`) scaling
all come out exactly as they'd print from a browser's own print dialog.

## Arguments

`$ARGUMENTS` may contain, in any order:
- **A file**: a path or bare filename under `posters/` (e.g. `aijoeys-poster` or
  `posters/aijoeys-poster.html`). If omitted and only one `.html` file exists in
  `posters/`, use that one. If more than one exists and none is named, list them and
  ask which to export.
- **A size**: one of `a4` (default), `a5`, `b6`. `b6` means ISO 216 B6 (125×176mm);
  if the user says "JIS B6" use 128×182mm instead.

Examples: `/poster-pdf`, `/poster-pdf aijoeys-poster`, `/poster-pdf aijoeys-poster a5`.

## Steps

1. **Resolve the input file** per the rules above. Confirm it exists with `Read` or `ls`
   before proceeding.
2. **Resolve the paper size** to a width/height in mm:
   - `a4` → 210×297
   - `a5` → 148×210
   - `b6` → 125×176
3. **Set up a throwaway export environment** (kept outside the repo — this project has
   no `package.json`/`node_modules` and that must stay true after this command runs):
   ```bash
   CACHE=~/.cache/kloudbiz-poster-pdf
   mkdir -p "$CACHE"
   if [ ! -d "$CACHE/node_modules/playwright" ]; then
     (cd "$CACHE" && npm init -y >/dev/null 2>&1 && npm install playwright --no-save --silent)
   fi
   if [ ! -d "$CACHE/node_modules/playwright-core/.local-browsers" ]; then
     (cd "$CACHE" && npx playwright install chromium)
   fi
   ```
   This installs once (~100MB) and is reused on every future run — don't reinstall if
   the checks above show it's already there.
4. **Write the export script** to `$CACHE/export.js` (overwrite each run, it's tiny):
   ```js
   const { chromium } = require('playwright');
   const path = require('path');

   const [, , inputPath, wmm, hmm, outputPath] = process.argv;

   (async () => {
     const browser = await chromium.launch();
     const page = await browser.newPage();
     await page.goto('file://' + path.resolve(inputPath));
     await page.emulateMedia({ media: 'print' });
     await page.pdf({
       path: outputPath,
       printBackground: true,
       width: `${wmm}mm`,
       height: `${hmm}mm`,
       margin: { top: 0, bottom: 0, left: 0, right: 0 },
       pageRanges: '',
     });
     await browser.close();
   })();
   ```
5. **Run it**:
   ```bash
   CACHE=~/.cache/kloudbiz-poster-pdf
   node "$CACHE/export.js" "<resolved-input-path>" <width-mm> <height-mm> "<output-path>"
   ```
   Output path: same directory as the source file, same basename, `.pdf` extension. If
   the size isn't `a4`, suffix the basename with the size, e.g. `aijoeys-poster-a5.pdf`,
   so different exports don't clobber each other.
6. **Verify the result** before reporting success — don't just trust exit code 0:
   ```bash
   python3 -c "
   import re
   data = open('<output-path>', 'rb').read()
   pages = re.findall(rb'/Type\s*/Page[^s]', data)
   print('pages:', len(pages))
   print('mediabox:', re.findall(rb'/MediaBox\s*\[[^\]]*\]', data)[:1])
   "
   ```
   Confirm the page count matches the number of `.stage` elements in the source HTML
   (2 for the current AIJoeys poster) and the MediaBox matches the requested size
   (mm → pt via `mm * 72 / 25.4`).
7. **Report** the output file's path and the verified page count/size to the user.

## Notes

- Every poster in `posters/` uses `aspect-ratio: 210 / 297` on `.poster`, the same
  1:√2 ratio shared by every ISO A- and B-series sheet, so `a4`/`a5`/`b6` all render
  edge-to-edge with no clipping or added margins (ISO B6 has a sub-1mm rounding
  difference vs. A4/A5 — inherent to that paper standard, not a bug).
- If a poster's HTML ever hardcodes `@page{size:...}` or a fixed `.stage{width:...mm}`
  again, the size argument here will stop working correctly for anything but that
  hardcoded size — the poster's print CSS is expected to stay size-agnostic
  (`.stage{width:100%}` in `@media print`, no `@page size`).
- This command does not modify the repo. `$CACHE` lives under the user's home
  directory, never inside the project, so `git status` stays clean.
