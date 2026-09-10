# CLB Nghệ thuật — THPT Bảo Lộc · v3.0.0

Bản FULL sạch để thay toàn bộ repository GitHub Pages.

## Cấu trúc
- `index.html`: giao diện trang
- `style.css`: style chung hiện tại
- `music.css`: Góc âm nhạc v3, tách riêng hoàn toàn
- `content.js`: nội dung, tác giả, tác phẩm, playlist
- `script.js`: điều hướng, i18n, gallery, motion, hiệu ứng
- `js/music-v3.js`: state machine album/đĩa/Spotify
- `assets/`: toàn bộ ảnh

## Góc âm nhạc v3
Không dùng lại DOM/CSS/JS của album 2.7.x. Mỗi album có một bìa và một đĩa độc lập. Đĩa vật lý là cùng một DOM element từ trong bìa -> kéo -> mâm -> quay về bìa. State: `IN_SLEEVE -> DRAGGING -> ON_TURNTABLE -> RETURNING`.

## Cập nhật GitHub
1. Sao lưu repository hiện tại nếu muốn.
2. Xóa các file cũ trong repo.
3. Upload **toàn bộ nội dung bên trong thư mục này** vào root của repo.
4. Không upload thêm các file `site/`, `js/player.js`, `js/turntable.js`, `lyrics/`, hoặc các HUONG-DAN phiên bản cũ.
5. Commit một lần và chờ GitHub Pages deploy.
