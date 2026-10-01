# CLB Nghệ thuật — THPT Bảo Lộc

**Phiên bản: v7.0.16**

- Spotify Direct Gesture Sync: lệnh Play/Pause chạy trực tiếp trong thao tác bấm của người dùng.
- Spotify API được làm nóng sớm nhưng controller chỉ tạo khi đĩa được đặt lên mâm.
- Nút Play chỉ khả dụng khi Spotify controller đã sẵn sàng.
- Bỏ cơ chế queued Play sau Promise để tránh mất user activation trên Safari/mobile.
- Đĩa, motor và kim chỉ chạy sau khi Spotify xác nhận playback thật.
- Tăng cửa sổ chờ xác nhận playback lên 3,6 giây trước khi hiện fallback thao tác trực tiếp.
- Giữ preload mạng, playlist reuse, PWA, gallery, SEO và các hiệu ứng hiện có.
