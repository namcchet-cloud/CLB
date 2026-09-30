/**
 * Spotify transport — v7.0.15 Fast Atomic Sync.
 *
 * The official IFrame API and one controller are warmed before the listener
 * places a record. The controller stays alive for the whole session and album
 * changes reuse loadEntity/loadUri. During prewarm the Spotify iframe is kept
 * off-screen (not display:none) so browsers can finish initialization without
 * shifting the page layout.
 */
const API_SRC = 'https://open.spotify.com/embed/iframe-api/v1';
const API_SCRIPT_ID = 'clubSpotifyAPI';
let apiPromise = null;
let cachedApi = null;

function loadAPI() {
  if (cachedApi?.createController) return Promise.resolve(cachedApi);
  if (window.SpotifyIframeApi?.createController) {
    cachedApi = window.SpotifyIframeApi;
    return Promise.resolve(cachedApi);
  }
  if (apiPromise) return apiPromise;

  // v7.0.15: the HTML starts Spotify's official script before app.js. Reuse
  // that early handshake instead of injecting another script after Music loads.
  if (window.__clubSpotifyApiReady?.then) {
    apiPromise = Promise.race([
      window.__clubSpotifyApiReady,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Spotify API timeout')), 7000))
    ]).then(api => {
      if (!api?.createController) throw new Error('Spotify API unavailable');
      cachedApi = api;
      window.SpotifyIframeApi = api;
      return api;
    }).catch(error => {
      apiPromise = null;
      throw error;
    });
    return apiPromise;
  }

  apiPromise = new Promise((resolve, reject) => {
    let settled = false;
    let script = document.getElementById(API_SCRIPT_ID);
    const previousReady = window.onSpotifyIframeApiReady;
    const timer = setTimeout(() => finish(null, new Error('Spotify API timeout')), 8000);

    function finish(api, error = null) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error || !api?.createController) {
        apiPromise = null;
        if (script) { try { script.remove(); } catch {} }
        reject(error || new Error('Spotify API unavailable'));
        return;
      }
      cachedApi = api;
      window.SpotifyIframeApi = api;
      resolve(api);
    }

    window.onSpotifyIframeApiReady = api => {
      try {
        if (typeof previousReady === 'function' && previousReady !== window.onSpotifyIframeApiReady) previousReady(api);
      } catch {}
      finish(api);
    };

    if (!script) {
      script = document.createElement('script');
      script.id = API_SCRIPT_ID;
      script.src = API_SRC;
      script.async = true;
      script.dataset.spotifyApi = 'true';
      try { script.fetchPriority = 'high'; } catch {}
      document.body.append(script);
    }

    script.addEventListener('error', () => finish(null, new Error('Spotify API could not load')), { once: true });
  });

  return apiPromise;
}

function entity(record) {
  return record?.uri || record?.spotifyUrl || '';
}

function embedInfo(record) {
  const raw = record?.spotifyUrl || '';
  try {
    const url = new URL(raw);
    const parts = url.pathname.split('/').filter(Boolean);
    const type = parts[0] || 'playlist';
    const id = parts[1] || '';
    if (!id || !['playlist', 'album', 'track', 'episode', 'show', 'artist'].includes(type)) throw new Error('Unsupported Spotify URL');
    return {
      src: `https://open.spotify.com/embed/${type}/${encodeURIComponent(id)}?utm_source=generator`,
      height: type === 'playlist' || type === 'album' || type === 'artist' ? 352 : 152,
      title: `Spotify ${type}`
    };
  } catch {
    const uri = String(record?.uri || '');
    const [, type = 'playlist', id = ''] = uri.split(':');
    return {
      src: id ? `https://open.spotify.com/embed/${type}/${encodeURIComponent(id)}?utm_source=generator` : raw,
      height: type === 'playlist' || type === 'album' || type === 'artist' ? 352 : 152,
      title: `Spotify ${type || 'embed'}`
    };
  }
}

function ensurePermissions(iframe) {
  if (!iframe) return;
  const required = ['autoplay', 'clipboard-write', 'encrypted-media', 'fullscreen', 'picture-in-picture'];
  const current = (iframe.getAttribute('allow') || '').split(';').map(x => x.trim()).filter(Boolean);
  iframe.setAttribute('allow', [...new Set([...current, ...required])].join('; '));
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  if (!iframe.getAttribute('title')) iframe.setAttribute('title', 'Spotify player');
}

function watchIframe(mount) {
  const apply = () => ensurePermissions(mount.querySelector('iframe'));
  apply();
  if (!('MutationObserver' in window)) return () => {};
  const observer = new MutationObserver(apply);
  observer.observe(mount, { childList: true, subtree: true });
  return () => observer.disconnect();
}

