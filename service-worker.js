var dataCacheName = 'template-pwa';
var cacheName = 'template-pwa';
var filesToCache = [
  '/',
 "./index.html",
 "./manifest.json",
 "./scripts",
 "./scripts/app.js",
 "./scripts/jquery-3.3.1.js",
 "./scripts/materialize.js",
 "./service-worker.js",
 "./styles",
 "./styles/materialize.css",
 "./styles/style.css",
 "./images",
 "./images/GitHub-Mark-Light-120px-plus.png",
 "./semantic",
 "./semantic/dist",
 "./semantic/dist/semantic.css",
 "./semantic/dist/semantic.min.css",
 "./semantic/dist/semantic.js",
 "./semantic/dist/semantic.min.js",
 "./semantic/dist/themes",
 "./semantic/dist/themes/default",
 "./semantic/dist/themes/default/assets",
 "./semantic/dist/themes/default/fonts",
 "./semantic/dist/themes/default/fonts/brand-icons.eot",
 "./semantic/dist/themes/default/fonts/brand-icons.svg",
 "./semantic/dist/themes/default/fonts/brand-icons.ttf",
 "./semantic/dist/themes/default/fonts/brand-icons.woff",
 "./semantic/dist/themes/default/fonts/brand-icons.woff2",
 "./semantic/dist/themes/default/fonts/icons.eot",
 "./semantic/dist/themes/default/fonts/icons.otf",
 "./semantic/dist/themes/default/fonts/icons.svg",
 "./semantic/dist/themes/default/fonts/icons.ttf",
 "./semantic/dist/themes/default/fonts/icons.woff",
 "./semantic/dist/themes/default/fonts/icons.woff2",
 "./semantic/dist/themes/default/fonts/outline-icons.eot",
 "./semantic/dist/themes/default/fonts/outline-icons.svg",
 "./semantic/dist/themes/default/fonts/outline-icons.ttf",
 "./semantic/dist/themes/default/fonts/outline-icons.woff",
 "./semantic/dist/themes/default/fonts/outline-icons.woff2"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
