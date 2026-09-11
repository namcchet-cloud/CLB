# Sửa nội dung và bảo trì v4

## Thêm tranh

Chép ảnh gốc vào `assets/gallery/`. Trong `content.js`, thêm một phần tử vào `artworks`: `id` không trùng, `artistId` trùng tác giả, `image` là đường dẫn ảnh gốc; `title`, `description`, `author` giữ cấu trúc VI/EN giống các mục sẵn có. `thumb` không bắt buộc. Để `title` rỗng nếu không muốn đặt tên tranh.

Dù tên hiển thị là Haruko Satoru, mã `artistId` cũ vẫn là `bao-tam` để giữ liên kết tranh và hiệu ứng. Không đổi mã này chỉ vì đổi tên hiển thị.

Sau khi thêm/sửa ảnh, có thể chạy lệnh tạo thumbnail (cần Python + Pillow và Node):

```sh
python -m pip install Pillow
python tools/optimize-images.py
node tools/release.mjs 4.0.1
node tools/validate.mjs
```

Ảnh gốc không bị ghi đè. Tên ảnh nhỏ chứa mã nội dung để tránh lấy nhầm ảnh cache cũ. Tải các file WebP mới cùng `assets/image-manifest.json` và `js/data/images.js`. Nếu không chạy bước tối ưu, trang vẫn dùng được ảnh gốc nhưng tải nặng hơn.

Số tranh hiển thị mỗi lần là 12; thêm nút Xem thêm khi vượt mốc đó. Ảnh lớn chỉ nạp khi mở tác phẩm.

## Thay playlist

Sửa `records` trong `content.js`: giữ `id` ổn định, sửa `name`, `caption`, `image`, `spotifyUrl` và `uri`. `uri` dạng `spotify:playlist:ID`; `spotifyUrl` là link của đúng playlist đó. Giao diện này đang có hai tông `green` và `pink`. Thêm tông khác cần sửa CSS tương ứng.

## Chỉnh giao diện / chuyển động

- `css/tokens.css`: bảng màu, font và các giá trị chung.
- `css/site.css`: bố cục trang, header, gallery, responsive.
- `css/music.css`: album, máy đĩa, cần kim, comic nốt nhạc.
- `css/effects.css`: rễ/hoa Haruko và UFO Akiko; nạp khi cần.
- `js/features/music/motor.js`: một vòng lặp cho quay đĩa và cần kim.
- `js/features/music/spotify.js`: kết nối Spotify, xử lý lỗi và sự kiện phát nhạc.
- `js/features/music/index.js`: chọn bìa, kéo/thả, trả đĩa, trạng thái UI.

Không chỉ tăng `z-index` hoặc dán thêm CSS ghi đè khi gặp lỗi. Sửa trực tiếp quy tắc/logic đang quản lý phần đó, sau đó chạy kiểm thử.

## Phát hành và quay lại bản cũ

Chọn phiên bản mới, chạy `node tools/release.mjs 4.0.1` rồi `node tools/validate.mjs`. Cập nhật các module cùng một commit. Khi cần quay lại, revert cả commit/bộ mã đồng nhất, không ghép từng file v3 vào v4.

Trong Console, `ClubDiagnostics()` chỉ đọc trạng thái tại chỗ: phiên bản, module đã nạp, lỗi, bề ngang, motor. Chưa cuộn đến góc nhạc thì `music: not loaded yet` là bình thường, không phải lỗi.
