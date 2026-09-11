# Nền mã nguồn v4

Website tĩnh, ES modules, không framework hay bundler bắt buộc. Không có service worker để tránh một lớp cache khó chẩn đoán. Ảnh gốc và nội dung vẫn dễ sửa trực tiếp.

```text
index.html                Bố cục + thẻ tranh dự phòng
content.js                Tác giả / tranh / playlist / link đăng ký
release.json              Phiên bản phát hành duy nhất
css/                      Tokens, site, music, effects
js/app.js                 Khởi động và nạp module khi cần
js/core/                  Lifecycle, i18n, ảnh, build
js/data/                  Chữ giao diện + danh mục ảnh nhỏ
js/features/gallery.js    Lọc theo tác giả/thể loại, lightbox
js/features/garden.js     Haruko: rễ, hoa, cánh rơi
js/features/akiko.js      UFO với mascot gốc
js/features/motion.js     Chế độ chuyển động, hover, reveal
js/features/navigation.js Menu, mascot đầu trang, nav
js/features/music/        index (UI), motor, spotify
assets/                   Gốc + optimized có tên chứa hash
```

## Khởi tạo

Giao diện cơ bản, menu và i18n nạp đầu tiên. Gallery/music chờ IntersectionObserver (vùng đệm 800px) hoặc focus. Bộ registry `start()` giữ một lần khởi tạo cho mỗi module. Nếu một module lỗi, hiện nút tải lại trang để thử lại các import bị lỗi; các phần còn lại không bị ẩn trong lúc chờ.

## Music

Trạng thái vật lý: `IN_SLEEVE -> DRAGGING -> SETTLING -> ON_TURNTABLE -> RETURNING`. Mỗi album chỉ có một node đĩa. Kéo là chuyển node đó, không nhân bản. Của sổ kéo dùng pointer capture và AbortController để dọn listener. Cùng biến kích thước đĩa ở bìa và trên mâm; không phóng đại đĩa khi đặt xuống. Hình học của thân máy/cần kim được giữ lại.

Spotify được quản lý bằng revision token: sự kiện từ controller cũ không được đổi trạng thái album mới. Motor chỉ bật trạng thái phát khi nhận sự kiện thật từ controller. Khi kết nối lỗi hoặc bị chặn phát, hiện hướng dẫn/nút Spotify; không giả vờ nhạc đang chạy.

`mv3-*` trong tên class là tên giao diện được giữ để tránh lệch hình; nó không có nghĩa trang vẫn nạp bundle v3 cũ.

## Cache và phát hành

`tools/release.mjs` đồng bộ `?v=` cho HTML, static import, dynamic import và CSS nạp động. Ảnh thumbnail có hash nội dung trong tên. Mỗi lần sửa code/nội dung cần phát hành phiên bản mới thay vì đổ lỗi chung chung cho cache trình duyệt.
