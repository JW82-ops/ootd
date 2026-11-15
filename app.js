(function () {
  'use strict';
  const $app = document.getElementById('app');
  const C = window.CITIES;
  const IC = window.ICONS;
  const SIZES = window.SIZES;
  const MAP_W = 915;

  const PAGES = [
    { id: 'cover', label: 'COVER' },
    { id: 'notes', label: 'CITY NOTES' },
    { id: 'arrive', label: 'ARRIVAL' },
    { id: 'look', label: 'THE LOOK' },
    { id: 'hoods', label: 'NEIGHBORHOODS' },
    { id: 'beauty', label: 'BEAUTY KIT' },
    { id: 'day', label: 'DAY COURSE' },
    { id: 'eat', label: 'EAT & GO' },
    { id: 'read', label: 'READ & WATCH' },
    { id: 'tools', label: 'TOOLS' },
    { id: 'pack', label: 'PACKING' },
    { id: 'zine', label: 'MY ZINE' },
    { id: 'next', label: 'NEXT STOP' }
  ];

  const TAGS = {
    la: [60, 122, -4], ny: [192, 62, 3], lis: [312, 108, -3], par: [420, 40, 4],
    bkk: [714, 178, -3], sel: [716, 70, -4], tyo: [830, 116, 3], syd: [790, 322, -2]
  };

  const SLOTS = {
    outer: [55, 2, 43, 32], top: [60, 33, 38, 24], belt: [3, 59, 40, 8], bottom: [44, 55, 36, 43],
    acc: [3, 67, 34, 13], bag: [77, 60, 22, 22], shoes: [3, 81, 38, 16]
  };

  const STAR = '50,0 58.5,13 71.7,5 73.7,20.3 89.1,18.8 84.2,33.5 98.7,38.9 88,50 98.7,61.1 84.2,66.5 89.1,81.2 73.7,79.7 71.7,95 58.5,87 50,100 41.5,87 28.3,95 26.3,79.7 10.9,81.2 15.8,66.5 1.3,61.1 12,50 1.3,38.9 15.8,33.5 10.9,18.8 26.3,20.3 28.3,5 41.5,13';

  /* ---------- storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('ootd:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('ootd:' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  const state = {
    lang: store.get('lang', null) || ((navigator.language || 'ko').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en'),
    who: store.get('who', 'her'),
    date: store.get('date', null),
    trip: store.get('trip', 'la'),
    sel: 'la',
    mapX: 0,
    wx: {},
    wxReq: {},
    fx: null,
    fxReq: false,
    sizeG: 'women',
    sizeT: 'clothes',
    tipPct: 20,
    shopPrice: '',
    taxRate: null,
    split: 1,
    bill: '',
    pick: -1
  };

  let lastRoute = null;
  let curIdx = 0;
  let timers = [];
  let cleanups = [];

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const I18N = window.I18N || { tr: (s) => s, set() {}, apply() {} };
  const TR = (s) => I18N.tr(s);
  const svgIcon = (name, c, a) => (IC[name] ? IC[name](c, a) : '');
  const art = (it) => (it.img ? `<img class="photo" src="${it.img}" alt="" draggable="false">` : svgIcon(it.icon, it.c, it.a));
  const burst = (style, big, small, bigSize, smallSize) => `<div class="burst" style="${style}"><svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="${STAR}" fill="#FFD23F" stroke="#141210" stroke-width="3"/></svg><span style="font-size:${bigSize}">${big}</span>${small ? `<span style="font-size:${smallSize};letter-spacing:1px">${small}</span>` : ''}</div>`;
  const chev = (dir, color) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color || 'currentColor'}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}"/></svg>`;
  const mapsUrl = (q) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  const fmtUSD = (n) => '$' + n.toFixed(2);
  // KRW for one unit of a city's currency (null until live rates arrive).
  const krwPer = (city) => (city.cur && state.rates && state.rates[city.cur.code] ? state.rates.KRW / state.rates[city.cur.code] : null);
  const fmtKRW = (n) => '₩' + Math.round(n).toLocaleString('ko-KR');

  function todayIn(tz) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  }
  function tzOffsetMin(tz, d) {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      .formatToParts(d).reduce((o, x) => { o[x.type] = x.value; return o; }, {});
    const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
    return Math.round((asUTC - d.getTime()) / 60000);
  }
  function localTime(tz) {
    return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date());
  }
  function localDay(tz) {
    return new Intl.DateTimeFormat(state.lang === 'en' ? 'en-US' : 'ko-KR', state.lang === 'en' ? { timeZone: tz, month: 'short', day: 'numeric', weekday: 'short' } : { timeZone: tz, month: 'numeric', day: 'numeric', weekday: 'short' }).format(new Date());
  }
  function hoursBehindSeoul(tz) {
    const now = new Date();
    return (tzOffsetMin('Asia/Seoul', now) - tzOffsetMin(tz, now)) / 60;
  }
  function fmtDate(d) {
    const [y, m, dd] = d.split('-').map(Number);
    return state.lang === 'en' ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m - 1] + ' ' + dd : `${m}월 ${dd}일`;
  }

  function dday(city) {
    if (!state.date) return null;
    const a = Date.UTC(+state.date.slice(0, 4), +state.date.slice(5, 7) - 1, +state.date.slice(8, 10));
    const t = todayIn(city.tz);
    const b = Date.UTC(+t.slice(0, 4), +t.slice(5, 7) - 1, +t.slice(8, 10));
    const n = Math.round((a - b) / 86400000);
    return { n, label: n > 0 ? 'D-' + n : n === 0 ? 'D-DAY' : 'D+' + (-n) };
  }

  function sunTimes(lat, lon, ymd) {
    const rad = Math.PI / 180;
    const [y, m, d] = ymd.split('-').map(Number);
    const JD = Date.UTC(y, m - 1, d, 12) / 86400000 + 2440587.5;
    const n = Math.round(JD - 2451545.0 + 0.0008);
    const Js = n - lon / 360;
    const M = (357.5291 + 0.98560028 * Js) % 360;
    const Cc = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
    const L = (M + Cc + 180 + 102.9372) % 360;
    const Jt = 2451545.0 + Js + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * L * rad);
    const dec = Math.asin(Math.sin(L * rad) * Math.sin(23.4397 * rad));
    const at = (h) => {
      const c = (Math.sin(h * rad) - Math.sin(lat * rad) * Math.sin(dec)) / (Math.cos(lat * rad) * Math.cos(dec));
      if (c < -1 || c > 1) return null;
      return new Date(((Jt + Math.acos(c) / rad / 360) - 2440587.5) * 86400000);
    };
    return { golden: at(6), sunset: at(-0.833), blue: at(-6) };
  }
  const hm = (t, tz) => (t ? new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(t) : '--:--');
  function goldenFor(city) {
    const s = sunTimes(city.lat, city.lon, tripDate(city));
    return { golden: hm(s.golden, city.tz), sunset: hm(s.sunset, city.tz), blue: hm(s.blue, city.tz), sunsetDate: s.sunset };
  }
  function roundTo10(t, addMin, tz) {
    if (!t) return null;
    const d = new Date(t.getTime() + addMin * 60000);
    const ms = 10 * 60000;
    return hm(new Date(Math.round(d.getTime() / ms) * ms), tz);
  }

  function toast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 1800);
  }

  /* ---------- live data ---------- */
  function loadWx(city) {
    if (state.wxReq[city.id]) return;
    state.wxReq[city.id] = true;
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + city.lat + '&longitude=' + city.lon +
      '&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max' +
      '&timezone=' + encodeURIComponent(city.tz) + '&forecast_days=16';
    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const tm = setTimeout(() => { if (ctrl) ctrl.abort(); }, 6000);
    fetch(url, ctrl ? { signal: ctrl.signal } : undefined).then((r) => { clearTimeout(tm); if (!r.ok) throw new Error('wx ' + r.status); return r.json(); })
      .then((j) => { state.wx[city.id] = { ok: true, current: j.current, daily: j.daily }; refresh(); })
      .catch(() => { state.wx[city.id] = { ok: false }; refresh(); });
  }
  function loadFx() {
    if (state.fxReq) return;
    state.fxReq = true;
    fetch('https://open.er-api.com/v6/latest/USD').then((r) => { if (!r.ok) throw new Error('fx'); return r.json(); })
      .then((j) => { if (j && j.rates && j.rates.KRW) { state.fx = j.rates.KRW; state.rates = j.rates; refresh(); } })
      .catch(() => { state.fx = null; });
  }

  function tripDate(city) { return state.date || todayIn(city.tz); }
  function dayWx(city) {
    const d = tripDate(city);
    const w = state.wx[city.id];
    if (w && w.ok && w.daily && w.daily.time) {
      const i = w.daily.time.indexOf(d);
      if (i >= 0) {
        return { max: Math.round(w.daily.temperature_2m_max[i]), min: Math.round(w.daily.temperature_2m_min[i]), uv: w.daily.uv_index_max[i], pop: w.daily.precipitation_probability_max[i], src: 'forecast', date: d };
      }
    }
    const m = +d.slice(5, 7) - 1;
    return { max: city.normals[m][0], min: city.normals[m][1], uv: null, pop: null, src: 'normal', date: d };
  }
  const bucketOf = (w, city) => (w.max >= 27 ? 'hot' : w.max >= 20 ? 'mild' : (w.max < 8 && city.looks.cold) ? 'cold' : 'cool');
  function lookFor(city) {
    const w = dayWx(city);
    const b = bucketOf(w, city);
    const look = city.looks[b];
    const items = look[state.who].slice();
    if (w.pop != null && w.pop >= 50) items.push({ slot: null, icon: 'umbrella', c: '#2D5BFF', name: '접이식 우산', note: '비 올 확률 ' + w.pop + '%' });
    return { w, b, look, items };
  }

  /* ---------- router ---------- */
  function parse() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!h || h === 'home') return { view: 'home' };
    const parts = h.split('-');
    const city = C[parts[0]];
    if (city && city.open) {
      const idx = parts[1] ? PAGES.findIndex((p) => p.id === parts[1]) : 0;
      if (idx >= 0) return { view: 'mag', city: parts[0], idx };
    }
    return { view: 'home' };
  }
  const hashFor = (cityId, idx) => (idx === 0 ? cityId : cityId + '-' + PAGES[idx].id);

  function cleanup() {
    timers.forEach(clearInterval);
    timers = [];
    cleanups.forEach((f) => f());
    cleanups = [];
  }

  function render(opts) {
    const keepScroll = opts && opts.keepScroll;
    const y = window.scrollY;
    const r = parse();
    cleanup();
    let dir = '';
    if (!keepScroll && lastRoute && lastRoute.view === 'mag' && r.view === 'mag' && lastRoute.city === r.city) {
      dir = r.idx > lastRoute.idx ? 'from-right' : r.idx < lastRoute.idx ? 'from-left' : '';
    }
    const html = r.view === 'home' ? viewHome() : viewMag(r, dir);
    $app.innerHTML = html + grainSvg() + '<div id="toast" class="toast" role="status" aria-live="polite"></div>';
    if (keepScroll) {
      const v = $app.querySelector('.view');
      if (v) v.style.animation = 'none';
      window.scrollTo(0, y);
    } else {
      window.scrollTo(0, 0);
    }
    if (r.view === 'home') bindHome();
    else bindMag(r);
    lastRoute = r;
  }
  function refresh() {
    const r = parse();
    if (r.view === 'mag' && PAGES[r.idx].id === 'zine') return; // never rebuild the zine editor mid-edit
    render({ keepScroll: true });
  }

  const grainSvg = () => '<svg class="grain" width="100%" height="100%" aria-hidden="true"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#grain)"/></svg>';

  /* ---------- HOME ---------- */
  function viewHome() {
    const ids = Object.keys(C);
    const pins = ids.map((id) => {
      const c = C[id];
      const t = TAGS[id];
      const dot = `<span class="dot${c.open ? ' open' : ''}" style="left:${c.mapX}px;top:${c.mapY}px"></span>`;
      const tag = c.open
        ? `<a class="tag open" href="#${id}" style="left:${t[0]}px;top:${t[1]}px;transform:rotate(${t[2]}deg)"><b>${esc(c.en)}</b><small>잡지 열기 →</small></a>
           ${c.isNew ? `<span class="tag" style="left:${t[0] + 50}px;top:${t[1] - 22}px;padding:2px 8px;background:#F2457C;border-width:2px;transform:rotate(10deg)"><b style="font-size:12px">NEW!</b></span>` : ''}`
        : `<button class="tag" type="button" data-soon="${id}" style="left:${t[0]}px;top:${t[1]}px;transform:rotate(${t[2]}deg);text-align:left"><b>${esc(c.en)}</b><small>SOON</small></button>`;
      return dot + tag;
    }).join('');
    const chips = ids.map((id) => `<button class="chip" type="button" data-fly="${id}" aria-pressed="${state.sel === id}">${esc(C[id].name)}</button>`).join('');
    const land = window.LAND_PATH;
    return `
<main class="view">
  <header class="home-head">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span class="small-caps">OUT OF TOWN DAY</span>
      <span style="display:flex;align-items:center;gap:10px"><span class="marker" style="font-size:14px">travel × style</span><div class="seg" role="group" aria-label="Language" style="flex:none"><button type="button" data-lang="ko" aria-pressed="${state.lang === 'ko'}" style="min-width:38px;min-height:32px;font-size:12px">한</button><button type="button" data-lang="en" aria-pressed="${state.lang === 'en'}" style="min-width:38px;min-height:32px;font-size:12px">EN</button></div></span>
    </div>
    <div style="display:flex;align-items:flex-end;gap:10px">
      <h1 class="mast" style="font-size:112px">OOTD</h1>
      <div style="padding-bottom:10px;display:flex;flex-direction:column;gap:4px">
        <span class="anton" style="background:#141210;color:#F3EAD8;font-size:16px;letter-spacing:3px;padding:2px 8px">WORLD EDITION</span>
        <span class="marker" style="font-size:15px">pick a city!</span>
      </div>
    </div>
    <p style="margin:10px 0 0;font-size:14px;font-weight:700">지도를 밀어서 도시를 고르면, 그 도시의 잡지가 열려요</p>
  </header>

  <section class="map-card" id="map" aria-label="일러스트 세계지도 — 좌우로 밀어서 둘러보기">
    <div class="map-inner" id="mapInner" style="transform:translate3d(${state.mapX}px,0,0)">
      <svg width="915" height="360" viewBox="0 0 915 360" aria-hidden="true">
        <defs><pattern id="waves" width="40" height="22" patternUnits="userSpaceOnUse"><path d="M4 11 q 5 -5 10 0 t 10 0" fill="none" stroke="#9EC3D6" stroke-width="1.4" stroke-linecap="round"/></pattern></defs>
        <rect width="915" height="360" fill="url(#waves)"/>
        <path d="M45 0V360M135 0V360M225 0V360M315 0V360M405 0V360M495 0V360M585 0V360M675 0V360M765 0V360M855 0V360M0 36H915M0 126H915M0 216H915M0 306H915" stroke="#9EC3D6" stroke-width="1" stroke-dasharray="3 5"/>
        <path d="M0 216H915" stroke="#F2457C" stroke-width="1.2" stroke-dasharray="6 6" opacity="0.6"/>
        <g transform="translate(4 4)"><path d="${land}" fill="#F2457C" fill-rule="evenodd"/></g>
        <path d="${land}" fill="#F3EAD8" stroke="#141210" stroke-width="1.2" stroke-linejoin="round" fill-rule="evenodd"/>
        <path d="M786 103 C 830 60, 880 50, 915 46" fill="none" stroke="#141210" stroke-width="1.8" stroke-dasharray="5 5"/>
        <path d="M0 64 C 20 70, 40 90, 50 112" fill="none" stroke="#141210" stroke-width="1.8" stroke-dasharray="5 5"/>
        <g transform="translate(890 44) rotate(-12)"><path d="M-10 0 h10 l6 -7 h4 l-3 7 h7 l3 -3 h3 l-2 3 l2 3 h-3 l-3 -3 h-7 l3 7 h-4 l-6 -7 h-10 z" fill="#141210"/></g>
        <g transform="translate(330 300)"><circle r="22" fill="#F3EAD8" stroke="#141210" stroke-width="1.5"/><path d="M0 -20 L5 0 L0 20 L-5 0 Z" fill="#141210"/><path d="M-20 0 L0 -5 L20 0 L0 5 Z" fill="#F2457C" stroke="#141210" stroke-width="1"/><text y="-25" text-anchor="middle" font-family="Anton, sans-serif" font-size="10" fill="#141210">N</text></g>
        <text x="40" y="262" font-family="Permanent Marker, cursive" font-size="20" fill="#5D8BA6" transform="rotate(-6 40 262)">Pacific</text>
        <text x="232" y="214" font-family="Permanent Marker, cursive" font-size="18" fill="#5D8BA6" transform="rotate(-8 232 214)">Atlantic</text>
        <text x="560" y="290" font-family="Permanent Marker, cursive" font-size="18" fill="#5D8BA6" transform="rotate(-4 560 290)">Indian</text>
      </svg>
      ${pins}
    </div>
  </section>

  <div style="display:flex;align-items:center;justify-content:space-between;margin:12px 20px 0;font-size:12px;font-weight:500">
    <span style="display:flex;align-items:center;gap:10px"><span class="marker" style="font-size:15px">drag me</span><span class="scrub" aria-hidden="true"><i id="thumb"></i></span></span>
    <span style="display:flex;align-items:center;gap:12px">
      <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:5px;background:#F2457C;border:1.5px solid #141210"></span>발행</span>
      <span style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:4px;background:#141210"></span>준비 중</span>
    </span>
  </div>

  <section style="margin-top:22px">
    <div style="display:flex;align-items:baseline;gap:8px;padding:0 20px"><span class="anton" style="font-size:20px;letter-spacing:1px">CITIES</span><span class="muted" style="font-size:12px">누르면 지도가 그 도시로 이동해요</span></div>
    <div class="hscroll">${chips}</div>
  </section>

  <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:22px 20px 0">${ids.filter((id) => C[id].open).map((id, i) => `<a href="#${id}" class="card" style="display:flex;flex-direction:column;gap:2px;padding:10px 12px;background:${['#FFD23F', '#F2457C', '#FFFFFF', '#BFD9E6'][i % 4]}">
    <span class="anton" style="font-size:10px;letter-spacing:2px">${C[id].isNew ? 'NEW CITY' : 'NOW OPEN'}</span><span class="anton" style="font-size:${C[id].en.length > 9 ? 18 : 22}px;line-height:1.1">${esc(C[id].en)}</span>
    <span style="display:flex;align-items:center;gap:4px;font-size:12px;font-weight:700">${esc(C[id].name)} ${chev('right')}</span>
  </a>`).join('')}</div>
  ${tripCard()}
  ${closetHtml()}
</main>
${store.get('seen', false) ? '' : introHtml()}`;
  }

  function tripCard() {
    const open = Object.keys(C).filter((id) => C[id].open);
    const city = C[state.trip] && C[state.trip].open ? C[state.trip] : C.la;
    const d = dday(city);
    const big = d ? d.label : 'D-?';
    const n = city.nick;
    const sub = d ? (d.n > 0 ? n + ' 가는 날까지 ' + d.n + '일 남았어요' : d.n === 0 ? '오늘 ' + n + '(으)로 떠나요!' : '다녀온 ' + n + ', zine으로 남겨요') : '날짜를 넣으면 D-day가 떠요';
    return `<section class="card" aria-label="내 여행" style="display:flex;align-items:center;gap:14px;margin:14px 20px 0;padding:12px 14px;background:#FFFFFF">
      <div style="flex:none;min-width:96px;text-align:center"><div class="anton" style="font-size:11px;letter-spacing:2px">MY TRIP</div><div class="anton" style="font-size:38px;line-height:1;color:#F2457C;text-shadow:2px 2px 0 #141210">${big}</div></div>
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:6px"><span style="font-size:13px;font-weight:700">${sub}</span>
        <div style="display:flex;gap:6px;flex-wrap:wrap">${open.map((id) => `<button type="button" class="chip" data-trip="${id}" aria-pressed="${city.id === id}" style="min-height:32px;padding:0 10px;font-size:12px">${esc(C[id].nick)}</button>`).join('')}</div>
        <label style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700">가는 날<input type="date" data-date value="${state.date || ''}" style="min-height:36px;border:2px solid #141210;border-radius:8px;background:#F3EAD8;padding:0 6px;font-size:13px"></label></div>
    </section>`;
  }

  /* ---------- closet ---------- */
  const closet = () => store.get('closet', []);
  const inCloset = (id) => closet().some((e) => e.id === id);
  function toggleCloset(entry) {
    const list = closet();
    const k = list.findIndex((e) => e.id === entry.id);
    if (k >= 0) list.splice(k, 1); else list.unshift(entry);
    store.set('closet', list.slice(0, 40));
    return k < 0;
  }
  function closetHtml() {
    const list = closet();
    if (!list.length) return `<section style="margin:26px 20px 0"><div class="anton" style="font-size:20px;letter-spacing:1px">MY CLOSET</div><div class="card" style="margin-top:10px;padding:14px;border-style:dashed;box-shadow:none"><span class="pen" style="font-size:21px;line-height:1.15">마음에 드는 룩이나 동네 스타일에서 "옷장에 담기"를 누르면 여기에 모여요</span></div></section>`;
    return `<section style="margin:26px 20px 0"><div style="display:flex;align-items:baseline;gap:8px"><span class="anton" style="font-size:20px;letter-spacing:1px">MY CLOSET</span><span class="muted" style="font-size:12px">${list.length}개 담았어요</span></div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:10px">${list.map((e) => `<article class="card" style="padding:12px 14px;box-shadow:3px 3px 0 #141210">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px"><div style="min-width:0"><div class="anton" style="font-size:18px;line-height:1.1">${esc(e.title)}</div><div class="muted" style="font-size:12px;margin-top:2px">${esc(e.sub)}</div></div>
          <button type="button" class="chip" data-unsave="${esc(e.id)}" aria-label="${esc(e.title)} 옷장에서 빼기" style="min-height:32px;padding:0 10px;font-size:12px">빼기</button></div>
        <div style="font-size:13px;margin-top:8px;line-height:1.5">${e.items.map(esc).join(' · ')}</div>
        <a href="#${e.href}" style="display:inline-flex;align-items:center;min-height:32px;margin-top:4px;font-size:12px;font-weight:700;color:#1F4FBF">잡지에서 보기 →</a>
      </article>`).join('')}</div></section>`;
  }

  /* ---------- first-visit intro ---------- */
  function introHtml() {
    const steps = [['1', '지도에서 도시 고르기', '지도를 밀어서 열려 있는 도시를 눌러요'], ['2', '가는 날 넣기', '그날 날씨에 맞는 룩과 짐 리스트가 나와요'], ['3', '잡지처럼 넘겨 보기', '룩 · 동네 · 맛집 · 내 zine까지 옆으로 넘겨요']];
    return `<div class="zine-overlay" id="intro" role="dialog" aria-label="OOTD 소개"><div class="card" style="width:100%;max-width:360px;padding:18px 18px 16px;background:#F3EAD8;transform:rotate(-1deg)">
      <div class="mast" style="font-size:64px">OOTD</div>
      <div class="pen" style="font-size:24px;line-height:1.1;margin-top:6px">도시를 입는 여행 매거진</div>
      <ol style="list-style:none;margin:14px 0 0;padding:0;display:flex;flex-direction:column;gap:10px">${steps.map((st) => `<li style="display:flex;gap:10px;align-items:flex-start"><span class="num" style="width:26px;height:26px;border-radius:13px;background:#F2457C;color:#141210;border:2px solid #141210">${st[0]}</span><span><b style="font-size:15px">${st[1]}</b><br><span class="muted" style="font-size:13px">${st[2]}</span></span></li>`).join('')}</ol>
      <button type="button" class="btn yellow" data-intro-close style="width:100%;margin-top:16px">시작하기</button>
    </div></div>`;
  }

  function bindHome() {
    $app.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => { state.lang = b.getAttribute('data-lang'); store.set('lang', state.lang); I18N.set(state.lang); refresh(); }));
    const card = document.getElementById('map');
    const inner = document.getElementById('mapInner');
    const thumb = document.getElementById('thumb');
    const VIEW = () => card.clientWidth;
    const minX = () => Math.min(0, -(MAP_W - VIEW()));
    const clamp = (x) => Math.max(minX(), Math.min(0, x));
    const rubber = (x) => { const m = minX(); if (x > 0) return x * 0.35; if (x < m) return m + (x - m) * 0.35; return x; };
    let raf = 0;
    let d = null;
    let justDragged = false;

    function paint(x) {
      state.mapX = x;
      inner.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
      const span = -minX() || 1;
      const pos = Math.max(0, Math.min(1, -x / span));
      const tw = Math.round(87 * VIEW() / MAP_W);
      thumb.style.width = tw + 'px';
      thumb.style.left = Math.round(pos * (87 - tw)) + 'px';
    }
    paint(clamp(state.mapX));

    function coast(v0) {
      let v = v0;
      const step = () => {
        let x = state.mapX;
        const m = minX();
        if (x > 0 || x < m) {
          const t = x > 0 ? 0 : m;
          x += (t - x) * 0.2;
          if (Math.abs(t - x) < 0.5) { paint(t); return; }
        } else {
          x += v;
          v *= 0.93;
          if (Math.abs(v) < 0.2) { paint(x); return; }
        }
        paint(x);
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }
    function flyTo(target) {
      cancelAnimationFrame(raf);
      const from = state.mapX;
      const to = clamp(target);
      const t0 = performance.now();
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const dur = reduce ? 1 : 700;
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const k = 1 - Math.pow(1 - p, 3);
        paint(from + (to - from) * k);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    card.addEventListener('pointerdown', (e) => {
      cancelAnimationFrame(raf);
      d = { id: e.pointerId, sx: e.clientX, ox: state.mapX, lx: e.clientX, lt: performance.now(), v: 0, moved: false };
    });
    card.addEventListener('pointermove', (e) => {
      if (!d || e.pointerId !== d.id) return;
      const dx = e.clientX - d.sx;
      if (!d.moved) {
        if (Math.abs(dx) < 6) return;
        d.moved = true;
        try { card.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
        card.classList.add('grabbing');
      }
      const now = performance.now();
      const dt = Math.max(1, now - d.lt);
      d.v = 0.8 * ((e.clientX - d.lx) / dt) + 0.2 * d.v;
      d.lx = e.clientX;
      d.lt = now;
      paint(rubber(d.ox + dx));
    });
    const end = () => {
      if (!d) return;
      const moved = d.moved;
      const v = d.v;
      d = null;
      card.classList.remove('grabbing');
      if (moved) { justDragged = true; setTimeout(() => { justDragged = false; }, 0); coast(v * 16); }
    };
    card.addEventListener('pointerup', end);
    card.addEventListener('pointercancel', end);
    card.addEventListener('click', (e) => { if (justDragged) { e.preventDefault(); e.stopPropagation(); } }, true);
    card.addEventListener('dragstart', (e) => e.preventDefault());
    card.addEventListener('wheel', (e) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (!dx) return;
      e.preventDefault();
      cancelAnimationFrame(raf);
      paint(clamp(state.mapX - dx));
    }, { passive: false });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { flyTo(state.mapX - 120); }
      if (e.key === 'ArrowLeft') { flyTo(state.mapX + 120); }
    });
    card.tabIndex = 0;

    $app.querySelectorAll('[data-fly]').forEach((b) => b.addEventListener('click', () => {
      const id = b.getAttribute('data-fly');
      state.sel = id;
      $app.querySelectorAll('[data-fly]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      flyTo(-(C[id].mapX - VIEW() / 2));
      if (!C[id].open) toast(C[id].name + '은(는) 준비 중이에요');
    }));
    $app.querySelectorAll('[data-date]').forEach((inp) => inp.addEventListener('change', () => {
      state.date = inp.value || null;
      store.set('date', state.date);
      render({ keepScroll: true });
      toast(state.date ? 'D-day를 맞췄어요' : '날짜를 지웠어요');
    }));
    $app.querySelectorAll('[data-trip]').forEach((b) => b.addEventListener('click', () => { state.trip = b.getAttribute('data-trip'); store.set('trip', state.trip); render({ keepScroll: true }); }));
    $app.querySelectorAll('[data-unsave]').forEach((b) => b.addEventListener('click', () => { toggleCloset({ id: b.getAttribute('data-unsave') }); render({ keepScroll: true }); toast('옷장에서 뺐어요'); }));
    const introBtn = $app.querySelector('[data-intro-close]');
    if (introBtn) { introBtn.addEventListener('click', () => { store.set('seen', true); const el = document.getElementById('intro'); if (el) el.remove(); }); introBtn.focus(); }
    $app.querySelectorAll('[data-soon]').forEach((b) => b.addEventListener('click', () => {
      toast(C[b.getAttribute('data-soon')].name + '은(는) 준비 중이에요');
    }));
    const onResize = () => paint(clamp(state.mapX));
    window.addEventListener('resize', onResize);
    cleanups.push(() => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); });
  }

  /* ---------- MAGAZINE ---------- */
  function viewMag(r, dir) {
    const city = C[r.city];
    loadWx(city);
    loadFx();
    const page = PAGES[r.idx];
    curIdx = r.idx;
    const body = ({ cover: pCover, notes: pNotes, arrive: pArrive, look: pLook, hoods: pHoods, beauty: pBeauty, day: pDay, eat: pEat, read: pRead, tools: pTools, pack: pPack, zine: pZine, next: pNext })[page.id](city, r);
    if (page.id === 'cover') return `<main class="view cover-view ${dir}" data-swipe style="touch-action:pan-y">${body}</main>${tocHtml(city, 0)}`;
    const prev = r.idx > 0 ? hashFor(r.city, r.idx - 1) : null;
    const next = r.idx < PAGES.length - 1 ? hashFor(r.city, r.idx + 1) : null;
    const dots = PAGES.map((p, i) => `<i class="${i === r.idx ? 'on' : ''}"></i>`).join('');
    return `
<main class="view ${dir}" data-swipe style="touch-action:pan-y">
  <div class="mag-top">
    <a href="#home" class="btn ghost" style="min-height:40px;padding:0 12px;font-size:12px">${chev('left')} MAP</a>
    <button type="button" class="btn ghost" data-toc style="min-height:40px;padding:0 12px;font-size:12px">목차 · P.${r.idx}</button>
    <a href="#${r.city}" aria-label="커버로" class="icon-btn" style="width:40px;height:40px;background:#F2457C"><span class="anton" style="font-size:11px">OOTD</span></a>
  </div>
  ${body}
</main>
${tocHtml(city, r.idx)}
<nav class="mag-bar" aria-label="페이지 이동">
  <a class="btn ghost" href="#${prev}" aria-label="이전 페이지" style="padding:0 12px">${chev('left')}</a>
  <div class="dots" aria-label="${r.idx + 1} / ${PAGES.length}">${dots}</div>
  ${next ? `<a class="btn" href="#${next}">${esc((city.labels && city.labels[PAGES[r.idx + 1].id]) || PAGES[r.idx + 1].label)} ${chev('right')}</a>` : `<a class="btn yellow" href="#home">지도로 ${chev('right')}</a>`}
</nav>`;
  }

  function tocHtml(city, cur) {
    const lab = (p) => (city.labels && city.labels[p.id]) || p.label;
    return `<div class="zine-overlay" id="toc" hidden role="dialog" aria-label="목차"><div class="card" style="width:100%;max-width:360px;max-height:86dvh;overflow:auto;padding:16px;background:#F3EAD8">
      <div style="display:flex;align-items:center;justify-content:space-between"><span class="anton" style="font-size:24px">CONTENTS</span><button type="button" class="btn ghost" data-toc-close style="min-height:40px;padding:0 12px;font-size:12px">닫기</button></div>
      <div class="muted" style="font-size:12px;margin-top:2px">${esc(city.en)}</div>
      <div style="display:flex;flex-direction:column;margin-top:8px">${PAGES.map((p, i) => `<a href="#${hashFor(city.id, i)}" data-toc-link ${i === cur ? 'aria-current="page"' : ''} style="display:flex;align-items:center;gap:12px;min-height:44px;border-bottom:1.5px dashed #141210;${i === cur ? 'background:#FFD23F;' : ''}padding:0 6px"><span class="anton" style="width:28px;font-size:18px;color:#C2185B">${String(i).padStart(2, '0')}</span><span class="anton" style="font-size:17px;letter-spacing:.5px">${esc(lab(p))}</span></a>`).join('')}</div>
    </div></div>`;
  }

  function head(n, title, sub, right) {
    return `<div class="page-head"><div style="display:flex;align-items:flex-end;gap:10px"><span class="page-num">${String(curIdx).padStart(2, '0')}</span><div><h2 class="page-title" style="margin:0">${title}</h2><div class="page-sub">${sub}</div></div></div>${right || ''}</div>`;
  }

  function wxLine(city, opts) {
    const w = dayWx(city);
    const src = w.src === 'forecast' ? '실시간 예보' : '평년 기온 (참고)';
    return `<div class="wx">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap"><span class="anton" style="font-size:24px;line-height:1">${w.max}° / ${w.min}°</span><span style="font-size:11px;font-weight:700">${src}</span></div>
        <div style="font-size:12px;font-weight:500;margin-top:2px">${opts && opts.extra ? opts.extra(w) : ''}</div>
      </div>
      <label style="display:flex;flex-direction:column;gap:2px;font-size:10px;font-weight:700">여행 날짜<input type="date" data-date value="${w.date}"></label>
    </div>`;
  }

  // Illustrated cover for cities without a photo: sky gradient, halftone sun and a simple silhouette.
  function skyScene(city) {
    const s = city.sky;
    let seed = city.id.charCodeAt(0) * 31 + city.id.charCodeAt(1) * 7 + city.id.length;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    let fg = '';
    if (city.scene === 'towers') {
      let x = -6;
      while (x < 390) {
        const w = 22 + Math.floor(rnd() * 34), h = 90 + Math.floor(rnd() * 250);
        fg += `<rect x="${x}" y="${844 - h}" width="${w}" height="${h}" fill="${rnd() > 0.5 ? '#141210' : '#2B2350'}"/>`;
        for (let wy = 844 - h + 12; wy < 830; wy += 22) for (let wx = x + 5; wx < x + w - 6; wx += 10) if (rnd() > 0.55) fg += `<rect x="${wx}" y="${wy}" width="4" height="8" fill="#FFD23F"/>`;
        x += w + 2;
      }
    } else if (city.scene === 'roofs') {
      let x = -10, row = 0;
      for (row = 0; row < 3; row++) {
        x = -10 - row * 14; const base = 700 + row * 52, col = ['#C4553A', '#A8432E', '#2B2622'][row];
        while (x < 390) {
          const w = 46 + Math.floor(rnd() * 40), h = 36 + Math.floor(rnd() * 46);
          fg += `<path d="M${x} ${base} L${x + w / 2} ${base - h} L${x + w} ${base} V844 H${x} Z" fill="${col}" stroke="#141210" stroke-width="2"/>`;
          if (rnd() > 0.5) fg += `<rect x="${x + w * 0.62}" y="${base - h * 0.9}" width="9" height="${h * 0.5}" fill="#141210"/>`;
          x += w - 4;
        }
      }
    } else {
      ['#2D5BFF', '#1F4FBF', '#16357F'].forEach((col, k) => {
        const y = 690 + k * 50; let d = `M0 ${y}`;
        for (let x = 0; x < 390; x += 60) d += ` q 15 ${-18 + k * 3} 30 0 t 30 0`;
        fg += `<path d="${d} V844 H0 Z" fill="${col}" stroke="#141210" stroke-width="2"/>`;
      });
      fg += '<path d="M0 844 L0 800 C 80 780 130 800 200 820 L260 844 Z" fill="#F3E0B0" stroke="#141210" stroke-width="2"/>';
    }
    return `<svg class="cover-scene" viewBox="0 0 390 844" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">${s.map((c, i) => `<stop offset="${[0, 0.36, 0.56, 0.7, 0.8][i]}" stop-color="${c}"/>`).join('')}</linearGradient>
      <clipPath id="sunClip"><circle cx="195" cy="600" r="118"/></clipPath>
      <pattern id="dotsC" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2.2" fill="#141210"/></pattern>
    </defs>
    <rect width="390" height="844" fill="url(#sky)"/>
    <g clip-path="url(#sunClip)"><rect x="60" y="470" width="270" height="260" fill="#FFE37A"/><rect x="60" y="600" width="270" height="8" fill="#FF8A3D"/><rect x="60" y="622" width="270" height="12" fill="#FF8A3D"/><rect x="60" y="650" width="270" height="18" fill="#FF8A3D"/></g>
    <path d="M330 120 L390 120 L390 240 Z" fill="url(#dotsC)" opacity="0.5"/>
    ${fg}
  </svg>`;
  }

  function pCover(city) {
    const palm = (x, base, s, flip) => `<g transform="translate(${x} ${base}) scale(${flip ? -s : s} ${s})"><path d="M0 0 C 4 -80, 8 -160, 22 -238" stroke="#141210" stroke-width="9" fill="none" stroke-linecap="round"/><g fill="#141210"><path d="M22 -238 C 0 -262 -40 -262 -72 -232 C -40 -248 -10 -246 22 -234 Z"/><path d="M22 -238 C 6 -276 -26 -292 -56 -286 C -26 -280 -2 -264 22 -234 Z"/><path d="M22 -238 C 30 -280 52 -300 80 -298 C 54 -288 36 -268 24 -234 Z"/><path d="M22 -238 C 50 -258 86 -256 112 -228 C 84 -244 54 -244 24 -232 Z"/><path d="M22 -238 C 44 -232 70 -214 80 -186 C 64 -210 44 -222 22 -232 Z"/><path d="M22 -238 C 0 -230 -24 -212 -32 -184 C -18 -208 0 -222 22 -232 Z"/></g></g>`;
    const lines = city.coverLines.map((l, i) => `<span class="anton" style="display:inline-block;background:#141210;color:${i % 2 ? '#FFD23F' : '#F3EAD8'};font-size:22px;line-height:1;padding:3px 6px 2px">${esc(l)}</span>`).join('');
    const scene = city.cover
      ? `<img class="cover-scene cover-photo" src="${city.cover}" alt=""><div class="cover-tint"></div>`
      : city.sky ? skyScene(city) : `  <svg class="cover-scene" viewBox="0 0 390 844" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E4A8C"/><stop offset="0.36" stop-color="#7A4E98"/><stop offset="0.55" stop-color="#F2457C"/><stop offset="0.68" stop-color="#FF8A3D"/><stop offset="0.76" stop-color="#FFD23F"/></linearGradient>
      <clipPath id="sunClip"><circle cx="195" cy="600" r="118"/></clipPath>
      <pattern id="dotsC" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2.2" fill="#141210"/></pattern>
    </defs>
    <rect width="390" height="844" fill="url(#sky)"/>
    <g clip-path="url(#sunClip)"><rect x="60" y="470" width="270" height="260" fill="#FFE37A"/><rect x="60" y="600" width="270" height="8" fill="#FF8A3D"/><rect x="60" y="620" width="270" height="11" fill="#FF8A3D"/><rect x="60" y="642" width="270" height="14" fill="#FF8A3D"/></g>
    <path d="M330 120 L390 120 L390 240 Z" fill="url(#dotsC)" opacity="0.5"/>
    <path d="M0 668 C 60 640 110 652 160 664 C 220 646 300 636 390 660 L390 700 L0 700 Z" fill="#2B2350"/>
    <path d="M0 844 L178 676 L212 676 L390 844 Z" fill="#2B2622"/>
    <path d="M195 690 V700 M195 716 V732 M195 752 V778 M195 800 V844" stroke="#FFD23F" stroke-width="4"/>
    ${palm(28, 860, 1.55)}${palm(110, 772, 1.0)}${palm(152, 716, 0.66)}${palm(171, 690, 0.42)}
    ${palm(362, 860, 1.55, true)}${palm(280, 772, 1.0, true)}${palm(238, 716, 0.66, true)}${palm(219, 690, 0.42, true)}
  </svg>`;
    return `
<section class="cover">
${scene}

  <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;height:44px;background:#141210;padding:calc(env(safe-area-inset-top)) 6px 0 4px">
    <a href="#home" style="height:44px;display:flex;align-items:center;gap:2px;padding:0 6px;font-size:11px;font-weight:700;letter-spacing:2px;color:#F3EAD8">${chev('left', '#F3EAD8')} MAP</a>
    <button type="button" data-toc style="height:36px;padding:0 12px;border:1.5px solid #F3EAD8;border-radius:18px;background:transparent;color:#F3EAD8;font-size:12px;font-weight:700">목차</button>
    <span class="anton" style="font-size:13px;letter-spacing:1px;color:#FFD23F;padding-right:6px">VOL.01 · ${esc(city.en)}</span>
  </div>
  <div class="anton" style="position:relative;padding:4px 12px 0;font-size:11px;letter-spacing:3px">THE CITY ISSUE — WHERE STYLE TRAVELS</div>
  <h1 class="mast" style="position:relative;padding:0 10px;font-size:min(47vw,190px)">OOTD</h1>

  <div style="position:absolute;right:12px;top:212px;width:124px;height:68px;border-radius:62px/34px;background:#FFD23F;border:2.5px solid #141210;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-8deg);color:#141210">
    <span class="anton" style="font-size:${city.short.length > 4 ? 24 : 30}px;line-height:1">${esc(city.short)}</span><span class="anton" style="font-size:13px;letter-spacing:2px;line-height:1.1">SPECIAL</span>
  </div>
  ${burst('left:6px;top:250px;width:108px;height:108px;transform:rotate(-12deg);color:#141210', 'NEW', 'CITY!', '26px', '13px')}
  <svg width="64" height="120" viewBox="0 0 54 100" aria-hidden="true" style="position:absolute;right:34px;top:300px;transform:rotate(10deg)"><path d="M34 0 L6 54 H24 L12 100 L50 38 H32 L44 0 Z" fill="#FFD23F" stroke="#141210" stroke-width="2.5" stroke-linejoin="round"/></svg>
  <div style="position:absolute;left:18px;top:378px;display:flex;flex-direction:column;align-items:flex-start;gap:4px">${lines}</div>
  <div class="marker" style="position:absolute;right:18px;top:450px;width:190px;text-align:right;font-size:26px;line-height:1.05;transform:rotate(-6deg);color:#FFFFFF;text-shadow:2px 2px 0 #141210;word-break:keep-all">${esc(city.tagline)}</div>

  <div style="position:absolute;left:0;right:0;bottom:0;padding:0 0 calc(22px + env(safe-area-inset-bottom))">
    <div class="torn" style="display:inline-block;margin-left:10px;padding:8px 16px 6px;background:#FFD23F;color:#141210;transform:rotate(-4deg)"><span class="anton" style="font-size:48px;line-height:1">${esc(city.coverHead[0])}</span></div><br>
    <div class="torn" style="display:inline-block;margin:-4px 0 0 32px;padding:6px 16px;background:#F2457C;color:#141210;transform:rotate(-2deg)"><span class="anton" style="font-size:${city.coverHead[1].length > 15 ? 32 : 36}px;line-height:1">${esc(city.coverHead[1])}</span></div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;padding:0 16px">
      <a href="#${city.id}-notes" class="anton" style="height:48px;display:flex;align-items:center;gap:8px;padding:0 16px;background:#141210;color:#F3EAD8;transform:rotate(-3deg);font-size:22px;letter-spacing:1px">OPEN <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2 L14 8 L3 14 Z" fill="#F2457C"/></svg><span style="font-family:var(--sans);font-size:13px;font-weight:700;letter-spacing:0">펼쳐 보기</span></a>
      ${state.trip === city.id && dday(city) ? `<span class="anton" style="position:absolute;right:20px;bottom:calc(98px + env(safe-area-inset-bottom));padding:4px 10px;background:#F2457C;color:#141210;border:2px solid #141210;font-size:20px;transform:rotate(8deg)">${dday(city).label}</span>` : ''}
      <div style="width:100px;background:#F3EAD8;padding:6px 8px 4px;color:#141210;border:2px solid #141210">
        <div style="display:flex;justify-content:space-between;font-size:8px;font-weight:700"><span>${esc(city.country)}</span></div>
        <svg width="84" height="26" viewBox="0 0 88 30" aria-hidden="true" style="display:block;margin-top:3px"><path d="M2 0v30M5 0v30M9 0v30M11 0v30M15 0v30M20 0v30M22 0v30M26 0v30M31 0v30M33 0v30M36 0v30M41 0v30M44 0v30M46 0v30M51 0v30M55 0v30M57 0v30M62 0v30M64 0v30M68 0v30M72 0v30M75 0v30M78 0v30M82 0v30M86 0v30" stroke="#141210" stroke-width="1.6"/></svg>
      </div>
    </div>
  </div>
</section>`;
  }

  function pNotes(city) {
    const diff = hoursBehindSeoul(city.tz);
    const w = state.wx[city.id];
    let wxV = '…', wxD = '날씨 불러오는 중';
    if (w && w.ok && w.current) { wxV = Math.round(w.current.temperature_2m) + '°C'; wxD = '지금 ' + city.name + ' 기온 (실시간)'; }
    else if (w && !w.ok) { const m = +todayIn(city.tz).slice(5, 7) - 1; wxV = city.normals[m][0] + '° / ' + city.normals[m][1] + '°'; wxD = '이번 달 평년 낮·밤 기온'; }
    const kr = city.money === 'krw';
    const intl = city.money === 'intl', per = krwPer(city);
    const fxV = kr ? '₩ KRW' : intl ? (per ? fmtKRW(per * city.cur.unit) : city.cur.code + ' ' + city.cur.sym) : state.fx ? '₩' + Math.round(state.fx).toLocaleString('ko-KR') : 'USD $';
    const fxD = kr ? '팁 없음 · 가격에 부가세 포함' : intl ? (per ? city.cur.sym + city.cur.unit + ' 기준 (실시간 환율)' : '현지 통화 · ' + city.cur.code) : state.fx ? '1달러 기준 (실시간 환율)' : '식당 팁 18~20%가 보통';
    const live = [
      { k: 'LOCAL TIME', v: `<span data-clock>${esc(localTime(city.tz))}</span>`, d: `${esc(localDay(city.tz))} · ${diff === 0 ? '한국 시간 그대로예요' : diff > 0 ? '한국보다 ' + diff + '시간 느려요' : '한국보다 ' + (-diff) + '시간 빨라요'}` },
      { k: 'WEATHER', v: wxV, d: wxD },
      { k: 'MONEY', v: fxV, d: fxD }
    ];
    const cards = live.concat(city.notes.map((n) => ({ k: n.k, v: esc(n.v), d: esc(n.d) })));
    const rot = [-1.5, 1, 1, -1, -1, 1.5, 1, -1.5];
    return `
${head(1, 'CITY NOTES', '도시·나라 노트')}
<p class="section" style="margin:16px 0 0;font-size:15px;line-height:1.6">${esc(city.intro)}</p>
<div class="notes-grid">${cards.map((c, i) => `<div class="note" style="transform:rotate(${rot[i % rot.length]}deg)"><div class="k">${c.k}</div><div class="v">${c.v}</div><div class="d">${c.d}</div></div>`).join('')}</div>
${goldenCard(city)}
<div class="band"><span class="anton" style="font-size:20px;flex:none">${esc(city.bandLabel)}</span><span class="pen" style="font-size:22px;line-height:1.15">${esc(city.countryTip)}</span></div>
<p class="section muted" style="font-size:11px;margin:10px 0 0">이 잡지의 정보는 ${esc(city.checked)}에 확인했어요. 요금·운영 시간은 바뀔 수 있어요.</p>`;
  }

  function goldenCard(city) {
    const g = goldenFor(city);
    return `<section class="card" aria-label="골든아워" style="position:relative;margin:18px 20px 0;padding:14px 16px;background:linear-gradient(180deg,#FFD23F,#FF8A3D);overflow:hidden">
      <div style="display:flex;align-items:baseline;justify-content:space-between"><span class="anton" style="font-size:12px;letter-spacing:2px">GOLDEN HOUR · ${esc(fmtDate(tripDate(city)))}</span><span class="pen" style="font-size:19px">사진 찍기 제일 예쁜 시간</span></div>
      <div class="anton" style="font-size:40px;line-height:1.05;margin-top:4px">${g.golden} – ${g.sunset}</div>
      <div style="display:flex;gap:14px;font-size:12px;font-weight:700;margin-top:4px"><span>일몰 ${g.sunset}</span><span>블루아워 ~${g.blue}</span></div>
      <svg width="70" height="70" viewBox="0 0 100 100" aria-hidden="true" style="position:absolute;right:-8px;bottom:-18px;opacity:.9"><circle cx="50" cy="50" r="30" fill="#FFF1B0" stroke="#141210" stroke-width="4"/></svg>
    </section>`;
  }

  function pArrive(city) {
    const A = city.arrive;
    const d = tripDate(city);
    const monthEn = new Date(Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, 15)).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const gq = 'https://www.google.com/search?q=' + encodeURIComponent(city.eventsKo ? city.eventsQuery + ' ' + d.slice(0, 4) + '년 ' + (+d.slice(5, 7)) + '월' : city.eventsQuery + ' ' + monthEn + ' ' + d.slice(0, 4));
    return `
${head(0, esc(city.arriveTitle), esc(city.arriveSub))}
<div class="card" style="margin:14px 20px 0;padding:12px 14px;background:#FFD23F;box-shadow:3px 3px 0 #141210">
  <div class="anton" style="font-size:12px;letter-spacing:2px">${esc(city.arriveHead)} · ${esc(A.asOf)}</div>
  <p style="margin:6px 0 0;font-size:13px;font-weight:500;line-height:1.5">${esc(A.note)}</p>
</div>
<div class="section" style="margin-top:14px">
  <div style="font-size:12px;font-weight:700;margin-bottom:6px">${esc(city.arrivePick)}</div>
  <div style="display:flex;gap:6px;flex-wrap:wrap">${A.picks.map((p, i) => `<button type="button" class="chip" data-arr="${p.id}" data-arri="${i}" aria-pressed="false">${esc(p.label)}</button>`).join('')}</div>
</div>
<div class="section" style="display:flex;flex-direction:column;gap:12px;margin-top:14px">
  ${A.opts.map((o) => `<article class="card arr" id="arr-${o.id}" style="display:flex;padding:0;overflow:hidden;box-shadow:3px 3px 0 #141210">
    <div style="flex:none;width:74px;background:${o.sign};color:#FFFFFF;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:8px 4px;border-right:2px solid #141210;text-align:center">
      <span class="anton" style="font-size:14px;line-height:1.1;letter-spacing:.5px">${esc(o.en)}</span><span style="font-size:10px;font-weight:700">${esc(o.signName)}</span>
    </div>
    <div style="flex:1;min-width:0;padding:10px 12px">
      <div style="font-size:16px;font-weight:700">${esc(o.name)}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px"><span class="look" style="margin:0">${esc(o.cost)}</span><span class="look" style="margin:0;background:#FFFFFF">${esc(o.time)}</span></div>
      <p style="margin:8px 0 0;font-size:13px;line-height:1.5">${esc(o.how)}</p>
      <p class="muted" style="margin:4px 0 0;font-size:12px">${esc(o.best)}</p>
    </div>
  </article>`).join('')}
  <p class="muted" style="font-size:11px;margin:0">${esc(A.foot || '요금·시간은 대략이에요. 우버·리프트는 시간대에 따라 더 비싸질 수 있어요. 출발 전 flylax.com에서 한 번 더 확인하세요.')}</p>
</div>
<div class="section">
  <div class="rule"><span>WHAT'S ON · ${esc(fmtDate(d))}</span><i></i></div>
  <div style="display:flex;flex-direction:column;gap:10px;margin-top:12px">
    ${city.events.map((e) => `<a class="card" href="${e.url}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;box-shadow:3px 3px 0 #141210"><div><div class="anton" style="font-size:18px">${esc(e.name)}</div><div class="muted" style="font-size:12px">${esc(e.what)}</div></div><span style="font-size:12px;font-weight:700;color:#1F4FBF;flex:none">보러 가기 ↗</span></a>`).join('')}
    <a class="card" href="${gq}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;box-shadow:3px 3px 0 #141210;background:#F2457C"><div><div class="anton" style="font-size:18px">${esc(monthEn.toUpperCase())} IN ${esc(city.short)}</div><div style="font-size:12px;font-weight:500">여행 달에 열리는 행사 검색</div></div><span style="font-size:12px;font-weight:700;flex:none">검색 ↗</span></a>
  </div>
</div>`;
  }

  function pHoods(city) {
    const pins = city.hoods.map((h, i) => `<button type="button" class="hood-pin" data-hood="${i}" aria-label="${i + 1}. ${esc(h.name)}" style="left:${(h.x / 360 * 100).toFixed(2)}%;top:${(h.y / 240 * 100).toFixed(2)}%"><span>${i + 1}</span><small>${esc(h.en)}</small></button>`).join('');
    return `
${head(0, 'NEIGHBORHOODS', '동네마다 옷이 달라요')}
<div class="hood-map card" style="margin:14px 12px 0">
  <svg viewBox="0 0 360 240" preserveAspectRatio="none" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%">
    <rect width="360" height="240" fill="#F3EAD8"/>
    ${city.hoodSvg || `<path d="M0 0 H40 C 52 60 50 110 60 150 C 72 196 96 214 118 240 H0 Z" fill="#BFD9E6"/>
    <path d="M40 0 C 52 60 50 110 60 150 C 72 196 96 214 118 240" fill="none" stroke="#141210" stroke-width="2"/>
    <path d="M120 20 C 170 40 230 30 260 40 C 290 50 320 40 360 52 V0 H120 Z" fill="#D9C3A0" opacity=".7"/>
    <text x="210" y="24" font-family="Permanent Marker, cursive" font-size="12" fill="#6B6259">hills</text>
    <path d="M60 162 C 140 150 220 148 360 158" stroke="#141210" stroke-width="2.2" stroke-dasharray="7 5" fill="none"/>
    <path d="M150 240 C 160 170 170 110 190 40" stroke="#141210" stroke-width="2.2" stroke-dasharray="7 5" fill="none"/>
    <path d="M230 240 C 260 200 290 150 330 90" stroke="#141210" stroke-width="2.2" stroke-dasharray="7 5" fill="none"/>
    <text x="16" y="222" font-family="Permanent Marker, cursive" font-size="13" fill="#5D8BA6" transform="rotate(-70 16 222)">Pacific</text>
    <text x="352" y="232" text-anchor="end" font-family="Anton, sans-serif" font-size="9" letter-spacing="1" fill="#6B6259">NOT TO SCALE</text>`}
  </svg>
  ${pins}
</div>
<div class="section" style="display:flex;flex-direction:column;gap:14px;margin-top:16px">
  ${city.hoods.map((h, i) => `<article class="card hood" id="hood-${i}" style="padding:12px 14px;transform:rotate(${i % 2 ? 0.8 : -0.8}deg)">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
      <div style="display:flex;align-items:center;gap:8px;min-width:0"><span class="num">${i + 1}</span><span style="font-size:16px;font-weight:700">${esc(h.name)}</span></div>
      <span class="anton" style="flex:none;font-size:12px;letter-spacing:1px;padding:3px 8px;background:${h.pal[0]};color:${h.pal[0] === '#141210' || h.pal[0] === '#8A5A3B' ? '#F3EAD8' : '#141210'};border:1.5px solid #141210">${esc(h.vibe)}</span>
    </div>
    <div class="muted" style="font-size:13px;margin-top:4px">${esc(h.what)}</div>
    <div style="display:flex;gap:6px;margin-top:8px" aria-hidden="true">${h.pal.map((p) => `<span style="width:28px;height:28px;border-radius:14px;background:${p};border:2px solid #141210"></span>`).join('')}</div>
    <div style="font-size:13px;margin-top:8px"><b>입을 것</b> · ${h.wear.map(esc).join(', ')}</div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:4px"><span style="font-size:13px"><b>갈 곳</b> · ${h.spots.map(esc).join(', ')}</span><a href="${mapsUrl(h.q)}" target="_blank" rel="noopener" style="flex:none;font-size:12px;font-weight:700;color:#1F4FBF;min-height:32px;display:inline-flex;align-items:center">지도 ↗</a></div>
    <button type="button" class="chip" data-savehood="${i}" aria-pressed="${inCloset(city.id + '|hood|' + i)}" style="margin-top:8px;min-height:36px;font-size:12px">${inCloset(city.id + '|hood|' + i) ? '옷장에 담김 ✓' : '옷장에 담기'}</button>
  </article>`).join('')}
</div>`;
  }

  function pieces(items) {
    return items.filter((it) => it.slot).map((it, i) => {
      const p = SLOTS[it.slot];
      return `<button class="piece" type="button" data-pick="${i}" aria-pressed="${state.pick === i}" aria-label="${i + 1}. ${esc(it.name)}" style="left:${p[0]}%;top:${p[1]}%;width:${p[2]}%;height:${p[3]}%">${art(it)}<span class="num">${i + 1}</span></button>`;
    }).join('');
  }

  function pLook(city) {
    const L = lookFor(city);
    const boardItems = L.items.filter((it) => it.slot);
    const extra = L.items.filter((it) => !it.slot);
    const list = boardItems.concat(extra);
    return `
${head(2, 'THE LOOK', esc(L.look.ko), `<div class="seg" role="group" aria-label="룩 선택"><button type="button" data-who="her" aria-pressed="${state.who === 'her'}">HER</button><button type="button" data-who="him" aria-pressed="${state.who === 'him'}">HIM</button></div>`)}
${wxLine(city, { extra: () => `이 날씨엔 <b>${esc(L.look.name)}</b> — ${esc(L.look.tip)}` })}
<div class="board" style="container-type:inline-size">
  ${L.items.some((it) => it.img)
    ? `<div style="position:absolute;left:4%;top:3%;width:42%;height:22%;background:#141210;color:#F3EAD8;transform:rotate(-3deg);display:flex;flex-direction:column;justify-content:center;padding:0 5%"><span class="anton" style="font-size:3.4cqw;letter-spacing:.5cqw;color:#FFD23F">TODAY'S LOOK</span><span class="anton" style="font-size:7cqw;line-height:1.02">${esc(L.look.name)}</span><span class="pen" style="font-size:5.4cqw;line-height:1.1">${esc(fmtDate(L.w.date))} · ${L.w.max}° / ${L.w.min}°</span></div><div class="tape" style="left:16%;top:.5%;width:18%;height:3.6%;transform:rotate(-8deg)"></div>`
    : `<div style="position:absolute;left:3%;top:2%;width:44%;height:25%;background:#F3E6CF;display:flex;align-items:center;justify-content:center">${svgIcon(city.boardArt, '#F2457C')}</div>`}
  <div class="word" style="left:4%;top:29%;font-size:15cqw"><div>${esc(city.word[0])}</div><div style="padding-left:7%"><span style="color:#F2457C">${esc(city.word[1][0])}</span>${esc(city.word[1].slice(1))}</div><div style="padding-left:2%">${esc(city.word[2])}</div></div>
  ${L.items.some((it) => it.img) ? '' : `<div style="position:absolute;left:36%;top:20%;width:17%;height:11%;transform:rotate(-8deg)">${svgIcon('camera', '#D6D2CC', '#3A3F5C')}</div>`}
  ${pieces(L.items)}
  ${burst('left:79%;top:84%;width:19cqw;height:19cqw;transform:rotate(-12deg)', String(boardItems.length), 'ITEMS', '5.5cqw', '2.8cqw')}
