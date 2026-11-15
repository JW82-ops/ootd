// Six more cities. Text is written as '한국어||English'; the loader at the bottom splits it
// (Korean stays in the data, English goes to window.EN for the language switch).
// Looks reuse the Seoul wardrobe with each city's own look name, tip and a signature piece.
(function () {
  const C = window.CITIES;
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const POS = [[44, 47, 32, 30], [84, 10, 13, 28], [48, 4, 16, 38], [67, 8, 13, 30], [74, 66, 18, 28]];

  // looks(spec): spec[bucket] = [name, ko, tip, { her: {slot: patch}, him: {slot: patch} }]
  function looks(spec) {
    const out = {};
    Object.keys(spec).forEach((b) => {
      const s = spec[b];
      const L = clone(C.sel.looks[b]);
      L.name = s[0]; L.ko = s[1]; L.tip = s[2];
      const sw = s[3] || {};
      ['her', 'him'].forEach((w) => Object.keys(sw[w] || {}).forEach((slot) => {
        const it = L[w].find((x) => x.slot === slot);
        if (it) Object.assign(it, sw[w][slot]);
      }));
      out[b] = L;
    });
    return out;
  }
  const beauty = (rows) => rows.map((r, i) => ({ icon: r[0], c: r[1], a: r[2], name: r[3], why: r[4], pos: POS[i] }));
  const hood = (name, en, vibe, what, wear, spots, pal, q, x, y) => ({ name, en, vibe, what, wear, spots, pal, q, x, y });
  const stop = (time, place, area, what, look, q, icon, c, at) => Object.assign({ time, place, area, what, look, q, icon, c }, at ? { at } : {});
  const spot = (name, tip, what, q, c) => ({ name, tip, what, q, c });
  const opt = (id, sign, signName, en, name, cost, time, how, best) => ({ id, sign, signName, en, name, cost, time, how, best });
  const base = {
    open: true, isNew: true, checked: '2026년 11월||November 2026', coverLines: ['FASHION', 'BEAUTY', 'FOOD', 'DAY COURSE'],
    boardArt: 'pin', arriveTitle: 'ARRIVAL', zineSticker: 'star', arrivePick: '내 숙소는…||I\'m staying in…'
  };
  const FOOT = '요금·시간은 바뀔 수 있어요. 출발 전 공항·교통 공식 사이트에서 한 번 더 확인하세요.||Fares and times change. Check the official airport and transit sites before you go.';
  const TRAVEL_ESS = ['항공권·숙소 예약 확인||Flight and hotel confirmations', '해외 결제 카드||Card that works abroad', '보조배터리||Power bank'];

  Object.assign(C.ny, base, {
    cover: 'img/ny/cover.webp',
    name: '뉴욕||New York', country: 'USA · NEW YORK', lat: 40.71, lon: -74.01, tz: 'America/New_York', currency: 'USD',
    tagline: '걷는 만큼 보이는 도시||The city that rewards walking', nick: '뉴욕||NYC', short: 'NYC', word: ['NEW', 'YO', 'RK'], glow: ['CITY', 'PROOF', 'KIT'], coverHead: ['WALK IT', 'IN NEW YORK.'],
    bandLabel: 'USA', money: 'usd', tools: 'us', sky: ['#22306B', '#5A4A9A', '#F2457C', '#FF8A3D', '#FFD23F'], scene: 'towers',
    beautySub: '뉴욕 파우치에 넣을 것||What goes in the New York pouch', beautyNote: '겨울엔 바람과 난방으로 건조하고, 여름엔 습해요||Dry from wind and heating in winter, humid in summer', beautyScribble: ['바람 세고||Windy', '실내는 건조!||and dry inside!'],
    arriveSub: 'JFK에서 맨해튼으로 · 그날의 행사||JFK to Manhattan · what\'s on', arriveHead: 'JFK → CITY', eventsQuery: 'New York City events',
    zineTitle: 'MY NYC\nDIARY', zineStamp: 'NYC\n2026', zineBurst: 'BIG\nAPPLE', zineText: '오늘의 뉴욕||New York today',
    normals: [[4, -3], [6, -2], [10, 2], [17, 7], [22, 12], [27, 18], [30, 21], [29, 20], [25, 16], [18, 10], [12, 5], [6, 0]],
    intro: '지하철과 두 발로 다 되는 도시. 하루에 만 오천 보는 기본이라 신발이 룩의 절반이에요.||A city you cover by subway and on foot. Fifteen thousand steps is a normal day, so shoes are half the look.',
    notes: [
      { k: 'POWER', v: '120V', d: 'A타입 플러그 — 어댑터 챙기기||Type A plugs — bring an adapter' },
      { k: 'MOVE', v: 'Subway', d: '카드·폰을 개찰구에 찍으면 끝||Tap a card or phone at the turnstile' },
      { k: 'DRESS CODE', v: 'All Black', d: '검정 레이어드가 제일 뉴욕다워요||Black layers are the most New York thing' },
      { k: 'TAX', v: '+ 8.875%', d: '가격표엔 판매세가 빠져 있어요||Price tags leave out sales tax' },
      { k: 'TIP', v: '18–20%', d: '앉아서 먹는 식당 기준||At sit-down restaurants' }
    ],
    countryTip: '애비뉴는 길고 스트리트는 짧아요 — 지도보다 오래 걸려요!||Avenues are long, streets are short — it always takes longer than the map says!',
    looks: looks({
      hot: ['SUBWAY SUMMER', '한여름 지하철 룩||Summer subway look', '승강장은 덥고 열차 안은 추워요 — 얇은 셔츠 챙기기||Platforms are hot, trains are cold — pack a thin shirt'],
      mild: ['DOWNTOWN WALK', '다운타운 산책 룩||Downtown walk look', '하루 만 오천 보 — 신발이 제일 중요해요||Fifteen thousand steps — shoes matter most', { her: { outer: { icon: 'jacket', c: '#141210', a: '#3A3530', name: '레더 재킷||Leather jacket', note: '블랙||Black' } }, him: { outer: { c: '#141210', a: '#3A3530', name: '코치 재킷||Coach jacket', note: '블랙||Black' } } }],
      cool: ['ALL BLACK LAYERS', '올블랙 레이어드 룩||All-black layers', '빌딩 사이 바람이 차요 — 목을 감싸기||Wind between the towers bites — cover your neck', { her: { outer: { c: '#141210', a: '#3A3530', name: '울 코트||Wool coat', note: '블랙||Black' } } }],
      cold: ['PUFFER WEATHER', '한겨울 패딩 룩||Deep-winter puffer look', '체감은 영하 — 방수 부츠와 장갑||Feels below freezing — waterproof boots and gloves']
    }),
    beauty: beauty([
      ['compact', '#F2C7B0', undefined, '쿠션 팩트||Cushion compact', '하루 종일 밖이라 수정용 하나||You are out all day — one for touch-ups'],
      ['balm', '#E0245E', '#141210', '립밤||Lip balm', '바람에 입술이 금방 터요||Wind chaps lips fast'],
      ['tube', '#F7F4EE', '#F2457C', '핸드크림||Hand cream', '손 씻을 일이 많아요||You will wash your hands a lot'],
      ['balm', '#FFD23F', '#F7F4EE', '선스틱||Sun stick', '옥상·다리 위에서 덧바르기||Reapply on rooftops and bridges'],
      ['mist', '#CFE3F0', undefined, '미스트||Face mist', '난방 센 실내에서 한 번||For overheated rooms']
    ]),
    day: [
      stop('09:00', 'West Village', 'Manhattan', '베이글과 커피로 시작해 브라운스톤 골목 걷기||Start with a bagel and coffee, then wander the brownstone streets', '걷기 편한 신발로 출발||Leave in your most walkable shoes', 'West Village New York', 'fork', '#FFD23F'),
      stop('11:00', 'The High Line', 'Chelsea', '옛 철길 위 공원을 따라 걷기||Walk the park built on an old rail line', '바람 막을 겉옷 하나||One layer against the wind', 'The High Line New York', 'pin', '#FFFFFF'),
      stop('14:00', 'SoHo', 'Manhattan', '편집숍과 빈티지 구경||Boutiques and vintage shops', '쇼핑백 대비 가방은 가볍게||Keep your bag light for shopping bags', 'SoHo New York', 'tote', '#F3EAD8'),
      stop('17:00', 'DUMBO · Brooklyn Bridge', 'Brooklyn', '다리와 스카이라인 뒤로 지는 노을||Sunset behind the bridge and skyline', '강바람이 세요 — 겉옷 꼭||River wind is strong — bring the jacket', 'DUMBO Brooklyn', 'sun', '#FFD23F', 'golden'),
      stop('19:30', 'Lower East Side', 'Manhattan', '작은 식당과 바에서 마무리||Finish at a small restaurant and a bar', '실내는 따뜻해요 — 겹쳐 입기||Warm inside — wear layers', 'Lower East Side New York', 'moon', '#F2A7B8', 'after')
    ],
    dayAlt: '브루클린 하루도 좋아요: Williamsburg 빈티지 → Domino Park → 강 건너 스카이라인 노을||Or a Brooklyn day: Williamsburg vintage → Domino Park → skyline sunset across the river',
    eat: [
      spot('Chelsea Market', '점심시간 전에 가면 덜 붐벼요||Go before the lunch rush', '실내 푸드홀||Indoor food hall', 'Chelsea Market New York', '#FFD23F'),
      spot('Chinatown', '현금을 조금 챙기세요||Carry a little cash', '덤플링 · 딤섬||Dumplings and dim sum', 'Chinatown Manhattan restaurants', '#F2A7B8'),
      spot('Smorgasburg', '주말·시즌 한정 — 일정 확인||Weekends and seasonal — check the schedule', '브루클린 야외 푸드마켓||Brooklyn open-air food market', 'Smorgasburg Brooklyn', '#CFE3F0')
    ],
    go: [
      spot('Central Park', '아래쪽만 봐도 한 시간||The south end alone takes an hour', '도심 한가운데 큰 공원||The big park in the middle of it all', 'Central Park New York', '#BFC9D3'),
      spot('The Met', '쉬는 요일이 있어요 — 미리 확인||Closed some days — check ahead', '하루로는 부족한 미술관||A museum too big for one day', 'The Metropolitan Museum of Art', '#E3DED6'),
      spot('Brooklyn Bridge', '브루클린에서 맨해튼 쪽으로 걷기||Walk from Brooklyn toward Manhattan', '걸어서 건너는 다리||The bridge you cross on foot', 'Brooklyn Bridge', '#A9C6DE')
    ],
    goTip: '미술관·전망대는 쉬는 요일과 예약 여부를 가기 전에 꼭 확인하세요.||Check closing days and booking rules for museums and observation decks before you go.',
    arrive: {
      asOf: '뉴욕 도착 팁||Arriving in New York',
      note: '짐이 가벼우면 에어트레인 + 지하철이 제일 싸고, 짐이 많거나 늦은 밤이면 택시가 편해요.||With light bags, AirTrain plus subway is cheapest. With heavy bags or late at night, take a taxi.',
      opts: [
        opt('train', '#1F6FD6', '가장 저렴||Cheapest', 'AIRTRAIN', '에어트레인 + 지하철||AirTrain + subway', '에어트레인 + 지하철 요금||AirTrain plus subway fare', '약 60~75분||About 60–75 min', '에어트레인으로 Jamaica나 Howard Beach까지 간 뒤 지하철로 갈아타요.||Ride the AirTrain to Jamaica or Howard Beach, then switch to the subway.', '짐이 가볍고 낮에 도착할 때||Light bags, daytime arrival'),
        opt('lirr', '#2E9E4F', '빠른 기차||Faster train', 'LIRR', '에어트레인 + LIRR 기차||AirTrain + LIRR train', '지하철보다 조금 비싸요||A bit more than the subway', '약 40~50분||About 40–50 min', 'Jamaica역에서 LIRR을 타면 맨해튼 미드타운까지 빨라요.||From Jamaica, the LIRR is the quick way into Midtown.', '미드타운 숙소||Staying in Midtown'),
        opt('taxi', '#D9A300', '정액 요금||Flat fare', 'TAXI', '옐로 캡||Yellow cab', '맨해튼까지 정액 + 통행료·팁||Flat fare to Manhattan plus tolls and tip', '45~90분 (교통 상황)||45–90 min, depending on traffic', '공식 택시 승강장에서만 타세요. 호객하는 차는 타지 마세요.||Use the official taxi stand only. Ignore anyone offering rides inside the terminal.', '짐이 많거나 일행이 여럿일 때||Lots of luggage or a group'),
        opt('ride', '#7A3FB0', '앱 호출||By app', 'RIDE APP', '우버 · 리프트||Uber · Lyft', '시간대에 따라 달라요||Varies by time of day', '45~90분||45–90 min', '앱이 알려 주는 픽업 구역으로 이동해서 타요.||Follow the app to the pickup zone.', '브루클린 숙소||Staying in Brooklyn')
      ],
      picks: [{ label: '미드타운||Midtown', id: 'lirr' }, { label: '다운타운||Downtown', id: 'train' }, { label: '브루클린||Brooklyn', id: 'ride' }, { label: '짐이 많아요||Lots of bags', id: 'taxi' }],
      foot: FOOT
    },
    events: [
      { name: 'NYC Tourism', what: '뉴욕 관광 공식 사이트 · 행사||Official NYC tourism site · events', url: 'https://www.nyctourism.com' },
      { name: 'Time Out New York', what: '이번 주 할 것||Things to do this week', url: 'https://www.timeout.com/newyork' }
    ],
    hoodSvg: '<path d="M0 0 H70 C 84 70 80 150 96 240 H0 Z" fill="#BFD9E6"/><path d="M70 0 C 84 70 80 150 96 240" fill="none" stroke="#141210" stroke-width="2"/><path d="M250 0 C 236 80 244 150 222 240 H292 C 300 160 300 80 310 0 Z" fill="#BFD9E6" stroke="#141210" stroke-width="2"/><text x="16" y="120" font-family="Permanent Marker, cursive" font-size="12" fill="#5D8BA6" transform="rotate(-84 16 120)">Hudson</text><text x="262" y="150" font-family="Permanent Marker, cursive" font-size="12" fill="#5D8BA6" transform="rotate(-84 262 150)">East River</text><text x="352" y="232" text-anchor="end" font-family="Anton, sans-serif" font-size="9" letter-spacing="1" fill="#6B6259">NOT TO SCALE</text>',
    hoods: [
      hood('소호||SoHo', 'SOHO', 'DOWNTOWN CHIC', '주철 건물 사이 편집숍 거리||Boutiques between cast-iron buildings', ['레더 재킷||Leather jacket', '스트레이트 데님||Straight jeans', '로퍼||Loafers'], ['Prince Street', 'Crosby Street'], ['#141210', '#F3EAD8', '#F2457C'], 'SoHo New York', 150, 150),
      hood('웨스트 빌리지||West Village', 'WEST VILLAGE', 'EASY CLASSIC', '브라운스톤 골목과 작은 카페||Brownstone streets and small cafés', ['트렌치코트||Trench coat', '니트||Knit', '발레 플랫||Ballet flats'], ['Bleecker Street', 'Washington Square Park'], ['#8A5A3B', '#F3EAD8', '#6B8E5A'], 'West Village New York', 116, 104),
      hood('로어 이스트 사이드||Lower East Side', 'L.E.S.', 'VINTAGE EDGE', '빈티지 숍과 밤 문화||Vintage shops and nightlife', ['빈티지 재킷||Vintage jacket', '와이드 팬츠||Wide trousers', '부츠||Boots'], ['Orchard Street', 'Essex Market'], ['#F2457C', '#141210', '#FFD23F'], 'Lower East Side New York', 196, 176),
      hood('윌리엄스버그||Williamsburg', 'WILLIAMSBURG', 'BROOKLYN COOL', '강 건너 빈티지와 커피||Vintage and coffee across the river', ['워크 재킷||Chore jacket', '데님||Denim', '스니커즈||Sneakers'], ['Bedford Avenue', 'Domino Park'], ['#6B8E5A', '#F3EAD8', '#2E4F86'], 'Williamsburg Brooklyn', 322, 120)
    ],
    read: [
      { k: 'CITY GUIDE', items: [
        { mag: 'Time Out New York', title: 'Things to do in New York', ko: '이번 주 뉴욕에서 할 것 (영문)||What to do in New York this week', url: 'https://www.timeout.com/newyork' },
        { mag: 'NYC Tourism', title: 'Official city guide', ko: '뉴욕 관광 공식 가이드||The official New York visitor guide', url: 'https://www.nyctourism.com' }
      ] }
    ],
    watch: [
      { label: '뉴욕 브이로그||New York vlog', sub: '하루 코스 엿보기||A day in the city', q: 'New York travel vlog' },
      { label: '뉴욕 스트리트 패션||NYC street style', sub: '요즘 거리 스타일||What people wear now', q: 'New York street style' },
      { label: '소호 쇼핑||SoHo shopping', sub: '빈티지 · 편집숍||Vintage and boutiques', q: 'SoHo New York shopping guide' },
      { label: '뉴욕 맛집||Where to eat', sub: '베이글 · 피자 · 델리||Bagels, pizza, delis', q: 'New York food guide' }
    ],
    tax: [{ name: 'NYC', rate: 8.875 }],
    taxNote: '뉴욕시는 한 벌에 110달러 미만인 옷·신발엔 판매세가 붙지 않아요. 여행자 세금 환급은 없어요.||In New York City, clothing and shoes under $110 per item carry no sales tax. There is no tourist tax refund.',
    tipNote: '카운터에서 주문하는 곳은 팁이 꼭 필요하진 않아요.||Tipping is optional where you order at a counter.',
    essentials: ['여권||Passport', 'ESTA 승인 확인||ESTA approval'].concat(TRAVEL_ESS, ['A타입 플러그 어댑터||Type A plug adapter', '편한 신발||Comfortable shoes'])
  });

  Object.assign(C.lis, base, {
    cover: 'img/lis/cover.webp',
    name: '리스본||Lisbon', country: 'PORTUGAL · LISBON', lat: 38.72, lon: -9.14, tz: 'Europe/Lisbon', currency: 'EUR', cur: { code: 'EUR', sym: '€', unit: 1 },
    tagline: '언덕과 타일의 도시||The city of hills and tiles', nick: '리스본||Lisbon', short: 'LISBON', word: ['LIS', 'BO', 'A'], glow: ['SUN', 'TILE', 'KIT'], coverHead: ['SEVEN HILLS', 'OF LISBON.'],
    bandLabel: 'PORTUGAL', money: 'intl', tools: 'intl', sky: ['#2D5BFF', '#7FB2E5', '#F9C6A0', '#FF8A3D', '#FFD23F'], scene: 'roofs',
    beautySub: '리스본 파우치에 넣을 것||What goes in the Lisbon pouch', beautyNote: '햇살이 강하고 바닷바람이 불어요||Strong sun and an ocean breeze', beautyScribble: ['햇빛 강하고||Strong sun', '언덕은 많고!||and so many hills!'],
    arriveSub: '공항에서 시내로 · 그날의 행사||Airport to the city · what\'s on', arriveHead: 'LIS → CITY', eventsQuery: 'Lisbon events',
    zineTitle: 'MY LISBON\nDIARY', zineStamp: 'LISBOA\n2026', zineBurst: 'SEVEN\nHILLS', zineText: '오늘의 리스본||Lisbon today',
    normals: [[15, 8], [16, 9], [19, 11], [20, 12], [22, 14], [26, 17], [28, 18], [28, 19], [27, 18], [23, 15], [18, 12], [15, 9]],
    intro: '일곱 언덕 위에 타일과 빨간 지붕이 펼쳐진 도시. 돌길이 미끄러워서 굽 없는 신발이 정답이에요.||Tiles and red roofs spread over seven hills. The stone pavements are slippery, so flat shoes are the answer.',
    notes: [
      { k: 'POWER', v: '230V', d: 'C·F타입 — 한국 플러그 그대로||Type C/F plugs — same as Korea' },
      { k: 'MOVE', v: 'Walk + Metro', d: '언덕은 트램·엘리베이터로||Take trams and lifts up the hills' },
      { k: 'DRESS CODE', v: 'Relaxed', d: '편하게, 밤엔 한 겹 더||Easygoing, one more layer at night' },
      { k: 'SHOES', v: 'Flat', d: '돌길이 미끄러워요||The cobbles are slippery' },
      { k: 'MEAL TIME', v: 'Late', d: '저녁은 8시 이후가 보통||Dinner usually starts after 8' }
    ],
    countryTip: '식당에서 먼저 내주는 빵·올리브는 먹으면 계산돼요!||Bread and olives brought to the table are charged if you eat them!',
    looks: looks({
      hot: ['TILE SUMMER', '한여름 타일 룩||Summer tile look', '그늘이 적어요 — 모자와 선글라스||Little shade — hat and sunglasses', { her: { top: { c: '#FFFFFF', name: '린넨 슬리브리스||Linen sleeveless top', note: '화이트||White' } } }],
      mild: ['SEVEN HILLS WALK', '언덕 산책 룩||Hill-walking look', '오르막이 많아요 — 밑창 좋은 신발||Lots of climbing — shoes with grip', { her: { outer: { c: '#FFD23F', a: '#D9A300', name: '옐로 가디건||Yellow cardigan', note: '타일과 잘 어울려요||Great against the tiles' } }, him: { outer: { c: '#2E4F86', a: '#243F6B', name: '린넨 셔츠 재킷||Linen shirt jacket', note: '네이비||Navy' } } }],
      cool: ['ATLANTIC BREEZE', '바닷바람 레이어드 룩||Ocean-breeze layers', '비 오는 날 돌길 조심 — 방수 겉옷||Careful on wet cobbles — a rain layer helps']
    }),
    beauty: beauty([
      ['tube', '#F7F4EE', '#FFD23F', '선크림||Sunscreen', '전망대엔 그늘이 없어요||No shade at the viewpoints'],
      ['balm', '#E0245E', '#141210', '립밤||Lip balm', '바닷바람에 건조해요||The sea breeze is drying'],
      ['mist', '#CFE3F0', undefined, '미스트||Face mist', '언덕 오른 뒤 한 번||After every hill'],
      ['balm', '#FFD23F', '#F7F4EE', '선스틱||Sun stick', '걷다가 덧바르기||Reapply as you walk'],
      ['compact', '#F2C7B0', undefined, '쿠션 팩트||Cushion compact', '저녁 식사 전 수정||Touch up before dinner']
    ]),
    day: [
      stop('09:30', 'Alfama', 'Lisboa', '골목과 계단을 따라 전망대까지||Follow alleys and stairs up to a viewpoint', '밑창 좋은 신발 필수||Shoes with grip are a must', 'Alfama Lisbon', 'pin', '#FFD23F'),
      stop('11:30', 'Baixa · Chiado', 'Lisboa', '타일 건물과 서점, 카페||Tiled façades, bookshops, cafés', '사진 잘 받는 밝은 색||Bright colours photograph well here', 'Chiado Lisbon', 'tote', '#FFFFFF'),
      stop('14:30', 'Belém', 'Lisboa', '강변 산책과 에그타르트||Riverside walk and a custard tart', '강바람 막을 겉옷||A layer for the river wind', 'Belem Lisbon', 'fork', '#F3EAD8'),
      stop('17:00', 'Miradouro da Senhora do Monte', 'Graça', '빨간 지붕 위로 지는 노을||Sunset over the red roofs', '해 지면 쌀쌀해요||It cools down fast after sunset', 'Miradouro da Senhora do Monte', 'sun', '#FFD23F', 'golden'),
      stop('20:00', 'Bairro Alto', 'Lisboa', '늦은 저녁과 골목 바||A late dinner and street-side bars', '돌길이라 굽 낮은 신발||Low heels for the cobbles', 'Bairro Alto Lisbon', 'moon', '#F2A7B8', 'after')
    ],
    dayAlt: '반나절 더 있다면: LX Factory 구경 → 강변 따라 걷기||With an extra half day: LX Factory, then a walk along the river',
    eat: [
      spot('Pastéis de Belém', '줄은 포장 줄이 더 빨라요||The takeaway line moves faster', '에그타르트||Custard tarts', 'Pasteis de Belem', '#FFD23F'),
      spot('Time Out Market', '자리 먼저 잡고 주문하기||Grab a seat first, then order', '푸드홀||Food hall', 'Time Out Market Lisboa', '#F2A7B8'),
      spot('Alfama 골목 식당||Alfama taverns', '저녁엔 예약이 안전해요||Book ahead for dinner', '정어리 구이 · 작은 접시 요리||Grilled sardines and small plates', 'Alfama Lisbon restaurants', '#CFE3F0')
    ],
    go: [
      spot('Tram 28', '아침 일찍 타야 덜 붐벼요 · 소매치기 주의||Ride early to beat the crowds · watch your pockets', '언덕을 오르는 노란 트램||The yellow tram that climbs the hills', 'Tram 28 Lisbon', '#BFC9D3'),
      spot('LX Factory', '주말엔 마켓이 열릴 때가 있어요||There is often a weekend market', '공장을 고친 숍과 카페||Shops and cafés in an old factory', 'LX Factory Lisbon', '#E3DED6'),
      spot('Miradouro de Santa Luzia', '타일 벽과 강 전망||Tile panels and a river view', '알파마 전망대||Viewpoint over Alfama', 'Miradouro de Santa Luzia', '#A9C6DE')
    ],
    goTip: '붐비는 트램과 전망대에선 가방을 앞으로 메세요.||Wear your bag in front on crowded trams and at viewpoints.',
    arrive: {
      asOf: '리스본 도착 팁||Arriving in Lisbon',
      note: '공항이 시내와 가까워요. 지하철이 바로 연결되고, 언덕 위 숙소라면 차로 문 앞까지 가는 게 편해요.||The airport is close to the centre. The metro runs straight from it, and for a hilltop stay a car to the door is easier.',
      opts: [
        opt('metro', '#E0247A', '가장 저렴||Cheapest', 'METRO', '지하철 (빨간 노선)||Metro (Red line)', '교통카드 요금||Transit card fare', '시내까지 약 25~35분||About 25–35 min to the centre', '공항역에서 타고 필요한 노선으로 갈아타요. 충전식 교통카드를 역에서 살 수 있어요.||Board at the airport station and change lines as needed. You can buy a rechargeable card at the station.', '짐이 가볍고 평지 숙소||Light bags, a place on flat ground'),
        opt('ride', '#7A3FB0', '앱 호출||By app', 'RIDE APP', '우버 · 볼트||Uber · Bolt', '거리가 짧아 부담이 적어요||Short ride, easy on the budget', '약 15~30분||About 15–30 min', '앱이 알려 주는 픽업 구역에서 타요.||Meet your car at the pickup zone the app shows.', '언덕 위 숙소 · 돌길에 캐리어||Hilltop stays · suitcases on cobbles'),
        opt('taxi', '#D9A300', '미터 요금||By meter', 'TAXI', '택시||Taxi', '미터 + 짐 요금||Meter plus a luggage fee', '약 15~30분||About 15–30 min', '공식 승강장에서 타고 미터를 켰는지 확인하세요.||Use the official rank and check the meter is on.', '밤늦게 도착할 때||Late arrivals')
      ],
      picks: [{ label: '바이샤·시아두||Baixa · Chiado', id: 'metro' }, { label: '알파마 (언덕)||Alfama (hilly)', id: 'ride' }, { label: '밤 도착||Arriving late', id: 'taxi' }],
      foot: FOOT
    },
    events: [
      { name: 'Visit Lisboa', what: '리스본 관광 공식 사이트||Official Lisbon tourism site', url: 'https://www.visitlisboa.com' },
      { name: 'Time Out Lisbon', what: '리스본에서 할 것 (영문)||Things to do in Lisbon', url: 'https://www.timeout.com/lisbon' }
    ],
    hoodSvg: '<path d="M0 190 C 80 176 180 200 360 178 V240 H0 Z" fill="#BFD9E6" stroke="#141210" stroke-width="2"/><text x="150" y="222" font-family="Permanent Marker, cursive" font-size="13" fill="#5D8BA6">Tagus River</text><path d="M210 0 C 230 30 290 34 330 0 Z" fill="#D9C3A0" opacity=".7"/><text x="244" y="14" font-family="Permanent Marker, cursive" font-size="11" fill="#6B6259">hills</text><text x="8" y="14" font-family="Anton, sans-serif" font-size="9" letter-spacing="1" fill="#6B6259">NOT TO SCALE</text>',
    hoods: [
      hood('알파마||Alfama', 'ALFAMA', 'OLD TOWN', '계단 골목과 파두 소리||Stairway alleys and the sound of fado', ['린넨 셔츠||Linen shirt', '와이드 팬츠||Wide trousers', '밑창 좋은 스니커즈||Grippy sneakers'], ['Miradouro de Santa Luzia', 'Feira da Ladra'], ['#E07A3F', '#F3EAD8', '#2D5BFF'], 'Alfama Lisbon', 286, 140),
      hood('시아두 · 바이후 알투||Chiado · Bairro Alto', 'CHIADO', 'CITY CLASSIC', '서점과 카페, 밤엔 골목 바||Bookshops and cafés, bars at night', ['블레이저||Blazer', '데님||Denim', '로퍼||Loafers'], ['Rua Garrett', 'Miradouro de São Pedro de Alcântara'], ['#141210', '#F3EAD8', '#FFD23F'], 'Chiado Lisbon', 196, 136),
      hood('프린시프 헤알||Príncipe Real', 'PRÍNCIPE REAL', 'DESIGN QUARTER', '디자인 숍과 정원||Design shops and a garden square', ['셔츠 원피스 또는 셋업||Shirt dress or a matching set', '샌들||Sandals', '작은 숄더백||Small shoulder bag'], ['Jardim do Príncipe Real', 'Embaixada'], ['#6B8E5A', '#F3EAD8', '#F2457C'], 'Principe Real Lisbon', 150, 92),
      hood('벨렝||Belém', 'BELÉM', 'RIVERSIDE', '강변 산책과 에그타르트||Riverside walks and custard tarts', ['가벼운 겉옷||Light jacket', '반바지 또는 스커트||Shorts or a skirt', '선글라스||Sunglasses'], ['Torre de Belém', 'MAAT'], ['#BFD9E6', '#FFFFFF', '#FFD23F'], 'Belem Lisbon', 44, 160)
    ],
    read: [
      { k: 'CITY GUIDE', items: [
        { mag: 'Time Out Lisbon', title: 'Things to do in Lisbon', ko: '리스본에서 할 것 (영문)||What to do in Lisbon', url: 'https://www.timeout.com/lisbon' },
        { mag: 'Visit Lisboa', title: 'Official city guide', ko: '리스본 관광 공식 가이드||The official Lisbon visitor guide', url: 'https://www.visitlisboa.com' }
      ] }
    ],
    watch: [
      { label: '리스본 브이로그||Lisbon vlog', sub: '하루 코스 엿보기||A day in the city', q: 'Lisbon travel vlog' },
      { label: '리스본 전망대||Lisbon viewpoints', sub: '노을 명당||Best sunset spots', q: 'Lisbon best viewpoints sunset' },
      { label: '리스본 맛집||Where to eat', sub: '에그타르트 · 해산물||Custard tarts and seafood', q: 'Lisbon food guide' },
      { label: '유럽 여름 코디||Europe summer outfits', sub: '여행 룩 아이디어||Travel outfit ideas', q: 'Portugal summer outfits lookbook' }
    ],
    know: ['팁은 필수가 아니에요. 서비스가 좋았다면 잔돈을 남기는 정도예요.||Tipping is not required. Leave some change if the service was good.', '카드가 대부분 되지만 작은 가게는 현금만 받기도 해요.||Cards work almost everywhere, but small shops can be cash only.', '유럽연합 밖 거주자는 조건이 맞으면 부가세 환급이 돼요 — 매장에서 물어보세요.||Non-EU residents can get a VAT refund when conditions are met — ask in the shop.'],
    essentials: ['여권 (유효기간 확인)||Passport (check validity)', '유럽 입국 사전 허가(ETIAS) 필요 여부 확인||Check whether you need ETIAS travel authorisation'].concat(TRAVEL_ESS, ['밑창 좋은 신발||Shoes with grip', '선글라스||Sunglasses'])
  });

  Object.assign(C.par, base, {
    cover: 'img/par/cover.webp',
    name: '파리||Paris', country: 'FRANCE · PARIS', lat: 48.86, lon: 2.35, tz: 'Europe/Paris', currency: 'EUR', cur: { code: 'EUR', sym: '€', unit: 1 },
    tagline: '덜어낼수록 멋있는 도시||Where less is always more', nick: '파리||Paris', short: 'PARIS', word: ['PA', 'RI', 'S'], glow: ['PARIS', 'CHIC', 'KIT'], coverHead: ['LESS IS MORE', 'IN PARIS.'],
    bandLabel: 'FRANCE', money: 'intl', tools: 'intl', sky: ['#3E4A8C', '#8E7BB5', '#F2A7B8', '#F9C6A0', '#FFE7A8'], scene: 'roofs',
    beautySub: '파리 파우치에 넣을 것||What goes in the Paris pouch', beautyNote: '화장은 가볍게, 립 하나로 포인트||Keep makeup light and let one lip colour do the work', beautyScribble: ['피부는 가볍게||Light skin', '립은 선명하게!||bold lip!'],
    arriveSub: '샤를 드골에서 시내로 · 그날의 행사||CDG to the city · what\'s on', arriveHead: 'CDG → CITY', eventsQuery: 'Paris events',
    zineTitle: 'MY PARIS\nDIARY', zineStamp: 'PARIS\n2026', zineBurst: 'TRÈS\nCHIC', zineText: '오늘의 파리||Paris today',
    normals: [[7, 3], [8, 3], [12, 5], [16, 7], [20, 11], [23, 14], [25, 16], [25, 16], [21, 13], [16, 10], [11, 6], [8, 3]],
    intro: '색은 줄이고 핏은 맞게. 파리에선 잘 입은 한 벌보다 덜어낸 한 벌이 더 멋있어요.||Fewer colours, better fit. In Paris a pared-back outfit beats a showy one.',
    notes: [
      { k: 'POWER', v: '230V', d: 'C·E타입 — 한국 플러그 그대로||Type C/E plugs — same as Korea' },
      { k: 'MOVE', v: 'Métro', d: '지하철 + 걷기, 계단이 많아요||Métro and walking — lots of stairs' },
      { k: 'DRESS CODE', v: 'Neutral', d: '네이비·블랙·베이지가 기본||Navy, black and beige are the base' },
      { k: 'HELLO', v: 'Bonjour', d: '가게 들어갈 때 인사 먼저||Say it first when you enter a shop' },
      { k: 'SUNDAY', v: 'Closed', d: '일요일엔 쉬는 가게가 많아요||Many shops close on Sundays' }
    ],
    countryTip: '가게에 들어가면 "봉주르" 먼저 — 응대가 달라져요!||Say "Bonjour" as you walk in — it changes everything!',
    looks: looks({
      hot: ['SEINE SUMMER', '센 강 여름 룩||Summer by the Seine', '냉방이 약한 곳이 많아요 — 통풍 좋은 소재||Air-con is rare — pick breathable fabrics', { her: { top: { c: '#FFFFFF', name: '린넨 셔츠||Linen shirt', note: '화이트||White', icon: 'shirt' } } }],
      mild: ['RIVE GAUCHE', '좌안 산책 룩||Left Bank stroll', '색은 세 가지 안에서||Stay within three colours', { her: { outer: { icon: 'jacket', c: '#2E4F86', a: '#243F6B', name: '네이비 블레이저||Navy blazer', note: '살짝 오버핏||Slightly oversized' }, acc: { icon: 'sunglasses', c: '#141210', name: '선글라스||Sunglasses', note: '블랙||Black' } }, him: { outer: { c: '#2E4F86', a: '#243F6B', name: '네이비 워크 재킷||Navy chore jacket', note: '프렌치 워크웨어||French workwear' } } }],
      cool: ['TRENCH & SCARF', '트렌치와 스카프 룩||Trench and scarf', '비가 자주 와요 — 접이식 우산||Showers are common — carry a folding umbrella'],
      cold: ['WOOL COAT DAYS', '울 코트 겨울 룩||Wool-coat winter', '습한 추위 — 머플러를 꼭||Damp cold — a scarf is essential', { her: { outer: { c: '#3A3F5C', a: '#2B2F47', name: '울 롱코트||Long wool coat', note: '네이비||Navy' } }, him: { outer: { c: '#8A5A3B', a: '#6B4530', name: '울 코트||Wool coat', note: '카멜||Camel' } } }]
    }),
    beauty: beauty([
      ['balm', '#C2185B', '#141210', '레드 립||Red lipstick', '이거 하나로 완성||The one thing that finishes the look'],
      ['tube', '#F7F4EE', '#F2457C', '핸드크림||Hand cream', '약국 화장품 쇼핑 리스트 1번||Top of the pharmacy shopping list'],
      ['mist', '#CFE3F0', undefined, '온천수 미스트||Thermal water mist', '건조한 실내에서||For dry rooms'],
      ['compact', '#F2C7B0', undefined, '쿠션 팩트||Cushion compact', '얇게 한 번만||One thin layer'],
      ['jar', '#F7F4EE', '#E3D3B8', '보습 크림||Moisturiser', '센물이라 피부가 당겨요||Hard water leaves skin tight']
    ]),
    day: [
      stop('09:00', 'Le Marais', 'Paris 3e·4e', '빵집에서 아침, 골목 편집숍 구경||Breakfast from a bakery, then boutique-lined lanes', '걷기 편한 로퍼나 스니커즈||Loafers or sneakers you can walk in', 'Le Marais Paris', 'fork', '#FFD23F'),
      stop('11:30', 'Seine · Île Saint-Louis', 'Paris', '강변 따라 걷기||Walk along the river', '바람 막을 스카프||A scarf for the breeze', 'Ile Saint-Louis Paris', 'pin', '#FFFFFF'),
      stop('14:00', 'Saint-Germain-des-Prés', 'Paris 6e', '카페 테라스와 서점||Café terraces and bookshops', '재킷 하나로 단정하게||A jacket keeps it sharp', 'Saint-Germain-des-Pres Paris', 'tote', '#F3EAD8'),
      stop('17:00', 'Jardin des Tuileries', 'Paris 1er', '정원 의자에 앉아 노을 보기||Sunset from a garden chair', '해 지면 쌀쌀해요||It turns chilly at dusk', 'Jardin des Tuileries', 'sun', '#FFD23F', 'golden'),
      stop('20:00', 'Canal Saint-Martin', 'Paris 10e', '운하 옆 비스트로에서 저녁||Dinner at a bistro by the canal', '실내는 좁고 따뜻해요||Rooms are small and warm', 'Canal Saint-Martin Paris', 'moon', '#F2A7B8', 'after')
    ],
    dayAlt: '언덕 코스도 좋아요: Montmartre 골목 → Sacré-Cœur 계단에서 노을||Or take the hill: Montmartre lanes, then sunset from the Sacré-Cœur steps',
    eat: [
      spot('동네 빵집||A neighbourhood bakery', '아침엔 줄 선 빵집이 정답||In the morning, follow the queue', '크루아상 · 바게트 샌드위치||Croissants and baguette sandwiches', 'boulangerie Le Marais Paris', '#FFD23F'),
      spot('Marché des Enfants Rouges', '쉬는 요일 확인하고 점심에||Check closing days and go for lunch', '지붕 있는 시장 먹거리||A covered market with food stalls', 'Marche des Enfants Rouges', '#F2A7B8'),
      spot('Canal Saint-Martin 비스트로||Canal Saint-Martin bistros', '저녁은 예약하고 가기||Reserve for dinner', '비스트로와 와인 바||Bistros and wine bars', 'Canal Saint-Martin restaurants', '#CFE3F0')
    ],
    go: [
      spot('Musée d\'Orsay', '시간 지정 예약이 편해요||A timed ticket saves the queue', '기차역을 고친 미술관||A museum in a former railway station', 'Musee d Orsay', '#BFC9D3'),
      spot('Jardin du Luxembourg', '초록 의자는 누구나 앉아도 돼요||The green chairs are for everyone', '좌안의 큰 정원||The big garden on the Left Bank', 'Jardin du Luxembourg', '#E3DED6'),
      spot('Montmartre', '아침 일찍 가야 한적해요||Go early for quiet streets', '언덕 위 골목과 전망||Hilltop lanes and a city view', 'Montmartre Paris', '#A9C6DE')
    ],
    goTip: '미술관은 쉬는 요일이 서로 달라요. 시간 지정 예약을 미리 해 두면 줄을 안 서요.||Museums close on different days. A timed ticket booked ahead skips the line.',
    arrive: {
      asOf: '파리 도착 팁||Arriving in Paris',
      note: '기차(RER B)가 제일 싸고 빠르지만 계단이 많아요. 큰 캐리어가 있으면 정액 택시가 편해요.||The RER B train is the cheapest and fastest, but there are many stairs. With a big suitcase, the flat-fare taxi is easier.',
      opts: [
        opt('rer', '#1F6FD6', '가장 저렴||Cheapest', 'RER B', '공항 기차||Airport train', '공항 구간 승차권||Airport ticket', '시내까지 약 35~45분||About 35–45 min to the centre', '공항역에서 타서 Gare du Nord, Châtelet 같은 큰 역에서 지하철로 갈아타요.||Board at the airport and change to the métro at a big station such as Gare du Nord or Châtelet.', '짐이 가벼울 때||Travelling light'),
        opt('taxi', '#D9A300', '정액 요금||Flat fare', 'TAXI', '공식 택시||Official taxi', '시내까지 정액 (좌안·우안이 달라요)||Flat fare to the city (Left and Right Bank differ)', '약 45~70분||About 45–70 min', '공식 승강장 줄에서만 타세요. 터미널 안에서 말 거는 기사는 거절하세요.||Queue at the official rank only. Turn down drivers who approach you in the terminal.', '큰 캐리어 · 일행이 여럿||Big suitcases · groups'),
        opt('ride', '#7A3FB0', '앱 호출||By app', 'RIDE APP', '우버 · 볼트||Uber · Bolt', '시간대에 따라 달라요||Varies by time of day', '약 45~70분||About 45–70 min', '앱이 알려 주는 픽업 지점으로 이동해요.||Walk to the pickup point shown in the app.', '숙소가 역에서 멀 때||Staying far from a station')
      ],
      picks: [{ label: '마레·북역 근처||Marais · near Gare du Nord', id: 'rer' }, { label: '큰 캐리어||Big suitcase', id: 'taxi' }, { label: '역에서 먼 숙소||Far from a station', id: 'ride' }],
      foot: FOOT
    },
    events: [
      { name: 'Paris je t\'aime', what: '파리 관광 공식 사이트||Official Paris tourism site', url: 'https://parisjetaime.com/eng/' },
      { name: 'Time Out Paris', what: '파리에서 할 것 (영문)||Things to do in Paris', url: 'https://www.timeout.com/paris/en' }
    ],
    hoodSvg: '<path d="M0 150 C 70 110 130 100 190 124 C 250 148 300 150 360 122 V150 C 300 178 250 176 190 152 C 130 128 70 138 0 178 Z" fill="#BFD9E6" stroke="#141210" stroke-width="2"/><text x="24" y="150" font-family="Permanent Marker, cursive" font-size="12" fill="#5D8BA6" transform="rotate(-24 24 150)">Seine</text><text x="20" y="228" font-family="Permanent Marker, cursive" font-size="11" fill="#6B6259">Left Bank</text><text x="20" y="20" font-family="Permanent Marker, cursive" font-size="11" fill="#6B6259">Right Bank</text><text x="352" y="232" text-anchor="end" font-family="Anton, sans-serif" font-size="9" letter-spacing="1" fill="#6B6259">NOT TO SCALE</text>',
    hoods: [
      hood('르 마레||Le Marais', 'LE MARAIS', 'EFFORTLESS', '편집숍과 빈티지, 갤러리||Boutiques, vintage and galleries', ['블레이저||Blazer', '스트레이트 데님||Straight jeans', '로퍼||Loafers'], ['Place des Vosges', 'Rue Vieille du Temple'], ['#2E4F86', '#F3EAD8', '#C2185B'], 'Le Marais Paris', 236, 96),
      hood('생제르맹||Saint-Germain', 'SAINT-GERMAIN', 'LEFT BANK CLASSIC', '카페 테라스와 서점||Café terraces and bookshops', ['트렌치코트||Trench coat', '니트||Knit', '발레 플랫||Ballet flats'], ['Jardin du Luxembourg', 'Boulevard Saint-Germain'], ['#D9B98A', '#141210', '#F3EAD8'], 'Saint-Germain-des-Pres Paris', 168, 190),
      hood('몽마르트르||Montmartre', 'MONTMARTRE', 'ROMANTIC', '언덕 골목과 계단||Hilltop lanes and stairways', ['롱 스커트 또는 와이드 팬츠||Long skirt or wide trousers', '가디건||Cardigan', '스니커즈||Sneakers'], ['Sacré-Cœur', 'Rue de l\'Abreuvoir'], ['#F2A7B8', '#F3EAD8', '#6B8E5A'], 'Montmartre Paris', 176, 36),
      hood('생마르탱 운하||Canal Saint-Martin', 'CANAL ST-MARTIN', 'YOUNG & CASUAL', '운하 옆 카페와 편집숍||Cafés and shops along the canal', ['워크 재킷||Chore jacket', '데님||Denim', '캔버스 스니커즈||Canvas sneakers'], ['Quai de Valmy', 'Rue de Marseille'], ['#6B8E5A', '#F3EAD8', '#FFD23F'], 'Canal Saint-Martin Paris', 280, 60)
    ],
    read: [
      { k: 'CITY GUIDE', items: [
        { mag: 'Time Out Paris', title: 'Things to do in Paris', ko: '파리에서 할 것 (영문)||What to do in Paris', url: 'https://www.timeout.com/paris/en' },
        { mag: 'Paris je t\'aime', title: 'Official city guide', ko: '파리 관광 공식 가이드||The official Paris visitor guide', url: 'https://parisjetaime.com/eng/' }
      ] }
    ],
    watch: [
      { label: '파리 브이로그||Paris vlog', sub: '하루 코스 엿보기||A day in the city', q: 'Paris travel vlog' },
      { label: '파리 스트리트 패션||Paris street style', sub: '요즘 거리 스타일||What people wear now', q: 'Paris street style' },
      { label: '프렌치 시크 코디||French chic outfits', sub: '기본템으로 입는 법||How to wear the basics', q: 'French girl style outfits' },
      { label: '파리 빵집||Paris bakeries', sub: '크루아상 · 디저트||Croissants and pastries', q: 'best bakeries in Paris' }
    ],
    know: ['식당 가격엔 봉사료가 포함돼 있어요. 팁은 잔돈 정도면 충분해요.||Service is included in restaurant prices. A little change is enough for a tip.', '유럽연합 밖 거주자는 같은 매장에서 일정 금액 이상 사면 부가세 환급이 돼요 — 여권을 챙기세요.||Non-EU residents can claim a VAT refund above a minimum spend in one shop — bring your passport.', '물은 "카라프 도(carafe d\'eau)"를 달라고 하면 무료 수돗물을 줘요.||Ask for a "carafe d\'eau" and you get free tap water.'],
    essentials: ['여권 (유효기간 확인)||Passport (check validity)', '유럽 입국 사전 허가(ETIAS) 필요 여부 확인||Check whether you need ETIAS travel authorisation'].concat(TRAVEL_ESS, ['접이식 우산||Folding umbrella', '스카프||Scarf'])
  });

  Object.assign(C.bkk, base, {
    cover: 'img/bkk/cover.webp',
    name: '방콕||Bangkok', country: 'THAILAND · BANGKOK', lat: 13.75, lon: 100.5, tz: 'Asia/Bangkok', currency: 'THB', cur: { code: 'THB', sym: '฿', unit: 1 },
    tagline: '일 년 내내 여름인 도시||Summer all year round', nick: '방콕||Bangkok', short: 'BANGKOK', word: ['BANG', 'KOK', 'CITY'], glow: ['HEAT', 'PROOF', 'KIT'], coverHead: ['HEAT WAVE', 'IN BANGKOK.'],
    bandLabel: 'THAILAND', money: 'intl', tools: 'intl', sky: ['#5A2A82', '#C2185B', '#F2457C', '#FF8A3D', '#FFD23F'], scene: 'towers',
    beautySub: '방콕 파우치에 넣을 것||What goes in the Bangkok pouch', beautyNote: '덥고 습해요 — 무너지지 않는 것 위주로||Hot and humid — pack what stays put', beautyScribble: ['덥고 습해요||Hot and humid', '밖은 뜨겁고 안은 추워요!||hot outside, cold inside!'],
    arriveSub: '수완나품에서 시내로 · 그날의 행사||Suvarnabhumi to the city · what\'s on', arriveHead: 'BKK → CITY', eventsQuery: 'Bangkok events',
    zineTitle: 'MY BANGKOK\nDIARY', zineStamp: 'BANGKOK\n2026', zineBurst: 'HOT\nHOT', zineText: '오늘의 방콕||Bangkok today',
    normals: [[33, 23], [34, 25], [35, 26], [36, 27], [35, 27], [34, 26], [33, 26], [33, 26], [33, 25], [33, 25], [32, 24], [32, 22]],
    intro: '밖은 한여름, 쇼핑몰과 전철 안은 초가을. 얇게 입고 걸칠 것 하나를 꼭 챙기는 도시예요.||Midsummer outside, early autumn inside the malls and trains. Dress light and always carry one extra layer.',
    notes: [
      { k: 'POWER', v: '230V', d: '한국 플러그가 대부분 맞아요||Korean plugs fit most sockets' },
      { k: 'MOVE', v: 'BTS · MRT', d: '전철 + 앱 택시가 편해요||Trains plus ride apps work best' },
      { k: 'TEMPLE', v: 'Cover Up', d: '사원은 어깨·무릎을 가려야 해요||Cover shoulders and knees at temples' },
      { k: 'RAIN', v: 'May–Oct', d: '우기엔 오후 소나기가 잦아요||Afternoon downpours in the rainy season' },
      { k: 'INDOORS', v: 'Cold A/C', d: '실내 냉방이 아주 세요||The air-con is fierce' }
    ],
    countryTip: '사원 가는 날엔 긴 바지나 롱스커트 — 얇은 셔츠도 가방에!||On temple days wear long trousers or a long skirt — and keep a thin shirt in your bag!',
    looks: looks({
      hot: ['BANGKOK HEAT', '방콕 한낮 룩||Bangkok midday look', '린넨과 면만 — 실내용 얇은 셔츠 하나||Linen and cotton only — plus a thin shirt for indoors', { her: { bottom: { icon: 'pants', c: '#F3EAD8', name: '린넨 롱 팬츠||Long linen trousers', note: '사원도 OK||Temple-friendly' }, top: { c: '#F2457C', name: '슬리브리스 탑||Sleeveless top', note: '선명한 색||A bright colour' } }, him: { top: { icon: 'shirt', c: '#CFE3F0', a: '#9DB4D6', name: '반팔 린넨 셔츠||Short-sleeve linen shirt', note: '하늘색||Sky blue' } } }],
      mild: ['COOL SEASON NIGHT', '선선한 밤 룩||Cool-season evening', '루프탑은 바람이 불어요||Rooftops get breezy'],
      cool: ['A/C LAYERS', '냉방 대비 레이어드||Layers for the air-con', '실내에 오래 있는 날||For long days indoors']
    }),
    beauty: beauty([
      ['tube', '#F7F4EE', '#FFD23F', '워터프루프 선크림||Waterproof sunscreen', '땀에 지워지지 않는 것||One that survives sweat'],
      ['compact', '#F2C7B0', undefined, '기름종이 · 파우더||Blotting paper and powder', '번들거림 잡기||Keeps shine down'],
      ['mist', '#CFE3F0', undefined, '쿨링 미스트||Cooling mist', '걷다가 한 번||A spritz mid-walk'],
      ['balm', '#E0245E', '#141210', '립 틴트||Lip tint', '땀에도 남는 색||Colour that stays in the heat'],
      ['jar', '#DFF0E0', '#6B8E5A', '수딩 젤||Soothing gel', '햇볕에 달아오른 피부에||For sun-warmed skin']
    ]),
    day: [
      stop('08:30', 'Wat Pho', 'Old Town', '더워지기 전에 사원부터||Temples first, before the heat', '어깨·무릎 가리는 옷||Cover shoulders and knees', 'Wat Pho Bangkok', 'pin', '#FFD23F'),
      stop('11:00', 'Talat Noi', 'Chinatown', '벽화 골목과 강변 카페||Mural-lined lanes and riverside cafés', '통풍 좋은 린넨||Breathable linen', 'Talat Noi Bangkok', 'camera', '#FFFFFF'),
      stop('14:00', 'Siam', 'Pathum Wan', '한낮엔 시원한 쇼핑몰로||Spend the hottest hours in the malls', '실내 냉방 — 얇은 셔츠||Cold inside — bring the thin shirt', 'Siam Bangkok', 'tote', '#F3EAD8'),
      stop('17:30', 'Wat Arun 강 건너편||Across the river from Wat Arun', 'Chao Phraya', '강 건너 사원 뒤로 지는 노을||Sunset behind the temple across the river', '모기 기피제 챙기기||Bring mosquito repellent', 'Wat Arun view point Tha Tien', 'sun', '#FFD23F', 'golden'),
      stop('19:30', 'Yaowarat', 'Chinatown', '네온 아래 길거리 음식||Street food under the neon', '편한 샌들, 가방은 앞으로||Comfortable sandals, bag in front', 'Yaowarat Road Bangkok', 'moon', '#F2A7B8', 'after')
    ],
    dayAlt: '주말이라면: Chatuchak 주말 시장 → Ari 카페 골목||On a weekend: Chatuchak Weekend Market, then the cafés of Ari',
    eat: [
      spot('Yaowarat', '해 진 뒤에 가야 노점이 열려요||Stalls open after dark', '차이나타운 길거리 음식||Chinatown street food', 'Yaowarat Road street food', '#FFD23F'),
      spot('Or Tor Kor Market', '과일과 반찬을 조금씩 사 먹기||Graze on fruit and small dishes', '깔끔한 시장 먹거리||A clean, well-kept food market', 'Or Tor Kor Market Bangkok', '#F2A7B8'),
      spot('Ari 카페 골목||Ari cafés', '한낮 더위 피하기 좋아요||A good escape from midday heat', '브런치 · 커피||Brunch and coffee', 'Ari Bangkok cafes', '#CFE3F0')
    ],
    go: [
      spot('Wat Arun', '강 건너편에서 보는 노을이 예뻐요||The best sunset view is from across the river', '강변의 사원||The riverside temple', 'Wat Arun Bangkok', '#BFC9D3'),
      spot('Chatuchak Weekend Market', '주말에만 열려요 — 오전에 가기||Weekends only — go in the morning', '거대한 주말 시장||A huge weekend market', 'Chatuchak Weekend Market', '#E3DED6'),
      spot('Chao Phraya 수상버스||Chao Phraya river boat', '길 막힐 때 제일 빨라요||The fastest way when roads jam', '강 위를 달리는 배||Boats that run the river', 'Chao Phraya Express Boat', '#A9C6DE')
    ],
    goTip: '사원은 어깨와 무릎을 가려야 들어갈 수 있어요. 신발을 벗는 곳이 많으니 신고 벗기 편한 신발이 좋아요.||Temples require covered shoulders and knees. You often take shoes off, so wear a pair that slips on and off.',
    arrive: {
      asOf: '방콕 도착 팁||Arriving in Bangkok',
      note: '공항철도가 막히지 않아 빠르고, 숙소가 역에서 멀면 앱 택시가 편해요. 퇴근 시간엔 도로가 많이 막혀요.||The airport train never gets stuck in traffic. If your stay is far from a station, a ride app is easier. Roads crawl at rush hour.',
      opts: [
        opt('rail', '#C2185B', '막히지 않아요||No traffic', 'RAIL LINK', '공항철도||Airport Rail Link', '거리별 요금||Fare by distance', 'Phaya Thai까지 약 30분||About 30 min to Phaya Thai', '종점 Phaya Thai에서 BTS로, Makkasan에서 MRT로 갈아타요.||Change to the BTS at Phaya Thai or the MRT at Makkasan.', '역 근처 숙소 · 퇴근 시간 도착||Staying near a station · rush-hour arrivals'),
        opt('ride', '#2E9E4F', '앱 호출||By app', 'RIDE APP', '그랩 · 볼트||Grab · Bolt', '앱에 요금이 먼저 떠요||The app shows the fare up front', '40~90분 (교통 상황)||40–90 min, depending on traffic', '앱에서 안내하는 픽업 구역에서 타요.||Meet your car at the pickup zone in the app.', '짐이 많거나 역에서 먼 숙소||Lots of bags or far from a station'),
        opt('taxi', '#D9A300', '미터 요금||By meter', 'TAXI', '공항 공식 택시||Official airport taxi', '미터 + 공항 수수료 + 통행료||Meter plus airport surcharge and tolls', '40~90분||40–90 min', '공식 승강장에서 번호표를 뽑고 타요. 미터를 켰는지 확인하세요.||Take a ticket at the official stand and check the meter is on.', '밤늦게 도착할 때||Late arrivals')
      ],
      picks: [{ label: '시암·파야타이||Siam · Phaya Thai', id: 'rail' }, { label: '수쿰윗 안쪽||Deep in Sukhumvit', id: 'ride' }, { label: '밤 도착||Arriving late', id: 'taxi' }],
      foot: FOOT
    },
    events: [
      { name: 'Amazing Thailand', what: '태국 관광청 공식 사이트||Official Thailand tourism site', url: 'https://www.tourismthailand.org' },
      { name: 'Time Out Bangkok', what: '방콕에서 할 것 (영문)||Things to do in Bangkok', url: 'https://www.timeout.com/bangkok' }
    ],
    hoodSvg: '<path d="M70 0 C 40 50 110 90 80 140 C 60 180 120 210 110 240 H150 C 160 206 100 180 120 140 C 150 90 80 50 110 0 Z" fill="#BFD9E6" stroke="#141210" stroke-width="2"/><text x="26" y="120" font-family="Permanent Marker, cursive" font-size="12" fill="#5D8BA6" transform="rotate(-80 26 120)">Chao Phraya</text><path d="M150 96 H360" stroke="#141210" stroke-width="2.2" stroke-dasharray="7 5" fill="none"/><text x="300" y="88" font-family="Permanent Marker, cursive" font-size="11" fill="#6B6259">BTS</text><text x="352" y="232" text-anchor="end" font-family="Anton, sans-serif" font-size="9" letter-spacing="1" fill="#6B6259">NOT TO SCALE</text>',
    hoods: [
      hood('시암||Siam', 'SIAM', 'MALL STYLE', '쇼핑몰과 로컬 브랜드||Malls and Thai labels', ['슬리브리스 + 얇은 셔츠||Sleeveless top plus a thin shirt', '와이드 팬츠||Wide trousers', '스니커즈||Sneakers'], ['Siam Square', 'Bangkok Art and Culture Centre'], ['#F2457C', '#FFFFFF', '#141210'], 'Siam Bangkok', 214, 100),
      hood('아리||Ari', 'ARI', 'CAFÉ CASUAL', '조용한 주택가의 카페 골목||Cafés on quiet residential lanes', ['린넨 셔츠||Linen shirt', '반바지||Shorts', '샌들||Sandals'], ['Ari Soi 1', 'Ari Samphan'], ['#6B8E5A', '#F3EAD8', '#FFD23F'], 'Ari Bangkok', 222, 32),
      hood('탈랏노이 · 야오와랏||Talat Noi · Yaowarat', 'CHINATOWN', 'RETRO STREET', '벽화 골목과 네온 야시장||Mural lanes and neon night stalls', ['프린트 셔츠||Printed shirt', '통 넓은 바지||Loose trousers', '편한 샌들||Comfortable sandals'], ['Soi Nana (Chinatown)', 'Song Wat Road'], ['#E0245E', '#FFD23F', '#141210'], 'Talat Noi Bangkok', 150, 170),
      hood('통로 · 에까마이||Thonglor · Ekkamai', 'THONGLOR', 'DRESS UP NIGHT', '바와 레스토랑, 루프탑||Bars, restaurants and rooftops', ['슬립 드레스 또는 셔츠 셋업||Slip dress or a shirt set', '미니백||Mini bag', '뮬||Mules'], ['Sukhumvit Soi 55', 'Ekkamai Soi 10'], ['#141210', '#F3EAD8', '#D9B44A'], 'Thonglor Bangkok', 318, 130)
    ],
    read: [
      { k: 'CITY GUIDE', items: [
        { mag: 'Time Out Bangkok', title: 'Things to do in Bangkok', ko: '방콕에서 할 것 (영문)||What to do in Bangkok', url: 'https://www.timeout.com/bangkok' },
        { mag: 'Amazing Thailand', title: 'Official travel guide', ko: '태국 관광청 공식 가이드||The official Thailand travel guide', url: 'https://www.tourismthailand.org' }
      ] }
    ],
    watch: [
      { label: '방콕 브이로그||Bangkok vlog', sub: '하루 코스 엿보기||A day in the city', q: 'Bangkok travel vlog' },
      { label: '방콕 카페||Bangkok cafés', sub: '아리 · 통로||Ari and Thonglor', q: 'Bangkok cafe hopping Ari' },
      { label: '방콕 길거리 음식||Bangkok street food', sub: '야오와랏 야시장||Yaowarat at night', q: 'Yaowarat street food' },
      { label: '더운 나라 여행 코디||Hot-weather outfits', sub: '린넨 룩 아이디어||Linen outfit ideas', q: 'Thailand travel outfits lookbook' }
    ],
    know: ['팁은 필수가 아니에요. 마사지나 호텔에선 조금 주는 편이에요.||Tipping is not required. A small tip is usual for massages and hotel staff.', '노점과 시장은 현금이나 QR 결제 위주예요.||Street stalls and markets mostly take cash or QR payments.', '해외 관광객은 조건이 맞으면 부가세 환급을 받을 수 있어요 — 매장에서 서류를 받으세요.||Visitors can claim a VAT refund when conditions are met — ask the shop for the form.'],
    essentials: ['여권 (유효기간 6개월 이상)||Passport (6+ months validity)', '태국 디지털 입국카드(TDAC) 작성 확인||Thailand Digital Arrival Card (TDAC) completed'].concat(TRAVEL_ESS, ['모기 기피제||Mosquito repellent', '얇은 긴팔 셔츠 (사원·냉방)||Thin long-sleeve shirt (temples, air-con)'])
  });

  Object.assign(C.tyo, base, {
    cover: 'img/tyo/cover.webp',
    name: '도쿄||Tokyo', country: 'JAPAN · TOKYO', lat: 35.68, lon: 139.76, tz: 'Asia/Tokyo', currency: 'JPY', cur: { code: 'JPY', sym: '¥', unit: 100 },
    tagline: '동네마다 장르가 다른 도시||Every neighbourhood is its own genre', nick: '도쿄||Tokyo', short: 'TOKYO', word: ['TO', 'KYO', 'CITY'], glow: ['TOKYO', 'DRUG', 'STORE'], coverHead: ['LAYER UP', 'IN TOKYO.'],
    bandLabel: 'JAPAN', money: 'intl', tools: 'intl', sky: ['#1E2A6B', '#3E4A8C', '#C2185B', '#F2457C', '#FFD23F'], scene: 'towers',
    beautySub: '도쿄 파우치에 넣을 것||What goes in the Tokyo pouch', beautyNote: '여름은 습하고 겨울은 건조해요 — 드럭스토어에서 채우기||Humid summers, dry winters — restock at the drugstore', beautyScribble: ['겨울은 건조||Dry winters', '여름은 습해요!||humid summers!'],
    arriveSub: '나리타·하네다에서 시내로 · 그날의 행사||Narita and Haneda to the city · what\'s on', arriveHead: 'NRT · HND → CITY', eventsQuery: 'Tokyo events',
    zineTitle: 'MY TOKYO\nDIARY', zineStamp: 'TOKYO\n2026', zineBurst: 'KAWAII\nDAY', zineText: '오늘의 도쿄||Tokyo today',
    normals: [[10, 2], [11, 2], [14, 5], [19, 10], [23, 15], [26, 19], [30, 23], [31, 24], [27, 21], [22, 15], [17, 9], [12, 4]],
    intro: '빈티지의 시모키타, 차분한 다이칸야마, 화려한 하라주쿠. 어느 동네에 가느냐로 그날 옷이 정해져요.||Vintage Shimokitazawa, calm Daikanyama, loud Harajuku. Where you go decides what you wear.',
    notes: [
      { k: 'POWER', v: '100V', d: 'A타입 플러그 — 어댑터 챙기기||Type A plugs — bring an adapter' },
      { k: 'MOVE', v: 'Train', d: '교통카드 하나로 전철·편의점까지||One IC card covers trains and convenience stores' },
      { k: 'DRESS CODE', v: 'Layered', d: '겹쳐 입기와 큰 실루엣||Layers and roomy silhouettes' },
      { k: 'CASH', v: 'Carry Some', d: '작은 가게는 현금만 받기도 해요||Some small shops are cash only' },
      { k: 'TIP', v: 'None', d: '팁 문화가 없어요||There is no tipping' }
    ],
    countryTip: '전철 안에선 통화 금지, 백팩은 앞으로 — 조용한 게 매너예요!||No phone calls on trains, backpack to the front — quiet is good manners!',
    looks: looks({
      hot: ['TOKYO SUMMER', '도쿄 한여름 룩||Tokyo midsummer look', '습도가 높아요 — 손수건과 양산||Very humid — a handkerchief and a sun umbrella'],
      mild: ['SHIMOKITA VINTAGE', '시모키타 빈티지 룩||Shimokita vintage look', '헐렁하게 겹쳐 입기||Loose and layered', { her: { outer: { icon: 'jacket', c: '#6E8FB8', a: '#3B5B92', name: '빈티지 데님 재킷||Vintage denim jacket', note: '오버핏||Oversized' }, bottom: { icon: 'pants', c: '#F3EAD8', a: '#D9C3A0', name: '와이드 치노||Wide chinos', note: '아이보리||Ivory' } }, him: { outer: { c: '#8A5A3B', a: '#6B4530', name: '코듀로이 재킷||Corduroy jacket', note: '브라운||Brown' } } }],
      cool: ['CITY BOY LAYERS', '시티보이 레이어드 룩||City-boy layers', '낮밤 기온차 — 벗고 입기 쉬운 겉옷||Big day-night swing — a layer that comes off easily'],
      cold: ['DRY WINTER', '맑고 건조한 겨울 룩||Clear, dry winter look', '실내 난방이 세요 — 안은 얇게||Heating is strong — keep the inner layer thin']
    }),
    beauty: beauty([
      ['tube', '#F7F4EE', '#2D5BFF', '선크림||Sunscreen', '가벼운 제형이 많아요||Lots of featherlight formulas'],
      ['balm', '#E0245E', '#141210', '립밤||Lip balm', '겨울엔 아주 건조해요||Winters are very dry'],
      ['compact', '#F2C7B0', undefined, '파우더 팩트||Pressed powder', '습한 날 번들거림 잡기||Tames shine on humid days'],
      ['mist', '#CFE3F0', undefined, '미스트||Face mist', '난방 센 전철·실내에서||For heated trains and rooms'],
      ['jar', '#F7F4EE', '#E3D3B8', '올인원 젤||All-in-one gel', '드럭스토어 쇼핑 1순위||First pick at the drugstore']
    ]),
    day: [
      stop('09:30', 'Kiyosumi-Shirakawa', 'Koto', '커피 한 잔과 정원 산책||Coffee and a garden walk', '걷기 편한 신발로 출발||Leave in walkable shoes', 'Kiyosumi-Shirakawa Tokyo coffee', 'fork', '#FFD23F'),
      stop('12:00', 'Harajuku · Omotesando', 'Shibuya', '뒷골목 편집숍과 큰길 건축 구경||Backstreet boutiques and avenue architecture', '사진 찍히기 좋은 겉옷||A jacket worth being photographed in', 'Omotesando Tokyo', 'tote', '#FFFFFF'),
      stop('14:30', 'Shimokitazawa', 'Setagaya', '빈티지 숍 돌기||Vintage-shop crawl', '입어 보기 편한 옷||Wear something easy to try clothes over', 'Shimokitazawa vintage', 'camera', '#F3EAD8'),
      stop('17:00', 'Shibuya Sky 또는 육교||Shibuya Sky or a footbridge', 'Shibuya', '스크램블 교차로 위로 지는 노을||Sunset over the scramble crossing', '전망대는 예약 확인||Check bookings for the observation deck', 'Shibuya Sky', 'sun', '#FFD23F', 'golden'),
      stop('19:30', 'Nakameguro', 'Meguro', '강변 골목의 작은 식당||Small restaurants along the canal', '신발 벗는 곳 대비 — 양말 신경 쓰기||You may take shoes off — mind your socks', 'Nakameguro restaurants', 'moon', '#F2A7B8', 'after')
    ],
    dayAlt: '동쪽 코스도 좋아요: Asakusa 아침 산책 → Kuramae 공방·카페 → 강변 노을||Or head east: morning in Asakusa, crafts and cafés in Kuramae, sunset by the river',
    eat: [
      spot('백화점 지하 식품관||Department-store food halls', '저녁 무렵엔 할인 스티커가 붙어요||Discount stickers appear toward evening', '도시락 · 디저트||Bento and sweets', 'depachika Tokyo', '#FFD23F'),
      spot('Tsukiji 장외시장||Tsukiji Outer Market', '오전에 가야 가게가 열려 있어요||Go in the morning while stalls are open', '해산물 · 계란말이||Seafood and rolled omelette', 'Tsukiji Outer Market', '#F2A7B8'),
      spot('Nakameguro 골목||Nakameguro backstreets', '인기 있는 곳은 예약 필수||Popular places need a reservation', '이자카야 · 작은 식당||Izakaya and small restaurants', 'Nakameguro izakaya', '#CFE3F0')
    ],
    go: [
      spot('Meiji Jingu', '아침 일찍 가면 고요해요||Quietest early in the morning', '도심 속 숲길 신사||A shrine reached through a city forest', 'Meiji Jingu', '#BFC9D3'),
      spot('Daikanyama T-Site', '서점에서 한 시간은 금방 가요||An hour disappears in the bookshop', '서점과 카페가 모인 곳||Bookshop, cafés and lounge', 'Daikanyama T-Site', '#E3DED6'),
      spot('Asakusa · Senso-ji', '저녁엔 조명이 켜져요||Lit up after dark', '옛 도쿄 분위기||Old-Tokyo atmosphere', 'Sensoji Asakusa', '#A9C6DE')
    ],
    goTip: '인기 전망대·미술관은 시간 지정 예약제가 많아요. 가기 전에 공식 사이트를 확인하세요.||Popular observation decks and museums often use timed tickets. Check the official site first.',
    arrive: {
      asOf: '도쿄 도착 팁||Arriving in Tokyo',
      note: '나리타는 멀어서 특급 열차가 편하고, 하네다는 가까워서 전철로 금방이에요. 내 숙소 역까지 갈아타기 적은 걸 고르세요.||Narita is far, so take an express train. Haneda is close and quick by rail. Pick whichever needs the fewest changes to your station.',
      opts: [
        opt('nex', '#C2185B', '나리타||Narita', 'N\'EX', '나리타 익스프레스||Narita Express', '지정석 요금||Reserved-seat fare', '도쿄역까지 약 1시간||About 1 hr to Tokyo Station', '도쿄·시부야·신주쿠 방면으로 갈아타지 않고 가요.||Runs direct toward Tokyo, Shibuya and Shinjuku.', '시부야·신주쿠 숙소||Staying in Shibuya or Shinjuku'),
        opt('sky', '#1F6FD6', '나리타||Narita', 'SKYLINER', '게이세이 스카이라이너||Keisei Skyliner', '지정석 요금||Reserved-seat fare', '우에노까지 약 40~45분||About 40–45 min to Ueno', '닛포리·우에노까지 제일 빨라요.||The fastest ride to Nippori and Ueno.', '우에노·아사쿠사 숙소||Staying in Ueno or Asakusa'),
        opt('hnd', '#2E9E4F', '하네다||Haneda', 'KEIKYU · MONORAIL', '게이큐선 · 모노레일||Keikyu Line · Monorail', '교통카드 요금||IC card fare', '시내까지 약 20~30분||About 20–30 min to the city', '시나가와(게이큐)나 하마마쓰초(모노레일)에서 JR로 갈아타요.||Change to JR at Shinagawa (Keikyu) or Hamamatsucho (Monorail).', '하네다에 도착할 때||Arriving at Haneda'),
        opt('bus', '#D9A300', '문 앞까지||To the door', 'LIMOUSINE BUS', '공항 리무진 버스||Airport limousine bus', '노선별 요금||Fare by route', '60~120분 (교통 상황)||60–120 min, depending on traffic', '큰 호텔과 주요 역 앞에 서요. 짐을 실어 줘서 편해요.||Stops at major hotels and stations, and staff load your bags.', '짐이 많거나 아이와 함께||Lots of luggage or travelling with kids')
      ],
      picks: [{ label: '시부야·신주쿠||Shibuya · Shinjuku', id: 'nex' }, { label: '우에노·아사쿠사||Ueno · Asakusa', id: 'sky' }, { label: '하네다 도착||Landing at Haneda', id: 'hnd' }, { label: '짐이 많아요||Lots of bags', id: 'bus' }],
      foot: FOOT
    },
    events: [
      { name: 'GO TOKYO', what: '도쿄 관광 공식 사이트||Official Tokyo travel guide', url: 'https://www.gotokyo.org/en/' },
      { name: 'Time Out Tokyo', what: '도쿄에서 할 것 (영문)||Things to do in Tokyo', url: 'https://www.timeout.com/tokyo' }
    ],
    hoodSvg: '<path d="M250 240 C 262 200 300 180 360 176 V240 Z" fill="#BFD9E6" stroke="#141210" stroke-width="2"/><text x="292" y="224" font-family="Permanent Marker, cursive" font-size="12" fill="#5D8BA6">Tokyo Bay</text><ellipse cx="190" cy="118" rx="96" ry="70" fill="none" stroke="#141210" stroke-width="2.2" stroke-dasharray="7 5"/><text x="150" y="122" font-family="Permanent Marker, cursive" font-size="11" fill="#6B6259">Yamanote loop</text><text x="8" y="14" font-family="Anton, sans-serif" font-size="9" letter-spacing="1" fill="#6B6259">NOT TO SCALE</text>',
    hoods: [
      hood('시모키타자와||Shimokitazawa', 'SHIMOKITAZAWA', 'VINTAGE', '빈티지 숍과 라이브 하우스||Vintage shops and live-music bars', ['빈티지 재킷||Vintage jacket', '와이드 팬츠||Wide trousers', '캔버스 스니커즈||Canvas sneakers'], ['Shimokita Senrogai', 'Bonus Track'], ['#8A5A3B', '#F3EAD8', '#6B8E5A'], 'Shimokitazawa Tokyo', 40, 150),
      hood('하라주쿠 · 오모테산도||Harajuku · Omotesando', 'HARAJUKU', 'STATEMENT', '뒷골목 스트리트와 큰길 플래그십||Backstreet streetwear and flagship avenue', ['포인트 아우터||Statement outerwear', '플리츠 스커트 또는 카고||Pleated skirt or cargos', '청키 슈즈||Chunky shoes'], ['Cat Street', 'Meiji Jingu'], ['#F2457C', '#FFD23F', '#141210'], 'Harajuku Tokyo', 112, 110),
      hood('다이칸야마 · 나카메구로||Daikanyama · Nakameguro', 'DAIKANYAMA', 'QUIET & CLEAN', '서점과 강변 산책길||A bookshop and a canal-side walk', ['셔츠||Shirt', '슬랙스||Tailored trousers', '로퍼||Loafers'], ['Daikanyama T-Site', 'Meguro River'], ['#141210', '#F3EAD8', '#2E4F86'], 'Daikanyama Tokyo', 106, 176),
      hood('기요스미시라카와 · 구라마에||Kiyosumi · Kuramae', 'EAST TOKYO', 'CRAFT & COFFEE', '로스터리와 공방 거리||Roasteries and craft workshops', ['워크 재킷||Chore jacket', '데님||Denim', '토트백||Tote bag'], ['Kiyosumi Garden', 'Kuramae'], ['#2E4F86', '#F3EAD8', '#D9B44A'], 'Kiyosumi-Shirakawa Tokyo', 298, 96)
    ],
    read: [
      { k: 'CITY GUIDE', items: [
        { mag: 'Time Out Tokyo', title: 'Things to do in Tokyo', ko: '도쿄에서 할 것 (영문)||What to do in Tokyo', url: 'https://www.timeout.com/tokyo' },
        { mag: 'GO TOKYO', title: 'Official travel guide', ko: '도쿄 관광 공식 가이드||The official Tokyo travel guide', url: 'https://www.gotokyo.org/en/' }
      ] }
    ],
    watch: [
      { label: '도쿄 브이로그||Tokyo vlog', sub: '하루 코스 엿보기||A day in the city', q: 'Tokyo travel vlog' },
      { label: '도쿄 스트리트 패션||Tokyo street style', sub: '하라주쿠 · 시부야||Harajuku and Shibuya', q: 'Tokyo street style' },
      { label: '시모키타 빈티지||Shimokita vintage', sub: '빈티지 숍 투어||A vintage-shop tour', q: 'Shimokitazawa vintage shopping' },
      { label: '도쿄 드럭스토어||Tokyo drugstores', sub: '뷰티 쇼핑 리스트||Beauty shopping list', q: 'Japan drugstore must buys' }
    ],
    know: ['팁 문화가 없어요. 계산은 자리 말고 계산대에서 하는 곳이 많아요.||There is no tipping. You usually pay at the register, not at the table.', '여행자 면세 방식이 2026년 11월부터 바뀌어요 — 매장과 공항 안내를 꼭 확인하세요.||Tax-free shopping rules change from November 2026 — check the shop and airport guidance.', '작은 식당·가게는 현금만 받기도 해요. 편의점 ATM에서 뽑을 수 있어요.||Small restaurants and shops can be cash only. Convenience-store ATMs take foreign cards.'],
    essentials: ['여권||Passport', '입국 온라인 사전 등록 확인||Online arrival registration checked'].concat(TRAVEL_ESS, ['A타입 플러그 어댑터||Type A plug adapter', '동전 지갑||Coin purse'])
  });

  Object.assign(C.syd, base, {
    cover: 'img/syd/cover.webp',
    name: '시드니||Sydney', country: 'AUSTRALIA · SYDNEY', lat: -33.87, lon: 151.21, tz: 'Australia/Sydney', currency: 'AUD', cur: { code: 'AUD', sym: 'A$', unit: 1 },
    tagline: '계절이 반대인 바다의 도시||The harbour city where seasons flip', nick: '시드니||Sydney', short: 'SYDNEY', word: ['SYD', 'NEY', 'CITY'], glow: ['SUN', 'SMART', 'KIT'], coverHead: ['SALT & SUN', 'IN SYDNEY.'],
    bandLabel: 'AUSTRALIA', money: 'intl', tools: 'intl', sky: ['#2D5BFF', '#69B7E8', '#BFE3F0', '#FFE7A8', '#FFD23F'], scene: 'waves',
    beautySub: '시드니 파우치에 넣을 것||What goes in the Sydney pouch', beautyNote: '자외선이 아주 강해요 — 선크림이 제일 중요해요||The UV is intense — sunscreen comes first', beautyScribble: ['자외선 아주 강함||Very high UV', '선크림 듬뿍!||lots of sunscreen!'],
    arriveSub: '공항에서 시내로 · 그날의 행사||Airport to the city · what\'s on', arriveHead: 'SYD → CITY', eventsQuery: 'Sydney events',
    zineTitle: 'MY SYDNEY\nDIARY', zineStamp: 'SYDNEY\n2026', zineBurst: 'BEACH\nDAY', zineText: '오늘의 시드니||Sydney today',
    normals: [[26, 19], [26, 19], [25, 18], [23, 15], [20, 12], [17, 9], [17, 8], [18, 9], [20, 11], [22, 14], [24, 16], [25, 18]],
    intro: '한국이 겨울일 때 여름인 도시. 아침엔 바다, 낮엔 카페, 저녁엔 항구 — 수영복이 평상복 사이에 끼어 있어요.||Summer when Korea is in winter. Beach in the morning, café at noon, harbour at dusk — swimwear lives among the everyday clothes.',
    notes: [
      { k: 'POWER', v: '230V', d: 'I타입 플러그 — 어댑터 필수||Type I plugs — an adapter is a must' },
      { k: 'MOVE', v: 'Train + Ferry', d: '카드를 찍고 타요 — 페리도 대중교통||Tap a card to ride — ferries count as transit' },
      { k: 'SEASON', v: 'Reversed', d: '12~2월이 여름, 6~8월이 겨울||Summer is Dec–Feb, winter is Jun–Aug' },
      { k: 'UV', v: 'Very High', d: '흐린 날에도 선크림||Sunscreen even on cloudy days' },
      { k: 'DRESS CODE', v: 'Beach Casual', d: '편하게, 저녁엔 조금 단정하게||Relaxed, a little smarter for dinner' }
    ],
    countryTip: '해변에선 빨강·노랑 깃발 사이에서만 수영해요!||At the beach, swim only between the red and yellow flags!',
    looks: looks({
      hot: ['BONDI SUMMER', '본다이 여름 룩||Bondi summer look', '자외선이 아주 강해요 — 모자와 선크림||The UV is intense — hat and sunscreen', { her: { acc: { icon: 'hat', c: '#F3EAD8', a: '#D9C3A0', name: '버킷햇||Bucket hat', note: '챙 넓은 것||A wide brim' } }, him: { top: { icon: 'shirt', c: '#FFFFFF', a: '#E3DED6', name: '린넨 셔츠||Linen shirt', note: '수영복 위에 걸치기||Throw it over swim shorts' } } }],
      mild: ['HARBOUR WALK', '하버 산책 룩||Harbour walk look', '바닷바람 — 얇은 겉옷 하나||Sea breeze — one light layer', { her: { outer: { c: '#CFE3F0', a: '#5D8BA6', name: '블루 가디건||Blue cardigan', note: '바다색||Ocean blue' } } }],
      cool: ['COASTAL LAYERS', '해안 레이어드 룩||Coastal layers', '겨울 아침저녁은 쌀쌀해요||Winter mornings and nights are crisp']
    }),
    beauty: beauty([
      ['tube', '#F7F4EE', '#FFD23F', 'SPF50+ 선크림||SPF 50+ sunscreen', '두 시간마다 덧바르기||Reapply every two hours'],
      ['balm', '#FFD23F', '#F7F4EE', 'SPF 립밤||SPF lip balm', '입술도 타요||Lips burn too'],
      ['jar', '#DFF0E0', '#6B8E5A', '애프터선 젤||After-sun gel', '바다 다녀온 날 밤에||For the night after the beach'],
      ['mist', '#CFE3F0', undefined, '미스트||Face mist', '소금기 씻어낸 뒤||After rinsing off the salt'],
      ['compact', '#F2C7B0', undefined, '틴티드 선쿠션||Tinted sun cushion', '저녁 식사 전 가볍게||A light touch before dinner']
    ]),
    day: [
      stop('08:00', 'Bondi Beach', 'Eastern Suburbs', '아침 바다와 브런치||Morning swim and brunch', '수영복 위에 셔츠 하나||A shirt over your swimwear', 'Bondi Beach', 'sun', '#FFD23F'),
      stop('10:00', 'Bondi to Bronte Walk', 'Coast', '절벽 따라 걷는 해안 산책로||The clifftop coastal path', '모자·선크림·물||Hat, sunscreen, water', 'Bondi to Bronte Coastal Walk', 'pin', '#FFFFFF'),
      stop('13:30', 'Paddington · Surry Hills', 'Inner East', '테라스 하우스 골목의 부티크와 카페||Boutiques and cafés among terrace houses', '샌들 대신 스니커즈로 갈아 신기||Swap sandals for sneakers', 'Paddington Sydney shops', 'tote', '#F3EAD8'),
      stop('17:00', 'Mrs Macquarie\'s Chair', 'Royal Botanic Garden', '오페라하우스와 다리 뒤로 지는 노을||Sunset behind the Opera House and the bridge', '바닷바람 막을 겉옷||A layer for the harbour wind', 'Mrs Macquaries Chair', 'camera', '#FFD23F', 'golden'),
      stop('19:30', 'The Rocks · Circular Quay', 'Harbour', '항구 옆 펍과 레스토랑||Pubs and restaurants by the harbour', '저녁엔 조금 단정하게||Dress up a notch for dinner', 'The Rocks Sydney', 'moon', '#F2A7B8', 'after')
    ],
    dayAlt: '페리 코스도 좋아요: Circular Quay에서 Manly행 페리 → 해변 산책||Or take a ferry: Circular Quay to Manly, then a walk on the beach',
    eat: [
      spot('Sydney Fish Market', '점심 전에 가야 덜 붐벼요||Go before lunch to beat the crowd', '해산물 시장||Seafood market', 'Sydney Fish Market', '#FFD23F'),
      spot('Surry Hills 카페||Surry Hills cafés', '카페는 오후 일찍 닫아요||Cafés close early in the afternoon', '브런치 · 플랫 화이트||Brunch and flat whites', 'Surry Hills cafes', '#F2A7B8'),
      spot('Chinatown · Haymarket', '금요일 밤엔 야시장이 열릴 때가 있어요||A night market often runs on Fridays', '아시아 음식 골목||Asian food streets', 'Chinatown Sydney', '#CFE3F0')
    ],
    go: [
      spot('Sydney Opera House', '안에 안 들어가도 주변 산책이 좋아요||The walk around it is worth it even without a ticket', '항구의 상징||The harbour icon', 'Sydney Opera House', '#BFC9D3'),
      spot('Manly Ferry', '뱃머리 바깥 자리에 앉기||Sit outside at the front', '항구를 가로지르는 30분||Thirty minutes across the harbour', 'Manly Ferry Circular Quay', '#E3DED6'),
      spot('Royal Botanic Garden', '오페라하우스 옆 큰 정원||The big garden beside the Opera House', '무료 정원 산책||A free garden walk', 'Royal Botanic Garden Sydney', '#A9C6DE')
    ],
    goTip: '해안 산책로엔 그늘이 거의 없어요. 오전에 걷고, 물과 모자를 꼭 챙기세요.||The coastal walk has almost no shade. Go in the morning with water and a hat.',
    arrive: {
      asOf: '시드니 도착 팁||Arriving in Sydney',
      note: '공항이 시내와 가까워요. 기차가 제일 빠르고, 일행이 여럿이면 차를 부르는 게 더 쌀 수 있어요.||The airport is close to the city. The train is fastest, and for a group a car can work out cheaper.',
      opts: [
        opt('train', '#D9A300', '가장 빨라요||Fastest', 'AIRPORT LINK', '공항 기차||Airport train', '기차 요금 + 공항역 이용료||Train fare plus a station access fee', 'Central까지 약 15분||About 15 min to Central', '카드나 폰을 개찰구에 찍고 타요. Central·Circular Quay 방면으로 가요.||Tap a card or phone at the gate. Trains run toward Central and Circular Quay.', '시내 중심·역 근처 숙소||Staying in the centre near a station'),
        opt('ride', '#7A3FB0', '앱 호출||By app', 'RIDE APP', '우버 · 디디||Uber · DiDi', '시간대에 따라 달라요||Varies by time of day', '약 20~40분||About 20–40 min', '터미널의 지정 픽업 구역에서 타요.||Meet your car at the terminal\'s rideshare pickup.', '본다이·해변 쪽 숙소||Staying out by Bondi or the beaches'),
        opt('taxi', '#1F6FD6', '미터 요금||By meter', 'TAXI', '택시||Taxi', '미터 + 공항 수수료·통행료||Meter plus airport fee and tolls', '약 20~40분||About 20–40 min', '터미널 앞 공식 승강장에서 타요.||Use the official rank outside the terminal.', '일행이 여럿이거나 짐이 많을 때||Groups or lots of luggage')
      ],
      picks: [{ label: '시내 (CBD)||The city (CBD)', id: 'train' }, { label: '본다이||Bondi', id: 'ride' }, { label: '일행이 여럿||Travelling as a group', id: 'taxi' }],
      foot: FOOT
    },
    events: [
      { name: 'Sydney.com', what: '시드니 관광 공식 사이트||Official Sydney tourism site', url: 'https://www.sydney.com' },
      { name: 'Time Out Sydney', what: '시드니에서 할 것 (영문)||Things to do in Sydney', url: 'https://www.timeout.com/sydney' }
    ],
    hoodSvg: '<path d="M300 0 C 284 60 310 130 296 240 H360 V0 Z" fill="#BFD9E6" stroke="#141210" stroke-width="2"/><text x="330" y="150" font-family="Permanent Marker, cursive" font-size="12" fill="#5D8BA6" transform="rotate(-86 330 150)">Pacific</text><path d="M60 0 C 90 40 150 30 180 56 C 210 30 250 36 262 0 Z" fill="#BFD9E6" stroke="#141210" stroke-width="2"/><text x="130" y="22" font-family="Permanent Marker, cursive" font-size="11" fill="#5D8BA6">Harbour</text><text x="8" y="232" font-family="Anton, sans-serif" font-size="9" letter-spacing="1" fill="#6B6259">NOT TO SCALE</text>',
    hoods: [
      hood('서리 힐스||Surry Hills', 'SURRY HILLS', 'CAFÉ COOL', '카페와 편집숍, 작은 갤러리||Cafés, boutiques and small galleries', ['린넨 셔츠||Linen shirt', '와이드 팬츠||Wide trousers', '스니커즈||Sneakers'], ['Crown Street', 'Bourke Street'], ['#6B8E5A', '#F3EAD8', '#141210'], 'Surry Hills Sydney', 150, 150),
      hood('패딩턴||Paddington', 'PADDINGTON', 'POLISHED CASUAL', '테라스 하우스와 디자이너 부티크||Terrace houses and designer boutiques', ['셔츠 원피스||Shirt dress', '플랫 샌들||Flat sandals', '바스켓 백||Basket bag'], ['Oxford Street', 'Paddington Markets'], ['#FFFFFF', '#141210', '#CFE3F0'], 'Paddington Sydney', 214, 136),
      hood('뉴타운||Newtown', 'NEWTOWN', 'THRIFT & PRINT', '빈티지 숍과 벽화 거리||Vintage shops and street murals', ['프린트 셔츠||Printed shirt', '데님 쇼츠||Denim shorts', '부츠||Boots'], ['King Street', 'Camperdown Memorial Rest Park'], ['#F2457C', '#FFD23F', '#141210'], 'Newtown Sydney', 60, 180),
      hood('본다이||Bondi', 'BONDI', 'BEACH TO BRUNCH', '바다에서 바로 브런치로||Straight from the water to brunch', ['수영복 + 오버셔츠||Swimwear plus an overshirt', '쇼츠||Shorts', '슬라이드||Slides'], ['Bondi Icebergs', 'Hall Street'], ['#2D5BFF', '#FFFFFF', '#FFD23F'], 'Bondi Beach', 268, 160)
    ],
    read: [
      { k: 'CITY GUIDE', items: [
        { mag: 'Time Out Sydney', title: 'Things to do in Sydney', ko: '시드니에서 할 것 (영문)||What to do in Sydney', url: 'https://www.timeout.com/sydney' },
        { mag: 'Sydney.com', title: 'Official city guide', ko: '시드니 관광 공식 가이드||The official Sydney visitor guide', url: 'https://www.sydney.com' }
      ] }
    ],
    watch: [
      { label: '시드니 브이로그||Sydney vlog', sub: '하루 코스 엿보기||A day in the city', q: 'Sydney travel vlog' },
      { label: '본다이 해안 산책||Bondi coastal walk', sub: '절벽 따라 걷기||Along the cliffs', q: 'Bondi to Coogee coastal walk' },
      { label: '시드니 카페||Sydney cafés', sub: '브런치 · 커피||Brunch and coffee', q: 'Sydney best cafes brunch' },
      { label: '호주 여름 코디||Australian summer outfits', sub: '비치 룩 아이디어||Beach outfit ideas', q: 'Australian summer outfits lookbook' }
    ],
    know: ['팁은 필수가 아니에요. 가격에 세금이 포함돼 있어요.||Tipping is not required, and prices include tax.', '한 매장에서 일정 금액 이상 사면 출국할 때 공항에서 세금 환급(TRS)을 신청할 수 있어요.||Spend above a minimum in one shop and you can claim a tax refund (TRS) at the airport when you leave.', '카드·폰 결제가 거의 어디서나 돼요. 현금은 조금만 있어도 충분해요.||Card and phone payments work almost everywhere. You need very little cash.'],
    essentials: ['여권||Passport', '호주 전자여행허가(ETA) 승인 확인||Australian ETA approved'].concat(TRAVEL_ESS, ['I타입 플러그 어댑터||Type I plug adapter', '수영복||Swimwear', '모자||Hat'])
  });

  // Seoul is no longer the newest edition.
  delete C.sel.isNew;

  // Split 'ko||en' everywhere in the new cities: Korean stays, English is registered for the EN switch.
  const EN = (window.EN = window.EN || {});
  const walk = (o) => {
    Object.keys(o).forEach((k) => {
      const v = o[k];
      if (typeof v === 'string') {
        const i = v.indexOf('||');
        if (i > 0) { const ko = v.slice(0, i); EN[ko] = v.slice(i + 2); o[k] = ko; }
      } else if (v && typeof v === 'object') walk(v);
    });
  };
  ['ny', 'lis', 'par', 'bkk', 'tyo', 'syd'].forEach((id) => walk(C[id]));
})();
