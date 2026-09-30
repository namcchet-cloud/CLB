/**
 * Spotify API + controller bootstrap — v7.0.15.
 * Starts both the official IFrame API handshake and the first playlist
 * controller before the Music module is evaluated. The Music feature adopts
 * this controller instead of creating a second iframe, removing a full
 * controller-start round trip from the first Play action.
 */
(() => {
  if (window.__clubSpotifyApiReady) return;
  const DEFAULT_URI = 'spotify:playlist:4l15Ccxw8hVu7YIpUU6QM0';
  let resolveReady;
  window.__clubSpotifyApiReady = new Promise(resolve => { resolveReady = resolve; });

  function permissions(iframe) {
    if (!iframe) return;
    iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  }

  function startController(api) {
    if (window.__clubSpotifyEarlyController || !api?.createController) return;
    window.__clubSpotifyEarlyController = new Promise(resolve => {
      const begin = () => {
        if (!document.body) { requestAnimationFrame(begin); return; }
        let host = document.getElementById('clubSpotifyEarlyHost');
        if (!host) {
          host = document.createElement('div');
          host.id = 'clubSpotifyEarlyHost';
          host.setAttribute('aria-hidden', 'true');
          Object.assign(host.style, {
            position: 'fixed', width: '2px', height: '2px', left: '0', bottom: '0',
            overflow: 'hidden', clipPath: 'inset(50%)', opacity: '0.001', pointerEvents: 'none',
            zIndex: '-1'
          });
          document.body.append(host);
        }
        try {
          api.createController(host, { width: '100%', height: 352, uri: DEFAULT_URI }, controller => {
            permissions(host.querySelector('iframe'));
            if (!controller) { resolve(null); return; }
            const early = { controller, host, recordId: 'studio', ready: false };
            try { controller.addListener?.('ready', () => { early.ready = true; permissions(host.querySelector('iframe')); }); } catch {}
            resolve(early);
          });
        } catch { resolve(null); }
      };
      begin();
    });
  }

  const previous = window.onSpotifyIframeApiReady;
  window.onSpotifyIframeApiReady = api => {
    if (api?.createController) {
      window.SpotifyIframeApi = api;
      // Start the expensive iframe/controller creation before resolving API
      // readiness, so downstream modules can immediately adopt the same job.
      startController(api);
      resolveReady(api);
      try { window.dispatchEvent(new CustomEvent('club:spotify-api-ready', { detail: api })); } catch {}
    }
    try {
      if (typeof previous === 'function' && previous !== window.onSpotifyIframeApiReady) previous(api);
    } catch {}
  };
})();
