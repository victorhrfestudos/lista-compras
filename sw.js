// Service Worker mínimo
self.addEventListener('install', function(e) {
    console.log('Service Worker instalado')
})

self.addEventListener('fetch', function(e) {
    // Por enquanto só deixa passar
})