<script lang="ts">
	import Sortable from "sortablejs"
	import { onMount } from "svelte"
	import { flip } from "svelte/animate"
	import { menuBlur } from "$lib/transitions"
	import type { Song } from "$lib/localStorage"
	let { songs }: { songs: Song[] } = $props()

	let searchVal = $state("")

	let sortedSongs = $derived(
		songs
			.toSorted((itm1, itm2) => (itm1.name > itm2.name ? 1 : -1))
			.filter((itm) => itm.name.toLowerCase().startsWith(searchVal.toLowerCase())),
	)

	let listElm: HTMLDivElement
	onMount(() => {
		let sortable = new Sortable(listElm, {
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
		<input bind:value={searchVal} onkeydown={(evt) => evt.stopPropagation()} type="text" placeholder="Search..." />
	</div>
	<div bind:this={listElm} class="list">
		{#each sortedSongs as item (item.id)}
			<button
				class="added-song"
				animate:flip={{ duration: 300 }}
				transition:menuBlur
				data-id={item.id}
				oncontextmenu={(evt) => {
					evt.preventDefault()
				}}
				onselect={(evt) => {
					evt.preventDefault()
				}}
			>
				<h3>{item.name}</h3>
				<p>{item.artists.reduce((carry, artist) => `${carry}, ${artist}`)}</p>
			</button>
		{/each}
	</div>
</div>

<style>
	div.sidepanelcontent {
		h2 {
			margin: 8px;
		}
		input {
			border-radius: 8px;
			padding: 4px;
			margin-left: 8px;
			width: calc(100% - 24px);
		}
	}
</style>
