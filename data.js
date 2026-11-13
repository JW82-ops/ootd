// City content. Only Los Angeles is fully written; the others show on the map as "SOON".
window.CITIES = {
  la: {
    id: 'la',
    open: true,
    name: '로스앤젤레스',
    en: 'LOS ANGELES',
    country: 'USA · CALIFORNIA',
    mapX: 50, mapY: 114,
    lat: 34.05, lon: -118.24,
    tz: 'America/Los_Angeles',
    currency: 'USD',
    tagline: '해 질 녘이 제일 예쁜 도시',
    coverLines: ['FASHION', 'BEAUTY', 'FOOD', 'DAY COURSE'],
    // Downtown LA climate normals (°C, daily high / low by month) — fallback when no live forecast.
    normals: [[20, 9], [20, 10], [21, 11], [23, 13], [24, 14], [26, 16], [29, 18], [29, 19], [28, 18], [26, 15], [23, 12], [20, 9]],
    intro: '바다와 사막 사이, 차로 움직이는 거대한 도시. 옷차림은 자유롭고, 하루 안에 날씨가 두 번 바뀌어요.',
    notes: [
      { k: 'POWER', v: '120V', d: 'A타입 플러그 — 어댑터 챙기기' },
      { k: 'MOVE', v: 'By Car', d: '렌터카·라이드셰어 위주, 구간마다 30분~1시간' },
      { k: 'DRESS CODE', v: 'Casual', d: '대부분 캐주얼 OK, 저녁엔 한 겹 더' },
      { k: 'TAX', v: '+ 약 10%', d: '가격표엔 판매세가 빠져 있어요' },
      { k: 'LANGUAGE', v: 'English', d: '스페인어도 자주 들려요' }
    ],
    countryTip: '팁은 선택이 아니라 예의! 식당 계산서의 팁 칸 꼭 확인하기',
    looks: {
      hot: {
        name: 'BEACH HEAT', ko: '한낮 해변 룩', tip: '그늘이 적어요 — 모자와 선글라스는 필수',
        her: [
          { slot: 'acc', icon: 'hat', c: '#E9D8B4', a: '#141210', name: '버킷햇', note: '라피아·코튼 소재' },
          { slot: 'top', icon: 'tank', c: '#FFFFFF', name: '린넨 슬리브리스', note: '땀이 덜 붙는 소재' },
          { slot: 'bottom', icon: 'pants', c: '#E8D9C0', name: '린넨 와이드 팬츠', note: '바람 잘 통하는 핏' },
          { slot: 'belt', icon: 'sunglasses', c: '#5B3A26', name: '캣아이 선글라스', note: '자외선 차단 렌즈' },
          { slot: 'bag', icon: 'tote', c: '#D9B98A', a: '#8A5A3B', name: '라탄 토트', note: '해변까지 OK' },
          { slot: 'shoes', icon: 'sandals', c: '#C9A27A', name: '플랫 샌들', note: '모래 털기 쉬운 것' }
        ],
        him: [
          { slot: 'acc', icon: 'cap', c: '#2E4F86', name: '볼캡', note: '로고 없는 것도 멋져요' },
          { slot: 'top', icon: 'shirt', c: '#A9D2E8', name: '오픈칼라 반팔 셔츠', note: '단독으로 입기' },
          { slot: 'bottom', icon: 'shorts', c: '#E8D9C0', name: '린넨 쇼츠', note: '무릎 위 길이' },
          { slot: 'belt', icon: 'sunglasses', c: '#141210', name: '선글라스', note: '자외선 차단 렌즈' },
          { slot: 'bag', icon: 'crossbody', c: '#141210', a: '#F3EAD8', name: '나일론 크로스백', note: '가볍게' },
          { slot: 'shoes', icon: 'sneakers', c: '#FFFFFF', a: '#E3DED6', name: '캔버스 스니커즈', note: '오래 걸어도 편하게' }
        ]
      },
      mild: {
        name: 'SUNSET CASUAL', ko: '선셋 캐주얼', tip: '해 지면 기온이 뚝 — 가디건이나 재킷 하나 꼭',
        her: [
          { slot: 'outer', icon: 'cardigan', c: '#E3D3B8', a: '#B89A72', name: '니트 가디건', note: '해 진 뒤용' },
          { slot: 'top', icon: 'shirt', c: '#FFFFFF', name: '리넨 셔츠', note: '오버핏 화이트' },
          { slot: 'belt', icon: 'belt', c: '#8A5A3B', name: '가죽 벨트', note: '브라운' },
          { slot: 'bottom', icon: 'jeans', c: '#9DBBD8', name: '와이드 데님', note: '라이트 워싱' },
          { slot: 'acc', icon: 'sunglasses', c: '#5B3A26', name: '캣아이 선글라스', note: '톨토이즈' },
          { slot: 'bag', icon: 'tote', c: '#F3EAD8', a: '#141210', name: '캔버스 토트', note: '크림' },
          { slot: 'shoes', icon: 'sandals', c: '#C9A27A', name: '플랫 샌들', note: '탄 스트랩' }
        ],
        him: [
          { slot: 'outer', icon: 'jacket', c: '#6E8FB8', a: '#5A7AA3', name: '데님 셔츠재킷', note: '해 진 뒤용' },
          { slot: 'top', icon: 'tee', c: '#FFFFFF', name: '화이트 티', note: '두툼한 코튼' },
          { slot: 'belt', icon: 'belt', c: '#D9C3A0', a: '#8A8077', name: '캔버스 벨트', note: '베이지' },
          { slot: 'bottom', icon: 'jeans', c: '#9DBBD8', name: '배기 데님', note: '라이트 워싱' },
          { slot: 'acc', icon: 'cap', c: '#2E4F86', name: '볼캡', note: '네이비' },
          { slot: 'bag', icon: 'crossbody', c: '#141210', a: '#F3EAD8', name: '나일론 크로스백', note: '블랙' },
          { slot: 'shoes', icon: 'sneakers', c: '#FFFFFF', a: '#E3DED6', name: '캔버스 스니커즈', note: '화이트' }
        ]
      },
      cool: {
        name: 'LAYER UP', ko: '겹쳐 입는 룩', tip: '아침저녁 쌀쌀 — 벗고 입기 쉬운 레이어드로',
        her: [
          { slot: 'outer', icon: 'coat', c: '#D9B98A', a: '#C4A070', name: '트렌치코트', note: '가벼운 면 소재' },
          { slot: 'top', icon: 'knit', c: '#F3EAD8', a: '#B89A72', name: '라운드 니트', note: '얇은 울' },
          { slot: 'bottom', icon: 'jeans', c: '#3B5B92', a: '#9DB4D6', name: '스트레이트 데님', note: '진청' },
          { slot: 'acc', icon: 'sunglasses', c: '#141210', name: '선글라스', note: '겨울에도 햇살 강해요' },
          { slot: 'bag', icon: 'tote', c: '#8A5A3B', a: '#141210', name: '가죽 숄더백', note: '브라운' },
          { slot: 'shoes', icon: 'boots', c: '#5B3A26', name: '앵클부츠', note: '굽 낮은 것' }
        ],
        him: [
          { slot: 'outer', icon: 'jacket', c: '#A9825A', a: '#8A6440', name: '스웨이드 재킷', note: '브라운' },
          { slot: 'top', icon: 'knit', c: '#2E4F86', a: '#9DB4D6', name: '크루넥 니트', note: '네이비' },
          { slot: 'bottom', icon: 'pants', c: '#D9C3A0', a: '#8A8077', name: '치노 팬츠', note: '베이지' },
          { slot: 'acc', icon: 'cap', c: '#141210', a: '#3A3530', name: '볼캡', note: '블랙' },
          { slot: 'bag', icon: 'tote', c: '#F3EAD8', a: '#141210', name: '캔버스 토트', note: '크림' },
          { slot: 'shoes', icon: 'loafers', c: '#A9825A', name: '스웨이드 로퍼', note: '탄' }
        ]
      }
    },
    beauty: [
      { icon: 'tube', c: '#F7F4EE', a: '#FFD23F', name: 'SPF 50+ 선크림', why: '낮엔 2~3시간마다 덧바르기', pos: [48, 4, 16, 38] },
      { icon: 'mist', c: '#CFE3F0', name: '수분 미스트', why: '건조한 공기에 수시로', pos: [65, 6, 18, 34] },
      { icon: 'balm', c: '#F2A7B8', a: '#E0245E', name: 'SPF 립밤', why: '입술도 햇빛에 타요', pos: [84, 10, 13, 28] },
      { icon: 'compact', c: '#F28C6B', name: '코럴 크림 블러셔', why: '골든아워 사진에 생기', pos: [44, 47, 32, 30] },
      { icon: 'jar', c: '#EFE6D8', a: '#C2185B', name: '리치 수분 크림', why: '일교차 큰 밤 보습', pos: [72, 66, 26, 26] }
    ],
    day: [
      { time: '09:30', place: '레퍼블리크', area: '미드시티', what: '브런치 & 베이커리로 하루 시작', look: '셔츠에 가디건 걸치고 출발', q: 'Republique Los Angeles', icon: 'fork', c: '#FFD23F' },
      { time: '11:30', place: '게티 센터', area: '브렌트우드', what: '언덕 위 미술관과 정원 산책', look: '많이 걸어요 — 편한 신발', q: 'Getty Center Los Angeles', icon: 'house', c: '#FFFFFF' },
      { time: '15:00', place: '애벗 키니 & 베니스 비치', area: '베니스', what: '편집숍 구경 후 보드워크 산책', look: '가디건은 가방에, 선글라스 장착', q: 'Abbot Kinney Boulevard Venice', icon: 'tote', c: '#F3EAD8' },
      { time: '17:00', place: '선셋 해변', area: '베니스 · 산타모니카', what: '골든아워 사진 타임', look: '블러셔 한 번 더, 선크림 덧바르기', q: 'Venice Beach Los Angeles', icon: 'sun', c: '#FFD23F' },
      { time: '19:30', place: '인앤아웃 버거', area: '근처 지점', what: '캘리포니아 대표 버거로 마무리', look: '해 지면 쌀쌀 — 가디건 다시 입기', q: 'In-N-Out Burger Los Angeles', icon: 'moon', c: '#F2A7B8' }
    ],
    dayAlt: '다운타운 코스도 좋아요: 그랜드 센트럴 마켓 → 그리피스 천문대 야경',
    eat: [
      { name: '그랜드 센트럴 마켓', what: '다운타운 푸드홀', q: 'Grand Central Market Los Angeles', c: '#FFD23F' },
      { name: '인앤아웃 버거', what: '캘리포니아 대표 버거', q: 'In-N-Out Burger Los Angeles', c: '#F2A7B8' },
      { name: '레퍼블리크', what: '브런치 & 베이커리', q: 'Republique Los Angeles', c: '#CFE3F0' }
    ],
    go: [
      { name: '그리피스 천문대', what: '선셋 & 도시 야경', q: 'Griffith Observatory', c: '#BFC9D3' },
      { name: '게티 센터', what: '미술관 & 정원', q: 'Getty Center Los Angeles', c: '#E3DED6' },
      { name: '베니스 비치', what: '보드워크 산책', q: 'Venice Beach Los Angeles', c: '#A9C6DE' }
    ],
    goTip: '천문대는 해 지기 1시간 전 도착 — 운영 시간은 가기 전에 공식 사이트에서 확인!',
    read: [
      { k: 'FASHION', items: [
        { mag: 'W Magazine', title: 'The Insider’s Guide to Los Angeles', ko: '현지 테이스트메이커 3인이 꼽은 LA', url: 'https://www.wmagazine.com/culture/los-angeles-city-guide-hotels-restaurants-bars-shopping' },
        { mag: 'Marie Claire UK', title: 'The stylish insider’s guide to LA', ko: '스타일리시한 식당·숍 위주 가이드', url: 'https://www.marieclaire.co.uk/life/travel/la-city-guide-654188' },
        { mag: 'Fashion Journal', title: 'LA, according to a fashion editor', ko: '패션 에디터의 숙소·쇼핑·빈티지숍', url: 'https://fashionjournal.com.au/life/la-city-guide/' }
      ] },
      { k: 'TRAVEL', items: [
        { mag: 'Time Out', title: 'Your essential Los Angeles travel guide', ko: '숙소·이동 시간까지 담은 기본 가이드', url: 'https://www.timeout.com/los-angeles/things-to-do/your-essential-los-angeles-travel-guide' },
        { mag: 'Monocle', title: 'Los Angeles travel guide', ko: '처음 가는 사람을 위한 큐레이션', url: 'https://monocle.com/travel-guides/los-angeles/' },
        { mag: 'AFAR', title: 'Los Angeles travel guide', ko: '동네별 여행 기사 모음', url: 'https://www.afar.com/travel-guides/united-states/california/los-angeles/guide' },
        { mag: 'Discover Los Angeles', title: 'The official guide to Los Angeles', ko: 'LA 관광청 공식 사이트 · 이번 주 행사', url: 'https://www.discoverlosangeles.com' }
      ] }
    ],
    watch: [
      { label: 'LA 여행 브이로그', sub: '한국 여행자 시선', q: 'LA 여행 브이로그' },
      { label: 'LA 여행 코스', sub: '처음 가는 LA 루트', q: 'LA 여행 코스 추천' },
      { label: 'LA Street Style', sub: '현지 스트리트 패션', q: 'Los Angeles street style' },
      { label: 'LA 맛집', sub: '먹방 & 로컬 맛집', q: 'LA 맛집 추천' },
      { label: 'LA Travel Guide', sub: '영어 가이드 영상', q: 'Los Angeles travel guide' },
      { label: 'Discover LA', sub: '관광청 영상', q: 'Discover Los Angeles' }
    ],
    tipNote: '카운터에서 주문하는 곳(인앤아웃 등)은 팁이 꼭 필요하진 않아요.',
    essentials: ['여권 (유효기간 6개월 이상)', 'ESTA 승인 확인', '항공권·숙소 예약 확인', '해외 결제 카드', '국제운전면허증 (렌터카 시)', 'A타입 플러그 어댑터', '보조배터리']
  },
  ny: { id: 'ny', name: '뉴욕', en: 'NEW YORK', mapX: 183, mapY: 94 },
  lis: { id: 'lis', name: '리스본', en: 'LISBON', mapX: 378, mapY: 100 },
  par: { id: 'par', name: '파리', en: 'PARIS', mapX: 412, mapY: 69 },
  bkk: { id: 'bkk', name: '방콕', en: 'BANGKOK', mapX: 706, mapY: 175 },
  sel: { id: 'sel', name: '서울', en: 'SEOUL', mapX: 786, mapY: 103 },
  tyo: { id: 'tyo', name: '도쿄', en: 'TOKYO', mapX: 824, mapY: 109 },
  syd: { id: 'syd', name: '시드니', en: 'SYDNEY', mapX: 859, mapY: 318 }
};

// Typical size equivalents (brands vary).
window.SIZES = {
  women: {
    clothes: [['44 (85)', 'XS', '0–2'], ['55 (90)', 'S', '4'], ['66 (95)', 'M', '6–8'], ['77 (100)', 'L', '10–12'], ['88 (105)', 'XL', '14']],
    shoes: [['220', '5'], ['225', '5.5'], ['230', '6'], ['235', '6.5'], ['240', '7'], ['245', '7.5'], ['250', '8'], ['255', '8.5'], ['260', '9'], ['265', '9.5'], ['270', '10']]
  },
  men: {
    clothes: [['90', 'S', '—'], ['95', 'M', '—'], ['100', 'L', '—'], ['105', 'XL', '—'], ['110', 'XXL', '—']],
    shoes: [['250', '7'], ['255', '7.5'], ['260', '8'], ['265', '8.5'], ['270', '9'], ['275', '9.5'], ['280', '10'], ['285', '10.5'], ['290', '11']]
  }
};
