<script lang="ts">
	import { displayData, service, type Song } from "$lib/localStorage"
	import { onMount } from "svelte"
	import { menuBlur, send, recieve } from "$lib/transitions"
	import { blank, sidePanel, SidePanel, showMenu, editingSong } from "$lib/sharedState"
	import Sortable from "sortablejs"
	import Preview from "$lib/Preview.svelte"
	import SideBar from "$lib/side/Bar.svelte"
	import Panel from "$lib/side/Panel.svelte"
	import ContextMenu from "$lib/ContextMenu.svelte"
	import Lyrics from "$lib/Lyrics.svelte"

	let { data } = $props()

	let songs: Song[] = $state([])
	for (const song of data.songs) {
		songs[song.id] = structuredClone(song)
	}

	const keyChannel = new BroadcastChannel("key")
	keyChannel.addEventListener("message", (evt) => {
		evt.data.preventDefault = () => {}
		handleKey(evt.data)
	})

	let listElm: HTMLDivElement
	let sortable: Sortable
	onMount(() => {
		sortable = new Sortable(listElm, {
			animation: 300,
			ghostClass: "dragging",
			group: {
				name: "songs",
			},
			onEnd: recreateService,
			onAdd: recreateService,
		})
	})

	function recreateService() {
		$service = sortable.toArray().map((itm: string) => parseInt(itm))
		listElm.querySelector("button.added-song")?.remove()
	}

	let current = $state({ song: 0, lyric: 0 })
	let currentSongID = $derived($service[current.song])
	let currentSong = $derived(songs[$service[current.song]])

	$effect(() => {
		if (currentSongID) {
			document.querySelectorAll(".songs > div > button")?.item(current.song)?.scrollIntoView({ block: "center" })
			document.querySelectorAll(".lyrics > div > button")?.item(current.lyric)?.scrollIntoView({ block: "center" })
			if (!$blank) {
				displayData.set({
					name: currentSong.name ?? "",
					artist: currentSong.artist ?? "",
					lyric: currentSong.lyrics[current.lyric]!,
				})
			} else {
				displayData.set(null)
			}
		} else {
				displayData.set(null)
			}
	})

	$effect.pre(() => {
		current.song
		current.lyric = 0
	})

	function handleKey(evt: KeyboardEvent) {
		switch (evt.key) {
			case "d":
				open("/display", "_blank", "popup")
				break
			case "b":
				$blank = !$blank
				break
			case "ArrowLeft":
				evt.preventDefault()
				if ($service[current.song - 1 - (evt.shiftKey ? 1 : 0)]) current.song -= 1 + (evt.shiftKey ? 1 : 0)
				break
			case "ArrowRight":
				evt.preventDefault()
				if ($service[current.song + 1 + (evt.shiftKey ? 1 : 0)]) current.song += 1 + (evt.shiftKey ? 1 : 0)
				break
			case "ArrowUp":
				evt.preventDefault()
				if (currentSong.lyrics[current.lyric - 1 - (evt.shiftKey ? 1 : 0)]) current.lyric -= 1 + (evt.shiftKey ? 1 : 0)
				break
			case "ArrowDown":
				evt.preventDefault()
				if (currentSong.lyrics[current.lyric + 1 + (evt.shiftKey ? 1 : 0)]) current.lyric += 1 + (evt.shiftKey ? 1 : 0)
				break
			default:
				if (parseInt(evt.key) > 0 && songs[$service[current.song]].lyrics[parseInt(evt.key) - 1])
					current.lyric = parseInt(evt.key) - 1
				else if ($service[parseInt(evt.key.substring(1)) - 1]) current.song = parseInt(evt.key.substring(1)) - 1
		}
	}
</script>

<svelte:window onkeydown={handleKey} />

<div class="main">
	<SideBar />
	<div class="sidepanelcontainer {$sidePanel !== SidePanel.None ? 'sidepanelactive' : ''}">
		<Panel {songs} />
		<div class="console">
			<div class="songs">
				<div class="list" bind:this={listElm}>
					{#if $service}
						{#each $service as id, idx}
							<button data-id={id} onclick={() => (current.song = idx)} oncontextmenu={(evt) => showMenu(evt, id, idx)}>
								<kbd>F{idx + 1}</kbd>
								<div>
									<h3>{songs[id].name}</h3>
									<p>{songs[id].artist}</p>
									{#if current.song === idx}
										<div class="selector" in:recieve={{ key: "song" }} out:send={{ key: "song" }}></div>
									{/if}
								</div>
							</button>
						{/each}
					{/if}
				</div>
				{#if $editingSong && $editingSong != currentSongID}
					<p>Currently Editing:</p>
					<div class="list sticky">
						<div>
							<h3>{songs[$editingSong].name}</h3>
							<p>{songs[$editingSong].artist}</p>
						</div>
					</div>
				{/if}
			</div>
			<div class="lyrics">
				<Lyrics bind:current bind:songs bind:currentSong bind:currentSongID />
			</div>
			<div class="preview">
				<Preview />
			</div>
		</div>
	</div>
</div>

<ContextMenu />

<style>
	div.main {
		display: grid;
		grid-template-columns: 48px 1fr;
		div.sidepanelcontainer {
			position: relative;
			display: flex;
			grid-template-columns: 0px 100%;
			justify-content: space-between;
			div.console {
				display: grid;
				position: relative;
				grid-template-areas: "songs lyrics" "preview lyrics";
				grid-template-rows: 1fr 1fr;
				grid-template-columns: 1fr 1fr;
				height: calc(100vh - 24px);
				width: 100%;
				gap: 12px;
				margin: 12px;
				& > div {
					border: 1px solid var(--border);
					background-color: var(--container);
					border-radius: 8px;
					overflow: scroll;
					position: relative;
					&.songs {
						grid-area: songs;
						position: relative;
						& > .list:first-of-type {
						min-height: calc(100% - 105px)
						}
					}
					&.lyrics {
						grid-area: lyrics;
						position: relative;
					}
					&.preview {
						grid-area: preview;
					}
					.list {
						width: calc(100% - 16px);
						& > button {
							display: flex;
							align-items: center;
							&:hover {
								color: #b4b4b4;
							}
							kbd {
								color: gray;
								position: relative;
								margin-right: 8px;
								top: 50%;
							}
						}
					}
				}
			}
		}
	}
</style>
