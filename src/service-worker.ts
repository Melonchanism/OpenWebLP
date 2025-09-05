// Disables access to DOM typings like `HTMLElement` which are not available
// inside a service worker and instantiates the correct globals
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Ensures that the `$service-worker` import has proper type definitions
/// <reference types="@sveltejs/kit" />

// Only necessary if you have an import from `$env/static/public`
/// <reference types="../.svelte-kit/ambient.d.ts" />

import { build, files, version } from "$service-worker"

// This gives `self` the correct types
const self = globalThis.self as unknown as ServiceWorkerGlobalScope

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`

const ASSETS = [
	"/",
	"/display",
	...build, // the app itself
	...files, // everything in `static`
]

const channel = new BroadcastChannel("serviceworker")

self.addEventListener("install", (event) => {
	// Create a new cache and add all files to it
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE)
			await cache.addAll(ASSETS)
			channel.postMessage("ready")
		})()
	)
})

self.addEventListener("activate", (event) => {
	// Remove previous cached data from disk
	event.waitUntil(
		(async () => {
			for (const key of await caches.keys()) {
				if (key !== CACHE) await caches.delete(key)
			}
		})()
	)
})

self.addEventListener("fetch", (event) => {
	// ignore POST requests etc
	if (event.request.method !== "GET") return

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE)

			try {
				const response = await fetch(event.request)

				// Always try network first
				if (!(response instanceof Response)) {
					throw new Error("invalid response from fetch")
				}

				if (response.status === 200) {
					setTimeout(() => channel.postMessage("ready"), 50)
					cache.put(event.request, response.clone())
				}

				return response
			} catch (err) {
				const response = await cache.match(event.request)

				if (response) {
					setTimeout(() => channel.postMessage("offline"), 50)
					return response
				}
				// if there's no cache, then just error out
				// as there is nothing we can do to respond to this request
				throw err
			}
		})()
	)
})
