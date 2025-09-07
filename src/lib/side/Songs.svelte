<script lang="ts">
	import { onMount } from "svelte"
	import { flip } from "svelte/animate"
	import { menuBlur } from "$lib/transitions"
	import Sortable from "sortablejs"
	import { menuID, sidePanel, SidePanel, songs, showMenu } from "$lib/sharedState"
	import { blur } from "svelte/transition"

	enum SearchType {
		Name = "Name",
		Artist = "Artist",
		Lyrics = "Lyrics",
	}

	let searchVal = $state("")
	let processedVal = $derived(cleanString(searchVal))
	let searchType = $state(SearchType.Name)

	function cleanString(string: string) {
		return string.toLowerCase().replace(/\W/g, "")
	}

	let sortedSongs = $derived(
		$songs
			.toSorted((itm1, itm2) => (itm1.name.toLowerCase() > itm2.name.toLowerCase() ? 1 : -1))
			.filter((itm) => {
				switch (searchType) {
					case SearchType.Name:
						return cleanString(itm.name).startsWith(processedVal)
						break
					case SearchType.Artist:
						return cleanString(itm.artist).toLowerCase().startsWith(processedVal)
						break
					case SearchType.Lyrics:
						for (const lyric of itm.lyrics) {
							if (cleanString(lyric.text).includes(processedVal)) return true
						}
						return false
						break
				}
			})
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
	<div class="songs">
		<div class="actionbar top">
			<input
				bind:value={searchVal}
				onkeydowncapture={(evt) => evt.stopPropagation()}
				type="text"
				placeholder="Search..."
			/>
			<select bind:value={searchType}>
				{#each Object.values(SearchType) as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
			<button
				style="width: auto !important"
				aria-label="New Song"
				onclick={() => {
					$songs.push({
						id: -1,
						artist: "",
						name: "",
						lyrics: [],
						lastUpdated: null,
					})
					$menuID = -1
					$sidePanel = SidePanel.Editor
				}}
			>
				<h3><i class="bi bi-file-earmark-plus"></i></h3>
			</button>
		</div>
		<div bind:this={listElm} class="list">
			{#each sortedSongs as item (item.id)}
				<button
					class="added-song"
					animate:flip={{ duration: 200 }}
					transition:blur={{ duration: 100 }}
					data-id={item.id}
					oncontextmenu={(evt) => showMenu(evt, item.id)}
				>
					<h3>{item.name}</h3>
					<p>{item.artist}</p>
				</button>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	div.sidepanelcontent {
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr;
		div.actionbar {
			display: grid;
			grid-template-columns: 1fr auto auto;
		}
		div.songs {
			overflow: scroll;
			div.list {
				margin: 0;
				padding: 0 8px 8px 8px;
			}
		}
	}
</style>