</div>
<ol class="item-list">${list.map((it, i) => `<li data-row="${i}" class="${state.pick === i ? 'hl' : ''}"><span class="num">${i + 1}</span><span><b>${esc(it.name)}</b> <span class="muted">— ${esc(it.note)}</span></span></li>`).join('')}</ol>
<div class="section" style="margin-top:14px;display:flex;flex-direction:column;gap:8px"><button type="button" class="btn" data-lookcard style="width:100%">룩 카드 저장 · 공유</button><button type="button" class="btn ghost" data-savelook aria-pressed="${inCloset(city.id + '|' + L.b + '|' + state.who)}" style="width:100%">${inCloset(city.id + '|' + L.b + '|' + state.who) ? '옷장에 담김 ✓' : '옷장에 담기'}</button><a class="btn yellow" href="#${city.id}-pack" style="width:100%">이 룩으로 짐 싸기 ${chev('right')}</a></div>`;
  }

  function pBeauty(city) {
    const w = dayWx(city);
    const note = w.uv != null ? `그날 자외선 지수 최고 ${Math.round(w.uv)} — ${w.uv >= 6 ? '선크림 필수!' : '그래도 자외선 차단은 챙기기'}` : city.beautyNote;
    return `
${head(3, 'BEAUTY KIT', esc(city.beautySub))}
${wxLine(city, { extra: () => esc(note) })}
<div class="board short" style="container-type:inline-size">
  <div class="word" style="left:4%;top:5%;font-size:14cqw"><div>${esc(city.glow[0])}</div><div style="padding-left:9%;color:#F2457C">${esc(city.glow[1])}</div><div style="padding-left:3%">${esc(city.glow[2])}</div></div>
  ${city.beauty.map((b, i) => `<button class="piece" type="button" data-pick="${i}" aria-pressed="${state.pick === i}" aria-label="${i + 1}. ${esc(b.name)}" style="left:${b.pos[0]}%;top:${b.pos[1]}%;width:${b.pos[2]}%;height:${b.pos[3]}%">${art(b)}<span class="num">${i + 1}</span></button>`).join('')}
  <div style="position:absolute;left:24%;top:80%;width:18%;height:13%;transform:rotate(-10deg)">${svgIcon('clip', '#FFD23F')}</div>
  ${burst('left:80%;top:40%;width:17cqw;height:17cqw;transform:rotate(12deg)', String(city.beauty.length), 'ITEMS', '5cqw', '2.5cqw')}
  <div class="pen" style="position:absolute;left:4%;top:60%;font-size:6.2cqw;line-height:1.05;color:#C2185B;transform:rotate(-4deg)">${esc(city.beautyScribble[0])}<br>${esc(city.beautyScribble[1])}</div>
