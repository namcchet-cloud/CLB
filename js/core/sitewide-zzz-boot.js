/* Tiny CSP-safe early mode selector: prevent a flash of the default layout. */
(() => {
  try {
    const params = new URLSearchParams(location.search);
    const requested = params.get('mode');
    const saved = localStorage.getItem('clb:whole-site-mode:v2');
    document.documentElement.dataset.clbMode = (requested === 'zzz' || (requested !== 'classic' && saved === 'zzz')) ? 'zzz' : 'classic';
  } catch {
    document.documentElement.dataset.clbMode = 'classic';
  }
})();
