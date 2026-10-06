/** One visible embed per selection; each session owns its callbacks and timers. */
const API_URL = 'https://open.spotify.com/embed/iframe-api/v1';
let apiJob;
const apiListeners = new Set();

function getAPI() {
  if (window.SpotifyIframeApi?.createController) return Promise.resolve(window.SpotifyIframeApi);
  if (apiJob) return apiJob;
  apiJob = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = API_URL;
    script.async = true;
    let done = false;
    const finish = (api, error) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      if (error) { script.remove(); reject(error); }
      else resolve(api);
    };
    const timer = setTimeout(() => finish(null, new Error('Spotify API timeout')), 6000);
    window.onSpotifyIframeApiReady = api => {
      if (!api?.createController) return;
      // A slow script may finish after its timeout. Keep it usable for the
      // current selection; never strand the page in an unsynchronised iframe.
      window.SpotifyIframeApi = api;
      finish(api);
      apiListeners.forEach(listener => listener());
    };
    script.onerror = () => finish(null, new Error('Spotify API unavailable'));
    document.head.append(script);
  }).catch(error => { apiJob = null; throw error; });
  return apiJob;
}

function source(record) {
  const uri = /^spotify:(playlist|album|track|episode|show|artist):([a-zA-Z0-9]+)$/.exec(record.uri || '');
  if (uri) return { uri: uri[0], embed: 'https://open.spotify.com/embed/' + uri[1] + '/' + uri[2] };
  const url = new URL(record.spotifyUrl);
  if (url.hostname !== 'open.spotify.com') throw new Error('Invalid Spotify source');
  const path = url.pathname.replace(/^\/intl-[^/]+/, '');
  const match = /^\/(playlist|album|track|episode|show|artist)\/([a-zA-Z0-9]+)\/?$/.exec(path);
  if (!match) throw new Error('Invalid Spotify source');
  return { uri: 'spotify:' + match[1] + ':' + match[2], embed: 'https://open.spotify.com/embed/' + match[1] + '/' + match[2] };
}

