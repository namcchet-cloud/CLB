/**
 * Raven Lin - reference-photo Driver rig, v6.1.
 * Thirteen independently hinged pieces share a single transparent WebP atlas.
 * This is a 2.5D interpretation, not a 3D reconstruction of hidden toy mechanics.
 * Nothing starts until Raven is selected. All animations/audio are disposed on exit.
 */
const DRIVER = {"width":967,"height":427,"atlasWidth":1024,"atlasHeight":689,"parts":[{"name":"chassis","x":198,"y":0,"w":568,"h":405,"px":481,"py":278,"closed":{"x":0,"y":0,"r":0},"sx":2,"sy":2},{"name":"belt-left","x":0,"y":175,"w":217,"h":145,"px":215,"py":253,"closed":{"x":22,"y":0,"r":0},"sx":509,"sy":411},{"name":"belt-right","x":751,"y":184,"w":216,"h":136,"px":752,"py":253,"closed":{"x":-22,"y":0,"r":0},"sx":730,"sy":411},{"name":"tail-left-lower","x":198,"y":290,"w":235,"h":96,"px":420,"py":319,"closed":{"x":49,"y":-26,"r":108},"sx":2,"sy":591},{"name":"tail-left-middle","x":164,"y":205,"w":255,"h":87,"px":406,"py":270,"closed":{"x":51,"y":1,"r":77},"sx":479,"sy":591},{"name":"tail-left-upper","x":222,"y":91,"w":193,"h":163,"px":400,"py":231,"closed":{"x":48,"y":28,"r":39},"sx":117,"sy":411},{"name":"tail-right-lower","x":533,"y":290,"w":234,"h":96,"px":547,"py":319,"closed":{"x":-49,"y":-26,"r":-108},"sx":241,"sy":591},{"name":"tail-right-middle","x":548,"y":205,"w":256,"h":87,"px":561,"py":270,"closed":{"x":-51,"y":1,"r":-77},"sx":738,"sy":591},{"name":"tail-right-upper","x":553,"y":92,"w":191,"h":162,"px":567,"py":231,"closed":{"x":-48,"y":28,"r":-39},"sx":314,"sy":411},{"name":"crown-left","x":353,"y":18,"w":115,"h":179,"px":478,"py":184,"closed":{"x":16,"y":25,"r":17},"sx":800,"sy":2},{"name":"crown-right","x":503,"y":17,"w":111,"h":176,"px":489,"py":184,"closed":{"x":-16,"y":25,"r":-17},"sx":2,"sy":411},{"name":"crown-center","x":428,"y":1,"w":105,"h":185,"px":481,"py":184,"closed":{"x":0,"y":19,"r":0},"sx":691,"sy":2},{"name":"core","x":428,"y":190,"w":113,"h":237,"px":481,"py":303,"closed":{"x":0,"y":0,"r":0},"sx":574,"sy":2}]};
const ATLAS = new URL('../../assets/raven/driver-parts-v61.webp', import.meta.url).href;
const DURATION = 5500;
const EASE = 'cubic-bezier(.19,1,.22,1)';
const WORDS = {
  vi: {
    loading: '\u0110ang l\u1eafp Driver...', skip: 'B\u1ecf qua',
    title: 'Raven Lin - hi\u1ec7u \u1ee9ng bi\u1ebfn h\u00ecnh',
    soundOff: '\u00c2m FX: T\u1eaft', soundOn: '\u00c2m FX: B\u1eadt',
    entry: 'DRIVER XU\u1ea4T HI\u1ec6N', set: 'KH\u00d3A C\u01a0 C\u1ea4U',
    ready: 'N\u0102NG L\u01af\u1ee2NG S\u1eb4N S\u00c0NG', henshin: 'BUNG M\u1ede / BI\u1ebeN H\u00ccNH',
    archive: 'H\u1eccA S\u0128 03 / T\u00c1C PH\u1ea8M S\u1eaeP RA M\u1eaeT',
    footer: 'G\u00d3C TRI\u1ec2N L\u00c3M', hint: 'ESC \u0111\u1ec3 b\u1ecf qua'
  },
  en: {
    loading: 'Assembling Driver...', skip: 'Skip', title: 'Raven Lin - transformation sequence',
    soundOff: 'SFX: Off', soundOn: 'SFX: On', entry: 'DRIVER ENTRY', set: 'MECHANISM LOCKED',
    ready: 'ENERGY READY', henshin: 'RELEASE / TRANSFORM',
    archive: 'ARTIST 03 / ARTWORKS COMING SOON', footer: 'EXHIBITION WALL', hint: 'ESC to skip'
  }
};

