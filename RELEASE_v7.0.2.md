# CLB Nghệ thuật — v7.0.2 Living Sketchbook Polish

Bản này được dựng trực tiếp từ full web v7.0.1 người dùng gửi (`CLB-main (7).zip`). Không bỏ hiệu ứng, không bỏ tính năng và không thay nội dung SEO đã ổn định.

## 4 hiệu ứng được tinh chỉnh

1. **Nét mực sống**
   - Chỉ còn một nét SVG động thay vì hai nét dài cùng repaint theo scroll.
   - Bỏ `mix-blend-mode` toàn trang; thêm nét chì dẫn rất nhẹ.
   - Dùng `ResizeObserver` để tự vẽ lại khi gallery/lazy content làm đổi chiều cao trang.
   - Giới hạn cập nhật scroll bằng `requestAnimationFrame` và bỏ qua thay đổi quá nhỏ.

2. **Lật giấy / chuyển khu**
   - Bỏ shadow blur lớn và 3D `rotateY` toàn màn hình.
   - Chỉ dùng `transform + opacity`, có khoảng che ổn định ở giữa trước khi đổi vị trí scroll.
   - Fix cleanup khi bấm chuyển khu liên tục, tránh lớp giấy bị kẹt.

3. **Motion identity của họa sĩ**
   - Haruko: marker gesture nhiều lớp, nét mềm và có điểm màu.
   - Akiko: digital orbit sigil sạch hơn, không có vòng quay vô hạn.
   - Raven: four-corner lock + scan + mechanical lock ring.
   - Tất cả có pha fade-out mềm thay vì biến mất đột ngột.

4. **Dấu vết người xem / Secret Sketch**
   - Dấu đóng bớt nảy và bớt rối.
   - Secret Sketch không còn rải ký hiệu ngẫu nhiên; nó vẽ một đường hành trình theo đúng thứ tự section / artist / artwork đã xem.
   - Có tổng kết số góc, họa sĩ và tác phẩm đã khám phá.
   - Không lưu tài khoản, không tracking, tải lại là tạo mới.

## Giữ nguyên

- Gallery 3 tranh desktop / 2 tranh mobile và responsive khi xoay máy.
- Intro, Music, Spotify, Raven/Kivat, Akiko effect cũ.
- Search Display + SEO Discovery + metadata runtime.
- Security, bản quyền, privacy và ảnh web tối ưu.
- Full / Quiet / Off / prefers-reduced-motion.
