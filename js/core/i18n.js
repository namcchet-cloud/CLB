import { copy } from '../data/translations.js?v=5.1.0';
import { storage, emit } from './runtime.js?v=5.1.0';
let language = storage.get('artclub-lang', 'vi') === 'en' ? 'en' : 'vi';
export const local = value => value && typeof value === 'object'
  ? value[language] ?? value.vi ?? value.en ?? '' : String(value ?? '');
export const t = key => copy[language][key] ?? copy.vi[key] ?? key;
function renderRichText(el, value) {
  const parts = String(value ?? '').split(/(<br\s*\/?\s*>|<\/?em>)/gi);
  const fragment = document.createDocumentFragment();
  let emphasis = null;
  const parent = () => emphasis || fragment;
  for (const part of parts) {
    if (!part) continue;
    if (/^<br\s*\/?\s*>$/i.test(part)) { parent().append(document.createElement('br')); continue; }
    if (/^<em>$/i.test(part)) { emphasis = document.createElement('em'); fragment.append(emphasis); continue; }
    if (/^<\/em>$/i.test(part)) { emphasis = null; continue; }
    parent().append(document.createTextNode(part));
  }
  el.replaceChildren(fragment);
}
export function apply(scope = document) {
  scope.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  scope.querySelectorAll('[data-i18n-html]').forEach(el => renderRichText(el, t(el.dataset.i18nHtml)));
  for (const type of ['aria', 'alt', 'placeholder', 'title']) {
    scope.querySelectorAll(`[data-i18n-${type}]`).forEach(el => {
      el.setAttribute(type === 'aria' ? 'aria-label' : type, t(el.getAttribute(`data-i18n-${type}`)));
    });
  }
}
export function setLanguage(lang) {
  language = lang === 'en' ? 'en' : 'vi';
  storage.set('artclub-lang', language);
  document.documentElement.lang = language;
  document.title = t('pageTitle');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('metaDescription'));
  apply();
  document.querySelectorAll('[data-lang-option]').forEach(el => el.classList.toggle('is-current', el.dataset.langOption === language));
  document.querySelector('.lang-toggle')?.setAttribute('aria-label', language === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt');
  emit('club:language', language);
}
export function initI18n() {
  document.querySelector('.lang-toggle')?.addEventListener('click', () => setLanguage(language === 'vi' ? 'en' : 'vi'));
  const api = { t, local, storage, apply, setLanguage, get language() { return language; } };
  // Narrow compatibility facade for the two preserved visual-effects modules.
  window.Club = api;
  setLanguage(language);
  return api;
}
