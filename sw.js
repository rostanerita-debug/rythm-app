const CACHE = "rythm-v1";
const FILES = ["./index.html","./manifest.json","./icon-192.png","./icon-512.png","https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => { e.respondWith(fetch(e.request).then(r => { caches.open(CACHE).then(c => c.put(e.request, r.clone())); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))); });
