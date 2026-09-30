/** Lightweight original comic decoration system. No bitmap assets. */
const DECOR = [
  ['home','burst','ZAP!','a'], ['home','spark','','b'], ['home','speed','','c'],
  ['about','bolt','','a'], ['about','scribble','','b'],
  ['gallery','burst','ART!','a'], ['gallery','spark','','b'], ['gallery','arrow','','c'],
  ['activities','flame','','a'], ['activities','burst','WOW!','b'],
  ['playlist','note','','a'], ['playlist','spark','','b'],
  ['contact','bolt','','b']
];

function make(type, text, slot) {
  const el = document.createElement('span');
  el.className = `cd-icon cd-${type} cd-slot-${slot}`;
  el.setAttribute('aria-hidden','true');
  if (text) el.dataset.word = text;
  if (type === 'spark') el.innerHTML = '<i></i><b></b>';
  if (type === 'scribble') el.innerHTML = '<i></i><i></i><i></i>';
  if (type === 'note') el.textContent = '♪';
  return el;
}

export function initComicDecor() {
  const coarse = matchMedia('(pointer:coarse)').matches;
  const grouped = new Map();
  DECOR.forEach(([id,type,text,slot]) => {
    if (coarse && slot === 'c') return;
    const section = document.getElementById(id);
    if (!section) return;
    let layer = grouped.get(section);
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'comic-decor-layer';
      layer.setAttribute('aria-hidden','true');
      section.prepend(layer);
      grouped.set(section,layer);
    }
    layer.append(make(type,text,slot));
  });
  return { count: document.querySelectorAll('.cd-icon').length };
}
