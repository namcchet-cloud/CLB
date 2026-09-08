const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuToggle = $(".menu-toggle");
const nav = $(".nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
$$('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const copy = {
  vi: {
    navAbout:'Về CLB', navGallery:'Tác phẩm', navActivities:'Hoạt động', navMusic:'Âm nhạc', navContact:'Liên hệ',
    heroTitle:'VẼ ĐIỀU CẬU THẤY.<br><em>LÀM ĐIỀU CẬU MƠ.</em>', heroBody:'Một góc nhỏ ở Bảo Lộc, một khoảng trời cho ý tưởng. Cùng tụi mình vẽ, thử, khám phá và tạo nên những điều mang màu sắc của riêng cậu.', explore:'Khám phá tác phẩm', meetUs:'Gặp chúng tớ', mascotTitle:'Cáo nhà Art Club', mascotBody:'Một chiếc mascot hơi tinh nghịch, mê màu sắc, nhạc hay và luôn sẵn sàng kéo một ý tưởng nhỏ thành chuyện lớn.',
    aboutLabel:'CHÚNG TỚ LÀ AI?', aboutTitle:'Hơn một câu lạc bộ.<br><em>Một nơi để là cậu.</em>', aboutLead:'Chúng tớ tin rằng mỗi người đều có một cách riêng để kể câu chuyện của mình — bằng tranh, ảnh, thiết kế hoặc một ý tưởng chưa từng được thử.', aboutBody:'Art Club là nơi để cậu học hỏi, thử nghiệm, mắc lỗi, làm lại và cùng nhau tạo nên những thứ có ý nghĩa. Nghệ thuật không cần hoàn hảo. Chỉ cần bắt đầu.', value1Title:'Tự do thử', value1Body:'Thử những điều chưa từng thử.', value2Title:'Thoải mái sáng tạo', value2Body:'Biến ý tưởng thành hình hài.', value3Title:'Cùng nhau lớn lên', value3Body:'Gặp những người cùng nhịp.',
    galleryLabel:'GÓC TRIỂN LÃM', galleryTitle:'Một chút màu<br><em>của tụi mình.</em>', galleryBody:'Mỗi tác phẩm, một câu chuyện riêng. Những khung tranh được treo như một bức tường triển lãm nhỏ.', galleryHint:'Bấm vào một khung để xem tác phẩm lớn hơn.', activityLabel:'TỤI MÌNH LÀM GÌ?', activityTitle:'Không chỉ<br><em>ngồi vẽ.</em>', act1:'Cùng học kỹ thuật, màu sắc, bố cục và khám phá phong cách cá nhân.', act2:'Không đề bài. Không áp lực. Chỉ cần một cây bút và một ý tưởng.', act3:'Đưa những tác phẩm của thành viên đến gần hơn với mọi người.', act4:'Cùng thực hiện những dự án nghệ thuật và kết hợp với các CLB khác.',
    musicLabel:'GÓC ÂM NHẠC', musicTitle:'Một chút nhạc.<br><em>Một trời cảm hứng.</em>', musicBody:'Cho những buổi vẽ, làm project hay chỉ ngồi cạnh nhau. Bật playlist lên và để căn phòng có thêm một nhịp riêng.', joinLabel:'HẸN CẬU Ở ART CLUB', joinTitle:'Chỗ này còn thiếu<br><em>màu sắc của cậu.</em>', joinBody:'Cậu không cần phải là người vẽ giỏi nhất. Chỉ cần muốn học, muốn thử và muốn tạo ra điều gì đó cùng tụi mình.', joinButton:'Nhắn tụi mình để tham gia', contactLabel:'GIỮ KẾT NỐI', contactTitle:'Tìm chúng tớ<br><em>ở đây.</em>', contactBody:'Một tin nhắn, một email, hoặc ghé qua trường — tụi mình luôn vui khi gặp những người có cùng niềm yêu thích nghệ thuật.', footerLine:'Vẽ điều cậu thấy. Làm điều cậu mơ.'
  },
  en: {
    navAbout:'About', navGallery:'Gallery', navActivities:'Activities', navMusic:'Music', navContact:'Contact',
    heroTitle:'DRAW WHAT YOU SEE.<br><em>MAKE WHAT YOU DREAM.</em>', heroBody:'A little corner in Bảo Lộc with plenty of room for ideas. Draw, experiment, explore, and make something that feels unmistakably yours.', explore:'Explore the gallery', meetUs:'Meet the club', mascotTitle:'Meet our Art Club fox', mascotBody:'A playful mascot who loves color, good music, and turning a tiny idea into something unexpectedly big.',
    aboutLabel:'WHO ARE WE?', aboutTitle:'More than a club.<br><em>A place to be yourself.</em>', aboutLead:'We believe everyone has a different way to tell a story — through a painting, a photo, a design, or an idea nobody has tried yet.', aboutBody:'Art Club is where you can learn, experiment, make mistakes, start over, and create things that matter together. Art does not need perfection. It only needs a beginning.', value1Title:'Try freely', value1Body:'Try what you have never tried before.', value2Title:'Create comfortably', value2Body:'Give shape to an idea.', value3Title:'Grow together', value3Body:'Meet people on the same wavelength.',
    galleryLabel:'EXHIBITION WALL', galleryTitle:'A little color<br><em>from our world.</em>', galleryBody:'Every piece has its own story, pinned and hung like a small studio exhibition wall.', galleryHint:'Tap a frame to view the artwork.', activityLabel:'WHAT WE DO', activityTitle:'More than just<br><em>sitting and drawing.</em>', act1:'Learn techniques, color, composition and discover your own visual style.', act2:'No prompt. No pressure. Just a pen and an idea.', act3:'Bring member artworks closer to everyone.', act4:'Build creative projects together and collaborate with other clubs.',
    musicLabel:'MUSIC CORNER', musicTitle:'A little music.<br><em>A lot of inspiration.</em>', musicBody:'For drawing sessions, projects, or simply hanging out together. Put the playlist on and give the room its own rhythm.', joinLabel:'SEE YOU AT ART CLUB', joinTitle:'This place still needs<br><em>your color.</em>', joinBody:'You do not need to be the best artist in the room. You only need to want to learn, try and make something with us.', joinButton:'Message us to join', contactLabel:'STAY CONNECTED', contactTitle:'Find us<br><em>right here.</em>', contactBody:'Send a message, an email, or stop by school — we are always happy to meet people who love making things.', footerLine:'Draw what you see. Make what you dream.'
  }
};

let language = localStorage.getItem('artclub-lang') || 'vi';
function applyLanguage(lang){
  language = lang; localStorage.setItem('artclub-lang', lang); document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el => { const key = el.dataset.i18n; if(copy[lang][key]) el.textContent = copy[lang][key]; });
  $$('[data-i18n-html]').forEach(el => { const key = el.dataset.i18nHtml; if(copy[lang][key]) el.innerHTML = copy[lang][key]; });
  const current = $('.lang-current'); if(current) current.textContent = lang.toUpperCase();
}
$('.lang-toggle')?.addEventListener('click', () => applyLanguage(language === 'vi' ? 'en' : 'vi'));
applyLanguage(language);

