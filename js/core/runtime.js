/** Small shared lifecycle utilities. No framework or external runtime. */
export const features = new Map();
export const issues = [];
export const root = document.documentElement;
export const storage = {
  get(key, fallback = null) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch {} }
};
export function report(name, error) {
  const message = error?.message || String(error);
  issues.push({ feature: name, message });
  console.error(`[CLB:${name}]`, error);
  document.dispatchEvent(new CustomEvent('club:error', { detail: { name, message } }));
}
export async function start(name, factory) {
  if (features.has(name)) return features.get(name);
  const pending = Promise.resolve().then(factory).then(api => {
    features.set(name, api || { ready: true });
    return api;
  }).catch(error => { features.delete(name); report(name, error); throw error; });
  features.set(name, pending);
  return pending;
}
const cssJobs = new Map();
export function loadCSS(url) {
  if (cssJobs.has(url)) return cssJobs.get(url);
  const job = new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = url;
    const timer = setTimeout(() => { link.remove(); cssJobs.delete(url); reject(new Error('Stylesheet timeout')); }, 15000);
    link.onload = () => { clearTimeout(timer); resolve(); };
    link.onerror = () => { clearTimeout(timer); link.remove(); cssJobs.delete(url); reject(new Error('Stylesheet failed to load')); };
    document.head.append(link);
  });
  cssJobs.set(url, job); return job;
}
export function near(element, callback, margin = '600px') {
  if (!element) return () => {};
  if (!('IntersectionObserver' in window)) { callback(); return () => {}; }
  const observer = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { observer.disconnect(); callback(); }
  }, { rootMargin: margin });
  observer.observe(element); return () => observer.disconnect();
}
export function rafThrottle(callback) {
  let frame = 0, args;
  const schedule = (...values) => {
    args = values;
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; callback(...args); });
  };
  schedule.cancel = () => { cancelAnimationFrame(frame); frame = 0; };
  return schedule;
}
export function emit(type, detail) { document.dispatchEvent(new CustomEvent(type, { detail })); }
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
