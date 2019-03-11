const staticAssets = [
  './',
 './index.html',
 './manifest.json',
 './scripts',
 './scripts/app.js',
 './scripts/jquery-3.3.1.js',
 './scripts/materialize.js',
 './service-worker.js',
 './styles',
 './styles/materialize.css',
 './styles/style.css',
 './images',
 './images/GitHub-Mark-Light-120px-plus.png',
 './images/green-dot.png',
 './images/red-dot.png',
 './images/icons',
 './images/icons/icon-72x72.png',
 './images/icons/icon-96x96.png',
 './images/icons/icon-128x128.png',
 './images/icons/icon-144x144.png',
 './images/icons/icon-152x152.png',
 './images/icons/icon-192x192.png',
 './images/icons/icon-384x384.png',
 './images/icons/icon-512x512.png',
 './semantic',
 './semantic/dist',
 './semantic/dist/semantic.css',
 './semantic/dist/semantic.min.css',
 './semantic/dist/semantic.js',
 './semantic/dist/semantic.min.js',
 './semantic/dist/themes',
 './semantic/dist/themes/default',
 './semantic/dist/themes/default/assets',
 './semantic/dist/themes/default/assets/fonts',
 './semantic/dist/themes/default/assets/fonts/brand-icons.eot',
 './semantic/dist/themes/default/assets/fonts/brand-icons.svg',
 './semantic/dist/themes/default/assets/fonts/brand-icons.ttf',
 './semantic/dist/themes/default/assets/fonts/brand-icons.woff',
 './semantic/dist/themes/default/assets/fonts/brand-icons.woff2',
 './semantic/dist/themes/default/assets/fonts/icons.eot',
 './semantic/dist/themes/default/assets/fonts/icons.otf',
 './semantic/dist/themes/default/assets/fonts/icons.svg',
 './semantic/dist/themes/default/assets/fonts/icons.ttf',
 './semantic/dist/themes/default/assets/fonts/icons.woff',
 './semantic/dist/themes/default/assets/fonts/icons.woff2',
 './semantic/dist/themes/default/assets/fonts/outline-icons.eot',
 './semantic/dist/themes/default/assets/fonts/outline-icons.svg',
 './semantic/dist/themes/default/assets/fonts/outline-icons.ttf',
 './semantic/dist/themes/default/assets/fonts/outline-icons.woff',
 './semantic/dist/themes/default/assets/fonts/outline-icons.woff2'
];


self.addEventListener('install', async event => {
  const cache = await caches.open('graffiti-static');
  cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if(url.origin == location.origin) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(networkFirst(req));
  }
  event.respondWith(cacheFirst(req));


});

async function cacheFirst(req)  {
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}

async function networkFirst(req)  {
  const cache = await caches.open('graffiti-dynamic');

  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (e) {
    return cache.match(req);
  } finally {

  }
}
