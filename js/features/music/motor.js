import { clamp } from '../../core/runtime.js?v=4.0.1';

/** V2.2 geometry retained. One clock controls spin, cueing and progress tracking. */
export function createMotor(deck, state, getSurface, onChange) {
  const rotor = deck.querySelector('.mv3-arm-motion'), shell = deck.querySelector('.mv3-tonearm');
  const platter = deck.querySelector('.mv3-platter-surface');
  const room = deck.closest('.music-v3');
  let frame = 0, previous = 0, visible = false, transition = null, engaged = false;
  let angle = -6, lift = 0, rotation = 0, velocity = 0, waiters = [];
  const smooth = x => { x = clamp(x, 0, 1); return x * x * x * (x * (x * 6 - 15) + 10); };
  const enabled = () => document.documentElement.dataset.motion !== 'off';
  const targetAngle = () => 23 + state.trackProgress * 5;
  function paint() {
    rotor.style.transform = `rotate(${angle.toFixed(3)}deg)`;
    shell.style.setProperty('--arm-lift', lift.toFixed(3));
    const surface = getSurface();
    if (surface) surface.style.transform = `rotate(${rotation.toFixed(3)}deg)`;
    if (platter) platter.style.transform = `rotate(${(rotation * .6).toFixed(3)}deg)`;
    state.armAngle = angle; state.armLift = lift;
    state.spinAngle = rotation; state.spinVelocity = velocity;
    state.armMode = transition ? (engaged ? 'CUEING' : 'RETURNING') : (engaged ? 'TRACKING' : 'REST');
    deck.dataset.armMode = state.armMode.toLowerCase();
  }
  function resolvePark() { const list = waiters; waiters = []; list.forEach(fn => fn()); }
  function settle() {
    transition = null; lift = 0; angle = engaged ? targetAngle() : -6;
    velocity = 0; paint(); if (!engaged) resolvePark();
  }
  function wake() {
    if (!frame && visible && !document.hidden && enabled()) { previous = 0; frame = requestAnimationFrame(tick); }
  }
  function cue(on) {
    engaged = on;
    if (!enabled() || !visible || document.hidden) { settle(); return; }
    transition = { at: performance.now(), from: angle, to: on ? targetAngle() : -6, fromLift: lift };
    wake();
  }
  function tick(now) {
    frame = 0;
    if (!visible || document.hidden || !enabled()) { previous = 0; return; }
    const dt = previous ? clamp(now - previous, 0, 48) : 16.7; previous = now;
    const wantedVelocity = state.playing ? .2 : 0; // degrees/ms at 33 1/3 RPM
    velocity += (wantedVelocity - velocity) * (1 - Math.exp(-dt / (state.playing ? 1250 : 1500)));
    if (velocity < .00025 && !state.playing) velocity = 0;
    rotation = (rotation + velocity * dt) % 360;
    if (transition) {
      const elapsed = (now - transition.at) / 1000;
      angle = transition.from + (transition.to - transition.from) * smooth((elapsed - .18) / 1.15);
      lift = elapsed < .23 ? transition.fromLift + (1 - transition.fromLift) * smooth(elapsed / .23)
        : elapsed < 1.28 ? 1 : 1 - smooth((elapsed - 1.28) / .45);
      if (elapsed >= 1.73) { transition = null; lift = 0; if (!engaged) resolvePark(); }
    } else if (engaged) angle += (targetAngle() - angle) * (1 - Math.exp(-dt / 700));
    paint();
    if (state.playing || velocity > 0 || transition) frame = requestAnimationFrame(tick);
    else {
      previous = 0; deck.classList.remove('is-power-on');
      if (!engaged) resolvePark();
    }
  }
  function setPlaying(on) {
    if (on === state.playing) return;
    state.playing = on;
    deck.classList.toggle('is-playing', on);
    if (on) deck.classList.add('is-power-on');
    room.classList.toggle('is-music-playing', on);
    cue(on); wake();
    if (!enabled() || !visible || document.hidden) deck.classList.toggle('is-power-on', on);
    onChange?.(on);
  }
  function progress(value) {
    state.trackProgress = clamp(Number(value) || 0, 0, 1);
    if (engaged && (!visible || document.hidden || !enabled())) { angle = targetAngle(); paint(); }
    else wake();
  }
  function park() {
    setPlaying(false);
    if (engaged || transition) cue(false);
    if (!transition) return Promise.resolve();
    return new Promise(resolve => waiters.push(resolve));
  }
  function visibility() {
    deck.dataset.visualActive = String(visible && !document.hidden);
    if (!visible || document.hidden || !enabled()) {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
      if (transition) settle();
    } else wake();
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting; visibility();
  }, { rootMargin: '40px' }) : null;
  if (observer) observer.observe(deck); else visible = true;
  document.addEventListener('visibilitychange', visibility);
  document.addEventListener('club:motion', visibility);
  window.addEventListener('pageshow', visibility);
  paint();
  return { setPlaying, progress, park,
    get runningFrame() { return Boolean(frame); },
    get visible() { return visible; },
    destroy() { observer?.disconnect(); cancelAnimationFrame(frame); resolvePark(); } };
}
