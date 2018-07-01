const staticCacheName = 'currencyConcerter-v1';
const cacheItems = [
        '/currencyConverter/index.html',
        '/currencyConverter/manifest.json',
        '/currencyConverter/assets/css/bootstrap.min.css',
        '/currencyConverter/assets/css/now-ui-kit.css',
        '/currencyConverter/app.bundle.js',
        '/currencyConverter/assets/js/core/jquery.3.2.1.min.js',
        '/currencyConverter/assets/js/core/popper.min.js',
        '/currencyConverter/assets/js/core/bootstrap.min.js',
        '/currencyConverter/assets/js/now-ui-kit.js',
        '/currencyConverter/favicon.ico',
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
      event.respondWith(caches.match('currencyConverter/index.html'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});