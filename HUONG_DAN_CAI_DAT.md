# CLB ART CLUB - PATCH V6.1 (fix surfaces, scroll chrome)

## Chỉ dùng cho phiên bản website V6.0

Gói chỉ có 4 file website cần cập nhật (dưới giới hạn 100 file GitHub):
- `index.html` (nạp 2 module vá mới, mọi chức năng cũ vẫn còn)
- `sw.js` (đổi cache version để website lấy CSS/JS mới)
- `css/zzz-v6.1-polish.css` (giấy, nền xanh, thanh trên và dải dưới)
- `js/features/zzz-v6.1-polish.js` (thanh trên theo hướng cuộn, dải dưới theo tiến độ)

## Cập nhật GitHub Pages

1. Giải nén ZIP này. Mở repository CLB trên GitHub, nhánh đang dùng cho Pages.
2. Chọn `Add file > Upload files`, kéo **4 file trên**, giữ đúng đường dẫn `css/` và `js/features/`.
3. Chấp nhận ghi đè `index.html` và `sw.js` của V6 rồi commit chung 1 lần.
4. Đợi GitHub Pages triển khai và mở `https://namcchet-cloud.github.io/CLB/?mode=zzz`.
5. Nếu còn xem bản cũ trên iPhone, tải lại trang, đóng tab rồi mở lại hoặc xóa cache trang.

**Quan trọng:** Không upload nguyên tệp ZIP lên GitHub. Không xóa hoặc ghi đè các file CSS/JS tính năng khác. Nếu `index.html` đã được chỉnh sau V6, hãy chèn 2 link mới thủ công thay vì ghi đè index.

## Hành vi sau vá

- Chỉ trong ZZZ: bỏ lớp `.paper-noise` phủ toàn viewport; chỉ có chất giấy trong các bề mặt nền và trên silhouette wordmark. Logo, ảnh tranh, nút giữ nguyên độ rõ.
- Sửa mảng xanh hero thành một silhouette khép kín nằm gọn trong vùng hình ở mọi kích thước.
- Dải đen chuyển sang fixed ở đáy màn hình, có tên chương và % cuộn.
- Header ZZZ ẩn lúc bắt đầu/chuyển mode; kéo lên hiện, kéo xuống ẩn. Menu mở và điều hướng bàn phím vẫn truy cập được.
- Classic mode không đổi; âm nhạc, gallery, mascot và các hoạt ảnh trước đó không được sửa.

## Hoàn tác

Khôi phục `index.html` và `sw.js` bản V6.0; 2 file CSS/JS mới có thể để nguyên không dùng hoặc xóa.

## Cách cập nhật an toàn nếu `index.html` trên GitHub đã được sửa sau V6

Không ghi đè `index.html` trong ZIP. Chỉ upload 2 file mới trong `css/` và `js/features/`.
Mở `index.html` hiện tại trên GitHub, trước `</head>` thêm:

```html
<link rel="stylesheet" href="css/zzz-v6.1-polish.css?v=6.1.0">
```

Trước `</body>` thêm:

```html
<script type="module" src="js/features/zzz-v6.1-polish.js?v=6.1.0"></script>
```

Có thể dùng `sw.js` kèm bản vá để làm mới cache PWA **nếu sw.js vẫn là bản V6**; nếu đã được sửa sau V6 thì nên giữ bản đang có và chỉ tăng phiên bản cache, thêm 2 URL mới vào `CORE`.

Cách này bảo toàn mọi chỉnh sửa riêng ở website đã triển khai.
