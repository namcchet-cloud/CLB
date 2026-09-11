import { rafThrottle } from "../core/runtime.js?v=4.0.1";
/** Haruko garden: drawing preserved; no frame loop while hidden. */
export function initGarden() {
  'use strict';
  const root=document.documentElement, section=document.getElementById('gallery');
  let layer=null,selected=false,inView=false,raf=0,lastOrigin=null;
  const NS='http://www.w3.org/2000/svg';
  const branchPaths=[
    'M-120 92 C38 20 118 38 212 112 C285 170 336 112 410 76 C528 18 612 112 712 110 C832 108 882 24 1002 48 C1110 70 1154 168 1260 120 C1342 82 1414 24 1548 50',
    'M-92 246 C28 178 126 202 208 266 C286 326 354 276 414 218 C508 126 612 184 686 258 C760 330 842 318 922 246 C1004 174 1088 178 1168 258 C1242 332 1346 286 1530 196',
    'M-74 494 C72 382 142 418 222 494 C304 572 390 526 466 448 C548 362 636 372 720 458 C806 544 894 516 974 432 C1050 350 1144 366 1222 454 C1304 546 1392 514 1520 424',
    'M-62 726 C76 640 150 676 246 752 C338 824 430 794 520 710 C610 626 716 662 792 738 C878 824 968 814 1056 730 C1144 646 1248 678 1326 754 C1390 816 1464 800 1528 758',
    'M56 -76 C128 16 80 110 144 184 C212 262 176 350 102 410 C36 464 44 562 132 624 C218 684 184 780 112 842 C48 896 64 988 166 1050',
    'M1382 -88 C1296 6 1350 98 1290 178 C1226 266 1274 346 1350 406 C1420 462 1394 566 1314 624 C1236 680 1260 790 1340 846 C1414 898 1398 984 1286 1054',
    'M252 64 C296 112 326 146 366 194 M366 194 C398 154 438 132 482 116 M366 194 C410 222 442 260 466 304',
    'M760 104 C724 156 706 210 716 266 M716 266 C668 238 622 226 574 234 M716 266 C766 228 816 214 868 224',
    'M1110 170 C1072 216 1054 264 1064 314 M1064 314 C1018 286 970 274 922 286 M1064 314 C1110 290 1162 288 1206 312',
    'M308 592 C354 544 400 524 452 528 M452 528 C430 576 438 624 468 666 M452 528 C500 548 542 582 566 628',
    'M920 596 C876 548 832 532 784 540 M784 540 C804 586 796 630 766 670 M784 540 C734 562 696 598 674 642'
  ];
  const rootPaths=[
    'M-110 918 C34 814 118 844 202 910 C294 982 378 954 466 884 C550 816 646 828 724 900 C804 974 900 958 984 888 C1072 814 1166 830 1248 906 C1328 978 1426 950 1544 858',
    'M-18 1000 C118 888 170 840 220 752 M220 752 C252 820 312 862 386 878',
    'M1450 1008 C1320 906 1268 850 1218 758 M1218 758 C1184 826 1122 866 1048 884',
    'M444 1012 C452 916 504 854 588 820 M588 820 C622 874 680 914 748 936',
    'M994 1014 C984 918 930 856 846 824 M846 824 C812 878 754 916 686 940'
  ];
  const twigPaths=[
    'M128 182 L86 142 M148 194 L190 150 M212 266 L174 318 M414 218 L454 174 M520 710 L474 756 M792 738 L836 690',
    'M1002 48 L1038 4 M1260 120 L1312 92 M1168 258 L1218 218 M974 432 L1018 386 M1326 754 L1378 714',
    'M102 410 L48 394 M132 624 L82 668 M1290 178 L1240 144 M1350 406 L1404 390 M1314 624 L1362 676'
  ];
  function svgEl(tag,attrs={}){const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);return e;}
  function addLeaf(svg,x,y,s=1,r=0,tone=0){const g=svgEl('g',{class:'living-leaf',transform:`translate(${x} ${y}) rotate(${r}) scale(${s})`});
    const p=svgEl('path',{d:'M0 0 C18 -20 39 -15 48 3 C30 12 12 16 0 0Z',class:`leaf-tone-${tone%3}`});
    const vein=svgEl('path',{d:'M5 1 C18 2 30 2 42 3',class:'leaf-vein'});g.append(p,vein);svg.append(g);}
  function addWisteria(svg,x,y,s=1,flip=1,delay=0){const g=svgEl('g',{class:'living-wisteria',transform:`translate(${x} ${y}) scale(${s*flip} ${s})`});
    g.style.setProperty('--delay',delay+'s');
    const stem=svgEl('path',{d:'M0 -12 C-5 22 7 56 0 98 C-5 125 3 144 1 167',class:'flower-stem'});g.append(stem);
    const bells=[];for(let row=0;row<7;row++){const n=Math.max(1,4-Math.floor(row/2));for(let c=0;c<n;c++)bells.push([row,c,n]);}
    bells.forEach(([row,c,n])=>{const dx=(c-(n-1)/2)*16+(row%2?5:-2),dy=row*20;const pet=svgEl('path',{d:'M0 0 C-8 -6 -15 2 -11 11 C-8 18 -2 18 0 27 C3 18 9 18 12 11 C16 2 8 -6 0 0Z',class:`bell bell-${(row+c)%4}`,transform:`translate(${dx} ${dy}) rotate(${(c-(n-1)/2)*8}) scale(${.74+row*.035})`});g.append(pet);});svg.append(g);}
  function addBlossom(svg,x,y,s=1,r=0,t='rose',delay=0){const g=svgEl('g',{class:`living-blossom ${t}`,transform:`translate(${x} ${y}) rotate(${r}) scale(${s})`});g.style.setProperty('--delay',delay+'s');
    for(let i=0;i<5;i++)g.append(svgEl('ellipse',{cx:0,cy:-11,rx:8,ry:13,transform:`rotate(${i*72})`,class:'petal'}));g.append(svgEl('circle',{cx:0,cy:0,r:4.2,class:'heart'}));svg.append(g);}
  function createLayer(){if(layer||!section)return layer;layer=document.createElement('div');layer.id='livingGarden';layer.setAttribute('aria-hidden','true');
    const svg=svgEl('svg',{viewBox:'0 0 1440 980',preserveAspectRatio:'none',class:'living-garden-svg'});
    const branches=svgEl('g',{class:'living-branches'});
    branchPaths.forEach((d,i)=>{const g=svgEl('g',{class:`branch-stack branch-${i}`});g.append(svgEl('path',{d,pathLength:'1',class:'wood-shadow'}),svgEl('path',{d,pathLength:'1',class:'wood-branch'}),svgEl('path',{d,pathLength:'1',class:'wood-ridge'}));branches.append(g);});
    rootPaths.forEach((d,i)=>{const g=svgEl('g',{class:`root-stack root-${i}`});g.append(svgEl('path',{d,pathLength:'1',class:'root-shadow'}),svgEl('path',{d,pathLength:'1',class:'root-branch'}),svgEl('path',{d,pathLength:'1',class:'root-ridge'}));branches.append(g);});
    twigPaths.forEach((d,i)=>branches.append(svgEl('path',{d,pathLength:'1',class:`wood-twig twig-${i}`})));svg.append(branches);
    [[115,115,1.1,-18,0],[255,92,.9,20,1],[421,127,1.2,-8,2],[590,62,.86,18,0],[758,104,1.18,-16,1],[960,86,.98,20,2],[1150,126,1.16,-22,0],[1310,72,.92,12,1],[103,478,1.08,38,2],[265,342,.82,-32,0],[1185,342,.95,36,1],[1330,482,1.18,-28,2],[280,816,.9,22,1],[515,824,1.02,-14,0],[920,816,.94,17,2],[1224,832,1.1,-18,1]].forEach(v=>addLeaf(svg,...v));
    [[170,120,.78,1,.12],[360,82,1.05,-1,.24],[622,82,.86,1,.33],[848,100,1.04,-1,.42],[1095,98,.92,1,.51],[1290,105,.72,-1,.58],[78,360,.68,1,.66],[1360,330,.77,-1,.75],[280,770,.78,1,.82],[1080,770,.86,-1,.92]].forEach(v=>addWisteria(svg,...v));
    [[246,176,.9,-14,'rose',.2],[468,118,.72,22,'sakura',.32],[745,178,.78,-12,'white',.46],[1022,164,.86,18,'lilac',.56],[1212,228,.72,-18,'rose',.68],[190,596,.76,18,'white',.74],[1265,570,.82,-12,'sakura',.84],[487,742,.7,-18,'lilac',.9],[1030,744,.82,14,'rose',1.02]].forEach(v=>addBlossom(svg,...v));
    layer.append(svg);section.prepend(layer);return layer;}

  function petalBurst(origin) {
    if (root.dataset.motion === 'off' || document.hidden || !layer) return;
    const sec = section.getBoundingClientRect(), r = origin?.getBoundingClientRect();
    const ox = r ? r.left + r.width / 2 - sec.left : sec.width * .5;
    const oy = r ? r.top - sec.top : 90;
    const count = root.dataset.motionChoice === 'quiet' ? 4 : innerWidth < 700 ? 6 : 10;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('i'); p.className = 'garden-petal';
      p.style.left = ox + (Math.random() - .5) * 180 + 'px'; p.style.top = oy + Math.random() * 60 + 'px';
      p.style.setProperty('--x', `${(Math.random() - .5) * 220}px`);
      p.style.setProperty('--y', `${190 + Math.random() * 280}px`);
      p.style.setProperty('--r', `${Math.random() * 320 - 160}deg`);
      layer.append(p);
      const timer = setTimeout(() => p.remove(), 2500);
      p.addEventListener('animationend', () => { clearTimeout(timer); p.remove(); }, { once: true });
    }
  }
  function hide() {
    root.dataset.harukoVisible = 'false'; layer?.classList.remove('is-active');
    layer?.querySelectorAll('.garden-petal').forEach(p => p.remove());
  }
  function sync(replay = false) {
    if (!selected || !inView || document.hidden) { hide(); return; }
    createLayer(); root.dataset.harukoVisible = 'true'; layer.classList.add('is-active');
    if (replay) petalBurst(lastOrigin);
  }
  function activate(origin, replay = false) { selected = true; lastOrigin = origin || lastOrigin; sync(replay); }
  function deactivate() { selected = false; hide(); }
  function replay(origin) { lastOrigin = origin || lastOrigin; if (selected) sync(true); }
  function decorate() {} // Preserved integration hook; no per-card overlay or duplicate branches.
  if (section && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); },
      { rootMargin: '-4% 0px -4% 0px', threshold: 0 }).observe(section);
  } else inView = true;
  document.addEventListener('visibilitychange', () => sync());
  document.addEventListener('club:motion', () => { if (root.dataset.motion === 'off') layer?.style.removeProperty('--gx'); sync(); });
  let px = 0, py = 0, rect = null;
  const move = rafThrottle(() => {
    if (!layer || !selected || !inView || document.hidden || root.dataset.motion === 'off' || root.dataset.motionChoice === 'quiet') return;
    rect ||= section.getBoundingClientRect();
    layer.style.setProperty('--gx', (((px - rect.left) / rect.width - .5) * 8).toFixed(1) + 'px');
    layer.style.setProperty('--gy', (((py - rect.top) / rect.height - .5) * 5).toFixed(1) + 'px');
  });
  section?.addEventListener('pointerenter', () => { rect = section.getBoundingClientRect(); });
  section?.addEventListener('pointermove', e => { if (e.pointerType === 'touch') return; px = e.clientX; py = e.clientY; move(); }, { passive: true });
  section?.addEventListener('pointerleave', () => { layer?.style.setProperty('--gx', '0px'); layer?.style.setProperty('--gy', '0px'); rect = null; });
  addEventListener('resize', () => { rect = null; }, { passive: true });
  window.ClubWisteria = { activate, deactivate, replay, decorate, get active() { return root.dataset.harukoVisible === 'true'; } };
  return window.ClubWisteria;

}
