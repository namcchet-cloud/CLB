/** Raven Lin: lightweight, asset-free fox/HUD transformation. */
export function initRaven(){
  let active=null, timer=0;
  const allowed=()=>document.documentElement.dataset.motion!=='off' && window.ClubMotion?.enabled!==false;
  function stop(){clearTimeout(timer);active?.remove();active=null;}
  function launch(){
    stop(); if(!allowed()) return Promise.resolve(false);
    const layer=document.createElement('div'); layer.className='raven-henshin-layer'; layer.setAttribute('aria-hidden','true');
    layer.innerHTML='<div class="raven-lock">TARGET // RAVEN</div><div class="raven-core"><i class="raven-ring r1"></i><i class="raven-ring r2"></i><i class="raven-ring r3"></i><b class="raven-fox"></b></div><div class="raven-title"><strong>RAVEN LIN</strong><small>ARTIST PROFILE // ARCHIVE LOCKED</small></div><i class="raven-flash"></i>';
    document.body.append(layer); active=layer;
    timer=setTimeout(stop,2900); return Promise.resolve(true);
  }
  window.ClubRaven={launch,stop}; return {launch,stop};
}
