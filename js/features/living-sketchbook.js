const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const root = document.documentElement;

export function initLivingSketchbook() {
  const motion = window.ClubMotion;
  const q = (selector, scope = document) => scope.querySelector(selector);
  const mobile = () => matchMedia('(max-width:800px)').matches;
  const motionEnabled = () => root.dataset.motion !== 'off' && motion?.enabled !== false;
  const quiet = () => root.dataset.motionChoice === 'quiet';
  const sectionIds = ['about', 'gallery', 'activities', 'playlist', 'join', 'contact'];
  const labels = { about:'ABOUT', gallery:'GALLERY', activities:'MAKE', playlist:'LISTEN', join:'JOIN', contact:'HELLO' };
  const glyphs = { about:'✦', gallery:'⌁', activities:'✎', playlist:'♪', join:'★', contact:'↗' };
  const artistGlyphs = { 'bao-tam':'〰', 'akiko-oishi':'◉', 'raven-lin':'⌬' };
  const artistColors = { 'bao-tam':'#65785b', 'akiko-oishi':'#355972', 'raven-lin':'#a44331' };
  const state = {
    sections:new Set(), artists:new Set(), artworks:new Set(), journey:[], traceCount:0,
    unlocked:false, transition:null, artistTransition:null, activeSection:'about'
  };

  /* ---------------------------------------------------------------------
     1. Ink rail: viewport-local and transform-only during scroll.
  --------------------------------------------------------------------- */
  const rail = document.createElement('aside');
  rail.className = 'ls-rail';
  rail.setAttribute('aria-hidden','true');
  rail.innerHTML = '<svg viewBox="0 0 34 1000" preserveAspectRatio="none"><path class="ls-rail-line"/><path class="ls-rail-progress" pathLength="1"/></svg><div class="ls-rail-nodes"></div><span class="ls-rail-tip"></span>';
  document.body.append(rail);
  const railLine = q('.ls-rail-line', rail);
  const railProgress = q('.ls-rail-progress', rail);
  const railNodes = q('.ls-rail-nodes', rail);
  const railTip = q('.ls-rail-tip', rail);
  const route = 'M 13 0 C 21 118 8 225 14 344 C 20 460 8 557 14 678 C 20 798 9 890 14 1000';
  railLine.setAttribute('d', route);
  railProgress.setAttribute('d', route);
  railProgress.style.strokeDasharray = '1';
  const railItems = [];
  sectionIds.forEach((id, index) => {
    const node = document.createElement('span');
    node.className = 'ls-rail-node';
    node.dataset.section = id;
    const p = sectionIds.length === 1 ? .5 : index / (sectionIds.length - 1);
    node.style.top = `${4 + p * 92}%`;
    const note = document.createElement('span');
    note.className = 'ls-rail-note';
    note.textContent = labels[id];
    note.style.top = node.style.top;
    railNodes.append(node, note);
    railItems.push({ id, node, note });
  });

  let scrollFrame = 0;
  let lastProgress = -1;
  function updateRail(force = false) {
    scrollFrame = 0;
    const doc = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const max = Math.max(1, doc - innerHeight);
    const progress = clamp(scrollY / max, 0, 1);
    if (!force && Math.abs(progress - lastProgress) < .001) return;
    lastProgress = progress;
    railProgress.style.strokeDashoffset = root.dataset.motion === 'off' ? '0' : String(1 - progress);
    railTip.style.transform = `translate3d(0,${(progress * Math.max(0, rail.clientHeight - 8)).toFixed(1)}px,0) scale(${quiet() ? .68 : .82})`;
  }
  function queueRail() {
    if (!scrollFrame && !document.hidden) scrollFrame = requestAnimationFrame(() => updateRail(false));
  }
  addEventListener('scroll', queueRail, { passive:true });
  addEventListener('resize', () => updateRail(true), { passive:true });
  addEventListener('orientationchange', () => setTimeout(() => updateRail(true), 120), { passive:true });
  document.addEventListener('club:motion', () => updateRail(true));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateRail(true); });

  function setActiveSection(id) {
    if (!id || state.activeSection === id) return;
    state.activeSection = id;
    railItems.forEach(item => item.node.classList.toggle('is-active', item.id === id));
  }

  /* ---------------------------------------------------------------------
     2. Paper transition: one physical flap, with atomic cleanup.
  --------------------------------------------------------------------- */
  const turn = document.createElement('div');
  turn.className = 'ls-page-turn';
  turn.setAttribute('aria-hidden','true');
  turn.innerHTML = '<div class="ls-page-flap"><span class="ls-page-fold"></span><span class="ls-page-meta">ART CLUB / LIVING SKETCHBOOK</span><span class="ls-page-word">turn</span><span class="ls-page-corner"></span></div>';
  document.body.append(turn);
  const flap = q('.ls-page-flap', turn);
  let transitionSeq = 0;

  function targetTop(target) {
    const header = q('.site-header');
    const offset = target.id === 'top' ? 0 : Math.max(76, (header?.getBoundingClientRect().height || 62) + 28);
    return Math.max(0, target.getBoundingClientRect().top + scrollY - offset);
  }
  function cancelTurn() {
    if (!state.transition) return;
    clearTimeout(state.transition.timer);
    try { state.transition.animation.cancel(); } catch {}
    state.transition = null;
    turn.classList.remove('is-active');
  }
  function navigateWithPaper(hash, target) {
    cancelTurn();
    const destination = targetTop(target);
    if (!motionEnabled() || !flap.animate || Math.abs(destination - scrollY) < 30) {
      window.scrollTo({ top:destination, behavior:motionEnabled() ? 'smooth' : 'auto' });
      history.pushState(null, '', hash);
      return;
    }
    const seq = ++transitionSeq;
    const duration = quiet() ? 300 : (mobile() ? 470 : 540);
    turn.classList.add('is-active');
    const distance = innerWidth * (mobile() ? 2.20 : 1.58);
    const animation = flap.animate([
      { transform:'translate3d(0,0,0) skewX(-1.2deg)', offset:0 },
      { transform:`translate3d(${-distance * .48}px,0,0) skewX(.25deg)`, offset:.46 },
      { transform:`translate3d(${-distance * .54}px,0,0) skewX(.1deg)`, offset:.54 },
      { transform:`translate3d(${-distance}px,0,0) skewX(1deg)`, offset:1 }
    ], { duration, easing:'cubic-bezier(.43,.03,.16,1)', fill:'both' });
    let committed = false;
    const commit = () => {
      if (committed || seq !== transitionSeq) return;
      committed = true;
      window.scrollTo({ top:targetTop(target), behavior:'auto' });
      history.pushState(null, '', hash);
      const id = target.id;
      if (sectionIds.includes(id)) setActiveSection(id);
    };
    const timer = setTimeout(commit, Math.round(duration * .50));
    state.transition = { animation, timer };
    animation.finished.catch(() => {}).finally(() => {
      clearTimeout(timer);
      if (seq !== transitionSeq) return;
      commit();
      turn.classList.remove('is-active');
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
    try { target = q(href); } catch { return; }
    if (!target) return;
    event.preventDefault();
    navigateWithPaper(href, target);
  });

  /* Gallery-local slip + signatures. */
  const gallery = q('#gallery');
  const grid = q('#galleryGrid');
  const slip = document.createElement('div');
  slip.className = 'ls-artist-slip';
  slip.setAttribute('aria-hidden','true');
  gallery?.append(slip);
  const signatureLayer = document.createElement('div');
  signatureLayer.className = 'ls-signature-layer';
  signatureLayer.setAttribute('aria-hidden','true');
  gallery?.append(signatureLayer);
  let artistSeq = 0;
  let signatureSeq = 0;
  let signatureHold = 0;
  let signatureRemove = 0;

  function anchorSignature() {
    if (!gallery || !signatureLayer) return;
    const author = q('.gallery-author', gallery) || q('.section-heading', gallery);
    if (!author) return;
    const gr = gallery.getBoundingClientRect();
    const ar = author.getBoundingClientRect();
    signatureLayer.style.left = `${Math.max(0, ar.left - gr.left)}px`;
    signatureLayer.style.top = `${Math.max(0, ar.top - gr.top)}px`;
    signatureLayer.style.width = `${Math.max(180, ar.width)}px`;
    signatureLayer.style.height = `${Math.max(96, ar.height + 56)}px`;
  }
  const signatureMarkup = artistId => {
    if (artistId === 'bao-tam') return '<div class="ls-signature haruko"><svg viewBox="0 0 420 112" aria-hidden="true"><path pathLength="1" class="ls-h-ghost" d="M13 76 C58 28 107 81 163 48 C215 18 278 70 403 28"/><path pathLength="1" class="ls-h-main" d="M7 67 C61 16 114 88 171 44 C229 1 288 76 410 19"/><path pathLength="1" class="ls-h-red" d="M66 36 C79 27 93 24 111 27 M294 72 C311 65 331 66 350 72"/><path pathLength="1" class="ls-h-yellow" d="M212 76 C232 72 250 72 271 77"/><circle class="ls-h-dot" cx="372" cy="35" r="4"/></svg></div>';
    if (artistId === 'akiko-oishi') return '<div class="ls-signature akiko"><span class="ls-a-ring"></span><span class="ls-a-ring b"></span><span class="ls-a-core"></span><span class="ls-a-orbit"></span><i class="ls-a-pixel p1"></i><i class="ls-a-pixel p2"></i><i class="ls-a-pixel p3"></i><i class="ls-a-pixel p4"></i></div>';
    if (artistId === 'raven-lin') return '<div class="ls-signature raven"><span class="ls-r-frame"></span><span class="ls-r-scan"></span><span class="ls-r-lock"></span><span class="ls-r-label">IX / REGISTER / 03</span></div>';
    return '';
  };
  function showArtistSignature(artistId) {
    if (!motionEnabled() || !signatureLayer) return;
    clearTimeout(signatureHold);clearTimeout(signatureRemove);
    const seq = ++signatureSeq;
    anchorSignature();
    signatureLayer.replaceChildren();
    signatureLayer.insertAdjacentHTML('beforeend', signatureMarkup(artistId));
    const signature = q('.ls-signature', signatureLayer);
    if (!signature) return;
    if (artistId === 'bao-tam') { signature.style.left = mobile() ? '7px' : '10px';signature.style.top = mobile() ? '39px' : '44px'; }
    if (artistId === 'akiko-oishi') { signature.style.right = mobile() ? '7px' : '18px';signature.style.top = mobile() ? '8px' : '4px'; }
    if (artistId === 'raven-lin') { signature.style.left = '8px';signature.style.top = mobile() ? '34px' : '42px'; }
    const hold = quiet() ? 720 : (artistId === 'raven-lin' ? 1480 : 1680);
    signatureHold = setTimeout(() => {
      if (seq !== signatureSeq || !signature.isConnected) return;
      signature.classList.add('is-out');
      signatureRemove = setTimeout(() => { if (seq === signatureSeq) signatureLayer.replaceChildren(); }, 470);
    }, hold);
  }
  addEventListener('resize', anchorSignature, { passive:true });

  function artistTransition(artistId, swap) {
    if (typeof swap !== 'function') return Promise.resolve();
    const seq = ++artistSeq;
    if (state.artistTransition) {
      clearTimeout(state.artistTransition.timer);
      try { state.artistTransition.animation.cancel(); } catch {}
      state.artistTransition = null;
    }
    if (!gallery || !grid || !slip || !motionEnabled() || !slip.animate) {
      swap();
      requestAnimationFrame(() => showArtistSignature(artistId));
      return Promise.resolve();
    }
    const gr = gallery.getBoundingClientRect();
    const rr = grid.getBoundingClientRect();
    slip.style.top = `${rr.top - gr.top}px`;
    slip.style.height = `${Math.max(220, rr.height)}px`;
    slip.dataset.label = artistId === 'bao-tam' ? '01 / HARUKO' : artistId === 'akiko-oishi' ? '02 / AKIKO' : '03 / RAVEN';
    slip.style.opacity = '1';
    const duration = quiet() ? 260 : (mobile() ? 390 : 440);
    const distance = innerWidth * (mobile() ? 1.90 : 1.32);
    const animation = slip.animate([
      { transform:'translate3d(0,0,0)', offset:0 },
      { transform:`translate3d(${-distance * .48}px,0,0)`, offset:.47 },
      { transform:`translate3d(${-distance * .54}px,0,0)`, offset:.55 },
      { transform:`translate3d(${-distance}px,0,0)`, offset:1 }
    ], { duration, easing:'cubic-bezier(.43,.03,.16,1)', fill:'both' });
    let committed = false;
    const commit = () => {
      if (committed || seq !== artistSeq) return;
      committed = true;
      swap();
      requestAnimationFrame(() => setTimeout(() => showArtistSignature(artistId), quiet() ? 0 : 52));
    };
    const timer = setTimeout(commit, Math.round(duration * .51));
    state.artistTransition = { animation, timer };
    return animation.finished.catch(() => {}).then(() => {
      clearTimeout(timer);
      if (seq !== artistSeq) return;
      commit();
      slip.style.opacity = '0';
      try { animation.cancel(); } catch {}
      if (state.artistTransition?.animation === animation) state.artistTransition = null;
    });
  }

  /* ---------------------------------------------------------------------
     3+4. Session traces and a deliberate journey composition.
  --------------------------------------------------------------------- */
  function hashNumber(text) {
    let h = 2166136261;
    for (let i=0;i<text.length;i++) h = Math.imul(h ^ text.charCodeAt(i),16777619);
    return h >>> 0;
  }
  function record(type, key) {
    state.journey.push({ type, key, order:state.journey.length + 1 });
    if (state.unlocked) drawSecret();
  }
  function stamp(target, key, kind='section') {
    if (!target || target.querySelector(`.ls-trace[data-key="${CSS.escape(key)}"]`)) return;
    state.traceCount += 1;
    const n = hashNumber(`${kind}:${key}`);
    const mark = document.createElement('span');
    mark.className = 'ls-trace';
    mark.setAttribute('aria-hidden','true');
    mark.dataset.key = key;mark.dataset.kind = kind;mark.dataset.no = String(state.traceCount).padStart(2,'0');
    mark.textContent = kind === 'artist' ? (artistGlyphs[key] || '✦') : (glyphs[key] || '✦');
    mark.style.setProperty('--ls-trace-r', `${(n % 11) - 5}deg`);
    mark.style.setProperty('--ls-trace-y', `${kind === 'artist' ? 74 + (n % 38) : 28 + (n % 44)}px`);
    if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
    target.append(mark);
  }
  function visitSection(id) {
    if (!id || state.sections.has(id)) return;
    state.sections.add(id);record('section',id);stamp(q(`#${id}`),id,'section');maybeUnlock();
  }
  function visitArtist(id) {
    if (!id || state.artists.has(id)) return;
    state.artists.add(id);record('artist',id);stamp(gallery,id,'artist');maybeUnlock();
  }

  let gallerySigned = false;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target?.id) setActiveSection(visible[0].target.id);
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.intersectionRatio < .18) return;
        visitSection(entry.target.id);
        if (entry.target.id === 'gallery' && !gallerySigned) {
          const id = root.dataset.selectedArtist;
          if (id) { gallerySigned = true;visitArtist(id);showArtistSignature(id); }
        }
      });
    }, { threshold:[.18,.34,.52], rootMargin:'-8% 0px -14%' });
    sectionIds.map(id => q(`#${id}`)).filter(Boolean).forEach(el => observer.observe(el));
  }
  document.addEventListener('club:gallery-ready', event => {
    if (gallerySigned) return;
    const id = event.detail?.artistId || root.dataset.selectedArtist;
    const rect = gallery?.getBoundingClientRect();
    if (id && rect && rect.top < innerHeight*.9 && rect.bottom > innerHeight*.1) {
      gallerySigned = true;visitArtist(id);showArtistSignature(id);
    }
  });
  document.addEventListener('club:artist-change', event => visitArtist(event.detail?.artistId));
  document.addEventListener('club:art-open', event => {
    const id = event.detail?.artId;
    if (!id || state.artworks.has(id)) return;
    state.artworks.add(id);record('artwork',id);maybeUnlock();
  });

  const footerTools = q('.footer-tools');
  const trigger = document.createElement('button');
  trigger.type = 'button';trigger.className = 'secret-sketch-trigger';trigger.hidden = true;
  footerTools?.prepend(trigger);
  const dialog = document.createElement('dialog');
  dialog.className = 'secret-sketch-dialog';
  dialog.setAttribute('aria-labelledby','secretSketchTitle');
  dialog.setAttribute('aria-describedby','secretSketchBody');
  dialog.innerHTML = '<article class="secret-sketch-paper"><button class="secret-sketch-close" type="button">×</button><span class="secret-sketch-kicker"></span><h3 id="secretSketchTitle"></h3><p id="secretSketchBody"></p><div class="secret-sketch-canvas" aria-hidden="true"></div><small class="secret-sketch-summary"></small><small class="secret-sketch-note"></small></article>';
  document.body.append(dialog);
  const canvas = q('.secret-sketch-canvas',dialog);
  const paper = q('.secret-sketch-paper',dialog);

  function copySecret() {
    const en = root.lang === 'en';
    trigger.textContent = en ? '✦ SECRET SKETCH' : '✦ BẢN PHÁC BÍ MẬT';
    trigger.setAttribute('aria-label', en ? 'Open your secret sketch from this visit' : 'Mở bản phác bí mật của lượt ghé này');
    q('.secret-sketch-close',dialog).setAttribute('aria-label',en ? 'Close' : 'Đóng');
    q('.secret-sketch-kicker',dialog).textContent = en ? 'YOUR ROUTE / THIS VISIT' : 'ĐƯỜNG ĐI / LẦN GHÉ NÀY';
    q('h3',dialog).textContent = en ? 'One visit. One line.' : 'Một lượt ghé. Một đường nét.';
    q('p',dialog).textContent = en ? 'The composition below follows the order in which you explored corners, artists and artworks.' : 'Bố cục dưới đây đi theo đúng thứ tự cậu đã khám phá các góc, họa sĩ và tác phẩm.';
    q('.secret-sketch-summary',dialog).textContent = en ? `${state.sections.size} CORNERS · ${state.artists.size} ARTISTS · ${state.artworks.size} ARTWORKS` : `${state.sections.size} GÓC · ${state.artists.size} HỌA SĨ · ${state.artworks.size} TÁC PHẨM`;
    q('.secret-sketch-note',dialog).textContent = en ? 'SESSION ONLY · NO TRACKING · RELOAD TO RESET' : 'CHỈ TRONG PHIÊN · KHÔNG THEO DÕI · TẢI LẠI ĐỂ LÀM MỚI';
  }
  function pathFor(points) {
    if (!points.length) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y} l .01 0`;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i=1;i<points.length;i++) {
      const p0 = points[i-1], p1 = points[i];
      const mx = (p0.x+p1.x)/2;
      d += ` C ${mx.toFixed(1)} ${p0.y.toFixed(1)}, ${mx.toFixed(1)} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }
    return d;
  }
  function drawSecret() {
    if (!canvas) return;
    const events = state.journey.slice(-16);
    if (!events.length) { canvas.replaceChildren();return; }
    const points = events.map((event,index) => {
      const n = hashNumber(`${event.type}:${event.key}:${index}`);
      const t = events.length === 1 ? .5 : index/(events.length-1);
      const wave = Math.sin(index*1.21)*7;
      const typeShift = event.type === 'artist' ? -7 : event.type === 'artwork' ? 8 : 0;
      return { event, x:8+t*84, y:31+wave+typeShift+((n%5)-2) };
    });
    const routePath = pathFor(points);
    const nodes = points.map(({event,x,y},index) => {
      const delay = 120 + index*46;
      const n = hashNumber(`${event.key}:${index}`);
      const rot = (n%14)-7;
      if (event.type === 'artist') {
        const color = artistColors[event.key] || '#a44331';
        return `<g class="secret-node artist" style="--node:${color};animation-delay:${delay}ms" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot})"><circle r="4.8"/><text y="1.25">${artistGlyphs[event.key] || '✦'}</text></g>`;
      }
      if (event.type === 'artwork') return `<g class="secret-node artwork" style="animation-delay:${delay}ms" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="1.9"/><path d="M -4 0 H 4 M 0 -4 V 4"/></g>`;
      return `<g class="secret-node section" style="animation-delay:${delay}ms" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot})"><circle r="3.8"/><text y="1.25">${glyphs[event.key] || '✦'}</text></g>`;
    }).join('');
    canvas.innerHTML = `<svg viewBox="0 0 100 62" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path class="secret-route-guide" d="${routePath}"/><path pathLength="1" class="secret-route-path" d="${routePath}"/>${nodes}</svg>`;
    copySecret();
  }
  function maybeUnlock() {
    if (state.unlocked) return;
    const enough = state.sections.size >= 5 || (state.sections.size >= 3 && state.artists.size >= 2) || (state.sections.size >= 3 && state.artworks.size >= 3);
    if (!enough) return;
    state.unlocked = true;trigger.hidden = false;trigger.classList.add('is-unlocked');copySecret();drawSecret();
    if (!quiet()) motion?.burst?.(trigger,'',3);
  }
  trigger.addEventListener('click',() => {
    copySecret();drawSecret();
    if (!dialog.open) dialog.showModal();
    if (motionEnabled() && paper?.animate) paper.animate([
      { opacity:0,transform:'translate3d(0,12px,0) scale(.985) rotate(-1deg)' },
      { opacity:1,transform:'translate3d(0,0,0) scale(1) rotate(-.35deg)' }
    ],{ duration:quiet()?160:300,easing:'cubic-bezier(.22,.78,.18,1)',fill:'both' });
    q('.secret-sketch-close',dialog)?.focus({preventScroll:true});
  });
  q('.secret-sketch-close',dialog)?.addEventListener('click',() => dialog.close());
  dialog.addEventListener('cancel',e => { e.preventDefault();dialog.close(); });
  dialog.addEventListener('click',e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close',() => trigger.focus({preventScroll:true}));
  document.addEventListener('club:language',() => { copySecret();if (state.unlocked) drawSecret(); });

  railItems[0]?.node.classList.add('is-active');
  updateRail(true);
  const api = {
    version:'7.0.3',
    artistTransition,
    showArtistSignature,
    rebuildInk:() => updateRail(true),
    get state() { return { sections:[...state.sections],artists:[...state.artists],artworks:[...state.artworks],journey:[...state.journey],unlocked:state.unlocked,traceCount:state.traceCount,activeSection:state.activeSection }; }
  };
  window.ClubLivingSketchbook = api;
  document.dispatchEvent(new CustomEvent('club:living-sketchbook-ready'));
  return api;
}
