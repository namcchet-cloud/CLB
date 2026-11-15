# SEO Keyword Expansion — CLB Nghệ thuật THPT Bảo Lộc

Bản vá này được làm cộng dồn trên v6.9.0 và đã bao gồm Search Display Hotfix trước đó. Không cần cài hotfix cũ trước.

## Cụm truy vấn mục tiêu

- CLB Nghệ thuật THPT Bảo Lộc
- CLB nghệ thuật Bảo Lộc
- CLB mỹ thuật Bảo Lộc / mỹ thuật Bảo Lộc
- hội họa Bảo Lộc
- triển lãm tranh Bảo Lộc
- tranh học sinh Bảo Lộc
- digital art Bảo Lộc
- thiết kế Bảo Lộc
- Art Club Bảo Lộc

Google không dùng `meta keywords` làm tín hiệu xếp hạng, vì vậy bản vá không thêm danh sách từ khóa ẩn. Các chủ đề được đưa vào câu chữ thật, alt ảnh và structured data phù hợp với nội dung đang hiển thị.

## Đã thay đổi

- Đồng bộ title + description trong HTML và runtime i18n để JavaScript không ghi đè metadata SEO.
- Mở rộng câu chữ tự nhiên ở Hero, About, Gallery, Workshop và Contact.
- Alt ảnh gallery mô tả tên tác phẩm + loại hình + tác giả, thay vì chỉ có tên tranh.
- Structured data bổ sung chủ đề mỹ thuật/hội họa/digital art/triển lãm và phạm vi Bảo Lộc, Lâm Đồng.
- Sitemap bỏ `image:title` đã bị Google ngừng hỗ trợ, vẫn giữ toàn bộ `image:loc`.
- Không đổi layout, animation, music, Raven, intro hay gallery pagination.

## Sau khi upload

1. Mở trang bằng tab ẩn danh và xem View Source/DevTools để chắc title là `CLB Nghệ thuật THPT Bảo Lộc`.
2. Trong Search Console, dùng URL Inspection cho `https://namcchet-cloud.github.io/CLB/` và yêu cầu lập chỉ mục lại.
3. Gửi lại `https://namcchet-cloud.github.io/CLB/sitemap.xml` nếu cần.
4. Không mong mọi từ khóa xuất hiện ngay; Google cần crawl lại và tự quyết định truy vấn nào phù hợp.

Lưu ý: gói ROOT Search Identity ở repository `namcchet-cloud.github.io` vẫn là phần riêng để xử lý site name/favicon cấp hostname.
