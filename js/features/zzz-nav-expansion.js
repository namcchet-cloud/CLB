/** Progressive nav preview for the entire ZZZ edition; classic nav stays native. */
(() => {
  'use strict';
  const root = document.documentElement;
  const nav = document.getElementById('mainNav');
  const menu = document.querySelector('.menu-toggle');
  if (!nav || nav.dataset.zzNavReady) return;
  nav.dataset.zzNavReady = '1';
  const links = [...nav.querySelectorAll('a[href^="#"]')].filter(a => a.hash && a.hash !== '#home');
  const art = {
    about: {no:'01',img:'assets/optimized/logo-new-192-86e0c09a.webp',summary:'#about .about-copy .lead'},
    gallery: {no:'02',img:'assets/optimized/ba-mam-sac-560-bfaa2f67.webp',summary:'#gallery .section-heading > p'},
    activities: {no:'03',img:'assets/zzz-v2/props/workshop.svg',summary:'#activities .activity-card p'},
    playlist: {no:'04',img:'assets/zzz-v2/music-vinyl.webp',summary:'#playlist .music-intro'},
    contact: {no:'05',img:'assets/zzz-v4/contact-envelope.svg',summary:'#contact .lead'}
  };
  const preview = document.createElement('div');
  preview.className = 'zz-nav-preview';
  preview.id = 'zzNavPreview';
  preview.hidden = true;
  preview.setAttribute('role','region');
  preview.setAttribute('aria-label','Artwork menu preview');
  preview.innerHTML = `<div class="zz-nav-preview-media"><img alt="" loading="lazy" decoding="async"></div>
    <div class="zz-nav-preview-copy"><span class="zz-nav-preview-no"></span>
    <h3 class="zz-nav-preview-title"></h3><p class="zz-nav-preview-description"></p>
    <button class="zz-preview-go" type="button"></button></div>`;
  nav.append(preview);
  let active=null;
  let isTouch=false;
  let closeTimeout=0;
  const isZZZ=()=>root.dataset.clbMode==='zzz';
  const mobile=()=>matchMedia('(max-width:980px)').matches;
  const linkFor=(link)=>{let id=link.hash.slice(1);return art[id]?id:null;};
  links.forEach(link=>{link.dataset.zzSection=linkFor(link)||'';link.setAttribute('aria-controls',preview.id);link.setAttribute('aria-expanded','false');});
  const clearClose=()=>{ if(closeTimeout) {clearTimeout(closeTimeout); closeTimeout=0;} };
  function close() {
    clearClose();
    preview.hidden=true;
    links.forEach(link=>{link.classList.remove('zz-preview-active');link.setAttribute('aria-expanded','false');});
    active=null;
  }
  function setPosition(link) {
    if(mobile()) return;
    const n=nav.getBoundingClientRect(),b=link.getBoundingClientRect();
    const width=Math.min(450,window.innerWidth-28),max=Math.max(0,n.width-width);
    const left=Math.max(0,Math.min(max,b.left-n.left+b.width/2-width/2));
    nav.style.setProperty('--zz-menu-left',`${Math.round(left)}px`);
    nav.style.setProperty('--zz-pointer-left',`${Math.round(Math.max(22,Math.min(width-25,b.left-n.left+b.width/2-left-8)))}px`);
  }
  function refreshText() {
    if(!active)return;
    const link=links.find(l=>linkFor(l)===active);
    if(!link)return;
    const source=document.querySelector(art[active].summary);
    const desc=(source?.textContent||'').replace(/\s+/g,' ').trim();
    preview.querySelector('.zz-nav-preview-title').textContent=link.textContent.trim();
    preview.querySelector('.zz-nav-preview-description').textContent=desc;
    preview.querySelector('.zz-preview-go').textContent=root.lang==='en'?'EXPLORE  >>':'KH\u00c1M PH\u00c1  >>';
  }
  function show(link) {
    if(!isZZZ())return;
    const id=linkFor(link);if(!id)return;
    clearClose(); active=id;
    const pic=preview.querySelector('img');
    pic.src=art[id].img;
    preview.querySelector('.zz-nav-preview-media').dataset.media=id;
    preview.querySelector('.zz-nav-preview-no').textContent=`${art[id].no} / ART CLUB`;
    links.forEach(l=>{const selected=l===link;l.classList.toggle('zz-preview-active',selected);l.setAttribute('aria-expanded',String(selected));});
    refreshText();setPosition(link);preview.hidden=false;
  }
  links.forEach(link=>{
    link.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&!mobile())show(link);});
    link.addEventListener('focus',()=>{if(!mobile())show(link);});
  });
  nav.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')closeTimeout=setTimeout(close,170);});
  nav.addEventListener('pointerenter',clearClose);
  nav.addEventListener('click',e=>{
    const link=e.target.closest('a[data-zz-section]');
    if(!link || !isZZZ())return;
    const id=linkFor(link); if(!id)return;
    if(mobile() || isTouch){
      if(active!==id || preview.hidden){e.preventDefault();e.stopPropagation();show(link);return;}
    }
    close();
  },true);
  nav.addEventListener('pointerdown',e=>{isTouch=e.pointerType==='touch';},{passive:true});
  preview.querySelector('.zz-preview-go').addEventListener('click',()=>{
    if(!active)return;
    const dest='#'+active;
    close();
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded','false');
    const target=document.querySelector(dest);
    if(target){
      try {history.replaceState(history.state,'',location.pathname+location.search+dest);} catch { /* about:blank previews */ }
      target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape')close();
    if(e.key==='ArrowDown' && !preview.hidden && links.includes(document.activeElement)){
      e.preventDefault();preview.querySelector('.zz-preview-go').focus();
    }
  });
  document.addEventListener('click',e=>{if(!nav.contains(e.target))close();});
  window.addEventListener('resize',()=>{
    if(!active || preview.hidden)return;
    const link=links.find(l=>linkFor(l)===active);if(link)setPosition(link);
  },{passive:true});
  window.addEventListener('clb:site-mode',e=>{if(e.detail.mode!=='zzz')close();});
  document.addEventListener('club:language',refreshText);
  window.addEventListener('hashchange',close);
  window.ClubZZZNav={get expanded(){return active;}, close};
})();
