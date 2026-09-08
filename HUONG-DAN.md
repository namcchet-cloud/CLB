# Hướng dẫn cập nhật · Comic Studio 2.1

## 1. Thay bản đang chạy

Sao lưu kho hiện tại trước. Giải nén gói mới; bên trong đã có `index.html` ngay ở cấp ngoài cùng.

Chép `index.html`, `style.css`, `script.js`, `content.js`, thư mục `js/`, các ảnh trong `assets/`, thư mục `lyrics/` và `.nojekyll` vào **đúng thư mục xuất bản đang dùng**. Không đổi cấu hình xuất bản nếu bản cũ đã hoạt động. Giữ nguyên `CNAME`, `.github/` và những tài nguyên không có trong ZIP này.

Nếu đã tự thêm tác phẩm: giữ ảnh trong `gallery/` và đưa các mục từ mảng `artworks` của `script.js` cũ sang `artworks` trong `content.js` mới. Dạng chuỗi cũ vẫn được hỗ trợ; dùng `{ vi: "...", en: "..." }` để có tên riêng ở mỗi ngôn ngữ.

Commit/push rồi mở lại website. Khi trình duyệt vẫn hiển thị bản cũ, tải lại trang hoặc thử cửa sổ riêng tư. HTML đã gắn `?v=2.1` vào CSS/JS để giảm việc dùng nhầm bản trong bộ nhớ đệm.

Đây là bản bàn giao mã nguồn; nó không tự ghi vào kho GitHub, không thay đổi cấu hình tên miền và không can thiệp dữ liệu của website đã triển khai.

## 2. Cách dùng phần nhạc

Chọn một trong hai đĩa, rồi bấm **Phát nhạc** hoặc bấm lên mặt đĩa. Bấm lại để tạm dừng. Chọn đĩa khác sẽ dừng trình phát cũ, đổi ảnh, màu và playlist; không tự phát đĩa mới.

- **Đĩa 01:** playlist `4l15Ccxw8hVu7YIpUU6QM0`, tâm đĩa là logo CLB.
- **Đĩa 02:** playlist `2Uj1N5MlAVfIf0XkSVQSWi`, màu hồng, tâm đĩa là ảnh đã gửi.
- “Góc sáng tạo” và “Mơ một chút” là nhãn thiết kế trên website, không phải tên playlist được xác minh từ Spotify. Tên và danh sách chính thức hiển thị trong khung Spotify.
- Liên kết **Mở trên Spotify** thay đổi theo đĩa đang chọn. Mở ứng dụng Spotify là một luồng riêng; website không theo dõi âm thanh trong ứng dụng đó.

Điều khiển gửi lệnh đến Spotify iFrame API chính thức. Hoạt ảnh quay đĩa và trạng thái phát phụ thuộc phản hồi từ Spotify. Khi nhạc đệm/bị tạm dừng, hoặc trang được cuộn khỏi khu vực máy đĩa, hoạt ảnh có thể dừng; tắt chuyển động không tắt nhạc.

**Khi bấm mà chưa nghe thấy:** chờ trình phát tải xong, rồi bấm Play ngay trong khung Spotify bên dưới máy đĩa. Trình duyệt có thể cần thao tác này để cho phép phát. Nếu chỉ nghe một đoạn ngắn, dùng nút mở trên Spotify; website không vượt giới hạn bản nghe thử. [Tài liệu điều khiển Spotify][1] và [xử lý lỗi Embed][2] giải thích các giới hạn này.

Nếu API không tải được, trang chuyển sang iframe nhúng trực tiếp và hiện thông báo. Trong chế độ dự phòng đó, nút Play **trong khung Spotify** là điều khiển cần dùng; máy đĩa không giả vờ đã nhận được trạng thái phát.

## 3. Lời bài hát: cách hoạt động và khi cần chọn lại

Spotify Embed cung cấp mã bài, vị trí và trạng thái phát; tài liệu của API này không có trường lời bài hát. Vì vậy phần lời được lấy riêng từ **LRCLIB**, hoặc từ `.lrc` do chủ website/người xem cung cấp. [Nguồn LRCLIB][3]

Luồng mặc định:

