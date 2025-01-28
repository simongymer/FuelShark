var fuelSharkCacheName = 'fuelSharkCache-v5';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(fuelSharkCacheName).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/images/fuelshark-192.png',
                '/images/fuelshark-512.png',
                '/scripts/fuelshark.js',
                '/scripts/startup.js',
                '/styles/accordion.css',
                '/styles/fuelshark.css',
                '/styles/radio-field.css',
                '/styles/range-field.css',
                '/styles/toggle-switch-field.css'
                // Add any other assets you want to cache
            ]);
        })
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});