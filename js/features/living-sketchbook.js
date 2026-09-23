const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const root = document.documentElement;

export function initLivingSketchbook() {
  const motion = window.ClubMotion;
  const state = {
    sections: new Set(),
    artists: new Set(),
    artworks: new Set(),
    traceCount: 0,
    unlocked: false,
    transition: null,
    artistTransition: null,
  };
  const sectionIds = ['about', 'gallery', 'activities', 'playlist', 'join', 'contact'];
  const sectionGlyphs = { about:'✦', gallery:'⌁', activities:'✎', playlist:'♪', join:'★', contact:'↗' };
  const artistGlyphs = { 'bao-tam':'〰', 'akiko-oishi':'◉', 'raven-lin':'⌬' };
  const motionEnabled = () => root.dataset.motion !== 'off' && motion?.enabled !== false;
  const quiet = () => root.dataset.motionChoice === 'quiet';
  const q = (selector, scope=document) => scope.querySelector(selector);

  /* ---------- Signature ink line ---------- */
  const inkHost = document.createElement('div');
  inkHost.className = 'living-ink';
  inkHost.setAttribute('aria-hidden', 'true');
  inkHost.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path class="ink-shadow"/><path class="ink-path"/><g class="ink-landmarks"></g></svg>';
  document.body.append(inkHost);
  const inkSvg = q('svg', inkHost), inkPath = q('.ink-path', inkHost), inkShadow = q('.ink-shadow', inkHost), landmarkGroup = q('.ink-landmarks', inkHost);
  let inkLength = 0, inkFrame = 0, rebuildFrame = 0;

  function inkX(width) {
    const contentWidth = Math.min(1220, Math.max(0, width - 64));
    const margin = Math.max(12, (width - contentWidth) / 2);
    return width <= 800 ? 10 : clamp(margin * .46, 20, 62);
  }
  function rebuildInk() {
    rebuildFrame = 0;
    const width = document.documentElement.clientWidth;
    const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, innerHeight);
    const x = inkX(width);
    inkHost.style.height = `${height}px`;
    inkSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const anchors = [q('#home'), ...sectionIds.map(id => q(`#${id}`)).filter(Boolean), q('.footer')].filter(Boolean);
    const points = anchors.map((el, index) => {
      const rect = el.getBoundingClientRect();
      const y = rect.top + scrollY + Math.min(Math.max(70, rect.height * .18), 170);
      const wobble = width <= 800 ? (index % 2 ? 3 : -2) : (index % 3 - 1) * 10;
      return { x: x + wobble, y };
    });
    if (!points.length) return;
    let d = `M ${points[0].x} ${Math.max(0, points[0].y - 130)}`;
    for (let i = 0; i < points.length; i++) {
      const p = points[i], next = points[i + 1];
      if (!next) { d += ` L ${p.x} ${Math.min(height - 20, p.y + 180)}`; break; }
      const dy = next.y - p.y;
      const bow = (i % 2 ? 1 : -1) * (width <= 800 ? 8 : 22);
      d += ` C ${p.x + bow} ${p.y + dy * .28}, ${next.x - bow} ${p.y + dy * .72}, ${next.x} ${next.y}`;
    }
    inkPath.setAttribute('d', d); inkShadow.setAttribute('d', d);
    try { inkLength = inkPath.getTotalLength(); } catch { inkLength = 0; }
    if (inkLength) {
      [inkPath, inkShadow].forEach(path => {
        path.style.strokeDasharray = String(inkLength);
        path.style.strokeDashoffset = root.dataset.motion === 'off' ? '0' : String(inkLength);
      });
    }
    const gallery = q('#gallery'), playlist = q('#playlist');
    const parts = [];
    if (gallery) {
      const r = gallery.getBoundingClientRect(), y = r.top + scrollY + 120;
      parts.push(`<path class="ink-landmark gallery" d="M ${x-3} ${y-24} h 28 v 26 h -18 M ${x+8} ${y+14} h 20"/>`);
    }
    if (playlist) {
      const r = playlist.getBoundingClientRect(), y = r.top + scrollY + 132;
      parts.push(`<path class="ink-landmark music" d="M ${x+2} ${y} c 34 -30 51 15 21 27 c -23 9 -31 -17 -10 -24 c 13 -4 18 9 8 14"/>`);
    }
    landmarkGroup.innerHTML = parts.join('');
    updateInk();
  }
  function queueInkBuild() {
    if (!rebuildFrame) rebuildFrame = requestAnimationFrame(rebuildInk);
  }
  function updateInk() {
    inkFrame = 0;
    if (!inkLength || root.dataset.motion === 'off') return;
    const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const denominator = Math.max(1, height - innerHeight * .45);
    const progress = clamp((scrollY + innerHeight * .55) / denominator, 0, 1);
    const offset = inkLength * (1 - progress);
    inkPath.style.strokeDashoffset = String(offset);
    inkShadow.style.strokeDashoffset = String(offset);
  }
  const queueInk = () => { if (!inkFrame) inkFrame = requestAnimationFrame(updateInk); };
  addEventListener('scroll', queueInk, { passive:true });
  addEventListener('resize', queueInkBuild, { passive:true });
  addEventListener('load', queueInkBuild, { once:true });
  document.addEventListener('club:motion', () => { queueInkBuild(); });

  /* ---------- Full-page sketchbook transition ---------- */
  const pageTurn = document.createElement('div');
  pageTurn.className = 'living-page-turn';
  pageTurn.setAttribute('aria-hidden', 'true');
  pageTurn.innerHTML = '<div class="living-page-sheet"><span class="living-page-stitch"></span><span class="living-page-doodle">TURN / DRAW / GO</span></div>';
  document.body.append(pageTurn);
  const pageSheet = q('.living-page-sheet', pageTurn);
  let pageTransitionSeq = 0;

  function targetTop(target) {
    const header = q('.site-header');
    const offset = target.id === 'top' ? 0 : Math.max(76, (header?.getBoundingClientRect().height || 62) + 28);
    return Math.max(0, target.getBoundingClientRect().top + scrollY - offset);
  }
  function navigateWithPaper(hash, target) {
    if (!motionEnabled() || !pageSheet.animate || Math.abs(targetTop(target) - scrollY) < 28) {
      target.scrollIntoView({ behavior: motionEnabled() ? 'smooth' : 'auto', block:'start' });
      history.pushState(null, '', hash);
      return;
    }
    const sequence = ++pageTransitionSeq;
    if (state.transition) {
      clearTimeout(state.transition.timer);
      try { state.transition.animation.cancel(); } catch {}
      state.transition = null;
    }
    const duration = quiet() ? 300 : 520;
    pageTurn.classList.add('is-active');
    const animation = pageSheet.animate([
      { transform:'translate3d(110%,0,0) rotateY(-7deg)', opacity:.98, offset:0 },
      { transform:'translate3d(0,0,0) rotateY(0deg)', opacity:1, offset:.48 },
      { transform:'translate3d(-108%,0,0) rotateY(7deg)', opacity:.98, offset:1 }
    ], { duration, easing:'cubic-bezier(.65,0,.2,1)', fill:'both' });
    const timer = setTimeout(() => {
      window.scrollTo({ top: targetTop(target), behavior:'auto' });
      history.pushState(null, '', hash);
    }, duration * .48);
    state.transition = { animation, timer };
    animation.finished.catch(() => {}).finally(() => {
      clearTimeout(timer);
      if (sequence !== pageTransitionSeq) return;
      pageTurn.classList.remove('is-active');
      animation.cancel();
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

  /* ---------- Artist page wipe + three motion identities ---------- */
  const gallery = q('#gallery');
  const artistWipe = document.createElement('div'); artistWipe.className = 'artist-paper-wipe'; artistWipe.setAttribute('aria-hidden','true');
  const signatureLayer = document.createElement('div'); signatureLayer.className = 'artist-signature-layer'; signatureLayer.setAttribute('aria-hidden','true');
  gallery?.prepend(signatureLayer, artistWipe);
  let signatureTimer = 0, artistTransitionSeq = 0;
  function showArtistSignature(artistId) {
    if (!signatureLayer || !motionEnabled()) return;
    clearTimeout(signatureTimer);
    if (artistId === 'bao-tam') {
      signatureLayer.innerHTML = '<div class="artist-signature haruko"><svg viewBox="0 0 300 72" aria-hidden="true"><path d="M8 40 C55 7 116 61 182 27 S268 31 292 18"/><path d="M22 59 C92 43 178 67 268 45"/></svg></div>';
    } else if (artistId === 'akiko-oishi') {
      signatureLayer.innerHTML = '<div class="artist-signature akiko"><i></i><i></i><i></i><i></i></div>';
    } else if (artistId === 'raven-lin') {
      signatureLayer.innerHTML = '<div class="artist-signature raven"></div>';
    } else signatureLayer.replaceChildren();
    signatureTimer = setTimeout(() => signatureLayer.replaceChildren(), artistId === 'raven-lin' ? 1150 : 1300);
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
      swap(); showArtistSignature(artistId); return Promise.resolve();
    }
    const duration = quiet() ? 240 : 420;
    artistWipe.style.opacity = '1';
    const animation = artistWipe.animate([
      { transform:'translate3d(105%,0,0) rotate(.8deg)', opacity:.92, offset:0 },
      { transform:'translate3d(0,0,0) rotate(0)', opacity:1, offset:.46 },
      { transform:'translate3d(-105%,0,0) rotate(-.8deg)', opacity:.94, offset:1 }
    ], { duration, easing:'cubic-bezier(.62,0,.2,1)', fill:'both' });
    let committed = false;
    const commit = () => {
      if (committed || sequence !== artistTransitionSeq) return; committed = true;
      swap();
      showArtistSignature(artistId);
    };
    const timer = setTimeout(commit, duration * .46);
    state.artistTransition = { animation, timer };
    return animation.finished.catch(() => {}).then(() => {
      clearTimeout(timer);
      if (sequence !== artistTransitionSeq) return;
      commit(); artistWipe.style.opacity = '0';
      try { animation.cancel(); } catch {}
      if (state.artistTransition?.animation === animation) state.artistTransition = null;
    });
  }

  /* ---------- Session-only visitor traces ---------- */
  function hashNumber(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
    return h >>> 0;
  }
  function stamp(target, key, kind='section') {
    if (!target || target.querySelector(`.visitor-trace[data-key="${CSS.escape(key)}"]`)) return;
    state.traceCount += 1;
    const mark = document.createElement('span');
    mark.className = 'visitor-trace'; mark.setAttribute('aria-hidden','true'); mark.dataset.key = key; mark.dataset.kind = kind; mark.dataset.no = String(state.traceCount).padStart(2,'0');
    const n = hashNumber(key);
    mark.textContent = kind === 'artist' ? (artistGlyphs[key] || '✦') : (sectionGlyphs[key] || '✦');
    mark.style.setProperty('--trace-rot', `${((n % 19) - 9)}deg`);
    mark.style.setProperty('--trace-top', `${kind === 'artist' ? 72 + (n % 70) : 26 + (n % 82)}px`);
    target.classList.add('has-visitor-trace'); target.append(mark);
    maybeUnlock();
  }
  function visitSection(id) {
    if (state.sections.has(id)) return;
    state.sections.add(id); stamp(q(`#${id}`), id, 'section'); maybeUnlock();
  }
  function visitArtist(id) {
    if (!id || state.artists.has(id)) return;
    state.artists.add(id); stamp(gallery, id, 'artist'); maybeUnlock();
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
          showArtistSignature(currentArtist);
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
      initialGallerySignature = true; visitArtist(id); showArtistSignature(id);
    }
  });
  document.addEventListener('club:artist-change', event => visitArtist(event.detail?.artistId));
  document.addEventListener('club:art-open', event => {
    const id = event.detail?.artId; if (id) state.artworks.add(id); maybeUnlock();
  });

  const footerTools = q('.footer-tools');
  const secretTrigger = document.createElement('button');
  secretTrigger.type = 'button'; secretTrigger.className = 'secret-sketch-trigger'; secretTrigger.hidden = true;
  footerTools?.prepend(secretTrigger);
  const secretDialog = document.createElement('dialog');
  secretDialog.className = 'secret-sketch-dialog';
  secretDialog.setAttribute('aria-labelledby','secretSketchTitle');
  secretDialog.setAttribute('aria-describedby','secretSketchBody');
  secretDialog.innerHTML = '<article class="secret-sketch-paper"><button class="secret-sketch-close" type="button">×</button><span class="secret-sketch-kicker"></span><h3 id="secretSketchTitle"></h3><p id="secretSketchBody"></p><div class="secret-sketch-canvas" aria-hidden="true"></div><small class="secret-sketch-note"></small></article>';
  document.body.append(secretDialog);
  const secretCanvas = q('.secret-sketch-canvas', secretDialog);

  function copySecret() {
    const en = root.lang === 'en';
    secretTrigger.textContent = en ? '✦ SECRET SKETCH' : '✦ BẢN PHÁC BÍ MẬT';
    secretTrigger.setAttribute('aria-label', en ? 'Open your secret sketch from this visit' : 'Mở bản phác bí mật của lượt ghé này');
    q('.secret-sketch-close', secretDialog).setAttribute('aria-label', en ? 'Close' : 'Đóng');
    q('.secret-sketch-kicker', secretDialog).textContent = en ? 'YOUR TRACE / THIS VISIT' : 'DẤU VẾT / LẦN GHÉ NÀY';
    q('h3', secretDialog).textContent = en ? 'You left a line behind.' : 'Cậu đã để lại một nét.';
    q('p', secretDialog).textContent = en
      ? 'The composition changes with the corners and artists you explored. It exists only in this page visit.'
      : 'Bố cục này thay đổi theo những góc và họa sĩ cậu đã khám phá. Nó chỉ tồn tại trong lượt mở trang này.';
    q('.secret-sketch-note', secretDialog).textContent = en ? 'NO ACCOUNT · NO TRACKING · RESET ON RELOAD' : 'KHÔNG TÀI KHOẢN · KHÔNG THEO DÕI · TẢI LẠI LÀM MỚI';
  }
  function drawSecret() {
    if (!secretCanvas) return;
    const keys = [...state.sections, ...state.artists, ...state.artworks].slice(0, 12);
    const types = ['line','ring','star','cross','scribble'];
    const colors = ['#536b48','#a44331','#355972','#d990a4','#e0bb58','#252923'];
    secretCanvas.replaceChildren();
    keys.forEach((key, index) => {
      const n = hashNumber(`${key}:${index}`), mark = document.createElement('i');
      mark.className = `secret-mark ${types[n % types.length]}`;
      mark.style.setProperty('--x', `${12 + (n % 74)}%`);
      mark.style.setProperty('--y', `${18 + ((n >>> 5) % 65)}%`);
      mark.style.setProperty('--s', `${18 + ((n >>> 11) % 52)}px`);
      mark.style.setProperty('--r', `${((n >>> 17) % 70) - 35}deg`);
      mark.style.setProperty('--c', colors[(n >>> 23) % colors.length]);
      secretCanvas.append(mark);
    });
  }
  function maybeUnlock() {
    if (state.unlocked) return;
    const enough = state.sections.size >= 5 || (state.sections.size >= 3 && state.artists.size >= 2) || (state.sections.size >= 3 && state.artworks.size >= 3);
    if (!enough) return;
    state.unlocked = true; secretTrigger.hidden = false; secretTrigger.classList.add('is-unlocked');
    copySecret(); drawSecret();
    motion?.burst?.(secretTrigger, '', 7);
  }
  secretTrigger?.addEventListener('click', () => {
    copySecret(); drawSecret();
    if (!secretDialog.open) secretDialog.showModal();
    q('.secret-sketch-close', secretDialog)?.focus({preventScroll:true});
  });
  q('.secret-sketch-close', secretDialog)?.addEventListener('click', () => secretDialog.close());
  secretDialog.addEventListener('cancel', event => { event.preventDefault(); secretDialog.close(); });
  secretDialog.addEventListener('click', event => { if (event.target === secretDialog) secretDialog.close(); });
  secretDialog.addEventListener('close', () => secretTrigger?.focus({preventScroll:true}));
  document.addEventListener('club:language', copySecret);

  queueInkBuild();
  const api = {
    version:'7.0.0', artistTransition, showArtistSignature, rebuildInk:queueInkBuild,
    get state() { return { sections:[...state.sections], artists:[...state.artists], artworks:[...state.artworks], unlocked:state.unlocked, traceCount:state.traceCount }; }
  };
  window.ClubLivingSketchbook = api;
  document.dispatchEvent(new CustomEvent('club:living-sketchbook-ready'));
  return api;
}
