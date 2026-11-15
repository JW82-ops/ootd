# OOTD — Out Of Town Day

도시를 입는 여행 매거진. 일러스트 세계지도에서 도시를 고르면 그 도시의 잡지가 열려요.

- 날씨 맞춤 룩 (Open-Meteo 예보 · 평년 기온)
- 뷰티 키트, 하루 코스, 맛집 & 꼭 가볼 곳
- 팁·환율 계산기(실시간 환율), 한국↔미국 사이즈표
- 룩 + 뷰티로 만드는 짐 체크리스트

도시: Los Angeles, Seoul, New York, Lisbon, Paris, Bangkok, Tokyo, Sydney. 한국어 / English 전환 지원. 정적 파일만으로 동작해서 GitHub Pages에서 바로 열려요.

## 구조

- `cities/index.js` — 지도에 올라가는 도시 목록 (이름, 위치, 시간대)
- `cities/<id>.js` — 도시 한 곳의 잡지 내용. 글은 `'한국어||English'`로 함께 적어요. 도시를 열 때만 불러와요.
- `en.js` — 화면 공통 문구의 영어와 번역기
- `tools/check.js` — 도시 파일 검사 (`node tools/check.js`). 빠진 항목·없는 아이콘·영어 누락·잘못된 링크를 잡아요. 올릴 때마다 GitHub에서 자동으로 돌아요.
