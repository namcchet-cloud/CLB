/** Offline pre-deploy validation. It does not claim to test Spotify playback. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const version = JSON.parse(fs.readFileSync(path.join(root, 'release.json'))).version;
const failures = []; let checks = 0;
function check(ok, label) { checks++; if (!ok) failures.push(label); }
function walk(dir) { return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]); }
const files = walk(root), scripts = files.filter(p => /\.(?:mjs|js)$/.test(p) && !p.includes('/tests/'));
function reference(source, rel, cache = false) {
  if (/^(?:data:|https?:|mailto:|tel:|#)/.test(rel)) return;
  const [bare, query] = rel.split('?');
  const resolved = path.resolve(path.dirname(source), decodeURIComponent(bare.split('#')[0]));
  check(resolved.startsWith(root + path.sep) && fs.existsSync(resolved), `${path.relative(root,source)}: missing ${rel}`);
  if (cache) check(new URLSearchParams(query).get('v') === version, `Unstamped import ${path.relative(root,source)} -> ${rel}`);
}
for (const p of scripts) {
  const c = spawnSync(process.execPath, ['--check',p], {encoding:'utf8'}); check(c.status === 0, `JavaScript syntax: ${path.relative(root,p)} ${c.stderr || ''}`);
  if (p.includes('/js/')) for (const m of fs.readFileSync(p,'utf8').matchAll(/["'](\.{1,2}\/[^"']+?\.(?:js|css)(?:\?[^"']*)?)["']/g)) reference(p,m[1],true);
}
const htmlPath = path.join(root,'index.html'), html = fs.readFileSync(htmlPath,'utf8');
for (const m of html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) reference(htmlPath,m[1],!m[1].startsWith('http') && /\.(?:css|js)(?:\?|$)/.test(m[1]));
for (const m of html.matchAll(/\bsrcset=["']([^"']+)["']/g)) for (const variant of m[1].split(',')) reference(htmlPath,variant.trim().split(/\s+/)[0]);
const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map(m=>m[1]); check(ids.length===new Set(ids).size,'Duplicate HTML ids');
check(html.includes(`data-build="${version}"`),'HTML version');
check(fs.readFileSync(path.join(root,'js/core/build.js'),'utf8').includes(JSON.stringify(version)),'JS build version');
check(!/\b(?:src|href)=["'](?:\.\/)?(?:script\.js|style\.css|music\.css|js\/music-v3\.js)/.test(html),'Old runtime is still referenced');
for (const css of files.filter(p=>p.endsWith('.css'))) for (const m of fs.readFileSync(css,'utf8').matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) reference(css,m[1]);
const sandbox={window:{}}; vm.runInNewContext(fs.readFileSync(path.join(root,'content.js'),'utf8'),sandbox,{timeout:1000});
const data=sandbox.window.CLUB_CONTENT;
for (const key of ['artists','artworks','records']) {
  check(Array.isArray(data[key]),`${key} array`);
  const values=data[key].map(x=>x.id);check(values.every(Boolean)&&new Set(values).size===values.length,`${key}: unique nonempty ids`);
}
for (const a of data.artworks) { check(data.artists.some(x=>x.id===a.artistId),`Unknown author ${a.id}`); reference(path.join(root,'content.js'),a.image); if(a.thumb)reference(path.join(root,'content.js'),a.thumb); }
for (const r of data.records) { reference(path.join(root,'content.js'),r.image);check(/^spotify:(playlist|album|track):[A-Za-z0-9]+$/.test(r.uri),`Spotify URI ${r.id}`);check(/^https:\/\/open\.spotify\.com\//.test(r.spotifyUrl),`Spotify link ${r.id}`); }
const images=JSON.parse(fs.readFileSync(path.join(root,'assets/image-manifest.json')));
for (const [original,entry] of Object.entries(images)) { reference(path.join(root,'index.html'),original);for(const variant of entry.variants)reference(path.join(root,'index.html'),variant.src); }
check(!files.some(p=>/\.(?:woff2?|ttf|otf|eot)$/i.test(p)),'No font files may be distributed');
const report={version,checks,passed:checks-failures.length,failures,scope:'Syntax, content ids, imports, assets and version consistency. Not browser or authenticated audio testing.'};
console.log(JSON.stringify(report,null,2)); process.exitCode=failures.length?1:0;
