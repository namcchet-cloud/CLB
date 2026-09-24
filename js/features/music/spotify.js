/**
 * Spotify transport.
 *
 * Primary path: official Spotify IFrame API.
 * Fallback path: official native Spotify Embed so the playlist remains usable
 * even when the controller API is blocked, delayed or unsupported.
 * No simulated playback is used.
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

  apiPromise = new Promise((resolve, reject) => {
    let settled = false;
    let script = document.getElementById(API_SCRIPT_ID);
    const previousReady = window.onSpotifyIframeApiReady;
    const timer = setTimeout(() => finish(null, new Error('Spotify API timeout')), 10000);

    function finish(api, error = null) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error || !api?.createController) {
        apiPromise = null;
        if (script) {
          script.dataset.spotifyFailed = 'true';
          script.remove();
        }
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

    if (script?.dataset.spotifyFailed === 'true') {
      script.remove();
      script = null;
    }

    if (!script) {
      script = document.createElement('script');
      script.id = API_SCRIPT_ID;
      script.src = API_SRC;
      script.async = true;
      script.dataset.spotifyApi = 'true';
      document.head.append(script);
    }

    script.addEventListener('error', () => {
      script.dataset.spotifyFailed = 'true';
      finish(null, new Error('Spotify API could not load'));
    }, { once: true });
  });

  return apiPromise;
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
  const merged = [...new Set([...current, ...required])];
  iframe.setAttribute('allow', merged.join('; '));
  iframe.setAttribute('allowfullscreen', '');
  if (!iframe.getAttribute('title')) iframe.setAttribute('title', 'Spotify player');
}

export function createSpotify(mount, onPlayback, onStatus) {
  let revision = 0;
  let recordId = null;
  let controller = null;
  let job = null;
  let ready = false;
  let mode = 'idle';
  let cancelPending = null;

  const stale = () => new DOMException('Album changed', 'AbortError');

  function resetMount() {
    mount.classList.remove('is-native-embed');
    mount.removeAttribute('data-spotify-mode');
    mount.removeAttribute('aria-busy');
    mount.replaceChildren();
    mount.hidden = true;
  }

  function destroy() {
    revision++;
    cancelPending?.();
    cancelPending = null;
    try { controller?.pause?.(); } catch {}
    try { controller?.destroy?.(); } catch {}
    controller = null;
    recordId = null;
    ready = false;
    mode = 'idle';
    job = null;
    resetMount();
  }

  function nativeFallback(record, rev) {
    if (rev !== revision) throw stale();
    const info = embedInfo(record);
    if (!info.src) throw new Error('Spotify embed URL unavailable');

    const iframe = document.createElement('iframe');
    iframe.src = info.src;
    iframe.title = info.title;
    iframe.width = '100%';
    iframe.height = String(info.height);
    iframe.loading = 'lazy';
    iframe.style.border = '0';
    iframe.style.borderRadius = '12px';
    ensurePermissions(iframe);

    mount.replaceChildren(iframe);
    mount.hidden = false;
    mount.classList.add('is-native-embed');
    mount.dataset.spotifyMode = 'embed';
    mount.setAttribute('aria-busy', 'false');
    controller = null;
    ready = false;
    mode = 'embed';
    onStatus?.('fallback');
    return null;
  }

  function ensure(record) {
    if (!record) return Promise.resolve(null);
    if (recordId === record.id && mode === 'api' && ready) return Promise.resolve(controller);
    if (recordId === record.id && mode === 'embed') return Promise.resolve(null);
    if (recordId === record.id && job) return job;

    destroy();
    const rev = revision;
    recordId = record.id;
    mode = 'connecting';
    mount.hidden = false;
    mount.dataset.spotifyMode = 'connecting';
    mount.setAttribute('aria-busy', 'true');
    onStatus?.('connecting');

    job = (async () => {
      let api;
      try {
        api = await loadAPI();
      } catch (error) {
        if (rev !== revision) throw stale();
        return nativeFallback(record, rev);
      }
      if (rev !== revision) throw stale();

      const host = document.createElement('div');
      host.className = 'mv3-spotify-controller-host';
      mount.classList.remove('is-native-embed');
      mount.replaceChildren(host);

      return new Promise((resolve, reject) => {
        let complete = false;
        let softTimer = 0;
        const hardTimer = setTimeout(() => {
          if (complete) return;
          complete = true;
          cancelPending = null;
          try { controller?.destroy?.(); } catch {}
          controller = null;
          try { resolve(nativeFallback(record, rev)); } catch (error) { reject(error); }
        }, 12000);

        const finishReady = () => {
          if (complete || rev !== revision) return;
          complete = true;
          clearTimeout(hardTimer);
          clearTimeout(softTimer);
          cancelPending = null;
          ready = true;
          mode = 'api';
          mount.dataset.spotifyMode = 'api';
          mount.setAttribute('aria-busy', 'false');
          onStatus?.('ready');
          resolve(controller);
        };

        cancelPending = () => {
          if (complete) return;
          complete = true;
          clearTimeout(hardTimer);
          clearTimeout(softTimer);
          reject(stale());
        };

        try {
          api.createController(host, {
            width: '100%',
            height: 152,
            url: record.spotifyUrl,
            uri: record.uri
          }, c => {
            if (complete || rev !== revision) {
              try { c?.destroy?.(); } catch {}
              if (rev !== revision) cancelPending?.();
              return;
            }
            if (!c) {
              clearTimeout(hardTimer);
              complete = true;
              cancelPending = null;
              try { resolve(nativeFallback(record, rev)); } catch (error) { reject(error); }
              return;
            }

            controller = c;
            const add = typeof c.addListener === 'function' ? c.addListener.bind(c) : null;
            add?.('ready', finishReady);
            add?.('playback_started', event => {
              if (rev === revision) onPlayback?.({ type: 'started', ...event?.data }, record.id);
            });
            add?.('playback_update', event => {
              if (rev === revision) onPlayback?.({ type: 'update', ...event?.data }, record.id);
            });

            // The official callback already proves a controller exists. Some browsers/cache
            // paths have been observed to miss the separate `ready` event, so do not wait
            // forever for that event if the iframe itself has mounted successfully.
            const iframe = mount.querySelector('iframe');
            ensurePermissions(iframe);
            if (iframe) {
              iframe.addEventListener('load', () => {
                if (!complete) softTimer = setTimeout(finishReady, 180);
              }, { once: true });
              softTimer = setTimeout(finishReady, 1400);
            } else {
              softTimer = setTimeout(finishReady, 1800);
            }
          });
        } catch (error) {
          clearTimeout(hardTimer);
          clearTimeout(softTimer);
          complete = true;
          cancelPending = null;
          try { resolve(nativeFallback(record, rev)); } catch (fallbackError) { reject(fallbackError || error); }
        }
      });
    })().catch(error => {
      if (rev === revision && error?.name !== 'AbortError') {
        ready = false;
        job = null;
        mount.setAttribute('aria-busy', 'false');
        onStatus?.('error');
      }
      throw error;
    });

    return job;
  }

  function command(on) {
    if (!ready || mode !== 'api' || !controller) return false;
    try {
      if (on) {
        const fn = controller.resume || controller.play;
        if (typeof fn !== 'function') return false;
        fn.call(controller);
      } else {
        if (typeof controller.pause !== 'function') return false;
        controller.pause();
      }
      return true;
    } catch {
      return false;
    }
  }

  function focus() {
    const iframe = mount.querySelector('iframe');
    if (!iframe) return false;
    try { iframe.focus({ preventScroll: true }); } catch { try { iframe.focus(); } catch {} }
    return true;
  }

  return {
    ensure,
    command,
    destroy,
    focus,
    get ready() { return ready; },
    get controllable() { return ready && mode === 'api' && Boolean(controller); },
    get fallback() { return mode === 'embed'; },
    get connecting() { return mode === 'connecting'; },
    get mode() { return mode; },
    get recordId() { return recordId; }
  };
}
