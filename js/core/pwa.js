(() => {
  if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
  addEventListener('load', async () => {
    try {
      const url = new URL('sw.js', document.baseURI);
      const registration = await navigator.serviceWorker.register(url, { scope: './', updateViaCache: 'none' });
      registration.update().catch(() => {});
    } catch (error) {
      console.warn('[CLB] Service Worker unavailable:', error);
    }
  }, { once: true });
})();
