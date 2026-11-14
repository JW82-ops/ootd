// "MY ZINE" — a one-page collage maker: photos, stickers, tape and handwriting on a 4:5 page,
// moved with one finger, scaled/rotated with two, saved on the device and exported as a PNG.
(function () {
  'use strict';
  const K = '#141210';
  const PW = 1000, PH = 1250; // logical page size (4:5)
  const STAR = '50,0 58.5,13 71.7,5 73.7,20.3 89.1,18.8 84.2,33.5 98.7,38.9 88,50 98.7,61.1 84.2,66.5 89.1,81.2 73.7,79.7 71.7,95 58.5,87 50,100 41.5,87 28.3,95 26.3,79.7 10.9,81.2 15.8,66.5 1.3,61.1 12,50 1.3,38.9 15.8,33.5 10.9,18.8 26.3,20.3 28.3,5 41.5,13';
  const TORN = [[0, 2.9], [10, 2.8], [20, .2], [30, .3], [40, 2.5], [50, 2.2], [60, 2], [70, .9], [80, 1.8], [90, 1.8], [100, 1.7], [99.5, 10], [98.7, 20], [98.8, 30], [97.8, 40], [97, 50], [97.2, 60], [98.4, 70], [98.7, 80], [99.2, 90], [99.9, 100], [90, 99.9], [80, 98.6], [70, 99], [60, 98.9], [50, 97.3], [40, 98.4], [30, 98.3], [20, 99.3], [10, 99.9], [0, 99], [.4, 90], [1.5, 80], [3, 70], [2, 60], [.5, 50], [2.7, 40], [2.4, 30], [2.2, 20], [2.7, 10]];
  const TORN_CSS = 'polygon(' + TORN.map((p) => p[0] + '% ' + p[1] + '%').join(',') + ')';

  const FONTS = {
    anton: { css: "'Anton', 'Noto Sans KR', sans-serif", weight: 400, label: 'ANTON' },
    marker: { css: "'Permanent Marker', 'Noto Sans KR', cursive", weight: 400, label: 'Marker' },
    pen: { css: "'Nanum Pen Script', 'Noto Sans KR', cursive", weight: 400, label: '손글씨' },
    serif: { css: "'Bodoni Moda', 'Noto Sans KR', serif", weight: 900, label: 'Serif' }
  };
  const COLORS = ['#141210', '#F2457C', '#FFD23F', '#2D5BFF', '#FFFFFF'];
  const TAPES = ['rgba(214,200,170,0.88)', 'rgba(242,167,184,0.88)', 'rgba(191,214,238,0.92)', 'rgba(255,210,63,0.88)'];
  const X = 'xmlns="http://www.w3.org/2000/svg"';
  const STICKERS = {
    burst: { name: '별 뱃지', svg: `<svg ${X} viewBox="0 0 100 100"><polygon points="${STAR}" fill="#FFD23F" stroke="${K}" stroke-width="3"/></svg>`, label: 'NEW!', font: 'anton', color: K, ls: 0.22 },
    stamp: { name: '도장', svg: `<svg ${X} viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="#E0245E" stroke-width="5"/><circle cx="50" cy="50" r="37" fill="none" stroke="#E0245E" stroke-width="2"/></svg>`, label: 'L.A.\n2026', font: 'anton', color: '#E0245E', ls: 0.2 },
    bolt: { name: '번개', svg: `<svg ${X} viewBox="0 0 100 100"><path d="M62 2 L20 54 H46 L32 98 L84 38 H56 L72 2 Z" fill="#FFD23F" stroke="${K}" stroke-width="4" stroke-linejoin="round"/></svg>` },
    heart: { name: '하트', svg: `<svg ${X} viewBox="0 0 100 100"><path d="M50 88 C 20 66 6 48 10 30 C 14 14 34 8 50 26 C 66 8 86 14 90 30 C 94 48 80 66 50 88 Z" fill="#F2457C" stroke="${K}" stroke-width="4" stroke-linejoin="round"/></svg>` },
    star: { name: '별', svg: `<svg ${X} viewBox="0 0 100 100"><path d="M50 6 L62 38 L96 38 L68 58 L78 92 L50 72 L22 92 L32 58 L4 38 L38 38 Z" fill="#2D5BFF" stroke="${K}" stroke-width="4" stroke-linejoin="round"/></svg>` },
    arrow: { name: '화살표', svg: `<svg ${X} viewBox="0 0 100 100"><path d="M8 20 C 30 70 60 82 90 72 M90 72 L72 60 M90 72 L76 90" fill="none" stroke="${K}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
    xmark: { name: 'X 낙서', svg: `<svg ${X} viewBox="0 0 100 100"><path d="M16 16 L84 84 M84 16 L16 84" stroke="${K}" stroke-width="10" stroke-linecap="round"/></svg>` },
    palm: { name: '야자수', svg: `<svg ${X} viewBox="0 0 100 100"><path d="M50 98 C 50 76 52 56 58 36" stroke="${K}" stroke-width="6" fill="none" stroke-linecap="round"/><g fill="#2E7D4F" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"><path d="M58 36 C 44 24 26 24 12 36 C 28 32 42 34 58 40 Z"/><path d="M58 36 C 54 20 42 10 28 10 C 40 18 50 28 58 40 Z"/><path d="M58 36 C 64 20 76 12 92 14 C 78 20 68 28 60 40 Z"/><path d="M58 36 C 72 30 88 34 96 48 C 84 40 72 40 60 40 Z"/></g></svg>` },
    sun: { name: '해', svg: `<svg ${X} viewBox="0 0 100 100"><path d="M50 4 V18 M50 82 V96 M4 50 H18 M82 50 H96 M17 17 L27 27 M73 73 L83 83 M17 83 L27 73 M73 27 L83 17" stroke="${K}" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="50" r="24" fill="#FFD23F" stroke="${K}" stroke-width="4"/></svg>` },
    plane: { name: '비행기', svg: `<svg ${X} viewBox="0 0 100 100"><path d="M8 52 L40 50 L62 18 H72 L62 50 L82 49 L90 38 H96 L92 54 L96 70 H90 L82 59 L62 58 L72 90 H62 L40 58 L8 56 Z" fill="#FFFFFF" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/></svg>` }
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function storeGet(key) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function storeSet(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); return true; } catch (e) { return false; } }

  function template(city) {
    const d = new Intl.DateTimeFormat('en-CA', { timeZone: city.tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).replace(/-/g, '.');
    return [
      { id: uid(), type: 'text', text: city.zineTitle, font: 'anton', color: '#F2457C', shadow: true, size: 120, x: 300, y: 190, rot: -5, z: 1 },
      { id: uid(), type: 'sticker', key: 'stamp', label: city.zineStamp, x: 820, y: 170, w: 190, rot: 10, z: 2 },
      { id: uid(), type: 'text', text: d, font: 'pen', color: K, shadow: false, size: 64, x: 250, y: 380, rot: -3, z: 3 },
      { id: uid(), type: 'tape', color: TAPES[0], x: 560, y: 560, w: 300, rot: -8, z: 4 },
      { id: uid(), type: 'sticker', key: 'burst', label: city.zineBurst, x: 800, y: 1060, w: 240, rot: 8, z: 5 },
      { id: uid(), type: 'sticker', key: city.zineSticker, x: 150, y: 1060, w: 220, rot: -6, z: 6 }
    ];
  }

  async function shareCanvas(c, filename, title) {
    const blob = await new Promise((res) => c.toBlob(res, 'image/png'));
    const file = blob && typeof File !== 'undefined' ? new File([blob], filename, { type: 'image/png' }) : null;
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: title }); return; } catch (err) { if (err && err.name === 'AbortError') return; }
    }
    const url = c.toDataURL('image/png');
    const ov = document.createElement('div');
    ov.className = 'zine-overlay';
    ov.innerHTML = `<div class="zine-over-in" role="dialog" aria-label="저장할 이미지"><img src="${url}" alt="${esc(title)}"><p>이미지를 길게 눌러 사진에 저장하세요</p><div style="display:flex;gap:8px"><a class="btn yellow" href="${url}" download="${esc(filename)}" style="flex:1">다운로드</a><button type="button" class="btn" data-close style="flex:1">닫기</button></div></div>`;
    ov.addEventListener('click', (e) => { if (e.target === ov || e.target.closest('[data-close]')) ov.remove(); });
    document.body.appendChild(ov);
  }

  function mount(root, city, api) {
    const KEY = 'ootd:zine:' + city.id;
    let items = storeGet(KEY) || template(city);
    let sel = null;
    let warnedQuota = false;
    let clearArmed = false;

    root.innerHTML = `
<div class="zine-wrap">
  <div class="zine-page" id="zpage" aria-label="내 zine 페이지 — 요소를 끌어서 옮기고 두 손가락으로 크기와 각도를 바꿔요"></div>
  <p class="zine-hint">한 손가락으로 옮기고, 두 손가락으로 키우고 돌려요</p>
  <div id="zsel"></div>
  <div class="zine-tools">
    <div class="zine-tabs" role="group" aria-label="추가하기">
      <label class="btn yellow zine-photo"><input type="file" accept="image/*" multiple class="sr" id="zfile">사진 올리기</label>
      <button type="button" class="btn" data-z="text">글씨 넣기</button>
    </div>
    <div class="zine-row-label">스티커</div>
    <div class="zine-stickers">${Object.keys(STICKERS).map((k) => `<button type="button" class="zine-st" data-st="${k}" aria-label="${esc(STICKERS[k].name)} 추가">${STICKERS[k].svg}</button>`).join('')}</div>
    <div class="zine-row-label">테이프</div>
    <div class="zine-tapes">${TAPES.map((c, i) => `<button type="button" class="zine-tape" data-tape="${i}" aria-label="테이프 ${i + 1} 추가" style="background:${c}"></button>`).join('')}</div>
    <div class="zine-actions">
      <button type="button" class="btn" data-z="export">이미지로 저장 · 공유</button>
      <div style="display:flex;gap:8px">
        <button type="button" class="btn ghost" data-z="template" style="flex:1">템플릿으로</button>
        <button type="button" class="btn ghost" data-z="clear" style="flex:1">전체 지우기</button>
      </div>
    </div>
  </div>
  <div class="zine-overlay" id="zover" hidden></div>
</div>`;

    const page = root.querySelector('#zpage');
    const selBox = root.querySelector('#zsel');
    const scale = () => page.clientWidth / PW;
    const byId = (id) => items.find((i) => i.id === id);
    const maxZ = () => items.reduce((m, i) => Math.max(m, i.z || 0), 0);

    function save() {
      const ok = storeSet(KEY, items);
      if (!ok && !warnedQuota) { warnedQuota = true; api.toast('사진이 많아서 자동 저장이 안 될 수 있어요'); }
    }

    function itemStyle(it, s) {
      const base = `left:${(it.x * s).toFixed(1)}px;top:${(it.y * s).toFixed(1)}px;transform:translate(-50%,-50%) rotate(${it.rot}deg);z-index:${it.z || 0};`;
      if (it.type === 'text') return base;
      if (it.type === 'tape') return base + `width:${(it.w * s).toFixed(1)}px;height:${(it.w * 0.26 * s).toFixed(1)}px;background:${it.color};`;
      return base + `width:${(it.w * s).toFixed(1)}px;`;
    }
    function textStyle(it, s) {
      const f = FONTS[it.font] || FONTS.anton;
      const sh = it.shadow ? `text-shadow:${(it.size * 0.045 * s).toFixed(1)}px ${(it.size * 0.045 * s).toFixed(1)}px 0 ${K};` : '';
      return `font-family:${f.css};font-weight:${f.weight};font-size:${(it.size * s).toFixed(1)}px;color:${it.color};${sh}`;
    }
    function itemHTML(it, s) {
      const cls = 'zi' + (it.id === sel ? ' on' : '');
      if (it.type === 'photo') {
        const fr = it.frame || 'torn';
        return `<div class="${cls} zi-photo zf-${fr}" data-id="${it.id}" style="${itemStyle(it, s)}"><div class="zf"${fr === 'torn' ? ` style="clip-path:${TORN_CSS}"` : ''}><img src="${it.src}" alt="" draggable="false"></div></div>`;
      }
      if (it.type === 'tape') return `<div class="${cls} zi-tape" data-id="${it.id}" style="${itemStyle(it, s)}"></div>`;
      if (it.type === 'sticker') {
        const st = STICKERS[it.key];
        const label = it.label != null ? it.label : st.label;
        const lab = label ? `<span class="zi-label" style="font-family:${FONTS[st.font].css};color:${st.color};font-size:${(it.w * st.ls * s).toFixed(1)}px">${esc(label)}</span>` : '';
        return `<div class="${cls} zi-sticker" data-id="${it.id}" style="${itemStyle(it, s)}height:${(it.w * s).toFixed(1)}px">${st.svg}${lab}</div>`;
      }
      return `<div class="${cls} zi-text" data-id="${it.id}" style="${itemStyle(it, s)}${textStyle(it, s)}">${esc(it.text)}</div>`;
    }

    function draw() {
      const s = scale();
      page.innerHTML = items.slice().sort((a, b) => (a.z || 0) - (b.z || 0)).map((it) => itemHTML(it, s)).join('') +
        (items.length ? '' : '<div class="zine-empty">사진을 올리거나 스티커를 눌러 시작해요</div>');
      drawSel();
    }
    function restyle(it) {
      const el = page.querySelector('[data-id="' + it.id + '"]');
      if (!el) return;
      const s = scale();
      el.setAttribute('style', itemStyle(it, s) + (it.type === 'text' ? textStyle(it, s) : '') + (it.type === 'sticker' ? `height:${(it.w * s).toFixed(1)}px` : ''));
      if (it.type === 'sticker') {
        const lab = el.querySelector('.zi-label');
        if (lab) lab.style.fontSize = (it.w * STICKERS[it.key].ls * s).toFixed(1) + 'px';
      }
    }

    function drawSel() {
      const it = sel && byId(sel);
      if (!it) { selBox.innerHTML = ''; return; }
      const isText = it.type === 'text';
      const sizeVal = isText ? it.size : it.w;
      const sizeMin = isText ? 24 : 60, sizeMax = isText ? 320 : 1000;
      let extra = '';
      if (isText) {
        extra = `<label class="zine-field">글씨<textarea id="ztext" rows="2">${esc(it.text)}</textarea></label>
        <div class="zine-chips">${Object.keys(FONTS).map((f) => `<button type="button" class="chip" data-font="${f}" aria-pressed="${it.font === f}" style="font-family:${FONTS[f].css}">${FONTS[f].label}</button>`).join('')}</div>
        <div class="zine-chips">${COLORS.map((c) => `<button type="button" class="zine-color" data-color="${c}" aria-label="색 ${c}" aria-pressed="${it.color === c}" style="background:${c}"></button>`).join('')}<button type="button" class="chip" data-shadow aria-pressed="${!!it.shadow}">그림자</button></div>`;
      } else if (it.type === 'photo') {
        extra = `<div class="zine-chips">${[['torn', '찢은 종이'], ['polaroid', '폴라로이드'], ['plain', '그대로']].map((f) => `<button type="button" class="chip" data-frame="${f[0]}" aria-pressed="${(it.frame || 'torn') === f[0]}">${f[1]}</button>`).join('')}</div>`;
      } else if (it.type === 'tape') {
        extra = `<div class="zine-chips">${TAPES.map((c) => `<button type="button" class="zine-color" data-tapecolor="${c}" aria-label="테이프 색" aria-pressed="${it.color === c}" style="background:${c}"></button>`).join('')}</div>`;
      } else if (it.type === 'sticker' && STICKERS[it.key].label) {
        const label = it.label != null ? it.label : STICKERS[it.key].label;
        extra = `<label class="zine-field">스티커 글씨<input id="zlabel" value="${esc(label.replace(/\n/g, ' / '))}" maxlength="24"></label>`;
      }
      selBox.innerHTML = `<section class="card zine-sel" aria-label="선택한 요소 편집">
        <div style="display:flex;align-items:center;justify-content:space-between"><span class="anton" style="font-size:16px;letter-spacing:1px">EDIT</span><button type="button" class="btn ghost" data-z="done" style="min-height:36px;padding:0 12px;font-size:12px">선택 해제</button></div>
        <label class="zine-range">크기<input type="range" id="zsize" min="${sizeMin}" max="${sizeMax}" value="${Math.round(sizeVal)}"></label>
        <label class="zine-range">회전<input type="range" id="zrot" min="-180" max="180" value="${Math.round(it.rot)}"></label>
        ${extra}
        <div class="zine-chips"><button type="button" class="chip" data-z="front">맨 앞으로</button><button type="button" class="chip" data-z="dup">복제</button><button type="button" class="chip" data-z="del" style="background:#F2457C">삭제</button></div>
      </section>`;
      const zs = selBox.querySelector('#zsize'), zr = selBox.querySelector('#zrot');
      zs.addEventListener('input', () => { if (isText) it.size = +zs.value; else it.w = +zs.value; restyle(it); });
      zr.addEventListener('input', () => { it.rot = +zr.value; restyle(it); });
      zs.addEventListener('change', save); zr.addEventListener('change', save);
      const zt = selBox.querySelector('#ztext');
      if (zt) zt.addEventListener('input', () => { it.text = zt.value || ' '; const el = page.querySelector('[data-id="' + it.id + '"]'); if (el) el.textContent = it.text; save(); });
      const zl = selBox.querySelector('#zlabel');
      if (zl) zl.addEventListener('input', () => { it.label = zl.value.split(' / ').join('\n'); draw(); save(); });
      selBox.querySelectorAll('[data-font]').forEach((b) => b.addEventListener('click', () => { it.font = b.getAttribute('data-font'); draw(); save(); }));
      selBox.querySelectorAll('[data-color]').forEach((b) => b.addEventListener('click', () => { it.color = b.getAttribute('data-color'); draw(); save(); }));
      selBox.querySelectorAll('[data-tapecolor]').forEach((b) => b.addEventListener('click', () => { it.color = b.getAttribute('data-tapecolor'); draw(); save(); }));
      selBox.querySelectorAll('[data-frame]').forEach((b) => b.addEventListener('click', () => { it.frame = b.getAttribute('data-frame'); draw(); save(); }));
      const sh = selBox.querySelector('[data-shadow]');
      if (sh) sh.addEventListener('click', () => { it.shadow = !it.shadow; draw(); save(); });
    }

    function select(id) {
      if (sel === id) return;
      sel = id;
      page.querySelectorAll('.zi').forEach((el) => el.classList.toggle('on', el.getAttribute('data-id') === id));
      drawSel();
    }

    function add(it) {
      it.id = uid();
      it.z = maxZ() + 1;
      it.rot = it.rot != null ? it.rot : Math.round(Math.random() * 16 - 8);
      it.x = it.x != null ? it.x : 500 + Math.round(Math.random() * 160 - 80);
      it.y = it.y != null ? it.y : 625 + Math.round(Math.random() * 160 - 80);
      items.push(it);
      sel = it.id;
      draw();
      save();
    }

    /* ----- gestures ----- */
    const pts = new Map();
    let drag = null, pinch = null;
    const angle = (a, b) => Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
    const dist = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);

    function startPinch() {
      const it = sel && byId(sel);
      if (!it || pts.size < 2) return;
      const [a, b] = Array.from(pts.values());
      pinch = { d0: dist(a, b) || 1, a0: angle(a, b), base: it.type === 'text' ? it.size : it.w, rot0: it.rot };
      drag = null;
    }
    page.addEventListener('pointerdown', (e) => {
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try { page.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      if (pts.size === 2) { startPinch(); return; }
      const hit = e.target.closest('[data-id]');
      if (!hit) { if (sel) { sel = null; draw(); } return; }
      const id = hit.getAttribute('data-id');
      select(id);
      const it = byId(id);
      drag = { id, sx: e.clientX, sy: e.clientY, ox: it.x, oy: it.y, moved: false };
    });
    page.addEventListener('pointermove', (e) => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const it = sel && byId(sel);
      if (!it) return;
      if (pinch && pts.size >= 2) {
        const [a, b] = Array.from(pts.values());
        const k = dist(a, b) / pinch.d0;
        if (it.type === 'text') it.size = clamp(pinch.base * k, 24, 320); else it.w = clamp(pinch.base * k, 60, 1000);
        it.rot = Math.round(pinch.rot0 + angle(a, b) - pinch.a0);
        restyle(it);
        return;
      }
      if (drag && drag.id === it.id) {
        const s = scale();
        drag.moved = true;
        it.x = clamp(drag.ox + (e.clientX - drag.sx) / s, -100, PW + 100);
        it.y = clamp(drag.oy + (e.clientY - drag.sy) / s, -100, PH + 100);
        restyle(it);
      }
    });
    const up = (e) => {
      pts.delete(e.pointerId);
      if (pts.size < 2 && pinch) { pinch = null; drawSel(); save(); }
      if (pts.size === 0 && drag) { if (drag.moved) save(); drag = null; }
    };
    page.addEventListener('pointerup', up);
    page.addEventListener('pointercancel', up);
    page.addEventListener('dragstart', (e) => e.preventDefault());

    /* ----- adding ----- */
    function loadPhoto(file) {
      return new Promise((resolve) => {
        const fr = new FileReader();
        fr.onload = () => {
          const img = new Image();
          img.onload = () => {
            const m = 1100;
            const r = Math.min(1, m / Math.max(img.width, img.height));
            const c = document.createElement('canvas');
            c.width = Math.round(img.width * r); c.height = Math.round(img.height * r);
            c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
            resolve({ src: c.toDataURL('image/jpeg', 0.82), ar: c.width / c.height });
          };
          img.onerror = () => resolve(null);
          img.src = fr.result;
        };
        fr.onerror = () => resolve(null);
        fr.readAsDataURL(file);
      });
    }
    root.querySelector('#zfile').addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []).slice(0, 6);
      for (const f of files) {
        const p = await loadPhoto(f);
        if (p) add({ type: 'photo', src: p.src, ar: p.ar, w: 460, frame: 'torn', y: 700 + Math.round(Math.random() * 120 - 60) });
        else api.toast('이 사진은 열 수 없어요');
      }
      e.target.value = '';
    });
    root.querySelectorAll('[data-st]').forEach((b) => b.addEventListener('click', () => {
      const k = b.getAttribute('data-st');
      add(Object.assign({ type: 'sticker', key: k, w: k === 'burst' || k === 'stamp' ? 220 : 170 }, k === 'stamp' ? { label: city.zineStamp } : {}));
    }));
    root.querySelectorAll('[data-tape]').forEach((b) => b.addEventListener('click', () => add({ type: 'tape', color: TAPES[+b.getAttribute('data-tape')], w: 280 })));

    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-z]');
      if (!b) return;
      const act = b.getAttribute('data-z');
      const it = sel && byId(sel);
      if (act === 'text') add({ type: 'text', text: city.zineText, font: 'pen', color: K, shadow: false, size: 90 });
      if (act === 'done') { sel = null; draw(); }
      if (act === 'front' && it) { it.z = maxZ() + 1; draw(); save(); }
      if (act === 'dup' && it) add(Object.assign(JSON.parse(JSON.stringify(it)), { x: it.x + 40, y: it.y + 40 }));
      if (act === 'del' && it) { items = items.filter((i) => i.id !== it.id); sel = null; draw(); save(); }
      if (act === 'template') { items = template(city); sel = null; draw(); save(); api.toast('템플릿으로 바꿨어요'); }
      if (act === 'clear') {
        if (!clearArmed) { clearArmed = true; b.textContent = '한 번 더 누르면 지워져요'; setTimeout(() => { clearArmed = false; b.textContent = '전체 지우기'; }, 2500); return; }
        clearArmed = false; items = []; sel = null; draw(); save(); b.textContent = '전체 지우기';
      }
      if (act === 'export') exportImage();
      if (act === 'close') closeOverlay();
    });

    /* ----- export ----- */
    function loadImg(src) { return new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; }); }
    const svgUrl = (svg) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    function tornPath(ctx, x, y, w, h) {
      ctx.beginPath();
      TORN.forEach((p, i) => { const px = x + w * p[0] / 100, py = y + h * p[1] / 100; if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); });
      ctx.closePath();
    }
    function drawText(ctx, text, fontKey, sizePx, color, shadow) {
      const f = FONTS[fontKey] || FONTS.anton;
      ctx.font = `${f.weight} ${sizePx}px ${f.css}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const lines = String(text).split('\n');
      const lh = sizePx * 1.05;
      lines.forEach((ln, i) => {
        const y = (i - (lines.length - 1) / 2) * lh;
        if (shadow) { ctx.fillStyle = K; ctx.fillText(ln, sizePx * 0.045, y + sizePx * 0.045); }
        ctx.fillStyle = color;
        ctx.fillText(ln, 0, y);
      });
    }

    async function exportImage() {
      const btn = root.querySelector('[data-z="export"]');
      btn.disabled = true; btn.textContent = '만드는 중…';
      try {
        if (document.fonts && document.fonts.load) {
          await Promise.all(['anton', 'marker', 'pen', 'serif'].map((k) => document.fonts.load(`${FONTS[k].weight} 60px ${FONTS[k].css}`).catch(() => null)));
        }
        const W = 1080, H = 1350, k = W / PW;
        const c = document.createElement('canvas');
        c.width = W; c.height = H;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#FBF5E9';
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = K; ctx.lineWidth = 6; ctx.strokeRect(18, 18, W - 36, H - 36);
        const list = items.slice().sort((a, b) => (a.z || 0) - (b.z || 0));
        for (const it of list) {
          ctx.save();
          ctx.translate(it.x * k, it.y * k);
          ctx.rotate(it.rot * Math.PI / 180);
          if (it.type === 'photo') {
            const img = await loadImg(it.src);
            const w = it.w * k;
            const fr = it.frame || 'torn';
            const pad = fr === 'plain' ? 0 : fr === 'polaroid' ? w * 0.05 : w * 0.035;
            const iw = w - pad * 2, ih = iw / (it.ar || 1);
            const bottom = fr === 'polaroid' ? w * 0.16 : pad;
            const ow = w, oh = ih + pad + bottom;
            ctx.shadowColor = 'rgba(20,18,16,0.25)'; ctx.shadowBlur = 14; ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 6;
            if (fr === 'torn') { tornPath(ctx, -ow / 2, -oh / 2, ow, oh); ctx.fillStyle = '#FFFFFF'; ctx.fill(); }
            else if (fr === 'polaroid') { ctx.fillStyle = '#FFFFFF'; ctx.fillRect(-ow / 2, -oh / 2, ow, oh); }
            ctx.shadowColor = 'transparent';
            if (img) {
              if (fr === 'torn') { ctx.save(); tornPath(ctx, -ow / 2, -oh / 2, ow, oh); ctx.clip(); ctx.drawImage(img, -ow / 2 + pad, -oh / 2 + pad, iw, ih); ctx.restore(); }
              else ctx.drawImage(img, -ow / 2 + pad, -oh / 2 + pad, iw, ih);
            }
          } else if (it.type === 'tape') {
            const w = it.w * k, h = it.w * 0.26 * k;
            ctx.fillStyle = it.color; ctx.fillRect(-w / 2, -h / 2, w, h);
          } else if (it.type === 'sticker') {
            const st = STICKERS[it.key];
            const w = it.w * k;
            const img = await loadImg(svgUrl(st.svg));
            if (img) ctx.drawImage(img, -w / 2, -w / 2, w, w);
            const label = it.label != null ? it.label : st.label;
            if (label) drawText(ctx, label, st.font, w * st.ls, st.color, false);
          } else {
            drawText(ctx, it.text, it.font, it.size * k, it.color, it.shadow);
          }
          ctx.restore();
        }
        ctx.globalAlpha = 0.7;
        ctx.font = `400 26px ${FONTS.anton.css}`; ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = K;
        ctx.fillText('OOTD · ' + city.en, W - 44, H - 44);
        ctx.globalAlpha = 1;

        await shareCanvas(c, 'ootd-' + city.id + '-zine.png', 'My ' + city.en + ' zine');
      } catch (err) {
        api.toast('이미지를 만들지 못했어요');
      } finally {
        btn.disabled = false; btn.textContent = '이미지로 저장 · 공유';
      }
    }
    const over = root.querySelector('#zover');
    function showOverlay(url) {
      over.hidden = false;
      over.innerHTML = `<div class="zine-over-in" role="dialog" aria-label="저장할 이미지"><img src="${url}" alt="내 zine 이미지"><p>이미지를 길게 눌러 사진에 저장하세요</p><div style="display:flex;gap:8px"><a class="btn yellow" href="${url}" download="ootd-${city.id}-zine.png" style="flex:1">다운로드</a><button type="button" class="btn" data-z="close" style="flex:1">닫기</button></div></div>`;
    }
    function closeOverlay() { over.hidden = true; over.innerHTML = ''; }

    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    draw();
    return () => { window.removeEventListener('resize', onResize); save(); };
  }

  window.Zine = { mount, share: shareCanvas };
})();
