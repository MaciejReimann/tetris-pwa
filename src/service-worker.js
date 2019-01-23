const PRECACHE = "static-v1";
const PRECACHE_URLS = [
  // external resources
  // e.g fonts,

  // application resources
  "/styles/tetris-style.css",
  "/icons/JS_512.png",
  "/",
  "/bundle.js",
  "manifest.json"
];

async function precache(urls) {
  const cache = await caches.open(PRECACHE);
  return cache.addAll(urls);
}

async function cacheThenNetwork(request) {
  const cache = await caches.open(PRECACHE);
  const response = await cache.match(request);
  return response || fetch(request);
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(PRECACHE);
  const cachedResponse = await cache.match(request);
  if (!cachedResponse) {
    const networkResponse = await fetch(request);
    await cache.put(request, networkResponse.clone());
    return networkResponse;
  }
  return cachedResponse;
}

self.addEventListener("install", e => {
  e.waitUntil(precache(PRECACHE_URLS));
});

// self.addEventListener("activate", e => {
//   console.log(e);
// });

// self.addEventListener("message", e => {
//   console.log(e);
// });

self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname === "/") {
    event.respondWith(staleWhileRevalidate(event.request));
  } else if (
    PRECACHE_URLS.includes(requestUrl.href) ||
    PRECACHE_URLS.includes(requestUrl.pathname)
  ) {
    event.respondWith(cacheThenNetwork(event.request));
  } else {
    event.respondWith(fetch(event.request));
  }
});
