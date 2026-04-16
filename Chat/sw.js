const CACHE_NAME = 'mango-cache-v1';
const ASSETS_TO_CACHE = [
    './index.html',
    '../manifest.json',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/lucide@latest',
    'https://sdk.minepi.com/pi-sdk.js',
    'https://cdn.socket.io/4.7.2/socket.io.min.js',
    'https://unpkg.com/dexie/dist/dexie.js'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Intercept requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});