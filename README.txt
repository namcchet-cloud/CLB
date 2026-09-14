
Boost Mark IX — Mechanical Rebuild v7.4

FILES
- index.html : bản demo chạy độc lập
- embed/raven-geats-mech-v74.js : file nhúng vào web
- embed/example.html : ví dụ nhúng tối giản

CÁCH GẮN VÀO WEB
1) copy thư mục embed vào web của bạn
2) thêm đoạn này vào trang:

<script src="./embed/raven-geats-mech-v74.js"></script>
<div id="geats-henshin"></div>
<script>
  window.RavenGeatsIXMech.mount('#geats-henshin', {
    title: 'Boost Mark IX — Mechanical Henshin',
    autoPlay: false
  });
</script>

ĐIỂM ĐÃ SIẾT
- buckle trái/phải đi vào theo nhịp lẫy gần cơ cấu toy hơn
- có nhịp latch riêng sau khi gắn đủ 2 buckle
- revolve có torque, overshoot và settle
- deploy bung theo nhóm gần trục hơn để giảm cảm giác cắt-ghép bay loạn
- khung hiển thị nhỏ lại để đỡ văng khỏi viewport
