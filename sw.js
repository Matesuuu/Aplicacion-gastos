const cacheName = 'pwa-gastos';
const assets = [
    './index.html',
    './sw.js',
    './js/main.js',
];

self.addEventListener('install', event => {
    console.log('El SW se instalo');

    self.skipWaiting();

    event.waitUntil(

        caches.open(cacheName)
            .then(cache => {
                console.log('Agregando recursos al caché');
                return cache.addAll(assets);
            })
            .catch(error => {
                console.log('Error al agregar recursos al caché:', error);
            })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    )
})

self.addEventListener('activate', event => {
    console.log('El SW se activo');
})

  