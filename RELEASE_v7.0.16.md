# CLB v7.0.16 — Direct Gesture Sync

- Spotify API warm-up giữ nguyên để giảm thời gian chờ kết nối.
- Controller chỉ được tạo khi đĩa thực sự lên mâm.
- Nút Play chỉ mở khi controller sẵn sàng.
- Bỏ queued Play bất đồng bộ.
- Play/Pause gọi trực tiếp trong thao tác bấm.
- Motor, đĩa và kim đồng bộ theo playback đã được Spotify xác nhận.
- Watchdog playback tăng lên 3,6 giây.
