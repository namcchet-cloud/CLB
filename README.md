# ART CLUB — THPT Bảo Lộc / Comic Studio Refresh

Bản giao diện cập nhật theo yêu cầu 08/09/2026.

## Đã thay đổi
- Logo mới được dùng ở header, hero, máy đĩa than, gallery và footer. Logo được cắt bằng CSS theo hình tròn để không còn cảm giác bị nhốt trong khung vuông.
- Hero logo có 2 vòng orbit chuyển động, chấm màu, parallax nhẹ trên desktop và popup comic khi bấm.
- Toàn bộ hệ màu chuyển sang giấy kem/xám, sage, đỏ đất, dusty blue và vàng mù tạt; giảm neon/trắng tinh.
- Thêm halftone, speech bubble, ticker, sticker, burst, doodle và các nét comic nhưng giữ khoảng thở chuyên nghiệp.
- Gallery trở thành Exhibition Wall với khung treo lệch nhẹ.
- Music có máy đĩa than riêng, đĩa quay tương tác, logo làm nhãn đĩa và Spotify playlist được nhúng trực tiếp.
- Playlist: https://open.spotify.com/playlist/4l15Ccxw8hVu7YIpUU6QM0
- Font giới hạn ở Space Grotesk cho display/heading và DM Sans cho nội dung.
- Có VI/EN switch, responsive mobile, keyboard-accessible lightbox, prefers-reduced-motion.

## Thêm tác phẩm
Mở `script.js`, thêm object vào mảng `artworks` theo mẫu:
```js
{ image:'gallery/paintings/ten-file.jpg', category:'paintings', title:'Tên tác phẩm', author:'Tên tác giả', description:'Chất liệu / năm' }
```
