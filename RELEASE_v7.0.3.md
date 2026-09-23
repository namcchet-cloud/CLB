# CLB Nghệ thuật — v7.0.3 Living Sketchbook Art Direction

Bản này không thêm hiệu ứng thứ năm. Bốn hệ thống Living Sketchbook được dựng lại như một motion system thống nhất, ưu tiên độ mượt và chất lượng hình ảnh mà không thay đổi chức năng của website.

## Những thay đổi chính

- **Ink rail:** bỏ SVG dài theo toàn bộ document. Nét mực trở thành một gáy sketchbook cố định theo viewport, có tiến trình cuộn và điểm section đang xem. Scroll chỉ cập nhật transform/stroke progress trong `requestAnimationFrame`.
- **Paper transition:** thay tấm giấy phẳng quét màn hình bằng paper flap có mép gấp, đường gáy và góc giấy. Chuyển section và đổi họa sĩ dùng cùng ngôn ngữ chuyển động nhưng khác quy mô.
- **Artist motion identity:** Haruko, Akiko và Raven được neo vào vùng tên tác giả thay vì bay tự do trên gallery. Mỗi identity có nhịp vào–giữ–ra riêng nhưng dùng cùng easing và cleanup lifecycle.
- **Visitor trace / Secret Sketch:** dấu vết nhỏ và có thứ tự. Secret Sketch dựng tuyến đường theo chính thứ tự section → artist → artwork đã xem, không rải ký hiệu ngẫu nhiên.
- Tôn trọng `Full / Quiet / Off` và `prefers-reduced-motion`.
- Giữ nguyên gallery 3/2 tranh, lightbox, music/turntable, Raven/Kivat, SEO/Search Display, security, copyright/privacy và toàn bộ nội dung v7.0.2.

## Motion principles

- Không animation vô hạn cho 4 signature mới.
- Scroll không đo lại layout ở mỗi frame.
- Hiệu ứng toàn màn hình chỉ dùng transform/opacity trong runtime.
- Transition có sequence token + cancel cleanup để tránh chồng frame khi bấm nhanh.
- Signature được đặt theo anchor thật của DOM và cập nhật khi resize.