const heroStage = $('.hero-stage');
const heroLogo = $('.hero-logo');
const mascotCard = $('.mascot-card');
function setMascot(open){
  heroStage?.classList.toggle('logo-open', open);
  heroLogo?.setAttribute('aria-expanded', String(open));
  mascotCard?.setAttribute('aria-hidden', String(!open));
}
heroLogo?.addEventListener('click', () => setMascot(!heroStage.classList.contains('logo-open')));
$('.mascot-close')?.addEventListener('click', e => { e.stopPropagation(); setMascot(false); });

const finePointer = matchMedia('(pointer:fine)').matches;
if(finePointer && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  $('[data-parallax-root]')?.addEventListener('pointermove', e => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - .5;
    const y = (e.clientY - box.top) / box.height - .5;
    $$('[data-depth]', e.currentTarget).forEach(el => {
      const d = Number(el.dataset.depth || .5);
      el.style.translate = `${x * 22 * d}px ${y * 18 * d}px`;
    });
  });
  $('[data-parallax-root]')?.addEventListener('pointerleave', e => $$('[data-depth]', e.currentTarget).forEach(el => el.style.translate='0 0'));
}

const artworks = [
  { image:'assets/logo-new.jpeg', category:'paintings', title:'Chú cáo của Art Club', author:'Art Club · THPT Bảo Lộc', description:'Mascot / 2026' },
];
const galleryGrid = $('#galleryGrid');
function cardTemplate(art,index){ return `<article class="gallery-card" data-category="${art.category}" data-index="${index}" tabindex="0" role="button" aria-label="Xem ${art.title}"><img src="${art.image}" alt="${art.title}" loading="lazy"><div class="gallery-info"><h3>${art.title}</h3><p>${art.author} · ${art.description}</p></div></article>`; }
function renderGallery(filter='all'){
  const items = artworks.filter(a => filter === 'all' || a.category === filter);
  if(items.length){ galleryGrid.innerHTML = items.map((art) => cardTemplate(art, artworks.indexOf(art))).join(''); }
  else { galleryGrid.innerHTML = `<article class="gallery-card placeholder-card"><div class="placeholder-art">MORE<br>ART<br>SOON!</div><div class="gallery-info"><h3>Coming soon</h3><p>Art Club · THPT Bảo Lộc</p></div></article>`; }
  $$('.gallery-card[data-index]',galleryGrid).forEach(card => {
    const open = () => openLightbox(artworks[Number(card.dataset.index)]);
    card.addEventListener('click',open); card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
  });
}
renderGallery();
$$('.filter').forEach(button => button.addEventListener('click',()=>{ $$('.filter').forEach(b=>b.classList.remove('active')); button.classList.add('active'); renderGallery(button.dataset.filter); }));

const lightbox = $('#lightbox'); const lightboxImage = $('#lightboxImage'); const lightboxCaption = $('#lightboxCaption');
function openLightbox(art){ if(!lightbox?.showModal) return; lightboxImage.src=art.image; lightboxImage.alt=art.title; lightboxCaption.textContent=`${art.title} — ${art.author}`; lightbox.showModal(); document.body.classList.add('no-scroll'); }
function closeLightbox(){ if(lightbox?.open) lightbox.close(); document.body.classList.remove('no-scroll'); }
$('.lightbox-close')?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',e=>{ if(e.target===lightbox) closeLightbox(); });
lightbox?.addEventListener('close',()=>document.body.classList.remove('no-scroll'));

const playVinyl = $('.play-vinyl'); const turntable = $('.turntable'); const vinyl = $('.vinyl');
playVinyl?.addEventListener('click',()=>{ const playing = turntable.classList.toggle('playing'); vinyl.classList.toggle('spinning',playing); playVinyl.setAttribute('aria-pressed',String(playing)); playVinyl.innerHTML = playing ? '<span>Ⅱ</span> STOP' : '<span>▶</span> SPIN'; });

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));
