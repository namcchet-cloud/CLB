const ROOT = document.documentElement;

function explicitMotionOff() {
  return ROOT.dataset.motionChoice === 'off' || ROOT.dataset.motion === 'off';
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
  window.setTimeout(() => intro.remove(), 260);
}

function runReducedIntro(intro, wrap, target) {
  intro.classList.add('is-reduced', 'is-color-complete');
  window.setTimeout(() => {
    moveLogoToHeader(wrap, target);
    intro.classList.add('is-handoff');
  }, 650);
  window.setTimeout(() => finishImmediately(intro), 1350);
}

function runIntro() {
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

  // Do not hide the sequence on desktop simply because it has already run in this tab.
  // Every full page load gets one intro. Reduced-motion users receive a short, calm handoff.
  if (prefersReducedMotion()) {
    runReducedIntro(intro, wrap, target);
    return;
  }

  const timers = [];
  const later = (fn, ms) => timers.push(window.setTimeout(fn, ms));

  requestAnimationFrame(() => intro.classList.add('is-started'));

  // Calm timing: color flows first, then the comic accents arrive.
  later(() => intro.classList.add('is-flowing'), 220);
  later(() => intro.classList.add('is-color-complete'), 3180);
  later(() => intro.classList.add('is-burst'), 3340);
  later(() => intro.classList.add('is-settled'), 4230);

  // Let the completed logo breathe, then send everything away together.
  later(() => {
    intro.classList.add('is-scatter', 'is-handoff');
    moveLogoToHeader(wrap, target);
  }, 4920);

  later(() => intro.classList.add('is-finished'), 6300);
  later(() => intro.remove(), 6760);

  // If the page becomes hidden mid-sequence, finish cleanly rather than leaving a stale overlay.
  const onVisibility = () => {
    if (!document.hidden) return;
    timers.forEach(window.clearTimeout);
    intro.remove();
    document.removeEventListener('visibilitychange', onVisibility);
  };
  document.addEventListener('visibilitychange', onVisibility);
}

runIntro();