</div>
<ol class="item-list">${city.beauty.map((b, i) => `<li data-row="${i}" class="${state.pick === i ? 'hl' : ''}"><span class="num">${i + 1}</span><span><b>${esc(b.name)}</b> <span class="muted">— ${esc(b.why)}</span></span></li>`).join('')}</ol>`;
  }

  function pDay(city) {
    const L = lookFor(city);
    const G = goldenFor(city);
    return `
${head(4, 'DAY COURSE', '이 룩 입고 하루 돌기')}
${wxLine(city, { extra: () => `오늘의 룩: <b>${esc(L.look.name)}</b> · 골든아워 ${G.golden}–${G.sunset}` })}
<div class="timeline">
  ${city.day.map((s0) => { const s = Object.assign({}, s0, s0.at === 'golden' ? { time: G.golden } : s0.at === 'after' ? { time: roundTo10(G.sunsetDate, 40, city.tz) || s0.time } : {}); return `<article class="stop">
    <div style="display:flex;gap:12px;align-items:flex-start">
      <div style="flex:none;width:52px;height:52px;border:2px solid #141210;border-radius:12px;background:${s.c};padding:6px">${svgIcon(s.icon, s.c === '#FFFFFF' ? '#F3EAD8' : s.c)}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:baseline;gap:8px"><span class="t">${s.time}</span><span class="muted" style="font-size:12px">${esc(s.area)}</span></div>
        <div style="font-size:16px;font-weight:700">${esc(s.place)}</div>
        <div style="font-size:13px;margin-top:2px">${esc(s.what)}</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
      <span class="look">${esc(s.look)}</span>
      <a href="${mapsUrl(s.q)}" target="_blank" rel="noopener" style="font-size:12px;font-weight:700;color:#1F4FBF;min-height:32px;display:inline-flex;align-items:center">지도 보기 ↗</a>
    </div>
  </article>`; }).join('')}
