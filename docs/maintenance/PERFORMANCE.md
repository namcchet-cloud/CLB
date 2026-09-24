# CLB v6.9.0 — Performance Preserve Visuals

This release intentionally keeps the current visual design, interactions and feature set unchanged.

- Intro choreography is unchanged, but the whole timeline runs at 58% of the former duration.
- Music styling remains eagerly loaded to guarantee identical layout during anchor jumps and very fast scrolling.
- `effects.css` is loaded by the gallery feature near the exhibition section instead of in the critical head.
- Lightbox images use existing 560/1200 responsive web variants according to the viewport instead of always forcing the 1200 copy.
- Raven's geometry payload moved from a 2 MB JavaScript module to same-origin JSON loaded only when Raven initializes. Geometry bytes/base64 strings and animation math are unchanged.
- Intro images now declare intrinsic dimensions and high fetch priority.
- Build/cache version synchronized to 6.9.0.

No artwork, album, interaction, gallery layout, music behavior, Raven motion sequence, or comic decoration was removed.


## Service Worker (v7.0.8)

Service Worker dùng cache có version (`clb-v7.0.8`). Tài nguyên CSS/JS/logo cốt lõi được làm ấm sau lần truy cập đầu; Google Fonts được cache khi trình duyệt yêu cầu. Navigation ưu tiên network và chỉ fallback cache khi offline. Spotify, mesh Raven và toàn bộ gallery không bị pre-cache hàng loạt để không tăng chi phí lần tải đầu.
