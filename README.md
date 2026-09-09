# CLB Nghệ thuật - bản 2.3.0

## Cập nhật kho namcchet-cloud/CLB

Gói vá dành cho website đang có content.js và assets/.
Chỉ cần thay ba tệp chạy: index.html, style.css, script.js.

1. Sao lưu kho hiện tại, sau đó giải nén gói vá.
2. Thay cả ba tệp trên trong thư mục gốc CLB, cùng một lần commit.
   Không chỉ tải tệp ZIP lên kho. Không tạo thư mục CLB/v23/.
3. Khi GitHub Pages triển khai xong, mở lại trang. Bấm Chuyển động ở góc dưới:
   cần thấy `v2.3.0 - HTML + CSS + JavaScript` với dấu kiểm tra.
   Chọn **Đầy đủ** để thử tất cả hiệu ứng.

GIỮ NGUYÊN content.js, assets/, gallery/, lyrics/, CNAME và .github/ của cậu.
Gói vá không thay thế nội dung, hình ảnh hay liên kết tự thêm.
Thư mục js/ và motion.css cũ có thể giữ lại; index.html mới không gọi chúng.

## Cách kiểm tra

- Trên máy tính: rê chuột lên thẻ hoạt động, bấm mascot,
  cuộn xuống rồi trở lại để xem vòng logo tiếp tục quay.
- Trên điện thoại: kiểm tra lề hai bên, mở menu, chạm mascot,
  đổi đĩa và xoay màn hình.
- Bấm **Thử chuyển động - không phát nhạc** để kiểm tra
  đĩa và kim độc lập với kết nối Spotify.
- Nếu bảng báo thiếu/lệch phiên bản, thay lại đồng thời ba tệp.
  Nếu chưa thấy v2.3.0, trang đang hiển thị bản cũ, chưa phải bản vá.

## Chế độ chuyển động

Theo thiết bị: tôn trọng cài đặt giảm chuyển động của hệ điều hành.
Đầy đủ: bật rõ ràng theo lựa chọn của người xem.
Nhẹ: chuyển động biên độ nhỏ, không nghiêng theo chuột.
Tắt: dừng hiệu ứng trang, không tắt nhạc.
Lựa chọn được lưu trên trình duyệt khi bộ nhớ cục bộ khả dụng.

## Đã sửa

Bố cục co giãn đúng bề ngang; khối chờ xuất hiện không làm nở trang.
Vòng logo không phụ thuộc vào một lần khởi tạo quan sát duy nhất.
Có phản hồi chuột/chạm; hiệu ứng ngoài màn hình tạm dừng.
Đĩa tăng/giảm tốc dần; kim nâng, xoay, hạ trên trục cố định.
Đóng ảnh lớn có cơ chế dự phòng để không kẹt cuộn trang.
Giữ nguyên hai ngôn ngữ, Google Form, hai playlist và hình đĩa hồng.

## Phạm vi kiểm thử

14 bề rộng 320-1920 px, cả VI/EN; thêm kiểm tra chuột, chạm, xoay màn hình,
chế độ giảm chuyển động, menu, ảnh lớn và khôi phục trang.
Chi tiết nằm trong KIEM-THU-v2.3.md và ket-qua-kiem-thu.json.

Bản ghi/xem trước được render cục bộ trong Chromium với font dự phòng.
Môi trường kiểm thử chặn điều hướng mạng, nên HTML/CSS/JS được nạp
trực tiếp vào DOM; tệp được kiểm tra đường dẫn riêng.
Sự kiện Spotify được giả lập để kiểm tra đĩa/kim; không phải phát nhạc thật.
Chưa kiểm thử Safari/iPhone thật, tài khoản Spotify hay bản GitHub sau cập nhật.
Gói này chưa được commit/push vào kho của cậu.

Dành cho người kiểm tra mã: chạy `ClubDiagnostics()` trong console để xem
phiên bản, bề ngang, chế độ chuyển động và trạng thái motor.
Hàm này chỉ đọc trạng thái tại chỗ, không gửi dữ liệu lên mạng.