</div>
<p class="section pen" style="font-size:21px;margin:4px 0 0">${esc(city.dayAlt)}</p>
<p class="section muted" style="font-size:11px;margin:6px 0 0">추천 시간은 참고용이에요. 운영 시간·휴무일은 방문 전 확인하세요.</p>`;
  }

  function pEat(city) {
    const row = (kind) => (p, i) => `<a class="place" href="${mapsUrl(p.q)}" target="_blank" rel="noopener" style="transform:rotate(${[-0.8, 0.6, -0.4][i % 3]}deg)">
      <span class="place-n" style="background:${p.c}">${i + 1}</span>
      <span class="place-b"><span class="place-k">${kind} · ${esc(p.what)}</span><span class="place-t">${esc(p.name)}</span>${p.tip ? `<span class="place-tip">${esc(p.tip)}</span>` : ''}</span>
      <span class="place-go">지도 ↗</span>
    </a>`;
    return `
${head(5, 'EAT &amp; GO', '맛집 &amp; 꼭 가볼 곳')}
<div class="section">
  <div class="rule"><span>EAT</span><i></i></div>
  <div class="places">${city.eat.map(row('EAT')).join('')}</div>
  <div class="rule" style="margin-top:28px"><span>GO</span><i></i></div>
  <div class="places">${city.go.map(row('GO')).join('')}</div>
  <div class="card" style="margin-top:24px;padding:12px 14px;box-shadow:none;border-style:dashed;transform:rotate(-1deg)"><span class="pen" style="font-size:21px;line-height:1.15">${esc(city.goTip)}</span></div>
  <p class="muted" style="font-size:11px;margin:10px 0 0">카드를 누르면 구글 지도에서 사진·후기·영업시간을 볼 수 있어요.</p>
