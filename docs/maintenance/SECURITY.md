# Security

This is a static GitHub Pages site. It must not contain passwords, private API keys, access tokens, student records, or payment data.

Report a security or privacy issue to: artclub287@gmail.com

## Repository hygiene
- Keep `.env`, private exports, raw submissions, and artwork masters out of the public repository.
- Use only HTTPS third-party resources.
- Review Content Security Policy changes when adding new external services.
- Keep public artwork copies separate from private/high-resolution masters.


## Spotify Embed / IFrame API

Spotify được tải từ miền chính thức `open.spotify.com` và các host Spotify CDN được CSP cho phép. Nếu controller IFrame API không sẵn sàng, website chỉ fallback sang iframe Embed chính thức; không tự proxy âm thanh, không lưu token và không dùng access token Spotify. Thuộc tính `allow` của fallback giữ `encrypted-media` để tránh chỉ phát preview do thiếu quyền media.
