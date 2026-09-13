import { local, t, apply } from '../core/i18n.js?v=6.1.1';
import { setImage, imageVariant } from '../core/images.js?v=6.1.1';
import { start, loadCSS, report } from '../core/runtime.js?v=6.1.1';

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
  const effectsCSS = new URL('../../css/effects.css?v=6.2.0', import.meta.url).href;
  let cssReady;
  let ravenBusy = false;
  let ravenStatus = '';
  let ravenImportAttempt = 0;
  const english = () => document.documentElement.lang === 'en';
  const ensureEffectsCSS = () => cssReady ||= (
    document.querySelector('link[data-artist-effects="6.2.0"]')?.sheet
      ? Promise.resolve() : loadCSS(effectsCSS)
  ).catch(error => { cssReady = null; throw error; });
  const ensureRaven = () => start('raven', async () => {
    const url = new URL('./raven.js?v=6.2.0', import.meta.url);
    // Retry only after a failed import, not on every page view.
    if (ravenImportAttempt) url.searchParams.set('retry', String(ravenImportAttempt));
    try { return (await import(url.href)).initRaven(); }
    catch (error) { ravenImportAttempt++; throw error; }
  });
  function syncRavenControls() {
    const replay = grid.querySelector('[data-raven-replay]');
    if (!replay) return;
    const off = motion?.enabled === false || document.documentElement.dataset.motion === 'off';
    replay.disabled = ravenBusy;
    replay.setAttribute('aria-busy', String(ravenBusy));
    replay.textContent = ravenBusy
      ? (english() ? 'Assembling Driver...' : '\u0110ang l\u1eafp Driver...')
      : off
        ? (english() ? '\u25b7 Play transformation once' : '\u25b7 Ch\u1ea1y bi\u1ebfn h\u00ecnh m\u1ed9t l\u1ea7n')
        : (english() ? '\u25b7 Replay transformation' : '\u25b7 Bi\u1ebfn h\u00ecnh l\u1ea1i');
    const note = grid.querySelector('[data-raven-motion-note]');
    if (note) {
      note.hidden = !off;
      note.textContent = english()
        ? 'Motion is off. The button plays only this sequence once; your page settings stay unchanged.'
        : 'Chuy\u1ec3n \u0111\u1ed9ng \u0111ang t\u1eaft. N\u00fat tr\u00ean ch\u1ec9 ch\u1ea1y m\u00e0n bi\u1ebfn h\u00ecnh n\u00e0y m\u1ed9t l\u1ea7n, kh\u00f4ng \u0111\u1ed5i c\u00e0i \u0111\u1eb7t chung.';
    }
    const status = grid.querySelector('[data-raven-status]');
    if (status) {
      status.hidden = !ravenStatus;
      status.textContent = ravenStatus === 'loading'
        ? (english() ? 'Loading Driver...' : '\u0110ang t\u1ea3i Driver...')
        : ravenStatus === 'error'
          ? (english()
            ? 'Driver could not load. Check that the js, css and assets/raven folders were uploaded beside index.html, then tap to try again.'
            : 'Ch\u01b0a t\u1ea3i \u0111\u01b0\u1ee3c Driver. Ki\u1ec3m tra \u0111\u00e3 up \u0111\u1ee7 c\u00e1c th\u01b0 m\u1ee5c js, css v\u00e0 assets/raven c\u00f9ng c\u1ea5p index.html, r\u1ed3i b\u1ea5m th\u1eed l\u1ea1i.')
          : '';
    }
  }
  async function effect(replay = false, explicit = false, source = null) {
    const rev = ++effectRevision;
    const selected = artistId;
    window.ClubAkikoFlight?.stop();
    window.ClubRaven?.stop();
    ravenBusy = !!(selected === 'raven-lin' && replay && (motion?.enabled || explicit));
    ravenStatus = ravenBusy ? 'loading' : '';
    syncRavenControls();
    try {
      await ensureEffectsCSS();
      if (rev !== effectRevision || artistId !== selected) return;
      const btn = switcher.querySelector(`[data-artist="${selected}"]`);
      if (selected === 'akiko-oishi' && replay && motion?.enabled) {
        const akiko = await start('akiko', async () => (await import('./akiko.js?v=6.1.1')).initAkiko());
        if (rev === effectRevision && artistId === selected) await akiko.launch(btn);
      }
      if (selected === 'raven-lin' && replay && (motion?.enabled || explicit)) {
        const raven = await ensureRaven();
        if (rev !== effectRevision || artistId !== selected) return;
        const launched = await raven.launch(source || btn, { explicit });
        if (rev === effectRevision && artistId === selected) {
          ravenStatus = !launched && raven.state.lastError ? 'error' : '';
        }
      }
    } catch (error) {
      if (rev === effectRevision && selected === 'raven-lin') ravenStatus = 'error';
      report('author-effect', error);
    } finally {
      if (rev === effectRevision) { ravenBusy = false; syncRavenControls(); }
    }
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
      if (artistId === 'raven-lin' && !artworks.some(a => a.artistId === artistId)) {
        const en = document.documentElement.lang === 'en';
        const placeholder = make('article', 'raven-empty');
        const copy = make('div', 'raven-empty-copy');
        copy.append(make('div', 'raven-empty-kicker', '03 / EXHIBITION ARTIST'),
          make('h3', '', 'Raven Lin'),
          make('p', '', en
            ? 'The first artworks are on their way. For now, meet the artist through this transformation.'
            : 'Tác phẩm đang được chuẩn bị. Trước mắt, làm quen với họa sĩ qua màn biến hình này.'),
          make('small', 'raven-empty-status', en ? 'ARCHIVE 03 / COMING SOON' : 'ARCHIVE 03 / TÁC PHẨM SẮP RA MẮT'));
        const replay = make('button', 'raven-replay', en ? '▷ Replay transformation' : '▷ Biến hình lại');
        replay.type = 'button'; replay.dataset.ravenReplay = 'true';
        replay.setAttribute('aria-describedby', 'raven-motion-note raven-launch-status');
        const badge = make('small', 'raven-build-badge', 'DESIRE DRIVER / v6.2.0');
        const motionNote = make('p', 'raven-motion-note');
        motionNote.id = 'raven-motion-note'; motionNote.dataset.ravenMotionNote = '';
        const status = make('p', 'raven-launch-status');
        status.id = 'raven-launch-status'; status.dataset.ravenStatus = '';
        status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite'); status.hidden = true;
        copy.append(badge, replay, motionNote, status);
        const figure = make('figure', 'raven-empty-driver');
        const driver = make('img', '');
        driver.src = new URL('../../assets/raven/final.webp', import.meta.url).href;
        driver.alt = en ? 'White and red Geats Driver' : 'Geats Driver trắng và đỏ';
        driver.width = 967; driver.height = 427; driver.decoding = 'async'; driver.draggable = false;
        figure.append(driver, make('figcaption', '', 'GEATS / IX / RAVEN LIN'));
        placeholder.append(copy, figure); fragment.append(placeholder);
      } else {
        const placeholder = make('article', 'gallery-card placeholder-card');
        placeholder.append(make('div', 'placeholder-art', '✦'), make('h3', 'gallery-info', t('comingSoon')));
        fragment.append(placeholder);
      }
    }
    if (items.length > limit) {
      const more = make('button', 'comic-button gallery-more', document.documentElement.lang === 'en' ? 'Load more artworks' : 'Xem thêm tác phẩm');
      more.type = 'button'; more.dataset.more = 'true'; fragment.append(more);
    }
    grid.replaceChildren(fragment); grid.removeAttribute('aria-busy');
    syncRavenControls();
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
    window.ClubAkikoFlight?.stop(); window.ClubRaven?.stop(); trigger = source;
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
  // Hover/focus warms one shared atlas; it never launches a sequence or audio.
  const warmRaven = e => {
    if (!e.target.closest('[data-artist="raven-lin"]')) return;
    ensureEffectsCSS().then(ensureRaven).then(raven => raven.preload()).catch(() => {});
  };
  switcher.addEventListener('pointerover', warmRaven, { passive: true });
  switcher.addEventListener('focusin', warmRaven);
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
    const replay = e.target.closest('[data-raven-replay]');
    if (replay) { effect(true, true, replay); return; }
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
  document.addEventListener('club:motion', syncRavenControls);
  document.addEventListener('club:language', () => { renderArtists(); render(); if (dialog.open) paintLightbox(selectedIndex); });
  // Default cards are server-rendered in index.html. Hydrate without layout replacement.
  document.documentElement.dataset.selectedArtist = artistId;
  renderArtists(); grid.removeAttribute('aria-busy');
  if (!grid.querySelector('[data-index]')) render();
  else if (document.documentElement.lang === 'en') render();
  motion?.register(grid); effect(false);
  return { render, close, get state() { return { artistId, filter, visible: visible().length, selectedIndex }; } };
}
