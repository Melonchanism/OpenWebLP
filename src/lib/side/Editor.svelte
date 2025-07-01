<script lang="ts">
	import { menuBlur } from "../transitions"
	import { menuID } from "$lib/sharedState"
	import { type Song, LyricType } from "$lib/localStorage"
	import { onDestroy, onMount } from "svelte"
	import _ from "lodash"
	import Sortable from "sortablejs";

	let { songs = $bindable() }: { songs: Song[] } = $props()

	let editingSong = $state(structuredClone($state.snapshot(songs.find((song) => song.id === $menuID))))!
	$effect(() => {
		editingSong = structuredClone($state.snapshot(songs.find((song) => song.id === $menuID)))!
	})

	// To-do: use svelte-dnd-action while preserving ids somehow with 0% chance of failiure
	let listElm: HTMLDivElement
	let sortable: Sortable
	onMount(() => {
		sortable = new Sortable(listElm, {
			animation: 300,
			ghostClass: "dragging",
			handle: ".grip",
			onEnd: reorderLyrics,
		})
	})
	// try {overrideItemIdKeyNameBeforeInitialisingDndZones("text")} catch(e) {}
	// const flipDurationMs = 300;
	// function handleDndConsider(evt) {
	// 	editingSong.lyrics = evt.detail.items;
	// }
	// function handleDndFinalize(evt) {
	// 	editingSong.lyrics = evt.detail.items;
 //  }
	onDestroy(() => {
		onbeforeunload = null
	})
	$effect(() => {
		if (_.isEqual($state.snapshot(editingSong), $state.snapshot(songs.find((song) => song.id === $menuID)))) onbeforeunload = null
		else onbeforeunload = evt => evt.preventDefault()
	})
	function reorderLyrics() {
		editingSong.lyrics = sortable
		.toArray()
		.filter(itm => !/[A-Za-z]/.test(itm))
		.map((idx) => structuredClone($state.snapshot(editingSong.lyrics[parseInt(idx)])))
	}

	function handleKeyOnInput(evt: KeyboardEvent) {
		if (!evt.ctrlKey && !evt.metaKey) evt.stopPropagation()
	}

	async function save() {
		const response = await fetch("edit", {
			method: "POST",
			body: JSON.stringify($state.snapshot(editingSong)),
			headers: {
				"Content-Type": "application/json",
			},
		})
		if (editingSong.id !== -1) songs[songs.findIndex((song) => song.id === $menuID)] = editingSong
		else {
		  editingSong.id = await response.json()
			console.log(editingSong.id)
		  songs[songs.findIndex((song) => song.id === -1)] = editingSong
		}
		alert("Saved")
	}
</script>

<svelte:window
 onkeydowncapture={(evt: KeyboardEvent) => {
   if ((evt.ctrlKey || evt.metaKey) && evt.key === "s") {
     evt.stopImmediatePropagation()
     evt.preventDefault()
     save()
   }
 }}
  />

<div transition:menuBlur class="sidepanelcontent">
	<h2>Edit Song</h2>
	{#if $menuID !== null}
			<input onkeydown={handleKeyOnInput} bind:value={editingSong.name} placeholder="Song Title" />
			<input onkeydown={handleKeyOnInput} bind:value={editingSong.artist} placeholder="Artists" list="artists" />
			<datalist id="artists">
				{#each [...new Set(songs.map(song => song.artist))].toSorted() as artist}
				  <option value={artist}>{artist}</option>
				{/each}
			</datalist>
			<div class="lyrics">
			<div class="list" bind:this={listElm}>
				{#each editingSong.lyrics as lyric, idx (Math.random())}
					<div class="lyric" data-id={idx} >
						<div class="grip"><i class="bi bi-grip-vertical"></i></div>
						<div class="contents">
							<div class="metadata">
								<select bind:value={lyric.type}>
									{#each Object.values(LyricType) as type}
										<option value={type}>{type}</option>
									{/each}
								</select>
								<input bind:value={lyric.number} type="number" />
								<button style="color: rgb(150, 70, 90); border: 1px solid currentColor;" onclick={() => editingSong.lyrics.splice(idx, 1)}>
									<i class="bi bi-trash3"></i> Remove
								</button>
							</div>
							<div class="grow-wrap" data-replicated-value={lyric.text}>
								<textarea placeholder="Lyric Content" onkeydown={handleKeyOnInput} bind:value={lyric.text}></textarea>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="list">
				<button
					onclick={() => {
						editingSong.lyrics.push({
							type: LyricType.verse,
							number: 1,
							text: "",
						})
					}}
				>
					<h3><i class="bi bi-plus-square"></i> Add Lyric</h3>
				</button>
			</div>
			</div>
			<div class="footer">
				<button style="background-color: darkolivegreen;" onclick={save}><i class="bi bi-save2"></i> Save</button>
				<button style="background-color: peru;" onclick={() => editingSong = structuredClone($state.snapshot(songs.find((song) => song.id === $menuID)))}><i class="bi bi-arrow-counterclockwise"></i> Revert</button>
			</div>
	{/if}
</div>

<style>
	div.sidepanelcontent {
		display: grid;
		grid-template-rows: auto auto auto 1fr auto;
		gap: 8px;
		h2 {
		  margin-bottom: 0 !important;
		}
		& > input {
			border-radius: 8px;
			width: calc(100% - 16px);
			margin: 0 8px;
			overflow: hidden;
			background: var(--element);
			font-size: 1.2em;
			padding: 2px;
		}
		div.lyrics {
			overflow: scroll;
			div.list {
			margin: 0;
			padding: 0 8px;
			&:nth-child(2) {
				padding-top: 8px;
				position: sticky;
				bottom: 0;
				background: rgb(14, 14, 14);
				z-index: 2;
				button {
					border-radius: 8px;
				}
			}
			}
		}
		div.footer {
			display: flex;
			gap: 8px;
			margin: 0 8px 8px;
			button {
				padding: 4px;
				border-radius: 8px;
			}
		}
	}
	:global(div.lyric) {
		display: grid;
		grid-template-columns: auto 1fr;
		position: relative;
		div.grip {
			display: flex;
			align-items: center;
			height: 100%;
			cursor: grab;
			i.bi-grip-vertical {
				font-size: 1.5em;
			}
		}
		div.contents {
			div.metadata {
				display: flex;
				margin-bottom: 4px;
				gap: 8px;
				input {
					width: 50px;
				}
				* {
					padding: 4px;
					border-radius: 8px;
				}
			}
			.grow-wrap {
				display: grid;
				&::after {
					content: attr(data-replicated-value) " ";
					white-space: pre-wrap;
					visibility: hidden;
				}
				textarea {
					resize: none;
					border-radius: 8px;
					overflow: hidden;
				}
				&::after,
				textarea {
					width: calc(100% - 8px - 2px);
					border: 1px var(--border-subtle) solid;
					min-height: 70px;
					padding: 4px;
					font: inherit;
					grid-area: 1 / 1 / 2 / 2;
				}
			}
		}
	}
</style>
