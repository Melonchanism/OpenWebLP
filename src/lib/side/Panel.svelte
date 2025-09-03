<script lang="ts">
	import { fly } from "svelte/transition"
	import { cubicInOut } from "svelte/easing"
	import Settings from "$lib/side/Settings.svelte"
	import Songs from "$lib/side/Songs.svelte"
	import Editor from "$lib/side/Editor.svelte"
	import type { Song } from "$lib/localStorage"
	import { SidePanel, sidePanel, songs } from "$lib/sharedState"

	$effect.pre(() => {
		console.log($songs)
	})
</script>

{#if sidePanel}
	<!-- Let the panel stay for a bit after it disappears -->
	<div transition:fly={{ duration: 300, easing: cubicInOut, opacity: 1 }} class="sidepanel">
		{#if $sidePanel === SidePanel.Songs}
			<Songs />
		{:else if $sidePanel === SidePanel.Settings}
			<Settings />
		{:else if $sidePanel === SidePanel.Editor}
			<Editor />
		{/if}
	</div>
{/if}

<style lang="scss">
	div.sidepanel {
		position: absolute;
		margin: 8px;
		left: calc(-50% - 12px);
		top: -8px;
		background: rgb(14, 14, 14);
		backdrop-filter: blur(20px);
		width: calc(50% - 6px);
		height: calc(100% - 2px);
		max-height: calc(100% - 2px);
		border: 1px solid var(--border);
		border-radius: 8px;
	}
	:global(div.sidepanel > *) {
		position: absolute;
		width: 100%;
		height: calc(100% - 2px);
		:global(h2) {
		margin: 8px 8px 0;
		}
	}
</style>
