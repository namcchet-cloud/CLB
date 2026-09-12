import { imageVariant } from '../core/images.js?v=5.1.2';
/** Original mascot pixels; finite UFO flight. Loaded on demand. */
export function initAkiko() {
  'use strict';
  const VERSION = '5.1.2';
  const MASCOT = imageVariant('assets/gallery/akiko/mascot-intact-v253.webp', 480).src;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const root = document.documentElement;
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const smooth = n => { n = clamp(n, 0, 1); return n * n * (3 - 2 * n); };
  const angleDelta = n => ((n + 180) % 360 + 360) % 360 - 180;
  let active = null, requestId = 0, imagePromise = null, lastError = '';
  const allowed = () => root.dataset.motion !== 'off' && window.ClubMotion?.enabled !== false;
  const quiet = () => root.dataset.motionChoice === 'quiet';
  const text = (vi, en) => root.lang === 'en' ? en : vi;

  // Do not recolor, blend, crop, mirror or redraw this bitmap. Both eyes are original.
  function loadMascot() {
    if (imagePromise) return imagePromise;
    imagePromise = new Promise(resolve => {
      const img = new Image();
      let done = false;
      const finish = ok => {
        if (done) return;
        done = true; clearTimeout(timeout); img.onload = img.onerror = null;
        if (!ok) imagePromise = null;
        resolve(ok);
      };
      const timeout = setTimeout(() => finish(false), 8000);
      img.onload = () => {
        if (img.decode) img.decode().then(() => finish(true), () => finish(img.naturalWidth > 0));
        else finish(true);
      };
      img.onerror = () => finish(false);
      img.src = MASCOT;
    });
    return imagePromise;
  }
  function stop() {
    requestId++;
    if (!active) return;
    cancelAnimationFrame(active.raf);
    active.overlay.remove();
    active = null;
  }
  function report(message = '') {
    lastError = message;
    let el = document.getElementById('akikoFlightStatus');
    if (!el && message) {
      el = document.createElement('p'); el.id = 'akikoFlightStatus';
      el.className = 'af253-status'; el.setAttribute('role', 'status');
      document.getElementById('artistSwitcher')?.after(el);
    }
    if (el) { el.textContent = message; el.hidden = !message; }
  }
  function svg(tag, attrs = {}) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v)));
    return node;
  }
  // Catmull-Rom to cubic Bezier. Adjacent segments share a tangent (no zigzag corners).
  function curvedPath(points) {
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i - 1] || points[i], b = points[i];
      const c = points[i + 1], e = points[i + 2] || c;
      const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6];
      const c2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6];
      d += ` C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${c[0]} ${c[1]}`;
    }
    return d;
  }
  function buildRoute(width, height, size, trigger, isQuiet) {
    const headerBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom || 64;
    const left = 130 * size, right = Math.max(left + 32, width - 130 * size);
    const top = Math.min(height * .45, Math.max(118 * size, headerBottom + 97 * size));
    const bottom = Math.max(top + 44, height - 98 * size);
    const point = (x, y) => [left + (right - left) * x, top + (bottom - top) * y];
    const rect = trigger?.getBoundingClientRect();
    const start = rect && rect.bottom > 0 && rect.top < height
      ? [clamp(rect.left + rect.width * .52, left, right), clamp(rect.bottom + 70 * size, top, bottom)]
      : point(.18, .72);
    if (isQuiet || height < 390) {
      return curvedPath([start, point(.65, .36), point(.9, .24), [width + 130 * size, top + 30]]);
    }
    return curvedPath([
      start, point(.46, .13), point(.81, .22), point(.87, .55),
      point(.65, .86), point(.24, .76), point(.12, .43),
      point(.33, .25), point(.62, .40), [width + 146 * size, top + (bottom - top) * .18]
    ]);
  }
  const ROCKET_SVG = `<svg viewBox="0 0 250 150" class="af253-ship af253-ufo" aria-hidden="true" focusable="false">
    <g stroke="#34333b" stroke-linejoin="round" stroke-linecap="round">
      <path class="af253-ufo-beam" d="M91 94 L55 145 L196 145 L161 94Z" fill="url(#ufoBeam)" stroke="none" opacity=".42"/>
      <defs><linearGradient id="ufoBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d7f1"/><stop offset="1" stop-color="#f0cfdd" stop-opacity="0"/></linearGradient></defs>
      <ellipse cx="126" cy="87" rx="96" ry="34" fill="#fff0d4" stroke-width="3.4"/>
      <path d="M38 84 Q126 119 214 84 Q201 113 126 119 Q51 113 38 84Z" fill="#d7b8ce" stroke-width="3"/>
      <ellipse cx="126" cy="78" rx="58" ry="39" fill="#b8cfbf" stroke-width="3.2"/>
      <path d="M83 75 Q126 41 169 75" fill="#dbe7df" stroke="none" opacity=".85"/>
      <ellipse cx="126" cy="80" rx="45" ry="28" fill="#c9d7df" stroke-width="2.4"/>
      <path d="M93 70 Q113 53 136 55" fill="none" stroke="#f8f5e9" stroke-width="5" opacity=".8"/>
      <g class="af253-ufo-lights" stroke-width="1.4">
        <circle cx="58" cy="91" r="7" fill="#e6c56d"/><circle cx="89" cy="104" r="7" fill="#cf8fa7"/><circle cx="126" cy="109" r="7" fill="#8fa7b7"/><circle cx="163" cy="104" r="7" fill="#cf8fa7"/><circle cx="194" cy="91" r="7" fill="#e6c56d"/>
      </g>
      <path d="M24 83 Q9 74 7 59 Q22 61 36 71" fill="#8ca08d" stroke-width="3"/><path d="M216 71 Q231 61 245 59 Q243 75 228 83" fill="#8ca08d" stroke-width="3"/>
      <path d="M103 121 Q126 132 149 121 L143 136 Q126 144 109 136Z" fill="#727989" stroke-width="3"/>
      <path d="M115 123 Q126 129 137 123" fill="none" stroke="#f0d7e0" stroke-width="3"/>
      <g class="af253-fire"><path d="M108 135 Q126 151 144 135" fill="#ead17c" stroke-width="2"/><path d="M115 137 Q126 147 137 137" fill="#f4e7be" stroke="none"/></g>
      <path d="M53 79 Q78 69 96 70" fill="none" stroke="#fffaf0" stroke-width="3" opacity=".8"/>
      <path d="M181 88 l6 3 -6 3 -3 7 -3 -7 -6 -3 6 -3 3 -7Z" fill="#fff2c7" stroke-width="1.5"/>
    </g>
  </svg>`;

  function createFlight(trigger) {
    const w = root.clientWidth, h = window.innerHeight;
    const isQuiet = quiet();
    const size = clamp(Math.min(w / 530, h / 620), .56, .92);
    const overlay = document.createElement('div');
    overlay.className = 'af253-layer'; overlay.setAttribute('aria-hidden', 'true');
    const trails = svg('svg', {viewBox: `0 0 ${w} ${h}`, class: 'af253-trails', 'aria-hidden': 'true'});
    const path = svg('path', {d: buildRoute(w, h, size, trigger, isQuiet), fill: 'none', stroke: 'none'});
    const trailUnder = svg('path', {class: 'af253-trail-under', fill: 'none'});
    const trailInk = svg('path', {class: 'af253-trail-ink', fill: 'none'});
    trails.append(path, trailUnder, trailInk);
    const craft = document.createElement('div'); craft.className = 'af253-craft';
    const hull = document.createElement('div'); hull.className = 'af253-hull';
    // Trusted static SVG literal: no user-controlled content enters this markup.
    hull.innerHTML = ROCKET_SVG;
    const rider = document.createElement('img'); rider.className = 'af253-rider';
    rider.src = MASCOT; rider.alt = ''; rider.width = 760; rider.height = 603; rider.draggable = false;
    craft.append(hull, rider); overlay.append(trails, craft); document.body.append(overlay);
    const flight = {
      overlay, craft, hull, rider, path, trailUnder, trailInk,
      fire: hull.querySelector('.af253-fire'), length: path.getTotalLength(),
      size, w, h, isQuiet, particles: [], trail: [], emitted: new Set(), raf: 0,
      started: performance.now(), previous: 0, phase: 'boarding', elapsed: 0,
      boarding: isQuiet ? 280 : 760, cruise: isQuiet ? 2300 : 6000,
      lastPuff: -1000, lastStar: -1000, lastTrail: -1000,
      heading: null, position: {x: 0, y: 0}, rng: 14253
    };
    flight.total = flight.boarding + flight.cruise + 160;
    return flight;
  }
  function random(f) { f.rng = (f.rng * 1664525 + 1013904223) >>> 0; return f.rng / 4294967296; }
  function particle(f, kind, x, y, vx = 0, vy = 0, words = '') {
    if (f.particles.length >= (f.isQuiet ? 10 : 38)) return;
    const el = document.createElement('span'); el.className = `af253-particle af253-${kind}`;
    if (kind === 'star') el.textContent = random(f) > .5 ? '\u2726' : '\u2727';
    else if (kind === 'words') el.textContent = words;
    const life = kind === 'words' ? 1080 : kind === 'puff' ? 760 : 920;
    const rotation = (random(f) - .5) * (kind === 'words' ? 14 : 100);
    const tone = ['#c98da7','#7595a4','#d7b55c','#aea3c3'][Math.floor(random(f) * 4)];
    el.style.setProperty('--af253-tone', tone);
    if (kind === 'words') {
      x = clamp(x, 65, f.w - 65); y = clamp(y, 55, f.h - 55);
    }
    el.style.left = `${x}px`; el.style.top = `${y}px`;
    f.overlay.append(el);
    f.particles.push({el, kind, born: f.elapsed, life, vx, vy, rotation});
  }
  function burst(f, x, y) {
    for (let i = 0; i < (f.isQuiet ? 3 : 9); i++) {
      const a = (i / 9) * Math.PI * 2;
      particle(f, i % 3 === 0 ? 'star' : 'puff', x, y,
        Math.cos(a) * (45 + random(f) * 50), Math.sin(a) * (40 + random(f) * 40));
    }
    particle(f, 'ring', x, y);
  }
  function updateParticles(f) {
    for (let i = f.particles.length - 1; i >= 0; i--) {
      const p = f.particles[i], age = f.elapsed - p.born, u = age / p.life;
      if (u >= 1) { p.el.remove(); f.particles.splice(i, 1); continue; }
      const travel = 1 - Math.pow(1 - u, 2);
      const zoom = p.kind === 'ring' ? .4 + u * 2.6
        : p.kind === 'words' ? .8 + .2 * smooth(u * 7)
        : p.kind === 'puff' ? .4 + .85 * travel : .65 + .45 * Math.sin(Math.PI * u);
      p.el.style.opacity = String((p.kind === 'words' ? smooth(u * 12) : .9) * (1 - smooth((u - .45) / .55)));
      p.el.style.transform = `translate(-50%, -50%) translate3d(${p.vx * travel}px,${p.vy * travel}px,0) rotate(${p.rotation + (p.kind === 'star' ? 80 * u : 0)}deg) scale(${zoom})`;
    }
  }
  function frame(now, f) {
    if (active !== f) return;
    if (!allowed() || document.hidden) { stop(); return; }
    const dt = f.previous ? Math.min(60, now - f.previous) : 16.67;
    f.previous = now; f.elapsed = now - f.started;
    if (f.elapsed >= f.total) { stop(); return; }
    const u = clamp((f.elapsed - f.boarding) / f.cruise, 0, 1);
    // One continuous acceleration/deceleration over the whole curve, not per segment.
    const distance = f.length * (.5 - .5 * Math.cos(Math.PI * u));
    const pos = f.path.getPointAtLength(distance);
    const before = f.path.getPointAtLength(Math.max(0, distance - 7));
    const after = f.path.getPointAtLength(Math.min(f.length, distance + 7));
    const target = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
    if (f.heading === null) f.heading = target;
    else f.heading += angleDelta(target - f.heading) * (1 - Math.exp(-dt / 72));
    const boarding = clamp(f.elapsed / f.boarding, 0, 1);
    const bob = f.elapsed < f.boarding ? -4 * Math.sin(boarding * Math.PI * 2) : 0;
    const x = pos.x, y = pos.y + bob;
    f.position = {x, y}; f.phase = u === 0 ? 'boarding' : u > .93 ? 'exit' : 'cruise';
    const scale = f.size * (.91 + .09 * smooth(boarding));
    const visible = smooth(f.elapsed / 160) * (1 - smooth((u - .955) / .045));
    f.craft.style.opacity = String(visible);
    f.craft.style.transform = `translate3d(${x - 120}px,${y - 133}px,0) scale(${scale})`;
    f.hull.style.transform = `rotate(${f.heading}deg)`;
    // Keep the exact face upright and completely above the hull (only a gentle bank).
    const bank = clamp(Math.sin(f.heading * Math.PI / 180) * 9, -9, 9);
    f.rider.style.transform = `translateY(${1.6 * Math.sin(f.elapsed / 240)}px) rotate(${bank}deg)`;
    f.fire.style.transform = `scale(${.80 + .18 * Math.sin(f.elapsed / 69)},${.95 + .05 * Math.sin(f.elapsed / 92)})`;
    f.fire.style.opacity = String(.45 + .55 * smooth(boarding));
    const rad = f.heading * Math.PI / 180;
    const nozzle = {x: x - 81 * scale * Math.cos(rad), y: y - 81 * scale * Math.sin(rad)};
    if (u > .005 && u < .96 && f.elapsed - f.lastTrail > 32) {
      f.lastTrail = f.elapsed; f.trail.push({...nozzle, time: f.elapsed});
    }
    f.trail = f.trail.filter(p => f.elapsed - p.time < 580).slice(-22);
    const d = f.trail.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    f.trailUnder.setAttribute('d', d); f.trailInk.setAttribute('d', d);
    if (u > .01 && u < .92 && f.elapsed - f.lastPuff > (f.isQuiet ? 250 : 120)) {
      f.lastPuff = f.elapsed;
      particle(f, 'puff', nozzle.x, nozzle.y, -Math.cos(rad) * 35 + (random(f) - .5) * 20, -Math.sin(rad) * 35 + 15);
    }
    if (!f.isQuiet && u > .03 && u < .94 && f.elapsed - f.lastStar > 260) {
      f.lastStar = f.elapsed;
      particle(f, 'star', nozzle.x + (random(f) - .5) * 26, nozzle.y + (random(f) - .5) * 26,
        (random(f) - .5) * 60, (random(f) - .5) * 65);
    }
    for (const [at, label] of [
      [.015, text('V\u00daT!', 'WHOOSH!')],
      [.39, text('V\u00c8O~', 'WHEE~')],
      [.74, text('H\u00cd H\u00cd!', 'HEHE!')]
    ]) {
      if (u < at || f.emitted.has(at) || (f.isQuiet && at !== .015)) continue;
      f.emitted.add(at); particle(f, 'words', x - 28, y + 65 * scale, 0, -26, label);
      burst(f, nozzle.x, nozzle.y);
    }
    updateParticles(f);
    f.raf = requestAnimationFrame(t => frame(t, f));
  }
  async function launch(trigger) {
    stop(); report();
    if (!allowed() || document.hidden) return false;
    const id = requestId;
    const loaded = await loadMascot();
    if (id !== requestId || !allowed() || document.hidden) return false;
    if (!loaded) {
      report(text('Ch\u01b0a t\u1ea3i \u0111\u01b0\u1ee3c mascot. Ki\u1ec3m tra t\u1ec7p mascot-intact-v253.webp trong assets/gallery/akiko/.',
        'Mascot could not load. Check assets/gallery/akiko/mascot-intact-v253.webp.'));
      return false;
    }
    const f = createFlight(trigger); active = f;
    f.raf = requestAnimationFrame(t => frame(t, f));
    return true;
  }
  document.addEventListener('club:motion', () => { if (!allowed()) stop(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('pagehide', stop);
  // A real orientation/viewport change cancels safely; iOS toolbar-only height changes do not.
  window.addEventListener('resize', () => {
    if (active && (Math.abs(root.clientWidth - active.w) > 30 || Math.abs(innerHeight - active.h) > 160)) stop();
  }, {passive: true});
  document.addEventListener('keydown', e => { if (e.key === 'Escape') stop(); });
  window.ClubAkikoFlight = {
    version: VERSION, mascotURL: MASCOT, launch, stop,
    get state() {
      return {version: VERSION, active: !!active, phase: active?.phase || 'idle',
        elapsed: Math.round(active?.elapsed || 0), position: active ? {...active.position} : null,
        heading: active?.heading ?? null, particles: active?.particles.length || 0, error: lastError};
    }
  };
return window.ClubAkikoFlight;
}