</div>`;
  }

  function pRead(city) {
    const yt = (q) => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
    const rot = [-1.2, 1, -0.6, 1.4];
    return `
${head(6, 'READ &amp; WATCH', '매거진 기사 &amp; 유튜브 가이드')}
${city.read.map((g) => `<div class="section"><div class="rule"><span>${g.k}</span><i></i></div>
  <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px">${g.items.map((m, i) => `<a class="card" href="${m.url}" target="_blank" rel="noopener" style="display:block;padding:12px 14px;box-shadow:3px 3px 0 #141210;transform:rotate(${rot[i % rot.length]}deg)">
    <div style="display:flex;align-items:baseline;justify-content:space-between;gap:8px"><span class="anton" style="font-size:18px">${esc(m.mag)}</span><span style="font-size:11px;font-weight:700;color:#1F4FBF;flex:none">읽으러 가기 ↗</span></div>
    <div style="font-size:13px;font-weight:700;margin-top:4px">${esc(m.title)}</div>
    <div class="muted" style="font-size:12px;margin-top:2px">${esc(m.ko)}</div>
  </a>`).join('')}</div></div>`).join('')}
<div class="section"><div class="rule"><span>WATCH</span><i></i></div>
  <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:12px">${city.watch.map((w, i) => `<a class="card" href="${yt(w.q)}" target="_blank" rel="noopener" style="display:flex;flex-direction:column;gap:6px;padding:12px;box-shadow:3px 3px 0 #141210;background:${i % 2 ? '#FFFFFF' : '#FFD23F'}">
    <span aria-hidden="true" style="width:40px;height:28px;border-radius:8px;background:#E0245E;border:2px solid #141210;display:flex;align-items:center;justify-content:center"><svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 1 L11 6 L2 11 Z" fill="#FFFFFF"/></svg></span>
    <span style="font-size:14px;font-weight:700;line-height:1.2">${esc(w.label)}</span>
    <span class="muted" style="font-size:11px">${esc(w.sub)} · 유튜브 ↗</span>
  </a>`).join('')}</div>
  <p class="muted" style="font-size:11px;margin:12px 0 0">기사는 각 매체 사이트에서, 영상은 유튜브에서 열려요. 유튜브는 늘 최신 영상이 나오도록 검색 결과로 연결해요.</p>
</div>`;
  }

  function tipResult() {
    const bill = parseFloat(String(state.bill).replace(/,/g, ''));
    if (!(bill > 0)) return null;
    const tip = bill * state.tipPct / 100;
    const total = bill + tip;
    const per = total / state.split;
    return { tip, total, per };
  }
  function tipHtml() {
    const r = tipResult();
    if (!r) return '<p class="muted" style="font-size:13px;margin:12px 0 0">금액을 넣으면 팁과 1인당 금액이 계산돼요.</p>';
    const krw = state.fx ? `<p style="margin:10px 0 0;font-size:13px">1인당 약 <b>${fmtKRW(r.per * state.fx)}</b> <span class="muted">(실시간 환율)</span></p>` : '';
    return `<div class="result"><div><small>팁 ${state.tipPct}%</small><b>${fmtUSD(r.tip)}</b></div><div><small>합계</small><b>${fmtUSD(r.total)}</b></div><div><small>1인당 (${state.split}명)</small><b>${fmtUSD(r.per)}</b></div></div>${krw}`;
  }

  const taxRate = (city) => (state.taxRate != null ? state.taxRate : city.tax[0].rate);
  function shopHtml(city) {
    const p = parseFloat(String(state.shopPrice).replace(/,/g, ''));
    if (!(p > 0)) return '<p class="muted" style="font-size:13px;margin:12px 0 0">가격을 넣으면 세금 포함 금액과 원화가 나와요.</p>';
    const r = taxRate(city);
    const tax = p * r / 100, total = p + tax;
    const krw = state.fx ? `<div><small>원화 (실시간)</small><b>${fmtKRW(total * state.fx)}</b></div>` : `<div><small>원화</small><b>—</b></div>`;
    return `<div class="result"><div><small>세금 ${r}%</small><b>${fmtUSD(tax)}</b></div><div><small>결제 금액</small><b>${fmtUSD(total)}</b></div>${krw}</div>`;
  }

  function splitHtmlKr() {
    const amt = parseFloat(String(state.bill).replace(/,/g, ''));
    if (!(amt > 0)) return '<p class="muted" style="font-size:13px;margin:12px 0 0">금액을 넣으면 1인당 금액이 나와요.</p>';
    return `<div class="result" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div><small>합계</small><b>${fmtKRW(amt)}</b></div><div><small>1인당 (${state.split}명)</small><b>${fmtKRW(Math.ceil(amt / state.split / 100) * 100)}</b></div></div><p class="muted" style="font-size:12px;margin:8px 0 0">1인당 금액은 100원 단위로 올림했어요.</p>`;
  }
  function pToolsKr(city) {
    return `
${head(7, 'TOOLS', '같이 간 사람과 깔끔하게')}
<section class="card tool" aria-label="더치페이 계산기">
  <div style="display:flex;align-items:center;justify-content:space-between"><h3 class="anton" style="margin:0;font-size:20px;font-weight:400">SPLIT THE BILL</h3><span class="pen" style="font-size:19px">N분의 1!</span></div>
  <label class="field" style="margin-top:10px"><span class="anton" style="font-size:24px">₩</span><input data-kbill inputmode="numeric" placeholder="계산 금액" value="${esc(state.bill)}" aria-label="계산 금액 (원)"></label>
  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px"><span style="font-size:13px;font-weight:700">나눠 낼 사람</span><div class="stepper"><button type="button" data-ksplit="-1" aria-label="한 명 빼기">−</button><output data-ksplitout>${state.split}</output><button type="button" data-ksplit="1" aria-label="한 명 더하기">+</button></div></div>
  <div data-kout>${splitHtmlKr()}</div>
</section>
<section class="card tool" aria-label="서울 팁">
  <h3 class="anton" style="margin:0;font-size:20px;font-weight:400">GOOD TO KNOW</h3>
  <ul style="margin:10px 0 0;padding-left:18px;font-size:14px;line-height:1.7">
    <li>팁 문화가 없고, 가격에 부가세가 포함돼 있어요.</li>
    <li>인기 팝업·맛집은 현장 대기 앱이나 예약이 필요한 곳이 많아요.</li>
    <li>시장에선 현금이나 계좌이체가 편할 때가 있어요.</li>
  </ul>
</section>`;
  }

  function fxHtml(city) {
    const amt = parseFloat(String(state.bill).replace(/,/g, ''));
    const per = krwPer(city);
    if (!(amt > 0)) return '<p class="muted" style="font-size:13px;margin:12px 0 0">금액을 넣으면 원화와 1인당 금액이 나와요.</p>';
    const each = amt / state.split;
    const fmtL = (n) => city.cur.sym + (city.cur.code === 'JPY' ? Math.round(n).toLocaleString('en-US') : n.toFixed(2));
    return `<div class="result"><div><small>원화 (실시간)</small><b>${per ? fmtKRW(amt * per) : '—'}</b></div><div><small>1인당 (${state.split}명)</small><b>${fmtL(each)}</b></div><div><small>1인당 원화</small><b>${per ? fmtKRW(each * per) : '—'}</b></div></div>${per ? '' : '<p class="muted" style="font-size:12px;margin:8px 0 0">환율을 불러오지 못했어요. 연결되면 원화가 표시돼요.</p>'}`;
  }
  function pToolsIntl(city) {
    return `
${head(7, 'TOOLS', '현지에서 바로 쓰는 계산기')}
<section class="card tool" aria-label="환율 계산기">
  <div style="display:flex;align-items:center;justify-content:space-between"><h3 class="anton" style="margin:0;font-size:20px;font-weight:400">${esc(city.cur.code)} → KRW</h3><span class="pen" style="font-size:19px">얼마지? 바로 계산!</span></div>
  <label class="field" style="margin-top:10px"><span class="anton" style="font-size:24px">${esc(city.cur.sym)}</span><input data-kbill inputmode="decimal" placeholder="현지 금액" value="${esc(state.bill)}" aria-label="현지 금액"></label>
  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px"><span style="font-size:13px;font-weight:700">나눠 낼 사람</span><div class="stepper"><button type="button" data-ksplit="-1" aria-label="한 명 빼기">−</button><output data-ksplitout>${state.split}</output><button type="button" data-ksplit="1" aria-label="한 명 더하기">+</button></div></div>
  <div data-kout>${fxHtml(city)}</div>
</section>
<section class="card tool" aria-label="알아 두면 좋은 것">
  <h3 class="anton" style="margin:0;font-size:20px;font-weight:400">GOOD TO KNOW</h3>
  <ul style="margin:10px 0 0;padding-left:18px;font-size:14px;line-height:1.7">${city.know.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
</section>`;
  }

  function pTools(city) {
    if (city.tools === 'kr') return pToolsKr(city);
    if (city.tools === 'intl') return pToolsIntl(city);
    const g = state.sizeG, t = state.sizeT;
    const rows = SIZES[g][t];
    const table = t === 'clothes'
      ? `<table class="size-table"><thead><tr><th>한국</th><th>US 사이즈</th>${g === 'women' ? '<th>US 숫자</th>' : ''}</tr></thead><tbody>${rows.map((r) => `<tr><td>${r[0]}</td><td><b>${r[1]}</b></td>${g === 'women' ? `<td>${r[2]}</td>` : ''}</tr>`).join('')}</tbody></table>`
      : `<table class="size-table"><thead><tr><th>한국 (mm)</th><th>US</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${r[0]}</td><td><b>${r[1]}</b></td></tr>`).join('')}</tbody></table>`;
    return `
