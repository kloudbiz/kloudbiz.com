const CACHE = 'kloudbiz-v1';

const PRECACHE = [
  '/',
  '/index.html',
  '/public/kloudbiz-logo.svg',
  '/public/i18n/en.json',
  '/public/i18n/hi.json',
  '/public/i18n/mr.json',
  '/public/i18n/gu.json',
  '/public/i18n/pa.json',
  '/public/i18n/ta.json',
  '/public/i18n/te.json',
  '/public/i18n/ml.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Stale-while-revalidate: serve from cache instantly, refresh cache in background
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(event.request).then(cached => {
        const fresh = fetch(event.request).then(response => {
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        }).catch(() => cached);
        return cached || fresh;
      })
    )
  );
});
