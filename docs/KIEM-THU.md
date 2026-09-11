# Kiểm thử bản bàn giao v4.0.0

Đã chạy **88 assertions trong Chromium**: 75 kiểm tra giao diện/tương tác và 13 kiểm tra chạm, hủy thao tác, giảm chuyển động, mất kết nối, thử lại và không JavaScript. Các kiểm tra đó đều đạt trên bản cuối.

Bề rộng: 320, 360, 390, 430, 768, 980, 1024, 1280, 1440, 1920px, cả VI và EN. Kiểm tra không tràn ngang và nút phát nằm trong thân máy.

Luồng đã thử: mascot đầu trang, 6 tranh Haruko, lọc Merina, lightbox ảnh gốc, Escape, 6 tranh Akiko không tên, UFO, hoa ẩn khi rời gallery; kéo đĩa thật, thả vào mâm, tâm đĩa khớp trục (0px lệch trong lần đo desktop), Enter đặt đĩa, đổi album trả đĩa cũ, bỏ qua sự kiện cũ, tua đổi góc kim, Pause đưa kim về giá, cuộn xa dừng RAF nhưng giữ trạng thái audio.

Chạm được gửi bằng Chromium DevTools `Input.dispatchTouchEvent` với viewport 390×900, DPR 3. Đây **không phải Safari hay iPhone thật**. Kiểm tra đường kính đĩa trước kéo / khi kéo / trên mâm: 209.265625px trong cả ba trạng thái.

## Kiểm tra tĩnh

`node tools/validate.mjs` kiểm tra cú pháp JS, các ID nội dung, đường dẫn ảnh/import, phiên bản, ID HTML, không nạp runtime cũ và không đóng gói font. Kết quả chi tiết trong `QA-REPORT.json`.

## Tái chạy

```sh
python -m pip install playwright
python -m playwright install chromium
python tests/browser.py
python tests/edge_cases.py
node tools/validate.mjs
```

Có thể đặt biến `CHROMIUM_EXECUTABLE` trỏ đến Chromium của hệ thống thay cho bản Playwright cài sẵn. Kết quả lưu trong `tests/results/`.

## Chưa xác minh

Chưa có kiểm thử iPhone/Safari, Firefox, phát audio Spotify bằng tài khoản thật hay bản deploy GitHub. Bộ test sử dụng mock trong `tests/spotify-mock.js`, không được nạp bởi trang thật. HTML được nạp cục bộ bằng `set_content` và các tài nguyên route; đây không phải E2E mạng thật.
