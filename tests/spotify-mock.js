/* Test fixture only; this file is never imported by the published website. */
window.__spotifyTest = { controllers: [] };
window.onSpotifyIframeApiReady({
 createController(host, options, callback) {
  const events = new Map(); let paused = true, destroyed = false, position = 0;
  const frame = document.createElement('div'); frame.textContent = 'Spotify TEST transport (no audio)';
  frame.style.cssText = 'height:152px;background:#253629;color:white;padding:16px;border-radius:12px';
  host.replaceWith(frame);
  const emit = (type, data = {}) => { for (const fn of events.get(type) || []) fn({ data }); };
  const c = { options, frame, events, emit,
   addListener(type, cb) { if (!events.has(type)) events.set(type, []); events.get(type).push(cb); },
   play() { paused = false; emit('playback_started', { playingURI: 'spotify:track:test1' }); this.update(0); },
   resume() { paused = false; emit('playback_started', { playingURI: 'spotify:track:test1' }); this.update(position); },
   pause() { paused = true; this.update(position); },
   update(value, extra = {}) { position = value; emit('playback_update', { playingURI: 'spotify:track:test1', isPaused: paused, isBuffering: false, position, duration: 200000, ...extra }); },
   destroy() { destroyed = true; frame.remove(); },
   get destroyed() { return destroyed; }
  };
  window.__spotifyTest.controllers.push(c); callback(c); setTimeout(() => emit('ready'), 20);
 }
});
