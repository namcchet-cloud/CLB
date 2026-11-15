# ART CLUB / ZZZ-STYLE EDITORIAL MODE - V6.0

This package implements the approved CREAM + LOGO GREEN + ORANGE art direction.
The club's existing logo file, art collection, animations, music, language system,
classic UI, gallery and other controllers are preserved. No newly drawn mascot.

## Deploy the FULL WEBSITE archive
1. Download and extract CLB-ART-MANUAL-V6-FULL-WEBSITE.zip.
2. Copy the CONTENTS of the extracted archive into the root of namcchet-cloud/CLB.
   Do NOT upload the .zip file itself as a GitHub Pages website.
3. Commit to your deployment branch (normally main), or test in a separate branch first.
4. Wait for GitHub Pages to finish deploying and open:
   https://namcchet-cloud.github.io/CLB/?mode=zzz
5. To return to the current classic interface, use the mode switch in the header.

## Deploy the SMALL PATCH instead
Use CLB-ART-MANUAL-V6-PATCH.zip only when your current repository already
contains the V5.3 sitewide dependencies from the previous delivery.
Copy only its files over the matching paths, commit, then check the URL above.
If present, remove these two superseded, unreferenced files to avoid clutter:
- css/zzz-art-direction-v5.css
- js/features/zzz-art-direction-v5.js

## What's new
- A site-wide mode, not a separate gallery website.
- Fox club emblem is sourced directly from assets/optimized/logo-new-640-db642e82.webp.
  The ZZZ mode only clips whitespace outside the circular image boundary.
- The manual-style ART CLUB SVG lettering includes a new star counter.
- The separate Vietnamese lettering uses the existing subtitle-clb.svg.
- Hero background is an open green field, not a teal rectangular frame.
- Orange art-and-creative stamp, orange rays and cover ID label.
- Five navigation destinations remain only in the top navigation, with a shared
  hover/tap preview panel. No repeated row of navigation cards below the hero.
- The first row below the hero displays real club artworks from CLUB_CONTENT.
- Other chapters use the same cream / green / black / orange visual language.
- Classic modules remain unchanged. CSS is scoped to html[data-clb-mode="zzz"].
- New PWA cache ID forces the changed ZZZ assets to refresh.

## Notes
The offline preview HTML is a standalone VISUAL/INTERACTION preview; it is NOT a
replacement for the complete website. Spotify playback and PWA should be checked
on the deployed HTTPS site because they require the live browser environment.
The archive has not been pushed to your GitHub account automatically.
