/* Lyrics are fetched separately from audio. No private Spotify endpoint, token or scraper. */
(() => {
  'use strict';
  const {t, storage} = window.Club;
  const settings = window.CLUB_CONTENT.lyrics || {};
  const $ = id => document.getElementById(id);
  const elements = {
    status:$('lyricsStatus'), badge:$('lyricsBadge'), lines:$('lyricsLines'),
    viewport:$('lyricsViewport'), empty:$('lyricsEmpty'), candidates:$('lyricsCandidates'),
    source:$('lyricsSource'), title:$('trackTitle'), artist:$('trackArtist'), link:$('currentTrackLink')
  };
  let track=null, rows=[], rawRecord=null, source='', statusKey='lyricsWaiting', badgeKey='waiting';
  let abort=null, requestNumber=0, autoAttempted='', blockUntil=0, lastRequest=0, activeLine=-1, inferred=false;
  let playback={position:0,duration:0,isPaused:true}, sourceDuration=0;
  const cache=new Map();
  let saved={};
  try { const parsed=JSON.parse(storage.get('artclub-lyrics-v2','{}')); if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))saved=parsed; } catch {}
  function saveMatch(uri,value) {
    delete saved[uri]; saved[uri]=value;
    const entries=Object.entries(saved).slice(-12);
    saved=Object.fromEntries(entries);
    storage.set('artclub-lyrics-v2',JSON.stringify(saved));
  }
  function status(key,badge='waiting') {
    statusKey=key;badgeKey=badge;
    elements.status.textContent=t(key);elements.badge.textContent=t(badge);
  }
  function normal(value) {
    return String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  }
  function parseLrc(text) {
    const offset = Number((text.match(/\[offset:\s*([+-]?\d+)\]/i)||[])[1]||0);
    const out=[];
    for(const line of text.split(/\r?\n/)) {
      const stamps=[...line.matchAll(/\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g)];
      const content=line.replace(/\[[^\]]*\]/g,'').trim().replace(/<\d{1,3}:\d{2}(?:\.\d+)?>/g,'');
      for(const m of stamps) {
        if(Number(m[2])>=60)continue;
        const frac=m[3] ? Number(`0.${m[3]}`)*1000 : 0;
        out.push({time:Math.max(0,Number(m[1])*60000+Number(m[2])*1000+frac-offset),text:content||'♪'});
      }
    }
    return out.sort((a,b)=>a.time-b.time);
  }
  function isCurrent(uri,number){return track?.uri===uri&&number===requestNumber;}
  async function fetchData(url,signal,asText=false) {
    if(Date.now()<blockUntil)throw new Error('rate');
    const response=await fetch(url,{signal,credentials:'omit'});
    if(response.status===429) {
      const value=response.headers.get('Retry-After')||'60';
      const numeric=Number(value);
      blockUntil=Number.isFinite(numeric) ? Date.now()+Math.max(1,numeric)*1000 : Math.max(Date.now()+1000,Date.parse(value)||Date.now()+60000);
      throw new Error('rate');
    }
    if(!response.ok)throw new Error(response.status===404?'missing':'network');
    return asText ? response.text() : response.json();
  }
  function renderTrack() {
    elements.title.textContent=track?.title||t(track?'trackFallback':'trackWaiting');
    elements.artist.textContent=rawRecord?.artistName ? `LRCLIB · ${rawRecord.artistName}` : track?.artist||t('trackHint');
    elements.link.hidden=!track;
    if(track)elements.link.href=`https://open.spotify.com/track/${track.uri.split(':')[2]}`;
  }
  function resetDisplay() {
    rows=[];rawRecord=null;source='';sourceDuration=0;activeLine=-1;inferred=false;
    elements.lines.replaceChildren();elements.lines.hidden=true;elements.lines.classList.remove('is-plain');
    elements.empty.hidden=false;elements.candidates.hidden=true;elements.candidates.replaceChildren();elements.source.replaceChildren();
  }
  function reset() {
    abort?.abort();requestNumber++;track=null;autoAttempted='';playback={position:0,duration:0,isPaused:true};
    resetDisplay();renderTrack();status('lyricsWaiting');
    $('lyricsQuery').value='';$('lyricsArtistInput').value='';
  }
  function showSource() {
    elements.source.replaceChildren();
    if(!source)return;
    if(source==='lrclib') {
      const a=document.createElement('a');
      a.href='https://lrclib.net/';a.target='_blank';a.rel='noopener noreferrer';a.textContent=t('lyricsProvider');
      elements.source.append(a);
    } else elements.source.textContent=t(source==='library'?'lyricsLibrary':'lyricsLocal');
  }
  function syncAllowed() {
    if(!rows.length||!Number.isFinite(rows[0].time))return false;
    if(playback.duration>0 && sourceDuration>0 && Math.abs(sourceDuration-playback.duration)>6000)return false;
    if(playback.duration>0 && playback.duration<=33000 && rows.at(-1).time>playback.duration+10000)return false;
    return true;
  }
  function updateStatusForLyrics() {
    if(rawRecord?.instrumental)status('lyricsInstrumental','instrumental');
    else if(rows.length&&Number.isFinite(rows[0].time)) {
      if(!syncAllowed())status('lyricsPreview','plain');
      else status(inferred?'lyricsInferred':'lyricsSynced','synced');
    } else if(rows.length) status('lyricsPlain','plain');
  }
  function renderRows() {
    elements.lines.replaceChildren();activeLine=-1;
    elements.lines.hidden=!rows.length;elements.empty.hidden=!!rows.length;
    const fragment=document.createDocumentFragment();
    rows.forEach(row=>{const li=document.createElement('li');li.className='lyric-line';li.textContent=row.text;fragment.append(li);});
    elements.lines.append(fragment);
    elements.lines.classList.toggle('is-plain',!syncAllowed());
    elements.viewport.scrollTop=0;
    updateStatusForLyrics();showSource();renderTrack();syncLines();
  }
  function useRecord(record,remember=false,guess=false) {
    if(!track||!record)return;
    inferred=guess;rawRecord=record;source='lrclib';sourceDuration=Number(record.duration||0)*1000;
    rows=record.syncedLyrics ? parseLrc(String(record.syncedLyrics).slice(0,200000)) : [];
    if(!rows.length&&record.plainLyrics)rows=String(record.plainLyrics).slice(0,200000).split(/\r?\n/).map(text=>({time:NaN,text:text||'♪'}));
    if(remember&&Number.isFinite(Number(record.id)))saveMatch(track.uri,{type:'lrclib',id:Number(record.id)});
    elements.candidates.hidden=true;
    if(!rows.length&&!record.instrumental){status('lyricsUnavailable');return;}
    renderRows();
  }
  function useLrc(text,type='local') {
    const parsed=parseLrc(text);
    if(!parsed.length)throw new Error('lrc');
    rawRecord=null;source=type;sourceDuration=0;inferred=false;rows=parsed;
    elements.candidates.hidden=true;renderRows();
  }
  function showCandidates(matches,uri,number) {
    elements.candidates.replaceChildren();
    const unique=new Map();
    matches.forEach(item=>{
      if(!item||typeof item.trackName!=='string')return;
      const key=`${normal(item.trackName)}|${normal(item.artistName)}|${Math.round(Number(item.duration||0))}`;
      if(!unique.has(key)||(!unique.get(key).syncedLyrics&&item.syncedLyrics))unique.set(key,item);
    });
    const items=[...unique.values()].slice(0,8);
    if(!items.length){status('lyricsUnavailable');return;}
    for(const record of items) {
      const button=document.createElement('button');button.type='button';button.className='lyrics-candidate';
      const title=document.createElement('strong');title.textContent=`${record.trackName} — ${record.artistName||''}`;
      const detail=document.createElement('small');
      const duration=Math.floor(Number(record.duration||0));
      detail.textContent=`${record.albumName||''} · ${Math.floor(duration/60)}:${String(duration%60).padStart(2,'0')} · `;
      const kind=document.createElement('span');
      kind.dataset.lyricKind=record.syncedLyrics?'synced':'plain';kind.textContent=t(kind.dataset.lyricKind);
      detail.append(kind);
      button.append(title,detail);
      button.addEventListener('click',()=>{if(isCurrent(uri,number))useRecord(record,true);});
      elements.candidates.append(button);
    }
    elements.candidates.hidden=false;status('lyricsChoose','chooseLyrics');
  }
  async function findLyrics(title,artist='',manual=false) {
    if(!track){status('lyricsNeedTrack');return;}
    if(!settings.onlineSearch){status('lyricsDisabled');return;}
    if(!title?.trim()){status('lyricsNoMetadata');return;}
    if(Date.now()<blockUntil){status('lyricsRateLimit');return;}
    abort?.abort();abort=new AbortController();
    const controller=abort, number=++requestNumber, uri=track.uri;
    const timer=setTimeout(()=>controller.abort(),10000);
    status('lyricsLoading','searching');
    try {
      // One request at a time; no playlist-wide scraping or background request loop.
      const wait=Math.max(0,500-(Date.now()-lastRequest));
      if(wait)await new Promise(resolve=>setTimeout(resolve,wait));
      if(!isCurrent(uri,number))return;
      const cacheKey=normal(title)+'|'+normal(artist);
      let matches=cache.get(cacheKey);
      if(!matches) {
        const params=new URLSearchParams({track_name:title.trim()});
        if(artist.trim())params.set('artist_name',artist.trim());
        lastRequest=Date.now();
        matches=await fetchData(`https://lrclib.net/api/search?${params}`,controller.signal);
        if(!Array.isArray(matches))throw new Error('network');
        cache.set(cacheKey,matches);
        if(cache.size>24)cache.delete(cache.keys().next().value);
      }
      if(!isCurrent(uri,number))return;
      const seconds=playback.duration/1000 || track.duration/1000 || 0;
      const exact=matches.filter(r=>normal(r.trackName)===normal(title)&&seconds>35&&
        Math.abs(Number(r.duration)-seconds)<=2.5 && (!artist||normal(r.artistName)===normal(artist)));
      const artistGroups=new Set(exact.map(r=>normal(r.artistName)));
      if(!manual&&exact.length&&artistGroups.size===1) {
        exact.sort((a,b)=>Number(!!b.syncedLyrics)-Number(!!a.syncedLyrics)||Math.abs(a.duration-seconds)-Math.abs(b.duration-seconds));
        useRecord(exact[0],false,!artist);
      } else showCandidates(matches,uri,number);
    } catch(error) {
      if(!isCurrent(uri,number))return;
      status(error.message==='rate'?'lyricsRateLimit':error.message==='missing'?'lyricsUnavailable':'lyricsNetwork');
    } finally {clearTimeout(timer);}
  }
  async function loadSavedOrLibrary() {
    if(!track)return false;
    const uri=track.uri, record=saved[uri], entry=settings.tracks?.[uri];
    if(!record&&!entry?.lrc&&!entry?.lrclibId)return false;
    abort?.abort();abort=new AbortController();
    const controller=abort,number=++requestNumber,timer=setTimeout(()=>controller.abort(),10000);
    try {
      status('lyricsLoading','searching');
      if(record?.type==='lrc'&&typeof record.text==='string') {useLrc(record.text);return true;}
      const id=record?.type==='lrclib'?record.id:entry?.lrclibId;
      if(id!==undefined) {
        if(!Number.isFinite(Number(id)))return false;
        const result=await fetchData(`https://lrclib.net/api/get/${Number(id)}`,controller.signal);
        if(isCurrent(uri,number))useRecord(result);
        return true;
      }
      if(entry?.lrc) {
        const url=new URL(entry.lrc,location.href);
        if(url.origin!==location.origin)throw new Error('network');
        const text=await fetchData(url.href,controller.signal,true);
        if(text.length>200000)throw new Error('lrc');
        if(isCurrent(uri,number))useLrc(text,'library');
        return true;
      }
    } catch(error) {
      if(isCurrent(uri,number))status(error.message==='rate'?'lyricsRateLimit':'lyricsNetwork');
      return true; // Do not hammer the service by falling through to another request.
    } finally {clearTimeout(timer);}
    return false;
  }
  async function setTrack(next) {
    if(!next||!/^spotify:track:[A-Za-z0-9]{22}$/.test(next.uri||'')){reset();return;}
    const changed=track?.uri!==next.uri;
    if(changed) {
      abort?.abort();requestNumber++;resetDisplay();autoAttempted='';
      playback={position:0,duration:Number(next.duration)||0,isPaused:true};
    }
    const mapping=settings.tracks?.[next.uri]||{};
    track={...(changed?{}:track),...next,title:next.title||mapping.title||(!changed?track?.title:'')||'',artist:next.artist||mapping.artist||''};
    renderTrack();
    if(track.title)$('lyricsQuery').value=track.title;
    if(track.artist)$('lyricsArtistInput').value=track.artist;
    if(changed&&(saved[track.uri]||mapping.lrc||mapping.lrclibId!==undefined)) {
      autoAttempted=track.uri;
      await loadSavedOrLibrary();return;
    }
    if(rows.length)return;
    if(track.title&&autoAttempted!==track.uri) {
      autoAttempted=track.uri;
      await findLyrics(track.title,track.artist);
    } else if(!track.title)status('lyricsNoMetadata');
  }
  function syncLines() {
    const valid=syncAllowed();
    elements.lines.classList.toggle('is-plain',!valid);
    if(!valid){if(activeLine>=0)elements.lines.children[activeLine]?.classList.remove('is-current');activeLine=-1;return;}
    let low=0,high=rows.length-1,index=-1;
    while(low<=high){const mid=(low+high)>>1;if(rows[mid].time<=playback.position){index=mid;low=mid+1;}else high=mid-1;}
    if(index===activeLine)return;
    if(activeLine>=0)elements.lines.children[activeLine]?.classList.remove('is-current');
    activeLine=index;
    const line=elements.lines.children[index];
    if(line) {
      line.classList.add('is-current');
      const top=line.offsetTop-elements.viewport.clientHeight/2+line.offsetHeight/2;
      elements.viewport.scrollTo({top:Math.max(0,top),behavior:window.ClubMotion?.enabled?'smooth':'auto'});
    }
  }
  function update(state) {
    const previousDuration=playback.duration;
    playback={...playback,...state};
    if(rows.length&&previousDuration!==playback.duration)updateStatusForLyrics();
    syncLines();
  }
  $('lyricsSearch').addEventListener('submit',event=>{
    event.preventDefault();
    findLyrics($('lyricsQuery').value,$('lyricsArtistInput').value,true);
  });
  $('lrcFile').addEventListener('change',async event=>{
    const file=event.target.files?.[0];event.target.value='';
    if(!file)return;
    if(!track){status('lyricsNeedTrack');return;}
    if(file.size>200000||!/\.lrc$/i.test(file.name)){status('lyricsBadFile');return;}
    const uri=track.uri;
    try {
      const text=await file.text();if(track?.uri!==uri)return;
      abort?.abort();requestNumber++;
      useLrc(text);
      saveMatch(uri,{type:'lrc',text});
    } catch {status('lyricsBadFile');}
  });
  $('forgetLyrics').addEventListener('click',()=>{
    if(!track){status('lyricsNeedTrack');return;}
    delete saved[track.uri];storage.set('artclub-lyrics-v2',JSON.stringify(saved));
    abort?.abort();requestNumber++;resetDisplay();renderTrack();status('lyricsUnavailable');
  });
  document.addEventListener('club:language',()=>{
    renderTrack();status(statusKey,badgeKey);showSource();
    elements.candidates.querySelectorAll('[data-lyric-kind]').forEach(node=>{
      node.textContent=t(node.dataset.lyricKind);
    });
  });
  window.ClubLyrics={setTrack,update,reset,parseLrc};
  reset();
})();