export function createSpotify(mount, onPlayback, onStatus) {
  let controller = null;
  let controllerJob = null;
  let host = null;
  let stopWatchingIframe = null;
  let mode = 'idle';
  let ready = false;
  let recordId = null;
  let desiredRecord = null;
  let generation = 0;
  let exposeRequested = false;
  let fallbackAllowed = false;

  function setMode(next, busy = false) {
    mode = next;
    mount.dataset.spotifyMode = next;
    mount.setAttribute('aria-busy', String(Boolean(busy)));
  }

  function expose(on) {
    mount.hidden = false;
    mount.classList.toggle('is-prewarming', !on);
    if (on) mount.removeAttribute('aria-hidden');
    else mount.setAttribute('aria-hidden', 'true');
  }

  function resetVisual() {
    stopWatchingIframe?.();
    stopWatchingIframe = null;
    mount.classList.remove('is-native-embed', 'is-prewarming', 'is-needs-gesture');
    mount.removeAttribute('data-spotify-mode');
    mount.removeAttribute('aria-busy');
    mount.removeAttribute('aria-hidden');
    mount.replaceChildren();
    mount.hidden = true;
  }

  function markReady() {
    if (!controller) return;
    ready = true;
    setMode('api', false);
    onStatus?.('ready');
  }

  function attachController(c) {
    controller = c;
    ready = false;
    setMode('api-pending', true);
    stopWatchingIframe?.();
    stopWatchingIframe = watchIframe(mount);

    const add = typeof c?.addListener === 'function' ? c.addListener.bind(c) : null;
    add?.('ready', () => markReady());
    add?.('playback_started', event => {
      markReady();
      mount.classList.remove('is-needs-gesture');
      onPlayback?.({ type: 'started', ...event?.data }, recordId);
    });
    add?.('playback_update', event => {
      markReady();
      const data = event?.data || {};
      if (data.isPaused === false) mount.classList.remove('is-needs-gesture');
      onPlayback?.({ type: 'update', ...data }, recordId);
    });
  }

  function loadIntoController(record) {
    if (!controller || !record) return false;
    const value = entity(record);
    if (!value) return false;
    try {
      if (recordId !== record.id) {
        if (typeof controller.loadEntity === 'function') controller.loadEntity(value);
        else if (typeof controller.loadUri === 'function') controller.loadUri(value);
        else return false;
      }
      recordId = record.id;
      desiredRecord = record;
      expose(exposeRequested);
      setMode(ready ? 'api' : 'api-pending', !ready);
      return true;
    } catch {
      return false;
    }
  }

  function nativeFallback(record) {
    const info = embedInfo(record);
    if (!info.src) throw new Error('Spotify embed URL unavailable');
    const iframe = document.createElement('iframe');
    iframe.src = info.src;
    iframe.title = info.title;
    iframe.width = '100%';
    iframe.height = String(info.height);
    iframe.loading = 'eager';
    iframe.style.border = '0';
    iframe.style.borderRadius = '12px';
    ensurePermissions(iframe);
    mount.replaceChildren(iframe);
    mount.classList.add('is-native-embed');
    controller = null;
    controllerJob = null;
    ready = false;
    recordId = record?.id || null;
    desiredRecord = record || null;
    expose(exposeRequested);
    setMode('embed', false);
    if (exposeRequested) onStatus?.('fallback');
    return null;
  }

  async function createPersistentController(record) {
    const myGeneration = generation;
    const api = await loadAPI();
    if (myGeneration !== generation) throw new DOMException('Spotify session replaced', 'AbortError');

    // v7.0.15: adopt the controller that bootstrap started from <head>. This
    // avoids paying createController + iframe startup again when Music initializes.
    const earlyJob = window.__clubSpotifyEarlyController;
    if (earlyJob?.then) {
      try {
        const early = await Promise.race([earlyJob, new Promise(resolve => setTimeout(() => resolve(null), 2400))]);
        if (myGeneration !== generation) throw new DOMException('Spotify session replaced', 'AbortError');
        if (early?.controller && early?.host) {
          host = early.host;
          host.removeAttribute('style');
          host.removeAttribute('aria-hidden');
          host.className = 'mv3-spotify-controller-host';
          mount.classList.remove('is-native-embed');
          mount.replaceChildren(host);
          expose(exposeRequested);
          attachController(early.controller);
          if (early.ready) markReady();
          recordId = early.recordId || 'studio';
          const latest = desiredRecord || record;
          if (latest && latest.id !== recordId) loadIntoController(latest);
          else desiredRecord = latest;
          return early.controller;
        }
      } catch (error) {
        if (error?.name === 'AbortError') throw error;
      }
    }

    host = document.createElement('div');
    host.className = 'mv3-spotify-controller-host';
    mount.classList.remove('is-native-embed');
    mount.replaceChildren(host);
    expose(exposeRequested);
    setMode('connecting', true);

    return new Promise((resolve, reject) => {
      let settled = false;
      const timer = setTimeout(() => {
        if (settled || controller || myGeneration !== generation) return;
        settled = true;
        controllerJob = null;
        if (fallbackAllowed) {
          try { resolve(nativeFallback(desiredRecord || record)); }
          catch (error) { reject(error); }
        } else {
          setMode('idle', false);
          reject(new Error('Spotify controller warmup timeout'));
        }
      }, 9000);

      try {
        api.createController(host, {
          width: '100%',
          height: 352,
          uri: entity(record)
        }, c => {
          if (settled) { try { c?.destroy?.(); } catch {} return; }
          settled = true;
          clearTimeout(timer);
          if (myGeneration !== generation) {
            try { c?.destroy?.(); } catch {}
            reject(new DOMException('Spotify session replaced', 'AbortError'));
            return;
          }
          if (!c) {
            controllerJob = null;
            if (fallbackAllowed) {
              try { resolve(nativeFallback(desiredRecord || record)); }
              catch (error) { reject(error); }
            } else {
              setMode('idle', false);
              reject(new Error('Spotify controller unavailable'));
            }
            return;
          }

          attachController(c);
          recordId = record.id;
          const latest = desiredRecord;
          if (latest && latest.id !== record.id) loadIntoController(latest);
          else expose(exposeRequested);
          resolve(c);
        });
      } catch (error) {
        settled = true;
        clearTimeout(timer);
        controllerJob = null;
        if (fallbackAllowed) {
          try { resolve(nativeFallback(desiredRecord || record)); }
          catch (fallbackError) { reject(fallbackError || error); }
        } else {
          setMode('idle', false);
          reject(error);
        }
      }
    });
  }

  function ensure(record, { prewarm = false } = {}) {
    if (!record) return Promise.resolve(null);
    desiredRecord = record;
    if (!prewarm) {
      exposeRequested = true;
      fallbackAllowed = true;
    }
    expose(exposeRequested);

    if (controller) {
      loadIntoController(record);
      return Promise.resolve(controller);
    }

    if (mode === 'embed') {
      if (recordId !== record.id) nativeFallback(record);
      else expose(exposeRequested);
      return Promise.resolve(null);
    }

    if (controllerJob) {
      return controllerJob.then(c => {
        if (c && desiredRecord && recordId !== desiredRecord.id) loadIntoController(desiredRecord);
        expose(exposeRequested);
        return c;
      });
    }

    recordId = record.id;
    setMode('connecting', true);
    if (!prewarm) onStatus?.('connecting');
    controllerJob = createPersistentController(record).catch(error => {
      controllerJob = null;
      // Use the live fallback flag rather than the mode of the call that started
      // the job. A record may reach the platter while a background warmup is
      // still pending; in that case a real user request is now allowed to fall
      // back immediately instead of waiting for a second connection attempt.
      if (error?.name !== 'AbortError' && fallbackAllowed) {
        try { return nativeFallback(desiredRecord || record); }
        catch {
          setMode('error', false);
          onStatus?.('error');
        }
      }
      throw error;
    });
    return controllerJob;
  }

  function prepare(record) {
    return ensure(record, { prewarm: true }).catch(() => null);
  }

  function command(on) {
    if (!controller || !ready || mode !== 'api') return false;
    try {
      if (on) {
        // v7.0.15: send play() synchronously from the user click. The turntable
        // motor is not touched here; playback events confirm when audio really starts.
        // resume() remains only a compatibility fallback. Calling the transport
        // synchronously here preserves the user's activation on mobile browsers.
        const fn = controller.play || controller.resume || controller.togglePlay;
        if (typeof fn !== 'function') return false;
        fn.call(controller);
      } else {
        if (typeof controller.pause === 'function') controller.pause();
        else if (typeof controller.togglePlay === 'function') controller.togglePlay();
        else return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  function requestGesture() {
    exposeRequested = true;
    expose(true);
    mount.classList.add('is-needs-gesture');
    onStatus?.(mode === 'embed' ? 'fallback' : 'gesture');
    const iframe = mount.querySelector('iframe');
    if (!iframe) return false;
    const rect = mount.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      try { mount.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch {}
    }
    try { iframe.focus({ preventScroll: true }); } catch { try { iframe.focus(); } catch {} }
    return true;
  }

  function deactivate() {
    try { controller?.pause?.(); } catch {}
    exposeRequested = false;
    fallbackAllowed = false;
    expose(false);
    onStatus?.('ready');
  }

  function destroy() {
    generation++;
    try { controller?.pause?.(); } catch {}
    try { controller?.destroy?.(); } catch {}
    controller = null;
    controllerJob = null;
    host = null;
    ready = false;
    recordId = null;
    desiredRecord = null;
    mode = 'idle';
    exposeRequested = false;
    fallbackAllowed = false;
    resetVisual();
  }

  function focus() {
    const iframe = mount.querySelector('iframe');
    if (!iframe) return false;
    try { iframe.focus({ preventScroll: true }); } catch { try { iframe.focus(); } catch {} }
    return true;
  }

  return {
    ensure,
    prepare,
    command,
    requestGesture,
    deactivate,
    destroy,
    focus,
    get ready() { return ready; },
    get controllable() { return Boolean(controller) && ready && mode === 'api'; },
    get pending() { return Boolean(controller) && !ready; },
    get fallback() { return mode === 'embed'; },
    get connecting() { return mode === 'connecting' || mode === 'api-pending'; },
    get mode() { return mode; },
    get recordId() { return recordId; }
  };
}
