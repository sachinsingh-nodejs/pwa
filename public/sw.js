var CACHE_NAME = "demo-cache-v01";
var URLS_TO_CACHE = [
    "/", // Home page
    "/static/js/callback.js",
    "/static/js/promises.js",
    "/static/js/promise.all.js",
    "/static/js/serviceworker.demo.js",
    "/static/js/xhr.callback.js",
    "/static/js/xhr.js",
    "/static/js/xhr.promise.complex.js",
    "/static/js/xhr.promise.js"
];

// Perform install step
// This step will open a cache and save all the listed paths
self.addEventListener("install", function (event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        console.log("Opened cache");
        return cache.addAll(URLS_TO_CACHE);
    }));
});

// Listen to fetch requests
self.addEventListener("fetch", function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        if (response) {
            return response;
        }
        return fetch(event.request);
    }));
});

// Handle updates
// self.addEventListener("");