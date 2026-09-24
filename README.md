# CLB Nghệ thuật — THPT Bảo Lộc

Bản production hiện tại: **v7.0.6**.

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

Bản v7.0.6 chỉ sắp xếp lại source để dễ bảo trì. Không thay đổi giao diện hay tính năng so với v7.0.5.
