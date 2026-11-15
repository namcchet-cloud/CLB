#!/usr/bin/env python3
"""Idempotently add the purple poster mode to an existing CLB checkout.

Run from this package's directory with the repository path as argument:
    python install_into_clb.py /path/to/CLB
Or copy this package's css/ and js/ into CLB and run from its root:
    python install_into_clb.py .
"""
from __future__ import annotations
import shutil
import sys
from pathlib import Path

CSS = '<link rel="stylesheet" href="css/poster-gallery.css?v=1.0.0" />'
JS = '<script type="module" src="js/features/poster-gallery.js?v=1.0.0"></script>'

def main() -> int:
    package = Path(__file__).resolve().parent
    target = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path.cwd().resolve()
    index = target / 'index.html'
    if not index.is_file():
        print('ERROR: index.html not found in target repository:', target)
        return 2
    html = index.read_text(encoding='utf-8')
    required = ['id="gallery"', 'id="galleryGrid"', 'id="artistSwitcher"', 'js/data/content.js']
    missing = [item for item in required if item not in html]
    if missing:
        print('ERROR: This is not the expected CLB site. Missing:', ', '.join(missing))
        return 3
    if '</head>' not in html or '</body>' not in html:
        print('ERROR: Cannot find standard </head> or </body> integration points.')
        return 4
    sources = {
        package / 'css' / 'poster-gallery.css': target / 'css' / 'poster-gallery.css',
        package / 'js' / 'features' / 'poster-gallery.js': target / 'js' / 'features' / 'poster-gallery.js',
    }
    for source in sources:
        if not source.exists():
            print('ERROR: Patch is incomplete:', source)
            return 5
    for source, destination in sources.items():
        destination.parent.mkdir(parents=True, exist_ok=True)
        if source != destination:
            shutil.copy2(source, destination)
            print('Copied:', destination.relative_to(target))
    updated = html
    if 'css/poster-gallery.css' not in updated:
        updated = updated.replace('</head>', CSS + '\n</head>', 1)
    if 'js/features/poster-gallery.js' not in updated:
        updated = updated.replace('</body>', JS + '\n</body>', 1)
    if updated != html:
        backup = target / 'index.html.before-poster-gallery.bak'
        if not backup.exists():
            shutil.copy2(index, backup)
        index.write_text(updated, encoding='utf-8')
        print('Updated index.html (backup:', backup.name + ')')
    else:
        print('index.html is already patched; no duplicate tags added.')
    print('SUCCESS: open the site at ?gallery=poster#gallery to preview.')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
