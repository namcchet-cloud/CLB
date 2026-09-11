# CLB Nghệ thuật — v4.0.0

Bản FULL này được dựng từ `CLB-main (2).zip` cậu gửi. Giữ nội dung, tranh gốc, tác giả, hai playlist, phong cách comic và hình học của máy/cần kim. V4 thay nền code và cách tải, không thay bộ tranh bằng ảnh concept.

## Cập nhật GitHub Pages

1. Sao lưu repository hiện tại trước khi thay file. **Không xóa cả repository.**
2. Giải nén ZIP. Tải toàn bộ nội dung bên trong lên thư mục gốc của repo `CLB`: `index.html`, `content.js`, `css/`, `js/`, `assets/`, `release.json` và các file hướng dẫn. Giữ `.nojekyll` trong bộ mới.
3. `index.html` phải nằm ngay ngoài cùng. Không tạo thêm lớp thư mục `CLB-v4.0.0-FULL/` trong repo, và không chỉ tải mỗi file ZIP.
4. Giữ `CNAME`, `.github/`, cấu hình Pages và các ảnh/nội dung tự thêm sau lần gửi ZIP. Nếu cậu đã sửa `content.js` sau lần gửi, hãy gộp các thay đổi đó trước khi ghi đè.
5. V4 không còn nạp các file cũ ở gốc `style.css`, `music.css`, `script.js`, hay `js/music-v3.js`. Có thể xóa riêng chúng sau khi v4 hoạt động; **không xóa thư mục `js/` mới**.
6. Commit cùng một lần, chờ triển khai xong. Bảng Chuyển động cần hiện `v4.0.0`. Kiểm tra hai tác giả, mở tranh, kéo đĩa và phát nhạc.

`assets/` có ảnh gốc và bản WebP nhỏ. Tải cả thư mục này; không chỉ tải ba file HTML/CSS/JS như các bản vá trước.

Để chạy trên GitHub Pages, các phần bắt buộc là `index.html`, `content.js`, `css/`, `js/`, `assets/` và `.nojekyll`. `tools/`, `tests/`, `docs/` là bộ bảo trì/kiểm thử: có thể giữ chúng trên máy khi cập nhật bằng giao diện web, nhưng nên lưu cùng source để dùng cho lần sau.

## Xem thử trên máy tính

Website không cần npm hoặc framework để chạy. Cần mở bằng HTTP, không nhấp đúp `index.html` qua `file://` vì v4 dùng ES modules.

```sh
node tools/serve.mjs
```

Mở địa chỉ mà lệnh in ra. Có thể dùng `python -m http.server 4173` trong thư mục gốc thay thế.

## Sửa và phát hành lần sau

Nội dung: `content.js`. Chữ giao diện VI/EN: `js/data/translations.js`. Màu/phông chung: `css/tokens.css`. Giao diện máy đĩa: `css/music.css`. Chỉ sửa một nơi đúng chức năng, không dán thêm hotfix ở cuối file.

```sh
node tools/release.mjs 4.0.1
node tools/validate.mjs
```

Lệnh release đồng bộ phiên bản trong HTML và toàn bộ import, đồng thời tạo lại thẻ tranh dự phòng trong HTML. Không sửa tay hàng loạt chuỗi `?v=`.

Chi tiết: `docs/CHINH-SUA.md`, `docs/KIEN-TRUC.md`, `docs/KIEM-THU.md`, `docs/HIEU-NANG.md`.

## Phạm vi kiểm thử

Có kiểm thử Chromium với chuột, bàn phím, chạm giả lập và sự kiện Spotify giả lập. Chưa kiểm thử iPhone/Safari thật hoặc phát nhạc bằng tài khoản Spotify. Chưa commit/push vào GitHub của cậu. Xem báo cáo để biết phần nào đã được đo, không xem đây là cam kết không còn lỗi.
