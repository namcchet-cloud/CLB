const INTRO_KEY = 'artclub-intro-v5-seen';
const ROOT = document.documentElement;

function reducedMotion() {
  return (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    || ROOT.dataset.motion === 'off';
}

function clamp(n, a = 0, b = 1) { return Math.max(a, Math.min(b, n)); }
function smoothstep(t) { t = clamp(t); return t * t * (3 - 2 * t); }

function pointOnPolyline(points, progress) {
  if (progress >= 1) return points;
  const lengths = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const length = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    lengths.push(length); total += length;
  }
  let remaining = total * clamp(progress);
  const result = [points[0]];
  for (let i = 0; i < lengths.length; i++) {
    if (remaining >= lengths[i]) {
      result.push(points[i + 1]);
      remaining -= lengths[i];
      continue;
    }
    const ratio = lengths[i] ? remaining / lengths[i] : 0;
    result.push([
      points[i][0] + (points[i + 1][0] - points[i][0]) * ratio,
      points[i][1] + (points[i + 1][1] - points[i][1]) * ratio
    ]);
    break;
  }
  return result;
}

function drawProgressiveMask(ctx, progress, size) {
  ctx.clearRect(0, 0, size, size);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#fff';

  // Broad, irregular strokes approximate a marker revealing the existing artwork.
  const strokes = [
    [[.43,.13],[.35,.20],[.30,.34],[.31,.48],[.37,.60]],
    [[.57,.13],[.65,.20],[.70,.34],[.69,.48],[.63,.60]],
    [[.34,.31],[.42,.36],[.50,.42],[.58,.36],[.66,.31]],
    [[.27,.47],[.37,.50],[.46,.52],[.54,.52],[.63,.50],[.73,.47]],
    [[.33,.58],[.42,.63],[.50,.65],[.58,.63],[.67,.58]],
    [[.38,.66],[.44,.71],[.50,.74],[.56,.71],[.62,.66]],
    [[.18,.34],[.27,.30],[.36,.29],[.43,.31]],
    [[.57,.31],[.64,.29],[.73,.30],[.82,.34]],
    [[.17,.51],[.27,.57],[.35,.61],[.42,.68]],
    [[.83,.51],[.73,.57],[.65,.61],[.58,.68]],
    [[.23,.72],[.35,.78],[.50,.81],[.65,.78],[.77,.72]],
    [[.17,.23],[.31,.17],[.50,.16],[.69,.17],[.83,.23]],
    [[.14,.40],[.17,.58],[.24,.72],[.36,.83]],
    [[.86,.40],[.83,.58],[.76,.72],[.64,.83]],
    [[.32,.86],[.50,.90],[.68,.86]]
  ];
  const total = strokes.length;
  for (let i = 0; i < total; i++) {
    const local = clamp(progress * total - i);
    if (!local) continue;
    const points = pointOnPolyline(strokes[i], local);
    ctx.beginPath();
    points.forEach(([x, y], index) => index ? ctx.lineTo(x * size, y * size) : ctx.moveTo(x * size, y * size));
    ctx.lineWidth = (i < 6 ? .135 : .112) * size;
    ctx.stroke();
  }
  if (progress > .76) {
    const ring = clamp((progress - .76) / .24);
    ctx.globalAlpha = ring;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * .458, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ring);
    ctx.lineWidth = size * .105;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

async function loadImage(src) {
  const image = new Image();
  image.decoding = 'async';
  image.src = src;
  try { await image.decode(); } catch { await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; }); }
  return image;
}

function moveLogoToHeader(wrap, target) {
  const from = wrap.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const fx = from.left + from.width / 2;
  const fy = from.top + from.height / 2;
  const tx = to.left + to.width / 2;
  const ty = to.top + to.height / 2;
  const scale = to.width / from.width;
  wrap.style.transition = 'transform 1.10s cubic-bezier(.22,.82,.24,1), filter .85s ease';
  wrap.style.transform = `translate(calc(-50% + ${tx - fx}px), calc(-49% + ${ty - fy}px)) scale(${scale})`;
  wrap.style.filter = 'drop-shadow(0 5px 10px rgba(48,52,43,.07))';
}

async function runIntro() {
  const intro = document.getElementById('artIntro');
  const wrap = document.getElementById('artIntroLogo');
  const canvas = document.getElementById('artIntroCanvas');
  const target = document.querySelector('.site-header .brand-logo');
  if (!intro || !wrap || !canvas || !target || reducedMotion()) {
    intro?.remove();
    return;
  }

  try {
    if (sessionStorage.getItem(INTRO_KEY) === '1' && !new URLSearchParams(location.search).has('intro')) {
      intro.remove();
      return;
    }
  } catch {}

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) { intro.remove(); return; }
  const size = canvas.width;
  const mask = document.createElement('canvas');
  mask.width = size; mask.height = size;
  const maskCtx = mask.getContext('2d');
  const source = intro.dataset.logo || 'assets/optimized/logo-new-640-db642e82.webp';

  let image;
  try { image = await loadImage(source); }
  catch { intro.remove(); return; }

  intro.classList.add('is-drawing');
  const started = performance.now();
  const drawStart = 220;
  const drawEnd = 2760;
  const colorStart = 1480;
  const colorEnd = 2860;
  let raf = 0;

  const render = now => {
    const elapsed = now - started;
    const progress = clamp((elapsed - drawStart) / (drawEnd - drawStart));
    drawProgressiveMask(maskCtx, progress, size);
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    const color = smoothstep((elapsed - colorStart) / (colorEnd - colorStart));
    ctx.filter = `grayscale(${1 - color}) contrast(${1.22 - .12 * color})`;
    ctx.globalAlpha = .36 + .64 * clamp(progress * 1.45);
    ctx.drawImage(image, 0, 0, size, size);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(mask, 0, 0);
    ctx.restore();
    if (elapsed < drawEnd + 170) raf = requestAnimationFrame(render);
  };
  raf = requestAnimationFrame(render);

  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  later(() => intro.classList.add('is-colored'), 2500);
  later(() => intro.classList.add('is-burst'), 3050);
  later(() => {
    intro.classList.remove('is-burst');
    intro.classList.add('is-settled');
  }, 3860);
  // The viewer gets a calm beat with the completed logo before the handoff.
  later(() => {
    intro.classList.remove('is-settled');
    intro.classList.add('is-scatter', 'is-handoff');
    moveLogoToHeader(wrap, target);
  }, 4480);
  later(() => {
    cancelAnimationFrame(raf);
    intro.classList.add('is-finished');
    try { sessionStorage.setItem(INTRO_KEY, '1'); } catch {}
  }, 5580);
  later(() => intro.remove(), 6060);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    // Do not leave a half-finished overlay over the page if the tab is backgrounded mid-intro.
    timers.forEach(clearTimeout); cancelAnimationFrame(raf);
    intro.remove();
  }, { once: true });
}

runIntro();
