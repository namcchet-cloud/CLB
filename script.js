(() => {
  'use strict';
  const { t, local } = window.Club;
  const content = window.CLUB_CONTENT;
  const motion = window.ClubMotion;
  const nav = document.querySelector('.nav'), menu = document.querySelector('.menu-toggle');
  function closeMenu() { nav?.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }
  menu?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
  });
  nav?.querySelectorAll('a').forEach(el=>el.addEventListener('click',closeMenu));
  document.addEventListener('click',e=>{
    if (!e.target.closest('.site-header')) closeMenu();
  });
  document.querySelectorAll('[data-join]').forEach(link=>{
    link.href=content.joinUrl;
    link.addEventListener('click',()=>motion?.burst(link,'',9));
  });
  const stage=document.querySelector('.hero-stage'), logo=document.querySelector('.hero-logo');
  const mascot=document.getElementById('mascotCard');
  function setMascot(open,restore=false) {
    stage.classList.toggle('logo-open',open);
    logo.setAttribute('aria-expanded',String(open));
    mascot.setAttribute('aria-hidden',String(!open));
    mascot.inert=!open;
    if (open) mascot.querySelector('.mascot-close')?.focus({preventScroll:true});
    else if(restore) logo.focus({preventScroll:true});
  }
  logo.addEventListener('click',()=>{
    const open=!stage.classList.contains('logo-open');
    setMascot(open);
    if(open) motion?.burst(logo,t('wow'),16);
  });
  mascot.querySelector('.mascot-close').addEventListener('click',()=>setMascot(false,true));
  document.addEventListener('click',e=>{
    if(stage.classList.contains('logo-open') && !stage.contains(e.target)) setMascot(false);
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape') {
      if(nav?.classList.contains('open')) {closeMenu();menu?.focus();}
      if(stage?.classList.contains('logo-open')) setMascot(false,true);
    }
  });

  const gallery=document.getElementById('galleryGrid');
  const lightbox=document.getElementById('lightbox');
  let filter='all', selectedIndex=-1, lastTrigger=null;
  function make(tag,cls,text) {
    const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;
  }
  function paintLightbox(index) {
    const art=content.artworks[index]; if(!art)return;
    selectedIndex=index;
    const img=document.getElementById('lightboxImage');
    img.src=art.image;img.alt=local(art.title);
    document.getElementById('lightboxCaption').textContent=`${local(art.title)} — ${local(art.author)}`;
  }
  function openArtwork(index,trigger) {
    if(!lightbox?.showModal)return;
    lastTrigger=trigger;paintLightbox(index);
    lightbox.showModal(); document.body.classList.add('no-scroll');
  }
  function renderGallery() {
    gallery.replaceChildren();
    content.artworks.forEach((art,index)=>{
      if(filter!=='all'&&art.category!==filter)return;
      const card=make('button','gallery-card');
      card.type='button';card.dataset.index=index;
      card.setAttribute('aria-label',`${t('viewArt')}: ${local(art.title)}`);
      const img=make('img'); img.src=art.image; img.alt=local(art.title);img.loading='lazy';img.width=700;img.height=700;
      const info=make('div','gallery-info');
      info.append(make('h3','',local(art.title)),make('p','',[local(art.author),local(art.description)].filter(Boolean).join(' · ')));
      card.append(img,info);
      card.addEventListener('click',()=>openArtwork(index,card));
      gallery.append(card);
    });
    if(!gallery.children.length) {
      const card=make('article','gallery-card placeholder-card');
      const art=make('div','placeholder-art');art.innerHTML=t('moreArt');
      const info=make('div','gallery-info');info.append(make('h3','',t('comingSoon')),make('p','',t('clubFull')));
      card.append(art,info);gallery.append(card);
    }
  }
  document.querySelectorAll('.filter').forEach(button=>{
    button.addEventListener('click',()=>{
      filter=button.dataset.filter;
      document.querySelectorAll('.filter').forEach(el=>{
        const active=el===button;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));
      });
      renderGallery();
      motion?.burst(button,'',7);
    });
  });
  function closeArtwork(){ if(lightbox.open) lightbox.close(); }
  lightbox.querySelector('.lightbox-close').addEventListener('click',closeArtwork);
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeArtwork();});
  lightbox.addEventListener('close',()=>{
    document.body.classList.remove('no-scroll');
    if(lastTrigger?.isConnected) lastTrigger.focus({preventScroll:true});
  });
  lightbox.addEventListener('keydown',e=>{
    if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;
    const indices=content.artworks.map((a,i)=>({a,i})).filter(({a})=>filter==='all'||a.category===filter).map(({i})=>i);
    if(indices.length<2)return;
    e.preventDefault();
    const at=indices.indexOf(selectedIndex),next=(at+(e.key==='ArrowRight'?1:-1)+indices.length)%indices.length;
    paintLightbox(indices[next]);
  });
  document.addEventListener('club:language',()=>{
    renderGallery();if(lightbox.open)paintLightbox(selectedIndex);
  });
  renderGallery();
})();
