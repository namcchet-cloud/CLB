# CHANGELOG — CLB Nghệ thuật

> Từ v7.0.6 trở đi, ghi thay đổi vào file này. Không tạo thêm RELEASE_vX.Y.Z.md ở thư mục gốc.

---

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

---

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

---

# CLB Nghệ thuật — v7.0.3 Living Sketchbook Art Direction

Bản này không thêm hiệu ứng thứ năm. Bốn hệ thống Living Sketchbook được dựng lại như một motion system thống nhất, ưu tiên độ mượt và chất lượng hình ảnh mà không thay đổi chức năng của website.

## Những thay đổi chính

- **Ink rail:** bỏ SVG dài theo toàn bộ document. Nét mực trở thành một gáy sketchbook cố định theo viewport, có tiến trình cuộn và điểm section đang xem. Scroll chỉ cập nhật transform/stroke progress trong `requestAnimationFrame`.
- **Paper transition:** thay tấm giấy phẳng quét màn hình bằng paper flap có mép gấp, đường gáy và góc giấy. Chuyển section và đổi họa sĩ dùng cùng ngôn ngữ chuyển động nhưng khác quy mô.
- **Artist motion identity:** Haruko, Akiko và Raven được neo vào vùng tên tác giả thay vì bay tự do trên gallery. Mỗi identity có nhịp vào–giữ–ra riêng nhưng dùng cùng easing và cleanup lifecycle.
- **Visitor trace / Secret Sketch:** dấu vết nhỏ và có thứ tự. Secret Sketch dựng tuyến đường theo chính thứ tự section → artist → artwork đã xem, không rải ký hiệu ngẫu nhiên.
- Tôn trọng `Full / Quiet / Off` và `prefers-reduced-motion`.
- Giữ nguyên gallery 3/2 tranh, lightbox, music/turntable, Raven/Kivat, SEO/Search Display, security, copyright/privacy và toàn bộ nội dung v7.0.2.

## Motion principles

- Không animation vô hạn cho 4 signature mới.
- Scroll không đo lại layout ở mỗi frame.
- Hiệu ứng toàn màn hình chỉ dùng transform/opacity trong runtime.
- Transition có sequence token + cancel cleanup để tránh chồng frame khi bấm nhanh.
- Signature được đặt theo anchor thật của DOM và cập nhật khi resize.

---

# CLB Nghệ thuật — v7.0.4 Pencil Study

Bản này thay lớp Living Sketchbook bằng ngôn ngữ chuyển động chì/graphite tinh tế hơn, giữ nguyên 4 ý tưởng và toàn bộ tính năng của v7.0.3.

## Thay đổi chính
- Pencil thread: 2 nét chì chồng lệch nhẹ, bỏ node/label mang cảm giác UI.
- Page whisper: chỉ còn mép giấy mảnh ở rìa khi điều hướng, không phủ màn hình.
- Artist studies: nét phác nhỏ neo cạnh tên họa sĩ; Haruko/Akiko/Raven khác hình học nhưng cùng chất graphite.
- Session traces: dấu chì mảnh thay cho icon/stamp.
- Secret Sketch: route bằng nhiều pass chì, số thứ tự và construction marks rất nhẹ.
- Không thêm ảnh, font, video hay dependency mới.
- Full/Quiet/Off và prefers-reduced-motion vẫn được tôn trọng.

---

# CLB v7.0.5 — Clean Core

This release removes the four experimental Living Sketchbook effects completely.

Removed:
- pencil/ink guide running along the page;
- paper/page transition layer;
- added Haruko/Akiko/Raven motion identity layer;
- visitor traces and Secret Sketch.

The removal is structural, not a visual hide: the Living Sketchbook JavaScript and CSS files are deleted, their app initialization is removed, and gallery hooks/events that existed only for those effects are removed.

Preserved:
- original gallery and artist effects;
- 3-artwork desktop / 2-artwork mobile responsive pagination;
- music/turntable;
- Raven/Kivat;
- intro;
- SEO/Search Display improvements;
- security, copyright/privacy and performance optimizations.


---


## v7.0.7 — Touch + PWA Pipeline

- Thêm `touch-action: none` cho vùng tương tác đĩa/mâm và giữ Pointer Events làm API chính cho chuột + cảm ứng.
- Thêm nút `Đặt đĩa lên mâm / Trả đĩa về bìa` chỉ hiện trên thiết bị cảm ứng hoặc màn hình nhỏ, song song với kéo-thả.
- Xác minh toàn bộ artwork public trong gallery dùng `.webp`; thumbnail và lightbox không quay lại JPEG/PNG master.
- Gallery tiếp tục áp `loading=lazy` và `decoding=async` qua `setImage()` và bản SSR ban đầu.
- Hoàn thiện Social Meta với Twitter URL, giữ OG preview JPEG 1200×630 để tương thích tốt với Facebook/Messenger/Zalo.
- Thêm `sw.js` + `js/core/pwa.js`; cache versioned CSS/JS/logo và cache font khi được tải, đồng thời tự xóa cache `clb-v*` cũ.
- Không cache Spotify API/player và không pre-cache dữ liệu Raven/artwork nặng để tránh làm lần truy cập đầu chậm hơn.

## v7.0.6 — Clean Source Structure

- Gom toàn bộ tài liệu bảo trì khỏi thư mục gốc vào `docs/`.
- Hợp nhất release notes thành một `docs/releases/CHANGELOG.md` duy nhất.
- Chuyển `content.js` vào `js/data/content.js`.
- Thêm `README.md` mô tả cấu trúc và quy tắc không tạo file rác ở root.
- Thêm `.nojekyll` để GitHub Pages phục vụ source tĩnh trực tiếp.
- Không thay đổi giao diện, nội dung hiển thị, animation hay tính năng.
