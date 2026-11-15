/**
 * ART CLUB / Approved Cover Edition V6
 * Additive presentation, ZZZ mode only. Artworks and logo are always the
 * original files shipped with the CLB. No changes to existing controllers.
 */
(() => {
  'use strict';
  if (window.CLBBangbooV5) return;
  const root = document.documentElement;
  const hero = document.getElementById('home');
  const gallery = document.getElementById('gallery');
  if (!hero || !gallery) return;
  const lang = () => root.lang === 'en' ? 'en' : 'vi';
  const local = value => typeof value === 'string' ? value : (value?.[lang()] || value?.vi || value?.en || '');
  const trans = {
    vi: {eyebrow:'STUDENT ART / ISSUE 005 / BẢO LỘC',
      taxonomy:'ILLUSTRATION<br>DESIGN<br>TRADITIONAL<br>DIGITAL',
      badge:'ART CLUB / BLHS',
      newWorks:'TÁC PHẨM MỚI', archive:'TUYỂN CHỌN TỪ THƯ VIỆN',
      browse:'XEM TOÀN BỘ TRIỂN LÃM', by:'TÁC PHẨM CỦA', status:'ẤN BẢN ART CLUB',
      issue:'CLB NGHỆ THUẬT · BẢO LỘC / ISSUE 005', next:'Xem tác phẩm tiếp theo'},
    en: {eyebrow:'STUDENT ART / ISSUE 005 / BAO LOC',
      taxonomy:'ILLUSTRATION<br>DESIGN<br>TRADITIONAL<br>DIGITAL',
      badge:'ART CLUB / BLHS',
      newWorks:'LATEST WORKS', archive:'CURATED FROM OUR GALLERY',
      browse:'EXPLORE ALL ARTWORKS', by:'ART BY', status:'ART CLUB EDITION',
      issue:'ART CLUB · BAO LOC / ISSUE 005', next:'Next artwork'}
  };
  const t = () => trans[lang()];
  const stamp = document.createElement('span');
  stamp.className = 'zz-v5-kicker'; stamp.setAttribute('aria-hidden', 'true');
  hero.querySelector('.hero-copy')?.prepend(stamp);
  const speech = document.createElement('span');
  speech.className = 'zz-v6-speech';
  speech.innerHTML = 'ART &amp;<br>CREATIVE';
  speech.setAttribute('aria-hidden', 'true');
  hero.querySelector('.zz-manual-index')?.append(speech);
  const taxonomy = document.createElement('div');
  taxonomy.className = 'zz-v5-taxonomy';taxonomy.setAttribute('aria-hidden','true');
  hero.querySelector('.zz-manual-index')?.append(taxonomy);
  const sunburst = document.createElement('i');
  sunburst.className = 'zz-v6-sunburst'; sunburst.innerHTML = '<i></i><i></i><i></i>'; sunburst.setAttribute('aria-hidden','true');
  hero.querySelector('.hero-stage')?.append(sunburst);
  const printMark = document.createElement('i');
  printMark.className = 'zz-v6-print-mark'; printMark.setAttribute('aria-hidden','true');
  hero.querySelector('.hero-stage')?.append(printMark);
  const badge = document.createElement('div');
  badge.className = 'zz-v5-club-id'; badge.setAttribute('aria-hidden', 'true');
  badge.innerHTML = '<span class="zz-v5-id-title"></span><span class="zz-v5-bars"></span><small>BLHS · 2026 / VISUAL ARCHIVE</small>';
  hero.querySelector('.hero-stage')?.append(badge);
  const stageMeta = document.createElement('span');stageMeta.className='zz-v5-stage-meta';stageMeta.setAttribute('aria-hidden','true');
  hero.querySelector('.hero-stage')?.append(stageMeta);

  const selected = [2, 4, 6, 17, 1];
  const artworks = window.CLUB_CONTENT?.artworks || [];
  const artists = window.CLUB_CONTENT?.artists || [];
  const authors = new Map(artists.map(a=>[a.id,a]));
  let rotation=0;
  const ribbon = document.createElement('section');
  ribbon.className = 'zz-v5-works';
  ribbon.id = 'zzLatest';
  ribbon.setAttribute('aria-label', 'Tác phẩm chọn lọc từ CLB Nghệ thuật');
  ribbon.innerHTML = `
    <div class="zz-v5-works-heading">
      <span class="zz-v5-serial">02 / ARCHIVE</span>
      <h2></h2>
      <p></p>
      <a href="#gallery" class="zz-v5-works-all"></a>
    </div>
    <div class="zz-v5-work-list"></div>
    <button class="zz-v5-work-next" type="button" aria-label="Tác phẩm tiếp theo"><span aria-hidden="true">›</span></button>`;
  hero.after(ribbon);
  const artworksList = ribbon.querySelector('.zz-v5-work-list');
  const curated = selected.map(i => artworks[i]).filter(Boolean);
  function renderArtworkList() {
    const fragment = document.createDocumentFragment();
    const ordered = curated.slice(rotation).concat(curated.slice(0, rotation));
    ordered.forEach((art,index) => {
      const tile = document.createElement('a');
      tile.href = '#gallery'; tile.className = 'zz-v5-work-card';
      tile.setAttribute('aria-label', `${local(art.title) || local(art.description)} · ${local(authors.get(art.artistId)?.name || art.author)}`);
      const img = document.createElement('img');
      img.src = art.thumb || art.image;
      img.alt = local(art.title) || local(art.description) || 'Tác phẩm của thành viên';
      img.loading = 'lazy'; img.decoding = 'async';
      const caption = document.createElement('span');
      caption.className = 'zz-v5-work-caption';
      const name = document.createElement('strong'); name.textContent = local(art.title).trim() || local(art.description);
      const credit = document.createElement('small');credit.textContent = local(authors.get(art.artistId)?.name || art.author);
      caption.append(name,credit);tile.append(img,caption);fragment.append(tile);
    });
    artworksList.replaceChildren(fragment);
  }
  function labels() {
    stamp.textContent=t().eyebrow;
    taxonomy.innerHTML=t().taxonomy;
    badge.querySelector('.zz-v5-id-title').textContent=t().badge;
    stageMeta.textContent=t().status;
    ribbon.querySelector('h2').textContent=t().newWorks;
    ribbon.querySelector('p').textContent=t().archive;
    ribbon.querySelector('.zz-v5-works-all').textContent=t().browse + ' ↗';
    ribbon.querySelector('.zz-v5-work-next').setAttribute('aria-label',t().next);
    renderArtworkList();
  }
  ribbon.querySelector('.zz-v5-work-next').addEventListener('click',() => {
    if (!curated.length) return;
    rotation = (rotation + 1) % curated.length;
    renderArtworkList();
  });
  document.addEventListener('club:language',labels);
  labels();
  window.CLBBangbooV5 = { refresh:labels };
})();
