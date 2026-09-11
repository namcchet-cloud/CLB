# Hiệu năng — phép đo v4.0.0

Nguồn so sánh: bộ mã trong `CLB-main (2).zip` và bản v4 đóng gói. Dùng cùng Chromium, viewport 1440×1000, trang mới và cửa sổ quan sát 2 giây sau khi nạp HTML.

| Hạng mục | Bản gửi | V4 |
| --- | ---: | ---: |
| Tổng kích thước file local được yêu cầu ban đầu, đã khử trùng file | 1,253,190 byte | 374,811 byte |
| CSS của toàn bộ trang, chưa nén | 158,235 byte | 83,485 byte |
| Ảnh logo gốc / bản 96px dùng ở header | 594,826 byte | 3,414 byte |
| Logo 640px dùng cho hero | 594,826 byte | 70,134 byte |

Mức giảm tài nguyên local ban đầu trong phép đo này: **70.09%**. CSS toàn trang giảm **47.24%**. Màn hình mật độ điểm ảnh cao có thể chọn bản logo/thumbnail lớn hơn nhờ `srcset`.

## Giới hạn phép đo

Đây là kích thước nội dung file, **không phải số giây tải trang, điểm Lighthouse hay Core Web Vitals**. HTML được nạp bằng `set_content`; file local được phục vụ qua Playwright route. Môi trường kiểm thử không cho điều hướng mạng/localhost bình thường, nên đây không phải phép đo trên GitHub Pages.

Cả hai lần đo đều không tải font ngoài/Spotify; không tính body HTML, header HTTP, gzip/Brotli và độ trễ mạng. Tính theo file duy nhất để không phóng đại lợi ích do cách kiểm thử vô hiệu cache. Tốc độ thật còn tùy mạng, thiết bị, cache và dịch vụ Spotify.

## Cách giảm công việc khi trang chạy

- Giữ khối bố cục/ảnh dự phòng có kích thước ổn định; gallery và music khởi tạo khi sắp vào màn hình hoặc khi được focus.
- Spotify chỉ kết nối sau khi người dùng đặt đĩa; không khởi tạo iframe ngay đầu trang.
- Motor/cần kim dùng chung một clock; dừng RAF khi ra ngoài màn hình, ẩn tab hoặc tắt chuyển động. Âm thanh không bị tắt vì cuộn trang.
- Listener kéo đĩa được gỡ khi kết thúc/hủy thao tác; bỏ qua sự kiện Spotify của album cũ.
- Hiệu ứng UFO/hoa chỉ nạp khi cần. Ảnh tranh bản lớn chỉ tải lúc mở tranh.

Toàn bộ **30 file ảnh/tài nguyên gốc** trong `assets/` được giữ nguyên từng byte. ZIP có thể lớn hơn bản gửi vì chứa thêm thumbnail và tài liệu; trình duyệt không tải toàn bộ ZIP khi mở trang.

Dữ liệu: `QA-REPORT.json`. Tái lập phép đo: `python tests/measure.py --root /path/to/site`.
