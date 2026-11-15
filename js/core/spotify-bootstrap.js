/**
 * Spotify API bootstrap — v7.0.16.
 * Loads only the official IFrame API handshake early. The playback controller
 * is created later for the record that is actually placed on the turntable, so
 * the deck's Play button can call controller.play() directly from the click.
 */
(() => {
  if (window.__clubSpotifyApiReady) return;

  let resolveReady;
  window.__clubSpotifyApiReady = new Promise(resolve => { resolveReady = resolve; });

  const previous = window.onSpotifyIframeApiReady;
  window.onSpotifyIframeApiReady = api => {
    if (api?.createController) {
      window.SpotifyIframeApi = api;
      resolveReady(api);
      try { window.dispatchEvent(new CustomEvent('club:spotify-api-ready', { detail: api })); } catch {}
    }
    try {
      if (typeof previous === 'function' && previous !== window.onSpotifyIframeApiReady) previous(api);
    } catch {}
  };
})();
