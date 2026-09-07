# ART CLUB — THPT Bảo Lộc

Website giới thiệu CLB Nghệ thuật, tối ưu cho PC / tablet / mobile.

## Cấu trúc

- `index.html` — nội dung website
- `style.css` — giao diện và responsive
- `script.js` — menu, gallery, filter, lightbox
- `assets/logo.jpg` — logo CLB
- `gallery/` — nơi lưu tranh / ảnh

## Đăng website bằng GitHub Pages

1. Tạo repository trên GitHub và để `Public`.
2. Upload toàn bộ các file/thư mục trong project.
3. Vào `Settings` → `Pages`.
4. Chọn `Deploy from a branch`.
5. Branch: `main`, Folder: `/ (root)`.
6. Save và chờ GitHub Pages triển khai.

## Thêm tác phẩm

1. Upload ảnh vào đúng thư mục:
   - `gallery/paintings/`
   - `gallery/digital-art/`
   - `gallery/photography/`
   - `gallery/events/`
2. Mở `script.js`.
3. Tìm `const artworks = [`.
4. Thêm một object, ví dụ:

{
  image: "gallery/paintings/tranh-01.jpg",
  category: "paintings",
  title: "Mùa hạ",
  author: "Nguyễn A",
  description: "Acrylic • 2026"
}

5. Commit changes.

## Thêm Spotify

Trong `index.html`, tìm phần `spotify-placeholder`.
Lấy mã Embed từ Spotify rồi thay placeholder bằng iframe Spotify.

## Đổi link tuyển thành viên

Trong `index.html`, tìm nút `Đăng ký tham gia` và thay `href="#"` bằng link Google Form.

## Thông tin liên hệ đã cài

- Trường THPT Bảo Lộc — Cơ sở 1
- artclub287@gmail.com
- Facebook: https://www.facebook.com/share/19B7YQZiLG/?mibextid=wwXIfr