${head(7, 'TOOLS', '현지에서 바로 쓰는 계산기')}
<section class="card tool" aria-label="팁 계산기">
  <div style="display:flex;align-items:center;justify-content:space-between"><h3 class="anton" style="margin:0;font-size:20px;font-weight:400">TIP CALCULATOR</h3><span class="pen" style="font-size:19px">식당에서 바로!</span></div>
  <label class="field" style="margin-top:10px"><span class="anton" style="font-size:24px">$</span><input data-bill inputmode="decimal" placeholder="계산서 금액" value="${esc(state.bill)}" aria-label="계산서 금액 (달러)"></label>
  <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">${[15, 18, 20, 22].map((p) => `<button type="button" class="chip" data-tip="${p}" aria-pressed="${state.tipPct === p}">${p}%</button>`).join('')}</div>
  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px"><span style="font-size:13px;font-weight:700">나눠 낼 사람</span><div class="stepper"><button type="button" data-split="-1" aria-label="한 명 빼기">−</button><output data-splitout>${state.split}</output><button type="button" data-split="1" aria-label="한 명 더하기">+</button></div></div>
  <div data-tipout>${tipHtml()}</div>
  <p class="muted" style="font-size:12px;margin:10px 0 0">${esc(city.tipNote)}</p>
</section>
<section class="card tool" aria-label="쇼핑 계산기">
  <div style="display:flex;align-items:center;justify-content:space-between"><h3 class="anton" style="margin:0;font-size:20px;font-weight:400">SHOPPING</h3><span class="pen" style="font-size:19px">가격표엔 세금이 빠져 있어요</span></div>
  <label class="field" style="margin-top:10px"><span class="anton" style="font-size:24px">$</span><input data-price inputmode="decimal" placeholder="가격표 금액" value="${esc(state.shopPrice)}" aria-label="가격표 금액 (달러)"></label>
  <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">${city.tax.map((t) => `<button type="button" class="chip" data-tax="${t.rate}" aria-pressed="${taxRate(city) === t.rate}">${esc(t.name)} ${t.rate}%</button>`).join('')}</div>
  <div data-shopout>${shopHtml(city)}</div>
  <p class="muted" style="font-size:12px;margin:10px 0 0">${esc(city.taxNote)}</p>
