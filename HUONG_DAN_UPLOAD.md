# CLB ZZZ V6.1 - FIX KICH HOAT (main branch)

## Nguyen nhan da kiem tra
- index.html dang nap `css/zzz-v6.1-polish.css?v=6.1.0` va `js/features/zzz-v6.1-polish.js?v=6.1.0`.
- Nhung tren GitHub repo `namcchet-cloud/CLB` (main) ca hai file nay deu 404 (khong ton tai).
- sw.js da liet ke hai file trong CORE, vi vay precache Service Worker co the that bai.
- Ban CSS truoc con tham chieu `assets/optimized/paper-grain.png`, nhung anh nay khong co tren repo. Ban nay dung texture CSS noi bo, khong can them assets.

## Cai dat: chi upload 2 file, KHONG ghi de index.html hoac sw.js
1. Giai nen ZIP.
2. Tren GitHub mo `namcchet-cloud/CLB` -> `css` -> `Add file` -> `Upload files`.
   Chon CHINH file `css/zzz-v6.1-polish.css` trong may, commit.
3. Quay ve repo -> `js` -> `features` -> `Add file` -> `Upload files`.
   Chon CHINH file `js/features/zzz-v6.1-polish.js` trong may, commit.
4. KHONG upload ca ZIP hoac thu muc `css/` vao `css/` (neu khong se thanh `css/css`).
5. Xac minh ca hai dia chi nay mo ra NOI DUNG TEXT (khong phai 404):
   https://github.com/namcchet-cloud/CLB/blob/main/css/zzz-v6.1-polish.css
   https://github.com/namcchet-cloud/CLB/blob/main/js/features/zzz-v6.1-polish.js
6. Sau khi GitHub Pages cap nhat, mo trang: https://namcchet-cloud.github.io/CLB/?mode=zzz
   Tren iPhone neu thay trang cu, mo trong tab rieng va tai lai, hoac xoa du lieu trang web GitHub Pages neu van bi cache cu.

## Ket qua mong doi
- Hieu ung giay khong phu ca trang; logo goc, nut bam, anh tac pham khong bi lop noi tren.
- Mang xanh nen hero co hinh khoi hoan chinh tren mobile va desktop.
- Thanh den thong tin/ti le cuon hien co dinh o day viewport trong ZZZ mode.
- Header an luc vao ZZZ, keo xuong thi an, keo len thi hien.
- Classic mode, gallery, audio, mascot va cac tinh nang cu khong doi.

## Luu y
Ban ZIP nay khong tu dong ghi len GitHub. Chu nghia hoan thanh khi hai file xuat hien trong repository va duoc GitHub Pages phuc vu. Neu `index.html` sau nay thay doi, can kiem tra xem no con nap hai URL tren hay khong.
