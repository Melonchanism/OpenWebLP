<script lang="ts">
	import { send, recieve, menuBlur, menuFade } from "./transitions"
	import { LyricType, type Song } from "./localStorage"
	import { edit, editing, editingSong, save } from "./sharedState"
	import { slide } from "svelte/transition"
	import { onMount, tick } from "svelte";
	import Sortable from "sortablejs";

	let {
		current = $bindable(),
		songs = $bindable(),
		currentSong = $bindable(),
		currentSongID = $bindable(),
	}: { current: { song: number; lyric: number }; songs: Song[]; currentSong: Song; currentSongID: number } = $props()

	let lyricsList: HTMLDivElement
	let sortable: Sortable
	onMount(() => {
		sortable = new Sortable(lyricsList, {
			animation: 300,
			ghostClass: "dragging",
			handle: ".grip",
			onEnd: reorderLyrics,
		})
	})
	async function reorderLyrics() {
		songs[$editingSong!].lyrics = sortable
			.toArray()
			.filter((itm) => !/[A-Za-z]/.test(itm))
			.map((idx) => structuredClone($state.snapshot(songs[$editingSong!].lyrics[parseInt(idx)])))
		await tick()
		document.querySelectorAll(".lyricinnertext").forEach((elem) => {
			elem.setAttribute("contenteditable", $editing ? "true" : "false")
		})
	}

	function handleKeyOnInput(evt: Event) {
		if ($editing) evt.stopPropagation()
	}

	$effect(() => {
		$editing
		current.song
		document.querySelectorAll(".lyricinnertext").forEach((elem) => {
			elem.setAttribute("contenteditable", $editing ? "true" : "false")
		})
	})
</script>

<div class={$editing ? "editing" : ""}>
	{#if currentSong?.lyrics != null || $editingSong}
		{#if $editing}
			<div class="header" transition:slide>
				<div>
					<p>Name:</p>
					<input onkeydown={handleKeyOnInput} bind:value={songs[$editingSong!].name} placeholder="Song Title..." />
				</div>
				<div>
					<p>Artist:</p>
					<input
						onkeydown={handleKeyOnInput}
						type="text"
						bind:value={songs[$editingSong!].artist}
						placeholder="Song Artist..."
						list="artists"
					/>
				</div>
				<div>id: {songs[$editingSong!].id}</div>
				<datalist id="artists">
					{#each [...new Set(songs
								.filter((itm) => itm !== currentSong)
								.map((song) => song.artist))].toSorted() as artist}
						<option value={artist}></option>
					{/each}
				</datalist>
			</div>
		{/if}
		{#key $editing ? songs[$editingSong ?? 0] : currentSong}
			<div class="list" bind:this={lyricsList} transition:menuBlur>
				{#each $editingSong ? songs[$editingSong].lyrics : currentSong.lyrics as lyric, idx (idx)}
					<button onclick={() => (current.lyric = idx)} data-id={idx}>
						<div class="sideindicator">
							{#if $editing}
								<kbd class="grip" transition:menuFade><i class="bi bi-grip-vertical"></i></kbd>
							{:else}
								<kbd transition:menuFade>{idx + 1}</kbd>
							{/if}
						</div>
						<div>
							<div class="lyricheader">
								{#if $editing}
									<div in:recieve={{ key: idx }} out:send={{ key: idx }}>
										<select bind:value={lyric.type}>
											{#each Object.values(LyricType) as type}
												<option value={type}>{type}</option>
											{/each}
										</select>
										<div class="numberinput">
											<input style:grid-area="input" type="number" bind:value={lyric.number} min="1" max="100" />
											<!-- svelte-ignore node_invalid_placement_ssr -->
											<button
												style:grid-area="plus"
												onclick={(evt) => {
													evt.stopPropagation()
													lyric.number++
												}}>+</button
											>
											<!-- svelte-ignore node_invalid_placement_ssr -->
											<button
												style:grid-area="minus"
												onclick={(evt) => {
													evt.stopPropagation()
													lyric.number--
												}}>-</button
											>
										</div>
									</div>
								{:else}
									<h3 in:recieve={{ key: idx }} out:send={{ key: idx }}>{lyric.type} {lyric.number}</h3>
								{/if}
							</div>
							{#if current.lyric === idx}
								<div class="selector" in:recieve={{ key: "lyric" }} out:send={{ key: "lyric" }}></div>
							{/if}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<p
								class="lyricinnertext {$editing ? 'editing' : ''}"
								contenteditable="false"
								onclick={handleKeyOnInput}
								onkeydown={handleKeyOnInput}
								bind:innerText={lyric.text}
							></p>
						</div>
					</button>
				{/each}
			</div>
		{/key}
	{/if}
	{#if $editing}
		<button
			class="addbutton"
			onclick={async () => {
				songs[$editingSong!].lyrics.push({
					type: LyricType.verse,
					number: 1,
					text: "",
					})
				await tick()
				document.querySelectorAll(".lyricinnertext").forEach((elem) => {
					elem.setAttribute("contenteditable", $editing ? "true" : "false")
				})
			}}
			>
			<span>Add Lyric</span>
		</button>
	{/if}
	<button
		class="editbutton"
		onclick={() => {
			!$editing ? edit(currentSongID) : save(songs[$editingSong!])
		}}>{$editing ? "Done" : "Edit"}</button
	>
</div>

<style>
	.header {
		padding: 8px 8px 0 8px;
		input {
			padding: 8px;
			border-radius: 8px;
		}
	}

	.list {
		width: calc(100% - 16px);
		position: absolute;
		padding-bottom: 60px;
		& > button {
			display: grid;
			grid-template-columns: 20px auto;
			align-items: center;
			&:hover {
				color: #b4b4b4;
			}
			.sideindicator {
				width: 20px;
				position: relative;
				* {
					position: absolute;
					top: 50%;
					translate: 0 -50%;
					left: 0;
					color: gray;
				}
			}

			h3,
			select,
			.numberinput {
				transition: padding 300ms;
			}
			.lyricheader {
				height: 24px;
				transition: height 300ms;
				& > * {
					position: absolute;
					display: flex;
				}
			}
			p {
				transition:
					padding 300ms,
					background 300ms;
				border-radius: 8px;
				z-index: 99;
				:global(&[contenteditable="true"]) {
					min-height: 10px;
					padding: 8px;
					color: white;
					border: 1px var(--border-subtle) solid;
					caret-color: slategray;
				}
			}
		}
	}
	.editing {
		h3,
		select {
			padding: 8px;
			border-radius: 8px;
		}
		.lyricheader {
			height: 42px !important;
			padding-bottom: 4px;
		}
	}

	.editbutton, .addbutton {
		position: fixed;
		bottom: 24px;
		padding: 8px;
		border: 1px solid var(--border);
		background: var(--element);
		border-radius: 8px;
		box-shadow: 0 4px 24px var(--container);
	}

	.editbutton {
		right: 24px;
	}

	.addbutton {
		left: calc(50vw + 16px + 24px);
	}

	div.numberinput {
		display: grid;
		grid-template-areas: "input plus" "input minus";
		grid-template-columns: 1fr 30px;
		button:first-of-type {
			border-radius: 0 8px 0 0;
		}
		button:last-of-type {
		border-top: none;
			border-radius: 0 0 8px 0;
		}
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			display: none;
			-webkit-appearance: none;
			margin: 0;
		}
		input {
			border-radius: 8px 0 0 8px;
			border-right: none;
			padding-left: 8px;
			margin-left: 6px;
		}
	}
</style>
