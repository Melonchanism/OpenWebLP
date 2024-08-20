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

	const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
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

	let toast = $derived($offlineReady || $needRefresh)
</script>

{#if toast && $page.route.id === "/"}
	<div class="pwa-toast" role="alert" aria-labelledby="toast-message">
		<p class="message">
			{#if $offlineReady}
				App ready to work offline
			{:else if $needRefresh}
				New content available, click on reload button to update.
			{/if}
		</p>
		<div class="buttons">
			{#if $needRefresh}
				<button onclick={() => updateServiceWorker(true)}> Reload </button>
			{/if}
			<button onclick={() => ($offlineReady = $needRefresh = false)}> Close </button>
		</div>
	</div>
{/if}

<style>
	.pwa-toast {
		position: fixed;
		right: 0;
		bottom: 0;
		margin: 16px;
		padding: 12px;
		border: 1px solid var(--border);
		border-radius: 4px;
		z-index: 2;
		text-align: left;
		background: black;
	}
	.pwa-toast .message {
		margin-bottom: 8px;
	}
	.pwa-toast .buttons {
		display: flex;
	}
	.pwa-toast button {
		border: 1px solid #8885;
		outline: none;
		margin-right: 5px;
		border-radius: 2px;
		padding: 3px 10px;
	}
</style>
