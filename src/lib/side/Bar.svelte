<script>
	import { menuBlur, menuFade, recieve, send } from "$lib/transitions"
	import { SidePanel, sidePanel } from "$lib/sharedState"
	let { blank = $bindable() } = $props()

	function discardChanges() {
		let result = true
		if (onbeforeunload != null) result = confirm("Revert unsaved changes?")
		return result
	}
</script>

<div class="sidebar">
	<div class="tabbar vertical top">
		<button
			onclick={() =>
				discardChanges()
					? $sidePanel !== SidePanel.Songs
						? ($sidePanel = SidePanel.Songs)
						: ($sidePanel = SidePanel.None)
					: null}
		>
			<div class="tooltip">Songs</div>
			{#if $sidePanel === SidePanel.Songs}
				<i transition:menuFade class="bi bi-file-earmark-music-fill"></i>
				<div
					class="selector"
					in:recieve|global={{ key: "sidepanel" }}
					out:send|global={{ key: "sidepanel" }}
				></div>
			{:else}
				<i transition:menuFade class="bi bi-file-earmark-music"></i>
			{/if}
		</button>
		<button
			onclick={() =>
				discardChanges()
					? $sidePanel !== SidePanel.Settings
						? ($sidePanel = SidePanel.Settings)
						: ($sidePanel = SidePanel.None)
					: null}
		>
			<div class="tooltip">Settings</div>
			{#if $sidePanel === SidePanel.Settings}
				<i transition:menuFade class="bi bi-gear-fill"></i>
				<div
					class="selector"
					in:recieve|global={{ key: "sidepanel" }}
					out:send|global={{ key: "sidepanel" }}
				></div>
			{:else}
				<i transition:menuFade class="bi bi-gear"></i>
			{/if}
		</button>
		{#if $sidePanel === SidePanel.Editor}
			<button
				transition:menuBlur
				onclick={async () => {
					if (discardChanges()) $sidePanel = SidePanel.None
				}}
			>
				<div class="tooltip">Editor</div>
				<i class="bi bi-pencil-fill"></i>
				{#if $sidePanel === SidePanel.Editor}
					<div
						class="selector"
						in:recieve|global={{ key: "sidepanel" }}
						out:send|global={{ key: "sidepanel" }}
					></div>
				{/if}
			</button>
		{/if}
	</div>
	<div class="tabbar vertical bottom">
		<!-- We have to wait for the app to be on the client before loading this -->
		<!-- {#await import("$lib/side/PWABadge.svelte") then { default: PWABadge }}
			<PWABadge />
		{/await} -->
		<button class={blank ? "active" : ""} onclick={() => (blank = !blank)}>
			<div class="tooltip">Blank Screen</div>
			{#if blank}
				<i transition:menuFade class="bi bi-aspect-ratio-fill"></i>
			{:else}
				<i transition:menuFade class="bi bi-aspect-ratio"></i>
			{/if}
		</button>
	</div>
</div>

<style>
	div.sidebar {
		background-color: rgb(20, 20, 20, 0.7);
		backdrop-filter: blur(20px);
		border-right: 1px solid var(--border);
		display: grid;
		grid-template-rows: 1fr 1fr;
		z-index: 2;
	}
</style>
