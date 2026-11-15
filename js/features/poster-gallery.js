/**
 * ART CLUB / POSTER GALLERY - PURPLE EDITION
 * A progressive-enhancement display mode for /CLB/#gallery.
 * No framework, network calls, third-party fonts, or new artwork assets.
 * Source of truth: window.CLUB_CONTENT from js/data/content.js.
 */

const LABELS = {
  vi: {
    switchLabel: 'Ch\u1ebf \u0111\u1ed9 xem tri\u1ec3n l\u00e3m',
    grid: 'Th\u01b0 vi\u1ec7n', poster: 'Poster Mode',
    guide: 'Ch\u1ecdn tranh \u0111\u1ec3 kh\u00e1m ph\u00e1',
    small: 'M\u1ed9t tri\u1ec3n l\u00e3m nh\u1ecf. M\u1ed9t th\u1ebf gi\u1edbi s\u00e1ng t\u1ea1o l\u1edbn.',
    by: 'T\u00c1C GI\u1ea2', kind: 'TH\u1ec2 LO\u1ea0I',
    info: 'TH\u00d4NG TIN T\u00c1C PH\u1ea8M', detail: 'XEM T\u00c1C PH\u1ea8M',
    previous: 'T\u00e1c ph\u1ea9m tr\u01b0\u1edbc', next: 'T\u00e1c ph\u1ea9m ti\u1ebfp theo',
    close: '\u0110\u00f3ng', empty: 'Ch\u01b0a c\u00f3 t\u00e1c ph\u1ea9m ph\u00f9 h\u1ee3p v\u1edbi b\u1ed9 l\u1ecdc n\u00e0y.',
    fail: 'Kh\u00f4ng th\u1ec3 t\u1ea3i \u1ea3nh t\u00e1c ph\u1ea9m.',
    counter: 'T\u00e1c ph\u1ea9m', copyright: 'B\u1ea3n quy\u1ec1n thu\u1ed9c v\u1ec1 t\u00e1c gi\u1ea3.',
    thumbnail: 'Ch\u1ecdn t\u00e1c ph\u1ea9m',
    intro: 'T\u00e1c ph\u1ea9m c\u1ee7a CLB Ngh\u1ec7 thu\u1eadt THPT B\u1ea3o L\u1ed9c',
    display: 'CH\u1ebe \u0110\u1ed8 TRI\u1ec2N L\u00c3M',
    highlight: 'T\u00c1C PH\u1ea8M N\u1ed4I B\u1eacT',
    hint: 'D\u00f9ng ph\u00edm m\u0169i t\u00ean ho\u1eb7c vu\u1ed1t \u0111\u1ec3 chuy\u1ec3n tranh.',
    volume: 'B\u1ed8 S\u01afU T\u1eacP', work: 'T\u00c1C PH\u1ea8M',
    categories: { all: 'T\u1ea5t c\u1ea3', paintings: 'H\u1ed9i h\u1ecda', 'digital-art': 'Digital art', photography: 'Nhi\u1ebfp \u1ea3nh', events: 'Ho\u1ea1t \u0111\u1ed9ng' }
  },
  en: {
    switchLabel: 'Gallery display mode', grid: 'Gallery', poster: 'Poster Mode',
    guide: 'Choose a piece to explore', small: 'A small exhibition. A big creative world.',
    by: 'ARTIST', kind: 'CATEGORY', info: 'ARTWORK INFORMATION', detail: 'VIEW ARTWORK',
    previous: 'Previous artwork', next: 'Next artwork', close: 'Close',
    empty: 'No artworks match this filter.', fail: 'Could not load artwork.',
    counter: 'Artwork', copyright: 'Copyright belongs to each artist.',
    thumbnail: 'Select artwork', intro: 'Art Club Bao Loc High School member artworks',
    display: 'POSTER EXHIBITION MODE', highlight: 'FEATURED ARTWORK',
    hint: 'Use arrow keys or swipe to switch artworks.', volume: 'COLLECTION', work: 'ARTWORK',
    categories: { all: 'All', paintings: 'Painting', 'digital-art': 'Digital art', photography: 'Photography', events: 'Activities' }
  }
};

const qs = (root, selector) => root.querySelector(selector);
const local = value => typeof value === 'string' ? value : (value?.[document.documentElement.lang === 'en' ? 'en' : 'vi'] || value?.vi || value?.en || '');
const label = () => LABELS[document.documentElement.lang === 'en' ? 'en' : 'vi'];
const motionAllowed = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  && document.documentElement.dataset.motionChoice !== 'off'
  && document.documentElement.dataset.motion !== 'off'
  && window.ClubMotion?.enabled !== false;