export function createSpotify(mount, onPlayback, onStatus) {
  let session = null;
  const active = s => session === s && !s.closed;
  function publish(s, mode) {
    if (!active(s)) return;
    s.mode = mode;
    mount.dataset.spotifyMode = mode;
    mount.setAttribute('aria-busy', String(mode === 'connecting'));
    onStatus?.(mode);
  }
  function clearIntent(s) {
    clearTimeout(s.commandTimer);
    s.intent = null;
  }
  function releaseController(s) {
    const controller = s.controller;
    s.controller = null;
    try { controller?.pause?.(); } catch {}
    try { controller?.destroy?.(); } catch {}
  }
  function destroy() {
    const s = session;
    session = null;
    if (s) {
      s.closed = true;
      clearTimeout(s.readyTimer);
      clearIntent(s);
      s.observer?.disconnect();
      apiListeners.delete(s.recover);
      releaseController(s);
    }
    mount.replaceChildren();
    mount.hidden = true;
    mount.removeAttribute('aria-busy');
    mount.removeAttribute('data-spotify-mode');
    mount.classList.remove('is-needs-gesture', 'is-native-embed');
  }
  function receive(s, c, data) {
    if (!active(s) || s.controller !== c) return;
    s.ready = true;
    clearTimeout(s.readyTimer);
    const changed = data.playingURI && data.playingURI !== s.snapshot.playingURI;
    if (changed || data.type === 'started') s.snapshot = { position: 0, duration: 0, isBuffering: false };
    const playing = data.type === 'started' ? true : typeof data.isPaused === 'boolean' ? !data.isPaused : s.playing;
    s.playing = playing;
    s.snapshot = { ...s.snapshot, ...data, isPaused: !playing };
    if (s.intent === playing) clearIntent(s);
    if (playing) mount.classList.remove('is-needs-gesture');
    publish(s, s.intent !== null ? (s.intent ? 'starting' : 'pausing') : s.snapshot.isBuffering && playing ? 'buffering' : playing ? 'playing' : 'ready');
    onPlayback?.({ ...s.snapshot }, s.record.id);
  }
  function ensure(record) {
    if (session?.record.id === record.id) return Promise.resolve(session.controller);
    destroy();
    const s = { record, mode: 'connecting', ready: false, playing: false, intent: null, controller: null, closed: false,
      snapshot: { isPaused: true, isBuffering: false, position: 0, duration: 0 } };
    session = s;
    mount.hidden = false;
    mount.classList.remove('is-prewarming');
    mount.removeAttribute('aria-hidden');
    try { s.source = source(record); }
    catch { publish(s, 'error'); return Promise.resolve(null); }
    const host = document.createElement('div');
    mount.append(host);
    publish(s, 'connecting');
    s.recover = () => { if (active(s) && s.mode === 'error' && !s.creating) connect(s, host); };
    apiListeners.add(s.recover);
    return connect(s, host);
  }
  function connect(s, host) {
    s.creating = true;
    publish(s, 'connecting');
    clearTimeout(s.readyTimer);
    s.readyTimer = setTimeout(() => {
      if (active(s) && !s.ready) publish(s, 'delayed');
    }, 10000);
    return getAPI().then(api => {
      if (!active(s)) return null;
      s.observer = new MutationObserver(() => {
        const iframe = mount.querySelector('iframe');
        if (iframe) {
          iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
          iframe.title = 'Spotify player';
        }
      });
      s.observer.observe(mount, { childList: true, subtree: true });
      api.createController(host, { uri: s.source.uri, width: '100%', height: 152 }, c => {
        if (!active(s)) { try { c?.destroy?.(); } catch {} return; }
        if (!c?.addListener) { try { c?.destroy?.(); } catch {} publish(s, 'error'); return; }
        s.controller = c;
        c.addListener('ready', () => {
          if (!active(s) || s.controller !== c) return;
          clearTimeout(s.readyTimer);
          s.ready = true;
          if (!s.playing && s.intent === null) publish(s, 'ready');
        });
        c.addListener('playback_started', e => receive(s, c, { ...e?.data, type: 'started' }));
        c.addListener('playback_update', e => receive(s, c, { ...e?.data, type: 'update' }));
      });
      return s.controller;
    }).catch(() => {
      if (active(s)) { clearTimeout(s.readyTimer); publish(s, 'error'); }
      return null;
    }).finally(() => { s.creating = false; });
  }
  function requestGesture() {
    const s = session;
    if (!s) return false;
    mount.classList.add('is-needs-gesture');
    if (s.ready) publish(s, 'gesture');
    mount.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    mount.querySelector('iframe')?.focus({ preventScroll: true });
    return true;
  }
  function command(wanted) {
    const s = session;
    if (!s?.ready || !s.controller || s.intent !== null) { requestGesture(); return false; }
    s.intent = Boolean(wanted);
    publish(s, wanted ? 'starting' : 'pausing');
    s.commandTimer = setTimeout(() => {
      if (!active(s) || s.intent === null) return;
      clearIntent(s);
      requestGesture();
    }, 2500);
    try {
      const fn = wanted ? s.controller.resume || s.controller.play : s.controller.pause;
      if (typeof fn !== 'function') throw new Error('Unsupported command');
      // Keep the audio command in the click, before any disc animation or await.
      fn.call(s.controller);
      return true;
    } catch {
      clearIntent(s);
      requestGesture();
      return false;
    }
  }
  return {
    ensure, prepare: ensure, command, requestGesture, destroy, deactivate: destroy,
    retry() { const record = session?.record; destroy(); if (record) return ensure(record); },
    get ready() { return Boolean(session?.ready); },
    get controllable() { return Boolean(session?.ready && session.controller); },
    get pending() { return session?.intent != null; },
    get fallback() { return false; },
    get connecting() { return session?.mode === 'connecting'; },
    get mode() { return session?.mode || 'idle'; },
    get recordId() { return session?.record.id || null; }
  };
}
