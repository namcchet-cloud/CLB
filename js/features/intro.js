const root = document.documentElement;
const overlay = document.getElementById('introSignature');

function removeOverlay() {
  if (!overlay) return;
  overlay.remove();
}

function shouldSkip() {
  if (!overlay) return true;
  if (root.dataset.motion === 'off') return true;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches && root.dataset.motionChoice !== 'full') return true;
  try { return sessionStorage.getItem('artclub-intro-v4') === 'seen'; } catch { return false; }
}

if (shouldSkip()) {
  removeOverlay();
} else {
  try { sessionStorage.setItem('artclub-intro-v4', 'seen'); } catch {}
  const emblem = overlay.querySelector('.intro-emblem');
  const target = document.querySelector('.site-header .brand-logo');
  const stickerOffsets = [
    ['-34px','-30px'], ['36px','-26px'], ['-28px','34px'], ['34px','32px']
  ];
  overlay.querySelectorAll('.intro-sticker').forEach((el,i)=>{
    el.style.setProperty('--ox', stickerOffsets[i]?.[0] || '0px');
    el.style.setProperty('--oy', stickerOffsets[i]?.[1] || '-24px');
  });

  const colorTimer = window.setTimeout(() => overlay.classList.add('is-colored'), 980);
  const handoffTimer = window.setTimeout(() => {
    overlay.classList.add('is-handoff','is-leaving');
    if (!emblem || !target || !emblem.animate) {
      overlay.animate?.([{opacity:1},{opacity:0}],{duration:520,easing:'ease',fill:'forwards'});
      window.setTimeout(removeOverlay, 560);
      return;
    }
    const from = emblem.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const fromCx = from.left + from.width/2;
    const fromCy = from.top + from.height/2;
    const toCx = to.left + to.width/2;
    const toCy = to.top + to.height/2;
    const dx = toCx - fromCx;
    const dy = toCy - fromCy;
    const scale = Math.max(.05, Math.min(1, to.width / from.width));
    emblem.animate([
      { transform:'translate(-50%,-50%) scale(1)', opacity:1, offset:0 },
      { transform:'translate(-50%,-50%) scale(1.035)', opacity:1, offset:.14 },
      { transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(${scale})`, opacity:1, offset:.88 },
      { transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(${scale})`, opacity:0, offset:1 }
    ], { duration:640, easing:'cubic-bezier(.22,1,.36,1)', fill:'forwards' });
    overlay.animate([
      { opacity:1 },
      { opacity:.98, offset:.55 },
      { opacity:0 }
    ], { duration:640, easing:'ease', fill:'forwards' });
    window.setTimeout(removeOverlay, 670);
  }, 1420);

  window.setTimeout(removeOverlay, 2200);
  window.addEventListener('pagehide',()=>{
    clearTimeout(colorTimer); clearTimeout(handoffTimer); removeOverlay();
  },{once:true});
}
