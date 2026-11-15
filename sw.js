// OOTD 홈 화면 앱용 서비스 워커: 네트워크를 먼저 쓰고, 오프라인일 때만 마지막으로 받은 파일·날씨·환율·글꼴을 보여준다.
const CACHE = 'ootd-v8';
const SHELL = ['./', 'index.html', 'style.css', 'map.js', 'icons.js', 'shared.js', 'en.js', 'cities/index.js', 'zine.js', 'app.js', 'icon-192.png'];
const HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'api.open-meteo.com', 'open.er-api.com'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => null).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin && !HOSTS.includes(url.hostname)) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: url.origin === location.origin }).then((r) => r || caches.match('index.html')))
  );
});
