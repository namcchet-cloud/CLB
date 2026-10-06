# CLB Nghệ thuật — THPT Bảo Lộc

**Phiên bản: v7.3.0 — Playback Sync & Raven**

Website tĩnh, chạy trên GitHub Pages; không cần build. Nội dung nằm trong `js/data/content.js`.

- Chọn album mở một phiên Spotify có sự kiện playback. Play/Pause trên mâm và thao tác trong Spotify cùng điều khiển trạng thái đĩa, cần và tiến trình bài.
- Nếu Spotify tải chậm, giữ nguyên controller và tiếp tục nhận sự kiện. Không tự thay bằng iframe mất đồng bộ. Khi API bị chặn hoàn toàn, hiển thị lỗi, Kết nối lại và liên kết Spotify bên ngoài.
- Khi buffering, đĩa giảm tốc và cần giữ tại rãnh; Pause đưa cần về chỗ nghỉ. Đổi bài đặt lại tiến trình. Đổi album/thoát trang đóng phiên cũ.
- Trình phát gọn 152px; Danh sách bài mở rộng thành 352px mà không tạo lại iframe. Trên mobile, thứ tự là album → mâm → Spotify.
- Raven sửa tọa độ xích, kiểm tra shader, giải phóng bộ nhớ GPU và có hiệu ứng nhẹ khi WebGL/mesh không hoạt động. Escape, Bỏ qua, mất context hoặc lỗi render đều dọn lớp phủ, trả cuộn và focus.

Kiểm thử:

```sh
node --experimental-vm-modules tests/music-session.mjs
# Cài Playwright và Chromium trong môi trường phát triển trước khi chạy:
node tests/browser.mjs
```

`CLB_CHROME` có thể trỏ tới Chromium có sẵn; `CLB_TEST` lọc tên nhóm kiểm thử theo biểu thức chính quy. Bộ trình duyệt dùng Spotify giả lập để tái hiện timeout, callback trễ, buffering và đổi album; cần nghiệm thu âm thanh thật trên máy người dùng, đặc biệt Safari/iPhone.

Ghi chú phát hành và hướng dẫn áp dụng: `docs/releases/CHANGELOG.md` và `docs/releases/v7.3.0.md`.
