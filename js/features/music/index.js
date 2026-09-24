import { createMotor } from './motor.js?v=7.0.9';
import { createSpotify } from './spotify.js?v=7.0.9';
import { local } from '../../core/i18n.js?v=7.0.9';
import { setImage } from '../../core/images.js?v=7.0.9';
import { clamp } from '../../core/runtime.js?v=7.0.9';

/** A single real record node travels from its sleeve to the platter and back. */
export function initMusic(content) {
  const records = content.records || [], $ = id => document.getElementById(id);
  const room = $('playlist'), albums = $('mv3Albums'), platter = $('mv3Platter');
  const drop = $('mv3DropZone'), deck = $('mv3Turntable'), play = $('mv3Play'), quick = $('mv3QuickPlace');
  const status = $('mv3Status'), spotifyMount = $('mv3Spotify');
  if (!records.length) { status.textContent = 'Chưa có playlist.'; return {}; }
  const state = { selectedId: records[0].id, loadedId: null, phase: 'IN_SLEEVE', playing: false,
    trackProgress: 0, spinAngle: 0, spinVelocity: 0, armAngle: -6, armMode: 'REST', currentURI: '' };
  const nodes = new Map(), record = id => records.find(r => r.id === id);
  let drag = null, dragFrame = 0, animation = null, returning = null, latestSelection = null;
  let requestTimer = 0, commandPending = false, pendingCommand = null, message = 'drag';
  const en = () => document.documentElement.lang === 'en';
  const strings = {
    choose: ['Chọn album', 'Choose album'], selected: ['Đang chọn', 'Selected'],
    empty: ['Chưa có đĩa trên mâm', 'No record on the platter'],
    drag: ['Giữ phần đĩa đang ló ra và kéo lên mâm.', 'Hold the exposed record and drag it onto the platter.'],
    ready: ['Đĩa đã vào mâm. Nhấn Phát nhạc.', 'Record placed. Press Play.'],
    returning: ['Đang nhấc kim và trả đĩa về bìa…', 'Lifting the stylus and returning the record…'],
    miss: ['Đĩa đã trở về bìa. Thả gần mâm để đặt lại.', 'Record returned. Drop it near the platter to place it.'],
    connecting: ['Đang kết nối Spotify…', 'Connecting to Spotify…'],
    readyAgain: ['Spotify đã sẵn sàng. Nhấn Phát nhạc lần nữa.', 'Spotify is ready. Press Play music once more.'],
    fallback: ['Đã mở trình phát Spotify gốc. Nếu nút trên mâm chưa phát, hãy bấm ▶ trong khung Spotify.', 'The native Spotify player is ready. If the deck button cannot start playback, press ▶ inside the Spotify player.'],
    error: ['Không tải được Spotify. Hãy kiểm tra mạng hoặc mở Spotify ↗.', 'Spotify could not load. Check your connection or open Spotify ↗.'],
    gesture: ['Trình duyệt đang chặn phát tự động. Hãy bấm ▶ trong khung Spotify bên dưới.', 'Your browser blocked programmatic playback. Press ▶ inside the Spotify player below.'],
    playing: ['Đang phát · 33⅓ RPM', 'Playing · 33⅓ RPM'],
    buffering: ['Spotify đang tải nhạc…', 'Spotify is buffering…'],
    play: ['Phát nhạc', 'Play music'], pause: ['Tạm dừng', 'Pause'],
    quickPlace: ['Đặt đĩa lên mâm', 'Place record on platter'], quickReturn: ['Trả đĩa về bìa', 'Return record to sleeve'],
    help: ['① Bấm bìa để chọn · ② Kéo đĩa lên mâm · ③ Nhấn Phát nhạc.', '① Select a cover · ② Drag the record onto the platter · ③ Press Play.']
  };
  const t = key => strings[key]?.[en() ? 1 : 0] || key;
  function setStatus(key) { message = key; status.textContent = t(key); }
  function clearRequest() { clearTimeout(requestTimer); requestTimer = 0; commandPending = false; pendingCommand = null; play.removeAttribute('aria-busy'); }
  const motor = createMotor(deck, state, () => state.loadedId ? nodes.get(state.loadedId)?.surface : null, on => {
    play.querySelector('b').textContent = t(on ? 'pause' : 'play');
    play.querySelector('span').textContent = on ? 'Ⅱ' : '▶';
    deck.querySelector('.mv3-signal-text').textContent = on ? '33⅓ RPM' : (en() ? 'READY' : 'CHỜ PHÁT');
    setStatus(on ? 'playing' : state.loadedId ? 'ready' : 'empty');
  });
  const transport = createSpotify(spotifyMount, (data, id) => {
    if (id !== state.loadedId || state.phase !== 'ON_TURNTABLE') return;
    const changed = data.playingURI && state.currentURI && data.playingURI !== state.currentURI;
    if (data.playingURI) state.currentURI = data.playingURI;
    if (data.type === 'started') {
      clearRequest();
      if (changed) motor.progress(0);
      motor.setPlaying(true);
      return;
    }
    if (Number(data.duration) > 0) motor.progress(clamp(Number(data.position) / Number(data.duration), 0, 1));
    if (typeof data.isPaused === 'boolean') {
      clearRequest();
      // Buffering is a network state, not a turntable state: the platter should
      // keep rotating until Spotify actually reports pause.
      motor.setPlaying(!data.isPaused);
      if (data.isBuffering && !data.isPaused) setStatus('buffering');
    } else if (data.isBuffering) setStatus('buffering');
  }, key => { if (state.loadedId && !(commandPending && key === 'ready')) setStatus(key); });
  function meta() {
    const r = record(state.loadedId);
    $('mv3NowLabel').textContent = t(r ? 'selected' : 'empty');
    $('mv3NowTitle').textContent = r ? local(r.name) : '—';
    $('mv3SpotifyLink').href = (r || record(state.selectedId)).spotifyUrl;
    $('mv3LibraryTitle').textContent = t('choose'); $('mv3Help').textContent = t('help');
    play.querySelector('b').textContent = t(state.playing ? 'pause' : 'play');
    status.textContent = t(message);
    deck.querySelector('.mv3-signal-text').textContent = state.playing ? '33⅓ RPM' : (en() ? 'READY' : 'CHỜ PHÁT');
  }
  function sync() {
    for (const [id, n] of nodes) {
      const selected = id === state.selectedId, r = record(id);
      n.wrap.classList.toggle('is-selected', selected);
      n.disc.classList.toggle('is-enabled', selected || id === state.loadedId);
      n.disc.tabIndex = selected ? 0 : -1;
      n.button.setAttribute('aria-pressed', String(selected));
      n.button.setAttribute('aria-label', `${t('choose')}: ${local(r.name)}`);
      n.disc.setAttribute('aria-label', `${local(r.name)} — ${en() ? 'drag onto platter, or press Enter' : 'kéo lên mâm, hoặc nhấn Enter'}`);
      n.name.textContent = local(r.name); n.title.textContent = local(r.name);
      n.caption.textContent = local(r.caption); n.tag.textContent = t('selected');
    }
    play.disabled = !state.loadedId || state.phase !== 'ON_TURNTABLE';
    if (quick) {
      quick.textContent = t(state.loadedId ? 'quickReturn' : 'quickPlace');
      quick.setAttribute('aria-label', quick.textContent);
      quick.disabled = Boolean(drag || returning) || ['SETTLING', 'RETURNING', 'DRAGGING'].includes(state.phase);
    }
    meta();
  }
  function createAlbum(r) {
    const wrap = document.createElement('article'); wrap.className = 'mv3-album'; wrap.dataset.record = r.id; wrap.dataset.theme = r.theme;
    const visual = document.createElement('div'); visual.className = 'mv3-album-visual';
    const button = document.createElement('button'); button.type = 'button'; button.className = 'mv3-cover-button'; button.dataset.chooseRecord = r.id;
    const cover = document.createElement('span'); cover.className = 'mv3-cover';
    const ci = document.createElement('img'); ci.alt = ''; setImage(ci, r.image, { width: 540, sizes: '(max-width:980px) 235px, 269px' }); cover.append(ci);
    const title = document.createElement('span'); title.className = 'mv3-cover-title';
    const tag = document.createElement('span'); tag.className = 'mv3-selected-tag'; button.append(cover, title, tag);
    const disc = document.createElement('div'); disc.className = 'mv3-disc'; disc.dataset.record = r.id; disc.dataset.theme = r.theme;
    disc.setAttribute('role', 'button'); disc.tabIndex = 0;
    const surface = document.createElement('span'); surface.className = 'mv3-disc-surface';
    const label = document.createElement('span'); label.className = 'mv3-disc-label';
    const li = document.createElement('img'); li.alt = ''; setImage(li, r.image, { width: 160, sizes: '96px' });
    label.append(li); surface.append(label); disc.append(surface);
    const name = document.createElement('h4'); name.className = 'mv3-name';
    const caption = document.createElement('p'); caption.className = 'mv3-caption';
    visual.append(disc, button); wrap.append(visual, name, caption); albums.append(wrap);
    nodes.set(r.id, { wrap, visual, button, disc, surface, name, caption, title, tag });
    disc.addEventListener('pointerdown', e => beginDrag(e, r.id));
    disc.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && r.id === state.selectedId && state.phase === 'IN_SLEEVE') {
        e.preventDefault(); place(r.id);
      }
    });
  }
  albums.replaceChildren(); records.forEach(createAlbum);
  // The sleeve is a click target only. Native browser image-drag is always disabled.
  albums.addEventListener('dragstart', e => e.preventDefault());
  albums.addEventListener('click', e => { const b = e.target.closest('[data-choose-record]'); if (b) select(b.dataset.chooseRecord); });
  const center = r => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  function accepts(x, y) {
    const r = drop.getBoundingClientRect(), c = center(r);
    return Math.hypot(x - c.x, y - c.y) <= Math.max(r.width * .92, 140);
  }
  function home(id) {
    const n = nodes.get(id);
    n.disc.classList.remove('is-on-deck', 'is-dragging'); n.disc.style.cssText = ''; n.surface.style.transform = '';
    n.visual.insertBefore(n.disc, n.button);
  }
  async function relocate(id, target, onDeck) {
    const n = nodes.get(id), disc = n.disc, first = disc.getBoundingClientRect();
    if (onDeck) target.append(disc); else target.insertBefore(disc, n.button);
    disc.classList.remove('is-dragging'); disc.classList.toggle('is-on-deck', onDeck); disc.style.cssText = '';
    const last = disc.getBoundingClientRect();
    if (!disc.animate || document.hidden || document.documentElement.dataset.motion === 'off') return;
    const a = disc.animate([
      { transform: `translate(${first.left - last.left}px,${first.top - last.top}px) scale(${first.width / Math.max(1, last.width)})` },
      { transform: 'translate(0,0) scale(1)' }
    ], { duration: 540, easing: 'cubic-bezier(.16,.86,.18,1)' });
    animation = a;
    try { await a.finished; } catch {} finally { if (animation === a) animation = null; }
  }
  async function returnLoaded() {
    if (returning) return returning;
    if (!state.loadedId) return;
    const id = state.loadedId;
    state.phase = 'RETURNING'; clearRequest(); transport.destroy(); setStatus('returning'); sync();
    returning = (async () => {
      await motor.park();
      // Keep the record on its spindle until the stylus has cleared it.
      state.loadedId = null; deck.classList.remove('is-loaded');
      await relocate(id, nodes.get(id).visual, false); home(id);
      state.trackProgress = 0; state.currentURI = ''; state.phase = 'IN_SLEEVE';
      sync();
    })().finally(() => { returning = null; });
    return returning;
  }
  async function select(id) {
    if (!nodes.has(id)) return;
    latestSelection = id;
    if (drag || state.phase === 'SETTLING') return;
    if (state.loadedId && id !== state.loadedId) await returnLoaded();
    if (returning) await returning;
    state.selectedId = latestSelection; sync();
    if (!state.loadedId) setStatus('drag');
  }
  async function place(id) {
    if (state.phase === 'SETTLING' || returning) return;
    if (state.loadedId && state.loadedId !== id) await returnLoaded();
    state.phase = 'SETTLING'; state.selectedId = id; sync();

    // Start Spotify while the record is physically travelling to the platter.
    // This gives mobile Safari/slow networks more time to create the official Embed
    // before the listener presses the deck Play button.
    const spotifyJob = transport.ensure(record(id)).catch(() => null);
    await relocate(id, platter, true);
    state.loadedId = id; state.phase = 'ON_TURNTABLE'; state.trackProgress = 0; state.currentURI = '';
    deck.classList.add('is-loaded'); sync();
    setStatus(transport.ready ? 'ready' : transport.fallback ? 'fallback' : 'connecting');
    spotifyJob.then(() => {
      if (state.loadedId !== id || state.phase !== 'ON_TURNTABLE') return;
      setStatus(transport.ready ? 'ready' : transport.fallback ? 'fallback' : 'connecting');
    });
    if (latestSelection && latestSelection !== id) select(latestSelection);
  }
  function beginDrag(event, id) {
    if (event.button !== undefined && event.button !== 0) return;
    if (id !== state.selectedId || drag || returning || !['IN_SLEEVE', 'ON_TURNTABLE'].includes(state.phase) || state.loadedId === id) return;
    const disc = nodes.get(id).disc, rect = disc.getBoundingClientRect();
    const abort = new AbortController();
    drag = { recordId: id, pointerId: event.pointerId, disc, abort, size: rect.width,
      offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top, x: event.clientX, y: event.clientY };
    state.phase = 'DRAGGING'; latestSelection = id;
    document.body.append(disc); disc.classList.add('is-dragging');
    Object.assign(disc.style, { width: rect.width + 'px', height: rect.height + 'px', left: rect.left + 'px', top: rect.top + 'px', right: 'auto', translate: 'none' });
    try { disc.setPointerCapture(event.pointerId); } catch {}
    const options = { passive: false, signal: abort.signal };
    window.addEventListener('pointermove', e => {
      if (e.pointerId !== drag?.pointerId) return;
      e.preventDefault(); drag.x = e.clientX; drag.y = e.clientY;
    }, options);
    window.addEventListener('pointerup', e => { if (e.pointerId === drag?.pointerId) finishDrag(false); }, options);
    window.addEventListener('pointercancel', e => { if (e.pointerId === drag?.pointerId) finishDrag(true); }, options);
    window.addEventListener('keydown', e => { if (e.key === 'Escape') finishDrag(true); }, { signal: abort.signal });
    setStatus('drag'); event.preventDefault(); dragFrame = requestAnimationFrame(dragTick);
  }
  function dragTick() {
    dragFrame = 0; const d = drag; if (!d) return;
    const left = d.x - d.offsetX, top = d.y - d.offsetY;
    const hot = accepts(left + d.size / 2, top + d.size / 2);
    d.disc.style.left = left + 'px'; d.disc.style.top = top + 'px'; deck.classList.toggle('is-hot', hot);
    // Mobile dragging can reach a deck below the fold without a second finger.
    const edge = 64;
    const dy = d.y > innerHeight - edge ? Math.min(10, (d.y - innerHeight + edge) / 5) : d.y < edge ? -Math.min(10, (edge - d.y) / 5) : 0;
    if (dy) window.scrollBy({ top: dy, behavior: 'instant' });
    dragFrame = requestAnimationFrame(dragTick);
  }
  async function finishDrag(cancelled) {
    const d = drag; if (!d) return;
    drag = null; d.abort.abort(); cancelAnimationFrame(dragFrame); dragFrame = 0;
    try { d.disc.releasePointerCapture(d.pointerId); } catch {}
    deck.classList.remove('is-hot');
    const valid = !cancelled && accepts(d.x - d.offsetX + d.size / 2, d.y - d.offsetY + d.size / 2);
    if (valid) { state.phase = state.loadedId ? 'ON_TURNTABLE' : 'IN_SLEEVE'; await place(d.recordId); }
    else {
      state.phase = 'RETURNING'; await relocate(d.recordId, nodes.get(d.recordId).visual, false); home(d.recordId);
      state.phase = state.loadedId ? 'ON_TURNTABLE' : 'IN_SLEEVE'; sync(); setStatus('miss');
      if (latestSelection && latestSelection !== state.selectedId) select(latestSelection);
    }
  }
  function togglePlay() {
    if (!state.loadedId || state.phase !== 'ON_TURNTABLE' || commandPending) return;
    const id = state.loadedId, wanted = !state.playing, before = state.playing;

    // If a controller already exists, issue the command inside the original
    // click/tap and let the mechanics respond immediately. Spotify events remain
    // authoritative: they confirm the state or roll the optimistic motion back.
    if (transport.controllable) {
      commandPending = true;
      pendingCommand = { id, wanted, before };
      play.setAttribute('aria-busy', 'true');
      const sent = transport.command(wanted);
      if (!sent) {
        clearRequest();
        setStatus(transport.fallback ? 'fallback' : transport.pending ? 'connecting' : 'gesture');
        transport.focus();
        return;
      }

      motor.setPlaying(wanted);
      setStatus(wanted ? 'buffering' : 'ready');
      requestTimer = setTimeout(() => {
        const pending = pendingCommand;
        if (!pending || pending.id !== id || pending.wanted !== wanted) return;
        clearRequest();
        if (id !== state.loadedId || state.phase !== 'ON_TURNTABLE') return;
        motor.setPlaying(pending.before);
        setStatus(transport.pending ? 'readyAgain' : 'gesture');
        transport.focus();
      }, 6000);
      return;
    }

    if (transport.fallback) {
      setStatus('fallback');
      transport.focus();
      return;
    }

    commandPending = true; play.setAttribute('aria-busy', 'true'); setStatus('connecting');
    transport.ensure(record(id)).then(() => {
      clearRequest();
      if (id !== state.loadedId || state.phase !== 'ON_TURNTABLE') return;
      if (transport.controllable) setStatus('readyAgain');
      else if (transport.fallback) { setStatus('fallback'); transport.focus(); }
      else setStatus('gesture');
    }).catch(error => {
      clearRequest();
      if (error?.name !== 'AbortError' && id === state.loadedId) setStatus('error');
    });
  }
  play.addEventListener('click', togglePlay);
  quick?.addEventListener('click', async () => {
    if (drag || returning || ['SETTLING', 'RETURNING', 'DRAGGING'].includes(state.phase)) return;
    if (state.loadedId) await returnLoaded();
    else await place(state.selectedId);
  });
  document.addEventListener('club:language', () => sync());
  document.addEventListener('visibilitychange', () => { if (document.hidden && drag) finishDrag(true); });
  window.addEventListener('pagehide', () => { if (drag) finishDrag(true); });
  window.addEventListener('resize', () => { if (drag) finishDrag(true); }, { passive: true });
  albums.setAttribute('aria-busy', 'false');
  sync(); setStatus('drag'); room.dataset.musicReady = 'true';
  const api = { state, select, returnLoaded, get animationActive() { return Boolean(dragFrame || animation || motor.runningFrame); },
    get motorVisible() { return motor.visible; }, get dragging() { return Boolean(drag); } };
  window.ClubMusicV4 = api;
  return api;
}
