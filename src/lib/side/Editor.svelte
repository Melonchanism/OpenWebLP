<script lang="ts">
	import { menuBlur } from "../transitions"
	import { menuID } from "$lib/sharedState"
	import { type Song, LyricType } from "$lib/localStorage"
	import { onDestroy, onMount, tick } from "svelte"
	import _ from "lodash"
	import { songs } from "$lib/sharedState"
	import Sortable from "sortablejs"

	let editingSong = $state(
		structuredClone($state.snapshot($songs.find((song) => song.id === $menuID)))
	)!
	$effect(() => {
		editingSong = structuredClone($state.snapshot($songs.find((song) => song.id === $menuID)))!
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
	onDestroy(() => {
		onbeforeunload = null
	})
	$effect(() => {
		if (
			_.isEqual(
				$state.snapshot(editingSong),
				$state.snapshot($songs.find((song) => song.id === $menuID))
			)
		)
			onbeforeunload = null
		else onbeforeunload = (evt) => evt.preventDefault()
	})
	function reorderLyrics() {
		editingSong.lyrics = sortable
			.toArray()
			.filter((itm) => !/[A-Za-z]/.test(itm))
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
		if (editingSong.id !== -1) $songs[$songs.findIndex((song) => song.id === $menuID)] = editingSong
		else {
			const id = await response.json()
			editingSong.id = id
			$menuID = id
			console.log(editingSong.id)
			$songs[$songs.findIndex((song) => song.id === -1)] = editingSong
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
	<div class="lyrics">
		<div
			class="header"
			style:background="linear-gradient(rgb(14, 14, 14), 90%, rgb(14, 14, 14, 0.1))"
		>
			<div class="actionbar" style:grid-template-columns="60px 1fr">
				<p>Name:</p>
				<input
					onkeydown={handleKeyOnInput}
					bind:value={editingSong.name}
					placeholder="Song Title"
				/>
			</div>
			<div class="actionbar" style:grid-template-columns="60px 1fr">
				<p>Artist:</p>
				<input
					onkeydown={handleKeyOnInput}
					bind:value={editingSong.artist}
					placeholder="Writer"
					list="artists"
				/>
			</div>
			<datalist id="artists">
				{#each [...new Set($songs.map((song) => song.artist))].toSorted() as artist}
					<option value={artist}>{artist}</option>
				{/each}
			</datalist>
		</div>
		<div class="list" bind:this={listElm}>
			{#each editingSong.lyrics as lyric, idx (Math.random())}
				<div class="lyric" data-id={idx}>
					<div class="grip"><i class="bi bi-grip-vertical"></i></div>
					<div class="contents">
						<div class="actionbar" style:grid-template-columns="auto auto auto 1fr">
							<select bind:value={lyric.type}>
								{#each Object.values(LyricType) as type}
									<option value={type}>{type}</option>
								{/each}
							</select>
							<input bind:value={lyric.number} type="number" />
							<button
								aria-label="Remove"
								style="color: rgb(150, 70, 90); border: 1px solid currentColor;"
								onclick={() => editingSong.lyrics.splice(idx, 1)}
							>
								<i class="bi bi-trash2"></i>
							</button>
						</div>
						<div class="grow-wrap" data-replicated-value={lyric.text}>
							<textarea
								placeholder="Lyric Content"
								onkeydown={handleKeyOnInput}
								bind:value={lyric.text}
							></textarea>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="actionbar bottom">
			<button
				onclick={async () => {
					editingSong.lyrics.push({
						type: LyricType.verse,
						number: 1,
						text: "",
					})
					await tick()
					listElm.lastElementChild?.scrollIntoView()
				}}
			>
				<h3><i class="bi bi-plus-square"></i> Add Lyric</h3>
			</button>
		</div>
	</div>
	<div class="footer">
		<button style="border: 1px solid currentColor; color: darkolivegreen" onclick={save}
			><i class="bi bi-save2"></i> Save</button
		>
		<button
			style="border: 1px solid currentColor; color: peru;"
			onclick={() =>
				(editingSong = structuredClone(
					$state.snapshot($songs.find((song) => song.id === $menuID)!)
				))}><i class="bi bi-arrow-counterclockwise"></i> Revert</button
		>
	</div>
</div>

<style lang="scss">
	div.sidepanelcontent {
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 8px;
		h2 {
			margin-bottom: 0 !important;
		}
		div.header {
			position: sticky;
			top: 0;
			z-index: 3;
			display: flex;
			flex-direction: column;
		}
		div.lyrics {
			display: flex;
			flex-direction: column;
			overflow: scroll;
			div.list,
			div.actionbar {
				margin: -4px 0;
				padding: 8px;
				p {
					color: gray;
				}
			}
		}
		div.footer {
			display: flex;
			gap: 8px;
			margin: 0 8px;
			button {
				padding: 4px;
				border-radius: 8px;
			}
		}
	}
	:global(div.lyric) {
		display: grid;
		grid-template-columns: auto 1fr;
		div.grip {
			display: flex;
			align-items: center;
			cursor: grab;
			font-size: 1.5em;
		}
		div.contents {
			div.actionbar {
				z-index: 1;
				padding-left: 0;
			}
			.grow-wrap {
				display: grid;
				&::after {
					content: attr(data-replicated-value) " ";
					visibility: hidden;
					white-space: pre-wrap;
				}
				textarea {
					resize: none;
					border-radius: 8px;
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
