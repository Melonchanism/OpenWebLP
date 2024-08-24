<script lang="ts">
	import { menuBlur } from "../transitions"
	import { menuID } from "$lib/sharedState"
	import { type Song, LyricType } from "$lib/localStorage"
	import { onMount } from "svelte"
	import Sortable from "sortablejs"

	let { songs = $bindable() }: { songs: Song[] } = $props()

	let editingSong = $state(structuredClone($state.snapshot(songs.find((song) => song.id === $menuID))))!
	$effect(() => {
		editingSong = structuredClone($state.snapshot(songs.find((song) => song.id === $menuID)))!
	})

	let listElm: HTMLDivElement
	let sortable: Sortable
	onMount(() => {
		sortable = new Sortable(listElm, {
			animation: 300,
			ghostClass: "dragging",
			handle: ".grip",
			onEnd: reorderLyrics,
			removeOnSpill: true,
		})
	})

	function reorderLyrics() {
		editingSong.lyrics = sortable.toArray().map((idx) => structuredClone($state.snapshot(editingSong.lyrics[parseInt(idx)])))
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
	}
</script>

<div transition:menuBlur class="sidepanelcontent">
	<h2>Edit Song</h2>
	{#if $menuID !== null}
			<div class="inputgroup">
				<span>Song Name: </span>
				<input type="text" onkeydown={(evt) => evt.stopPropagation()} bind:value={editingSong.name} />
			</div>
			<div class="inputgroup">
				<span>Artist(s): </span>
				<input type="text" onkeydown={(evt) => evt.stopPropagation()} bind:value={editingSong.artist} />
			</div>
			<div class="list" bind:this={listElm}>
				{#each editingSong.lyrics as lyric, idx (Math.random())}
					<div class="lyric" data-id={idx}>
						<div class="grip"><i class="bi bi-grip-vertical"></i></div>
						<div class="contents">
							<div class="metadata">
								<select bind:value={lyric.type}>
									{#each Object.values(LyricType) as type}
										<option value={type}>{type}</option>
									{/each}
								</select>
								<input bind:value={lyric.number} type="number" />
								<button style="color: rgb(150, 50, 20); border: 1px solid currentColor;" onclick={() => editingSong.lyrics.splice(idx, 1)}>
									<i class="bi bi-trash3"></i> Remove
								</button>
							</div>
							<div class="grow-wrap" data-replicated-value={lyric.text}>
								<textarea onkeydown={(evt) => evt.stopPropagation()} bind:value={lyric.text}></textarea>
							</div>
						</div>
					</div>
				{/each}
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
			<div class="footer">
				<button style="background-color: darkolivegreen;" onclick={save}><i class="bi bi-save2"></i> Save</button>
				<button style="background-color: peru;" onclick={() => editingSong = structuredClone($state.snapshot(songs.find((song) => song.id === $menuID)))!}><i class="bi bi-arrow-counterclockwise"></i> Revert</button>
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
		div.inputgroup {
			border-radius: 8px;
			width: calc(100% - 16px);
			margin: 0 8px;
			display: grid;
			grid-template-columns: auto 1fr;
			overflow: hidden;
			font-size: 20px;
			span {
				color: gray;
				background: var(--stacked-element);
			}
			input {
				font-size: 1em;
				width: calc(100% - 4px);
			}
			* {
				padding: 2px;
			}
		}
		div.list {
			margin: 0;
			padding: 0 8px;
			overflow: scroll;
			border-radius: 0;
			div.lyric {
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
</style>
