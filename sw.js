/* CLB v7.3.2 — atomic core precache, safe upgrades, resilient offline fallback. */
const CACHE_VERSION = 'clb-v7.3.2';
const CORE = [
  './', './index.html', './legal.html', './site.webmanifest',
  './css/tokens.css?v=7.1.0', './css/site.css?v=7.1.0', './css/music.css?v=7.3.0', './css/intro.css?v=7.1.0', './css/comic-decor.css?v=7.1.0', './css/effects.css?v=7.1.0',
  './js/core/bootstrap.js?v=7.1.0', './js/core/build.js?v=7.3.0', './js/core/runtime.js?v=7.1.0', './js/core/i18n.js?v=7.1.0', './js/core/images.js?v=7.1.0', './js/core/pwa.js?v=7.1.0',
  './js/data/content.js?v=7.1.0', './js/data/images.js?v=7.1.0', './js/data/translations.js?v=7.1.0', './js/app.js?v=7.3.0',
  './js/features/intro.js?v=7.1.0', './js/features/motion.js?v=7.1.0', './js/features/navigation.js?v=7.1.0', './js/features/comic-decor.js?v=7.1.0', './js/features/gallery.js?v=7.3.0', './js/features/akiko.js?v=7.1.0', './js/features/raven.js?v=7.3.0',
  './js/features/music/index.js?v=7.3.0', './js/features/music/motor.js?v=7.3.0', './js/features/music/spotify.js?v=7.3.0',
  './assets/optimized/logo-new-96-2583a335.webp', './assets/optimized/logo-new-192-86e0c09a.webp', './assets/optimized/logo-new-640-db642e82.webp',
  './assets/icons/favicon-192x192.png', './assets/icons/favicon-512x512.png'
];
const cacheableDestination = new Set(['style', 'script', 'font', 'image']);
const coreNames = new Set(CORE.map(path => new URL(path, self.registration.scope).href));

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    // Wait for every write to settle before deciding whether the new cache is safe.
    // Otherwise a late successful write could resurrect a deleted partial cache.
    const results = await Promise.allSettled(CORE.map(async path => {
      const url = new URL(path, self.registration.scope);
      const request = new Request(url, { cache: 'reload' });
      const response = await fetch(request);
      if (!response.ok || response.type === 'opaque') {
        throw new Error(`Core asset unavailable: ${url.pathname}`);
      }
      await cache.put(request, response);
    }));
    if (results.some(result => result.status === 'rejected')) {
      await caches.delete(CACHE_VERSION);
      throw new Error('Cannot install CLB v7.3.2: required assets missing');
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('clb-v') && key !== CACHE_VERSION).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  if (request.mode === 'navigate') {
    if (!sameOrigin || !url.href.startsWith(self.registration.scope)) return;
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (!fresh.ok) throw new Error(`Navigation HTTP ${fresh.status}`);
        // Do not fail a successful navigation when browser storage is full.
        try { await (await caches.open(CACHE_VERSION)).put(request, fresh.clone()); } catch {}
        return fresh;
      } catch {
        const cache = await caches.open(CACHE_VERSION);
        return (await cache.match(request)) ||
          (await cache.match(new URL('./index.html', self.registration.scope))) ||
          Response.error();
      }
    })());
    return;
  }

  if ((sameOrigin && (cacheableDestination.has(request.destination) || url.pathname.endsWith('/js/features/kivat-mesh-data.json'))) || isFont) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_VERSION);
      const cached = await cache.match(request);
      // Versioned core assets stay stable offline. Non-core assets can refresh
      // without blocking first paint; cache write failures are non-fatal.
      if (cached) {
        if (sameOrigin && !coreNames.has(url.href)) {
          event.waitUntil(fetch(request).then(response => {
            if (response.ok) return cache.put(request, response.clone());
          }).catch(() => {}));
        }
        return cached;
      }
      const response = await fetch(request);
      if (response.ok || (isFont && response.type === 'opaque')) {
        try { await cache.put(request, response.clone()); } catch {}
      }
      return response;
    })());
  }
});
