# Search display hotfix — v6.9.0

This patch does not change the UI, animation, gallery, music or Raven features.

What changed:
- Search title shortened to `CLB Nghệ thuật THPT Bảo Lộc`.
- Search description rewritten to a concise official-site description.
- `/CLB/` structured data is now page/organization data and points to the hostname-level WebSite identity instead of incorrectly trying to define a separate site name for a subdirectory.
- Favicon references are absolute and stable.
- Home sitemap `lastmod` updated to 2026-09-23.

Important:
Google Search site names and favicons are hostname-level features. `https://namcchet-cloud.github.io/CLB/` is a subdirectory, so this patch alone cannot force the top line of Google results to stop using the hostname identity. Use the separate `CLB-GITHUB-ROOT-SEARCH-IDENTITY.zip` package on the repository named exactly `namcchet-cloud.github.io` to provide the hostname-level identity without changing the `/CLB/` URL.
