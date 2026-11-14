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
    cover: 'img/la/cover.webp',
    checked: '2026년 11월', nick: 'LA', short: 'L.A.', word: ['LOS', 'ANGE', 'LES'], glow: ['GLOW', 'IN', 'L.A.'], coverHead: ['GOLDEN HOUR', 'IN LOS ANGELES.'],
    bandLabel: 'USA', money: 'usd', tools: 'us', boardArt: 'house',
    beautySub: 'LA 파우치에 꼭 넣을 것', beautyNote: 'LA는 겨울에도 햇살이 강하고 공기가 건조해요', beautyScribble: ['햇빛 강하고', '공기는 건조!'],
    arriveTitle: 'ARRIVAL', arriveSub: 'LAX에서 시내로 · 그날의 행사', arriveHead: 'LAX → CITY', arrivePick: '내 숙소는…', eventsQuery: 'Los Angeles events',
    zineTitle: 'MY L.A.\nDIARY', zineStamp: 'L.A.\n2026', zineBurst: 'GOLDEN\nHOUR', zineSticker: 'palm', zineText: '오늘의 LA',
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
          { slot: 'outer', img: 'img/la/her-cardigan.webp', icon: 'cardigan', c: '#E3D3B8', a: '#B89A72', name: '니트 가디건', note: '해 진 뒤용' },
          { slot: 'top', img: 'img/la/her-shirt.webp', icon: 'shirt', c: '#FFFFFF', name: '리넨 셔츠', note: '오버핏 화이트' },
          { slot: 'belt', img: 'img/la/her-belt.webp', icon: 'belt', c: '#8A5A3B', name: '가죽 벨트', note: '브라운' },
          { slot: 'bottom', img: 'img/la/her-jeans.webp', icon: 'jeans', c: '#9DBBD8', name: '와이드 데님', note: '라이트 워싱' },
          { slot: 'acc', img: 'img/la/her-sunglasses.webp', icon: 'sunglasses', c: '#5B3A26', name: '캣아이 선글라스', note: '톨토이즈' },
          { slot: 'bag', img: 'img/la/her-tote.webp', icon: 'tote', c: '#F3EAD8', a: '#141210', name: '캔버스 토트', note: '크림' },
          { slot: 'shoes', img: 'img/la/her-sandals.webp', icon: 'sandals', c: '#C9A27A', name: '플랫 샌들', note: '탄 스트랩' }
        ],
        him: [
          { slot: 'outer', img: 'img/la/him-jacket.webp', icon: 'jacket', c: '#6E8FB8', a: '#5A7AA3', name: '데님 셔츠재킷', note: '해 진 뒤용' },
          { slot: 'top', img: 'img/la/him-tee.webp', icon: 'tee', c: '#FFFFFF', name: '화이트 티', note: '두툼한 코튼' },
          { slot: 'belt', img: 'img/la/him-belt.webp', icon: 'belt', c: '#D9C3A0', a: '#8A8077', name: '캔버스 벨트', note: '베이지' },
          { slot: 'bottom', img: 'img/la/him-jeans.webp', icon: 'jeans', c: '#9DBBD8', name: '배기 데님', note: '라이트 워싱' },
          { slot: 'acc', img: 'img/la/him-cap.webp', icon: 'cap', c: '#2E4F86', name: '볼캡', note: '네이비' },
          { slot: 'bag', img: 'img/la/him-crossbody.webp', icon: 'crossbody', c: '#141210', a: '#F3EAD8', name: '나일론 크로스백', note: '블랙' },
          { slot: 'shoes', img: 'img/la/him-sneakers.webp', icon: 'sneakers', c: '#FFFFFF', a: '#E3DED6', name: '캔버스 스니커즈', note: '화이트' }
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
      { img: 'img/la/sunscreen.webp', icon: 'tube', c: '#F7F4EE', a: '#FFD23F', name: 'SPF 50+ 선크림', why: '낮엔 2~3시간마다 덧바르기', pos: [48, 4, 16, 38] },
      { img: 'img/la/mist.webp', icon: 'mist', c: '#CFE3F0', name: '수분 미스트', why: '건조한 공기에 수시로', pos: [65, 6, 18, 34] },
      { img: 'img/la/balm.webp', icon: 'balm', c: '#F2A7B8', a: '#E0245E', name: 'SPF 립밤', why: '입술도 햇빛에 타요', pos: [84, 10, 13, 28] },
      { img: 'img/la/blush.webp', icon: 'compact', c: '#F28C6B', name: '코럴 크림 블러셔', why: '골든아워 사진에 생기', pos: [44, 47, 32, 30] },
      { img: 'img/la/jar.webp', icon: 'jar', c: '#EFE6D8', a: '#C2185B', name: '리치 수분 크림', why: '일교차 큰 밤 보습', pos: [72, 66, 26, 26] }
    ],
    day: [
      { time: '09:30', place: '레퍼블리크', area: '미드시티', what: '브런치 & 베이커리로 하루 시작', look: '셔츠에 가디건 걸치고 출발', q: 'Republique Los Angeles', icon: 'fork', c: '#FFD23F' },
      { time: '11:30', place: '게티 센터', area: '브렌트우드', what: '언덕 위 미술관과 정원 산책', look: '많이 걸어요 — 편한 신발', q: 'Getty Center Los Angeles', icon: 'house', c: '#FFFFFF' },
      { time: '15:00', place: '애벗 키니 & 베니스 비치', area: '베니스', what: '편집숍 구경 후 보드워크 산책', look: '가디건은 가방에, 선글라스 장착', q: 'Abbot Kinney Boulevard Venice', icon: 'tote', c: '#F3EAD8' },
      { time: '17:00', at: 'golden', place: '선셋 해변', area: '베니스 · 산타모니카', what: '골든아워 사진 타임', look: '블러셔 한 번 더, 선크림 덧바르기', q: 'Venice Beach Los Angeles', icon: 'sun', c: '#FFD23F' },
      { time: '19:30', at: 'after', place: '인앤아웃 버거', area: '근처 지점', what: '캘리포니아 대표 버거로 마무리', look: '해 지면 쌀쌀 — 가디건 다시 입기', q: 'In-N-Out Burger Los Angeles', icon: 'moon', c: '#F2A7B8' }
    ],
    dayAlt: '다운타운 코스도 좋아요: 그랜드 센트럴 마켓 → 그리피스 천문대 야경',
    eat: [
      { name: '그랜드 센트럴 마켓', tip: '100년 넘은 시장 — 여러 가게를 조금씩 맛보기', what: '다운타운 푸드홀', q: 'Grand Central Market Los Angeles', c: '#FFD23F' },
      { name: '인앤아웃 버거', tip: '줄이 길어도 금방 줄어요', what: '캘리포니아 대표 버거', q: 'In-N-Out Burger Los Angeles', c: '#F2A7B8' },
      { name: '레퍼블리크', tip: '오전에 가야 빵이 남아 있어요', what: '브런치 & 베이커리', q: 'Republique Los Angeles', c: '#CFE3F0' }
    ],
    go: [
      { name: '그리피스 천문대', tip: '해 지기 1시간 전에 도착하기', what: '선셋 & 도시 야경', q: 'Griffith Observatory', c: '#BFC9D3' },
      { name: '게티 센터', tip: '입장 예약 여부를 미리 확인하기', what: '미술관 & 정원', q: 'Getty Center Los Angeles', c: '#E3DED6' },
      { name: '베니스 비치', tip: '보드워크에서 운하까지 걸어 보기', what: '보드워크 산책', q: 'Venice Beach Los Angeles', c: '#A9C6DE' }
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
    arrive: {
      asOf: '2026년 11월 기준',
      note: 'LAX 무인 열차(피플무버)는 아직 개통 전이에요 — 2027년 1월 이후로 미뤄졌어요. 그 전까지는 아래처럼 색깔 표지판을 따라가면 돼요.',
      opts: [
        { id: 'flyaway', sign: '#1F6FD6', signName: '파란 기둥', en: 'FLYAWAY', name: '플라이어웨이 버스', cost: '$12.75', time: '35~55분', how: '도착층(1층) 파란 FlyAway 기둥에서 타면 다운타운 유니언 역까지 바로 가요.', best: '다운타운 숙소 · 짐이 많아도 편해요' },
        { id: 'metro', sign: '#E0247A', signName: '분홍 표지판', en: 'METRO', name: '메트로 (전철)', cost: '$1.75 · 하루 최대 $5', time: '60분 이상', how: '분홍 LAX Shuttle 표지판에서 무료 셔틀을 타고 LAX/Metro 환승센터로 가서 C·K 라인을 타요.', best: '짐이 적고 아끼고 싶을 때 · TAP 카드 필요' },
        { id: 'laxit', sign: '#2E9E4F', signName: '초록 표지판', en: 'LAX-it', name: '우버 · 리프트 · 택시', cost: '다운타운·할리우드 약 $42~55', time: '픽업장까지 +20~40분', how: '터미널 앞에선 못 타요. 초록 LAX-it 셔틀(또는 도보)로 1터미널 옆 픽업장에 가서 불러요.', best: '산타모니카·베니스·할리우드 숙소, 일행이 있을 때' },
        { id: 'rental', sign: '#7A3FB0', signName: '보라 표지판', en: 'RENTAL CAR', name: '렌터카', cost: '회사마다 달라요', time: '회사 셔틀로 이동', how: '보라색 Rental Car 표지판에서 렌터카 회사 셔틀을 타요.', best: 'LA는 차 이동이 기본 · 국제운전면허증 챙기기' }
      ],
      picks: [{ label: '다운타운 숙소', id: 'flyaway' }, { label: '산타모니카·베니스', id: 'laxit' }, { label: '할리우드', id: 'laxit' }, { label: '최대한 아끼기', id: 'metro' }, { label: '차 빌릴 거예요', id: 'rental' }]
    },
    events: [
      { name: 'Discover LA', what: 'LA 관광청 공식 행사 캘린더', url: 'https://www.discoverlosangeles.com/events' },
      { name: 'Time Out LA', what: '이번 주·이번 주말에 할 것', url: 'https://www.timeout.com/los-angeles/things-to-do' }
    ],
    tax: [{ name: 'LA시', rate: 10.25 }, { name: '산타모니카', rate: 11.25 }],
    taxNote: '세율은 동네마다 달라요 (2026년 10월 기준). 캘리포니아는 여행자 세금 환급이 없어요.',
    hoods: [
      { name: '산타모니카', en: 'SANTA MONICA', vibe: 'CLEAN BEACH', what: '바닷가 산책과 쇼핑을 한 번에', wear: ['스트라이프 티', '화이트 데님', '캔버스 스니커즈'], spots: ['산타모니카 피어', '서드 스트리트 프롬나드'], pal: ['#A9C6DE', '#FFFFFF', '#E8D9C0'], q: 'Third Street Promenade Santa Monica', x: 70, y: 152 },
      { name: '베니스', en: 'VENICE', vibe: 'SURF CASUAL', what: '보드워크, 운하, 편집숍 거리', wear: ['린넨 셔츠', '쇼츠', '버킷햇', '플랫 샌들'], spots: ['베니스 운하', '애벗 키니 블러바드'], pal: ['#F2DCC8', '#2E5C9E', '#FFD23F'], q: 'Venice Canals Los Angeles', x: 92, y: 188 },
      { name: '비벌리힐스', en: 'BEVERLY HILLS', vibe: 'DRESS UP', what: '명품 거리와 호텔 라운지', wear: ['셋업 또는 슬립 원피스', '로퍼', '미니백', '선글라스'], spots: ['로데오 드라이브'], pal: ['#141210', '#F3EAD8', '#D9B44A'], q: 'Rodeo Drive Beverly Hills', x: 160, y: 122 },
      { name: '웨스트할리우드 & 멜로즈', en: 'WEHO & MELROSE', vibe: 'STREET TREND', what: '스트리트 브랜드, 벽화, 선셋 스트립', wear: ['그래픽 티', '배기 데님', '볼캡', '하이탑 스니커즈'], spots: ['멜로즈 애비뉴', '선셋 스트립'], pal: ['#F2457C', '#141210', '#FFFFFF'], q: 'Melrose Avenue Los Angeles', x: 206, y: 104 },
      { name: '실버레이크 & 로스펠리즈', en: 'SILVER LAKE', vibe: 'VINTAGE', what: '빈티지숍과 카페가 모인 언덕 동네', wear: ['빈티지 셔츠', '코듀로이 팬츠', '니트 조끼', '캔버스 토트'], spots: ['선셋 정션', '실버레이크 저수지'], pal: ['#8A5A3B', '#E3D3B8', '#6B8E5A'], q: 'Sunset Junction Silver Lake', x: 282, y: 76 },
      { name: '다운타운 & 아트 디스트릭트', en: 'DTLA', vibe: 'CITY MINIMAL', what: '미술관, 푸드홀, 창고 갤러리', wear: ['블랙 셔츠', '와이드 슬랙스', '앵클부츠', '크로스백'], spots: ['더 브로드', '그랜드 센트럴 마켓', '아트 디스트릭트'], pal: ['#141210', '#9C958C', '#F3EAD8'], q: 'Arts District Los Angeles', x: 302, y: 146 }
    ],
    tipNote: '카운터에서 주문하는 곳(인앤아웃 등)은 팁이 꼭 필요하진 않아요.',
    essentials: ['여권 (유효기간 6개월 이상)', 'ESTA 승인 확인', '항공권·숙소 예약 확인', '해외 결제 카드', '국제운전면허증 (렌터카 시)', 'A타입 플러그 어댑터', '보조배터리']
  },
  ny: { id: 'ny', name: '뉴욕', en: 'NEW YORK', mapX: 183, mapY: 94 },
  lis: { id: 'lis', name: '리스본', en: 'LISBON', mapX: 378, mapY: 100 },
  par: { id: 'par', name: '파리', en: 'PARIS', mapX: 412, mapY: 69 },
  bkk: { id: 'bkk', name: '방콕', en: 'BANGKOK', mapX: 706, mapY: 175 },
  sel: {
    id: 'sel', open: true, isNew: true,
    name: '서울', en: 'SEOUL', country: 'KOREA · SEOUL',
    mapX: 786, mapY: 103, lat: 37.57, lon: 126.98, tz: 'Asia/Seoul', currency: 'KRW',
    tagline: '아는 도시를 여행자처럼',
    cover: 'img/sel/cover.webp',
    checked: '2026년 11월', nick: '서울', short: 'SEOUL', word: ['SEO', 'UL', 'CITY'], glow: ['K-', 'GLOW', 'KIT'], coverHead: ['SEOUL,', 'LIKE A TRAVELER.'],
    bandLabel: 'SEOUL', money: 'krw', tools: 'kr', boardArt: 'hanok',
    beautySub: '서울 하루 파우치', beautyNote: '실내는 건조하고 밖은 자외선 — 수정 화장템 위주로 가볍게', beautyScribble: ['실내는 건조', '밖은 자외선!'],
    arriveTitle: 'GETTING AROUND', arriveSub: '서울 안에서 움직이기 · 그날의 행사', arriveHead: 'MOVE IN SEOUL', arrivePick: '오늘 어디 가요?', eventsQuery: '서울 행사', eventsKo: true,
    labels: { arrive: 'GETTING AROUND' },
    zineTitle: 'MY SEOUL\nDIARY', zineStamp: 'SEOUL\n2026', zineBurst: 'HAN\nRIVER', zineSticker: 'star', zineText: '오늘의 서울',
    coverLines: ['FASHION', 'BEAUTY', 'FOOD', 'DAY COURSE'],
    // Seoul climate normals (°C, daily high / low by month) — fallback when no live forecast.
    normals: [[2, -6], [5, -4], [11, 2], [18, 8], [23, 13], [27, 18], [29, 22], [30, 22], [26, 17], [20, 10], [12, 3], [4, -3]],
    intro: '매일 지나치던 도시도 여행자의 속도로 걸으면 달라 보여요. 동네 하나를 정하고, 그 동네에 어울리게 입고 나가 봐요.',
    notes: [
      { k: 'MOVE', v: 'Subway', d: '지하철 + 걷기가 제일 빨라요' },
      { k: 'PAY', v: 'Cashless', d: '시장에선 현금·계좌이체도 챙기기' },
      { k: 'SEASON', v: '4 Seasons', d: '계절·일교차 차이가 커요' },
      { k: 'WEEKEND', v: 'Crowded', d: '성수·북촌은 평일 오전이 한적해요' },
      { k: 'DRESS CODE', v: 'Trendy', d: '동네마다 분위기가 달라요' }
    ],
    countryTip: '오늘은 한 동네만 깊게! 욕심내서 세 군데 돌면 지하철만 타다 끝나요',
    looks: {
      hot: {
        name: 'CITY SUMMER', ko: '한여름 시티 룩', tip: '실내 냉방이 세요 — 얇은 셔츠 하나 챙기기',
        her: [
          { slot: 'acc', icon: 'cap', c: '#F3EAD8', a: '#E3D3B8', name: '볼캡', note: '햇빛 가리기' },
          { slot: 'top', icon: 'tank', c: '#141210', name: '슬리브리스 니트', note: '블랙' },
          { slot: 'bottom', icon: 'pants', c: '#E8D9C0', name: '린넨 와이드 슬랙스', note: '통풍 좋은 소재' },
          { slot: 'belt', icon: 'sunglasses', c: '#141210', name: '선글라스', note: '슬림한 프레임' },
          { slot: 'bag', icon: 'crossbody', c: '#F2A7B8', a: '#141210', name: '미니 크로스백', note: '양손 자유롭게' },
          { slot: 'shoes', icon: 'sandals', c: '#141210', name: '스트랩 샌들', note: '많이 걸어도 편한 것' }
        ],
        him: [
          { slot: 'acc', icon: 'cap', c: '#141210', a: '#3A3530', name: '볼캡', note: '블랙' },
          { slot: 'top', icon: 'tee', c: '#FFFFFF', name: '오버핏 반팔 티', note: '두툼한 코튼' },
          { slot: 'bottom', icon: 'shorts', c: '#9C958C', name: '버뮤다 쇼츠', note: '무릎 길이' },
          { slot: 'belt', icon: 'sunglasses', c: '#141210', name: '선글라스', note: '자외선 차단' },
          { slot: 'bag', icon: 'crossbody', c: '#141210', a: '#F3EAD8', name: '나일론 크로스백', note: '가볍게' },
          { slot: 'shoes', icon: 'sneakers', c: '#FFFFFF', a: '#E3DED6', name: '러닝 스니커즈', note: '통풍 좋은 것' }
        ]
      },
      mild: {
        name: 'CITY WALK', ko: '걷기 좋은 날 룩', tip: '일교차가 커요 — 얇은 겉옷 하나',
        her: [
          { slot: 'outer', icon: 'cardigan', c: '#F2A7B8', a: '#C2185B', name: '크롭 가디건', note: '포인트 컬러' },
          { slot: 'top', icon: 'tee', c: '#FFFFFF', name: '화이트 티', note: '기본 핏' },
          { slot: 'belt', icon: 'belt', c: '#141210', name: '가죽 벨트', note: '블랙' },
          { slot: 'bottom', icon: 'jeans', c: '#6E8FB8', name: '스트레이트 데님', note: '중청' },
          { slot: 'acc', icon: 'cap', c: '#2E4F86', name: '볼캡', note: '네이비' },
          { slot: 'bag', icon: 'tote', c: '#F3EAD8', a: '#141210', name: '에코백', note: '팝업 굿즈 담기' },
          { slot: 'shoes', icon: 'sneakers', c: '#FFFFFF', a: '#E3DED6', name: '스니커즈', note: '만 보 걸어도 OK' }
        ],
        him: [
          { slot: 'outer', icon: 'jacket', c: '#6B8E5A', a: '#587A48', name: '워크 재킷', note: '카키' },
          { slot: 'top', icon: 'tee', c: '#FFFFFF', name: '화이트 티', note: '기본 핏' },
          { slot: 'belt', icon: 'belt', c: '#141210', name: '가죽 벨트', note: '블랙' },
          { slot: 'bottom', icon: 'pants', c: '#D9C3A0', a: '#8A8077', name: '치노 팬츠', note: '베이지' },
          { slot: 'acc', icon: 'cap', c: '#141210', a: '#3A3530', name: '볼캡', note: '블랙' },
          { slot: 'bag', icon: 'crossbody', c: '#141210', a: '#F3EAD8', name: '크로스백', note: '블랙' },
          { slot: 'shoes', icon: 'sneakers', c: '#FFFFFF', a: '#E3DED6', name: '스니커즈', note: '화이트' }
        ]
      },
      cool: {
        name: 'TRENCH SEASON', ko: '트렌치 계절 룩', tip: '바람이 차요 — 니트와 겉옷을 겹쳐 입기',
        her: [
          { slot: 'outer', icon: 'coat', c: '#D9B98A', a: '#C4A070', name: '트렌치코트', note: '베이지' },
          { slot: 'top', icon: 'knit', c: '#F3EAD8', a: '#B89A72', name: '케이블 니트', note: '아이보리' },
          { slot: 'bottom', icon: 'jeans', c: '#3B5B92', a: '#9DB4D6', name: '스트레이트 데님', note: '진청' },
          { slot: 'acc', icon: 'cap', c: '#8A5A3B', name: '볼캡', note: '브라운' },
          { slot: 'bag', icon: 'tote', c: '#141210', a: '#141210', name: '가죽 숄더백', note: '블랙' },
          { slot: 'shoes', icon: 'loafers', c: '#141210', a: '#D9B44A', name: '로퍼', note: '블랙' }
        ],
        him: [
          { slot: 'outer', icon: 'jacket', c: '#2E4F86', a: '#243F6B', name: '블루종', note: '네이비' },
          { slot: 'top', icon: 'knit', c: '#9C958C', a: '#6B645C', name: '크루넥 니트', note: '그레이' },
          { slot: 'bottom', icon: 'pants', c: '#141210', a: '#3A3530', name: '와이드 슬랙스', note: '블랙' },
          { slot: 'acc', icon: 'cap', c: '#141210', a: '#3A3530', name: '볼캡', note: '블랙' },
          { slot: 'bag', icon: 'tote', c: '#F3EAD8', a: '#141210', name: '캔버스 토트', note: '크림' },
          { slot: 'shoes', icon: 'loafers', c: '#5B3A26', a: '#D9B44A', name: '로퍼', note: '브라운' }
        ]
      },
      cold: {
        name: 'PADDING WEATHER', ko: '한겨울 패딩 룩', tip: '칼바람 주의 — 목도리·장갑·핫팩까지',
        her: [
          { slot: 'outer', icon: 'coat', c: '#141210', a: '#3A3530', name: '롱패딩', note: '블랙' },
          { slot: 'top', icon: 'knit', c: '#F3EAD8', a: '#B89A72', name: '터틀넥 니트', note: '아이보리' },
          { slot: 'bottom', icon: 'pants', c: '#9C958C', a: '#6B645C', name: '기모 슬랙스', note: '그레이' },
          { slot: 'acc', icon: 'cap', c: '#F2457C', name: '비니', note: '포인트 컬러' },
          { slot: 'bag', icon: 'crossbody', c: '#141210', a: '#F3EAD8', name: '크로스백', note: '패딩 위에 메기' },
          { slot: 'shoes', icon: 'boots', c: '#A9825A', name: '방한 부츠', note: '미끄럼 주의' }
        ],
        him: [
          { slot: 'outer', icon: 'coat', c: '#3A3F5C', a: '#2B2F47', name: '숏패딩', note: '차콜 네이비' },
          { slot: 'top', icon: 'knit', c: '#9C958C', a: '#6B645C', name: '기모 맨투맨', note: '그레이' },
          { slot: 'bottom', icon: 'jeans', c: '#3B5B92', a: '#9DB4D6', name: '기모 데님', note: '진청' },
          { slot: 'acc', icon: 'cap', c: '#141210', a: '#3A3530', name: '비니', note: '블랙' },
          { slot: 'bag', icon: 'crossbody', c: '#141210', a: '#F3EAD8', name: '크로스백', note: '블랙' },
          { slot: 'shoes', icon: 'boots', c: '#141210', name: '워커', note: '블랙' }
        ]
      }
    },
    beauty: [
      { icon: 'compact', c: '#F2C7B0', name: '쿠션 팩트', why: '수정 화장은 이거 하나로', pos: [44, 47, 32, 30] },
      { icon: 'balm', c: '#E0245E', a: '#141210', name: '립 틴트', why: '마스크·식사 후 다시 바르기', pos: [84, 10, 13, 28] },
      { icon: 'tube', c: '#F7F4EE', a: '#F2457C', name: '핸드크림', why: '건조한 실내에서 수시로', pos: [48, 4, 16, 38] },
      { icon: 'balm', c: '#FFD23F', a: '#F7F4EE', name: '선스틱', why: '덧바르기 쉬운 자외선 차단', pos: [67, 8, 13, 30] },
      { icon: 'mist', c: '#CFE3F0', name: '미스트', why: '오후에 한 번 수분 충전', pos: [74, 66, 18, 28] }
    ],
    day: [
      { time: '09:30', place: '서촌 · 통인시장', area: '종로', what: '시장 구경하고 골목 카페에서 아침', look: '걷기 편한 신발로 출발', q: '통인시장', icon: 'fork', c: '#FFD23F' },
      { time: '11:30', place: '경복궁 · 북촌', area: '종로', what: '궁 산책 뒤 한옥 골목 걷기', look: '사진 잘 받는 겉옷 걸치기', q: '경복궁', icon: 'hanok', c: '#FFFFFF' },
      { time: '14:30', place: '성수 연무장길', area: '성동', what: '팝업스토어와 편집숍 구경', look: '가방은 가볍게 — 쇼핑백 대비', q: '성수동 연무장길', icon: 'tote', c: '#F3EAD8' },
      { time: '17:00', at: 'golden', place: '뚝섬한강공원', area: '한강', what: '강 건너로 지는 노을 보기', look: '강바람이 차요 — 겉옷 꼭', q: '뚝섬한강공원', icon: 'sun', c: '#FFD23F' },
      { time: '19:30', at: 'after', place: '을지로 골목', area: '중구', what: '골목 안 식당과 바에서 마무리', look: '실내외 온도차 — 겹쳐 입기', q: '을지로3가역', icon: 'moon', c: '#F2A7B8' }
    ],
    dayAlt: '서쪽 코스도 좋아요: 망원시장 → 경의선숲길 → 망원한강공원 노을',
    eat: [
      { name: '광장시장', tip: '빈대떡 골목부터 한 바퀴', what: '빈대떡 · 시장 먹거리', q: '광장시장', c: '#FFD23F' },
      { name: '망원시장', tip: '간식 사서 한강으로 가기', what: '시장 간식 투어', q: '망원시장', c: '#F2A7B8' },
      { name: '을지로 골목', tip: '간판 작은 가게를 찾는 재미', what: '노포와 숨은 바', q: '을지로3가역 맛집', c: '#CFE3F0' }
    ],
    go: [
      { name: '경복궁', tip: '화요일은 쉬어요', what: '궁궐 산책', q: '경복궁', c: '#BFC9D3' },
      { name: '서울숲', tip: '성수 구경 앞뒤로 산책하기', what: '성수 옆 큰 공원', q: '서울숲', c: '#E3DED6' },
      { name: '반포한강공원', tip: '해 진 뒤 야경이 좋아요', what: '한강 야경', q: '반포한강공원', c: '#A9C6DE' }
    ],
    goTip: '경복궁은 화요일에 쉬어요. 북촌 일부 골목은 방문 시간이 정해져 있으니 가기 전에 확인!',
    arrive: {
      asOf: '서울 이동 팁',
      note: '서울은 지하철과 걷기만으로 거의 다 돼요. 동네 하나를 정하고 그 안에서 오래 머무는 게 여행자처럼 즐기는 방법이에요.',
      opts: [
        { id: 'subway', sign: '#2E9E4F', signName: '교통카드', en: 'SUBWAY', name: '지하철', cost: '교통카드 요금', time: '대부분 30분 안팎', how: '출구 번호만 확인하면 길 찾기가 쉬워요. 성수는 2호선, 안국(북촌)은 3호선, 을지로3가는 2·3호선이에요.', best: '동네에서 동네로 옮길 때' },
        { id: 'bike', sign: '#1F6FD6', signName: '앱으로 대여', en: 'BIKE', name: '따릉이 (공공자전거)', cost: '이용권 요금', time: '한강 구간 20~30분', how: '앱에서 이용권을 사고 QR로 빌려요. 한강과 서울숲 주변은 자전거길이 잘 돼 있어요.', best: '성수 → 뚝섬한강공원 노을 보러 갈 때' },
        { id: 'bus', sign: '#E0247A', signName: '환승 할인', en: 'BUS', name: '버스', cost: '교통카드 요금', time: '길 막히면 더 걸려요', how: '지하철과 환승 할인이 돼요. 내릴 때도 카드를 꼭 찍어야 해요.', best: '서촌·북촌처럼 역에서 조금 먼 골목' },
        { id: 'taxi', sign: '#7A3FB0', signName: '앱 호출', en: 'TAXI', name: '택시', cost: '거리·시간에 따라', time: '밤엔 호출이 몰려요', how: '택시 앱으로 부르면 편해요. 금·토 밤에는 잡기 어려울 수 있어요.', best: '을지로에서 늦게 돌아올 때' }
      ],
      picks: [{ label: '성수·북촌 가요', id: 'subway' }, { label: '한강 노을 볼래요', id: 'bike' }, { label: '서촌 골목', id: 'bus' }, { label: '밤늦게 귀가', id: 'taxi' }],
      foot: '요금은 바뀔 수 있어요. 정확한 금액과 막차 시간은 교통 앱에서 확인하세요.'
    },
    events: [
      { name: 'Visit Seoul', what: '서울 관광 공식 사이트 · 축제·행사', url: 'https://korean.visitseoul.net' },
      { name: 'Time Out Seoul', what: '서울에서 할 것 (영문)', url: 'https://www.timeout.com/seoul' }
    ],
    hoodSvg: '<path d="M0 148 C 60 168 110 182 170 172 C 230 162 270 138 360 156 V186 C 280 172 236 190 176 200 C 110 210 56 196 0 178 Z" fill="#BFD9E6" stroke="#141210" stroke-width="2"/><text x="20" y="172" font-family="Permanent Marker, cursive" font-size="12" fill="#5D8BA6" transform="rotate(8 20 172)">Han River</text><path d="M120 0 C 150 26 210 22 240 0 Z" fill="#D9C3A0" opacity=".7"/><text x="158" y="14" font-family="Permanent Marker, cursive" font-size="11" fill="#6B6259">mountains</text><path d="M40 110 C 120 96 220 100 330 112" stroke="#141210" stroke-width="2.2" stroke-dasharray="7 5" fill="none"/><path d="M196 30 C 200 90 214 150 250 232" stroke="#141210" stroke-width="2.2" stroke-dasharray="7 5" fill="none"/><text x="8" y="232" font-family="Anton, sans-serif" font-size="9" letter-spacing="1" fill="#6B6259">NOT TO SCALE</text>',
    hoods: [
      { name: '서촌 · 북촌', en: 'SEOCHON · BUKCHON', vibe: 'MODERN CLASSIC', what: '한옥 골목과 작은 갤러리', wear: ['롱 코트 또는 셔츠 원피스', '로퍼', '작은 숄더백'], spots: ['북촌 한옥마을', '통인시장'], pal: ['#8A5A3B', '#F3EAD8', '#2E4F86'], q: '북촌한옥마을', x: 150, y: 50 },
      { name: '을지로', en: 'EULJIRO', vibe: 'NEWTRO', what: '인쇄 골목 사이 숨은 바와 카페', wear: ['빈티지 재킷', '와이드 팬츠', '볼캡'], spots: ['을지로3가 골목', '청계천'], pal: ['#F2457C', '#141210', '#FFD23F'], q: '을지로3가역', x: 222, y: 92 },
      { name: '연남 · 망원', en: 'YEONNAM · MANGWON', vibe: 'COZY CASUAL', what: '숲길 산책과 시장 먹거리', wear: ['맨투맨', '데님', '에코백', '스니커즈'], spots: ['경의선숲길', '망원시장'], pal: ['#6B8E5A', '#F3EAD8', '#E3D3B8'], q: '경의선숲길', x: 70, y: 96 },
      { name: '한남 · 이태원', en: 'HANNAM', vibe: 'QUIET LUXURY', what: '편집숍과 갤러리, 언덕 위 카페', wear: ['울 코트 또는 셋업', '니트', '로퍼'], spots: ['한남동 카페거리', '리움미술관'], pal: ['#141210', '#F3EAD8', '#D9B44A'], q: '한남동 카페거리', x: 214, y: 140 },
      { name: '성수', en: 'SEONGSU', vibe: 'INDUSTRIAL TREND', what: '팝업스토어와 공장을 고친 카페', wear: ['오버핏 재킷', '카고 팬츠', '청키 스니커즈'], spots: ['서울숲', '연무장길'], pal: ['#9C958C', '#141210', '#F2457C'], q: '성수동 연무장길', x: 300, y: 118 },
      { name: '압구정 · 도산', en: 'APGUJEONG · DOSAN', vibe: 'DRESS UP', what: '플래그십 스토어와 도산공원', wear: ['재킷', '슬랙스 또는 미니 스커트', '미니백'], spots: ['도산공원', '압구정로데오'], pal: ['#FFFFFF', '#141210', '#2D5BFF'], q: '도산공원', x: 280, y: 208 }
    ],
    read: [
      { k: 'FASHION', items: [
        { mag: 'Vogue Korea', title: '보그 코리아', ko: '패션·뷰티 최신 기사', url: 'https://www.vogue.co.kr' },
        { mag: 'W Korea', title: '더블유 코리아', ko: '화보와 스타일 트렌드', url: 'https://www.wkorea.com' }
      ] },
      { k: 'TRAVEL', items: [
        { mag: 'Visit Seoul', title: '서울 관광 공식 가이드', ko: '동네별 코스와 행사 일정', url: 'https://korean.visitseoul.net' },
        { mag: 'Time Out Seoul', title: 'Things to do in Seoul', ko: '여행자 시선의 서울 (영문)', url: 'https://www.timeout.com/seoul' }
      ] }
    ],
    watch: [
      { label: '서울 브이로그', sub: '하루 코스 엿보기', q: '서울 여행 브이로그' },
      { label: '성수 팝업', sub: '이번 주 팝업스토어', q: '성수 팝업스토어' },
      { label: '서울 스트리트 패션', sub: '요즘 거리 스타일', q: '서울 스트리트 패션' },
      { label: '서울 맛집', sub: '시장 · 노포 · 골목', q: '서울 노포 맛집' },
      { label: '한강 피크닉', sub: '노을 명당', q: '한강 피크닉 노을' },
      { label: '서울 야경', sub: '밤 산책 코스', q: '서울 야경 명소' }
    ],
    essentials: ['교통카드 (또는 모바일 교통카드)', '보조배터리', '편한 신발', '접이식 우산', '에코백 (쇼핑·시장용)', '핫팩 또는 손선풍기 (계절 따라)']
  },
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
