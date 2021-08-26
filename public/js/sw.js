self.addEventListener("install", e => {
	e.waitUntil(
		caches.open("static")
			.then(cache => {
				//return cache.addAll(["/", "/css/master.css", "/js/developer.js", "/images/logo192.png"]);
			})
			.catch(function(error) {
			  console.log('Hubo un problema con la petición Fetch:' + error.message);
			})
	);
});

self.addEventListener("fetch", e => {
	e.respondWith(
		caches.match(e.request).then(response => {
			//return response || fetch(e.request);
		})
	);
});