1. Nhận mã bài từ Spotify khi bài bắt đầu/thay đổi.
2. Thử lấy tên bài từ Spotify oEmbed. Dịch vụ này không bảo đảm có thông tin nghệ sĩ; khi không lấy được tên, dùng phần tìm thủ công.
3. Tìm trên LRCLIB theo tên bài, nghệ sĩ nếu biết, rồi đối chiếu thời lượng.
4. Chỉ tự chọn khi tên/thời lượng phù hợp và các kết quả phù hợp thuộc cùng một nghệ sĩ. Trang vẫn ghi rõ đây là kết quả đối chiếu, không phải xác minh danh tính tuyệt đối.
5. Nếu có nhiều bản phù hợp, người xem chọn bản đúng. Lựa chọn được nhớ theo mã bài Spotify trên trình duyệt đó.
6. Khi có mốc LRC và thời lượng phù hợp, dòng đang hát được tô nổi, khung lời cuộn theo. Lời không có mốc được trình bày ở chế độ đọc.

**Không bảo đảm có lời cho tất cả bài.** Bản live, remix, sped-up, remaster hoặc hai bản thu gần bằng thời lượng vẫn có thể khiến kết quả ghép sai. Mở **Tìm lại lời / Thêm file .lrc**, nhập cả tên bài và nghệ sĩ, rồi chọn đúng kết quả.

Nếu nguồn trả bản nghe thử ngắn hoặc thời lượng khác đáng kể so với lời, trang tắt đồng bộ và dùng chế độ đọc, tránh chạy sai dòng. Không thể suy ra vị trí thật của một đoạn nghe thử chỉ từ số giây của đoạn đó.

Nếu bị chặn mạng/CORS, hết thời gian chờ hoặc dịch vụ giới hạn lượt gọi, trang báo trạng thái và giữ các cách dùng dự phòng. Không gửi yêu cầu tìm cả playlist cùng lúc. `Retry-After` được tôn trọng khi nhận mã 429.

### Nhập `.lrc` ngay trên website

Phát bài cần ghép trước, mở **Tìm lại lời / Thêm file .lrc**, rồi chọn file. Chấp nhận `.lrc` dưới 200.000 byte, có mốc như `[00:05.20]`.

File được đọc bằng trình duyệt, không gửi lên máy chủ website hay LRCLIB. Nội dung ghép được lưu cục bộ cho tối đa 12 bài gần nhất. Việc xóa dữ liệu trình duyệt, dùng cửa sổ riêng tư hoặc chặn lưu trữ có thể khiến lựa chọn không còn sau lần truy cập đó.

Nút **Xóa lời đã ghép cho bài này** xóa phần lưu riêng của trình duyệt. Nó không xóa file trong kho GitHub và không xóa dữ liệu của LRCLIB.

### Đặt `.lrc` trong kho để mọi người cùng dùng

Chỉ dùng lời do CLB sáng tác hoặc có quyền chia sẻ. Gói này **không chứa lời thật của các bài trong playlist**.

Đặt file vào `lyrics/`, rồi khai báo tại `content.js`, thay phần `tracks: {}` bằng cấu hình tương tự:

```js
tracks: {
  "spotify:track:MA_BAI_HAT_THAT": {
    title: "Tên bài hát",
    artist: "Tên nghệ sĩ",
    lrc: "lyrics/ten-bai-hat.lrc"
  }
}
```

`MA_BAI_HAT_THAT` là phần mã sau `/track/` của liên kết bài Spotify, không phải mã playlist. Đây là chỗ trống minh họa và phải thay bằng mã thật. File LRC dùng đường dẫn tương đối, cùng website.

Một lựa chọn khác là khai báo `lrclibId` với ID kết quả LRCLIB đã kiểm tra. Không cần dán lời vào JavaScript:

```js
tracks: {
  "spotify:track:MA_BAI_HAT_THAT": {
    title: "Tên bài hát",
    artist: "Tên nghệ sĩ",
    lrclibId: 123
  }
}
```

Số `123` ở đây chỉ minh họa cấu trúc, **không phải ID đã ghép cho playlist này**. Không chép nguyên ví dụ mà chưa thay thông tin. Lựa chọn riêng đã lưu trong trình duyệt ưu tiên trước cấu hình chung; dùng nút xóa lời đã ghép để quay về cấu hình kho khi cần.

`onlineSearch: false` tắt chức năng tìm trực tuyến theo tên. Một ghép LRCLIB bằng ID đã lưu/khai báo vẫn có thể gọi LRCLIB; dùng file `.lrc` cùng website và xóa ghép trực tuyến khi cần tránh nguồn đó hoàn toàn.

## 4. Đổi đĩa, hình và form

Mở `content.js`. `records` chứa hai đĩa:

