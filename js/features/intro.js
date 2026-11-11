const ROOT = document.documentElement;
const INTRO_SESSION_KEY = 'artclub-intro-seen-v733';

function explicitMotionOff() {
  return ROOT.dataset.motionChoice === 'off';
}

function prefersReducedMotion() {
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

function alreadyShownInSession() {
  try { return sessionStorage.getItem(INTRO_SESSION_KEY) === '1'; }
  catch { return false; }
}

function rememberShownInSession() {
  try { sessionStorage.setItem(INTRO_SESSION_KEY, '1'); } catch {}
}

function moveLogoToHeader(wrap, target) {
  const from = wrap.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const fx = from.left + from.width / 2;
  const fy = from.top + from.height / 2;
  const tx = to.left + to.width / 2;
  const ty = to.top + to.height / 2;
  const scale = Math.max(0.01, to.width / from.width);
  wrap.style.setProperty('--intro-dx', `${tx - fx}px`);
  wrap.style.setProperty('--intro-dy', `${ty - fy}px`);
  wrap.style.setProperty('--intro-scale', String(scale));
  wrap.classList.add('to-header');
}

function finishImmediately(intro) {
  intro.classList.add('is-finished');
  window.setTimeout(() => intro.remove(), 186);
}

function waitForLogoImages(intro) {
  const images = [...intro.querySelectorAll('.art-intro-logo img')];
  if (!images.length) return Promise.resolve();
  const one = img => new Promise(resolve => {
    const done = () => {
      if (typeof img.decode === 'function') img.decode().catch(() => {}).finally(resolve);
      else resolve();
    };
    if (img.complete && img.naturalWidth) return done();
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', resolve, { once: true });
  });
  return Promise.race([
    Promise.all(images.map(one)),
    new Promise(resolve => window.setTimeout(resolve, 2200))
  ]);
}

function runReducedIntro(intro, wrap, target) {
  intro.classList.add('is-ready', 'is-started', 'is-flowing', 'is-color-complete');
  window.setTimeout(() => {
    moveLogoToHeader(wrap, target);
    intro.classList.add('is-handoff');
  }, 493);
  window.setTimeout(() => finishImmediately(intro), 957);
}

function addFallingDrops(intro) {
  const wrap = intro.querySelector('.art-intro-logo');
  if (!wrap || wrap.querySelector('.art-intro-falling-drops')) return;
  const layer = document.createElement('span');
  layer.className = 'art-intro-falling-drops';
  const palette = ['sage','teal','pink','sage','blue','pink'];
  [17,31,46,61,74,84].forEach((left, index) => {
    const drop = document.createElement('i');
    drop.className = `art-intro-drop ${palette[index]}`;
    drop.style.setProperty('--drop-left', `${left}%`);
    drop.style.setProperty('--drop-delay', `${(index * 0.093 + (index % 2) * 0.052).toFixed(2)}s`);
    drop.style.setProperty('--drop-size', `${8 + (index % 3) * 3}px`);
    drop.style.setProperty('--drop-distance', `${54 + (index % 4) * 22}px`);
    layer.append(drop);
  });
  wrap.append(layer);
}

function startFullIntro(intro, wrap, target) {
  const timers = [];
  const later = (fn, ms) => timers.push(window.setTimeout(fn, ms));
  intro.classList.add('is-ready');
  addFallingDrops(intro);
  requestAnimationFrame(() => requestAnimationFrame(() => intro.classList.add('is-started')));
  later(() => intro.classList.add('is-flowing'), 186);
  later(() => intro.classList.add('is-dripping'), 684);
  later(() => intro.classList.add('is-color-complete'), 2030);
  later(() => intro.classList.add('is-burst'), 2158);
  later(() => intro.classList.add('is-settled'), 2726);
  later(() => {
    intro.classList.add('is-scatter', 'is-handoff');
    moveLogoToHeader(wrap, target);
  }, 3178);
  later(() => intro.classList.add('is-finished'), 4083);
  later(() => intro.remove(), 4385);

  const onVisibility = () => {
    if (!document.hidden) return;
    timers.forEach(window.clearTimeout);
    finishImmediately(intro);
    document.removeEventListener('visibilitychange', onVisibility);
  };
  document.addEventListener('visibilitychange', onVisibility);
}

async function runIntro() {
  const intro = document.getElementById('artIntro');
  const wrap = document.getElementById('artIntroLogo');
  const target = document.querySelector('.site-header .brand-logo');
  if (!intro || !wrap || !target) {
    intro?.remove();
    return;
  }
  // Keep the original cinematic first impression. On reload in the same tab,
  // omit the overlay entirely to avoid an unnecessary 4+ second animation.
  if (explicitMotionOff() || alreadyShownInSession() || document.hidden) {
    intro.remove();
    return;
  }
  await waitForLogoImages(intro);
  if (!intro.isConnected || document.hidden) {
    intro.remove();
    return;
  }
  rememberShownInSession();
  if (prefersReducedMotion()) runReducedIntro(intro, wrap, target);
  else startFullIntro(intro, wrap, target);
}

runIntro();