const storageKey = 'clb:poster-gallery:mode:v1';

function storedMode() {
  try { return window.localStorage.getItem(storageKey); } catch { return null; }
}
function saveMode(mode) {
  try { window.localStorage.setItem(storageKey, mode); } catch { /* Storage is optional. */ }
}
function elt(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

export function initPosterGallery(content = window.CLUB_CONTENT) {
  const gallery = document.getElementById('gallery');
  const grid = document.getElementById('galleryGrid');
  const filters = gallery?.querySelector('.filters');
  const artistsSwitch = document.getElementById('artistSwitcher');
  if (!gallery || !grid || !filters || !content || !Array.isArray(content.artworks)) return null;
  if (gallery.dataset.pgInitialized === 'true') return null;
  gallery.dataset.pgInitialized = 'true';

  const artworks = content.artworks;
  const artists = content.artists || [];
  const artistById = new Map(artists.map(artist => [artist.id, artist]));
  const switcher = elt('div', 'pg-mode-switcher');
  switcher.setAttribute('role', 'group');
  switcher.innerHTML = `
    <div class="pg-switch-copy"><span class="pg-switch-kicker">01 / ART CLUB ARCHIVE</span><strong data-pg-text="switchLabel"></strong></div>
    <div class="pg-switch-actions">
      <button class="pg-mode-btn" type="button" data-pg-mode="grid" aria-controls="galleryGrid" aria-pressed="true"><span aria-hidden="true">\u25a6</span><span data-pg-text="grid"></span></button>
      <button class="pg-mode-btn" type="button" data-pg-mode="poster" aria-controls="posterGallery" aria-pressed="false"><span aria-hidden="true">\u2726</span><span data-pg-text="poster"></span><span class="pg-new">NEW</span></button>
    </div>`;
  filters.after(switcher);

  const stage = elt('section', 'pg-stage');
  stage.id = 'posterGallery';
  stage.setAttribute('role', 'region');
  stage.setAttribute('aria-label', 'Poster Gallery / Art Club');
  stage.hidden = true;
  stage.innerHTML = `
    <div class="pg-art-direction" aria-hidden="true"><span class="pg-abstract a"></span><span class="pg-abstract b"></span><span class="pg-abstract c"></span></div>
    <header class="pg-masthead">
      <div class="pg-masthead-left"><span class="pg-masthead-star" aria-hidden="true">\u2726</span><span class="pg-masthead-copy"><strong class="pg-club-name"></strong><small class="pg-school-name"></small></span></div>
      <div class="pg-masthead-right"><span>ART / 2026</span><span class="pg-serial">ISSUE 001</span></div>
    </header>
    <div class="pg-composition">
      <div class="pg-identity">
        <span class="pg-eyebrow">WELCOME TO / ART CLUB</span>
        <div class="pg-logo-type" aria-label="Art Gallery"><span>ART</span><span>GALLERY</span></div>
        <span class="pg-star" aria-hidden="true">\u2736</span>
        <div class="pg-identity-stripe"><span data-pg-text="display"></span><b aria-hidden="true">\u27e9\u27e9\u27e9</b></div>
        <p data-pg-text="small"></p>
        <div class="pg-identity-stat"><span>VISUAL / 01</span><strong>CLB.<span>ART</span></strong></div>
      </div>
      <div class="pg-feature">
        <div class="pg-feature-head"><span>EXHIBITION / <b data-pg-number>001</b></span><strong class="pg-count">01 / 01</strong></div>
        <div class="pg-feature-frame">
          <div class="pg-frame-corner" aria-hidden="true"></div>
          <div class="pg-image-viewport"><img class="pg-image" alt="" decoding="async" /><p class="pg-image-error" hidden></p></div>
          <button type="button" class="pg-nav pg-prev" data-pg-nav="-1" aria-label="Previous artwork"><span aria-hidden="true">\u276e</span></button>
          <button type="button" class="pg-nav pg-next" data-pg-nav="1" aria-label="Next artwork"><span aria-hidden="true">\u276f</span></button>
        </div>
        <div class="pg-photo-footer"><span class="pg-proof">\u25c6 / STUDENT ART COLLECTION</span><span class="pg-slider-meta">ART / 001</span></div>
      </div>
      <aside class="pg-info">
        <div class="pg-feature-tag"><span aria-hidden="true">\u2605</span><span data-pg-text="highlight"></span></div>
        <div class="pg-info-card">
          <span class="pg-info-kicker" data-pg-text="info"></span>
          <h3 class="pg-art-title"></h3>
          <div class="pg-rule" aria-hidden="true"></div>
          <dl class="pg-meta">
            <div><dt data-pg-text="by"></dt><dd class="pg-art-author"></dd></div>
            <div><dt data-pg-text="kind"></dt><dd class="pg-art-category"></dd></div>
          </dl>
          <p class="pg-description"></p>
          <button class="pg-open" type="button" data-pg-open><span aria-hidden="true">\u25ce</span><span data-pg-text="detail"></span><b aria-hidden="true">\u27e9\u27e9</b></button>
        </div>
        <div class="pg-bottom-tape"><span>CREATIVE / VISION</span><strong>\u2726</strong></div>
      </aside>
    </div>
    <div class="pg-gallery-bottom">
      <div class="pg-thumbs-heading"><span data-pg-text="volume"></span><p data-pg-text="hint"></p></div>
      <div class="pg-thumb-strip" role="group" aria-label="Artwork thumbnails" tabindex="-1"></div>
      <div class="pg-progress" aria-hidden="true"><span></span></div>
    </div>
    <p class="pg-announcer pg-sr-only" aria-live="polite" aria-atomic="true"></p>`;
  grid.after(stage);

  const modal = elt('dialog', 'pg-modal');
  modal.setAttribute('aria-label', 'Art Club - full artwork');
  modal.innerHTML = `
    <div class="pg-modal-bar"><span>ART CLUB / FULL VIEW</span><button type="button" class="pg-modal-close" data-pg-close aria-label="Close">\u2715</button></div>
    <figure class="pg-modal-figure"><img class="pg-modal-image" alt="" decoding="async" /><figcaption class="pg-modal-caption"></figcaption></figure>
    <div class="pg-modal-actions"><button type="button" data-pg-modal-nav="-1"><span aria-hidden="true">\u276e</span><span>PREV</span></button><span class="pg-modal-count"></span><button type="button" data-pg-modal-nav="1"><span>NEXT</span><span aria-hidden="true">\u276f</span></button></div>`;
  document.body.append(modal);

  const galleryHint = gallery.querySelector('.gallery-hint');
  const countElement = qs(stage, '.pg-count');
  const artImage = qs(stage, '.pg-image');
  const imageError = qs(stage, '.pg-image-error');
  const thumbs = qs(stage, '.pg-thumb-strip');
  const announcement = qs(stage, '.pg-announcer');
  const queryView = new URLSearchParams(window.location.search).get('gallery');
  const initialMode = queryView === 'poster' ? 'poster' : (storedMode() === 'poster' ? 'poster' : 'grid');
  const state = { mode: 'grid', items: [], index: 0, signature: '', lastFocus: null, imageRevision: 0 };

  function mode(next, persist = true) {
    state.mode = next;
    gallery.dataset.pgMode = next;
    const poster = next === 'poster';
    stage.hidden = !poster;
    grid.hidden = poster;
    if (galleryHint) galleryHint.hidden = poster;
    for (const button of switcher.querySelectorAll('[data-pg-mode]')) {
      const active = button.dataset.pgMode === next;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    if (persist) {
      saveMode(next);
      // Preserve any other query parameters and the current section anchor.
      // Without this the direct-link flag would force Poster Mode back on reload.
      try {
        const url = new URL(window.location.href);
        if (poster) url.searchParams.set('gallery', 'poster');
        else if (url.searchParams.get('gallery') === 'poster') url.searchParams.delete('gallery');
        window.history.replaceState(window.history.state, '', url);
      } catch { /* URL synchronization is optional for embedded previews. */ }
    }
    if (poster) refresh();
  }

  function currentFilter() {
    return filters.querySelector('[data-filter].active')?.dataset.filter || 'all';
  }
  function currentArtist() {
    return artistsSwitch?.querySelector('[data-artist].active')?.dataset.artist || artists[0]?.id || '';
  }
  function visibleArtworks() {
    const artist = currentArtist(), filter = currentFilter();
    return artworks.map((art, sourceIndex) => ({ art, sourceIndex })).filter(({ art }) =>
      (!artist || art.artistId === artist) && (filter === 'all' || art.category === filter)
    );
  }
  function artistName(art) {
    return local(artistById.get(art.artistId)?.name) || local(art.author) || 'ART CLUB';
  }
  function artTitle(art) {
    return local(art.title).trim() || local(art.description).trim() || 'UNTITLED';
  }
  function categoryName(art) {
    return label().categories[art.category] || art.category || 'ART';
  }
  function applyLabels() {
    qs(stage, '.pg-club-name').textContent = document.querySelector('.brand-copy [data-i18n="clubName"]')?.textContent?.trim() || (document.documentElement.lang === 'en' ? 'Art Club' : 'CLB Ngh\u1ec7 thu\u1eadt');
    qs(stage, '.pg-school-name').textContent = document.querySelector('.brand-copy [data-i18n="schoolName"]')?.textContent?.trim() || 'THPT B\u1ea3o L\u1ed9c';
    for (const item of [...switcher.querySelectorAll('[data-pg-text]'), ...stage.querySelectorAll('[data-pg-text]')]) {
      item.textContent = label()[item.dataset.pgText] || item.dataset.pgText;
    }
    for (const button of stage.querySelectorAll('[data-pg-nav]')) {
      button.setAttribute('aria-label', Number(button.dataset.pgNav) < 0 ? label().previous : label().next);
    }
    qs(modal, '[data-pg-close]').setAttribute('aria-label', label().close);
    qs(stage, '.pg-thumb-strip').setAttribute('aria-label', label().thumbnail);
  }
  function renderThumbs() {
    const fragment = document.createDocumentFragment();
    state.items.forEach(({ art }, index) => {
      const button = elt('button', 'pg-thumb');
      button.type = 'button';
      button.dataset.pgIndex = String(index);
      button.setAttribute('aria-label', `${label().thumbnail}: ${artTitle(art)}`);
      const img = elt('img', 'pg-thumb-image');
      img.src = art.thumb || art.image;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      const number = elt('span', 'pg-thumb-number', String(index + 1).padStart(2, '0'));
      button.append(img, number);
      fragment.append(button);
    });
    thumbs.replaceChildren(fragment);
  }
  function paint(animate = true) {
    const current = state.items[state.index];
    const total = state.items.length;
    const isEmpty = total === 0;
    stage.classList.toggle('pg-is-empty', isEmpty);
    qs(stage, '.pg-feature').setAttribute('aria-busy', String(!isEmpty && !artImage.complete));
    qs(stage, '.pg-feature-head [data-pg-number]').textContent = String(state.index + 1).padStart(3, '0');
    countElement.textContent = `${String(isEmpty ? 0 : state.index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    qs(stage, '.pg-slider-meta').textContent = `ART / ${String(state.index + 1).padStart(3, '0')}`;
    qs(stage, '.pg-progress span').style.width = `${total ? (state.index + 1) / total * 100 : 0}%`;
    for (const button of thumbs.querySelectorAll('[data-pg-index]')) {
      const isCurrent = Number(button.dataset.pgIndex) === state.index;
      button.classList.toggle('is-current', isCurrent);
      if (isCurrent) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    }
    for (const button of stage.querySelectorAll('[data-pg-nav]')) button.disabled = total < 2;
    qs(stage, '[data-pg-open]').disabled = isEmpty;

    if (isEmpty) {
      artImage.removeAttribute('src'); artImage.alt = '';
      imageError.hidden = false; imageError.textContent = label().empty;
      qs(stage, '.pg-art-title').textContent = 'NO ARTWORK';
      qs(stage, '.pg-art-author').textContent = '\u2014';
      qs(stage, '.pg-art-category').textContent = '\u2014';
      qs(stage, '.pg-description').textContent = label().empty;
      return;
    }
    const art = current.art;
    const title = artTitle(art);
    const artist = artistName(art);
    const description = local(art.description);
    qs(stage, '.pg-art-title').textContent = title;
    qs(stage, '.pg-art-author').textContent = artist;
    qs(stage, '.pg-art-category').textContent = categoryName(art);
    qs(stage, '.pg-description').textContent = description || label().small;
    announcement.textContent = `${label().counter} ${state.index + 1}/${total}: ${title}, ${artist}`;
    imageError.hidden = true;
    artImage.alt = `${title} - ${artist}`;
    const revision = ++state.imageRevision;
    artImage.onload = () => { if (revision === state.imageRevision) qs(stage, '.pg-feature').removeAttribute('aria-busy'); };
    artImage.onerror = () => {
      if (revision !== state.imageRevision) return;
      imageError.hidden = false; imageError.textContent = label().fail;
      qs(stage, '.pg-feature').removeAttribute('aria-busy');
    };
    artImage.src = art.image;
    artImage.fetchPriority = 'high';
    if (animate && motionAllowed()) {
      for (const element of [artImage, qs(stage, '.pg-info-card')]) {
        element.classList.remove('pg-pop');
        // Restart a short, purely visual animation; never alter the actual artwork.
        void element.offsetWidth;
        element.classList.add('pg-pop');
      }
    }
    if (modal.open) paintModal();
  }
  function move(delta) {
    if (state.items.length < 2) return;
    state.index = (state.index + delta + state.items.length) % state.items.length;
    paint();
    thumbs.querySelector(`[data-pg-index="${state.index}"]`)?.scrollIntoView({ behavior: motionAllowed() ? 'smooth' : 'instant', inline: 'nearest', block: 'nearest' });
  }
  function refresh() {
    const previousId = state.items[state.index]?.art?.id;
    const items = visibleArtworks();
    const signature = `${document.documentElement.lang}|${items.map(({ art, sourceIndex }) => art.id || sourceIndex).join('|')}`;
    const changed = signature !== state.signature;
    if (changed) {
      state.items = items;
      state.signature = signature;
      const sameIndex = items.findIndex(({ art }) => art.id && art.id === previousId);
      state.index = Math.max(0, sameIndex);
      renderThumbs();
    }
    applyLabels();
    if (changed || state.mode === 'poster') paint(changed);
  }
  function paintModal() {
    const current = state.items[state.index]; if (!current) return;
    const art = current.art;
    const img = qs(modal, '.pg-modal-image');
    img.alt = `${artTitle(art)} - ${artistName(art)}`;
    img.src = art.image;
    qs(modal, '.pg-modal-caption').textContent = `${artTitle(art)} | ${artistName(art)} | ${local(art.description)} | ${label().copyright}`;
    qs(modal, '.pg-modal-count').textContent = `${state.index + 1} / ${state.items.length}`;
    for (const button of modal.querySelectorAll('[data-pg-modal-nav]')) button.disabled = state.items.length < 2;
  }
  function openModal() {
    if (!state.items.length) return;
    state.lastFocus = document.activeElement;
    paintModal();
    if (!modal.open) modal.showModal();
    document.body.classList.add('pg-modal-open');
    qs(modal, '[data-pg-close]').focus({ preventScroll: true });
  }
  function closeModal() {
    if (modal.open) modal.close();
    document.body.classList.remove('pg-modal-open');
    if (state.lastFocus?.isConnected) state.lastFocus.focus({ preventScroll: true });
  }

  switcher.addEventListener('click', event => {
    const button = event.target.closest('[data-pg-mode]');
    if (!button) return;
    mode(button.dataset.pgMode);
  });
  stage.addEventListener('click', event => {
    const nav = event.target.closest('[data-pg-nav]');
    const thumb = event.target.closest('[data-pg-index]');
    if (nav && !nav.disabled) move(Number(nav.dataset.pgNav));
    if (thumb) { state.index = Number(thumb.dataset.pgIndex); paint(); }
    if (event.target.closest('[data-pg-open]')) openModal();
  });
  stage.addEventListener('keydown', event => {
    if (modal.open || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
  });
  let pointerStart = null;
  qs(stage, '.pg-image-viewport').addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') return;
    pointerStart = { x: event.clientX, y: event.clientY };
  });
  qs(stage, '.pg-image-viewport').addEventListener('pointerup', event => {
    if (!pointerStart || event.pointerType !== 'touch') return;
    const dx = event.clientX - pointerStart.x, dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
  });
  modal.addEventListener('click', event => {
    if (event.target === modal || event.target.closest('[data-pg-close]')) closeModal();
    const nav = event.target.closest('[data-pg-modal-nav]');
    if (nav && !nav.disabled) move(Number(nav.dataset.pgModalNav));
  });
  modal.addEventListener('cancel', event => { event.preventDefault(); closeModal(); });
  modal.addEventListener('close', () => document.body.classList.remove('pg-modal-open'));
  modal.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
  });

  let refreshQueued = false;
  const scheduleRefresh = () => {
    if (refreshQueued) return;
    refreshQueued = true;
    queueMicrotask(() => { refreshQueued = false; refresh(); });
  };
  filters.addEventListener('click', scheduleRefresh);
  artistsSwitch?.addEventListener('click', scheduleRefresh);
  document.addEventListener('club:gallery-ready', scheduleRefresh);
  document.addEventListener('club:language', scheduleRefresh);
  const observer = new MutationObserver(scheduleRefresh);
  observer.observe(filters, { subtree: true, attributes: true, attributeFilter: ['aria-pressed'] });
  if (artistsSwitch) observer.observe(artistsSwitch, { childList: true });
  window.addEventListener('pagehide', () => observer.disconnect(), { once: true });

  applyLabels();
  mode(initialMode, false);
  refresh();
  return { mode, refresh, next: () => move(1), previous: () => move(-1), get state() {
    return { mode: state.mode, index: state.index, visible: state.items.length };
  } };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initPosterGallery(), { once: true });
} else {
  initPosterGallery();
}
