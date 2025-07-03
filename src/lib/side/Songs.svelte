<script lang="ts">
	import { onMount } from "svelte"
	import { flip } from "svelte/animate"
	import { menuBlur } from "$lib/transitions"
	import type { Song } from "$lib/localStorage"
	import Sortable from "sortablejs"
	let { songs = $bindable() }: { songs: Song[] } = $props()
	import { showMenu, menuPos, menuID, sidePanel, SidePanel } from "$lib/sharedState"

	let searchVal = $state("")

	let sortedSongs = $derived(
		songs
			.toSorted((itm1, itm2) => (itm1.name.toLowerCase() > itm2.name.toLowerCase() ? 1 : -1))
			.filter((itm) => itm.name.toLowerCase().startsWith(searchVal.toLowerCase())),
	)

	let listElm: HTMLDivElement
	onMount(() => {
		new Sortable(listElm, {
			animation: 300,
			ghostClass: "dragging",
			group: {
				name: "songs",
				pull: "clone",
				put: false,
			},
			sort: false,
		})
	})
</script>

<div transition:menuBlur class="sidepanelcontent">
	<h2>Songs</h2>
	<div>
		<input bind:value={searchVal} onkeydowncapture={(evt) => evt.stopPropagation()} type="text" placeholder="Search..." />
	</div>
	<div class="songs">
		<div bind:this={listElm} class="list" style="overflow: scroll">
			{#each sortedSongs as item (item.id)}
				<button
					class="added-song"
					animate:flip={{ duration: 300 }}
					transition:menuBlur
					data-id={item.id}
					oncontextmenu={(evt) => {
						evt.preventDefault()
						$menuID = item.id
						$showMenu = true
						$menuPos = { x: evt.clientX, y: evt.clientY }
					}}
				>
					<h3>{item.name}</h3>
					<p>{item.artist}</p>
				</button>
			{/each}
		</div>
		<div class="list" style="margin-top: 0;">
			<button
				onclick={() => {
					songs.push({
						id: -1,
						artist: "",
						name: "",
						lyrics: [],
					})
					$menuID = -1
					$sidePanel = SidePanel.Editor
				}}
			>
				<h3><i class="bi bi-plus-square"></i> New Song</h3>
			</button>
		</div>
	</div>
</div>

<style>
	div.sidepanelcontent {
		height: 100%;
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		input {
			border-radius: 8px;
			padding: 4px;
			margin: 0 8px 8px;
			width: calc(100% - 24px);
		}
		div.songs {
			overflow: scroll;
			div.list {
				margin: 0;
				padding: 0 8px;
				&:nth-child(2) {
					position: sticky;
					z-index: 2;
					padding: 8px 0;
					margin: 0 8px;
					position: sticky;
					bottom: 0;
					background: rgb(14, 14, 14);
				}
			}
		}
	}
</style>
