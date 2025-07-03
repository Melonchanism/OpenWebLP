<script lang="ts">
	import { fade } from "svelte/transition"
	import { showMenu, menuPos, menuID, sidePanel, SidePanel } from "$lib/sharedState"
	import type { Song } from "./localStorage"
	import { clickoutside } from "@svelte-put/clickoutside"
	let { data }: { data: { songs: Song[] } } = $props()

	function editSong() {
		$showMenu = false
		$sidePanel = SidePanel.Editor
	}
</script>

{#if $showMenu}
	<div
		class="list"
		style={`top: ${$menuPos.y - 10}px; left: ${$menuPos.x - 10}px;`}
		out:fade={{ duration: 150 }}
		use:clickoutside
		onclickoutside={() => ($showMenu = false)}
	>
		<p>{data.songs.find((song) => song.id === $menuID)?.name}</p>
		<button onmouseup={editSong} onclick={editSong}>
			<i class="bi bi-pencil"></i>
			<p>Edit Song</p>
		</button>
	</div>
{/if}

<style>
	div.list {
		border: 1px var(--border) solid;
		border-radius: 8px;
		background: rgba(32, 32, 32, 0.7);
		backdrop-filter: blur(20px);
		position: fixed;
		z-index: 5;
		padding: 2px;
		& > * {
			display: flex;
			background: none;
			border-radius: 8px;
			padding: 4px;
			&::after {
				width: calc(100% - 8px);
			}
		}
		& > p {
			color: gray;
		}
		& > button:hover {
			transition: background 0ms;
			background: var(--selector);
		}
	}
</style>