export function initRaven() {
  let active = null;
  let assets = null;
  let lastError = '';
  const root = document.documentElement;
  const allowed = () => !document.hidden && root.dataset.motion !== 'off' && window.ClubMotion?.enabled !== false;

  function preload() {
    if (assets) return assets;
    assets = new Promise((resolve, reject) => {
      const image = new Image();
      const timeout = setTimeout(() => done(new Error('Driver image timed out')), 6000);
      function done(error) {
        clearTimeout(timeout); image.onload = image.onerror = null;
        if (error) reject(error); else resolve(image);
      }
      image.decoding = 'async';
      image.onload = () => {
        if (!image.naturalWidth) return done(new Error('Driver image is empty'));
        if (image.decode) image.decode().then(() => done(), () => done());
        else done();
      };
      image.onerror = () => done(new Error('Driver image could not be loaded'));
      image.src = ATLAS;
    }).catch(error => { assets = null; throw error; });
    return assets;
  }

  function elapsed(run) { return Number(run?.master?.currentTime || 0); }
  function phase(run) {
    if (!run?.master) return 'loading';
    const time = elapsed(run);
    return time < 900 ? 'entry' : time < 1780 ? 'set' : time < 2420 ? 'ready' : time < 3280 ? 'henshin' : 'raven';
  }
  function releaseSound(run) {
    const audio = run.audio; run.audio = null;
    if (!audio) return;
    audio.nodes.forEach(node => { try { node.stop(); } catch {} });
    audio.context.close().catch(() => {});
  }
  function finish(run, reason = 'cancelled') {
    if (!run || active !== run) return;
    active = null;
    const restoreFocus = run.layer.contains(document.activeElement) || document.activeElement === document.body;
    run.animations.forEach(animation => animation.cancel());
    releaseSound(run);
    if (run.layer.open && typeof run.layer.close === 'function') run.layer.close();
    run.layer.remove();
    root.classList.remove('raven-sequence-running');
    if (restoreFocus && reason !== 'replaced' && reason !== 'hidden') {
      const target = run.trigger?.isConnected ? run.trigger : document.querySelector('[data-artist="raven-lin"]');
      target?.focus({ preventScroll: true });
    }
    if (reason === 'complete' && root.dataset.selectedArtist === 'raven-lin') {
      const profile = document.querySelector('.raven-empty');
      if (profile?.animate && allowed()) {
        const reveal = profile.animate([{ opacity: .65 }, { opacity: 1 }], { duration: 400, easing: 'ease-out' });
        reveal.finished.catch(() => {});
      }
    }
    document.dispatchEvent(new CustomEvent('club:raven', { detail: { active: false, reason } }));
  }
  function stop(reason = 'cancelled') { finish(active, reason); }

  function animate(run, node, points, options = {}) {
    if (!node) return null;
    const frames = points.map(([time, values]) => ({ offset: Math.min(1, Math.max(0, time / DURATION)), ...values }));
    const animation = node.animate(frames, { duration: DURATION, fill: 'both', easing: 'linear', ...options });
    // All tracks use the exact same origin: slow frames cannot desynchronise hinges.
    if (run.origin != null) animation.startTime = run.origin;
    run.animations.push(animation);
    animation.finished.catch(() => {});
    return animation;
  }
  function visibility(run, node, from, until, opacity = 1) {
    animate(run, node, [[0,{opacity:0}], [from,{opacity:0}], [from+160,{opacity}],
      [until,{opacity}], [Math.min(DURATION,until+160),{opacity:0}], [DURATION,{opacity:0}]]);
  }

  function buildDriver(rig) {
    // All positions remain proportional to the uploaded 967 x 427 reference.
    // The supplied open view has no pixels for surfaces hidden under its wings.
    // This small original underframe fills those occlusions only while folded.
    const support = document.createElement('div'); support.className = 'rv-support';
    support.innerHTML = `<svg viewBox="0 0 967 427" aria-hidden="true">
 <defs>
  <linearGradient id="rv-metal-v61" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f8f7fb"/><stop offset=".24" stop-color="#ceced8"/><stop offset=".5" stop-color="#94939f"/><stop offset=".57" stop-color="#f4f3f8"/><stop offset="1" stop-color="#adaeba"/></linearGradient>
  <linearGradient id="rv-red-v61" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eb3b4c"/><stop offset=".46" stop-color="#a9192d"/><stop offset=".65" stop-color="#dd3142"/><stop offset="1" stop-color="#510c1c"/></linearGradient>
  <radialGradient id="rv-black-v61"><stop stop-color="#4a3440"/><stop offset=".8" stop-color="#201b23"/><stop offset="1" stop-color="#100e13"/></radialGradient>
 </defs>
 <path d="M193 232H774V313H193Z" fill="#2c2932" stroke="#121016" stroke-width="5"/>
 <path d="M196 236H770V250H196ZM196 295H770V309H196Z" fill="url(#rv-metal-v61)" stroke="#d8d4dc" stroke-width="2"/>
 <path d="M211 256H415V289H211ZM552 256H757V289H552Z" fill="#40343d"/>
 <path d="M216 264H414M555 264H752M216 281H414M555 281H752" stroke="#d13b4c" stroke-width="5"/>
 <path d="M225 257V289M242 257V289M261 257V289M280 257V289M299 257V289M318 257V289M337 257V289M356 257V289M611 257V289M630 257V289M649 257V289M668 257V289M687 257V289M706 257V289M725 257V289M742 257V289" stroke="#d8ced5" stroke-opacity=".35" stroke-width="2"/>
 <path d="M413 197L483 178L554 197L579 243V321L545 365L483 382L421 365L386 321V243Z" fill="url(#rv-red-v61)" stroke="#751225" stroke-width="4"/>
 <path d="M421 208L483 191L545 208L565 247V314L535 350L483 367L432 351L401 314V247Z" fill="url(#rv-black-v61)" stroke="#f2646b" stroke-width="2"/>
 <circle cx="483" cy="278" r="68" fill="#231820" stroke="#8b2134" stroke-width="10"/>
 <circle cx="483" cy="278" r="59" fill="url(#rv-red-v61)" stroke="#ed6d70" stroke-width="2"/>
 <path d="M395 249L416 222L427 228L411 255V307L429 331L418 340L395 314ZM571 249L550 222L539 228L555 255V307L537 331L548 340L571 314Z" fill="url(#rv-metal-v61)" stroke="#a7a4b1" stroke-width="2"/>
 <g fill="#5c505c" stroke="#f0e6ed" stroke-width="2"><circle cx="409" cy="239" r="5"/><circle cx="557" cy="239" r="5"/><circle cx="409" cy="315" r="5"/><circle cx="557" cy="315" r="5"/></g>
 <path d="M191 232H208V313H191ZM758 232H775V313H758Z" fill="url(#rv-metal-v61)" stroke="#afadb9" stroke-width="2"/>
</svg>`;
    rig.append(support);
    const parts = new Map();
    for (const part of DRIVER.parts) {
      const holder = document.createElement('span');
      holder.className = `rv-piece rv-piece-${part.name}`;
      holder.dataset.piece = part.name;
      Object.assign(holder.style, {
        left: `${part.x / DRIVER.width * 100}%`, top: `${part.y / DRIVER.height * 100}%`,
        width: `${part.w / DRIVER.width * 100}%`, height: `${part.h / DRIVER.height * 100}%`,
        transformOrigin: `${(part.px-part.x) / part.w * 100}% ${(part.py-part.y) / part.h * 100}%`
      });
      const sprite = document.createElement('img');
      sprite.src = ATLAS; sprite.alt = ''; sprite.draggable = false;
      sprite.width = DRIVER.atlasWidth; sprite.height = DRIVER.atlasHeight;
      Object.assign(sprite.style, {
        width: `${DRIVER.atlasWidth / part.w * 100}%`, height: `${DRIVER.atlasHeight / part.h * 100}%`,
        left: `${-part.sx / part.w * 100}%`, top: `${-part.sy / part.h * 100}%`
      });
      holder.append(sprite); rig.append(holder); parts.set(part.name, holder);
    }
    return parts;
  }

  function makeLayer(words) {
    const layer = document.createElement('dialog');
    layer.className = 'raven-henshin-layer';
    layer.setAttribute('aria-labelledby', 'raven-sequence-label');
    // Static trusted markup only; content.js/user content is never inserted as HTML.
    layer.innerHTML = `
      <h2 id="raven-sequence-label" class="rv-sr-only">${words.title}</h2>
      <div class="rv-grain" aria-hidden="true"></div>
      <div class="rv-corner rv-corner-a" aria-hidden="true"></div>
      <div class="rv-corner rv-corner-b" aria-hidden="true"></div>
      <header class="rv-topbar">
        <div class="rv-brand"><span class="rv-brand-dot"></span><b>RAVEN LIN</b><span>/ 03</span></div>
        <div class="rv-actions"><button type="button" data-raven-sound aria-pressed="false">${words.soundOff}</button>
        <button type="button" data-raven-skip>${words.skip}<span aria-hidden="true"> &#8599;</span></button></div>
      </header>
      <p class="rv-loading" role="status">${words.loading}</p>
      <div class="rv-scene" aria-hidden="true">
        <div class="rv-monogram">IX</div>
        <div class="rv-aura"></div>
        <div class="rv-energy"></div>
        <div class="rv-shock rv-shock-one"></div><div class="rv-shock rv-shock-two"></div>
        <div class="rv-dust"></div>
        <div class="rv-driver-stage"><div class="rv-rig"></div><div class="rv-core-light"></div></div>
        <div class="rv-phase-stack">
          <div class="rv-phase rv-phase-entry"><strong>ENTRY</strong><span>${words.entry}</span></div>
          <div class="rv-phase rv-phase-set"><strong>SET.</strong><span>${words.set}</span></div>
          <div class="rv-phase rv-phase-ready"><strong>READY</strong><span>${words.ready}</span></div>
          <div class="rv-phase rv-phase-henshin"><strong>HENSHIN</strong><span>${words.henshin}</span></div>
        </div>
        <div class="rv-reveal"><span class="rv-reveal-kicker">GEATS / IX</span><strong>RAVEN <em>LIN</em></strong><small>${words.archive}</small></div>
        <div class="rv-impulse"></div>
      </div>
      <footer class="rv-footer"><span>${words.footer}</span><div class="rv-progress"><i></i></div><span>${words.hint}</span></footer>`;
    return layer;
  }

  function runTimeline(run) {
    const $ = selector => run.layer.querySelector(selector);
    const soft = root.dataset.motionChoice === 'quiet';
    const mobile = innerWidth < 700;
    run.layer.classList.add('is-playing');
    run.layer.dataset.intensity = soft ? 'quiet' : 'full';
    $('.rv-loading').hidden = true;
    run.origin = document.timeline.currentTime;
    run.master = animate(run, $('.rv-scene'), [
      [0,{opacity:0}], [220,{opacity:1}], [DURATION-480,{opacity:1}], [DURATION,{opacity:0}]
    ]);
    animate(run, run.layer, [[0,{opacity:1}],[DURATION-360,{opacity:1}],[DURATION,{opacity:0}]]);
    animate(run, $('.rv-progress i'), [[0,{transform:'scaleX(0)'}],[DURATION,{transform:'scaleX(1)'}]]);
    animate(run, $('.rv-rig'), [
      [0,{opacity:0,transform:`translateY(${soft ? 12 : 58}px) scale(.74) rotateX(24deg)`,easing:EASE}],
      [680,{opacity:1,transform:'translateY(0) scale(1) rotateX(0deg)',easing:EASE}],
      [1460,{opacity:1,transform:'translateY(0) scale(.95) rotateX(0deg)'}],
      [2290,{opacity:1,transform:'translateY(0) scale(.95) rotateX(0deg)',easing:'cubic-bezier(.5,0,.7,.4)'}],
      [2510,{opacity:1,transform:`translateY(${soft ? 0 : 5}px) scale(${soft ? 1 : 1.04}) rotateX(-4deg)`,easing:EASE}],
      [2970,{opacity:1,transform:'translateY(0) scale(1) rotateX(0deg)'}],
      [DURATION,{opacity:1,transform:'translateY(0) scale(1) rotateX(0deg)'}]
    ]);
    const parts = buildDriver($('.rv-rig'));
    animate(run, $('.rv-support'), [[0,{opacity:0}],[930,{opacity:0}],[1420,{opacity:1}],
      [2660,{opacity:1}],[3060,{opacity:0}],[DURATION,{opacity:0}]]);
    animate(run, parts.get('chassis'), [[0,{opacity:1}],[930,{opacity:1}],[1390,{opacity:0}],
      [2660,{opacity:0}],[3040,{opacity:1}],[DURATION,{opacity:1}]]);
    for (const part of DRIVER.parts) {
      const node = parts.get(part.name);
      const closed = `translate(${part.closed.x/part.w*100}%,${part.closed.y/part.h*100}%) rotate(${part.closed.r}deg)`;
      const open = 'translate(0%,0%) rotate(0deg)';
      if (part.name.startsWith('tail-') || part.name.startsWith('crown-')) {
        const rank = part.name.endsWith('lower') ? 0 : part.name.endsWith('middle') ? 1 : part.name.endsWith('upper') ? 2 : 3;
        const fold = 940 + rank*75, unfold = 2390 + (3-rank)*40;
        const overshoot = `translate(0%,0%) rotate(${-Math.sign(part.closed.r)*5}deg)`;
        animate(run,node,[[0,{transform:open}], [fold,{transform:open,easing:'cubic-bezier(.55,0,.7,.45)'}],
          [fold+430,{transform:closed}], [unfold,{transform:closed,easing:EASE}],
          [unfold+330,{transform:overshoot,easing:EASE}], [unfold+620,{transform:open}], [DURATION,{transform:open}]]);
      } else if (part.name.startsWith('belt-')) {
        const sign = part.name.endsWith('left') ? -1 : 1;
        animate(run,node,[[0,{transform:`translateX(${sign*115}%)`,opacity:0,easing:EASE}],
          [630,{transform:open,opacity:1}], [1080,{transform:open,opacity:1,easing:EASE}],
          [1530,{transform:closed,opacity:1}], [2370,{transform:closed,opacity:1,easing:EASE}],
          [2580,{transform:`translateX(${sign*6}%)`,opacity:1,easing:EASE}],
          [2880,{transform:open,opacity:1}],[DURATION,{transform:open,opacity:1}]]);
      } else if (part.name === 'core') {
        animate(run,node,[[0,{transform:'scale(1)'}],[2030,{transform:'scale(1)',easing:EASE}],
          [2230,{transform:`scale(1.07) rotate(${soft ? 0 : -9}deg)`,easing:EASE}],
          [2480,{transform:'scale(1.02) rotate(2deg)',easing:EASE}], [2760,{transform:'scale(1)'}],[DURATION,{transform:'scale(1)'}]]);
      }
    }
    visibility(run,$('.rv-phase-entry'),100,800);
    visibility(run,$('.rv-phase-set'),1020,1620);
    visibility(run,$('.rv-phase-ready'),1790,2260);
    visibility(run,$('.rv-phase-henshin'),2440,3100);
    animate(run,$('.rv-reveal'),[[0,{opacity:0,transform:'translateY(20px)'}],
      [3270,{opacity:0,transform:'translateY(20px)',easing:EASE}], [3770,{opacity:1,transform:'translateY(0)'}],
      [DURATION,{opacity:1,transform:'translateY(0)'}]]);
    animate(run,$('.rv-core-light'),[[0,{opacity:0,transform:'scale(.5)'}],[1490,{opacity:0,transform:'scale(.5)'}],
      [2190,{opacity:.6,transform:'scale(1)'}],[2430,{opacity:soft ? .12 : .75,transform:'scale(1.45)'}],
      [2860,{opacity:0,transform:'scale(2)'}],[DURATION,{opacity:0,transform:'scale(2)'}]]);
    animate(run,$('.rv-aura'),[[0,{opacity:.12,transform:'translate(-50%,-50%) scale(.75)'}],
      [2090,{opacity:.28,transform:'translate(-50%,-50%) scale(.85)'}],
      [2590,{opacity:soft ? .32 : .7,transform:'translate(-50%,-50%) scale(1.3)'}],
      [3650,{opacity:.25,transform:'translate(-50%,-50%) scale(1)'}],[DURATION,{opacity:.25,transform:'translate(-50%,-50%) scale(1)'}]]);
    if (!soft) animate(run,$('.rv-impulse'),[[0,{opacity:0}],[2440,{opacity:0}],[2540,{opacity:.2}],
      [2870,{opacity:0}],[DURATION,{opacity:0}]]);
    for (const [index, node] of [...run.layer.querySelectorAll('.rv-shock')].entries()) {
      const start = 2470+index*140;
      animate(run,node,[[0,{opacity:0,transform:'translate(-50%,-50%) scale(.2)'}],
        [start,{opacity:0,transform:'translate(-50%,-50%) scale(.2)',easing:EASE}],
        [start+110,{opacity:soft ? .15 : .55,transform:'translate(-50%,-50%) scale(.45)',easing:EASE}],
        [start+900,{opacity:0,transform:'translate(-50%,-50%) scale(2.5)'}],[DURATION,{opacity:0,transform:'translate(-50%,-50%) scale(2.5)'}]]);
    }
    // Nine individual flame ribbons, behind rather than replacing the actual Driver.
    for(let i=0;i<9;i++) {
      const tail=document.createElement('div');tail.className='rv-energy-tail';
      tail.innerHTML='<svg viewBox="0 0 120 600" preserveAspectRatio="none"><path class="rv-tail-outer" d="M60 596C20 487 105 395 49 280C14 210 3 126 75 5C52 124 132 192 95 307C67 409 121 481 60 596Z"/><path class="rv-tail-inner" d="M60 583C43 474 104 421 68 301C37 200 59 117 75 53C63 164 113 218 85 319C63 413 92 477 60 583Z"/></svg>';
      $('.rv-energy').append(tail);
      const angle=(i-4)*24;
      const scale=1-Math.abs(i-4)*.055;
      const base=`translateX(-50%) rotate(${angle}deg)`;
      const at=2360+Math.abs(i-4)*38;
      animate(run,tail,[[0,{opacity:0,transform:`${base} scale(.12,.15)`}],
        [at,{opacity:0,transform:`${base} scale(.12,.15)`,easing:EASE}],
        [at+340,{opacity:soft ? .18 : .7,transform:`${base} scale(1,${scale})`,easing:EASE}],
        [at+730,{opacity:soft ? .12 : .38,transform:`${base} scale(.84,${scale*1.07})`}],
        [4550,{opacity:0,transform:`${base} scale(.65,${scale*1.18})`}],[DURATION,{opacity:0,transform:`${base} scale(.65,${scale*1.18})`}]]);
    }
    const count=soft ? 8 : mobile ? 14 : 26;
    for(let i=0;i<count;i++) {
      const dust=document.createElement('i');dust.className='rv-ember';$('.rv-dust').append(dust);
      const angle=(i*137.508)*Math.PI/180;
      const distance=(mobile?140:250)+(i%4)*32;
      const dx=Math.cos(angle)*distance,dy=Math.sin(angle)*distance*.72-45;
      const start=2420+(i%6)*34;
      dust.style.setProperty('--ember-size',`${2+i%3}px`);
      animate(run,dust,[[0,{opacity:0,transform:'translate(-50%,-50%) scale(.2)'}],
        [start,{opacity:0,transform:'translate(-50%,-50%) scale(.2)',easing:EASE}],
        [start+170,{opacity:.85,transform:`translate(${dx*.5}px,${dy*.5}px) scale(1)`}],
        [start+1380,{opacity:0,transform:`translate(${dx}px,${dy-38}px) scale(.2)`}],
        [DURATION,{opacity:0,transform:`translate(${dx}px,${dy-38}px) scale(.2)`}]]);
    }
    run.master.finished.then(() => finish(run,'complete'), () => {});
    document.dispatchEvent(new CustomEvent('club:raven', { detail: { active:true, duration:DURATION } }));
  }

  async function toggleSound(run, button, words) {
    if (active !== run || !run.master) return;
    if (run.audio) { releaseSound(run);button.textContent=words.soundOff;button.setAttribute('aria-pressed','false');return; }
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) { button.disabled=true;return; }
    try {
      const context=new Audio();const output=context.createGain();output.gain.value=.2;output.connect(context.destination);
      const audio={context,output,nodes:[]};run.audio=audio;
      await context.resume();
      if(active!==run || run.audio!==audio) return;
      button.textContent=words.soundOn;button.setAttribute('aria-pressed','true');
      const position=elapsed(run);
      // Original synthetic clicks/air/bass, not sampled dialogue or show audio.
      for(const cue of [{at:1060,hz:170,length:.08},{at:1570,hz:115,length:.13},{at:2240,hz:320,length:.18},{at:2500,hz:68,length:.7}]) {
        if(cue.at < position) continue;
        const time=context.currentTime+(cue.at-position)/1000;
        const oscillator=context.createOscillator();const gain=context.createGain();
        oscillator.type=cue.at===2500?'sine':'triangle';oscillator.frequency.setValueAtTime(cue.hz,time);
        oscillator.frequency.exponentialRampToValueAtTime(Math.max(30,cue.hz*.48),time+cue.length);
        gain.gain.setValueAtTime(.001,time);gain.gain.exponentialRampToValueAtTime(.6,time+.015);
        gain.gain.exponentialRampToValueAtTime(.001,time+cue.length);
        oscillator.connect(gain);gain.connect(output);oscillator.start(time);oscillator.stop(time+cue.length+.02);audio.nodes.push(oscillator);
      }
      if(position<2590) {
        const length=.8;const buffer=context.createBuffer(1,Math.ceil(context.sampleRate*length),context.sampleRate);
        const data=buffer.getChannelData(0);for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*.35;
        const noise=context.createBufferSource();noise.buffer=buffer;const filter=context.createBiquadFilter();filter.type='lowpass';filter.frequency.value=2100;
        const gain=context.createGain();const time=context.currentTime+Math.max(.01,(2420-position)/1000);
        gain.gain.setValueAtTime(.001,time);gain.gain.exponentialRampToValueAtTime(.8,time+.12);gain.gain.exponentialRampToValueAtTime(.001,time+length);
        noise.connect(filter);filter.connect(gain);gain.connect(output);noise.start(time);noise.stop(time+length);audio.nodes.push(noise);
      }
    } catch { releaseSound(run);button.textContent=words.soundOff;button.setAttribute('aria-pressed','false'); }
  }

  async function launch(trigger) {
    stop('replaced');
    if(!allowed() || !Element.prototype.animate) return false;
    const words=WORDS[root.lang==='en'?'en':'vi'];
    const layer=makeLayer(words);
    const run={layer,trigger:trigger || document.activeElement,animations:[],audio:null,master:null,origin:null};
    active=run;lastError='';document.body.append(layer);root.classList.add('raven-sequence-running');
    layer.querySelector('[data-raven-skip]').addEventListener('click',()=>finish(run,'skipped'));
    layer.querySelector('[data-raven-sound]').addEventListener('click',event=>toggleSound(run,event.currentTarget,words));
    layer.addEventListener('cancel',event=>{event.preventDefault();finish(run,'escape');});
    layer.addEventListener('close',()=>finish(run,'closed'));
    try {
      if (typeof layer.showModal==='function') layer.showModal();
      else {layer.setAttribute('open','');layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','true');}
      layer.querySelector('[data-raven-skip]').focus({preventScroll:true});
      await preload();
      if(active!==run) return false;
      if(!allowed()) {finish(run,'motion-off');return false;}
      runTimeline(run);return true;
    } catch(error) {
      lastError=error?.message || String(error);finish(run,'unavailable');return false;
    }
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop('hidden');});
  document.addEventListener('club:motion',()=>{if(!allowed())stop('motion-off');});
  document.addEventListener('club:language',()=>stop('language'));
  window.addEventListener('pagehide',()=>stop('hidden'));
  document.addEventListener('keydown',event=>{if(event.key==='Escape' && active){event.preventDefault();stop('escape');}});
  const api={launch,stop,preload,get state(){return {active:!!active,phase:active?phase(active):'idle',elapsed:elapsed(active),duration:DURATION,sound:!!active?.audio,lastError};}};
  window.ClubRaven=api;return api;
}
