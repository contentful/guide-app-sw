// Based on http://www.html5rocks.com/en/tutorials/service-worker/introduction/
importScripts('/js/serviceworker-cache-polyfill.js');

var CACHE_NAME = 'guide-app-v5';
var urlsToCache = [
  '/',
  '/list',
  '/css/main.css',
  '/js/main.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request);
      }
    )
  );
});
