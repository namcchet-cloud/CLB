CLB NGHE THUAT - FIX KICH HOAT POSTER MODE / ZZZ PURPLE 1.0.1
================================================================
NGUYEN NHAN (xac minh voi nhanh main):
- css/poster-gallery.css VA js/features/poster-gallery.js da co.
- index.html CHUA nap hai file tren nen khong co nut Poster Mode.
- Day la tinh trang CHUA LIEN KET TAI NGUYEN, khong phai thieu file.

CACH NHANH NHAT TREN GITHUB (khong can Python):
1. Mo https://github.com/namcchet-cloud/CLB/edit/main/index.html
2. Tim </head> va chen ngay TRUOC no:
   <link rel="stylesheet" href="css/poster-gallery.css?v=1.0.1">
3. Tim </body> va chen ngay TRUOC no (sau js/data/content.js):
   <script type="module" src="js/features/poster-gallery.js?v=1.0.1"></script>
4. Commit changes vao main.
5. Mo https://namcchet-cloud.github.io/CLB/?gallery=poster#gallery
6. Neu thay giao dien cu, tai lai trang/thu cua so rieng tu. 

CACH TU DONG NEU CO THU MUC CLB TREN MAY TINH:
1. Dam bao repo CLB co du css/poster-gallery.css va js/features/poster-gallery.js.
2. Chay: python fix_gallery_mode.py /duong/dan/den/CLB
3. Chi commit index.html da sua, KHONG upload file .bak.

LUU Y:
- Khong can chinh sua JS/CSS hoac xoa du lieu web.
- Upload file fix_gallery_mode.py len GitHub khong tu chay script.
- Poster Mode la che do o muc GOC TRIEN LAM, khong thay toan bo website.
- Neu mat mang, Service Worker co the phuc hoi ban cu tu cache.
