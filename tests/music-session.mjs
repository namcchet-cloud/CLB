import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Deterministic DOM/Spotify contract tests, not a claim of real audio playback.
class Element {
  constructor(tag = 'div') {
    this.tagName = tag; this.children = []; this.dataset = {}; this.style = {};
    this.attrs = {}; this.listeners = {}; this.className = ''; this.hidden = false;
    this.classList = {
      contains: c => this.className.split(' ').includes(c),
      add: (...cs) => { this.className = [...new Set(this.className.split(' ').concat(cs))].join(' ').trim(); },
      remove: (...cs) => { this.className = this.className.split(' ').filter(c => !cs.includes(c)).join(' '); },
      toggle: (c, on) => { if (on ?? !this.classList.contains(c)) this.classList.add(c); else this.classList.remove(c); }
    };
  }
  append(...nodes) { nodes.forEach(n => { n.remove(); n.parent = this; this.children.push(n); }); }
  insertBefore(node, before) { node.remove(); node.parent = this; this.children.splice(Math.max(0, this.children.indexOf(before)), 0, node); }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter(n => n !== this); this.parent = null; }
  replaceChildren(...nodes) { this.children.forEach(n => { n.parent = null; }); this.children = []; this.append(...nodes); }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  getAttribute(k) { return this.attrs[k] ?? null; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(k, fn) { this.listeners[k] = fn; }
  querySelector(selector) {
    for (const node of this.children) {
      if (selector[0] === '.' ? node.classList.contains(selector.slice(1)) : node.tagName === selector) return node;
      const found = node.querySelector(selector); if (found) return found;
    }
    return null;
  }
  getBoundingClientRect() { return { left: 0, top: 0, width: 200, height: 200, bottom: 200 }; }
  scrollIntoView() { this.scrolled = true; }
  focus() { this.focused = true; }
}
function environment({ delayed = false } = {}) {
  let now = 0, serial = 0;
  const timers = new Map(), players = [], callbacks = [], events = [], modes = [], nodes = new Map();
  const api = { createController(host, options, callback) {
    const iframe = new Element('iframe'); host.append(iframe);
    const listeners = {};
    const c = { options, calls: [], addListener(k, fn) { listeners[k] = fn; },
      resume() { this.calls.push('resume'); }, pause() { this.calls.push('pause'); },
      destroy() { this.destroyed = true; iframe.remove(); },
      emit(k, data = {}) { listeners[k]?.({ data }); }
    };
    players.push(c); callbacks.push(() => callback(c));
    if (!delayed) callback(c);
  } };
  const document = {
    head: new Element('head'), body: new Element('body'),
    documentElement: { lang: 'vi', dataset: { motion: 'off' } }, hidden: false,
    createElement: tag => new Element(tag), addEventListener() {},
    getElementById(id) { if (!nodes.has(id)) nodes.set(id, new Element()); return nodes.get(id); }
  };
  const window = { SpotifyIframeApi: api, addEventListener() {} };
  const context = vm.createContext({
    document, window, URL, console, MutationObserver: class { observe() {} disconnect() {} },
    setTimeout(fn, ms) { const id = ++serial; timers.set(id, { at: now + ms, fn }); return id; },
    clearTimeout(id) { timers.delete(id); }, performance: { now: () => now },
    requestAnimationFrame() { return 1; }, cancelAnimationFrame() {}, AbortController
  });
  async function module(path) {
    return new vm.SourceTextModule(readFileSync(new URL(path, import.meta.url), 'utf8'), { context });
  }
  function advance(ms) {
    now += ms;
    for (const [id, timer] of [...timers]) if (timer.at <= now) { timers.delete(id); timer.fn(); }
  }
  return { context, document, window, nodes, players, callbacks, events, modes, module, advance, timers };
}
const records = [
  { id: 'a', uri: 'spotify:playlist:ABC123', spotifyUrl: 'https://open.spotify.com/playlist/ABC123', name: 'Album A' },
  { id: 'b', uri: 'spotify:playlist:DEF456', spotifyUrl: 'https://open.spotify.com/playlist/DEF456', name: 'Album B' }
];
async function setup(options) {
  const e = environment(options), m = await e.module('../js/features/music/spotify.js');
  await m.link(() => {}); await m.evaluate();
  const mount = new Element();
  e.transport = m.namespace.createSpotify(mount, (...args) => e.events.push(args), mode => e.modes.push(mode));
  e.mount = mount; e.spotifyModule = m;
  return e;
}
async function check(name, test) { await test(); console.log('PASS ' + name); }
await check('selection exposes player before record placement; one session per album', async () => {
  const e = await setup(); await e.transport.ensure(records[0]); await e.transport.prepare(records[0]);
  assert.equal(e.mount.hidden, false); assert.equal(e.players.length, 1);
  e.players[0].emit('ready'); assert.equal(e.transport.controllable, true);
  assert.equal(e.transport.command(true), true);
  assert.deepEqual(e.players[0].calls, ['resume']);
  assert.equal(e.events.length, 0); assert.equal(e.transport.pending, true);
  e.players[0].emit('playback_update', { isPaused: true });
  assert.equal(e.transport.pending, true);
  e.players[0].emit('playback_started'); assert.equal(e.transport.pending, false);
  e.transport.command(false); e.players[0].emit('playback_update', { isPaused: true });
  assert.equal(e.transport.pending, false);
  e.transport.destroy(); assert.equal(e.timers.size, 0);
});
await check('ignored command leads to direct controls, never an automatic retry', async () => {
  const e = await setup(); await e.transport.ensure(records[0]); e.players[0].emit('ready');
  e.transport.command(true); e.advance(2501);
  assert.equal(e.transport.pending, false); assert.equal(e.transport.mode, 'gesture');
  assert.equal(e.mount.scrolled, true); assert.deepEqual(e.players[0].calls, ['resume']);
  e.transport.destroy();
});
await check('stale controllers and delayed callbacks cannot take over new selection', async () => {
  const e = await setup({ delayed: true });
  await e.transport.ensure(records[0]); await e.transport.ensure(records[1]);
  e.callbacks[0](); assert.equal(e.players[0].destroyed, true);
  e.callbacks[1](); e.players[1].emit('ready');
  e.players[0].emit('playback_started'); assert.equal(e.events.length, 0);
  e.players[1].emit('playback_started'); assert.equal(e.events[0][1], 'b');
  e.transport.destroy();
});
await check('slow controller survives timeout and late native playback stays synchronised', async () => {
  const e = await setup(); await e.transport.ensure(records[0]); e.advance(10001);
  assert.equal(e.transport.mode, 'delayed'); assert.equal(e.players[0].destroyed, undefined);
  assert.equal(e.players.length, 1);
  e.players[0].emit('playback_started'); assert.equal(e.transport.controllable, true);
  assert.equal(e.events[0][0].isPaused, false);
  await e.transport.retry(); e.players[1].emit('ready');
  assert.equal(e.transport.controllable, true);
  e.transport.deactivate(); assert.equal(e.mount.children.length, 0); assert.equal(e.timers.size, 0);
});
await check('synchronous playback callback does not leave a stuck pending command', async () => {
  const e = await setup(); await e.transport.ensure(records[0]); const c = e.players[0];
  c.emit('ready'); c.resume = () => c.emit('playback_started');
  e.transport.command(true); assert.equal(e.transport.pending, false); assert.equal(e.timers.size, 0);
  e.transport.destroy();
});
await check('API script timeout reports error; late API reconnects without a blind iframe', async () => {
  const e = await setup(); delete e.window.SpotifyIframeApi;
  const job = e.transport.ensure(records[0]); e.advance(6001); await job;
  assert.equal(e.transport.mode, 'error');
  assert.equal(e.mount.querySelector('iframe'), null);
  const other = environment();
  e.window.onSpotifyIframeApiReady(other.window.SpotifyIframeApi);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(other.players.length, 1);
  other.players[0].emit('playback_started');
  assert.equal(e.transport.mode, 'playing');
  assert.equal(e.events[0][0].isPaused, false);
  e.transport.destroy(); assert.equal(e.timers.size, 0);
});
await check('partial playback updates preserve buffering until explicitly cleared and reset each track', async () => {
  const e = await setup(); await e.transport.ensure(records[0]); const c=e.players[0];
  c.emit('playback_update', {playingURI:'spotify:track:ONE',isPaused:false,isBuffering:true,duration:200000,position:10000});
  c.emit('playback_update', {position:11000});
  assert.equal(e.events.at(-1)[0].isBuffering,true);
  assert.equal(e.events.at(-1)[0].duration,200000);
  c.emit('playback_update', {isBuffering:false});
  assert.equal(e.transport.mode,'playing');
  c.emit('playback_started', {playingURI:'spotify:track:TWO'});
  assert.equal(e.events.at(-1)[0].position,0);
  assert.equal(e.events.at(-1)[0].duration,0);
  e.transport.destroy();
});
await check('invalid source shows error without mounting a foreign iframe', async () => {
  const e = await setup();
  await e.transport.ensure({ id: 'bad', spotifyUrl: 'https://example.org/not-spotify' });
  assert.equal(e.transport.mode, 'error'); assert.equal(e.mount.children.length, 0);
  e.transport.destroy();
});
await check('real UI binding: native playback auto-places disc and follows pause', async () => {
  const e = await setup(), get = id => e.document.getElementById(id);
  get('mv3Play').append(new Element('span'), new Element('b'));
  const signal = new Element(); signal.className = 'mv3-signal-text'; get('mv3Turntable').append(signal);
  const m = await e.module('../js/features/music/index.js');
  await m.link(async specifier => {
    if (specifier.includes('spotify.js')) return e.spotifyModule;
    const values = specifier.includes('motor.js') ? { createMotor(deck, state, surface, change) {
      return { setPlaying(on) { state.playing = on; change(on); }, progress(n) { state.trackProgress = n; },
        park() { state.playing = false; return Promise.resolve(); } };
    } } : specifier.includes('i18n.js') ? { local: s => s || '' } :
      specifier.includes('images.js') ? { setImage() {} } : { clamp: (v, min, max) => Math.min(max, Math.max(min, v)) };
    return new vm.SyntheticModule(Object.keys(values), function () {
      for (const [key, value] of Object.entries(values)) this.setExport(key, value);
    }, { context: e.context });
  });
  await m.evaluate(); const ui = m.namespace.initMusic({ records });
  await new Promise(resolve => setImmediate(resolve));
  const c = e.players[0]; c.emit('ready');
  assert.equal(ui.state.phase, 'IN_SLEEVE'); assert.equal(get('mv3Play').disabled, false);
  get('mv3Play').listeners.click(); assert.deepEqual(c.calls, ['resume']);
  c.emit('playback_started');
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(ui.state.phase, 'ON_TURNTABLE'); assert.equal(ui.state.playing, true);
  c.emit('playback_update', { isPaused: true }); assert.equal(ui.state.playing, false);
  await ui.select('b'); await new Promise(resolve => setImmediate(resolve));
  assert.equal(ui.state.selectedId, 'b'); assert.equal(c.destroyed, true);
  c.emit('playback_started'); assert.equal(ui.state.playing, false);
  e.players[1].emit('ready'); e.players[1].emit('playback_started');
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(ui.state.loadedId, 'b'); assert.equal(ui.state.playing, true);
  await ui.returnLoaded(); assert.equal(ui.state.playing, false);
});
