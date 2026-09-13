# Raven v6.4.1 Fidelity Plus Patch

File thay chính:
- `js/features/raven.js`
- `js/features/gallery.js`

Đợt tinh chỉnh thêm này tập trung vào độ giống ảnh tham chiếu hơn:
- Dáng **base driver** sát hơn: vòng tròn trắng, thanh chéo, thân xanh đen, tay đeo.
- **White buckle** bên trái được vẽ lại với 3 cánh/phiến rõ hơn, đỏ inset sát bố cục hơn.
- **Red buckle** bên phải được chỉnh khối đầy hơn, cảm giác trong suốt/pha lê rõ hơn.
- **Final form** được dựng lại với bố cục gần ảnh hơn: cụm 5 cánh trên, 3 cánh mỗi bên, mặt trung tâm, paw dưới và ống đỏ chéo gần tâm.
- Giữ nguyên hướng làm bằng **SVG/CSS/JS**, không dùng ảnh cắt dán.
- Giữ đúng sequence: base → white buckle → red buckle → revolve → henshin.

Cách dùng:
1. Giải nén patch.
2. Chép đè các file vào project hiện tại.
3. Deploy lại.
4. Nếu còn cache cũ, hard refresh hoặc tăng version query ở nơi import.
