import { VERSION } from './core/build.js?v=5.0.2';
import { start, near, features, issues, report } from './core/runtime.js?v=5.0.0';
import { initI18n } from './core/i18n.js?v=5.0.0';
import { initMotion } from './features/motion.js?v=5.0.0';
import { initNavigation } from './features/navigation.js?v=5.0.0';

const content = window.CLUB_CONTENT || { artists: [], artworks: [], records: [] };
const buildStatus = document.getElementById('buildStatus');
const labels = { gallery: 'triển lãm', music: 'âm nhạc' };
function lazy(name, section, factory) {
  const load = () => start(name, factory).catch(error => {
    // A feature failure does not hide the rest of the website. Provide a bounded retry path.
    if (!section.querySelector('.feature-retry')) {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'feature-retry comic-button';
      button.textContent = document.documentElement.lang === 'en' ? `Reload to retry ${name}` : `Tải lại trang để mở ${labels[name]}`;
      // Browsers cache rejected module imports; a clean reload also retries their dependencies.
      button.addEventListener('click', () => location.reload(), { once: true });
      section.append(button);
    }
  });
  near(section, load, '800px');
  section.addEventListener('focusin', load, { once: true });
  return load;
}
try {
  initI18n(); features.set('i18n', { ready: true });
  features.set('motion', initMotion());
  features.set('navigation', initNavigation());
  lazy('gallery', document.getElementById('gallery'), async () => (await import('./features/gallery.js?v=5.0.0')).initGallery(content));
  lazy('music', document.getElementById('playlist'), async () => (await import('./features/music/index.js?v=5.0.0')).initMusic(content));
  document.documentElement.dataset.appReady = 'true';
} catch (error) { report('startup', error); }
function status() {
  if (buildStatus) buildStatus.textContent = `v${VERSION} · ${issues.length ? (document.documentElement.lang === 'en' ? 'See diagnostics' : 'Xem chẩn đoán') : 'HTML + CSS + JavaScript ✓'}`;
}
status(); document.addEventListener('club:error', status); document.addEventListener('club:language', status);
window.ClubDiagnostics = () => ({
  version: VERSION,
  modules: Object.fromEntries([...features].map(([name, value]) => [name, value instanceof Promise ? 'loading' : 'ready'])),
  errors: issues.slice(),
  viewport: document.documentElement.clientWidth,
  overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
  motion: document.documentElement.dataset.motionChoice,
  hidden: document.hidden,
  music: window.ClubMusicV4 ? { ...window.ClubMusicV4.state, animationActive: window.ClubMusicV4.animationActive } : 'not loaded yet',
  gallery: features.get('gallery')?.state || 'not loaded yet',
  assets: performance.getEntriesByType('resource').filter(r => !r.name.startsWith('data:')).length
});
