/**
 * CLB ART CLUB | MASCOT MANUAL EDITION 3.0
 * A reversible, additive theme. It does not replace any classic functionality.
 * Uses the OFFICIAL Art Club fox artwork, not any game characters or assets.
 */
(() => {
  'use strict';
  if (window.ClubZZZMode) return;
  const root = document.documentElement;
  const KEY = 'clb:whole-site-mode:v2'; // keep preference from the previous edition
  const chapters = ['home', 'about', 'gallery', 'activities', 'playlist', 'join', 'contact'];
  const strings = {
    vi: { mode: 'CHẾ ĐỘ ZZZ', on: 'ĐANG BẬT', off: 'BẬT MODE',
      ariaOn: 'Về giao diện CLB gốc', ariaOff: 'Bật ấn bản poster toàn trang',
      issue: 'ART CLUB / ISSUE 05 / EDITORIAL MANUAL',
      subtitle: 'CLB NGHỆ THUẬT',
      poster: 'NHÂN VẬT ĐẠI DIỆN',
      chapter: 'Ấn bản nghệ thuật 2026', fox: 'CÁO NGHỆ THUẬT',
      album: 'ART CLUB / ARTWORK ARCHIVE',
      footer: 'VISUAL SYSTEM / BẢO LỘC / 2026',
      rail: ['TRANG ĐẦU','VỀ CLB','TÁC PHẨM','HOẠT ĐỘNG','ÂM NHẠC','THAM GIA','LIÊN HỆ'] },
    en: { mode: 'ZZZ MODE', on: 'ENABLED', off: 'TURN ON',
      ariaOn: 'Return to the original Art Club website', ariaOff: 'Turn on the full-page poster edition',
      issue: 'ART CLUB / ISSUE 05 / EDITORIAL MANUAL',
      subtitle: 'ART CLUB / BAO LOC', poster: 'OFFICIAL MASCOT', chapter: 'Art edition 2026',
      fox: 'ART CLUB FOX', album: 'ART CLUB / ARTWORK ARCHIVE',
      footer: 'VISUAL SYSTEM / BAO LOC / 2026',
      rail: ['HOME','ABOUT','ART','ACTIVITIES','MUSIC','JOIN','CONTACT'] }
  };
  const lang = () => root.lang === 'en' ? 'en' : 'vi';
  const copy = () => strings[lang()];
  const q = (selector, scope = document) => scope.querySelector(selector);
  const header = q('.header-actions');
  const hero = q('#home');
  if (!header || !hero) return;
  const prefersReduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches ||
    ['off', 'quiet'].includes(root.dataset.motionChoice);
  let transitioning = false;
  let galleryWasPoster = false;
  let nextFrame = 0;

  const modeButton = document.createElement('button');
  modeButton.className = 'zz-mode-toggle';
  modeButton.id = 'zzModeToggle';
  modeButton.type = 'button';
  modeButton.innerHTML = '<span class="zz-toggle-symbol" aria-hidden="true">✦</span><span class="zz-toggle-title"></span><span class="zz-toggle-chip"></span><span class="zz-toggle-track" aria-hidden="true"><i></i></span>';
  const languageSwitch = q('.lang-toggle', header);
  if (languageSwitch) header.insertBefore(modeButton, languageSwitch);
  else header.append(modeButton);

  const wipe = document.createElement('div');
  wipe.className = 'zz-page-wipe';
  wipe.setAttribute('aria-hidden', 'true');
  wipe.innerHTML = '<strong>ART CLUB / NEW ISSUE</strong>';
  document.body.append(wipe);

  // Character-manual masthead uses actual HTML text, not a flattened image.
  const heroCopy = q('.hero-copy', hero);
  const heroStage = q('.hero-stage', hero);
  if (heroCopy) {
    const masthead = document.createElement('div');
    masthead.className = 'zz-masthead';
    masthead.dataset.zzText = 'issue';
    const wordmark = document.createElement('div');
    wordmark.className = 'zz-manual-index';
    wordmark.innerHTML = '<div class="zz-wordmark" role="img" aria-label="ART CLUB"><img class="zz-wordmark-svg" src="assets/zzz-v4/wordmark-art-club.svg?v=6.0.0" alt="" /></div><strong class="zz-manual-subtitle" data-zz-text="subtitle"></strong>';
    heroCopy.prepend(wordmark);
    heroCopy.prepend(masthead);
  }
  if (heroStage) {
    const label = document.createElement('span'); label.className = 'zz-stage-label'; label.dataset.zzText = 'fox';
    const note = document.createElement('span'); note.className = 'zz-stage-note'; note.dataset.zzText = 'poster';
    heroStage.append(label, note);
  }
  function artFigure(cls, image, alt, caption) {
    const figure = document.createElement('figure');
    figure.className = cls;
    const img = document.createElement('img');
    img.src = image; img.alt = alt; img.loading = 'lazy'; img.decoding = 'async';
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = caption;
    figure.append(img, figcaption);
    return figure;
  }
  // Profile and back-cover repeat the official brand identity intentionally.
  q('.about-grid')?.append(artFigure('zz-school-figure',
    'assets/optimized/logo-new-640-db642e82.webp', 'Logo cáo cam mắt xanh của CLB Nghệ thuật THPT Bảo Lộc', 'ART CLUB / FOX 001'));
  q('#join')?.append(artFigure('zz-fox-figure',
    'assets/optimized/logo-new-640-db642e82.webp', 'Linh vật cáo của CLB Nghệ thuật', 'OFFICIAL MASCOT'));
  q('#activities .activity-grid')?.querySelectorAll('.activity-card').forEach((card, index) => {
    const keys = ['workshop', 'free-drawing', 'exhibition', 'project'];
    const prop = document.createElement('img');
    prop.className = 'zz-activity-prop';
    prop.src = `assets/zzz-v2/props/${keys[index] || 'project'}.svg`;
    prop.alt = ''; prop.setAttribute('aria-hidden', 'true');
    prop.loading = 'lazy'; prop.decoding = 'async';
    card.append(prop);
  });
  q('#playlist .music-top')?.append(artFigure('zz-music-figure',
    'assets/zzz-v2/music-vinyl.webp', 'Minh họa đĩa nhạc và tai nghe', 'ART & SOUND / ST.03'));
  const footerIndex = document.createElement('div');
  footerIndex.className = 'zz-edition-index';
  footerIndex.innerHTML = '<span>ART CLUB / EDITORIAL MANUAL</span><span data-zz-text="footer"></span><span>ISSUE NO. 005</span>';
  q('.footer')?.prepend(footerIndex);

  const observed = document.querySelectorAll('#main > section, #about .values article, #activities .activity-card');
  const appear = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) entry.target.classList.add('zz-visible');
  }, { threshold: .04, rootMargin: '0px 0px 95px 0px' }) : null;
  observed.forEach(el => {
    el.classList.add('zz-watch');
    if (appear) appear.observe(el); else el.classList.add('zz-visible');
  });
  // The mini gallery's local switch remains available only in Classic.
  function syncGallery(isPosterEdition) {
    const classicGrid = q('#gallery [data-pg-mode="grid"]');
    const separatePoster = q('#gallery [data-pg-mode="poster"]');
    if (!classicGrid || !separatePoster) return;
    if (isPosterEdition) {
      if (separatePoster.getAttribute('aria-pressed') === 'true') {
        galleryWasPoster = true;
        classicGrid.click();
      }
    } else if (galleryWasPoster) {
      galleryWasPoster = false;
      separatePoster.click();
    }
  }
  document.addEventListener('club:gallery-ready', () => syncGallery(root.dataset.clbMode === 'zzz'));
  const gallery = q('#gallery');
  if (gallery && 'MutationObserver' in window) {
    const observer = new MutationObserver(() => {
      if (root.dataset.clbMode === 'zzz') syncGallery(true);
    });
    observer.observe(gallery, { childList: true });
    addEventListener('pagehide', () => observer.disconnect(), { once: true });
  }
  function applyCopy() {
    const t = copy(); const enabled = root.dataset.clbMode === 'zzz';
    q('.zz-toggle-title', modeButton).textContent = t.mode;
    q('.zz-toggle-chip', modeButton).textContent = enabled ? t.on : t.off;
    modeButton.setAttribute('aria-label', enabled ? t.ariaOn : t.ariaOff);
    modeButton.setAttribute('aria-pressed', String(enabled));
    document.querySelectorAll('[data-zz-text]').forEach(el => {
      el.textContent = t[el.dataset.zzText] || '';
    });
  }
  function setTheme(next, {save = true, url = true} = {}) {
    root.dataset.clbMode = next;
    if (save) try { localStorage.setItem(KEY, next); } catch { /* optional */ }
    if (url) {
      const u = new URL(location.href);
      if (next === 'zzz') u.searchParams.set('mode','zzz');
      else u.searchParams.delete('mode');
      try { history.replaceState(history.state, '', u.pathname + u.search + u.hash); } catch {}
    }
    applyCopy(); syncGallery(next === 'zzz');
    window.dispatchEvent(new CustomEvent('clb:site-mode', {detail: {mode:next}}));
  }
  function switchTheme(next, {animate = true} = {}) {
    const desired = next === 'zzz' ? 'zzz' : 'classic';
    if (root.dataset.clbMode === desired || transitioning) return;
    if (!animate || prefersReduced()) { setTheme(desired); return; }
    transitioning = true;
    wipe.classList.remove('zz-wipe-run');
    void wipe.offsetWidth;
    wipe.classList.add('zz-wipe-run');
    setTimeout(() => setTheme(desired), 270);
    setTimeout(() => { wipe.classList.remove('zz-wipe-run'); transitioning = false; }, 680);
  }
  modeButton.addEventListener('click', () => switchTheme(root.dataset.clbMode === 'zzz' ? 'classic' : 'zzz'));
  document.addEventListener('club:language', applyCopy);

  if (heroStage) {
    heroStage.addEventListener('pointermove', event => {
      if (root.dataset.clbMode !== 'zzz' || prefersReduced() || event.pointerType !== 'mouse') return;
      const b = heroStage.getBoundingClientRect();
      const x = (event.clientX - b.left) / b.width - .5;
      const y = (event.clientY - b.top) / b.height - .5;
      cancelAnimationFrame(nextFrame);
      nextFrame = requestAnimationFrame(() => {
        heroStage.style.setProperty('--zz-shift-x', `${(x * -12).toFixed(1)}px`);
        heroStage.style.setProperty('--zz-shift-y', `${(y * -8).toFixed(1)}px`);
      });
    }, {passive:true});
    heroStage.addEventListener('pointerleave', () => {
      heroStage.style.removeProperty('--zz-shift-x');
      heroStage.style.removeProperty('--zz-shift-y');
    });
  }
  const query = new URLSearchParams(location.search).get('mode');
  const initial = query === 'zzz' ? 'zzz' : query === 'classic' ? 'classic' :
    (root.dataset.clbMode === 'zzz' ? 'zzz' : 'classic');
  setTheme(initial, {save:false,url:false});
  window.ClubZZZMode = Object.freeze({setMode: switchTheme, get mode(){return root.dataset.clbMode;}});
})();
