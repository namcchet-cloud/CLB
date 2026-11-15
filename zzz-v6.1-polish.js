/**
 * ART CLUB / ZZZ V6.1 - print surfaces and viewport chrome.
 * Does not change galleries, music, mascot, or the classic interface.
 */
(() => {
  'use strict';
  if (window.ClubZZZPolish) return;
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  if (!header) return;
  const active = () => root.dataset.clbMode === 'zzz';
  const band = document.createElement('div');
  band.className = 'zz-v61-bottom-band';
  band.setAttribute('aria-hidden', 'true');
  band.innerHTML = `
    <span class="zz-v61-bottom-brand">ART CLUB / 005</span>
    <span class="zz-v61-bottom-section"></span>
    <span class="zz-v61-bottom-progress">
      <span class="zz-v61-bottom-percent">00%</span>
      <span class="zz-v61-bottom-bar"><i class="zz-v61-bottom-fill"></i></span>
    </span>`;
  document.body.append(band);
  const chapterEl = band.querySelector('.zz-v61-bottom-section');
  const percentEl = band.querySelector('.zz-v61-bottom-percent');
  const chapterIds = ['home', 'about', 'gallery', 'activities', 'playlist', 'join', 'contact'];
  const chapters = chapterIds.map(id => document.getElementById(id)).filter(Boolean);
  const names = {
    vi: {home:'TRANG ĐẦU', about:'VỀ CLB', gallery:'TÁC PHẨM', activities:'HOẠT ĐỘNG', playlist:'ÂM NHẠC', join:'THAM GIA', contact:'LIÊN HỆ'},
    en: {home:'HOME', about:'ABOUT', gallery:'GALLERY', activities:'ACTIVITIES', playlist:'MUSIC', join:'JOIN', contact:'CONTACT'}
  };
  let lastY = Math.max(0, window.scrollY);
  let ups = 0, downs = 0, frame = 0;
  const show = () => header.classList.add('zz-v61-header-show');
  const hide = () => header.classList.remove('zz-v61-header-show');
  function updateBand() {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = max ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    percentEl.textContent = `${String(Math.round(ratio * 100)).padStart(2, '0')}%`;
    band.style.setProperty('--zz-progress', ratio.toFixed(4));
    const marker = Math.max(0, window.innerHeight * .42);
    let current = chapters[0]?.id || 'home';
    for (const section of chapters) {
      if (section.getBoundingClientRect().top <= marker) current = section.id;
    }
    chapterEl.textContent = names[root.lang === 'en' ? 'en' : 'vi'][current] || 'ART CLUB';
  }
  function update() {
    frame = 0;
    const y = Math.max(0, window.scrollY);
    const delta = y - lastY;
    lastY = y;
    if (active()) {
      if (header.querySelector('.nav.open')) show();
      else if (delta < -1) {
        ups += -delta; downs = 0;
        if (ups >= 17) { show(); ups = 0; }
      } else if (delta > 1) {
        downs += delta; ups = 0;
        if (downs >= 13) { hide(); downs = 0; }
      }
    }
    updateBand();
  }
  function onScroll() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  function syncMode() {
    // Starting ZZZ always starts with the header retracted.
    hide(); ups = 0; downs = 0;
    lastY = Math.max(0, window.scrollY);
    updateBand();
  }
  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onScroll, {passive: true});
  window.addEventListener('pageshow', syncMode);
  window.addEventListener('clb:site-mode', syncMode);
  document.addEventListener('club:language', updateBand);
  // Reveal for keyboard traversal even while the visual header is retracted.
  header.addEventListener('focusin', show);
  // If somebody opens the compact menu, never retract it mid-interaction.
  header.querySelector('.menu-toggle')?.addEventListener('click', () => {
    if (active() && header.querySelector('.nav.open')) show();
  });
  syncMode();
  window.ClubZZZPolish = Object.freeze({refresh: syncMode});
})();
