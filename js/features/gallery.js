import { local, t, apply } from '../core/i18n.js?v=5.1.2';
import { setImage, imageVariant } from '../core/images.js?v=5.1.2';
import { start, loadCSS, report } from '../core/runtime.js?v=5.1.2';

/** Author/gallery state is independent of visual effects and of the music player. */
export function initGallery(content) {
  const grid = document.getElementById('galleryGrid');
  const switcher = document.getElementById('artistSwitcher');
  const dialog = document.getElementById('lightbox');
  const image = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  const artists = content.artists || [], artworks = content.artworks || [];
  const motion = window.ClubMotion;
  let artistId = artists[0]?.id || '', filter = 'all', limit = 12;
  let selectedIndex = -1, trigger = null, imageRevision = 0, effectRevision = 0;
  const make = (tag, cls, text) => {
    const el = document.createElement(tag); el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const artName = art => local(art.title).trim() || `${local(art.author)} · ${local(art.description)}`;
  const visible = () => artworks.map((art, index) => ({ art, index }))
    .filter(({ art }) => (!artistId || art.artistId === artistId) && (filter === 'all' || art.category === filter));
  const effectsCSS = new URL('../../css/effects.css?v=5.1.2', import.meta.url).href;
  let cssReady;
  const ensureEffectsCSS = () => cssReady ||= loadCSS(effectsCSS).catch(e => { cssReady = null; throw e; });
  async function effect(replay = false) {
    const rev = ++effectRevision;
    window.ClubAkikoFlight?.stop();
    try {
      await ensureEffectsCSS();
      const btn = switcher.querySelector(`[data-artist="${artistId}"]`);
      if (artistId === 'akiko-oishi' && replay && motion?.enabled) {
        const akiko = await start('akiko', async () => (await import('./akiko.js?v=5.1.2')).initAkiko());
        if (rev === effectRevision && artistId === 'akiko-oishi') await akiko.launch(btn);
      }
    } catch (e) { report('author-effect', e); }
  }
  function renderArtists() {
    const focusId = document.activeElement?.dataset?.artist;
    const fragment = document.createDocumentFragment();
    artists.forEach((artist, index) => {
      const btn = make('button', 'artist-chip'); btn.type = 'button'; btn.dataset.artist = artist.id;
      const selected = artist.id === artistId;
      btn.classList.toggle('active', selected); btn.setAttribute('aria-pressed', String(selected));
      if (artist.mascot) {
        btn.classList.add('artist-chip-with-avatar'); const avatar = make('span', 'artist-chip-avatar');
        const im = make('img', ''); im.alt = '';
        setImage(im, artist.id === 'akiko-oishi' ? 'assets/gallery/akiko/mascot-intact-v253.webp' : artist.mascot,
          { width: 160, sizes: '48px' });
        avatar.append(im); btn.append(avatar);
      }
      const copy = make('span', 'artist-chip-copy');
      const count = artworks.filter(a => a.artistId === artist.id).length;
      copy.append(make('small', '', local(artist.label)), make('strong', '', local(artist.name)),
        make('em', '', local(artist.note).replace(/^\d+/, String(count))));
      btn.append(make('span', 'artist-chip-index', String(index + 1).padStart(2, '0')), copy);
      fragment.append(btn);
    });
    switcher.replaceChildren(fragment);
    if (focusId) switcher.querySelector(`[data-artist="${focusId}"]`)?.focus({ preventScroll: true });
  }
  function render() {
    document.documentElement.dataset.selectedArtist = artistId;
    document.querySelectorAll('.filter').forEach(btn => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle('active', active); btn.setAttribute('aria-pressed', String(active));
    });
    const items = visible(), artist = artists.find(a => a.id === artistId);
    const fragment = document.createDocumentFragment();
    if (artist) {
      const heading = make('div', 'gallery-author');
      heading.append(make('span', 'gallery-author-kicker', document.documentElement.lang === 'en' ? 'ARTIST' : 'TÁC GIẢ'),
        make('h3', '', `${local(artist.label)} ${local(artist.name)}`),
        make('p', '', `${items.length} ${document.documentElement.lang === 'en' ? 'works' : 'tác phẩm'}`));
      fragment.append(heading);
    }
    for (const { art, index } of items.slice(0, limit)) {
      const card = make('button', 'gallery-card'); card.type = 'button'; card.dataset.index = index;
      card.setAttribute('aria-label', `${t('viewArt')}: ${artName(art)}`);
      const img = make('img', ''); img.alt = artName(art);
      setImage(img, art.thumb || art.image, { width: 560, sizes: '(max-width: 640px) 44vw, (max-width: 980px) 42vw, 380px' });
      img.fetchPriority = 'low';
      img.addEventListener('error', () => { card.classList.add('image-failed'); }, { once: true });
      const info = make('div', 'gallery-info'), title = local(art.title).trim();
      if (title) info.append(make('h3', '', title));
      info.append(make('p', '', local(art.description)));
      card.classList.toggle('gallery-card-no-title', !title);
      card.append(img, info); fragment.append(card);
    }
    if (!items.length) {
      const placeholder = make('article', 'gallery-card placeholder-card');
      placeholder.append(make('div', 'placeholder-art', '✦'), make('h3', 'gallery-info', t('comingSoon')));
      fragment.append(placeholder);
    }
    if (items.length > limit) {
      const more = make('button', 'comic-button gallery-more', document.documentElement.lang === 'en' ? 'Load more artworks' : 'Xem thêm tác phẩm');
      more.type = 'button'; more.dataset.more = 'true'; fragment.append(more);
    }
    grid.replaceChildren(fragment); grid.removeAttribute('aria-busy');
    motion?.register(grid);
  }
  function paintLightbox(index) {
    const art = artworks[index]; if (!art) return;
    selectedIndex = index; const revision = ++imageRevision;
    image.classList.add('is-loading'); image.alt = artName(art);
    const title = local(art.title).trim();
    caption.textContent = `${title ? title + ' — ' : ''}${local(art.author)} · ${local(art.description)}`;
    dialog.classList.remove('image-failed');
    image.onload = () => { if (revision === imageRevision) image.classList.remove('is-loading'); };
    image.onerror = () => {
      if (revision !== imageRevision) return;
      image.classList.remove('is-loading'); dialog.classList.add('image-failed');
      caption.append(document.documentElement.lang === 'en' ? ' — Image could not load.' : ' — Chưa tải được ảnh.');
    };
    image.removeAttribute('srcset'); image.src = art.image; // original artwork fetched only on open
  }
  function open(index, source) {
    window.ClubAkikoFlight?.stop(); trigger = source;
    paintLightbox(index);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('no-scroll');
    motion?.animate(dialog.querySelector('figure'), [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
      { duration: 220, easing: 'ease-out' });
  }
  function close() {
    imageRevision++;
    if (dialog.open) dialog.close();
    document.body.classList.remove('no-scroll');
  }
  switcher.addEventListener('click', e => {
    const button = e.target.closest('[data-artist]'); if (!button) return;
    const id = button.dataset.artist;
    if (id !== artistId) { artistId = id; filter = 'all'; limit = 12; renderArtists(); render(); }
    motion?.burst(switcher.querySelector(`[data-artist="${id}"]`), '', 5); effect(true);
  });
  document.querySelector('.filters').addEventListener('click', e => {
    const button = e.target.closest('[data-filter]'); if (!button) return;
    filter = button.dataset.filter; limit = 12; render(); motion?.burst(button, '', 5);
  });
  grid.addEventListener('click', e => {
    const card = e.target.closest('[data-index]');
    if (card) open(Number(card.dataset.index), card);
    if (e.target.closest('[data-more]')) { limit += 12; render(); }
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', close);
  dialog.addEventListener('cancel', e => { e.preventDefault(); close(); });
  dialog.addEventListener('click', e => { if (e.target === dialog) close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('no-scroll');
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    const indices = visible().map(item => item.index), at = indices.indexOf(selectedIndex);
    paintLightbox(indices[(at + (e.key === 'ArrowRight' ? 1 : -1) + indices.length) % indices.length]);
  });
  document.addEventListener('club:language', () => { renderArtists(); render(); if (dialog.open) paintLightbox(selectedIndex); });
  // Default cards are server-rendered in index.html. Hydrate without layout replacement.
  document.documentElement.dataset.selectedArtist = artistId;
  renderArtists(); grid.removeAttribute('aria-busy');
  if (!grid.querySelector('[data-index]')) render();
  else if (document.documentElement.lang === 'en') render();
  motion?.register(grid); effect(false);
  return { render, close, get state() { return { artistId, filter, visible: visible().length, selectedIndex }; } };
}
