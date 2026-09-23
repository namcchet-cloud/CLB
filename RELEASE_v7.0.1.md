# CLB Nghệ thuật — v7.0.1 cumulative

Bản này là mốc chuẩn duy nhất sau v6.9.0.

## Đã gộp
- Gallery responsive: desktop 3 tranh / mobile 2 tranh, tự thích ứng khi xoay thiết bị.
- Bảo mật, bản quyền, quyền riêng tư và artwork web copies từ v6.8.5.
- Tối ưu hiệu năng v6.9.0: intro tăng tốc nhưng giữ sequence, Raven data loading, responsive lightbox và các tối ưu tải/render.
- Living Sketchbook v7.0.0: nét mực sống, sketchbook transition, motion identity riêng cho từng artist, dấu vết người xem + Secret Sketch.
- Search Display Hotfix: title/description/favicon/structured-data được chuẩn hóa cho /CLB/.
- SEO Discovery: nội dung và alt text tự nhiên cho nhóm tìm kiếm mỹ thuật/hội họa/digital art/triển lãm tranh tại Bảo Lộc.
- Sửa lỗi i18n runtime từng ghi đè title/description SEO sau khi JavaScript khởi tạo.

## Không thay đổi
Không bỏ hoặc giản lược gallery, music turntable, Raven, mascot, intro, parallax/comic motion hay các tính năng hiện có.

## Lưu ý Google Search
Tên site/favicon ở cấp hostname `namcchet-cloud.github.io` vẫn phụ thuộc gói ROOT Search Identity và việc Google crawl lại. Bản v7.0.1 xử lý đầy đủ phần thuộc `/CLB/` nhưng không thể tự thay cấu hình cấp hostname.
