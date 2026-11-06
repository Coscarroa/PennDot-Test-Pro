/**
 * Service Worker for PennDOT PA Driver Exam Pro
 * Provides offline caching for seamless use without internet
 */

const CACHE_NAME = 'penndot-pa-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/aistudio/PennDOT_PA_Driver_Exam_Pro_5c27bcf0.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('Pre-cache item failed:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Ignore non-GET requests or external APIs
  if (req.method !== 'GET') return;
  if (!req.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(req).then(cachedResp => {
      const fetchPromise = fetch(req)
        .then(networkResp => {
          if (networkResp && networkResp.status === 200) {
            const respToCache = networkResp.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(req, respToCache);
            });
          }
          return networkResp;
        })
        .catch(() => {
          // If network fails and it's a navigation request, return index.html from cache
          if (req.mode === 'navigate') {
            return caches.match('/index.html') || cachedResp;
          }
          return cachedResp;
        });

      return cachedResp || fetchPromise;
    })
  );
});
