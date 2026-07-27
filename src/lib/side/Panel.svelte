<script lang="ts">
	import Settings from "$lib/side/Settings.svelte"
	import Songs from "$lib/side/Songs.svelte"
	import { SidePanel, sidePanel, animating } from "$lib/sharedState"
	import type { Song } from "$lib/localStorage"

	let { songs }: { songs: Song[] } = $props()
</script>

<!-- {#if $sidePanel} -->
<div class="sidepanel {$animating ? 'animating' : ''}">
	{#if $sidePanel === SidePanel.Songs}
		<Songs {songs} />
	{:else if $sidePanel === SidePanel.Settings}
		<Settings />
	{/if}
</div>

<!-- {/if} -->

<style>
	:global(.sidepanelactive .sidepanel) {
		min-width: min(30vw, 400px) !important;
		border-right: 1px solid var(--border) !important;
	}
	div.sidepanel {
		background: var(--container);
		min-width: 0;
		width: 0;
		backdrop-filter: blur(20px);
		height: calc(100%);
		overflow-x: hidden;
		max-height: calc(100% - 2px);
		border-right: none;
		&.animating {
			transition:
				min-width 300ms,
				border 300ms;
		}
	}
	:global(div.sidepanel > *) {
		position: absolute;
		min-width: min(30vw, 400px);
		max-height: 100vh;
		:global(h2) {
			margin: 8px 8px 0;
		}
	}
</style>
