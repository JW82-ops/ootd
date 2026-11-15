#!/usr/bin/env node
// Checks every city issue before it ships: required sections, icons, photos, links and English text.
// Run: node tools/check.js   (exits with code 1 when something is broken)
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const exists = (f) => fs.existsSync(path.join(root, f));

global.window = {};
eval(read('icons.js'));
eval(read('cities/index.js'));
const ICONS = window.ICONS;
const INDEX = window.CITY_INDEX;
const HANGUL = /[\uAC00-\uD7A3]/;
const NO_SPLIT = new Set(['q', 'eventsQuery', 'cover', 'img', 'url', 'hoodSvg']);
const SLOTS = new Set(['outer', 'top', 'belt', 'bottom', 'acc', 'bag', 'shoes']);
const errors = [], warnings = [];
const allText = {}; // korean -> { english: [city ids] }

function checkCity(meta) {
  const id = meta.id;
  const err = (m) => errors.push(id + ': ' + m);
  const warn = (m) => warnings.push(id + ': ' + m);
  const file = 'cities/' + id + '.js';
  if (!exists(file)) return err('missing ' + file);
  let c = null;
  window.OOTD_CITY = (cid, data) => { if (cid !== id) err('file registers "' + cid + '"'); c = data; };
  try { eval(read(file)); } catch (e) { return err('does not parse: ' + e.message); }
  if (!c) return err('file never calls OOTD_CITY');

  // --- text: every Korean string needs English after '||' ---
  const local = {};
  (function walk(o, at) {
    Object.keys(o).forEach((k) => {
      const v = o[k], here = at + '.' + k;
      if (NO_SPLIT.has(k)) return;
      if (typeof v === 'string') {
        if (!HANGUL.test(v)) return;
        const i = v.indexOf('||');
        if (i < 0) return err('no English for ' + here + ' "' + v.slice(0, 30) + '"');
        const ko = v.slice(0, i), en = v.slice(i + 2);
        if (!en.trim() || HANGUL.test(en)) return err('bad English for ' + here);
        if (local[ko] != null && local[ko] !== en) err('"' + ko + '" has two English versions: "' + local[ko] + '" / "' + en + '"');
        local[ko] = en;
        ((allText[ko] = allText[ko] || {})[en] = allText[ko][en] || []).push(id);
      } else if (v && typeof v === 'object') walk(v, here);
    });
  })(c, id);

  // --- required fields ---
  ['name', 'en', 'country', 'tz', 'currency', 'tagline', 'checked', 'nick', 'short', 'bandLabel', 'money', 'tools', 'boardArt', 'beautySub', 'beautyNote',
    'arriveTitle', 'arriveSub', 'arriveHead', 'arrivePick', 'eventsQuery', 'zineTitle', 'zineStamp', 'zineBurst', 'zineSticker', 'zineText', 'intro', 'countryTip', 'goTip', 'dayAlt']
    .forEach((k) => { if (typeof c[k] !== 'string' || !c[k]) err('missing "' + k + '"'); });
  ['lat', 'lon'].forEach((k) => { if (typeof c[k] !== 'number') err('missing number "' + k + '"'); });
  const arr = (k, n, exact) => { const a = c[k]; const ok = Array.isArray(a) && (exact ? a.length === n : a.length >= n); if (!ok) err('"' + k + '" needs ' + (exact ? 'exactly ' : 'at least ') + n + ' entries'); return Array.isArray(a) ? a : []; };
  arr('word', 3, true); arr('glow', 3, true); arr('coverHead', 2, true); arr('beautyScribble', 2, true); arr('coverLines', 3);
  if (c.coverHead && c.coverHead[0] && c.coverHead[0].length > 12) warn('coverHead[0] "' + c.coverHead[0] + '" may wrap (over 12 letters)');
  if (c.coverHead && c.coverHead[1] && c.coverHead[1].length > 18) warn('coverHead[1] "' + c.coverHead[1] + '" may wrap (over 18 letters)');
  if (c.short && c.short.length > 8) warn('"short" is over 8 letters');
  if (c.id !== id) err('id inside the file is "' + c.id + '"');
  try { new Intl.DateTimeFormat('en-US', { timeZone: c.tz }); } catch (e) { err('unknown time zone ' + c.tz); }
  ['lat', 'lon', 'tz', 'mapX', 'mapY'].forEach((k) => { if (c[k] !== meta[k]) err(k + ' differs from cities/index.js'); });
  if (!ICONS[c.boardArt]) err('unknown boardArt icon ' + c.boardArt);

  const norms = arr('normals', 12, true);
  norms.forEach((p, i) => { if (!Array.isArray(p) || p.length !== 2 || !(p[0] >= p[1])) err('normals month ' + (i + 1) + ' should be [high, low]'); });

  // --- cover ---
  if (c.cover) { if (!exists(c.cover)) err('cover file not found: ' + c.cover); }
  else if (!c.sky) warn('no cover photo and no "sky" colours');

  // --- looks ---
  const looks = c.looks || {};
  ['hot', 'mild', 'cool'].forEach((b) => { if (!looks[b]) err('missing look "' + b + '"'); });
  Object.keys(looks).forEach((b) => {
    const L = looks[b];
    ['name', 'ko', 'tip'].forEach((k) => { if (!L[k]) err('look ' + b + ' missing ' + k); });
    ['her', 'him'].forEach((w) => {
      const items = L[w] || [];
      if (items.length < 5) err('look ' + b + '/' + w + ' needs at least 5 pieces');
      const seen = {};
      items.forEach((it) => {
        if (!ICONS[it.icon]) err('look ' + b + '/' + w + ': unknown icon ' + it.icon);
        if (!SLOTS.has(it.slot)) err('look ' + b + '/' + w + ': unknown slot ' + it.slot);
        if (seen[it.slot]) err('look ' + b + '/' + w + ': two pieces in slot ' + it.slot);
        seen[it.slot] = 1;
        if (!it.name || !it.note) err('look ' + b + '/' + w + ': piece without name or note');
        if (it.img && !exists(it.img)) err('photo not found: ' + it.img);
      });
    });
  });

  // --- beauty ---
  arr('beauty', 5, true).forEach((b) => {
    if (!ICONS[b.icon]) err('beauty: unknown icon ' + b.icon);
    if (!Array.isArray(b.pos) || b.pos.length !== 4) err('beauty "' + b.name + '" needs pos [x, y, w, h]');
    if (b.img && !exists(b.img)) err('photo not found: ' + b.img);
  });

  // --- day course ---
  const day = arr('day', 4);
  day.forEach((s) => {
    if (!/^\d\d:\d\d$/.test(s.time || '')) err('day stop "' + s.place + '" needs a time like 09:30');
    ['place', 'area', 'what', 'look', 'q'].forEach((k) => { if (!s[k]) err('day stop "' + s.place + '" missing ' + k); });
    if (!ICONS[s.icon]) err('day: unknown icon ' + s.icon);
  });
  if (day.filter((s) => s.at === 'golden').length !== 1) err('day course needs exactly one sunset stop (at: "golden")');

  // --- places ---
  ['eat', 'go'].forEach((k) => arr(k, 3).forEach((p) => ['name', 'tip', 'what', 'q', 'c'].forEach((f) => { if (!p[f]) err(k + ' "' + p.name + '" missing ' + f); })));
  arr('notes', 4).forEach((n) => ['k', 'v', 'd'].forEach((f) => { if (!n[f]) err('note missing ' + f); }));
  arr('hoods', 4).forEach((h) => {
    ['name', 'en', 'vibe', 'what', 'q'].forEach((f) => { if (!h[f]) err('neighbourhood "' + h.en + '" missing ' + f); });
    if (!(h.x >= 10 && h.x <= 350 && h.y >= 10 && h.y <= 230)) err('neighbourhood "' + h.en + '" pin is off the map');
    if (!Array.isArray(h.pal) || h.pal.length !== 3) err('neighbourhood "' + h.en + '" needs 3 palette colours');
    if (!Array.isArray(h.wear) || h.wear.length < 2 || !Array.isArray(h.spots) || !h.spots.length) err('neighbourhood "' + h.en + '" needs wear and spots');
  });
  const hs = c.hoods || [];
  hs.forEach((h, i) => hs.slice(i + 1).forEach((g) => { if (Math.abs(h.x - g.x) < 40 && Math.abs(h.y - g.y) < 26) warn('pins "' + h.en + '" and "' + g.en + '" sit close together'); }));
  if (!c.hoodSvg) warn('no hoodSvg — the neighbourhood map falls back to the LA coastline');

  // --- arrival ---
  const A = c.arrive || {};
  if (!A.asOf || !A.note || !A.foot) err('arrive needs asOf, note and foot');
  const ids = (A.opts || []).map((o) => o.id);
  if (ids.length < 3) err('arrive needs at least 3 options');
  if (new Set(ids).size !== ids.length) err('arrive option ids repeat');
  (A.opts || []).forEach((o) => ['sign', 'signName', 'en', 'name', 'cost', 'time', 'how', 'best'].forEach((f) => { if (!o[f]) err('arrive option ' + o.id + ' missing ' + f); }));
  (A.picks || []).forEach((p) => { if (!ids.includes(p.id)) err('arrive pick "' + p.label + '" points to unknown option ' + p.id); });
  if (!(A.picks || []).length) err('arrive needs picks');

  // --- links ---
  const url = (u, where) => { if (!/^https:\/\/[^\s]+\.[a-z]{2,}/i.test(u || '')) err('bad link in ' + where + ': ' + u); };
  arr('events', 1).forEach((e) => url(e.url, 'events'));
  arr('read', 1).forEach((g) => (g.items || []).forEach((m) => url(m.url, 'read')));
  arr('watch', 4).forEach((w) => { if (!w.label || !w.sub || !w.q) err('watch entry missing label, sub or q'); });
  arr('essentials', 4);

  // --- tools ---
  if (c.tools === 'us') { if (!Array.isArray(c.tax) || !c.tax.length || !c.taxNote || !c.tipNote) err('US tools need tax, taxNote and tipNote'); }
  else if (c.tools === 'intl') { if (!c.cur || !c.cur.code || !c.cur.sym || !c.cur.unit) err('intl tools need cur {code, sym, unit}'); if (!Array.isArray(c.know) || c.know.length < 2) err('intl tools need "know" tips'); if (c.money !== 'intl') err('money should be "intl"'); }
  else if (c.tools !== 'kr') err('unknown tools type ' + c.tools);
}

