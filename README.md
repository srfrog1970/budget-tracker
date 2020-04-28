# budget-tracker

Create a manifest.webmanifest file in your public folder (it is a json file) THIS IS MANUALLY CREATED!!!! This takes care of

Service worker allows us to run this offline and

Here is a sample of how this is created. Find all the icons in your icon folder!

{
"name": "budgetTracker",
"short_name": "budgetTracker",
"icons": [
{
"src": "icons/icon-192x192.png",
"sizes": "192x192",
"type": "image/png"
},
{
"src": "icons/icon-512x512.png",
"sizes": "512x512",
"type": "image/png"
}
],
"theme_color": "#ffffff",
"background_color": "#ffffff",
"start_url": "/",
"display": "standalone"
}

In the root file put in (Right above the <head> tag) add this line.

<link rel="manifest" href="manifest.webmanifest" />

Test this out!!
make sure you do the npm install.
run the application.

Create desktop app.
tools -> more tools -> create shortcut (??)

Add service worker!

- Add the following script just above the `</body>` tag in `index.html`

```html
<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").then((reg) => {
        console.log("We found your service worker file!", reg);
      });
    });
  }
</script>

* Create a `service-worker.js` file in the `public` directory. The following is
boiler plate code. The only thing you need to change is the first line... This
should include all the files you want to cache. NOTE: You only need the files in
the public folder. This is because we only need client side information. Once we
go back online, we will have access to the serverside. - const FILES_TO_CACHE =
[ "/", "/index.html", "/index.js", "/icons/style.css", ]; const CACHE_NAME =
"static-cache-v2"; const DATA_CACHE_NAME = "data-cache-v1"; // install
self.addEventListener("install", function(evt) { evt.waitUntil(
caches.open(CACHE_NAME).then(cache => { console.log("Your files were pre-cached
successfully!"); return cache.addAll(FILES_TO_CACHE); }) ); self.skipWaiting();
}); self.addEventListener("activate", function(evt) { evt.waitUntil(
caches.keys().then(keyList => { return Promise.all( keyList.map(key => { if (key
!== CACHE_NAME && key !== DATA_CACHE_NAME) { console.log("Removing old cache
data", key); return caches.delete(key); } }) ); }) ); self.clients.claim(); });
// fetch self.addEventListener("fetch", function(evt) { // cache successful
requests to the API if (evt.request.url.includes("/api/")) { evt.respondWith(
caches.open(DATA_CACHE_NAME).then(cache => { return fetch(evt.request)
.then(response => { // If the response was good, clone it and store it in the
cache. if (response.status === 200) { cache.put(evt.request.url,
response.clone()); } return response; }) .catch(err => { // Network request
failed, try to get it from the cache. return cache.match(evt.request); });
}).catch(err => console.log(err)) ); return; } // if the request is not for the
API, serve static assets using "offline-first" approach. // see
https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
evt.respondWith( caches.match(evt.request).then(function(response) { return
response || fetch(evt.request); }) ); });
```
