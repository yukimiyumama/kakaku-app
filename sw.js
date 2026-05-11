const CACHE = 'pca-v3';
const ASSETS = [
  '/kakaku-app/',
  '/kakaku-app/index.html',
  '/kakaku-app/manifest.json',
  '/kakaku-app/icon-192.png',
  '/kakaku-app/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/kakaku-app/index.html')))
  );
});
