const CACHE_VERSION = 'clb-v7.0.11';
const CORE = [
  './', './index.html', './legal.html', './site.webmanifest',
  './css/tokens.css?v=7.0.11', './css/site.css?v=7.0.11', './css/music.css?v=7.0.11', './css/intro.css?v=7.0.11', './css/comic-decor.css?v=7.0.11', './css/effects.css?v=7.0.11',
  './js/core/bootstrap.js?v=7.0.11', './js/core/build.js?v=7.0.11', './js/core/runtime.js?v=7.0.11', './js/core/i18n.js?v=7.0.11', './js/core/images.js?v=7.0.11', './js/core/pwa.js?v=7.0.11',
  './js/data/content.js?v=7.0.11', './js/data/images.js?v=7.0.11', './js/data/translations.js?v=7.0.11', './js/app.js?v=7.0.11',
  './js/features/motion.js?v=7.0.11', './js/features/navigation.js?v=7.0.11', './js/features/comic-decor.js?v=7.0.11', './js/features/gallery.js?v=7.0.11', './js/features/akiko.js?v=7.0.11', './js/features/raven.js?v=7.0.11',
  './js/features/music/index.js?v=7.0.11', './js/features/music/motor.js?v=7.0.11', './js/features/music/spotify.js?v=7.0.11',
  './assets/optimized/logo-new-96-2583a335.webp', './assets/optimized/logo-new-192-86e0c09a.webp', './assets/optimized/logo-new-640-db642e82.webp',
  './assets/icons/favicon-192x192.png', './assets/icons/favicon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,700;1,800&family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,wght@0,600;0,700;1,600&display=swap'
];
const cacheableDestination = new Set(['style', 'script', 'font', 'image']);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await Promise.allSettled(CORE.map(async url => {
      const request = new Request(new URL(url, self.registration.scope), { cache: 'reload' });
      const response = await fetch(request);
      if (response.ok || response.type === 'opaque') await cache.put(request, response);
    }));
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
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (fresh.ok) (await caches.open(CACHE_VERSION)).put(request, fresh.clone());
        return fresh;
      } catch {
        return (await caches.match(request)) || (await caches.match(new URL('./index.html', self.registration.scope)));
      }
    })());
    return;
  }

  if ((url.origin === location.origin && cacheableDestination.has(request.destination)) || isFont) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok || response.type === 'opaque') (await caches.open(CACHE_VERSION)).put(request, response.clone());
      return response;
    })());
  }
});
