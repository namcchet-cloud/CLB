# Kiểm thử · Comic Studio 2.1

## Phạm vi và kết quả

**20 nhóm kiểm tra đạt trong môi trường cách ly.** Dùng Chromium không giao diện với Playwright; HTML, CSS và JavaScript của bản bàn giao được nạp vào trang thử. Phản hồi Spotify iFrame API, Spotify oEmbed, LRCLIB và lưu trữ cục bộ được giả lập có chủ đích.

Các trạng thái “phát”, “tạm dừng”, tên bài và lời trong phép thử là dữ liệu kiểm thử; **không phải xác nhận âm thanh thật hoặc nội dung của hai playlist**. Không có dữ liệu lời thử trong mã website bàn giao.

| # | Kiểm tra | Kết quả |
| --- | --- | --- |
| 1 | Tên CLB tiếng Việt và cả hai liên kết form tham gia | Đạt |
| 2 | Chuyển VI/EN, tên CLB và tiêu đề/miêu tả trang | Đạt |
| 3 | Mascot bật thông tin, hạt comic, Escape và trả tiêu điểm bàn phím | Đạt |
| 4 | Lọc tác phẩm, thông báo trống theo ngôn ngữ và hộp xem ảnh | Đạt |
| 5 | Nút Play gửi lệnh tới bộ điều khiển; chưa có phản hồi thì đĩa chưa quay | Đạt |
| 6 | Sự kiện phát giả lập điều khiển đĩa, tiến độ và dòng lời đang hát | Đạt |
| 7 | Sự kiện tạm dừng giả lập dừng hoạt ảnh | Đạt |
| 8 | Đĩa hồng, ảnh đúng, liên kết đúng, dọn trình phát cũ, bỏ qua sự kiện cũ | Đạt |
| 9 | Nhập LRC, ghép theo mã bài, lưu cục bộ giả lập và tô dòng | Đạt |
| 10 | Từ chối LRC không hợp lệ nhưng không xóa lời vừa có | Đạt |
| 11 | Tắt chuyển động không làm thay đổi trạng thái phát; nhãn tiếng Anh đúng | Đạt |
| 12 | Không tràn ngang ở 8 độ rộng, mỗi độ rộng thử cả VI và EN | Đạt |
| 13 | Menu mobile và đóng bằng Escape | Đạt |
| 14 | Kết quả lời trùng tên cần chọn bản; nhớ ID ghép theo bài | Đạt |
| 15 | Phản hồi LRCLIB 429 giữ thời gian chờ, không tạo vòng gọi lại | Đạt |
| 16 | Khi script Spotify lỗi: tạo iframe dự phòng, không giả lập trạng thái đang phát | Đạt |
| 17 | Ưu tiên giảm chuyển động của thiết bị; phục hồi ngôn ngữ đã lưu sai | Đạt |
| 18 | Không ghi nhận lỗi JavaScript chưa xử lý trong bộ kiểm thử cách ly | Đạt |
| 19 | Sự kiện ready/phát quá muộn không kích hoạt lại trình phát đã hết thời gian chờ | Đạt |
| 20 | Bộ đọc LRC: nhiều mốc cùng dòng, phần giây lẻ, offset, bỏ mốc sai | Đạt |


Độ rộng màn hình đã kiểm tra: **1440, 1024, 800, 768, 600, 390, 375 và 320 px**. Mỗi độ rộng kiểm tra cả tiếng Việt và tiếng Anh. Hai ảnh xem trước là ảnh chụp giao diện thật trong Chromium; do mạng cách ly, phép thử dùng font dự phòng thay cho Google Fonts.

## Kiểm tra tĩnh

Các tệp JavaScript được kiểm tra cú pháp với `node --check`. HTML được rà soát ID trùng, đích liên kết nội bộ và tài nguyên CSS/JS/ảnh tương đối. Các nhãn `data-i18n` được đối chiếu với cả hai bộ từ điển.

## Chưa xác minh

- Phát âm thanh thực tế từ hai playlist trên trang GitHub của chủ website.
- Hành vi đăng nhập, nghe đầy đủ/nghe thử, cookie và quyền phát của từng tài khoản Spotify.
- Truy cập oEmbed/LRCLIB thực tế từ tên miền xuất bản, CORS, giới hạn dịch vụ hoặc độ phủ lời của playlist.
- Độ đúng của từng bản lời so với các bản thu thực.
- Trình duyệt Safari iOS trên thiết bị vật lý, Android thực tế và font Google Fonts tải từ mạng.
- Đồng bộ dữ liệu lưu trữ qua thiết bị; website không triển khai chức năng này.

Nên chạy một vòng kiểm tra trực tiếp sau khi thay tệp trên GitHub. Nếu Spotify yêu cầu tương tác, bấm Play trong khung Spotify. Nếu lời không đúng bản, tìm lại bằng tên và nghệ sĩ hoặc ghép LRC được phép sử dụng.
