// Service Worker Version
const VERSION = 'v1.0.2';
const CACHE_NAME = `rcc-${VERSION}`;
const ASSETS_TO_CACHE = [
    '/',
    '/home.html',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/img/logo.svg',
    '/assets/vendor/bootstrap/bootstrap.min.css',
    '/assets/vendor/bootstrap/bootstrap.bundle.min.js'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log(`[SW ${VERSION}] Installing...`);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log(`[SW ${VERSION}] Caching assets`);
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log(`[SW ${VERSION}] Skip waiting`);
                return self.skipWaiting(); // Force activation of new service worker
            })
    );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', (event) => {
    console.log(`[SW ${VERSION}] Activating...`);
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log(`[SW ${VERSION}] Deleting old cache: ${cacheName}`);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log(`[SW ${VERSION}] Claiming clients`);
                return self.clients.claim(); // Take control of all pages immediately
            })
            .then(() => {
                // Notify all clients to reload
                return self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.postMessage({
                            type: 'SW_UPDATED',
                            version: VERSION
                        });
                    });
                });
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then((response) => {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    // Clone the response
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                });
            })
    );
});



