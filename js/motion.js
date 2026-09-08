(() => {
  'use strict';
  const { storage, t } = window.Club;
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const layer = document.getElementById('fxLayer');
  const animations = new Set();
  let enabled = true;
  let preference = storage.get('artclub-motion', 'on');
  function trackAnimation(animation, element) {
    const item = { animation, element };
    animations.add(item);
    const cleanup = () => { element?.remove(); animations.delete(item); };
    animation.finished.then(cleanup, cleanup);
  }
  function syncPreference() {
    enabled = preference !== 'off' && !reduce.matches;
    root.dataset.motion = enabled ? 'full' : 'off';
    const button = document.getElementById('motionToggle');
    button?.setAttribute('aria-pressed', String(enabled));
    const label = document.getElementById('motionText');
    if (label) label.textContent = t(reduce.matches ? 'motionSystem' : enabled ? 'motionOn' : 'motionOff');
    if (!enabled) {
      animations.forEach(item => { item.animation.cancel(); item.element?.remove(); });
      animations.clear();
      document.querySelectorAll('[data-depth]').forEach(el => el.style.translate = '0px 0px');
      document.querySelectorAll('.js-reveal').forEach(el => el.classList.add('in-view'));
    }
    document.dispatchEvent(new CustomEvent('club:motion', { detail: enabled }));
  }
  document.getElementById('motionToggle')?.addEventListener('click', () => {
    preference = preference === 'off' ? 'on' : 'off';
    storage.set('artclub-motion', preference);
    syncPreference();
  });
  reduce.addEventListener('change', syncPreference);
  document.addEventListener('club:language', syncPreference);
  document.addEventListener('visibilitychange', () => { root.dataset.pageHidden = String(document.hidden); });
  syncPreference();

  const ambient = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('ambient-active', entry.isIntersecting));
  }, { rootMargin: '60px' });
  document.querySelectorAll('[data-ambient]').forEach(el => ambient.observe(el));
  const deck = document.getElementById('turntable');
  if (deck) { deck.dataset.ambient = ''; ambient.observe(deck); }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -18px 0px' });
  document.querySelectorAll('.reveal').forEach((el, index) => {
    el.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
    if (enabled) el.classList.add('js-reveal');
    revealObserver.observe(el);
  });

  function burst(target, word = '', count = 12) {
    if (!enabled || document.hidden || !target || !layer) return;
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
    if (y < -100 || y > innerHeight + 100 || animations.size > 45) return;
    const colors = ['#e0bb58', '#a44331', '#355972', '#d990a4', '#536b48'];
    const radius = Math.min(Math.max(rect.width * .38, 55), 140);
    for (let i = 0; i < Math.min(count, 16); i++) {
      const el = document.createElement('span');
      el.className = 'fx-particle' + (i % 3 === 0 ? ' is-star' : '');
      el.style.left = `${x}px`; el.style.top = `${y}px`; el.style.background = colors[i % colors.length];
      layer.append(el);
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const distance = radius + 20 + Math.random() * 60;
      const dx = Math.cos(angle) * distance, dy = Math.sin(angle) * distance;
      trackAnimation(el.animate([
        { transform:'translate(-50%,-50%) scale(.2) rotate(0deg)', opacity:0 },
        { transform:`translate(${dx*.45}px,${dy*.45}px) scale(1.1) rotate(70deg)`, opacity:1, offset:.28 },
        { transform:`translate(${dx}px,${dy+25}px) scale(.6) rotate(200deg)`, opacity:0 }
      ], { duration:850+Math.random()*400, easing:'cubic-bezier(.17,.67,.27,1)', fill:'both' }), el);
    }
    if (word) {
      const el = document.createElement('span'); el.className='fx-word'; el.textContent=word;
      el.style.left=`${Math.max(70, Math.min(innerWidth-95,x))}px`; el.style.top=`${y}px`;
      layer.append(el);
      trackAnimation(el.animate([
        {transform:'translate(-50%,-10%) rotate(-16deg) scale(.1)',opacity:0},
        {transform:'translate(-50%,-125%) rotate(-7deg) scale(1.13)',opacity:1,offset:.32},
        {transform:'translate(-50%,-145%) rotate(-5deg) scale(1)',opacity:1,offset:.67},
        {transform:'translate(-50%,-230%) rotate(7deg) scale(.85)',opacity:0}
      ],{duration:1200,easing:'cubic-bezier(.2,.8,.3,1)',fill:'both'}),el);
    }
  }
  function flyRecord(source, destination) {
    if (!enabled || !source || !destination) return;
    const a=source.getBoundingClientRect(), b=destination.getBoundingClientRect();
    if (a.bottom<0 || a.top>innerHeight || b.bottom<0 || b.top>innerHeight) return;
    const node=source.cloneNode(true);
    node.classList.add('disc-flight'); node.setAttribute('aria-hidden','true');
    Object.assign(node.style,{left:`${a.left}px`,top:`${a.top}px`,width:`${a.width}px`,height:`${a.height}px`,maxWidth:'none',background:getComputedStyle(source).background});
    document.body.append(node);
    const dx=b.left+b.width/2-(a.left+a.width/2), dy=b.top+b.height/2-(a.top+a.height/2);
    trackAnimation(node.animate([
      {transform:'translate(0,0) rotate(0deg) scale(1)',opacity:1},
      {transform:`translate(${dx*.5}px,${dy*.5-60}px) rotate(-30deg) scale(1.2)`,opacity:.9,offset:.5},
      {transform:`translate(${dx}px,${dy}px) rotate(45deg) scale(${b.width/a.width*.7})`,opacity:0}
    ],{duration:720,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'}),node);
  }

  const stage = document.querySelector('[data-parallax-root]');
  let x=0,y=0,tx=0,ty=0,raf=0;
  function tick() {
    raf=0;
    if (!enabled || !stage || document.hidden) return;
    x += (tx-x)*.09; y += (ty-y)*.09;
    stage.querySelectorAll('[data-depth]').forEach(el => {
      const d=Number(el.dataset.depth)||.5;
      el.style.translate=`${x*d}px ${y*d}px`;
    });
    if (Math.abs(tx-x)+Math.abs(ty-y)>.03) raf=requestAnimationFrame(tick);
  }
  function requestTick() { if (!raf && enabled) raf=requestAnimationFrame(tick); }
  stage?.addEventListener('pointermove', e => {
    if (!fine.matches || !enabled) return;
    const r=stage.getBoundingClientRect();
    tx=((e.clientX-r.left)/r.width-.5)*35;
    ty=((e.clientY-r.top)/r.height-.5)*28;
    requestTick();
  },{passive:true});
  stage?.addEventListener('pointerleave',()=>{tx=0;ty=0;requestTick();});
  window.addEventListener('scroll',()=>{
    if (fine.matches || !enabled || !stage?.classList.contains('ambient-active')) return;
    ty=Math.max(-9,Math.min(9,(stage.getBoundingClientRect().top-innerHeight*.3)*.025));
    requestTick();
  },{passive:true});
  window.ClubMotion = { burst, flyRecord, get enabled(){return enabled;} };
})();
