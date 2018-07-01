const staticCacheName = 'currencyConcerter-v1';
const cacheItems = [
        '/index.html',
        '/manifest.json',
        '/assets/css/bootstrap.min.css',
        '/assets/css/now-ui-kit.css',
        '/app.bundle.js',
        '/assets/js/core/jquery.3.2.1.min.js',
        '/assets/js/core/popper.min.js',
        '/assets/js/core/bootstrap.min.js',
        '/assets/js/now-ui-kit.js',
        '/favicon.ico',
        'https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css',
        'https://free.currencyconverterapi.com/api/v5/currencies'
      ]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName)
          .then((cache) => {
              return cache.addAll(cacheItems);
          })
    );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/index.html'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});