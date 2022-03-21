/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-95f1f80';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./chram_matky_bozi_v_parizi_002.html","./chram_matky_bozi_v_parizi_005.html","./chram_matky_bozi_v_parizi_006.html","./chram_matky_bozi_v_parizi_007.html","./chram_matky_bozi_v_parizi_008.html","./chram_matky_bozi_v_parizi_009.html","./chram_matky_bozi_v_parizi_010.html","./chram_matky_bozi_v_parizi_011.html","./chram_matky_bozi_v_parizi_012.html","./chram_matky_bozi_v_parizi_013.html","./chram_matky_bozi_v_parizi_014.html","./chram_matky_bozi_v_parizi_015.html","./chram_matky_bozi_v_parizi_016.html","./chram_matky_bozi_v_parizi_017.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/obalka_chram_matky_bozi_fmt.png","./resources/upoutavka_eknihy_fmt.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
