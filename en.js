// English edition. window.EN holds the interface text (Korean -> English). City text arrives with each city file
// and is kept in that city's own dictionary, so the same Korean phrase can read differently in two cities.
// The translator below swaps text on screen (text nodes + labels) whenever the language is set to EN.
(function () {
  const EN = (window.EN = Object.assign(window.EN || {}, {
"접이식 우산": "Folding umbrella",
"잡지 열기 →": "Open the magazine →",
"지도를 밀어서 도시를 고르면, 그 도시의 잡지가 열려요": "Drag the map, pick a city, and its magazine opens",
"일러스트 세계지도 — 좌우로 밀어서 둘러보기": "Illustrated world map — drag left and right to explore",
"발행": "Out now",
"준비 중": "Coming soon",
"누르면 지도가 그 도시로 이동해요": "Tap to fly the map to that city",
"날짜를 넣으면 D-day가 떠요": "Add a date to see your countdown",
"내 여행": "My trip",
"가는 날": "Leaving on",
"마음에 드는 룩이나 동네 스타일에서": "On any look or neighbourhood style you like, tap",
"옷장에 담기": "Save to closet",
"를 누르면 여기에 모여요": "and it collects here",
"빼기": "Remove",
"잡지에서 보기 →": "See it in the magazine →",
"지도에서 도시 고르기": "Pick a city on the map",
"지도를 밀어서 열려 있는 도시를 눌러요": "Drag the map and tap an open city",
"가는 날 넣기": "Add your travel date",
"그날 날씨에 맞는 룩과 짐 리스트가 나와요": "Get a look and a packing list for that day's weather",
"잡지처럼 넘겨 보기": "Flip through like a magazine",
"룩 · 동네 · 맛집 · 내 zine까지 옆으로 넘겨요": "Swipe through looks, neighbourhoods, food and your own zine",
"OOTD 소개": "About OOTD",
"도시를 입는 여행 매거진": "The travel magazine that dresses for the city",
"시작하기": "Get started",
"D-day를 맞췄어요": "Countdown set",
"날짜를 지웠어요": "Date cleared",
"옷장에서 뺐어요": "Removed from closet",
"커버로": "Cover",
"페이지 이동": "Page navigation",
"이전 페이지": "Previous page",
"지도로": "Back to map",
"목차": "Contents",
"닫기": "Close",
"실시간 예보": "Live forecast",
"평년 기온 (참고)": "Climate average (for reference)",
"여행 날짜": "Travel date",
"펼쳐 보기": "Open it up",
"날씨 불러오는 중": "Loading weather",
"이번 달 평년 낮·밤 기온": "Average high / low this month",
"팁 없음 · 가격에 부가세 포함": "No tipping · prices include VAT",
"1달러 기준 (실시간 환율)": "Per US$1 (live rate)",
"식당 팁 18~20%가 보통": "Restaurants expect an 18–20% tip",
"한국 시간 그대로예요": "Same time as Korea",
"도시·나라 노트": "City and country notes",
"골든아워": "Golden hour",
"사진 찍기 제일 예쁜 시간": "The prettiest time for photos",
"보러 가기 ↗": "Open ↗",
"여행 달에 열리는 행사 검색": "Search events in your travel month",
"검색 ↗": "Search ↗",
"동네마다 옷이 달라요": "Every neighbourhood dresses differently",
"입을 것": "Wear",
"갈 곳": "Go",
"지도 ↗": "Map ↗",
"옷장에 담김 ✓": "In closet ✓",
"룩 선택": "Choose a look",
"이 날씨엔": "For this weather:",
"룩 카드 저장 · 공유": "Save / share look card",
"이 룩으로 짐 싸기": "Pack for this look",
"선크림 필수!": "sunscreen is a must!",
"그래도 자외선 차단은 챙기기": "still wear sun protection",
"이 룩 입고 하루 돌기": "A day out in this look",
"오늘의 룩:": "Today's look:",
"지도 보기 ↗": "Open map ↗",
"추천 시간은 참고용이에요. 운영 시간·휴무일은 방문 전 확인하세요.": "Times are suggestions. Check opening hours and closing days before you visit.",
"맛집 & 꼭 가볼 곳": "Where to eat & what to see",
"카드를 누르면 구글 지도에서 사진·후기·영업시간을 볼 수 있어요.": "Tap a card to see photos, reviews and hours on Google Maps.",
"매거진 기사 & 유튜브 가이드": "Magazine stories & YouTube guides",
"읽으러 가기 ↗": "Read ↗",
"기사는 각 매체 사이트에서, 영상은 유튜브에서 열려요. 유튜브는 늘 최신 영상이 나오도록 검색 결과로 연결해요.": "Stories open on each publication's site and videos on YouTube. YouTube links go to search results so you always get the newest videos.",
"금액을 넣으면 팁과 1인당 금액이 계산돼요.": "Enter the bill to get the tip and each person's share.",
"1인당 약": "About",
"(실시간 환율)": "per person (live rate)",
"합계": "Total",
"가격을 넣으면 세금 포함 금액과 원화가 나와요.": "Enter a price to see it with tax, and in won.",
"원화 (실시간)": "In won (live)",
"원화": "In won",
"결제 금액": "You pay",
"금액을 넣으면 1인당 금액이 나와요.": "Enter the bill to get each person's share.",
"1인당 금액은 100원 단위로 올림했어요.": "Each share is rounded up to the nearest ₩100.",
"같이 간 사람과 깔끔하게": "Settle up neatly with friends",
"더치페이 계산기": "Bill splitter",
"N분의 1!": "Split it evenly!",
"계산 금액": "Bill amount",
"계산 금액 (원)": "Bill amount (won)",
"나눠 낼 사람": "People splitting",
"한 명 빼기": "One fewer person",
"한 명 더하기": "One more person",
"서울 팁": "Seoul tips",
"팁 문화가 없고, 가격에 부가세가 포함돼 있어요.": "There is no tipping, and prices include VAT.",
"인기 팝업·맛집은 현장 대기 앱이나 예약이 필요한 곳이 많아요.": "Popular pop-ups and restaurants often need a waitlist app or a reservation.",
"시장에선 현금이나 계좌이체가 편할 때가 있어요.": "At markets, cash or a bank transfer is sometimes easier.",
"금액을 넣으면 원화와 1인당 금액이 나와요.": "Enter an amount to see it in won and each person's share.",
"1인당 원화": "Each, in won",
"환율을 불러오지 못했어요. 연결되면 원화가 표시돼요.": "Couldn't load exchange rates. The won amount appears once you're online.",
"현지에서 바로 쓰는 계산기": "Calculators for when you're there",
"환율 계산기": "Currency converter",
"얼마지? 바로 계산!": "How much is that? Quick maths!",
"현지 금액": "Local amount",
"알아 두면 좋은 것": "Good to know",
"한국": "Korea",
"US 사이즈": "US size",
"US 숫자": "US number",
"한국 (mm)": "Korea (mm)",
"팁 계산기": "Tip calculator",
"식당에서 바로!": "Right at the table!",
"계산서 금액": "Bill amount",
"계산서 금액 (달러)": "Bill amount (dollars)",
"쇼핑 계산기": "Shopping calculator",
"가격표엔 세금이 빠져 있어요": "Price tags leave out tax",
"가격표 금액": "Price on the tag",
"가격표 금액 (달러)": "Price on the tag (dollars)",
"사이즈 변환표": "Size conversion",
"성별": "Gender",
"여성": "Women",
"남성": "Men",
"종류": "Type",
"옷": "Clothes",
"신발": "Shoes",
"일반적인 기준이에요. 미국 옷은 한 치수 크게 나오는 편이라 꼭 입어 보세요.": "These are typical equivalents. US clothing runs about a size large, so try things on.",
"룩 + 뷰티로 짐 싸기": "Pack from the look and beauty kit",
"% 완료": "% done",
"목록 복사": "Copy list",
"체크 초기화": "Reset checks",
"다음 도시를 준비 중이에요": "More cities are on the way",
"다음엔 어느 도시로 갈까요?": "Which city next?",
"지도로 돌아가기": "Back to the map",
"이 잡지 처음부터 보기": "Read this issue from the start",
"옷장에 담았어요 — 지도 화면 아래에서 볼 수 있어요": "Saved to closet — find it below the map",
"카드 만드는 중…": "Making your card…",
"카드를 만들지 못했어요": "Couldn't make the card",
"짐 싸기 완료! 즐거운 여행 되세요": "All packed! Have a great trip",
"목록을 복사했어요": "List copied",
"복사가 막혀 있어요 — 길게 눌러 직접 복사해 주세요": "Copying is blocked — press and hold to copy by hand",
"이 브라우저에선 복사가 안 돼요": "This browser can't copy",
"체크를 모두 지웠어요": "All checks cleared",
"새 버전이 준비됐어요 — 눌러서 새로고침": "A new version is ready — tap to refresh",
"손글씨": "Handwriting",
"별 뱃지": "Star badge",
"도장": "Stamp",
"번개": "Lightning bolt",
"하트": "Heart",
"별": "Star",
"화살표": "Arrow",
"X 낙서": "X scribble",
"야자수": "Palm tree",
"해": "Sun",
"비행기": "Plane",
"저장할 이미지": "Image to save",
"이미지를 길게 눌러 사진에 저장하세요": "Press and hold the image to save it to Photos",
"내 zine 페이지 — 요소를 끌어서 옮기고 두 손가락으로 크기와 각도를 바꿔요": "My zine page — drag items to move them, use two fingers to resize and rotate",
"한 손가락으로 옮기고, 두 손가락으로 키우고 돌려요": "One finger to move, two to resize and rotate",
"추가하기": "Add",
"사진 올리기": "Add photos",
"글씨 넣기": "Add text",
"스티커": "Stickers",
"테이프": "Tape",
"이미지로 저장 · 공유": "Save as image · share",
"템플릿으로": "Use template",
"전체 지우기": "Clear all",
"저장 공간이 부족해요 — 이미지로 저장해 두세요": "Storage is full — save it as an image",
"사진을 올리거나 스티커를 눌러 시작해요": "Add a photo or tap a sticker to begin",
"글씨": "Text",
"찢은 종이": "Torn paper",
"폴라로이드": "Polaroid",
"그대로": "Plain",
"테이프 색": "Tape colour",
"스티커 글씨": "Sticker text",
"선택한 요소 편집": "Edit selected item",
"크기": "Size",
"회전": "Rotate",
"맨 앞으로": "Bring to front",
"복제": "Duplicate",
"이 사진은 열 수 없어요": "This photo can't be opened",
"템플릿으로 바꿨어요": "Switched to the template",
"한 번 더 누르면 지워져요": "Tap again to clear",
"만드는 중…": "Making it…",
"이미지를 만들지 못했어요": "Couldn't make the image",
"내 zine 이미지": "My zine image",
"마음에 드는 룩이나 동네 스타일에서 \"옷장에 담기\"를 누르면 여기에 모여요": "Tap \"Save to closet\" on any look or neighbourhood style and it collects here",
"선택 해제": "Deselect",
"그림자": "Shadow",
"삭제": "Delete",
"잡지 펼치는 중…": "Opening the magazine…",
"이 잡지를 불러오지 못했어요": "Couldn't load this issue",
"연결을 확인하고 다시 눌러 주세요": "Check your connection and try again",
"다시 시도": "Try again"
}));

  const HANGUL = /[\uAC00-\uD7A3]/;
  let lang = 'ko';
  // Sentences that carry numbers or names inside them.
  const RULES = [
    [/^비 올 확률 (\d+)%$/, (m) => m[1] + '% chance of rain'],
    [/^(.+) 가는 날까지 (\d+)일 남았어요$/, (m) => m[2] + (m[2] === '1' ? ' day' : ' days') + ' until ' + tr(m[1])],
    [/^오늘 (.+)\(으\)로 떠나요!$/, (m) => 'You leave for ' + tr(m[1]) + ' today!'],
    [/^다녀온 (.+), zine으로 남겨요$/, (m) => 'Back from ' + tr(m[1]) + '? Keep it in a zine'],
    [/^(\d+)개 담았어요$/, (m) => m[1] + ' saved'],
    [/^(.+) 옷장에서 빼기$/, (m) => 'Remove ' + tr(m[1]) + ' from closet'],
    [/^(.+)은\(는\) 준비 중이에요$/, (m) => tr(m[1]) + ' is coming soon'],
    [/^목차 · P\.(\d+)$/, (m) => 'Contents · P.' + m[1]],
    [/^지금 (.+) 기온 \(실시간\)$/, (m) => tr(m[1]) + ' right now (live)'],
    [/^(\S+) 기준 \(실시간 환율\)$/, (m) => 'Per ' + m[1] + ' (live rate)'],
    [/^현지 통화 · (\w+)$/, (m) => 'Local currency · ' + m[1]],
    [/^한국보다 ([\d.]+)시간 느려요$/, (m) => m[1] + ' h behind Korea'],
    [/^한국보다 ([\d.]+)시간 빨라요$/, (m) => m[1] + ' h ahead of Korea'],
    [/^이 잡지의 정보는 (.+)에 확인했어요\. 요금·운영 시간은 바뀔 수 있어요\.$/, (m) => 'This issue was checked in ' + tr(m[1]) + '. Fares and opening hours can change.'],
    [/^일몰 (.+)$/, (m) => 'Sunset ' + m[1]],
    [/^블루아워 ~(.+)$/, (m) => 'Blue hour until ' + m[1]],
    [/^그날 자외선 지수 최고 (\d+) — (.+)$/, (m) => 'UV index peaks at ' + m[1] + ' that day — ' + tr(m[2])],
    [/^· 골든아워 (.+)$/, (m) => '· Golden hour ' + m[1]],
    [/^팁 (\d+)%$/, (m) => 'Tip ' + m[1] + '%'],
    [/^세금 ([\d.]+)%$/, (m) => 'Tax ' + m[1] + '%'],
    [/^1인당 \((\d+)명\)$/, (m) => 'Each (' + m[1] + ')'],
    [/^(.+) 날씨 기준으로 옷이 바뀌어요$/, (m) => 'Clothes follow the weather on ' + m[1]],
    [/^나만의 (.+) 한 페이지$/, (m) => 'One page of my own ' + tr(m[1])],
    [/^(.+) 동네 스타일$/, (m) => tr(m[1]) + ' neighbourhood style'],
    [/^(.+) 추가$/, (m) => 'Add ' + tr(m[1]).toLowerCase()],
    [/^테이프 (\d+)$/, (m) => 'tape ' + m[1]],
    [/^색 (#\w+)$/, (m) => 'Colour ' + m[1]],
    [/^(\d+)\. (.+)$/, (m) => m[1] + '. ' + tr(m[2])],
    [/^— (.+)$/, (m) => '— ' + tr(m[1])],
    [/^· (.+)$/, (m) => '· ' + tr(m[1])],
    [/^(.+) · 유튜브 ↗$/, (m) => tr(m[1]) + ' · YouTube ↗'],
    [/^(EAT|GO) · (.+)$/, (m) => m[1] + ' · ' + tr(m[2])],
    [/^(.+) ([\d.]+%)$/, (m) => tr(m[1]) + ' ' + m[2]],
    [/^(\d+)월 (\d+)일$/, (m) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m[1] - 1] + ' ' + m[2]]
  ];

  const SCOPES = {};      // city id -> { korean: english }
  let scope = null;       // the city on screen
  function find(core) {
    if (scope && SCOPES[scope] && SCOPES[scope][core] != null) return SCOPES[scope][core];
    if (SCOPES.index && SCOPES.index[core] != null) return SCOPES.index[core];
    if (EN[core] != null) return EN[core];
    for (const id in SCOPES) if (SCOPES[id][core] != null) return SCOPES[id][core];
    return null;
  }

  function tr(s) {
    if (lang !== 'en' || typeof s !== 'string' || !HANGUL.test(s)) return s;
    const lead = s.match(/^\s*/)[0], tail = s.match(/\s*$/)[0];
    const core = s.trim().replace(/\s+/g, ' ');
    const hit = find(core);
    if (hit != null) return lead + hit + tail;
    for (let i = 0; i < RULES.length; i++) { const m = core.match(RULES[i][0]); if (m) return lead + RULES[i][1](m) + tail; }
    // "A · B", "A — B", "A / B": translate each side when every Korean side is known.
    const seps = [' · ', ' — ', ' / ', ', ', '\n'];
    for (let i = 0; i < seps.length; i++) {
      if (core.indexOf(seps[i]) < 0 && s.indexOf(seps[i]) < 0) continue;
      const parts = (seps[i] === '\n' ? s.trim() : core).split(seps[i]);
      const out = parts.map((p) => (HANGUL.test(p) ? tr(p) : p));
      if (out.every((p) => !HANGUL.test(p))) return lead + out.join(seps[i]) + tail;
    }
    return s;
  }

  const ATTRS = ['aria-label', 'placeholder', 'alt', 'title'];
  function apply(root) {
    if (lang !== 'en' || !root) return;
    if (root.nodeType === 3) { if (root.parentNode && root.parentNode.closest && root.parentNode.closest('.zi-text')) return; const t = tr(root.nodeValue); if (t !== root.nodeValue) root.nodeValue = t; return; }
    if (root.nodeType !== 1) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = []; let n;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach((x) => { const p = x.parentNode && x.parentNode.nodeName; if (p === 'SCRIPT' || p === 'STYLE' || p === 'TEXTAREA') return; if (x.parentNode.closest && x.parentNode.closest('.zi-text')) return; const t = tr(x.nodeValue); if (t !== x.nodeValue) x.nodeValue = t; });
    const els = [root].concat(Array.prototype.slice.call(root.querySelectorAll('[aria-label],[placeholder],[alt],[title]')));
    els.forEach((el) => ATTRS.forEach((a) => { const v = el.getAttribute && el.getAttribute(a); if (v && HANGUL.test(v)) { const t = tr(v); if (t !== v) el.setAttribute(a, t); } }));
  }

  let obs = null;
  function watch() {
    if (obs || typeof MutationObserver === 'undefined') return;
    obs = new MutationObserver((list) => {
      if (lang !== 'en') return;
      list.forEach((m) => {
        if (m.type === 'characterData') apply(m.target);
        else if (m.type === 'attributes') { const v = m.target.getAttribute(m.attributeName); if (v && HANGUL.test(v)) { const t = tr(v); if (t !== v) m.target.setAttribute(m.attributeName, t); } }
        else m.addedNodes.forEach(apply);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  window.I18N = {
    tr,
    apply,
    add(id, map) { SCOPES[id] = Object.assign(SCOPES[id] || {}, map); },
    scope(id) { scope = id || null; },
    // English for a phrase no matter which language is showing (used when saving things for later).
    en(s, id) { const keepL = lang, keepS = scope; lang = 'en'; if (id) scope = id; const out = tr(s); lang = keepL; scope = keepS; return out; },
    get lang() { return lang; },
    set(l) { lang = l === 'en' ? 'en' : 'ko'; document.documentElement.lang = lang; watch(); if (lang === 'en') apply(document.body); }
  };
})();
