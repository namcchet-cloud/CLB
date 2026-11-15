# CLB Art Club - Poster Gallery Purple Edition v1.0.0

An optional ZZZ-inspired comic poster display mode for the existing Art Club Bao Loc High School website: https://github.com/namcchet-cloud/CLB

## What is included

- `css/poster-gallery.css`: scoped purple / lavender / ink / lime poster design.
- `js/features/poster-gallery.js`: gallery view toggle, full-size artwork viewer, navigation, swipe, i18n and synchronization with the existing filters.
- `install_into_clb.py`: repeat-safe installer that copies the two files into an existing CLB checkout and adds the HTML tags. It backs up the original index once.
- `demo/index.html` and `demo/images/`: offline visual test content only, NOT real club artwork.
- `docs/concept-purple.png`: design concept board.
- `docs/test-desktop.png`, `docs/test-mobile.png`, `docs/test-tablet.png`: screenshots of the running local demo, not the production website.

## Installation (recommended)

1. Download or clone https://github.com/namcchet-cloud/CLB into a local folder.
2. Unzip this patch package anywhere.
3. From the PATCH folder, run:

   ```bash
   python install_into_clb.py /path/to/CLB
   ```

   On Windows, use `py install_into_clb.py "C:\\path\\to\\CLB"`.

4. In the CLB repository folder, preview with `python -m http.server 8000`.
5. Open `http://localhost:8000/?gallery=poster#gallery`.
6. Verify the page, then commit/upload these THREE files:
   - `index.html`
   - `css/poster-gallery.css`
   - `js/features/poster-gallery.js`

If pushing via git:

```bash
git add index.html css/poster-gallery.css js/features/poster-gallery.js
git commit -m "feat: add purple poster gallery mode"
git push origin main
```

If you prefer a safe review workflow, create a new feature branch and open a pull request instead of pushing directly to main.

## Installation on the GitHub website (without Python)

Upload `css/poster-gallery.css` and `js/features/poster-gallery.js` at those exact paths in your repository.

Add this line immediately before `</head>` in `index.html`:

```html
<link rel="stylesheet" href="css/poster-gallery.css?v=1.0.0">
```

Add this line immediately before `</body>`:

```html
<script type="module" src="js/features/poster-gallery.js?v=1.0.0"></script>
```

The deployed link will be:
https://namcchet-cloud.github.io/CLB/?gallery=poster#gallery

## Testing the standalone demo

From the patch root:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/demo/`, then click **Poster Mode**. All demo illustration SVGs are placeholders and must NOT replace the existing gallery's images. The production mode reads the actual artwork paths, artist names, titles and captions from `window.CLUB_CONTENT`.

## Safety and compatibility

- Does NOT edit `js/features/gallery.js`, `js/data/content.js`, mascot effects, music section, existing global palette, service worker or other features.
- Does NOT recolor, crop, or modify the actual artworks. The artwork frame is styled, but the displayed full-size image always uses `object-fit: contain`.
- Works with the site's existing artist and category filters, language switch, and reduced-motion setting.
- The original gallery view remains the default for new visitors, with the selected view remembered in localStorage when available.
- Requires no npm build or JavaScript framework. Works as a static GitHub Pages site.
- The existing PWA may need an online visit to cache the new assets on devices where it was already installed.
- Headless local demo tests passed on desktop, tablet and mobile; this package has not been deployed or tested on live GitHub Pages.

Version 1.0.0 | 2026-11-15
