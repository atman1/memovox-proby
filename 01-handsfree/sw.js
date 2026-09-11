const CACHE = 'memovox-proba-01-v8';
const FILES = ['./', './index.html', './manifest.webmanifest', './audio/q1.wav', './audio/a1.wav', './audio/q2.wav', './audio/a2.wav', './audio/q3.wav', './audio/a3.wav', './audio/cue1.wav', './audio/cue2.wav', './audio/cue3.wav'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
