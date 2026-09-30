# CLB Nghệ thuật — THPT Bảo Lộc

Bản production hiện tại: **v7.0.15**.

## Cấu trúc thư mục

```text
/
├── index.html              # Trang chính
├── legal.html              # Bản quyền & quyền riêng tư
├── robots.txt              # Crawler rules
├── sitemap.xml             # Sitemap cho Google
├── site.webmanifest        # PWA/browser metadata
├── favicon.ico             # Favicon fallback ở root
├── release.json            # Phiên bản production hiện tại
├── assets/                 # Toàn bộ hình ảnh/tài nguyên media
├── css/                    # CSS production
├── js/
│   ├── app.js              # Entrypoint chính
│   ├── core/               # Runtime, i18n, image helpers, build
│   ├── data/               # Nội dung CLB, bản dịch, image map
│   └── features/           # Gallery, Music, Raven, Intro, v.v.
└── docs/
    ├── releases/           # CHANGELOG duy nhất
    ├── maintenance/        # Performance + Security
    ├── legal/              # Rights + Third-party notices
    └── seo/                # Search display + keyword strategy
```

## Quy tắc để repo không bị tràn file

1. **Không tạo file vá/release mới ở root.** Ghi thay đổi vào `docs/releases/CHANGELOG.md`.
2. Nội dung CLB, họa sĩ, tác phẩm, playlist: sửa tại `js/data/content.js`.
3. Chuỗi giao diện VI/EN: sửa tại `js/data/translations.js`.
4. CSS mới phải đặt trong `css/`; JS tính năng mới đặt trong `js/features/`.
5. Ảnh mới phải đặt đúng nhóm trong `assets/`; không thả ảnh trực tiếp ở root.
6. Root chỉ dành cho các file GitHub Pages/crawler cần truy cập trực tiếp.
7. Khi tăng phiên bản, đồng bộ `release.json`, `js/core/build.js` và cache query `?v=`.

## Ghi chú

Bản v7.0.15 dùng **Atomic Play Sync**: nút Phát/Tạm dừng chỉ gửi lệnh cho Spotify; motor, đĩa và kim chỉ đổi trạng thái sau khi Spotify xác nhận playback thật. Vì vậy không còn trạng thái đĩa quay nhưng nhạc chưa phát. Bản này vẫn giữ Fast-Start của v7.0.13: preconnect Spotify từ `<head>`, khởi tạo Music sớm, warm một IFrame controller chính thức và preload album đang chọn trước khi đĩa lên mâm.

## PWA / Service Worker

- `sw.js` nằm ở root để có scope cho toàn bộ `/CLB/`.
- `js/core/pwa.js` chỉ đăng ký Service Worker; không chứa logic giao diện.
- Mỗi lần tăng version phải đổi `CACHE_VERSION` trong `sw.js` và query `?v=` của asset đang chạy.
- Không cache Spotify API/player; chỉ cache tài nguyên tĩnh của site và font Google khi trình duyệt thực sự tải chúng.

## Lịch sử Music gần đây

- **v7.0.15 — Atomic Play Sync:** Spotify là nguồn trạng thái duy nhất cho Play/Pause; motor không chạy optimistic.
- **v7.0.13 — Spotify Fast Audio Start:** tải API từ `<head>`, warm controller sớm và ưu tiên `play()`.
- **v7.0.12 — Spotify Audio Handshake:** bắt đầu yêu cầu xác nhận playback thật trước khi coi mâm là đang phát.
