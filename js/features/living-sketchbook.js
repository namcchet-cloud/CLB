const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const root = document.documentElement;

export function initLivingSketchbook() {
  const motion = window.ClubMotion;
  const q = (selector, scope = document) => scope.querySelector(selector);
  const mobile = () => matchMedia('(max-width:800px)').matches;
  const motionEnabled = () => root.dataset.motion !== 'off' && motion?.enabled !== false;
  const quiet = () => root.dataset.motionChoice === 'quiet';
  const sectionIds = ['about','gallery','activities','playlist','join','contact'];
  const artistColors = { 'bao-tam':'#65785b','akiko-oishi':'#526d80','raven-lin':'#9b5a4b' };
  const state = {
    sections:new Set(), artists:new Set(), artworks:new Set(), journey:[], traceCount:0,
    unlocked:false, transition:null, artistTransition:null, activeSection:'about'
  };

  /* 1. Pencil thread — intentionally quiet, no labels or UI-like nodes. */
  const thread = document.createElement('aside');
  thread.className = 'ls-pencil-thread';
  thread.dataset.active = 'about';
  thread.setAttribute('aria-hidden','true');
  thread.innerHTML = `
    <svg viewBox="0 0 25 1000" preserveAspectRatio="none" aria-hidden="true">
      <path class="ls-pencil-base-a" d="M9 0 C14 108 7 205 10 314 C13 428 6 524 10 642 C14 760 7 868 10 1000"/>
      <path class="ls-pencil-base-b" d="M10.2 0 C15.1 111 6.5 207 10.6 316 C13.6 430 6.7 527 10.8 644 C14.7 762 7.1 870 10.5 1000"/>
      <path pathLength="1" class="ls-pencil-progress-a" d="M9 0 C14 108 7 205 10 314 C13 428 6 524 10 642 C14 760 7 868 10 1000"/>
      <path pathLength="1" class="ls-pencil-progress-b" d="M10.2 0 C15.1 111 6.5 207 10.6 316 C13.6 430 6.7 527 10.8 644 C14.7 762 7.1 870 10.5 1000"/>
    </svg>
    <span class="ls-pencil-section-mark"></span><span class="ls-pencil-cursor"></span>`;
  document.body.append(thread);
  const progressA = q('.ls-pencil-progress-a',thread);
  const progressB = q('.ls-pencil-progress-b',thread);
  const cursor = q('.ls-pencil-cursor',thread);
  const sectionMark = q('.ls-pencil-section-mark',thread);
  let scrollFrame = 0, lastProgress = -1;
  function updateThread(force=false){
    scrollFrame = 0;
    const doc = Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
    const max = Math.max(1,doc-innerHeight);
    const p = clamp(scrollY/max,0,1);
    if(!force && Math.abs(p-lastProgress)<.0015) return;
    lastProgress = p;
    const offset = root.dataset.motion === 'off' ? 0 : 1-p;
    progressA.style.strokeDashoffset = String(offset);
    progressB.style.strokeDashoffset = String(clamp(offset+.025,0,1));
    if(cursor) cursor.style.transform = `translate3d(0,${(p*Math.max(0,thread.clientHeight-8)).toFixed(1)}px,0) scale(${quiet()?.72:.9})`;
  }
  function queueThread(){ if(!scrollFrame && !document.hidden) scrollFrame=requestAnimationFrame(()=>updateThread(false)); }
  addEventListener('scroll',queueThread,{passive:true});
  addEventListener('resize',()=>updateThread(true),{passive:true});
  addEventListener('orientationchange',()=>setTimeout(()=>updateThread(true),120),{passive:true});
  document.addEventListener('club:motion',()=>updateThread(true));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateThread(true)});
  function setActiveSection(id){
    if(!id || state.activeSection===id) return;
    state.activeSection=id;thread.dataset.active=id;
    const at=Math.max(0,sectionIds.indexOf(id));
    const p=sectionIds.length===1?.5:at/(sectionIds.length-1);
    sectionMark.style.transform=`translate3d(0,${(p*Math.max(0,thread.clientHeight-10)).toFixed(1)}px,0)`;
  }

  /* 2. Page whisper — a page edge, never a full-screen wipe. */
  const whisper=document.createElement('div');
  whisper.className='ls-page-whisper';whisper.setAttribute('aria-hidden','true');
  whisper.innerHTML='<div class="ls-page-edge"><span class="ls-page-pencil"></span></div>';
  document.body.append(whisper);
  const pageEdge=q('.ls-page-edge',whisper);
  let transitionSeq=0;
  function targetTop(target){
    const header=q('.site-header');
    const offset=target.id==='top'?0:Math.max(76,(header?.getBoundingClientRect().height||62)+28);
    return Math.max(0,target.getBoundingClientRect().top+scrollY-offset);
  }
  function cancelTransition(){
    if(!state.transition)return;
    clearTimeout(state.transition.timer);try{state.transition.animation.cancel()}catch{}
    state.transition=null;whisper.classList.remove('is-active');
  }
  function navigateWithWhisper(hash,target){
    cancelTransition();
    const destination=targetTop(target);
    if(!motionEnabled()||!pageEdge.animate||Math.abs(destination-scrollY)<30){
      window.scrollTo({top:destination,behavior:motionEnabled()?'smooth':'auto'});history.pushState(null,'',hash);return;
    }
    const seq=++transitionSeq,duration=quiet()?180:(mobile()?280:320),travel=mobile()?210:320;
    whisper.classList.add('is-active');
    const animation=pageEdge.animate([
      {transform:'translate3d(0,0,0)',opacity:0,offset:0},
      {transform:`translate3d(${-travel*.68}px,0,0)`,opacity:.82,offset:.42},
      {transform:`translate3d(${-travel*.72}px,0,0)`,opacity:.72,offset:.55},
      {transform:`translate3d(${-travel}px,0,0)`,opacity:0,offset:1}
    ],{duration,easing:'cubic-bezier(.25,.66,.3,1)',fill:'both'});
    let committed=false;
    const commit=()=>{
      if(committed||seq!==transitionSeq)return;committed=true;
      window.scrollTo({top:targetTop(target),behavior:'auto'});history.pushState(null,'',hash);
      if(sectionIds.includes(target.id))setActiveSection(target.id);
    };
    const timer=setTimeout(commit,Math.round(duration*.48));state.transition={animation,timer};
    animation.finished.catch(()=>{}).finally(()=>{
      clearTimeout(timer);if(seq!==transitionSeq)return;commit();whisper.classList.remove('is-active');
      try{animation.cancel()}catch{} if(state.transition?.animation===animation)state.transition=null;
    });
  }
  document.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const link=event.target.closest('a[href^="#"]');
    if(!link||link.classList.contains('skip-link')||link.hasAttribute('data-no-sketch-transition'))return;
    const href=link.getAttribute('href');if(!href||href==='#')return;
    let target;try{target=q(href)}catch{return} if(!target)return;
    event.preventDefault();navigateWithWhisper(href,target);
  });

  /* Gallery-local pencil whisper and artist studies. */
  const gallery=q('#gallery'),grid=q('#galleryGrid');
  const artistWhisper=document.createElement('div');
  artistWhisper.className='ls-artist-whisper';artistWhisper.setAttribute('aria-hidden','true');
  artistWhisper.innerHTML='<svg viewBox="0 0 190 54"><path class="p1" d="M3 34 C35 29 74 39 112 31 C141 25 162 31 187 27"/><path class="p2" d="M5 38 C40 32 70 42 116 34 C148 29 165 33 184 30"/></svg>';
  gallery?.append(artistWhisper);
  const signatureLayer=document.createElement('div');signatureLayer.className='ls-signature-layer';signatureLayer.setAttribute('aria-hidden','true');gallery?.append(signatureLayer);
  let artistSeq=0,signatureSeq=0,signatureSettle=0,signatureRemove=0;

  function anchorSignature(){
    if(!gallery||!signatureLayer)return;
    const author=q('.gallery-author h3',gallery)||q('.gallery-author',gallery)||q('.section-heading',gallery);if(!author)return;
    const gr=gallery.getBoundingClientRect(),ar=author.getBoundingClientRect();
    signatureLayer.style.left=`${Math.max(0,ar.left-gr.left)}px`;signatureLayer.style.top=`${Math.max(0,ar.top-gr.top)}px`;
    signatureLayer.style.width=`${Math.max(170,ar.width)}px`;signatureLayer.style.height=`${Math.max(82,ar.height+54)}px`;
  }
  const harukoStudy=()=>`<div class="ls-pencil-study haruko" style="left:0;top:22px">
    <svg viewBox="0 0 330 72"><path pathLength="1" class="draw main" style="--draw:.78s" d="M3 40 C43 34 72 45 112 38 C154 31 194 43 236 35 C268 29 296 34 326 31"/><path pathLength="1" class="draw ghost" style="--draw:.9s;--delay:.08s" d="M4 43 C46 36 73 47 114 40 C157 33 193 46 239 38 C270 32 299 36 324 34"/><path pathLength="1" class="draw accent" style="--draw:.46s;--delay:.31s" d="M42 24 C54 18 64 19 71 28 M55 17 C56 28 62 35 72 38"/><path pathLength="1" class="draw soft" style="--draw:.38s;--delay:.4s" d="M271 45 l14 -7 M276 49 l15 -8"/></svg></div>`;
  const akikoStudy=()=>`<div class="ls-pencil-study akiko" style="right:0;top:0">
    <svg viewBox="0 0 132 86"><path pathLength="1" class="draw ghost" style="--draw:.64s" d="M25 43 C25 23 41 9 62 10 C82 11 96 25 96 43 C96 63 81 76 61 76 C41 75 25 62 25 43 Z"/><path pathLength="1" class="draw main" style="--draw:.72s;--delay:.05s" d="M29 43 C29 26 43 14 61 14 C79 15 92 27 92 43 C92 59 79 71 61 71 C43 70 29 59 29 43 Z"/><path pathLength="1" class="draw accent" style="--draw:.42s;--delay:.28s" d="M61 5 V21 M61 65 V82 M17 43 H35 M88 43 H106"/><path pathLength="1" class="draw soft" style="--draw:.38s;--delay:.36s" d="M104 19 l7 6 l-7 6 M14 59 l5 5 l-5 5"/></svg></div>`;
  const ravenStudy=()=>`<div class="ls-pencil-study raven" style="left:0;top:18px">
    <svg viewBox="0 0 300 76"><path pathLength="1" class="draw main" style="--draw:.62s" d="M4 51 H67 M82 51 H218 M233 51 H296"/><path pathLength="1" class="draw ghost" style="--draw:.76s;--delay:.05s" d="M8 55 H65 M83 55 H215 M236 55 H292"/><path pathLength="1" class="draw accent" style="--draw:.52s;--delay:.22s" d="M125 52 A25 25 0 0 1 175 52 M134 52 A16 16 0 0 1 166 52 M150 27 V61"/><path pathLength="1" class="draw soft" style="--draw:.36s;--delay:.39s" d="M112 40 l-7 0 l0 7 M188 40 l7 0 l0 7"/></svg></div>`;
  const signatureMarkup=id=>id==='bao-tam'?harukoStudy():id==='akiko-oishi'?akikoStudy():id==='raven-lin'?ravenStudy():'';
  function showArtistSignature(id){
    if(!motionEnabled()||!signatureLayer)return;
    clearTimeout(signatureSettle);clearTimeout(signatureRemove);const seq=++signatureSeq;anchorSignature();
    signatureLayer.replaceChildren();signatureLayer.insertAdjacentHTML('beforeend',signatureMarkup(id));
    const study=q('.ls-pencil-study',signatureLayer);if(!study)return;
    requestAnimationFrame(()=>study.classList.add('is-in'));
    signatureSettle=setTimeout(()=>{if(seq===signatureSeq&&study.isConnected)study.classList.add('is-settled')},quiet()?520:940);
    signatureRemove=setTimeout(()=>{if(seq!==signatureSeq||!study.isConnected)return;study.classList.add('is-out');setTimeout(()=>{if(seq===signatureSeq)signatureLayer.replaceChildren()},680)},quiet()?1500:3300);
  }
  addEventListener('resize',anchorSignature,{passive:true});

  function artistTransition(id,swap){
    if(typeof swap!=='function')return Promise.resolve();
    const seq=++artistSeq;
    if(state.artistTransition){clearTimeout(state.artistTransition.timer);try{state.artistTransition.animation.cancel()}catch{}state.artistTransition=null}
    if(!gallery||!artistWhisper||!motionEnabled()||!artistWhisper.animate){swap();requestAnimationFrame(()=>showArtistSignature(id));return Promise.resolve()}
    const author=q('.gallery-author',gallery)||grid;const gr=gallery.getBoundingClientRect(),ar=author.getBoundingClientRect();
    artistWhisper.style.left=`${Math.max(0,ar.left-gr.left)}px`;artistWhisper.style.top=`${Math.max(0,ar.bottom-gr.top-16)}px`;artistWhisper.style.opacity='1';
    const duration=quiet()?170:(mobile()?250:285);
    const animation=artistWhisper.animate([
      {opacity:0,transform:'translate3d(-12px,2px,0) scaleX(.72)',offset:0},
      {opacity:.58,transform:'translate3d(0,0,0) scaleX(1)',offset:.38},
      {opacity:.48,transform:'translate3d(5px,-1px,0) scaleX(1.03)',offset:.58},
      {opacity:0,transform:'translate3d(16px,-2px,0) scaleX(.94)',offset:1}
    ],{duration,easing:'cubic-bezier(.25,.66,.3,1)',fill:'both'});
    let committed=false;const commit=()=>{if(committed||seq!==artistSeq)return;committed=true;swap();requestAnimationFrame(()=>setTimeout(()=>showArtistSignature(id),quiet()?0:32))};
    const timer=setTimeout(commit,Math.round(duration*.48));state.artistTransition={animation,timer};
    return animation.finished.catch(()=>{}).then(()=>{clearTimeout(timer);if(seq!==artistSeq)return;commit();artistWhisper.style.opacity='0';try{animation.cancel()}catch{}if(state.artistTransition?.animation===animation)state.artistTransition=null});
  }

  /* 4. Pencil traces and route sketch. */
  function hashNumber(text){let h=2166136261;for(let i=0;i<text.length;i++)h=Math.imul(h^text.charCodeAt(i),16777619);return h>>>0}
  function record(type,key){state.journey.push({type,key,order:state.journey.length+1});if(state.unlocked)drawSecret()}
  function stamp(target,key,kind='section'){
    if(!target||target.querySelector(`.ls-pencil-trace[data-key="${CSS.escape(key)}"]`))return;
    state.traceCount+=1;const n=hashNumber(`${kind}:${key}`),mark=document.createElement('span');
    mark.className='ls-pencil-trace';mark.setAttribute('aria-hidden','true');mark.dataset.key=key;mark.dataset.kind=kind;
    mark.style.setProperty('--ls-trace-r',`${(n%7)-3}deg`);mark.style.setProperty('--ls-trace-y',`${kind==='artist'?68+(n%24):24+(n%36)}px`);
    const no=document.createElement('small');no.textContent=String(state.traceCount).padStart(2,'0');mark.append(no);
    if(getComputedStyle(target).position==='static')target.style.position='relative';target.append(mark);
  }
  function visitSection(id){if(!id||state.sections.has(id))return;state.sections.add(id);record('section',id);stamp(q(`#${id}`),id,'section');maybeUnlock()}
  function visitArtist(id){if(!id||state.artists.has(id))return;state.artists.add(id);record('artist',id);stamp(gallery,id,'artist');maybeUnlock()}

  let gallerySigned=false;
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible[0]?.target?.id)setActiveSection(visible[0].target.id);
      entries.forEach(entry=>{if(!entry.isIntersecting||entry.intersectionRatio<.18)return;visitSection(entry.target.id);if(entry.target.id==='gallery'&&!gallerySigned){const id=root.dataset.selectedArtist;if(id){gallerySigned=true;visitArtist(id);showArtistSignature(id)}}});
    },{threshold:[.18,.34,.52],rootMargin:'-8% 0px -14%'});
    sectionIds.map(id=>q(`#${id}`)).filter(Boolean).forEach(el=>observer.observe(el));
  }
  document.addEventListener('club:gallery-ready',event=>{if(gallerySigned)return;const id=event.detail?.artistId||root.dataset.selectedArtist,rect=gallery?.getBoundingClientRect();if(id&&rect&&rect.top<innerHeight*.9&&rect.bottom>innerHeight*.1){gallerySigned=true;visitArtist(id);showArtistSignature(id)}});
  document.addEventListener('club:artist-change',event=>visitArtist(event.detail?.artistId));
  document.addEventListener('club:art-open',event=>{const id=event.detail?.artId;if(!id||state.artworks.has(id))return;state.artworks.add(id);record('artwork',id);maybeUnlock()});

  const footerTools=q('.footer-tools'),trigger=document.createElement('button');trigger.type='button';trigger.className='secret-sketch-trigger';trigger.hidden=true;footerTools?.prepend(trigger);
  const dialog=document.createElement('dialog');dialog.className='secret-sketch-dialog';dialog.setAttribute('aria-labelledby','secretSketchTitle');dialog.setAttribute('aria-describedby','secretSketchBody');
  dialog.innerHTML='<article class="secret-sketch-paper"><button class="secret-sketch-close" type="button">×</button><span class="secret-sketch-kicker"></span><h3 id="secretSketchTitle"></h3><p id="secretSketchBody"></p><div class="secret-sketch-canvas" aria-hidden="true"></div><small class="secret-sketch-summary"></small><small class="secret-sketch-note"></small></article>';
  document.body.append(dialog);const canvas=q('.secret-sketch-canvas',dialog),paper=q('.secret-sketch-paper',dialog);
  function copySecret(){
    const en=root.lang==='en';trigger.textContent=en?'PENCIL ROUTE':'BẢN PHÁC';trigger.setAttribute('aria-label',en?'Open the pencil route from this visit':'Mở bản phác hành trình của lượt ghé này');
    q('.secret-sketch-close',dialog).setAttribute('aria-label',en?'Close':'Đóng');q('.secret-sketch-kicker',dialog).textContent=en?'FIELD NOTES / THIS VISIT':'GHI CHÚ / LƯỢT GHÉ NÀY';
    q('h3',dialog).textContent=en?'A line left behind.':'Một đường nét để lại.';q('p',dialog).textContent=en?'A quiet pencil map follows the order in which you moved through the studio.':'Một bản phác chì nhỏ đi theo đúng thứ tự cậu đã bước qua các góc của studio.';
    q('.secret-sketch-summary',dialog).textContent=en?`${state.sections.size} CORNERS · ${state.artists.size} ARTISTS · ${state.artworks.size} WORKS`:`${state.sections.size} GÓC · ${state.artists.size} HỌA SĨ · ${state.artworks.size} TÁC PHẨM`;
    q('.secret-sketch-note',dialog).textContent=en?'SESSION ONLY · NOTHING IS SENT':'CHỈ TRONG PHIÊN · KHÔNG GỬI DỮ LIỆU';
  }
  function pathFor(points){if(!points.length)return'';if(points.length===1)return`M ${points[0].x} ${points[0].y} l .01 0`;let d=`M ${points[0].x} ${points[0].y}`;for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],mx=(a.x+b.x)/2;d+=` C ${mx.toFixed(1)} ${a.y.toFixed(1)}, ${mx.toFixed(1)} ${b.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`}return d}
  function drawSecret(){
    if(!canvas)return;const events=state.journey.slice(-15);if(!events.length){canvas.replaceChildren();return}
    const points=events.map((event,index)=>{const n=hashNumber(`${event.type}:${event.key}:${index}`),t=events.length===1?.5:index/(events.length-1),wave=Math.sin(index*1.13)*5.6,typeShift=event.type==='artist'?-5:event.type==='artwork'?6:0;return{event,x:8+t*84,y:31+wave+typeShift+((n%3)-1)}});
    const route=pathFor(points),ghostPoints=points.map((p,i)=>({...p,x:p.x+((i%2)?-.5:.55),y:p.y+((i%3)-1)*.55})),ghost=pathFor(ghostPoints);
    const nodes=points.map(({event,x,y},index)=>{const delay=160+index*42,n=hashNumber(`${event.key}:${index}`),rot=(n%8)-4;if(event.type==='artist'){const color=artistColors[event.key]||'#4d4b45';return`<g class="secret-pencil-node artist" style="--node:${color};animation-delay:${delay}ms" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot})"><circle r="2.7"/><circle r="3.25" opacity=".24"/></g>`}if(event.type==='artwork')return`<g class="secret-pencil-node artwork" style="animation-delay:${delay}ms" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><path d="M -2.8 0 H 2.8 M 0 -2.8 V 2.8"/></g>`;return`<g class="secret-pencil-node section" style="animation-delay:${delay}ms" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot})"><circle r="2.2"/><text y=".2">${String(index+1).padStart(2,'0')}</text></g>`}).join('');
    canvas.innerHTML=`<svg viewBox="0 0 100 62" preserveAspectRatio="xMidYMid meet"><path class="secret-pencil-guide" d="${route}"/><path pathLength="1" class="secret-pencil-route-ghost" d="${ghost}"/><path pathLength="1" class="secret-pencil-route" d="${route}"/>${nodes}</svg>`;copySecret();
  }
  function maybeUnlock(){if(state.unlocked)return;const enough=state.sections.size>=5||(state.sections.size>=3&&state.artists.size>=2)||(state.sections.size>=3&&state.artworks.size>=3);if(!enough)return;state.unlocked=true;trigger.hidden=false;trigger.classList.add('is-unlocked');copySecret();drawSecret()}
  trigger.addEventListener('click',()=>{copySecret();drawSecret();if(!dialog.open)dialog.showModal();if(motionEnabled()&&paper?.animate)paper.animate([{opacity:0,transform:'translate3d(0,6px,0) rotate(-.5deg)'},{opacity:1,transform:'translate3d(0,0,0) rotate(-.28deg)'}],{duration:quiet()?130:240,easing:'cubic-bezier(.25,.66,.3,1)',fill:'both'});q('.secret-sketch-close',dialog)?.focus({preventScroll:true})});
  q('.secret-sketch-close',dialog)?.addEventListener('click',()=>dialog.close());dialog.addEventListener('cancel',e=>{e.preventDefault();dialog.close()});dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>trigger.focus({preventScroll:true}));document.addEventListener('club:language',()=>{copySecret();if(state.unlocked)drawSecret()});

  updateThread(true);sectionMark.style.transform='translate3d(0,0,0)';
  const api={version:'7.0.4',artistTransition,showArtistSignature,rebuildInk:()=>updateThread(true),get state(){return{sections:[...state.sections],artists:[...state.artists],artworks:[...state.artworks],journey:[...state.journey],unlocked:state.unlocked,traceCount:state.traceCount,activeSection:state.activeSection}}};
  window.ClubLivingSketchbook=api;document.dispatchEvent(new CustomEvent('club:living-sketchbook-ready'));return api;
}
