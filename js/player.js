/* Official Spotify iFrame API. Animation is driven by playback_update, never by a click alone. */
(() => {
  'use strict';
  const {t,local,storage}=window.Club;
  const records=window.CLUB_CONTENT.records;
  const $=id=>document.getElementById(id);
  const room=$('playlist'),deck=$('turntable'),vinyl=$('vinyl'),options=$('recordOptions');
  let selected=records.find(r=>r.id===storage.get('artclub-disc'))||records[0];
  let api=null,apiPromise=null,controller=null,bootPromise=null,generation=0,intent=0,ready=false;
  let statusKey='playerIdle',transport='idle',trackUri='',trackMetadata=null,metadataAbort=null;
  let position=0,duration=0,isPaused=true,isBuffering=false,lastUpdate=0,lastPosition=0;
  let pendingTimer=0,artTimer=0;
  const metadataCache=new Map();

  function announce(key) {
    statusKey=key;$('playerStatus').textContent=t(key);
  }
  function renderTransport() {
    const actuallyPlaying=!isPaused&&!isBuffering&&duration>0;
    deck.classList.toggle('is-playing',actuallyPlaying);
    deck.dataset.state=transport;
    $('playButton').setAttribute('aria-pressed',String(!isPaused));
    $('playButton').setAttribute('aria-busy',String(['loading','starting','buffering'].includes(transport)));
    $('playIcon').textContent=isPaused?'▶':'Ⅱ';
    $('playText').textContent=t(isPaused?'play':'pause');
    $('deckSignal').textContent=t(actuallyPlaying?'playing':transport==='paused'?'paused':'standby');
    $('playerStatus').textContent=t(statusKey);
  }
  function clock(ms) {
    const seconds=Math.floor(Math.max(0,ms)/1000);
    return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
  }
  function renderProgress() {
    $('currentTime').textContent=clock(position);$('totalTime').textContent=clock(duration);
    $('trackProgress').max=Math.max(1,duration);$('trackProgress').value=Math.min(position,duration);
  }
  function resetPlayback() {
    isPaused=true;isBuffering=false;position=0;lastPosition=0;duration=0;lastUpdate=0;
    trackUri='';trackMetadata=null;metadataAbort?.abort();
    clearTimeout(pendingTimer);
    window.ClubLyrics.reset();
    renderProgress();renderTransport();
  }
  function drawSelection(animate=false,sourceButton=null) {
    if(animate)window.ClubMotion?.flyRecord(sourceButton?.querySelector('.mini-record'),$('recordCarrier'));
    room.dataset.theme=selected.theme;vinyl.dataset.theme=selected.theme;
    if(animate) { vinyl.style.animationName='none';void vinyl.offsetWidth;vinyl.style.animationName=''; }
    $('recordArtwork').src=selected.image;
    $('selectedRecordName').textContent=local(selected.name);
    $('recordSpotifyLink').href=selected.spotifyUrl;
    options.querySelectorAll('.record-option').forEach(button=>{
      const record=records.find(r=>r.id===button.dataset.record);
      const active=record.id===selected.id;
      button.setAttribute('aria-pressed',String(active));
      button.querySelector('strong').textContent=local(record.name);
      button.querySelector('small').textContent=local(record.caption);
      button.querySelector('.record-selection').textContent=t(active?'selected':'choose');
      button.setAttribute('aria-label',`${local(record.name)} — ${t(active?'selected':'choose')}`);
    });
    if(animate&&window.ClubMotion?.enabled) {
      const carrier=$('recordCarrier');
      carrier.classList.remove('is-arriving');void carrier.offsetWidth;carrier.classList.add('is-arriving');
      clearTimeout(artTimer);artTimer=setTimeout(()=>carrier.classList.remove('is-arriving'),900);
    }
  }
  function renderOptions() {
    options.replaceChildren();
    records.forEach(record=>{
      const button=document.createElement('button');
      button.className='record-option';button.type='button';button.dataset.record=record.id;
      const mini=document.createElement('span');mini.className='mini-record';mini.setAttribute('aria-hidden','true');
      const image=document.createElement('img');image.src=record.image;image.alt='';image.width=96;image.height=96;mini.append(image);
      const title=document.createElement('strong'),subtitle=document.createElement('small'),state=document.createElement('span');state.className='record-selection';
      button.append(mini,title,subtitle,state);
      button.addEventListener('click',()=>selectRecord(record,button));
      options.append(button);
    });
    drawSelection();
  }
  function loadAPI() {
    if(api)return Promise.resolve(api);
    if(apiPromise)return apiPromise;
    apiPromise=new Promise((resolve,reject)=>{
      let settled=false;
      const timeout=setTimeout(()=>{if(!settled){settled=true;reject(new Error('api-timeout'));}},14000);
      window.onSpotifyIframeApiReady=instance=>{
        api=instance;clearTimeout(timeout);
        if(!settled){settled=true;resolve(instance);}
      };
      $('spotifyApiScript')?.remove();
      const script=document.createElement('script');script.id='spotifyApiScript';
      script.src='https://open.spotify.com/embed/iframe-api/v1';script.async=true;
      script.onerror=()=>{clearTimeout(timeout);if(!settled){settled=true;reject(new Error('api-network'));}};
      document.body.append(script);
    }).catch(error=>{apiPromise=null;throw error;});
    return apiPromise;
  }
  function directEmbed() {
    const iframe=document.createElement('iframe');
    iframe.src=`https://open.spotify.com/embed/playlist/${selected.uri.split(':')[2]}?theme=0`;
    iframe.title=`Spotify — ${local(selected.name)}`;
    iframe.width='100%';iframe.height='352';
    iframe.allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    $('spotifyMount').replaceChildren(iframe);
  }
  function destroyController() {
    try{controller?.pause();}catch{/* The previous iframe may already have gone away. */}
    try{controller?.destroy();}catch{/* Cleanup must still run if pause failed. */}
    controller=null;ready=false;
  }
  async function updateTrack(uri) {
    if(!/^spotify:track:[A-Za-z0-9]{22}$/.test(uri))return;
    if(uri===trackUri)return;
    trackUri=uri;metadataAbort?.abort();
    const gen=generation;
    const mapping=window.CLUB_CONTENT.lyrics?.tracks?.[uri]||{};
    trackMetadata={uri,title:mapping.title||'',artist:mapping.artist||'',duration};
    window.ClubLyrics.setTrack(trackMetadata);
    if(metadataCache.has(uri)) {
      trackMetadata={...trackMetadata,...metadataCache.get(uri)};
      window.ClubLyrics.setTrack(trackMetadata);return;
    }
    metadataAbort=new AbortController();
    const request=metadataAbort,timeout=setTimeout(()=>request.abort(),9000);
    try{
      const url=`https://open.spotify.com/oembed?url=${encodeURIComponent('https://open.spotify.com/track/'+uri.split(':')[2])}`;
      const response=await fetch(url,{signal:request.signal,credentials:'omit'});
      if(!response.ok)throw new Error('metadata');
      const data=await response.json();
      if(gen!==generation||trackUri!==uri)return;
      if(typeof data.title==='string'&&data.title.trim()&&data.title!=='Spotify') {
        // oEmbed exposes the title, not guaranteed artist metadata.
        const metadata={title:data.title.slice(0,300)};
        metadataCache.set(uri,metadata);
        if(metadataCache.size>30)metadataCache.delete(metadataCache.keys().next().value);
        trackMetadata={...trackMetadata,...metadata};
        window.ClubLyrics.setTrack(trackMetadata);
      }
    }catch{/* Lyrics UI exposes manual title/artist search when oEmbed is blocked. */}
    finally{clearTimeout(timeout);}
  }
  function onPlayback(event,gen) {
    if(gen!==generation)return;
    const data=event?.data||{};
    if(typeof data.isPaused==='boolean')isPaused=data.isPaused;
    isBuffering=data.isBuffering===true;
    if(Number.isFinite(Number(data.duration)))duration=Math.max(0,Number(data.duration));
    if(Number.isFinite(Number(data.position)))position=Math.max(0,Math.min(Number(data.position),duration||Number(data.position)));
    lastPosition=position;lastUpdate=performance.now();
    if(typeof data.playingURI==='string')updateTrack(data.playingURI);
    const newState=isBuffering?'buffering':isPaused?'paused':'playing';
    transport=newState;
    announce(isBuffering?'playerBuffering':isPaused?'playerPaused':'playerPlaying');
    if(!isPaused||isPaused&&$('playButton').getAttribute('aria-pressed')==='true')clearTimeout(pendingTimer);
    window.ClubLyrics.update({position,duration,isPaused,isBuffering});
    renderProgress();renderTransport();
  }
  function boot() {
    if(ready&&controller)return Promise.resolve(controller);
    if(bootPromise)return bootPromise;
    const gen=generation,record=selected;
    transport='loading';announce('playerLoading');renderTransport();
    const task=loadAPI().then(spotifyAPI=>new Promise((resolve,reject)=>{
      if(gen!==generation){resolve(null);return;}
      const target=document.createElement('div');target.id=`spotify-target-${gen}`;
      $('spotifyMount').replaceChildren(target);
      let active=true;
      const timeout=setTimeout(()=>{active=false;reject(new Error('embed-timeout'));},16000);
      try {
        spotifyAPI.createController(target,{width:'100%',height:352,url:record.spotifyUrl+'?theme=0'},ctrl=>{
          if(!active||gen!==generation){clearTimeout(timeout);try{ctrl.destroy();}catch{}resolve(null);return;}
          controller=ctrl;
          ctrl.addListener('ready',()=>{
            clearTimeout(timeout);
            if(!active||gen!==generation){try{ctrl.destroy();}catch{}resolve(null);return;}
            ready=true;transport='ready';announce('playerReady');renderTransport();
            const frame=$('spotifyMount').querySelector('iframe');
            if(frame)frame.title=`Spotify — ${local(record.name)}`;
            resolve(ctrl);
          });
          ctrl.addListener('playback_update',event=>{if(active)onPlayback(event,gen);});
          ctrl.addListener('playback_started',event=>{
            if(!active||gen!==generation)return;
            // Wait for playback_update before enabling the spinning animation.
            if(event?.data?.playingURI)updateTrack(event.data.playingURI);
          });
        });
      } catch(error){active=false;clearTimeout(timeout);reject(error);}
    })).catch(()=>{
      if(gen===generation) {
        destroyController();transport='error';isPaused=true;announce('playerError');renderTransport();directEmbed();
      }
      return null;
    }).finally(()=>{if(gen===generation)bootPromise=null;});
    bootPromise=task;
    return task;
  }
  function requestPlayback(ctrl) {
    if(!ctrl||!ready)return;
    const wasPaused=isPaused;
    if(wasPaused){transport='starting';announce('playerStarting');renderTransport();}
    try {
      // Called synchronously inside the user gesture whenever the iframe is ready.
      if(typeof ctrl.togglePlay==='function')ctrl.togglePlay();
      else if(wasPaused)ctrl.play();
      else ctrl.pause();
      clearTimeout(pendingTimer);
      if(wasPaused)pendingTimer=setTimeout(()=>{
        if(isPaused){transport='unlock';announce('playerUnlock');renderTransport();}
      },6500);
    } catch {
      transport='unlock';announce('playerUnlock');renderTransport();
    }
  }
  function togglePlayback(event) {
    window.ClubMotion?.burst(event.currentTarget,'',8);
    const currentIntent=++intent,gen=generation;
    if(ready&&controller){requestPlayback(controller);return;}
    boot().then(ctrl=>{
      if(ctrl&&currentIntent===intent&&gen===generation)requestPlayback(ctrl);
    });
  }
  function selectRecord(record,button) {
    if(record.id===selected.id){window.ClubMotion?.burst(button,'',6);return;}
    generation++;intent++;bootPromise=null;
    destroyController();
    selected=record;storage.set('artclub-disc',record.id);
    transport='idle';announce('playerIdle');resetPlayback();
    drawSelection(true,button);
    boot(); // Selection loads the playlist, but does not auto-play it.
  }
  document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',togglePlayback));
  document.addEventListener('club:language',()=>{
    drawSelection();renderTransport();
    const frame=$('spotifyMount').querySelector('iframe');
    if(frame)frame.title=`Spotify — ${local(selected.name)}`;
  });
  renderOptions();renderTransport();renderProgress();
  const preload=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){preload.disconnect();boot();}
  },{rootMargin:'650px'});
  preload.observe(room);
  // Interpolate at most two seconds beyond an actual update; never invent ongoing playback.
  setInterval(()=>{
    if(document.hidden||isPaused||isBuffering||!lastUpdate)return;
    const elapsed=Math.min(2000,performance.now()-lastUpdate);
    position=Math.min(duration,lastPosition+elapsed);
    renderProgress();window.ClubLyrics.update({position,duration,isPaused,isBuffering});
  },250);
})();