</section>
<section class="card tool" aria-label="사이즈 변환표">
  <h3 class="anton" style="margin:0;font-size:20px;font-weight:400">SIZE GUIDE</h3>
  <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
    <div class="seg" role="group" aria-label="성별"><button type="button" data-sg="women" aria-pressed="${g === 'women'}">여성</button><button type="button" data-sg="men" aria-pressed="${g === 'men'}">남성</button></div>
    <div class="seg" role="group" aria-label="종류"><button type="button" data-st="clothes" aria-pressed="${t === 'clothes'}">옷</button><button type="button" data-st="shoes" aria-pressed="${t === 'shoes'}">신발</button></div>
  </div>
  ${table}
  <p class="muted" style="font-size:12px;margin:10px 0 0">일반적인 기준이에요. 미국 옷은 한 치수 크게 나오는 편이라 꼭 입어 보세요.</p>
</section>`;
  }

  function packGroups(city) {
    const L = lookFor(city);
    return [
      { id: 'docs', title: 'ESSENTIALS', items: city.essentials },
      { id: 'look-' + L.b + '-' + state.who, title: 'THE LOOK · ' + L.look.name, items: L.items.map((it) => it.name) },
      { id: 'beauty', title: 'BEAUTY KIT', items: city.beauty.map((b) => b.name) }
    ];
  }
  function packState(city) { return store.get('pack:' + city.id, {}); }

  function pPack(city) {
    const groups = packGroups(city);
    const st = packState(city);
    let total = 0, done = 0;
    groups.forEach((g) => g.items.forEach((n) => { total++; if (st[g.id + '|' + n]) done++; }));
    const pct = total ? Math.round(done / total * 100) : 0;
    return `
${head(8, 'PACKING', '룩 + 뷰티로 짐 싸기', `<div class="seg" role="group" aria-label="룩 선택"><button type="button" data-who="her" aria-pressed="${state.who === 'her'}">HER</button><button type="button" data-who="him" aria-pressed="${state.who === 'him'}">HIM</button></div>`)}
${wxLine(city, { extra: (w) => `${fmtDate(w.date)} 날씨 기준으로 옷이 바뀌어요` })}
<div class="section" style="margin-top:16px">
  <div style="display:flex;align-items:baseline;justify-content:space-between"><span class="anton" style="font-size:22px"><span data-done>${done}</span> / ${total}</span><span style="font-size:12px;font-weight:700"><span data-pct>${pct}</span>% 완료</span></div>
  <div class="progress" style="margin-top:6px" aria-hidden="true"><i data-bar style="width:${pct}%"></i></div>
</div>
${groups.map((g) => `<fieldset class="check-group" style="border:0;padding:0;min-width:0"><legend class="sr">${esc(g.title)}</legend><h3>${esc(g.title)}</h3>${g.items.map((n) => { const key = g.id + '|' + n; return `<label class="check"><input type="checkbox" data-key="${esc(key)}" ${st[key] ? 'checked' : ''}><span>${esc(n)}</span></label>`; }).join('')}</fieldset>`).join('')}
<div class="section" style="display:flex;gap:10px;margin-top:18px"><button type="button" class="btn yellow" data-copy style="flex:1">목록 복사</button><button type="button" class="btn ghost" data-reset style="flex:1">체크 초기화</button></div>`;
  }

  function pZine(city) {
    return `${head(9, 'MY ZINE', '나만의 ' + esc(city.name) + ' 한 페이지')}<div id="zine-root"></div>`;
  }

  function pNext(city) {
    const soon = Object.keys(C).filter((id) => !C[id].open);
    return `
${head(10, 'NEXT STOP', soon.length ? '다음 도시를 준비 중이에요' : '다음엔 어느 도시로 갈까요?')}
<div class="section" style="margin-top:18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px">
  ${soon.length ? soon.map((id, i) => `<div class="card" style="padding:14px;transform:rotate(${i % 2 ? 2 : -2}deg);background:${['#F2457C', '#FFD23F', '#BFD9E6', '#FFFFFF'][i % 4]}"><div class="anton" style="font-size:26px;line-height:1">${esc(C[id].en)}</div><div style="font-size:12px;font-weight:700;margin-top:4px">${esc(C[id].name)} · SOON</div></div>`).join('')
    : Object.keys(C).filter((id) => id !== city.id).map((id, i) => `<a href="#${id}" class="card" style="padding:14px;transform:rotate(${i % 2 ? 2 : -2}deg);background:${['#F2457C', '#FFD23F', '#BFD9E6', '#FFFFFF'][i % 4]}"><div class="anton" style="font-size:${C[id].en.length > 9 ? 20 : 26}px;line-height:1">${esc(C[id].en)}</div><div style="font-size:12px;font-weight:700;margin-top:4px">${esc(C[id].name)} · OPEN</div></a>`).join('')}
</div>
<div class="section" style="margin-top:24px;display:flex;flex-direction:column;gap:10px">
  <a class="btn" href="#home">지도로 돌아가기</a>
  <a class="btn ghost" href="#${city.id}">이 잡지 처음부터 보기</a>
