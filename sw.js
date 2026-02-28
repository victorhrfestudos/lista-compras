const CACHE_NAME = 'lista-compras-v1'

const arquivos = [
    '/',
    '/index.html',
    '/historico.html',
    '/script.js',
    '/historico.js',
    '/style.css',
    '/manifest.json',
    '/icon.png'
]

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(arquivos)
        })
    )
})

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(resposta) {
            return resposta || fetch(e.request)
        })
    )
})
