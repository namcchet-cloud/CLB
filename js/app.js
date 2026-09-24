import { VERSION } from './core/build.js?v=7.0.11';
import { start, near, features, issues, report } from './core/runtime.js?v=7.0.11';
import { initI18n } from './core/i18n.js?v=7.0.11';
import { initMotion } from './features/motion.js?v=7.0.11';
import { initNavigation } from './features/navigation.js?v=7.0.11';
import { initComicDecor } from './features/comic-decor.js?v=7.0.11';

const content = window.CLUB_CONTENT || { artists: [], artworks: [], records: [] };
const buildStatus = document.getElementById('buildStatus');
const labels = { gallery: 'triển lãm', music: 'âm nhạc' };
function lazy(name, section, factory) {
  const load = () => start(name, factory).catch(error => {
    if (!section.querySelector('.feature-retry')) {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'feature-retry comic-button';
      button.textContent = document.documentElement.lang === 'en' ? `Reload to retry ${name}` : `Tải lại trang để mở ${labels[name]}`;
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
  features.set('comicDecor', initComicDecor());
  lazy('gallery', document.getElementById('gallery'), async () => (await import('./features/gallery.js?v=7.0.11')).initGallery(content));
  // Music initializes eagerly so Spotify can warm its official IFrame API and
  // persistent controller while the listener is still viewing earlier sections.
  // Reuse the lazy helper for its retry UI, but trigger it immediately.
  const loadMusic = lazy('music', document.getElementById('playlist'), async () => (await import('./features/music/index.js?v=7.0.11')).initMusic(content));
  loadMusic();
  document.documentElement.dataset.appReady = 'true';
} catch (error) { report('startup', error); }
function status() {
  if (buildStatus) buildStatus.textContent = `v${VERSION} · ${issues.length ? (document.documentElement.lang === 'en' ? 'See diagnostics' : 'Xem chẩn đoán') : 'HTML + CSS + JavaScript ✓'}`;
}
status(); document.addEventListener('club:error', status); document.addEventListener('club:language', status);
