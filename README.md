# CLB Nghệ Thuật THPT Bảo Lộc | Website trọn bộ

Đây là **bản website đầy đủ, đã tích hợp chế độ Poster Gallery màu tím**.
Các tính năng cũ (mascot, intro, âm nhạc, tương tác, gallery gốc, motion, bộ lọc,
chuyển ngôn ngữ) vẫn giữ nguyên. Không cần chạy installer, npm hay Python để đăng lên.

## Đăng lên GitHub Pages

1. Sao lưu repository hiện có trước khi thay thế.
2. Giải nén file FULL-WEBSITE.zip. Tải **các tệp/thư mục ở bên trong ZIP** lên **gốc** repository `namcchet-cloud/CLB` nhánh `main`. Không đặt cả thư mục bọc vào repo.
3. Vì mục tiêu là cập nhật cả website gọn sạch, hãy xóa các file công cụ/bản sao cũ nếu chúng còn trong repo:
   `INDEX_INSERTION.txt`, `install_into_clb.py`, `fix_gallery_mode.py`, `apply_patch.py`,
   `audit.py`, `README.txt`, `ROOT_HOST_NOTE.txt`, `RUN_COMMAND.txt`, hai file
   `RELEASE_v7.0.15.md`, `RELEASE_v7.0.16.md`, thư mục `demo/`, `site-files/`,
   và ảnh mockup/test cũ trong `docs/`. Các mục này không cần cho runtime.
4. Đợi quy trình Deploy GitHub Pages hoàn thành và kiểm tra trên trình duyệt.

**Trang chính:** https://namcchet-cloud.github.io/CLB/

**Chế độ Poster Mode:** https://namcchet-cloud.github.io/CLB/?gallery=poster#gallery

Ở mục `Góc triển lãm`, bộ điều khiển **Thư viện / Poster Mode** nằm dưới bộ lọc.
Bật Poster Mode để xem bố cục comic màu tím. Bấm Thư viện để trở về như cũ.
Lựa chọn được ghi nhớ trong trình duyệt; URL cũng phản ánh chế độ đang xem.

## Cấu trúc triển khai

- `index.html`: trang gốc, chỉ thêm 2 link nạp CSS và JS mới.
- `css/poster-gallery.css`: styles riêng chỉ trong gallery mode.
- `js/features/poster-gallery.js`: toggle, điều hướng bằng nút/vuốt, modal, sync lọc và ngôn ngữ.
- `css/site.css` và tất cả CSS trước đây: **giữ nguyên**.
- `js/app.js`, `js/features/gallery.js`, `js/features/intro.js`, `js/features/motion.js`,
  `js/features/music/*`, `js/features/akiko.js`, `js/features/raven.js`: **giữ nguyên**.
- `js/data/content.js` và `assets/*`: toàn bộ dữ liệu và hình ảnh thật **giữ nguyên**.
- `sw.js`: giữ cơ chế PWA và offline cũ, không bổ sung service worker thứ hai.

## Trường hợp không thấy nút Poster Mode

- Mở `index.html` trên GitHub và kiểm tra có đúng 1 dòng nạp `css/poster-gallery.css?v=1.1.0`
  ở phần `<head>` và 1 dòng nạp `js/features/poster-gallery.js?v=1.1.0` trước `</body>`.
- Kiểm tra đường dẫn `css/poster-gallery.css` và `js/features/poster-gallery.js` tồn tại.
- Trên thiết bị đã cài PWA, kết nối mạng và tải lại trang; nếu cần đóng/mở lại PWA
  để nhận nội dung vừa cập nhật.

## Ranh giới chỉnh sửa

Dựa vào snapshot ZIP người dùng gửi. Bộ ZIP triển khai **không chứa** bản demo, các
installer/patch chồng lấn hoặc bản sao thư mục site-files. Những nguồn cũ chạy website
vẫn được bảo toàn. `docs/` giữ tài liệu kỹ thuật / pháp lý dạng text hữu ích nhưng bỏ
ảnh mockup lớn vì không phục vụ website thật.
