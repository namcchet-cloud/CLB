# CLB Nghệ thuật — v3.8.0

## Góc âm nhạc
- Giữ nguyên máy đĩa/cần/album của v3.7.0.
- Khi nhạc thực sự phát: nốt nhạc trôi nổi, spark, speed-line và bubble `MUSIC ON!` xuất hiện quanh máy.
- Pause/stop/lấy đĩa: hiệu ứng tự tan dần.
- Chế độ chuyển động Nhẹ/Tắt và `prefers-reduced-motion` được tôn trọng.
- Hiệu ứng chỉ là lớp trang trí, `pointer-events:none`, không cản kéo đĩa hay bấm nút.

## Cập nhật GitHub
Nếu đang ở v3.7.0, dùng PATCH và ghi đè cùng lúc:
- index.html
- style.css
- music.css
- script.js
- js/music-v3.js

Giữ nguyên `content.js` và `assets/`.
