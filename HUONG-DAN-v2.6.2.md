# CLB Nghệ thuật v2.6.2

Bản vá này sửa lỗi module âm nhạc sau khi bỏ Lyrics, đồng bộ build 2.6.2, làm lại thực vật của Haruko và hiệu ứng thay đĩa.

## Cập nhật GitHub
Ghi đè cùng lúc 4 tệp ở thư mục gốc repository:
- index.html
- style.css
- script.js
- content.js

Giữ nguyên toàn bộ thư mục assets/ hiện có.

Sau khi GitHub Pages deploy xong, mở bảng Chuyển động. Dòng build phải hiện:
`v2.6.2 · HTML + CSS + JavaScript ✓`

## Thay đổi
- Tử đằng chỉ xuất hiện khi Gallery Haruko thực sự nằm trong viewport và tự tắt khi cuộn qua.
- Dây leo được phép tràn khỏi biên section và khung tranh; thêm các nhánh dài không đều để giảm cảm giác lặp.
- Hoa đa dạng hơn (tử đằng, sakura, rose, lilac, hoa trắng), có độ sáng/tối và lớp cánh chi tiết hơn.
- Khu âm nhạc dùng lại phần diện tích trước đây của Lyrics; danh sách đĩa kéo dài theo máy đĩa.
- Khi đổi playlist, một bao album bay tới máy; đĩa từ từ trượt ra khỏi bao rồi hạ xuống mâm. Chọn đĩa không tự phát nhạc; chỉ khi bấm Play và Spotify xác nhận phát thì mâm bắt đầu quay.
- Akiko dùng đĩa bay (UFO) thay cho tên lửa, vẫn giữ nguyên ảnh mascot đã có.
- Xóa module Lyrics cũ khỏi bundle để không còn lỗi js/player.js do các phần tử Lyrics đã bị xóa.
