const CACHE_NAME = 'mi-cache'
const CACHE_VERSION = 'v3'

const filesToCache = [
  '/index.html', // Archivos HTML
  '/style.css', // Archivos CSS
  '/script.js', // Archivos JavaScript
  '/img/imgpng' // Imágenes
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(`${CACHE_NAME}-${CACHE_VERSION}`).then(function (cache) {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== `${CACHE_NAME}-${CACHE_VERSION}`) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // Si la solicitud se completó con éxito (hay conexión)
        // Aquí puedes personalizar la lógica según tus necesidades
        if (response.status === 200) {
          // Realiza alguna acción si la conexión se restaura (opcional)
          self.registration.showNotification(
            'Conexión restaurada',
            'La conexión a Internet se ha restablecido.'
          )
        }
        return response
      })
      .catch(function () {
        // Si la solicitud falla (no hay conexión)
        // Aquí puedes personalizar la lógica según tus necesidades
        self.registration.showNotification(
          'Conexión perdida',
          'La conexión a Internet se ha perdido.'
        )
      })
  )
})