</div>`;
  }

  /* ---------- look card (1080x1350 image) ---------- */
  const loadImg = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
  const svgData = (svg) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));
  async function lookCard(city) {
    const L = lookFor(city);
    if (document.fonts && document.fonts.load) {
      await Promise.all(["400 60px 'Anton'", "900 60px 'Bodoni Moda'", "400 40px 'Nanum Pen Script'", "700 30px 'Noto Sans KR'"].map((f) => document.fonts.load(f).catch(() => null)));
    }
    const W = 1080, H = 1350;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');
    const INK = '#141210';
    g.fillStyle = '#F3EAD8'; g.fillRect(0, 0, W, H);
    g.strokeStyle = INK; g.lineWidth = 6; g.strokeRect(18, 18, W - 36, H - 36);
    g.textBaseline = 'alphabetic'; g.textAlign = 'left';
    g.font = "400 120px 'Anton', sans-serif";
    g.fillStyle = INK; g.fillText('OOTD', 66, 176); g.fillStyle = '#F2457C'; g.fillText('OOTD', 60, 170);
    g.fillStyle = INK; g.font = "400 30px 'Anton', sans-serif"; g.fillText(city.en + ' · THE LOOK', 360, 92);
    g.font = "400 64px 'Anton', sans-serif"; g.fillText(L.look.name, 360, 168);
    const w = L.w;
    g.font = "400 40px 'Nanum Pen Script', 'Noto Sans KR', cursive";
    g.fillText(fmtDate(w.date) + ' · ' + w.max + '° / ' + w.min + '° · ' + TR(L.look.ko), 64, 240);
    const bx = 60, by = 276, bw = 640, bh = 924;
    g.fillStyle = '#FFFFFF'; g.fillRect(bx, by, bw, bh);
    g.fillStyle = INK; g.fillRect(bx + 10, by + bh, bw, 10); g.fillRect(bx + bw, by + 10, 10, bh);
    g.lineWidth = 4; g.strokeRect(bx, by, bw, bh);
    const P = (p) => [bx + bw * p[0] / 100, by + bh * p[1] / 100, bw * p[2] / 100, bh * p[3] / 100];
    const fit = async (svg, r) => { const im = await loadImg(svgData(svg)); if (!im) return; const s = Math.min(r[2], r[3]); g.drawImage(im, r[0] + (r[2] - s) / 2, r[1] + (r[3] - s) / 2, s, s); };
    if (L.items.some((it) => it.img)) {
      const tr = P([4, 3, 42, 22]);
      g.save(); g.translate(tr[0] + tr[2] / 2, tr[1] + tr[3] / 2); g.rotate(-0.052);
      g.fillStyle = INK; g.fillRect(-tr[2] / 2, -tr[3] / 2, tr[2], tr[3]);
      g.fillStyle = '#FFD23F'; g.font = "400 20px 'Anton', sans-serif"; g.fillText("TODAY'S LOOK", -tr[2] / 2 + 26, -tr[3] / 2 + 44);
      g.fillStyle = '#F3EAD8'; g.font = "400 44px 'Anton', sans-serif";
      const words = L.look.name.split(' '); const lines = [];
      words.forEach((wd) => { const last = lines[lines.length - 1]; if (last && g.measureText(last + ' ' + wd).width <= tr[2] - 52) lines[lines.length - 1] = last + ' ' + wd; else lines.push(wd); });
      lines.slice(0, 2).forEach((ln, k) => g.fillText(ln, -tr[2] / 2 + 26, -tr[3] / 2 + 92 + k * 46));
      g.font = "400 32px 'Nanum Pen Script', cursive"; g.fillText(fmtDate(L.w.date) + ' · ' + L.w.max + '° / ' + L.w.min + '°', -tr[2] / 2 + 26, -tr[3] / 2 + 92 + Math.min(lines.length, 2) * 46 - 6);
      g.restore();
    } else {
      g.fillStyle = '#F3E6CF'; const hr = P([3, 2, 44, 25]); g.fillRect(hr[0], hr[1], hr[2], hr[3]);
      await fit(IC[city.boardArt]('#F2457C'), hr);
      await fit(IC.camera('#D6D2CC', '#3A3F5C'), P([36, 20, 17, 11]));
    }
    g.font = "900 96px 'Bodoni Moda', serif";
    const wx = bx + bw * 0.04, wy = by + bh * 0.29 + 86;
    g.fillStyle = INK; g.fillText(city.word[0], wx, wy);
    g.fillStyle = '#F2457C'; g.fillText(city.word[1][0], wx + 44, wy + 86); const aw = g.measureText(city.word[1][0]).width;
    g.fillStyle = INK; g.fillText(city.word[1].slice(1), wx + 44 + aw, wy + 86); g.fillText(city.word[2], wx + 12, wy + 172);
    const board = L.items.filter((it) => it.slot);
    for (let i = 0; i < board.length; i++) {
      const it = board[i];
      const r = P(SLOTS[it.slot]);
      if (it.img) { const ph = await loadImg(it.img); if (ph) { const k = Math.min(r[2] / ph.width, r[3] / ph.height); g.globalCompositeOperation = 'multiply'; g.drawImage(ph, r[0] + (r[2] - ph.width * k) / 2, r[1] + (r[3] - ph.height * k) / 2, ph.width * k, ph.height * k); g.globalCompositeOperation = 'source-over'; } }
      else await fit(IC[it.icon](it.c, it.a), r);
      g.fillStyle = INK; g.beginPath(); g.arc(r[0] + 8, r[1] + 8, 17, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#F3EAD8'; g.font = "400 20px 'Anton', sans-serif"; g.textAlign = 'center'; g.fillText(String(i + 1), r[0] + 8, r[1] + 15); g.textAlign = 'left';
    }
    const list = board.concat(L.items.filter((it) => !it.slot));
    let ly = 330;
    list.forEach((it, i) => {
      g.fillStyle = INK; g.beginPath(); g.arc(752, ly - 10, 17, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#F3EAD8'; g.font = "400 20px 'Anton', sans-serif"; g.textAlign = 'center'; g.fillText(String(i + 1), 752, ly - 3); g.textAlign = 'left';
      g.fillStyle = INK; g.font = "700 27px 'Noto Sans KR', sans-serif"; g.fillText(TR(it.name), 780, ly);
      g.fillStyle = '#4A433C'; g.font = "400 22px 'Noto Sans KR', sans-serif"; g.fillText(TR(it.note), 780, ly + 32);
      ly += 104;
    });
    g.fillStyle = '#FFD23F'; g.strokeStyle = INK; g.lineWidth = 3;
    g.save(); g.translate(880, 1150); g.rotate(-0.2);
    g.beginPath(); STAR.split(' ').forEach((p, i) => { const q = p.split(','); const x = (+q[0] - 50) * 1.5, y = (+q[1] - 50) * 1.5; if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = INK; g.textAlign = 'center'; g.font = "400 40px 'Anton', sans-serif"; g.fillText(String(board.length), 0, 4); g.font = "400 18px 'Anton', sans-serif"; g.fillText('ITEMS', 0, 28);
    g.restore();
    g.textAlign = 'left'; g.fillStyle = INK; g.font = "400 34px 'Nanum Pen Script', cursive"; g.fillText(TR(L.look.tip), 64, 1262);
    g.globalAlpha = 0.7; g.textAlign = 'right'; g.font = "400 26px 'Anton', sans-serif"; g.fillText('OOTD · OUT OF TOWN DAY', W - 44, H - 40); g.globalAlpha = 1;
    return c;
  }

  /* ---------- binding ---------- */
  function bindMag(r) {
    const city = C[r.city];
    const page = PAGES[r.idx];
    const view = $app.querySelector('[data-swipe]');

    const toc = document.getElementById('toc');
    if (toc) {
      const close = () => { toc.hidden = true; };
      $app.querySelectorAll('[data-toc]').forEach((b) => b.addEventListener('click', () => { toc.hidden = false; const c = toc.querySelector('[data-toc-close]'); if (c) c.focus(); }));
      toc.addEventListener('click', (e) => { if (e.target === toc || e.target.closest('[data-toc-close]')) close(); if (e.target.closest('[aria-current="page"]')) close(); });
    }

    // swipe between pages
    let sx = 0, sy = 0, st = 0, ok = false;
    view.addEventListener('pointerdown', (e) => {
      ok = page.id !== 'zine' && e.pointerType !== 'mouse' && !e.target.closest('input,select,textarea,.piece,.stepper');
      sx = e.clientX; sy = e.clientY; st = Date.now();
    });
    view.addEventListener('pointerup', (e) => {
      if (!ok) return;
      ok = false;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Date.now() - st > 700 || Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0 && r.idx < PAGES.length - 1) location.hash = hashFor(r.city, r.idx + 1);
      if (dx > 0 && r.idx > 0) location.hash = hashFor(r.city, r.idx - 1);
    });

    $app.querySelectorAll('[data-who]').forEach((b) => b.addEventListener('click', () => {
      state.who = b.getAttribute('data-who');
      store.set('who', state.who);
      state.pick = -1;
      refresh();
    }));
    $app.querySelectorAll('[data-date]').forEach((inp) => inp.addEventListener('change', () => {
      state.date = inp.value || null;
      store.set('date', state.date);
      refresh();
    }));
    $app.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => {
      const i = +b.getAttribute('data-pick');
      state.pick = state.pick === i ? -1 : i;
      $app.querySelectorAll('[data-pick]').forEach((x) => x.setAttribute('aria-pressed', String(+x.getAttribute('data-pick') === state.pick)));
      $app.querySelectorAll('[data-row]').forEach((x) => x.classList.toggle('hl', +x.getAttribute('data-row') === state.pick));
      const row = $app.querySelector('[data-row="' + i + '"]');
      if (row && state.pick === i) row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }));

    if (page.id === 'zine' && window.Zine) {
      const stop = window.Zine.mount(document.getElementById('zine-root'), city, { toast });
      cleanups.push(stop);
    }

    if (page.id === 'arrive') {
      $app.querySelectorAll('[data-arr]').forEach((b) => b.addEventListener('click', () => {
        const id = b.getAttribute('data-arr');
        $app.querySelectorAll('[data-arr]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        $app.querySelectorAll('.arr').forEach((x) => x.classList.toggle('hl', x.id === 'arr-' + id));
        const el = document.getElementById('arr-' + id);
        if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }));
    }

    if (page.id === 'hoods') {
      $app.querySelectorAll('[data-savehood]').forEach((b) => b.addEventListener('click', () => {
        const i = +b.getAttribute('data-savehood');
        const h = city.hoods[i];
        const on = toggleCloset({ id: city.id + '|hood|' + i, title: h.name + ' · ' + h.vibe, sub: city.name + ' 동네 스타일', items: h.wear, href: city.id + '-hoods' });
        b.setAttribute('aria-pressed', String(on));
        b.textContent = on ? '옷장에 담김 ✓' : '옷장에 담기';
        toast(on ? '옷장에 담았어요 — 지도 화면 아래에서 볼 수 있어요' : '옷장에서 뺐어요');
      }));
      $app.querySelectorAll('[data-hood]').forEach((b) => b.addEventListener('click', () => {
        const i = b.getAttribute('data-hood');
        $app.querySelectorAll('.hood').forEach((x) => x.classList.toggle('hl', x.id === 'hood-' + i));
        $app.querySelectorAll('[data-hood]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        const el = document.getElementById('hood-' + i);
        if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }));
    }

    if (page.id === 'look') {
      const sv = $app.querySelector('[data-savelook]');
      if (sv) sv.addEventListener('click', () => {
        const L = lookFor(city);
        const on = toggleCloset({ id: city.id + '|' + L.b + '|' + state.who, title: L.look.name, sub: city.name + ' · ' + (state.who === 'her' ? 'HER' : 'HIM') + ' · ' + L.look.ko, items: L.items.map((it) => it.name), href: city.id + '-look' });
        sv.setAttribute('aria-pressed', String(on));
        sv.textContent = on ? '옷장에 담김 ✓' : '옷장에 담기';
        toast(on ? '옷장에 담았어요 — 지도 화면 아래에서 볼 수 있어요' : '옷장에서 뺐어요');
      });
      const b = $app.querySelector('[data-lookcard]');
      if (b) b.addEventListener('click', async () => {
        b.disabled = true; b.textContent = '카드 만드는 중…';
        try { const c = await lookCard(city); await window.Zine.share(c, 'ootd-' + city.id + '-look.png', 'OOTD ' + city.en + ' look'); }
        catch (err) { toast('카드를 만들지 못했어요'); }
        finally { b.disabled = false; b.textContent = '룩 카드 저장 · 공유'; }
      });
    }

    if (page.id === 'notes') {
      timers.push(setInterval(() => { const el = $app.querySelector('[data-clock]'); if (el) el.textContent = localTime(city.tz); }, 20000));
    }

    if (page.id === 'tools' && (city.tools === 'kr' || city.tools === 'intl')) {
      const splitHtml = city.tools === 'intl' ? () => fxHtml(city) : splitHtmlKr;
      const out = $app.querySelector('[data-kout]');
      const bill = $app.querySelector('[data-kbill]');
      bill.addEventListener('input', () => { state.bill = bill.value; out.innerHTML = splitHtml(); });
      $app.querySelectorAll('[data-ksplit]').forEach((b) => b.addEventListener('click', () => {
        state.split = Math.max(1, Math.min(20, state.split + +b.getAttribute('data-ksplit')));
        $app.querySelector('[data-ksplitout]').textContent = state.split;
        out.innerHTML = splitHtml();
      }));
    }

    if (page.id === 'tools' && city.tools === 'us') {
      const out = $app.querySelector('[data-tipout]');
      const bill = $app.querySelector('[data-bill]');
      bill.addEventListener('input', () => { state.bill = bill.value; out.innerHTML = tipHtml(); });
      $app.querySelectorAll('[data-tip]').forEach((b) => b.addEventListener('click', () => {
        state.tipPct = +b.getAttribute('data-tip');
        $app.querySelectorAll('[data-tip]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        out.innerHTML = tipHtml();
      }));
      $app.querySelectorAll('[data-split]').forEach((b) => b.addEventListener('click', () => {
        state.split = Math.max(1, Math.min(20, state.split + +b.getAttribute('data-split')));
        $app.querySelector('[data-splitout]').textContent = state.split;
        out.innerHTML = tipHtml();
      }));
      const shopOut = $app.querySelector('[data-shopout]');
      const price = $app.querySelector('[data-price]');
      price.addEventListener('input', () => { state.shopPrice = price.value; shopOut.innerHTML = shopHtml(city); });
      $app.querySelectorAll('[data-tax]').forEach((b) => b.addEventListener('click', () => {
        state.taxRate = +b.getAttribute('data-tax');
        $app.querySelectorAll('[data-tax]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        shopOut.innerHTML = shopHtml(city);
      }));
      $app.querySelectorAll('[data-sg]').forEach((b) => b.addEventListener('click', () => { state.sizeG = b.getAttribute('data-sg'); refresh(); }));
      $app.querySelectorAll('[data-st]').forEach((b) => b.addEventListener('click', () => { state.sizeT = b.getAttribute('data-st'); refresh(); }));
    }

    if (page.id === 'pack') {
      const update = () => {
        const boxes = $app.querySelectorAll('[data-key]');
        let d = 0;
        boxes.forEach((x) => { if (x.checked) d++; });
        const pct = boxes.length ? Math.round(d / boxes.length * 100) : 0;
        $app.querySelector('[data-done]').textContent = d;
        $app.querySelector('[data-pct]').textContent = pct;
        $app.querySelector('[data-bar]').style.width = pct + '%';
        if (pct === 100) toast('짐 싸기 완료! 즐거운 여행 되세요');
      };
      $app.querySelectorAll('[data-key]').forEach((cb) => cb.addEventListener('change', () => {
        const s = packState(city);
        s[cb.getAttribute('data-key')] = cb.checked;
        store.set('pack:' + city.id, s);
        update();
      }));
      $app.querySelector('[data-copy]').addEventListener('click', () => {
        const s = packState(city);
        const text = 'OOTD · ' + city.en + (state.lang === 'en' ? ' packing list\n' : ' 짐 리스트\n') + packGroups(city).map((g) => '\n[' + g.title + ']\n' + g.items.map((n) => (s[g.id + '|' + n] ? '✓ ' : '☐ ') + TR(n)).join('\n')).join('\n');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => toast('목록을 복사했어요'), () => toast('복사가 막혀 있어요 — 길게 눌러 직접 복사해 주세요'));
        } else {
          toast('이 브라우저에선 복사가 안 돼요');
        }
      });
      $app.querySelector('[data-reset]').addEventListener('click', () => {
        store.set('pack:' + city.id, {});
        refresh();
        toast('체크를 모두 지웠어요');
      });
    }
  }

  window.addEventListener('hashchange', () => { state.pick = -1; render(); });
  I18N.set(state.lang);
  render();

  try {
    if ('serviceWorker' in navigator && location.protocol === 'https:' && location.hostname.endsWith('github.io')) {
      const hadController = !!navigator.serviceWorker.controller;
      navigator.serviceWorker.register('sw.js').catch(() => {});
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!hadController || document.getElementById('upd')) return;
        const bar = document.createElement('button');
        bar.id = 'upd'; bar.type = 'button'; bar.className = 'update-bar';
        bar.textContent = '새 버전이 준비됐어요 — 눌러서 새로고침';
        bar.addEventListener('click', () => location.reload());
        document.body.appendChild(bar);
      });
    }
  } catch (e) { /* not available in this viewer */ }
})();
