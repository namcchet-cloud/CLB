# Kiến trúc v3.0.0

## Mục tiêu
Tách các phần dễ sửa ra khỏi bundle lớn để tránh vá chồng CSS/JS.

## File chính
- `index.html` — cấu trúc trang và các section.
- `content.js` — dữ liệu tác phẩm, tác giả, album, liên kết Spotify.
- `style.css` — giao diện chung và các hiệu ứng đã có.
- `script.js` — i18n, gallery, menu, motion, Haruko/Akiko.
- `music.css` — CHỈ giao diện Góc âm nhạc v3.
- `js/music-v3.js` — CHỈ logic album, kéo đĩa, mâm và Spotify.

## Quy tắc sửa tiếp
1. Thay tên/ảnh/link album: chỉ sửa `content.js`.
2. Sửa bố cục Góc âm nhạc: chỉ sửa `music.css`.
3. Sửa thao tác kéo/hút/phát đĩa: chỉ sửa `js/music-v3.js`.
4. Không tạo thêm CSS override kiểu `v2.x HOTFIX` ở cuối `style.css`.
5. Khi tăng phiên bản, đổi cache key ở `index.html` cùng lúc với `window.ClubBuild`.

## State machine của đĩa
- `IN_SLEEVE`: đĩa ở album.
- `DRAGGING`: chính đĩa đó được kéo bằng pointer.
- `ON_TURNTABLE`: đĩa đã snap vào tâm mâm.
- `RETURNING`: đĩa cũ đang trả về album khi đổi đĩa.
