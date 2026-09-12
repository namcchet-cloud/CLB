/** Page motion: bounded particles, on-screen ambience, inertia only until settled. */
export function initMotion() {
  'use strict';
  const root = document.documentElement;
  const $ = id => document.getElementById(id);
  const t = key => window.Club?.t(key) || key;
  const mq = query => window.matchMedia?.(query) || { matches: false };
  const reduce = mq('(prefers-reduced-motion: reduce)');
  const fine = mq('(any-hover: hover) and (any-pointer: fine)');
  const listenMedia = (m, fn) => m.addEventListener ? m.addEventListener('change', fn) : m.addListener?.(fn);
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k,v) { try { localStorage.setItem(k,v); } catch {} } };
  let choice = store.get('artclub-motion-v23') || root.dataset.motionChoice || 'auto';
  if (!['auto','full','quiet','off'].includes(choice)) choice='auto';
  let enabled = true;
  const transient = new Set();
  const visible = new Set();
  const registered = new WeakSet();
  const observedNodes = new Set();
  const hovered = new Map();
  const bound = new WeakSet();
  const layer = $('fxLayer');
  let raf = 0, prev = 0;
  const stage = document.querySelector('[data-parallax-root]');
  const depthLayers = [...(stage?.querySelectorAll('[data-depth]') || [])];
  const parallax = { x:0, y:0, tx:0, ty:0 };
  const clamp = (v,min,max) => Math.min(max,Math.max(min,v));

  function animate(el, frames, options, remove=false) {
    if (!enabled || !el?.animate || document.hidden) { if(remove) el?.remove(); return null; }
    let a;
    try { a = el.animate(frames, options); } catch { if(remove)el.remove(); return null; }
    const item = { a, el, remove }; transient.add(item);
    const clean = () => { transient.delete(item); if(remove) el.remove(); };
    a.finished.then(clean,clean);
    return a;
  }
  function resetPointer() {
    hovered.forEach((s,el) => { el.style.setProperty('--mx','0px'); el.style.setProperty('--my','0px'); el.style.setProperty('--rx','0deg'); el.style.setProperty('--ry','0deg'); });
    hovered.clear();
    Object.assign(parallax,{x:0,y:0,tx:0,ty:0});
    depthLayers.forEach(el => el.style.translate='0px 0px');
  }
  function syncPreference() {
    enabled = choice==='full' || choice==='quiet' || (choice==='auto' && !reduce.matches);
    root.dataset.motion=enabled?'full':'off';
    root.dataset.motionChoice=choice;
    root.dataset.motionLevel=choice;
    $('motionDock')?.setAttribute('data-state',enabled?'on':'off');
    if($('motionReason')) $('motionReason').textContent=t(!enabled && choice==='auto'?'motionReasonSystem':!enabled?'motionReasonOff':choice==='quiet'?'motionReasonQuiet':'motionReasonOn');
    const label = t(enabled?(choice==='quiet'?'motionQuietLabel':'motionOn'):choice==='auto'?'motionSystem':'motionOff');
    if($('motionText')) $('motionText').textContent=label;
    if($('motionDockStatus')) $('motionDockStatus').textContent=label;
    if($('motionMode')) $('motionMode').value=choice;
    $('motionToggle')?.setAttribute('aria-pressed',String(enabled));
    if(choice==='quiet')resetPointer();
    if(!enabled) {
      transient.forEach(({a})=>a.cancel());
      resetPointer();
      document.querySelectorAll('.js-reveal').forEach(el=>{el.classList.add('in-view');el.classList.remove('js-reveal');});
      cancelAnimationFrame(raf);raf=0;
    }
    document.dispatchEvent(new CustomEvent('club:motion',{detail:enabled}));
  }
  function setChoice(value) { if(!['auto','full','quiet','off'].includes(value))return; choice=value;store.set('artclub-motion-v23',choice);syncPreference(); }
  $('motionMode')?.addEventListener('change',e=>setChoice(e.target.value));
  $('motionToggle')?.addEventListener('click',()=>setChoice(enabled?'off':'full'));
  listenMedia(reduce,syncPreference);
  listenMedia(fine,resetPointer);
  document.addEventListener('club:language',syncPreference);
  document.addEventListener('visibilitychange',()=>{
    root.dataset.pageHidden=String(document.hidden);
    if(document.hidden){cancelAnimationFrame(raf);raf=0;prev=0;resetPointer();transient.forEach(({a})=>{ try { a.finish(); } catch { a.cancel(); } });}
  });

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      target.classList.toggle('ambient-active',isIntersecting);
      target.classList.toggle('ambient-paused',!isIntersecting);
      if(isIntersecting)visible.add(target);else visible.delete(target);
      if(isIntersecting && target.classList.contains('js-reveal')) {
        target.classList.add('in-view');
        const direction=target.dataset.reveal;
        const from=direction==='left'?'-42px 0px':direction==='right'?'42px 0px':'0px 36px';
        animate(target,[{opacity:0,translate:from},{opacity:1,translate:'0px 0px'}],{duration:900,delay:Number(target.dataset.stagger)||0,easing:'cubic-bezier(.16,1,.3,1)'});
        target.classList.remove('js-reveal');
      }
    });
  },{threshold:0.04,rootMargin:'35px 0px 20px'}) : null;

  function register(scope=document) {
    observedNodes.forEach(el=>{if(!el.isConnected){observer?.unobserve(el);visible.delete(el);hovered.delete(el);observedNodes.delete(el);}});
    scope.querySelectorAll('.reveal,[data-ambient],.gallery-card').forEach((el,index)=>{
      if(registered.has(el))return;
      registered.add(el);observedNodes.add(el);
      if(el.matches('.reveal,.gallery-card') && enabled && observer) {
        el.classList.add('js-reveal');el.dataset.stagger=String((index%3)*75);
      }
      if(observer)observer.observe(el);else el.classList.add('ambient-active','in-view');
    });
    scope.querySelectorAll('.gallery-card,.activity-card,.values article').forEach(el=>bindPointer(el,'card'));
    scope.querySelectorAll('.comic-button,.header-join,.filter').forEach(el=>bindPointer(el,'button'));
  }
  function bindPointer(el,type) {
    if(bound.has(el))return;
    bound.add(el);el.classList.add(type==='card'?'motion-card':'motion-button');
    el.addEventListener('pointerenter',e=>{
      if(!enabled||choice==='quiet'||e.pointerType==='touch')return;
      const s={x:0,y:0,tx:0,ty:0,type,rect:el.getBoundingClientRect()};
      hovered.set(el,s);move(e,s);wake();
    });
    el.addEventListener('pointermove',e=>{const s=hovered.get(el);if(s){move(e,s);wake();}},{passive:true});
    el.addEventListener('pointerleave',()=>{const s=hovered.get(el);if(s){s.tx=s.ty=0;s.leaving=true;wake();}});
    function move(e,s) {
      s.tx=clamp((e.clientX-s.rect.left)/s.rect.width-.5,-.5,.5)*2;
      s.ty=clamp((e.clientY-s.rect.top)/s.rect.height-.5,-.5,.5)*2;
      s.leaving=false;
    }
  }
  function wake() {if(!raf&&enabled&&!document.hidden){prev=0;raf=requestAnimationFrame(tick);}}
  function tick(now) {
    raf=0;if(!enabled||document.hidden)return;
    const dt=prev?Math.min(40,now-prev):16.7;prev=now;
    const easing=1-Math.exp(-dt/100);let unfinished=false;
    hovered.forEach((s,el)=>{
      if(!el.isConnected){hovered.delete(el);return;}
      s.x+=(s.tx-s.x)*easing;s.y+=(s.ty-s.y)*easing;
      if(s.type==='card') {
        el.style.setProperty('--rx',`${(-s.y*3.8).toFixed(3)}deg`);
        el.style.setProperty('--ry',`${(s.x*4.8).toFixed(3)}deg`);
        el.style.setProperty('--shine-x',`${50+s.x*25}%`);
        el.style.setProperty('--shine-y',`${50+s.y*25}%`);
      } else {
        el.style.setProperty('--mx',`${(s.x*4).toFixed(3)}px`);
        el.style.setProperty('--my',`${(s.y*3).toFixed(3)}px`);
      }
      if(Math.abs(s.tx-s.x)+Math.abs(s.ty-s.y)>.001)unfinished=true;
      else if(s.leaving)hovered.delete(el);
    });
    parallax.x+=(parallax.tx-parallax.x)*easing;
    parallax.y+=(parallax.ty-parallax.y)*easing;
    depthLayers.forEach(el=>{
      const d=Number(el.dataset.depth)||.5;
      el.style.translate=`${(parallax.x*d).toFixed(2)}px ${(parallax.y*d).toFixed(2)}px`;
    });
    if(Math.abs(parallax.tx-parallax.x)+Math.abs(parallax.ty-parallax.y)>.02)unfinished=true;
    if(unfinished)raf=requestAnimationFrame(tick);else prev=0;
  }
  let stageRect = null;
  stage?.addEventListener('pointerenter',()=>{stageRect=stage.getBoundingClientRect();});
  window.addEventListener('resize',()=>{stageRect=null;},{passive:true});
  stage?.addEventListener('pointermove',e=>{
    if(!enabled||choice==='quiet'||e.pointerType==='touch')return;
    const r=stageRect || (stageRect=stage.getBoundingClientRect());
    parallax.tx=((e.clientX-r.left)/r.width-.5)*46;
    parallax.ty=((e.clientY-r.top)/r.height-.5)*36;wake();
  },{passive:true});
  stage?.addEventListener('pointerleave',()=>{parallax.tx=parallax.ty=0;wake();});
  let scrollRaf=0;
  window.addEventListener('scroll',()=>{
    if(scrollRaf)return;
    scrollRaf=requestAnimationFrame(()=>{
      scrollRaf=0;
      const max=document.documentElement.scrollHeight-innerHeight;
      $('scrollProgress')?.style.setProperty('--progress',max?String(scrollY/max):'0');
      if(enabled&&!fine.matches&&visible.has(stage)){
        parallax.ty=clamp((stage.getBoundingClientRect().top-innerHeight*.3)*.035,-15,15);wake();
      }
    });
  },{passive:true});
  window.addEventListener('resize',resetPointer,{passive:true});

  function burst(target,word='',count=10) {
    if(!enabled||document.hidden||!target||!layer||transient.size>65)return;
    count=Math.min(count,innerWidth<801?8:14);
    const r=target.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
    if(y<0||y>innerHeight)return;
    const colors=['#e0bb58','#a44331','#355972','#d990a4','#536b48'];
    const radius=clamp(r.width*.38,45,150);
    for(let i=0;i<Math.min(count,16);i++) {
      const el=document.createElement('span');el.className='fx-particle'+(i%3===0?' is-star':'');
      Object.assign(el.style,{left:`${x}px`,top:`${y}px`,background:colors[i%5]});layer.append(el);
      const a=i/count*Math.PI*2-Math.PI/2,d=radius+30+Math.random()*55,dx=Math.cos(a)*d,dy=Math.sin(a)*d;
      animate(el,[{transform:'translate(-50%,-50%) scale(.15)',opacity:0},
        {transform:`translate(calc(-50% + ${dx*.6}px),calc(-50% + ${dy*.6}px)) scale(1.15) rotate(80deg)`,opacity:1,offset:.3},
        {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy+35}px)) scale(.3) rotate(180deg)`,opacity:0}],
        {duration:1000+Math.random()*350,easing:'cubic-bezier(.16,1,.3,1)'},true);
    }
    if(word) {
      const el=document.createElement('span');el.className='fx-word';el.textContent=word;
      el.style.left=`${clamp(x,85,innerWidth-90)}px`;el.style.top=`${Math.max(100,y)}px`;layer.append(el);
      animate(el,[{transform:'translate(-50%,0) scale(.1) rotate(-15deg)',opacity:0},
        {transform:'translate(-50%,-120%) scale(1.08) rotate(-6deg)',opacity:1,offset:.3},
        {transform:'translate(-50%,-135%) scale(1) rotate(-4deg)',opacity:1,offset:.72},
        {transform:'translate(-50%,-210%) scale(.85) rotate(4deg)',opacity:0}],
        {duration:1500,easing:'cubic-bezier(.22,1,.36,1)'},true);
    }
  }
  document.addEventListener('pointerdown',e=>{
    const button=e.target.closest('button,a.comic-button,a.header-join');
    if(!enabled||!button||button.closest('#motionDock')||button.id==='motionToggle')return;
    if(button.classList.contains('hero-logo'))return;
    const r=button.getBoundingClientRect(),ring=document.createElement('span');ring.className='tap-ring';
    ring.style.left=`${e.clientX||r.left+r.width/2}px`;ring.style.top=`${e.clientY||r.top+r.height/2}px`;layer?.append(ring);
    animate(ring,[{transform:'translate(-50%,-50%) scale(.25)',opacity:.65},{transform:'translate(-50%,-50%) scale(1.8)',opacity:0}],{duration:650,easing:'ease-out'},true);
  },{passive:true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('motionDock'))$('motionDock').open=false;});
  document.addEventListener('click',e=>{if(!$('motionDock')?.contains(e.target)&&$('motionDock'))$('motionDock').open=false;});

  window.ClubMotion={version:'5.1.0',burst,animate,register,setChoice,get enabled(){return enabled;},get choice(){return choice;}};
  window.addEventListener('pageshow',()=>{root.dataset.pageHidden='false';syncPreference();register();});
  window.addEventListener('blur',resetPointer);
  root.dataset.pageHidden=String(document.hidden);
  syncPreference();register();
  document.dispatchEvent(new CustomEvent('club:motion-ready'));
return window.ClubMotion;
}
