const ROOT = document.documentElement;

function explicitMotionOff() {
  // Only an explicit user choice disables the intro. Do not inherit the
  // computed `data-motion=off` value from OS reduced-motion on desktop.
  return ROOT.dataset.motionChoice === 'off';
}

function prefersReducedMotion() {
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
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
  window.setTimeout(() => intro.remove(), 320);
}

function waitForLogoImages(intro) {
  const images = [...intro.querySelectorAll('.art-intro-logo img')];
  if (!images.length) return Promise.resolve();

  const one = (img) => new Promise(resolve => {
    const done = () => {
      if (typeof img.decode === 'function') img.decode().catch(() => {}).finally(resolve);
      else resolve();
    };
    if (img.complete && img.naturalWidth) return done();
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', resolve, { once: true });
  });

  // Never leave the page behind the intro indefinitely if an image request fails.
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
  }, 850);
  window.setTimeout(() => finishImmediately(intro), 1650);
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
    drop.style.setProperty('--drop-delay', `${(index * 0.16 + (index % 2) * 0.09).toFixed(2)}s`);
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

  // Deliberately relaxed rhythm. The paint front has time to feel liquid.
  later(() => intro.classList.add('is-flowing'), 320);
  later(() => intro.classList.add('is-dripping'), 1180);
  later(() => intro.classList.add('is-color-complete'), 3500);
  later(() => intro.classList.add('is-burst'), 3720);
  later(() => intro.classList.add('is-settled'), 4700);

  // Hold the finished mark, then move the whole composition out of the frame.
  later(() => {
    intro.classList.add('is-scatter', 'is-handoff');
    moveLogoToHeader(wrap, target);
  }, 5480);

  later(() => intro.classList.add('is-finished'), 7040);
  later(() => intro.remove(), 7560);

  const onVisibility = () => {
    if (!document.hidden) return;
    // Keep the overlay stable while the tab is hidden. When the user returns,
    // complete cleanly rather than exposing a half-finished frame.
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
  if (explicitMotionOff()) {
    intro.remove();
    return;
  }

  // Critical desktop fix: the timeline does not start until the logo has decoded.
  // This prevents the first half of the animation from elapsing behind an empty image.
  await waitForLogoImages(intro);

  if (prefersReducedMotion()) runReducedIntro(intro, wrap, target);
  else startFullIntro(intro, wrap, target);
}

runIntro();
