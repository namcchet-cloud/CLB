# Mascot Manual v3.0 - Art Direction

## Form và nhịp thị giác

**Poster cover**: black masthead / black title mass / fox mascot / black serial footer. Hai mảng quyền lực chính (chữ, nhân vật) có đường đọc rõ; các ký hiệu phụ xuất hiện khi diễn giải đúng ngữ cảnh.

**Một hero, nhiều chapter**: mascot xuất hiện rất lớn trang đầu, thu nhỏ thành profile trong mục giới thiệu, tái xuất ở bìa sau. Mục gallery nhường sân khấu cho tranh thật của thành viên; mục hoạt động dùng icon vật thể nhằm giữ chức năng rõ ràng; mục âm nhạc tiếp tục dùng hệ mâm đĩa hiện hữu.

## Palette / vai trò

| Vai trò | HEX | Sử dụng |
| --- | --- | --- |
| Paper / nghỉ | `#F5F2E8` | Nền hero, liên hệ |
| Ink / neo | `#19171C` | Headline, header/footer, khung tranh |
| Purple / chapter | `#59417D` | Phần CTA, dải thông tin, nhấn hình |
| Lilac / staging | `#C3B2DE` | Sân khấu mascot |
| Lime / động cơ | `#D6F583` | Halo và nút quan trọng |
| Fox orange | Logo gốc | Không recolor logo |
| Cyan | Logo gốc | Điểm màu có sẵn của mascot, không rải thêm |

## Type hierarchy

- Level 0: `ART / CLUB` như một khối nhận diện. Không dùng effects làm giả thể tích.
- Level 1: Headline chương / slogan tiếng Việt, ưu tiên rõ dấu tiếng Việt.
- Level 2: Labels 01-06 và tên tác phẩm/tác giả.
- Level 3: Metadata và caption, không nhỏ hơn mức dễ đọc thực tế.

## Motion system

- Mode switch: 0.67s, một trang quét mực; nội dung đổi khi màn đã được che.
- Chapter reveal: 0.48–0.55s, di chuyển 24px, chỉ một lần khi phần đó vào viewport.
- Mascot: dịch 8–12px theo pointer, không xoay hoặc làm méo logo.
- Thẻ artwork: translateY khoảng 5px; không đổi hình gốc.
- Icon chương: dịch 6px và xoay nhẹ khi hover.
- Reduced motion / quiet / off: tắt chuyển cảnh và chuyển động phụ, không ẩn nội dung.
