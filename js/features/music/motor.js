import { clamp } from '../../core/runtime.js?v=7.0.11';

/**
 * Turntable motor — v7.0.11.
 *
 * The platter is functional playback feedback, so it no longer depends on
 * IntersectionObserver. Off-screen observation only simplifies arm choreography;
 * it cannot leave a playing record visually frozen.
 */
export function createMotor(deck, state, getSurface, onChange) {
  const rotor = deck.querySelector('.mv3-arm-motion'), shell = deck.querySelector('.mv3-tonearm');
  const platter = deck.querySelector('.mv3-platter-surface');
  const room = deck.closest('.music-v3');
  let frame = 0, previous = 0, visible = true, transition = null, engaged = false;
  let angle = -6, lift = 0, rotation = Number(state.spinAngle) || 0, velocity = 0, waiters = [];
  const smooth = x => { x = clamp(x, 0, 1); return x * x * x * (x * (x * 6 - 15) + 10); };
  const root = document.documentElement;
  const choreographyAllowed = () => root.dataset.motion !== 'off';
  const targetAngle = () => 23 + state.trackProgress * 5;

  function paint() {
    rotor.style.transform = `rotate(${angle.toFixed(3)}deg)`;
    shell.style.setProperty('--arm-lift', lift.toFixed(3));
    const surface = getSurface();
    if (surface) {
      surface.style.transformOrigin = '50% 50%';
      surface.style.transform = `rotate(${rotation.toFixed(3)}deg)`;
    }
    if (platter) {
      platter.style.transformOrigin = '50% 50%';
      platter.style.transform = `rotate(${(rotation * .6).toFixed(3)}deg)`;
    }
    state.armAngle = angle;
    state.armLift = lift;
    state.spinAngle = rotation;
    state.spinVelocity = velocity;
    state.armMode = transition ? (engaged ? 'CUEING' : 'RETURNING') : (engaged ? 'TRACKING' : 'REST');
    deck.dataset.armMode = state.armMode.toLowerCase();
  }

  function resolvePark() { const list = waiters; waiters = []; list.forEach(fn => fn()); }

  function settleArm() {
    transition = null;
    lift = 0;
    angle = engaged ? targetAngle() : -6;
    paint();
    if (!engaged) resolvePark();
  }

  function needsSpin() { return Boolean(state.playing || velocity > 0.00001); }

  function wake() {
    const spin = needsSpin();
    const arm = visible && choreographyAllowed() && Boolean(transition);
    if (!frame && !document.hidden && (spin || arm)) {
      previous = 0;
      frame = requestAnimationFrame(tick);
    }
  }

  function cue(on) {
    engaged = on;
    if (!choreographyAllowed() || !visible || document.hidden) {
      settleArm();
      wake();
      return;
    }
    transition = { at: performance.now(), from: angle, to: on ? targetAngle() : -6, fromLift: lift };
    wake();
  }

  function tick(now) {
    frame = 0;
    if (document.hidden) { previous = 0; return; }

    const dt = previous ? clamp(now - previous, 0, 48) : 16.7;
    previous = now;

    // 33 1/3 RPM ≈ 0.2 deg/ms. Keep a soft mechanical ramp.
    const wantedVelocity = state.playing ? .2 : 0;
    velocity += (wantedVelocity - velocity) * (1 - Math.exp(-dt / (state.playing ? 520 : 850)));
    if (velocity < .00025 && !state.playing) velocity = 0;
    rotation = (rotation + velocity * dt) % 360;

    if (transition && choreographyAllowed() && visible) {
      const elapsed = (now - transition.at) / 1000;
      angle = transition.from + (transition.to - transition.from) * smooth((elapsed - .12) / .92);
      lift = elapsed < .18 ? transition.fromLift + (1 - transition.fromLift) * smooth(elapsed / .18)
        : elapsed < 1.02 ? 1 : 1 - smooth((elapsed - 1.02) / .34);
      if (elapsed >= 1.36) { transition = null; lift = 0; if (!engaged) resolvePark(); }
    } else if (transition) {
      settleArm();
    } else if (engaged && visible) {
      angle += (targetAngle() - angle) * (1 - Math.exp(-dt / 700));
    }

    paint();

    if (needsSpin() || (visible && choreographyAllowed() && transition)) {
      frame = requestAnimationFrame(tick);
    } else {
      previous = 0;
      deck.classList.remove('is-power-on');
      if (!engaged) resolvePark();
    }
  }

  function setPlaying(on) {
    on = Boolean(on);
    if (on === state.playing) {
      // Re-wake the clock even if an observer/browser lifecycle quirk stopped it.
      if (on) wake();
      return;
    }
    state.playing = on;
    deck.dataset.playbackState = on ? 'playing' : 'paused';
    deck.classList.toggle('is-playing', on);
    deck.classList.toggle('is-power-on', on || velocity > 0);
    room.classList.toggle('is-music-playing', on);
    cue(on);
    wake();
    onChange?.(on);
  }

  function progress(value) {
    state.trackProgress = clamp(Number(value) || 0, 0, 1);
    if (engaged && (!visible || !choreographyAllowed())) {
      angle = targetAngle();
      paint();
    } else {
      wake();
    }
  }

  function park() {
    setPlaying(false);
    if (engaged || transition) cue(false);
    if (!transition) return Promise.resolve();
    return new Promise(resolve => waiters.push(resolve));
  }

  function syncVisibility() {
    deck.dataset.visualActive = String(visible && !document.hidden);
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (transition) settleArm();
      return;
    }
    if (!visible && transition) settleArm();
    // Crucially, a playing platter keeps its motor clock even if the observer
    // reports the deck outside the viewport. This prevents a frozen record.
    wake();
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    visible = Boolean(entries[0]?.isIntersecting);
    syncVisibility();
  }, { rootMargin: '80px' }) : null;

  if (observer) observer.observe(deck);
  document.addEventListener('visibilitychange', syncVisibility);
  document.addEventListener('club:motion', syncVisibility);
  window.addEventListener('pageshow', syncVisibility);
  paint();

  return {
    setPlaying,
    progress,
    park,
    forceWake: wake,
    get runningFrame() { return Boolean(frame); },
    get visible() { return visible; },
    destroy() {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      frame = 0;
      resolvePark();
    }
  };
}
