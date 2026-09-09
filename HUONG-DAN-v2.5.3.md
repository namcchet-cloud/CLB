# CLB Nghệ thuật - v2.5.3

Bản vá mascot Akiko cho website v2.5.2 hiện tại.

1. Sao lưu website. Giải nén ZIP.
2. Thay index.html, style.css, script.js trong thư mục gốc kho CLB.
3. Thêm ảnh assets/gallery/akiko/mascot-intact-v253.webp vào đúng đường dẫn.
4. Commit cùng lúc các thay đổi, chờ GitHub Pages triển khai xong và tải lại trang.

KHÔNG xóa content.js, ảnh tranh, logo hay cấu hình tên miền. Chỉ gộp ảnh mới vào assets/ cũ, không thay cả thư mục bằng thư mục rỗng.
ZIP không có lớp site/ bên ngoài. Tải các tệp đã giải nén lên, không chỉ tải nguyên ZIP.

## Thử ngay
Mở Chuyển động, kiểm tra v2.5.3, chọn Đầy đủ. Trong Tác phẩm, bấm Akiko Oishi.
Nhân vật bay khoảng 7 giây. Bấm lại tên Akiko để bay lại.
Chuyển tác giả, mở tranh hoặc Escape sẽ dừng lượt bay. Chế độ Nhẹ chỉ bay một cung ngắn; Tắt không bay.
Theo thiết bị vẫn tôn trọng chế độ giảm chuyển động.

## Phạm vi
Giữ nguyên nhân vật, hai mắt và biểu cảm từ ảnh gốc; chỉ tách nền bên ngoài.
Không thay nội dung tranh hoặc thiết kế toàn trang. Mã tên lửa/chuyển động nằm trong script.js/style.css.

54 kiểm tra đạt trên Chromium 144, gồm 6 độ rộng 320-1440 px.
Mạng bị chặn trong môi trường kiểm thử; mã và ảnh được nạp nội bộ. Video là chuyển động ghi từ trình duyệt.
Chưa kiểm tra Safari/iPhone thật, Spotify thật hoặc bản GitHub sau cập nhật.
Chưa đẩy thay đổi trực tiếp lên kho GitHub.
