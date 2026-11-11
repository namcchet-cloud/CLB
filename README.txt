CLB ART CLUB - GOOGLE FAVICON / SEARCH PATCH

Source inspected: namcchet-cloud/CLB, branch main, 2026-11-11.
IMPORTANT: This is an application overlay for an EXISTING full CLB repository, not a standalone copy of all website files.
It intentionally does NOT replace CSS, JS, gallery, animations, or other pages.

HOW TO APPLY (Windows / macOS / Linux):
1. Download ZIP of your entire CLB repository from GitHub > Code > Download ZIP.
2. Extract that repository to a folder.
3. Extract this package anywhere.
4. Run: python apply_patch.py "/path/to/CLB-main"
   Full cleanup package: python apply_patch.py "/path/to/CLB-main" --full
5. Run: python audit.py "/path/to/CLB-main"
6. Upload ONLY the changed index.html and (if changed) site.webmanifest to your CLB repository.
7. Check deployed URL and use Google Search Console > URL inspection > Request indexing.

FOR GOOGLE ICON: Google Search favicon is per HOSTNAME, so /CLB/ and root URL share a host icon.
To have the CLB logo appear for results hosted at namcchet-cloud.github.io, root hostname must serve a favicon as well. If root is another website, do NOT silently relabel it as the CLB. See ROOT_HOST_NOTE.txt.

SAFEGUARDS:
- The script backups each touched source file in a timestamped subfolder.
- Existing image assets are reused, not regenerated.
- Full cleanup is scoped to SEO head and site manifest, NOT arbitrary CSS/JS overrides.
- Re-running should not create duplicate favicon or canonical tags.
- Other repositories (such as Chạm Mây) are never touched.
