<script lang="ts">
	import { useRegisterSW } from "virtual:pwa-register/svelte"
	import { page } from "$app/stores"

	// Check for updates
	async function checkForUpdate(swUrl: string, r: ServiceWorkerRegistration) {
		if ("onLine" in navigator && !navigator.onLine) return

		const resp = await fetch(swUrl, {
			cache: "no-store",
			headers: {
				cache: "no-store",
				"cache-control": "no-cache",
			},
		})

		if (resp?.status === 200) await r.update()
	}

	let { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
		onRegisteredSW(swUrl, r) {
			if (r?.active?.state === "activated" && navigator.onLine === true) {
				checkForUpdate(swUrl, r)
			} else if (r?.installing) {
				r.installing.addEventListener("statechange", (e) => {
					const sw = e.target as ServiceWorker
					if (sw.state === "activated") checkForUpdate(swUrl, r)
				})
			}
		},
	})
</script>

{#if $page.route.id === "/"}
	<button disabled={!$needRefresh}>
		{#if $offlineReady}
			<i class="bi bi-cloud-check"></i>
			<div class="tooltip">App ready to work offline</div>
		{:else if $needRefresh}
			<i class="bi bi-cloud-download"></i>
			<div class="tooltip">Update app</div>
		{:else}
			<i class="bi bi-cloud-minus"></i>
			<div class="tooltip">Unknown state</div>
		{/if}
	</button>
{/if}