```js
{
  id: "pink",
  name: { vi: "Mơ một chút", en: "A little daydream" },
  caption: { vi: "ĐĨA 02 · HỒNG MỘNG MƠ", en: "SIDE 02 · PINK DAYDREAM" },
  theme: "pink",
  image: "assets/disc-pink.jpeg",
  spotifyUrl: "https://open.spotify.com/playlist/2Uj1N5MlAVfIf0XkSVQSWi",
  uri: "spotify:playlist:2Uj1N5MlAVfIf0XkSVQSWi"
}
```

Đổi playlist thì sửa cả `spotifyUrl` và `uri` để cùng một mã. Dùng URL gọn, không cần các tham số chia sẻ `si`, `pi`, `utm_source`. Dùng `theme: "green"` hoặc `"pink"` cho hai bảng màu hiện có.

Ảnh tâm đĩa là tài nguyên của website; không tải, cắt hoặc xoay ảnh bìa do Spotify cung cấp. Ảnh gốc gửi kèm được giữ nguyên, chỉ hiển thị bên trong mặt nạ tròn bằng CSS.

`joinUrl` đã là:

```text
https://forms.gle/kwnmuuC9N77aHMzGA
```

Hai nút tham gia chính đọc chung giá trị này. URL có sẵn trong HTML để vẫn hoạt động trước lúc JavaScript tải.

## 5. Thêm tác phẩm mà không sửa bố cục

Chép ảnh vào một thư mục `gallery/`, rồi thêm một mục trong `artworks` tại `content.js`:

```js
{
  image: "gallery/paintings/ten-anh.jpg",
  category: "paintings",
  title: { vi: "Tên tác phẩm", en: "Artwork title" },
  author: { vi: "Tên tác giả", en: "Artist name" },
  description: { vi: "Chất liệu / Năm", en: "Medium / Year" }
}
```

Nhóm hỗ trợ: `paintings`, `digital-art`, `photography`, `events`. Đường dẫn và tên tệp phải đúng chữ hoa/thường. Thêm ảnh vào thư mục thôi chưa làm ảnh xuất hiện: cần thêm mục cấu hình tương ứng.

Bản này không tự tạo hệ thống đăng nhập/quản trị hoặc tải ảnh lên máy chủ. Nó kế thừa cách dùng website tĩnh của gói Comic Refresh.

## 6. Chữ và chuyển động

**Barlow Condensed** tạo nhịp tiêu đề comic; **Fraunces** cho phần giới thiệu, triển lãm và âm nhạc; **DM Sans** cho nội dung, điều khiển và liên hệ. Chữ nghiêng, độ đậm, cỡ chữ và màu thay đổi theo khu vực thay vì dùng nhiều họ font.

Font tải từ Google Fonts khi có mạng; nếu không tải được sẽ dùng font dự phòng. Không có tệp font trong gói.

Bấm **Chuyển động: Bật/Tắt** ở cuối trang để đổi. Khi thiết bị bật “giảm chuyển động”, trang ưu tiên lựa chọn đó. Không có hiệu ứng chớp nhanh hoặc âm thanh tự phát khi vừa mở trang. Trên thiết bị cảm ứng, chuyển động nền nhẹ theo cuộn; không yêu cầu quyền con quay hồi chuyển.

## 7. Sau khi cập nhật, kiểm tra thật trên thiết bị

Kiểm tra hai ngôn ngữ, hai nút form, mascot, đổi đĩa, Play/Pause trong máy và trong iframe, đổi bài trong playlist, khung lời, tìm lại lời và file LRC. Kiểm tra một lượt trên máy tính và trên điện thoại đang dùng.

Gói đã qua kiểm thử giao diện/logic bằng Chromium với dữ liệu API giả lập. **Chưa xác minh phát âm thanh thực tế, trạng thái tài khoản Spotify, CORS của dịch vụ lời, hay iOS Safari trên website GitHub đã triển khai.** Chi tiết ở `KIEM-THU.md`.

Không đặt mật khẩu, Spotify Client Secret hoặc mã truy cập riêng trong các tệp tĩnh. Bản này không cần các khóa đó.

## Tài liệu API tham khảo

[1]: https://developer.spotify.com/documentation/embeds/references/iframe-api
[2]: https://developer.spotify.com/documentation/embeds/tutorials/troubleshooting
[3]: https://github.com/tranxuanthang/lrclib/blob/main/README.md

- [Spotify iFrame API][1]: phương thức, sự kiện và giới hạn tương tác.
- [Spotify Embed troubleshooting][2]: bản nghe thử và quyền encrypted-media.
- [LRCLIB][3]: dịch vụ tìm lời có đồng bộ.
- Tài liệu LRCLIB: https://lrclib.net/docs
- Spotify oEmbed: https://developer.spotify.com/documentation/embeds/reference/oembed
