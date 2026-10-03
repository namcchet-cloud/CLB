import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright', {
  paths: [process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || process.cwd()]
}));
const root = resolve(import.meta.dirname, '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  const path = resolve(root, '.' + new URL(req.url, 'http://localhost').pathname.replace(/\/$/, '/index.html'));
  if (!path.startsWith(root + '/')) { res.writeHead(403).end(); return; }
  try { res.setHeader('Content-Type', mime[extname(path)] || 'application/octet-stream'); res.end(await readFile(path)); }
  catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
try { browser = await chromium.launch({ headless: true }); }
catch (error) { await new Promise(r => server.close(r)); throw error; }
const failures = [];
async function wait(page, predicate, argument, { timeout = 10000 } = {}) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (await page.evaluate(predicate, argument)) return;
    await page.waitForTimeout(50);
  }
  throw new Error(`Condition timed out: ${predicate}`);
}
const mock = `window.__players=[];window.onSpotifyIframeApiReady({createController(host,options,callback){
  const listeners={};const iframe=document.createElement('iframe');host.append(iframe);
  const c={listeners,iframe,addListener(k,fn){listeners[k]=fn},
    play(){window.__commands.push('play')},pause(){window.__commands.push('pause')},
    destroy(){iframe.remove()},loadUri(){},emit(k,data){listeners[k]?.({data})}};
  window.__players.push(c);callback(c);
  if(!window.__stall) setTimeout(()=>c.emit('ready',{}),20);
}});`;
async function open(width = 1280, stall = false) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: 'block' });
  const page = await context.newPage();
  page.on('pageerror', e => failures.push(e.message));
  await page.addInitScript(({ stall }) => { window.__stall = stall; window.__commands = []; try { localStorage.setItem('artclub-motion-v23', 'off'); } catch {} }, { stall });
  await page.route('**/*', route => {
    if (route.request().url().includes('iframe-api/v1')) return route.fulfill({ contentType: 'text/javascript', body: mock });
    if (!route.request().url().startsWith(origin)) return route.abort();
    return route.continue();
  });
  await page.goto(origin);
  await wait(page, () => Boolean(window.ClubMusicV4));
  return { page, context };
}
async function check(name, fn) {
  try { await fn(); console.log(`PASS ${name}`); }
  catch (e) { failures.push(`${name}: ${e.stack}`); console.error(`FAIL ${name}: ${e.message}`); }
}
try {
  await check('play/pause confirmation, watchdog and return/place cycle', async () => {
    const { page, context } = await open();
    await wait(page, () => document.getElementById('mv3Spotify').dataset.spotifyMode === 'ready');
    assert.equal(await page.evaluate(() => window.ClubMusicV4.state.phase), 'IN_SLEEVE');
    await page.locator('#mv3Play').click();
    await page.evaluate(() => window.__players[0].emit('playback_update', { isPaused: true }));
    assert.equal(await page.locator('#mv3Play').getAttribute('aria-busy'), 'true');
    await wait(page, () => document.getElementById('mv3Spotify').classList.contains('is-needs-gesture'));
    assert.equal(await page.locator('#mv3Play').isEnabled(), true);
    await page.locator('#mv3Play').click();
    await page.evaluate(() => window.__players[0].emit('playback_started', {}));
    await wait(page, () => window.ClubMusicV4.state.playing);
    assert.equal(await page.locator('#mv3Play').isEnabled(), true);
    assert.equal(await page.evaluate(() => window.ClubMusicV4.state.playing), true);
    const angle = await page.evaluate(() => window.ClubMusicV4.state.spinAngle);
    await wait(page, a => Math.abs(window.ClubMusicV4.state.spinAngle - a) > 5, angle);
    await page.locator('#mv3Play').click();
    await page.evaluate(() => window.__players[0].emit('playback_update', { isPaused: true }));
    assert.equal(await page.locator('#mv3Play').isEnabled(), true);
    await page.evaluate(() => window.ClubMusicV4.returnLoaded());
    assert.equal(await page.locator('#mv3QuickPlace').isEnabled(), true);
    await page.locator('#mv3QuickPlace').click({ force: true });
    await wait(page, () => document.getElementById('mv3Spotify').dataset.spotifyMode === 'ready');
    await page.evaluate(() => window.__players[0].emit('playback_started', {}));
    assert.equal(await page.evaluate(() => window.ClubMusicV4.state.playing), false);
    await context.close();
  });
  await check('controller readiness timeout and fallback teardown', async () => {
    const { page, context } = await open(390, true);
    await page.locator('#mv3QuickPlace').click();
    await wait(page, () => document.getElementById('mv3Spotify').dataset.spotifyMode === 'embed', null, { timeout: 12000 });
    assert.equal(await page.locator('#mv3Play').isEnabled(), true);
    await page.locator('#mv3Play').click();
    assert.equal(await page.evaluate(() => window.ClubMusicV4.state.playing), false);
    const oldFrame = await page.locator('#mv3Spotify iframe').elementHandle();
    await page.evaluate(() => window.ClubMusicV4.returnLoaded());
    assert.equal(await oldFrame.evaluate(el => el.isConnected), false);
    await context.close();
  });
  await mkdir('/tmp/clb-qa', { recursive: true });
  await check('pointer placement and keyboard album change', async () => {
    const { page, context } = await open();
    const disc = page.locator('.mv3-album.is-selected .mv3-disc');
    await disc.scrollIntoViewIfNeeded();
    const source = await disc.boundingBox();
    const target = await page.locator('#mv3DropZone').boundingBox();
    const x = source.x + source.width - 12, y = source.y + source.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(target.x + target.width / 2 + source.width / 2 - 12, target.y + target.height / 2, { steps: 15 });
    await page.mouse.up();
    await wait(page, () => window.ClubMusicV4.state.phase === 'ON_TURNTABLE');
    assert.equal(await page.locator('#mv3Platter .mv3-disc').count(), 1);
    await page.locator('.mv3-cover-button').nth(1).click();
    await wait(page, () => window.ClubMusicV4.state.phase === 'IN_SLEEVE');
    await page.locator('.mv3-album.is-selected .mv3-disc').focus();
    await page.keyboard.press('Enter');
    await wait(page, () => window.ClubMusicV4.state.phase === 'ON_TURNTABLE');
    assert.equal(await page.evaluate(() => window.ClubMusicV4.state.loadedId === window.CLUB_CONTENT.records[1].id), true);
    await context.close();
  });
  await check('gallery lightbox, language, keyboard focus and effect cancellation', async () => {
    const { page, context } = await open(390);
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.locator('.gallery-card[data-index]').first().click();
    assert.equal(await page.locator('#lightbox').evaluate(el => el.open), true);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('body').evaluate(el => el.classList.contains('no-scroll')), false);
    assert.equal(await page.evaluate(() => document.activeElement.matches('.gallery-card')), true);
    await page.locator('.lang-toggle').click();
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    await page.locator('.gallery-page-arrow').last().click();
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-current')), 'page');
    await page.evaluate(() => {
      window.__stopped = 0;
      window.ClubRaven = { stop() { window.__stopped++; } };
      window.ClubMotion.setChoice('quiet');
    });
    assert.equal(await page.evaluate(() => window.__stopped > 0), true);
    await context.close();
  });
  for (const width of [360, 390, 768, 1280]) await check(`layout and quiet motion ${width}px`, async () => {
    const { page, context } = await open(width);
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.locator('.artist-chip').first().waitFor();
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const collisions = await page.evaluate(() => {
      const hits = [];
      for (const icon of document.querySelectorAll('.cd-icon')) {
        const a = icon.getBoundingClientRect();
        if (!a.width || !a.height) continue;
        for (const el of icon.closest('section').querySelectorAll('h1,h2,h3,p,button,.section-label,.contact-list a')) {
          const b = el.getBoundingClientRect();
          if (b.width && b.height && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) hits.push(`${icon.closest('section').id}:${icon.className}:${el.tagName}`);
        }
      }
      return hits;
    });
    assert.deepEqual(collisions, []);
    await page.evaluate(() => window.ClubMotion.setChoice('quiet'));
    assert.equal(await page.locator('.cd-icon').first().evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.evaluate(async () => {
      for (const image of document.images) image.loading = 'eager';
      await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
      scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.screenshot({ path: `/tmp/clb-qa/page-${width}.png`, fullPage: true });
    await page.locator('.gallery-card[data-index]').first().scrollIntoViewIfNeeded();
    assert.equal(await page.locator('.gallery-card[data-index]>img').first().evaluate(el => el.naturalWidth > 0), true);
    await page.screenshot({ path: `/tmp/clb-qa/gallery-${width}.png` });
    await page.locator('#playlist').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/clb-qa/music-${width}.png` });
    await context.close();
  });
  assert.deepEqual(failures, []);
} finally {
  await browser.close();
  await new Promise(r => server.close(r));
}
