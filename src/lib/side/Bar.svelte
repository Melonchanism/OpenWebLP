<script>
	import { menuBlur, menuFade, recieve, send } from "$lib/transitions"
	import { SidePanel, sidePanel, blank } from "$lib/sharedState"

	const channel = new BroadcastChannel("serviceworker")

	let offlineStatus = $state("preparing")
	channel.addEventListener("message", (evt) => {
		offlineStatus = evt.data
	})

	function discardChanges() {
		let result = true
		if (onbeforeunload != null) result = confirm("Revert unsaved changes?")
		return result
	}
</script>

<div class="sidebar">
	<div class="bg"></div>
	<div class="contents">
		<div class="tabbar vertical top">
			<button
				onclick={() =>
					discardChanges()
						? $sidePanel !== SidePanel.Songs
							? ($sidePanel = SidePanel.Songs)
							: ($sidePanel = SidePanel.None)
						: null}
			>
				<div class="tooltip right">Songs</div>
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
				<div class="tooltip right"><div>Settings</div></div>
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
					<div class="tooltip right">Editor</div>
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
			<button>
				{#if offlineStatus === "ready"}
					<div class="tooltip right">Offline Ready</div>
					<i class="bi bi-cloud-check"></i>
				{:else if offlineStatus === "offline"}
					<div class="tooltip right">Currently Offline</div>
					<i class="bi bi-cloud-haze2-fill"></i>
				{:else}
					<div class="tooltip right">Preparing Offline Functionality</div>
					<i class="bi bi-cloud-arrow-down"></i>
				{/if}
			</button>
			<button class={$blank ? "active" : ""} onclick={() => ($blank = !$blank)}>
				<div class="tooltip right">Blank Screen</div>
				{#if $blank}
					<i transition:menuFade class="bi bi-aspect-ratio-fill"></i>
				{:else}
					<i transition:menuFade class="bi bi-aspect-ratio"></i>
				{/if}
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	div.sidebar {
		border-right: 1px solid var(--border);
		div.contents {
			position: absolute;
			height: 100%;
			display: grid;
			grid-template-rows: 1fr 1fr;
			z-index: 100;
		}
		position: relative;
		z-index: 99;
		div.bg {
			background-color: rgb(20, 20, 20, 0.7);
			z-index: 98;
			position: absolute;
			width: 100%;
			height: 100%;
			backdrop-filter: blur(20px);
		}
	}
</style>