// --- index ---
const seen = {};
const app = read('app.js');
const tags = (app.match(/const TAGS = \{([\s\S]*?)\};/) || [])[1] || '';
INDEX.forEach((m) => {
  if (seen[m.id]) errors.push(m.id + ': listed twice in cities/index.js');
  seen[m.id] = 1;
  ['name', 'en', 'nick', 'region', 'tz'].forEach((k) => { if (!m[k]) errors.push(m.id + ': index entry missing ' + k); });
  if (!(m.mapX >= 0 && m.mapX <= 915 && m.mapY >= 0 && m.mapY <= 360)) errors.push(m.id + ': map position is off the map');
  if (!new RegExp('\\b' + m.id + ':').test(tags)) errors.push(m.id + ': no map label position (TAGS in app.js)');
  if (m.open) checkCity(m);
});
fs.readdirSync(path.join(root, 'cities')).forEach((f) => { const id = f.replace(/\.js$/, ''); if (f !== 'index.js' && !seen[id]) warnings.push(f + ' is not listed in cities/index.js'); });

// The offline shell must list the files the page loads first.
const sw = read('sw.js');
(read('index.html').match(/<script src="([^"]+)"/g) || []).forEach((t) => { const f = t.slice(13, -1); if (sw.indexOf("'" + f + "'") < 0) errors.push('sw.js SHELL is missing ' + f); });

const clash = Object.keys(allText).filter((ko) => Object.keys(allText[ko]).length > 1);
console.log(INDEX.filter((m) => m.open).length + ' cities checked, ' + Object.keys(allText).length + ' phrases');
if (clash.length) console.log(clash.length + ' phrases read differently between cities (allowed — each city keeps its own wording)');
warnings.forEach((w) => console.log('  warn  ' + w));
errors.forEach((e) => console.log('  ERROR ' + e));
console.log(errors.length ? '\n' + errors.length + ' error(s)' : '\nAll good');
process.exit(errors.length ? 1 : 0);
