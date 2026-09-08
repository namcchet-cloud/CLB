# CLB Nghệ thuật — THPT Bảo Lộc
## Comic Studio 2.1 · Motion & Vinyl

Bản cập nhật từ gói `ART-CLUB-Bao-Loc-comic-refresh.zip`, dành cho website HTML/CSS/JavaScript đang chạy trên GitHub Pages.

### Dùng ngay

Giải nén, sao lưu website hiện tại, rồi chép các tệp của bản này vào đúng thư mục đang chứa `index.html` của website. Commit/push như lần triển khai trước. Đừng chỉ tải nguyên tệp ZIP lên.

**Giữ lại ảnh, nội dung tự thêm, `CNAME` và `.github/` của kho hiện tại.** Nếu đã bổ sung tác phẩm trong `script.js` cũ, chuyển các mục đó vào `artworks` trong `content.js` mới trước khi thay tệp.

### Đã thay đổi

- Tên CLB theo ngôn ngữ: **CLB Nghệ thuật** / **Art Club**.
- Các nút tham gia mở Google Form đã được cung cấp.
- Chuyển động bật/tỏa ra, trượt theo lớp, các chi tiết nổi nhẹ và vòng quay liên tục; có nút tắt chuyển động.
- Máy đĩa lớn hơn, hai đĩa chọn được; đĩa hồng dùng ảnh do chủ website cung cấp.
- Nút phát/tạm dừng gửi lệnh tới Spotify iFrame API. Đĩa chỉ quay sau khi có trạng thái phát từ Spotify, không giả lập âm nhạc.
- Khung lời tìm qua LRCLIB; đồng bộ khi có bản phù hợp và mốc thời gian. Có chọn bản thu, nhập `.lrc` và đọc lời không đồng bộ.
- Ba họ chữ theo vai trò: Barlow Condensed, Fraunces, DM Sans; tải qua Google Fonts, không kèm tệp font.
- Việt–Anh, bàn phím, mobile, trạng thái lỗi, giảm chuyển động và cách xử lý chuyển đĩa.

### Các tệp cần biết

| Tệp | Chức năng |
| --- | --- |
| `index.html` | Bố cục, các khu vực của trang |
| `style.css` | Màu sắc, font, responsive, chuyển động |
| `content.js` | Form, đĩa nhạc, tác phẩm, ghép lời theo bài |
| `js/i18n.js` | Nội dung giao diện Việt–Anh |
| `js/motion.js` | Chuyển động và chế độ giảm chuyển động |
| `js/player.js` | Điều khiển Spotify và trạng thái máy đĩa |
| `js/lyrics.js` | Tìm lời, LRC, đồng bộ và lưu cục bộ |
| `script.js` | Menu, mascot, thư viện, xem ảnh lớn |

Xem **[HUONG-DAN.md](HUONG-DAN.md)** để cập nhật ảnh, nhạc và lời. Xem **[KIEM-THU.md](KIEM-THU.md)** để biết những gì đã và chưa được kiểm tra.

### Giới hạn cần biết

Đây vẫn là website tĩnh; không có máy chủ quản trị ảnh hoặc tài khoản biên tập. Spotify, Google Fonts và tìm lời trực tuyến cần kết nối mạng. Spotify có thể yêu cầu bấm Play trực tiếp trong khung nhúng hoặc chỉ cung cấp bản nghe thử. Không bảo đảm mọi bài đều có lời và đúng bản thu. Tệp `.lrc` nhập từ giao diện chỉ lưu trên trình duyệt hiện tại.

Gói mã này chưa được đẩy lên kho GitHub của chủ website. Kiểm thử giao diện và logic đã chạy trong trình duyệt Chromium cách ly với phản hồi API giả lập; chưa kiểm chứng âm thanh thực tế trên website triển khai/iPhone.
