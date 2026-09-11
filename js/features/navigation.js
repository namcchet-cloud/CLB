import { rafThrottle } from "../core/runtime.js?v=5.0.0";
export function initNavigation() {
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


(function(){
 'use strict';
 const root=document.documentElement;
 const header=document.querySelector('.site-header');
 const links=[...document.querySelectorAll('.nav a[href^="#"]')];
 const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
 let frame=0;
 function update(){
   frame=0;header?.classList.toggle('has-scrolled',scrollY>24);
   let current='';
   for(const section of sections)if(section.getBoundingClientRect().top<innerHeight*.38)current=section.id;
   for(const link of links){
     if(link.hash==='#'+current)link.setAttribute('aria-current','location');
     else link.removeAttribute('aria-current');
   }
 }
 const queue=()=>{if(!frame)frame=requestAnimationFrame(update);};
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
 addEventListener('pageshow',()=>{root.dataset.pageHidden='false';queue();});
 document.addEventListener('visibilitychange',()=>{root.dataset.pageHidden=String(document.hidden);if(!document.hidden)queue();});
 document.addEventListener('club:language',queue);
 update();

})();
return { closeMenu };
}
