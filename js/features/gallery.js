import { local, t, apply } from '../core/i18n.js?v=7.0.9';
import { setImage, imageVariant } from '../core/images.js?v=7.0.9';
import { start, loadCSS, report } from '../core/runtime.js?v=7.0.9';

/** Author/gallery state is independent of visual effects and of the music player. */
export function initGallery(content) {
  const grid = document.getElementById('galleryGrid');
  const switcher = document.getElementById('artistSwitcher');
  const dialog = document.getElementById('lightbox');
  const image = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  const artists = content.artists || [], artworks = content.artworks || [];
  const motion = window.ClubMotion;
  const compactGallery = window.matchMedia('(max-width: 800px), (max-height: 520px) and (pointer: coarse)');
  let pageSize = compactGallery.matches ? 2 : 3;
  let artistId = artists[0]?.id || '', filter = 'all', page = 1;
  let selectedIndex = -1, trigger = null, imageRevision = 0, effectRevision = 0;
  const make = (tag, cls, text) => {
    const el = document.createElement(tag); el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const artName = art => local(art.title).trim() || `${local(art.author)} · ${local(art.description)}`;
  const artAlt = art => {
    const artist = artists.find(item => item.id === art.artistId);
    const title = local(art.title).trim();
    const medium = local(art.description).split('·')[0].trim();
    const creator = local(artist?.name || art.author).trim();
    const by = document.documentElement.lang === 'en' ? 'by' : 'của';
    return `${title ? title + ' — ' : ''}${medium} ${by} ${creator}`.trim();
  };
  const artCredit = art => {
    const artist = artists.find(item => item.id === art.artistId);
    return `© 2026 ${local(artist?.name || art.author)}`;
  };
  const visible = () => artworks.map((art, index) => ({ art, index }))
    .filter(({ art }) => (!artistId || art.artistId === artistId) && (filter === 'all' || art.category === filter));
  const effectsCSS = new URL('../../css/effects.css?v=7.0.9', import.meta.url).href;
  let cssReady;
  const ensureEffectsCSS = () => cssReady ||= (
    document.querySelector('link[data-artist-effects="core"]')?.sheet
      ? Promise.resolve() : loadCSS(effectsCSS)
  ).catch(error => { cssReady = null; throw error; });
  async function effect(replay = false) {
    const rev = ++effectRevision;
    const selected = artistId;
    window.ClubAkikoFlight?.stop();
    window.ClubRaven?.stop('artist-change');
    try {
      await ensureEffectsCSS();
      if (rev !== effectRevision || artistId !== selected) return;
      const btn = switcher.querySelector(`[data-artist="${selected}"]`);
      if (selected === 'akiko-oishi' && replay && motion?.enabled) {
        const akiko = await start('akiko', async () => (await import('./akiko.js?v=7.0.9')).initAkiko());
        if (rev === effectRevision && artistId === selected) await akiko.launch(btn);
      }
      if (selected === 'raven-lin' && replay && motion?.enabled) {
        const raven = await start('raven', async () => (await import('./raven.js?v=7.0.9')).initRaven());
        if (rev === effectRevision && artistId === selected) raven.launch(btn);
      }
    } catch (error) {
      report('author-effect', error);
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
    const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
    page = Math.min(Math.max(1, page), pageCount);
    const pageItems = items.slice((page - 1) * pageSize, page * pageSize);
    for (const { art, index } of pageItems) {
      const card = make('button', 'gallery-card'); card.type = 'button'; card.dataset.index = index;
      card.setAttribute('aria-label', `${t('viewArt')}: ${artAlt(art)}`);
      const img = make('img', ''); img.alt = artAlt(art);
      setImage(img, art.thumb || art.image, { width: 560, sizes: '(max-width: 640px) 44vw, (max-width: 980px) 42vw, 380px' });
      img.fetchPriority = 'low';
      img.addEventListener('error', () => { card.classList.add('image-failed'); }, { once: true });
      const info = make('div', 'gallery-info'), title = local(art.title).trim();
      if (title) info.append(make('h3', '', title));
      info.append(make('p', '', local(art.description)), make('small', 'gallery-credit', artCredit(art)));
      card.classList.toggle('gallery-card-no-title', !title);
      card.append(img, info); fragment.append(card);
    }
    if (!items.length) {
      if (artistId === 'raven-lin' && !artworks.some(a => a.artistId === artistId)) {
        const en = document.documentElement.lang === 'en';
        const placeholder = make('article', 'raven-empty raven-static');
        const copy = make('div', 'raven-empty-copy');
        copy.append(
          make('div', 'raven-empty-kicker', '03 / EXHIBITION ARTIST'),
          make('h3', '', 'Raven Lin'),
          make('p', '', en
            ? 'A new exhibition experience is being prepared for this artist. The previous transformation animation has been retired.'
            : 'Không gian triển lãm mới cho tác giả này đang được chuẩn bị. Hoạt họa biến hình cũ đã được gỡ bỏ.'),
          make('small', 'raven-empty-status', en ? 'ARCHIVE 03 / COMING SOON' : 'ARCHIVE 03 / SẮP CẬP NHẬT')
        );
        placeholder.append(copy);
        fragment.append(placeholder);
      } else {
        const placeholder = make('article', 'gallery-card placeholder-card');
        placeholder.append(make('div', 'placeholder-art', '✦'), make('h3', 'gallery-info', t('comingSoon')));
        fragment.append(placeholder);
      }
    }
    if (items.length > pageSize) {
      const pager = make('nav', 'gallery-pagination');
      pager.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Artwork pages' : 'Trang tác phẩm');
      const prev = make('button', 'gallery-page gallery-page-arrow', '‹');
      prev.type = 'button'; prev.dataset.page = String(page - 1); prev.disabled = page === 1;
      prev.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Previous page' : 'Trang trước');
      pager.append(prev);
      for (let number = 1; number <= pageCount; number++) {
        const button = make('button', 'gallery-page', String(number));
        button.type = 'button'; button.dataset.page = String(number);
        if (number === page) { button.classList.add('active'); button.setAttribute('aria-current', 'page'); }
        button.setAttribute('aria-label', `${document.documentElement.lang === 'en' ? 'Page' : 'Trang'} ${number}`);
        pager.append(button);
      }
      const next = make('button', 'gallery-page gallery-page-arrow', '›');
      next.type = 'button'; next.dataset.page = String(page + 1); next.disabled = page === pageCount;
      next.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Next page' : 'Trang sau');
      pager.append(next);
      fragment.append(pager);
    }
    grid.replaceChildren(fragment); grid.removeAttribute('aria-busy');
    motion?.register(grid);
  }
  function paintLightbox(index) {
    const art = artworks[index]; if (!art) return;
    selectedIndex = index; const revision = ++imageRevision;
    image.classList.add('is-loading'); image.alt = artAlt(art);
    const title = local(art.title).trim();
    caption.textContent = `${title ? title + ' — ' : ''}${local(art.author)} · ${local(art.description)} · ${artCredit(art)}`;
    dialog.classList.remove('image-failed');
    image.onload = () => { if (revision === imageRevision) image.classList.remove('is-loading'); };
    image.onerror = () => {
      if (revision !== imageRevision) return;
      image.classList.remove('is-loading'); dialog.classList.add('image-failed');
      caption.append(document.documentElement.lang === 'en' ? ' — Image could not load.' : ' — Chưa tải được ảnh.');
    };
    setImage(image, art.image, { width: 1200, sizes: '91vw', lazy: true, responsive: true });
    image.fetchPriority = 'high'; // public web copy only; masters are not shipped
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
    if (id !== artistId) {
      artistId = id; filter = 'all'; page = 1; renderArtists(); render();
    }
    motion?.burst(switcher.querySelector(`[data-artist="${id}"]`), '', 5);
    effect(true);
  });
  document.querySelector('.filters').addEventListener('click', e => {
    const button = e.target.closest('[data-filter]'); if (!button) return;
    filter = button.dataset.filter; page = 1; render(); motion?.burst(button, '', 5);
  });
  grid.addEventListener('click', e => {
    const card = e.target.closest('[data-index]');
    if (card) open(Number(card.dataset.index), card);
    const pageButton = e.target.closest('[data-page]');
    if (pageButton && !pageButton.disabled) {
      page = Number(pageButton.dataset.page); render();
      grid.scrollIntoView({ behavior: motion?.enabled ? 'smooth' : 'auto', block: 'nearest' });
    }
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
  const syncPageSize = () => {
    const nextSize = compactGallery.matches ? 2 : 3;
    if (nextSize === pageSize) return;
    const firstVisible = Math.max(0, (page - 1) * pageSize);
    pageSize = nextSize;
    page = Math.floor(firstVisible / pageSize) + 1;
    render();
  };
  if (compactGallery.addEventListener) compactGallery.addEventListener('change', syncPageSize);
  else compactGallery.addListener?.(syncPageSize);
  // Hydrate the server-rendered gallery into the paginated view.
  document.documentElement.dataset.selectedArtist = artistId;
  renderArtists(); render(); effect(false);
  document.dispatchEvent(new CustomEvent('club:gallery-ready', { detail: { artistId } }));
  return { render, close, get state() { return { artistId, filter, page, pageSize, visible: visible().length, selectedIndex }; } };
}
