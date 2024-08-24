<script lang="ts">
	import { menuBlur } from "../transitions"
	import { menuID } from "$lib/contextMenu"
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
		})
	})

	function reorderLyrics() {
		editingSong.lyrics = sortable.toArray().map((idx) => editingSong.lyrics[parseInt(idx)])
	}

	async function save() {
		songs[songs.findIndex((song) => song.id === $menuID)] = editingSong
		const response = await fetch("edit", {
			method: "POST",
			body: JSON.stringify($state.snapshot(editingSong)),
			headers: {
				"Content-Type": "application/json",
			},
		})
	}
</script>

<div transition:menuBlur class="sidepanelcontent">
	<h2>Edit Song</h2>
	{#if $menuID !== -1}
		<div class="editor">
			<div class="inputgroup">
				<span>Title: </span>
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
							</div>
							<div class="grow-wrap">
								<textarea
									oninput={function () {
										this.parentNode.dataset.replicatedValue = this.value
									}}
									onclick={function () {
										this.parentNode.dataset.replicatedValue = this.value
									}}
									onkeydown={(evt) => evt.stopPropagation()}
									bind:value={lyric.text}
								></textarea>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="footer">
				<button style="background-color: darkolivegreen;" onclick={save}><i class="bi bi-save2"></i> Save</button>
				<button style="background-color: brown;"><i class="bi bi-x-lg"></i> Cancel</button>
			</div>
		</div>
	{/if}
</div>

<style>
	div.editor {
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		height: calc(100vh - 28px - 16px - 24px + 6px);
		gap: 8px;
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
							min-height: 100px;
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
