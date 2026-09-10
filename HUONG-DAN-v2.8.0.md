# CLB Nghệ thuật — v2.8.0 Music Module Rebuild

Bản này dựng lại riêng phần album/đĩa thay vì tiếp tục vá CSS cũ.

## Lỗi gốc đã phát hiện
- v2.7.7 vẫn nạp `style.css`, `script.js`, `content.js` bằng cache key 2.7.6 và `ClubBuild` vẫn là 2.7.6.
- Đĩa nằm bên trong button bìa, chịu nhiều stacking-context/z-index/overflow rule chồng nhau từ các bản vá 2.7.1–2.7.7.
- Nhiều rule cũ cùng điều khiển `.album-pocket-record`, gồm opacity, z-index, clip-path và transform trái ngược nhau.

## Cách sửa v2.8.0
- Mỗi album dùng `.album-slot` riêng.
- Bìa và đĩa là hai phần tử anh em (sibling), không còn lồng đĩa trong button bìa.
- Đĩa được hiển thị độc lập phía sau bìa và nhô ra ngoài; khi album được chọn, đĩa nhận pointer events trực tiếp.
- Kéo đĩa vẫn dùng đúng phần tử hiển thị làm điểm xuất phát.
- Đĩa trong album, ghost khi kéo và carrier trên mâm dùng cùng biến `--physical-disc-size`.
- Cache/version đồng bộ hoàn toàn về 2.8.0.

## Cập nhật GitHub
Ghi đè cùng lúc: `index.html`, `style.css`, `script.js`, `content.js`.
Giữ nguyên `assets/`.
