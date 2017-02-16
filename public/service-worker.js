var CACHE_NAME = "yt-appshell-cache-v01";
var URLS_TO_CACHE = [
    "/",
    "/lib/bootstrap/dist/css/bootstrap.min.css",
    "/static/css/app.css",
    "/lib/jquery/dist/jquery.min.js",
    "/static/js/app.js"
];

// Perform install step
// This step will open a cache and save all the listed paths
self.addEventListener("install", function (event) {
    console.log("[Service Worker] install");
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        console.log("[Service Worker] Caching app shell");
        return cache.addAll(URLS_TO_CACHE);
    })
        .then(function () {
            self.skipWaiting();
        }));
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// Listen to fetch requests
self.addEventListener("fetch", function (event) {
    console.log("[Service Worker] fetch url: " + event.request.url);
    //console.log(event.request);
    event.respondWith(caches.match(event.request).then(function (response) {
        //console.log(response);
        return response || fetch(event.request);
    }));
});

// Handle updates
// self.addEventListener("");