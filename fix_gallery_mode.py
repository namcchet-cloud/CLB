#!/usr/bin/env python3
"""Repair the CLB Art Gallery Purple/ZZZ mode activation.

Usage: python fix_gallery_mode.py /path/to/CLB
Works with Python 3.8+. No dependencies.
The CSS and JS assets must already exist inside the GitHub repository.
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

VERSION = '1.0.1'
CSS = f'<link rel="stylesheet" href="css/poster-gallery.css?v={VERSION}">'
JS = f'<script type="module" src="js/features/poster-gallery.js?v={VERSION}"></script>'


def patch(target: Path) -> bool:
    index = target / 'index.html'
    css_file = target / 'css/poster-gallery.css'
    js_file = target / 'js/features/poster-gallery.js'
    for file in (index, css_file, js_file):
        if not file.is_file():
            raise FileNotFoundError(f'Missing required file: {file}')
    original = index.read_text(encoding='utf-8')
    for marker in ('id="gallery"', 'id="galleryGrid"', 'js/data/content.js', '</head>', '</body>'):
        if marker not in original:
            raise ValueError(f'Cannot safely patch index.html: missing marker {marker}')
    changed = original
    css_pattern = r'<link\b[^>]*href=["\']css/poster-gallery\.css(?:\?[^"\']*)?["\'][^>]*>'
    js_pattern = r'<script\b[^>]*src=["\']js/features/poster-gallery\.js(?:\?[^"\']*)?["\'][^>]*>\s*</script>'
    if re.search(css_pattern, changed, flags=re.IGNORECASE):
        changed = re.sub(css_pattern, CSS, changed, count=1, flags=re.IGNORECASE)
    else:
        changed = changed.replace('</head>', CSS + '\n</head>', 1)
    if re.search(js_pattern, changed, flags=re.IGNORECASE):
        changed = re.sub(js_pattern, JS, changed, count=1, flags=re.IGNORECASE)
    else:
        changed = changed.replace('</body>', JS + '\n</body>', 1)
    if changed == original:
        print('Already repaired: index.html unchanged.')
        return False
    backup = target / 'index.html.before-zzz-mode.bak'
    if not backup.exists():
        backup.write_text(original, encoding='utf-8')
    index.write_text(changed, encoding='utf-8')
    print('SUCCESS: updated index.html and kept backup at', backup)
    print('Commit only the modified index.html to GitHub Pages.')
    print('Test: https://namcchet-cloud.github.io/CLB/?gallery=poster#gallery')
    return True


if __name__ == '__main__':
    repo = Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve()
    try:
        patch(repo)
    except (ValueError, FileNotFoundError) as error:
        print('ERROR:', error, file=sys.stderr)
        raise SystemExit(1)
