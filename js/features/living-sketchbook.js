const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const root = document.documentElement;

export function initLivingSketchbook() {
  const motion = window.ClubMotion;
  const state = {
    sections: new Set(),
    artists: new Set(),
    artworks: new Set(),
    journey: [],
    traceCount: 0,
    unlocked: false,
    transition: null,
    artistTransition: null,
  };
  const sectionIds = ['about', 'gallery', 'activities', 'playlist', 'join', 'contact'];
  const sectionGlyphs = { about:'✦', gallery:'⌁', activities:'✎', playlist:'♪', join:'★', contact:'↗' };
  const artistGlyphs = { 'bao-tam':'〰', 'akiko-oishi':'◉', 'raven-lin':'⌬' };
  const artistColors = { 'bao-tam':'#65785b', 'akiko-oishi':'#355972', 'raven-lin':'#a44331' };
  const motionEnabled = () => root.dataset.motion !== 'off' && motion?.enabled !== false;
  const quiet = () => root.dataset.motionChoice === 'quiet';
  const q = (selector, scope=document) => scope.querySelector(selector);
  const mobile = () => matchMedia('(max-width: 800px)').matches;

  /* ---------- Signature ink line: one animated stroke, layout-aware ---------- */
  const inkHost = document.createElement('div');
  inkHost.className = 'living-ink';
  inkHost.setAttribute('aria-hidden', 'true');
  inkHost.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path class="ink-guide"/><path class="ink-path" pathLength="1"/><g class="ink-landmarks"></g></svg>';
  document.body.append(inkHost);
  const inkSvg = q('svg', inkHost);
  const inkGuide = q('.ink-guide', inkHost);
  const inkPath = q('.ink-path', inkHost);
  const landmarkGroup = q('.ink-landmarks', inkHost);
  let inkFrame = 0;
  let rebuildFrame = 0;
  let rebuildTimer = 0;
  let lastInkProgress = -1;

  function inkX(width) {
    const contentWidth = Math.min(1220, Math.max(0, width - 64));
    const margin = Math.max(12, (width - contentWidth) / 2);
    return width <= 800 ? 11 : clamp(margin * .44, 20, 58);
  }

  function inkAnchors() {
    return [q('#home'), ...sectionIds.map(id => q(`#${id}`)).filter(Boolean), q('.footer')].filter(Boolean);
  }

  function rebuildInk() {
    rebuildFrame = 0;
    const width = document.documentElement.clientWidth;
    const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, innerHeight);
    const x = inkX(width);
    inkHost.style.height = `${height}px`;
    inkSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const anchors = inkAnchors();
    const points = anchors.map((el, index) => {
      const rect = el.getBoundingClientRect();
      const y = rect.top + scrollY + Math.min(Math.max(72, rect.height * .17), 164);
      const wobble = width <= 800 ? (index % 2 ? 2.5 : -2) : [0, -8, 7, -5, 9, -4, 5, 0][index % 8];
      return { x: x + wobble, y };
    });
    if (!points.length) return;

    let d = `M ${points[0].x.toFixed(1)} ${Math.max(0, points[0].y - 118).toFixed(1)}`;
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const next = points[i + 1];
      if (!next) {
        d += ` L ${p.x.toFixed(1)} ${Math.min(height - 18, p.y + 165).toFixed(1)}`;
        break;
      }
      const dy = next.y - p.y;
      const bow = (i % 2 ? 1 : -1) * (width <= 800 ? 6 : 17);
      const c1x = p.x + bow;
      const c2x = next.x - bow * .72;
      d += ` C ${c1x.toFixed(1)} ${(p.y + dy * .30).toFixed(1)}, ${c2x.toFixed(1)} ${(p.y + dy * .70).toFixed(1)}, ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
    }
    inkPath.setAttribute('d', d);
    inkGuide.setAttribute('d', d);
    inkPath.style.strokeDasharray = '1';
    lastInkProgress = -1;

    const gallery = q('#gallery');
    const playlist = q('#playlist');
    const parts = [];
    if (gallery) {
      const r = gallery.getBoundingClientRect();
      const y = r.top + scrollY + 116;
      parts.push(`<path class="ink-landmark gallery" d="M ${x-2} ${y-20} h 25 v 23 h -16 M ${x+8} ${y+13} h 18"/>`);
    }
    if (playlist) {
      const r = playlist.getBoundingClientRect();
      const y = r.top + scrollY + 126;
      parts.push(`<path class="ink-landmark music" d="M ${x+1} ${y} c 29 -27 45 12 19 24 c -20 9 -28 -14 -10 -21 c 11 -4 16 8 7 13"/>`);
    }
    landmarkGroup.innerHTML = parts.join('');
    updateInk(true);
  }

  function queueInkBuild(delay = 70) {
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(() => {
      if (!rebuildFrame) rebuildFrame = requestAnimationFrame(rebuildInk);
    }, delay);
  }

  function updateInk(force = false) {
    inkFrame = 0;
    if (root.dataset.motion === 'off') {
      inkPath.style.strokeDashoffset = '0';
      return;
    }
    const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const denominator = Math.max(1, height - innerHeight * .44);
    const progress = clamp((scrollY + innerHeight * .54) / denominator, 0, 1);
    if (!force && Math.abs(progress - lastInkProgress) < .0012) return;
    lastInkProgress = progress;
    inkPath.style.strokeDashoffset = String(1 - progress);
  }

  const queueInk = () => {
    if (!inkFrame && document.visibilityState !== 'hidden') inkFrame = requestAnimationFrame(() => updateInk(false));
  };
  addEventListener('scroll', queueInk, { passive:true });
  addEventListener('resize', () => queueInkBuild(90), { passive:true });
  addEventListener('orientationchange', () => queueInkBuild(140), { passive:true });
  addEventListener('load', () => queueInkBuild(0), { once:true });
  document.addEventListener('club:motion', () => { queueInkBuild(0); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { queueInkBuild(0); queueInk(); } });
  document.fonts?.ready?.then?.(() => queueInkBuild(0));

  if ('ResizeObserver' in window) {
    const layoutObserver = new ResizeObserver(() => queueInkBuild(110));
    inkAnchors().forEach(el => layoutObserver.observe(el));
  }

  /* ---------- Full-page sketchbook transition: transform-only paper sweep ---------- */
  const pageTurn = document.createElement('div');
  pageTurn.className = 'living-page-turn';
  pageTurn.setAttribute('aria-hidden', 'true');
  pageTurn.innerHTML = '<div class="living-page-sheet"><span class="living-page-stitch"></span><span class="living-page-doodle">TURN / DRAW / GO</span><span class="living-page-edge"></span></div>';
  document.body.append(pageTurn);
  const pageSheet = q('.living-page-sheet', pageTurn);
  let pageTransitionSeq = 0;

  function targetTop(target) {
    const header = q('.site-header');
    const offset = target.id === 'top' ? 0 : Math.max(76, (header?.getBoundingClientRect().height || 62) + 28);
    return Math.max(0, target.getBoundingClientRect().top + scrollY - offset);
  }

  function cancelPageTransition() {
    if (!state.transition) return;
    clearTimeout(state.transition.timer);
    try { state.transition.animation.cancel(); } catch {}
    state.transition = null;
    pageTurn.classList.remove('is-active');
  }

  function navigateWithPaper(hash, target) {
    cancelPageTransition();
    const destination = targetTop(target);
    if (!motionEnabled() || !pageSheet.animate || Math.abs(destination - scrollY) < 28) {
      target.scrollIntoView({ behavior: motionEnabled() ? 'smooth' : 'auto', block:'start' });
      history.pushState(null, '', hash);
      return;
    }

    const sequence = ++pageTransitionSeq;
    const duration = quiet() ? 260 : (mobile() ? 360 : 420);
    pageTurn.classList.add('is-active');
    const animation = pageSheet.animate([
      { transform:'translate3d(108%,0,0) rotate(.45deg)', opacity:.96, offset:0 },
      { transform:'translate3d(-3%,0,0) rotate(0deg)', opacity:1, offset:.46 },
      { transform:'translate3d(-4%,0,0) rotate(0deg)', opacity:1, offset:.54 },
      { transform:'translate3d(-112%,0,0) rotate(-.45deg)', opacity:.97, offset:1 }
    ], { duration, easing:'cubic-bezier(.42,.02,.18,1)', fill:'both' });

    let committed = false;
    const commit = () => {
      if (committed || sequence !== pageTransitionSeq) return;
      committed = true;
      window.scrollTo({ top: targetTop(target), behavior:'auto' });
      history.pushState(null, '', hash);
      queueInkBuild(120);
    };
    const timer = setTimeout(commit, duration * .50);
    state.transition = { animation, timer };

    animation.finished.catch(() => {}).finally(() => {
      clearTimeout(timer);
      if (sequence !== pageTransitionSeq) return;
      commit();
      pageTurn.classList.remove('is-active');
      try { animation.cancel(); } catch {}
      if (state.transition?.animation === animation) state.transition = null;
    });
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.classList.contains('skip-link') || link.hasAttribute('data-no-sketch-transition')) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    let target;
    try { target = document.querySelector(href); } catch { return; }
    if (!target) return;
    event.preventDefault();
    navigateWithPaper(href, target);
  });

  /* ---------- Artist paper wipe + three richer motion identities ---------- */
  const gallery = q('#gallery');
  const artistWipe = document.createElement('div');
  artistWipe.className = 'artist-paper-wipe';
  artistWipe.setAttribute('aria-hidden','true');
  const signatureLayer = document.createElement('div');
  signatureLayer.className = 'artist-signature-layer';
  signatureLayer.setAttribute('aria-hidden','true');
  gallery?.prepend(signatureLayer, artistWipe);
  let signatureTimer = 0;
  let signatureRemoveTimer = 0;
  let signatureDeferredTimer = 0;
  let signatureSeq = 0;
  let artistTransitionSeq = 0;

  function signatureMarkup(artistId) {
    if (artistId === 'bao-tam') {
      return '<div class="artist-signature haruko"><svg viewBox="0 0 360 118" aria-hidden="true"><path pathLength="1" class="haruko-main" d="M10 69 C55 18 111 84 166 45 S259 54 344 22"/><path pathLength="1" class="haruko-soft" d="M26 91 C96 62 166 102 250 67 C284 53 314 57 337 47"/><path pathLength="1" class="haruko-accent" d="M82 37 C91 24 102 19 116 20 M273 76 C286 70 300 69 316 73"/><circle cx="54" cy="40" r="4"/><circle cx="323" cy="34" r="3"/></svg></div>';
    }
    if (artistId === 'akiko-oishi') {
      return '<div class="artist-signature akiko"><span class="akiko-ring ring-a"></span><span class="akiko-ring ring-b"></span><span class="akiko-core"><b></b></span><i></i><i></i><i></i><i></i></div>';
    }
    if (artistId === 'raven-lin') {
      return '<div class="artist-signature raven"><span class="raven-corner tl"></span><span class="raven-corner tr"></span><span class="raven-corner bl"></span><span class="raven-corner br"></span><span class="raven-lock"><i></i></span><span class="raven-label">IX / LOCK</span></div>';
    }
    return '';
  }

  function deferArtistSignature(artistId) {
    clearTimeout(signatureDeferredTimer);
    const delay = artistId === 'raven-lin' ? 105 : (artistId === 'akiko-oishi' ? 65 : 35);
    requestAnimationFrame(() => {
      signatureDeferredTimer = setTimeout(() => showArtistSignature(artistId), quiet() ? 0 : delay);
    });
  }

  function showArtistSignature(artistId) {
    if (!signatureLayer || !motionEnabled()) return;
    clearTimeout(signatureTimer);
    clearTimeout(signatureRemoveTimer);
    const seq = ++signatureSeq;
    signatureLayer.innerHTML = signatureMarkup(artistId);
    const signature = q('.artist-signature', signatureLayer);
    if (!signature) return;
    const hold = quiet() ? 560 : (artistId === 'raven-lin' ? 1120 : 1280);
    signatureTimer = setTimeout(() => {
      if (seq !== signatureSeq || !signature.isConnected) return;
      signature.classList.add('is-leaving');
      signatureRemoveTimer = setTimeout(() => {
        if (seq === signatureSeq && signature.isConnected) signatureLayer.replaceChildren();
      }, quiet() ? 180 : 360);
    }, hold);
  }

  function artistTransition(artistId, swap) {
    if (typeof swap !== 'function') return Promise.resolve();
    const sequence = ++artistTransitionSeq;
    if (state.artistTransition) {
      clearTimeout(state.artistTransition.timer);
      try { state.artistTransition.animation.cancel(); } catch {}
      state.artistTransition = null;
    }
    if (artistWipe) artistWipe.style.opacity = '0';
    if (!gallery || !artistWipe || !motionEnabled() || !artistWipe.animate) {
      swap();
      deferArtistSignature(artistId);
      queueInkBuild(120);
      return Promise.resolve();
    }

    const duration = quiet() ? 220 : (mobile() ? 310 : 350);
    artistWipe.style.opacity = '1';
    const animation = artistWipe.animate([
      { transform:'translate3d(104%,0,0) rotate(.35deg)', opacity:.94, offset:0 },
      { transform:'translate3d(-1%,0,0) rotate(0)', opacity:1, offset:.45 },
      { transform:'translate3d(-2%,0,0) rotate(0)', opacity:1, offset:.55 },
      { transform:'translate3d(-104%,0,0) rotate(-.35deg)', opacity:.94, offset:1 }
    ], { duration, easing:'cubic-bezier(.44,.02,.18,1)', fill:'both' });

    let committed = false;
    const commit = () => {
      if (committed || sequence !== artistTransitionSeq) return;
      committed = true;
      swap();
      deferArtistSignature(artistId);
      queueInkBuild(120);
    };
    const timer = setTimeout(commit, duration * .50);
    state.artistTransition = { animation, timer };

    return animation.finished.catch(() => {}).then(() => {
      clearTimeout(timer);
      if (sequence !== artistTransitionSeq) return;
      commit();
      artistWipe.style.opacity = '0';
      try { animation.cancel(); } catch {}
      if (state.artistTransition?.animation === animation) state.artistTransition = null;
    });
  }

  /* ---------- Session-only visitor traces: calmer, intentional stamps ---------- */
  function hashNumber(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
    return h >>> 0;
  }

  function recordJourney(type, key) {
    state.journey.push({ type, key, order: state.journey.length + 1 });
    if (state.unlocked) drawSecret();
  }

  function stamp(target, key, kind='section') {
    if (!target || target.querySelector(`.visitor-trace[data-key="${CSS.escape(key)}"]`)) return;
    state.traceCount += 1;
    const mark = document.createElement('span');
    mark.className = 'visitor-trace';
    mark.setAttribute('aria-hidden','true');
    mark.dataset.key = key;
    mark.dataset.kind = kind;
    mark.dataset.no = String(state.traceCount).padStart(2,'0');
    const n = hashNumber(key);
    mark.textContent = kind === 'artist' ? (artistGlyphs[key] || '✦') : (sectionGlyphs[key] || '✦');
    mark.style.setProperty('--trace-rot', `${((n % 13) - 6)}deg`);
    mark.style.setProperty('--trace-top', `${kind === 'artist' ? 74 + (n % 54) : 30 + (n % 66)}px`);
    target.classList.add('has-visitor-trace');
    target.append(mark);
  }

  function visitSection(id) {
    if (state.sections.has(id)) return;
    state.sections.add(id);
    recordJourney('section', id);
    stamp(q(`#${id}`), id, 'section');
    maybeUnlock();
  }

  function visitArtist(id) {
    if (!id || state.artists.has(id)) return;
    state.artists.add(id);
    recordJourney('artist', id);
    stamp(gallery, id, 'artist');
    maybeUnlock();
  }

  let initialGallerySignature = false;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting || entry.intersectionRatio < .18) return;
      visitSection(entry.target.id);
      if (entry.target.id === 'gallery' && !initialGallerySignature) {
        const currentArtist = root.dataset.selectedArtist;
        if (currentArtist) {
          initialGallerySignature = true;
          visitArtist(currentArtist);
          deferArtistSignature(currentArtist);
        }
      }
    }), { threshold:[.18,.38], rootMargin:'-4% 0px -10%' });
    sectionIds.map(id => q(`#${id}`)).filter(Boolean).forEach(el => observer.observe(el));
  }

  document.addEventListener('club:gallery-ready', event => {
    if (initialGallerySignature) return;
    const id = event.detail?.artistId || root.dataset.selectedArtist;
    const rect = gallery?.getBoundingClientRect();
    if (id && rect && rect.top < innerHeight * .92 && rect.bottom > innerHeight * .08) {
      initialGallerySignature = true;
      visitArtist(id);
      deferArtistSignature(id);
    }
  });

  document.addEventListener('club:artist-change', event => visitArtist(event.detail?.artistId));
  document.addEventListener('club:art-open', event => {
    const id = event.detail?.artId;
    if (!id || state.artworks.has(id)) return;
    state.artworks.add(id);
    recordJourney('artwork', id);
    maybeUnlock();
  });

  /* ---------- Secret Sketch: a real journey composition, not random confetti ---------- */
  const footerTools = q('.footer-tools');
  const secretTrigger = document.createElement('button');
  secretTrigger.type = 'button';
  secretTrigger.className = 'secret-sketch-trigger';
  secretTrigger.hidden = true;
  footerTools?.prepend(secretTrigger);

  const secretDialog = document.createElement('dialog');
  secretDialog.className = 'secret-sketch-dialog';
  secretDialog.setAttribute('aria-labelledby','secretSketchTitle');
  secretDialog.setAttribute('aria-describedby','secretSketchBody');
  secretDialog.innerHTML = '<article class="secret-sketch-paper"><button class="secret-sketch-close" type="button">×</button><span class="secret-sketch-kicker"></span><h3 id="secretSketchTitle"></h3><p id="secretSketchBody"></p><div class="secret-sketch-canvas" aria-hidden="true"></div><small class="secret-sketch-summary"></small><small class="secret-sketch-note"></small></article>';
  document.body.append(secretDialog);
  const secretCanvas = q('.secret-sketch-canvas', secretDialog);
  const secretPaper = q('.secret-sketch-paper', secretDialog);

  function copySecret() {
    const en = root.lang === 'en';
    secretTrigger.textContent = en ? '✦ SECRET SKETCH' : '✦ BẢN PHÁC BÍ MẬT';
    secretTrigger.setAttribute('aria-label', en ? 'Open your secret sketch from this visit' : 'Mở bản phác bí mật của lượt ghé này');
    q('.secret-sketch-close', secretDialog).setAttribute('aria-label', en ? 'Close' : 'Đóng');
    q('.secret-sketch-kicker', secretDialog).textContent = en ? 'YOUR TRACE / THIS VISIT' : 'DẤU VẾT / LẦN GHÉ NÀY';
    q('h3', secretDialog).textContent = en ? 'You left a line behind.' : 'Cậu đã để lại một nét.';
    q('p', secretDialog).textContent = en
      ? 'This line is rebuilt from the sections, artists and artworks you actually explored during this visit.'
      : 'Nét này được ghép từ chính những góc, họa sĩ và tác phẩm cậu đã thực sự khám phá trong lượt ghé này.';
    q('.secret-sketch-summary', secretDialog).textContent = en
      ? `${state.sections.size} CORNERS · ${state.artists.size} ARTISTS · ${state.artworks.size} ARTWORKS`
      : `${state.sections.size} GÓC · ${state.artists.size} HỌA SĨ · ${state.artworks.size} TÁC PHẨM`;
    q('.secret-sketch-note', secretDialog).textContent = en ? 'NO ACCOUNT · NO TRACKING · RESET ON RELOAD' : 'KHÔNG TÀI KHOẢN · KHÔNG THEO DÕI · TẢI LẠI LÀM MỚI';
  }

  function secretPath(points) {
    if (!points.length) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y} l 0.01 0`;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      d += ` Q ${current.x} ${current.y} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
    }
    const last = points[points.length - 1];
    const prev = points[points.length - 2];
    d += ` Q ${prev.x} ${prev.y} ${last.x} ${last.y}`;
    return d;
  }

  function drawSecret() {
    if (!secretCanvas) return;
    const events = state.journey.slice(-14);
    if (!events.length) { secretCanvas.replaceChildren(); return; }
    const points = events.map((event, index) => {
      const n = hashNumber(`${event.type}:${event.key}:${index}`);
      const spread = events.length <= 1 ? 0 : index / (events.length - 1);
      return {
        event,
        x: 11 + spread * 78,
        y: 36 + (((n >>> 5) % 19) - 9) + Math.sin(index * 1.45) * 4,
      };
    });
    const marks = points.map(({ event, x, y }, index) => {
      const n = hashNumber(`${event.key}:${index}`);
      const rot = (n % 18) - 9;
      if (event.type === 'artist') {
        const color = artistColors[event.key] || '#a44331';
        const glyph = artistGlyphs[event.key] || '✦';
        return `<g class="secret-node artist" style="--node:${color}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot})"><circle r="4.8"/><circle class="inner" r="2.9"/><text y="1.4">${glyph}</text></g>`;
      }
      if (event.type === 'artwork') {
        return `<g class="secret-node artwork" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="1.7"/><path d="M -3.8 0 H 3.8 M 0 -3.8 V 3.8"/></g>`;
      }
      const glyph = sectionGlyphs[event.key] || '✦';
      return `<g class="secret-node section" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot})"><circle r="3.7"/><text y="1.35">${glyph}</text></g>`;
    }).join('');
    secretCanvas.innerHTML = `<svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path pathLength="1" class="secret-journey-guide" d="${secretPath(points)}"/><path pathLength="1" class="secret-journey-path" d="${secretPath(points)}"/>${marks}</svg>`;
    copySecret();
  }

  function maybeUnlock() {
    if (state.unlocked) return;
    const enough = state.sections.size >= 5 || (state.sections.size >= 3 && state.artists.size >= 2) || (state.sections.size >= 3 && state.artworks.size >= 3);
    if (!enough) return;
    state.unlocked = true;
    secretTrigger.hidden = false;
    secretTrigger.classList.add('is-unlocked');
    copySecret();
    drawSecret();
    if (!quiet()) motion?.burst?.(secretTrigger, '', 4);
  }

  secretTrigger?.addEventListener('click', () => {
    copySecret();
    drawSecret();
    if (!secretDialog.open) secretDialog.showModal();
    if (motionEnabled() && secretPaper?.animate) {
      secretPaper.animate([
        { opacity:0, transform:'translate3d(0,10px,0) scale(.985) rotate(-.7deg)' },
        { opacity:1, transform:'translate3d(0,0,0) scale(1) rotate(-.45deg)' }
      ], { duration: quiet() ? 140 : 260, easing:'cubic-bezier(.2,.78,.2,1)', fill:'both' });
    }
    q('.secret-sketch-close', secretDialog)?.focus({preventScroll:true});
  });
  q('.secret-sketch-close', secretDialog)?.addEventListener('click', () => secretDialog.close());
  secretDialog.addEventListener('cancel', event => { event.preventDefault(); secretDialog.close(); });
  secretDialog.addEventListener('click', event => { if (event.target === secretDialog) secretDialog.close(); });
  secretDialog.addEventListener('close', () => secretTrigger?.focus({preventScroll:true}));
  document.addEventListener('club:language', () => { copySecret(); if (state.unlocked) drawSecret(); });

  queueInkBuild(0);
  const api = {
    version:'7.0.2',
    artistTransition,
    showArtistSignature,
    rebuildInk:() => queueInkBuild(0),
    get state() {
      return {
        sections:[...state.sections],
        artists:[...state.artists],
        artworks:[...state.artworks],
        journey:[...state.journey],
        unlocked:state.unlocked,
        traceCount:state.traceCount,
      };
    }
  };
  window.ClubLivingSketchbook = api;
  document.dispatchEvent(new CustomEvent('club:living-sketchbook-ready'));
  return api;
}
