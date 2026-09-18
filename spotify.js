/** Spotify transport only. No simulated audio/playback; stale controller events are ignored. */
let apiPromise;
function loadAPI() {
  if (window.SpotifyIframeApi) return Promise.resolve(window.SpotifyIframeApi);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script'); script.id = 'clubSpotifyAPI';
    let settled = false;
    const finish = (api, error) => {
      if (settled) return; settled = true; clearTimeout(timer);
      if (error) { script.remove(); apiPromise = null; reject(error); }
      else { window.SpotifyIframeApi = api; resolve(api); }
    };
    const timer = setTimeout(() => finish(null, new Error('Spotify API timeout')), 12000);
    window.onSpotifyIframeApiReady = api => finish(api);
    script.src = 'https://open.spotify.com/embed/iframe-api/v1'; script.async = true;
    script.onerror = () => finish(null, new Error('Spotify API could not load'));
    document.head.append(script);
  });
  return apiPromise;
}
export function createSpotify(mount, onPlayback, onStatus) {
  let revision = 0, recordId = null, controller = null, job = null, ready = false, cancelPending = null;
  const stale = () => new DOMException('Album changed', 'AbortError');
  function destroy() {
    revision++;
    cancelPending?.(); cancelPending = null;
    try { controller?.pause?.(); controller?.destroy?.(); } catch {}
    controller = null; recordId = null; ready = false; job = null;
    mount.replaceChildren(); mount.hidden = true;
  }
  function ensure(record) {
    if (!record) return Promise.resolve(null);
    if (recordId === record.id && ready) return Promise.resolve(controller);
    if (recordId === record.id && job) return job;
    destroy(); const rev = revision; recordId = record.id;
    mount.hidden = false; mount.setAttribute('aria-busy', 'true'); onStatus('connecting');
    job = (async () => {
      const api = await loadAPI(); if (rev !== revision) throw stale();
      const host = document.createElement('div'); mount.replaceChildren(host);
      return new Promise((resolve, reject) => {
        let complete = false;
        const finish = (error = null) => {
          if (complete) return; complete = true; clearTimeout(timer); cancelPending = null;
          if (error) reject(error);
          else { ready = true; mount.setAttribute('aria-busy', 'false'); onStatus('ready'); resolve(controller); }
        };
        const timer = setTimeout(() => finish(new Error('Spotify player timeout')), 15000);
        cancelPending = () => finish(stale());
        try {
          api.createController(host, { width: '100%', height: 152, uri: record.uri }, c => {
            if (rev !== revision) { c.destroy?.(); finish(stale()); return; }
            controller = c;
            c.addListener('ready', () => { if (rev === revision) finish(); });
            c.addListener('playback_started', e => {
              if (rev === revision) onPlayback({ type: 'started', ...e?.data }, record.id);
            });
            c.addListener('playback_update', e => {
              if (rev === revision) onPlayback({ type: 'update', ...e?.data }, record.id);
            });
            mount.querySelector('iframe')?.setAttribute('title', 'Spotify playlist');
          });
        } catch (e) { finish(e); }
      });
    })().catch(error => {
      if (rev === revision && error.name !== 'AbortError') {
        ready = false; job = null; mount.setAttribute('aria-busy', 'false'); onStatus('error');
      }
      throw error;
    });
    return job;
  }
  function command(on) {
    if (!ready || !controller) return false;
    if (on) (controller.resume || controller.play).call(controller);
    else controller.pause();
    return true;
  }
  return { ensure, command, destroy, get ready() { return ready; }, get recordId() { return recordId; } };
}
