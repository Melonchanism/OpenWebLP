<script lang="ts">
import currentSongsStore from "./currentSongs";
// import songsStore from "./allSongs";
import songs from "$lib/example.json"
import { onMount } from "svelte";
import Menu from "./Menu.svelte";
import { fade } from "svelte/transition";
const channel = new BroadcastChannel("lyrics");
let currentSong = 0;
let currentLyric = 0;
let loaded = false;
let showMenu = false;
$: currentSongs = $currentSongsStore;
// $: songs = $songsStore;
onMount(() => loaded = true);
channel.addEventListener("message", evt => {
	if (evt.data.type === "fetch") {
		channel.postMessage({
			type: "lyrics",
			message: currentSongs[currentSong]?.lyrics[currentLyric]?.split("\n").slice(1).join("\n") ?? "OpenWebLp"
		});
	} else if (evt.data.type === "keypress") {
		handeKey(evt.data.message);
	} else if (evt.data.type === "aspectratio") document.querySelector("iframe")!.style.aspectRatio = evt.data.message;
});
function handeKey(evt: { preventDefault?: () => any; key: string; }) {
	evt.preventDefault && (evt.key === "ArrowUp" || evt.key === "ArrowDown") ? evt.preventDefault() : null;
	switch (evt.key) {
		case "ArrowUp":
			currentSongs[currentSong]?.lyrics[currentLyric - 1] ? currentLyric-- : null;
			break;
		case "ArrowDown":
			currentSongs[currentSong]?.lyrics[currentLyric + 1] ? currentLyric++ : null;
			break;
		case "ArrowLeft":
			currentSongs[currentSong - 1]?.lyrics[0] ? currentSong-- : null;
			break;
		case "ArrowRight":
			currentSongs[currentSong + 1]?.lyrics[0] ? currentSong++ : null;
			break;
		case "f":
			channel.postMessage({ type: "fullscreen" });
			break;
		case "d":
			evt.preventDefault ? open("/display", "_blank", "popup") : null;
			break;
		case "m":
			showMenu = true;
			break;
		case "Escape":
			evt.preventDefault ? showMenu = false : null;
			break;
	}
};
$: if (currentLyric !== -1 && currentSongs[0]  && loaded) {
	let songElems = document.querySelectorAll(".song");
	let lyricElems = document.querySelectorAll(".lyric");
	lyricElems.forEach(elem => {
		elem.ariaCurrent = "false";
	});
	if (lyricElems.length > 0) {
		lyricElems[currentLyric]!.ariaCurrent = "true";
		lyricElems[currentLyric]!.scrollIntoView({ behavior: "smooth", block: "center" });
		songElems.forEach(elem => {
			elem.ariaCurrent = "false";
		});
		songElems[currentSong].ariaCurrent = "true";
		channel.postMessage({
			type: "lyrics",
			message: currentSongs[currentSong].lyrics[currentLyric].split("\n").slice(1).join("\n")
		});
	} else {
		setTimeout(() => {
			currentLyric = 1;
			currentLyric = 0;
		}, 100);
	}
};
$: if (currentSong !== -1) currentLyric = 0;
</script>

<svelte:window on:keydown={handeKey} />

<div class="main">
	<div class="secondary">
		<div class="songs">
			<ul>
				<hr>
				{#if currentSongs[0]}
					{#each currentSongs as song}
						<li class="song" on:click|preventDefault={evt => {
							currentSong = Array.from(document.querySelectorAll(".song")).indexOf(evt.target);
							currentLyric = 0;
						}}>{song.name}</li>
						<hr>
					{/each}
				{:else}
					<h1>No songs</h1>
				{/if}
			</ul>
		</div>
		<iframe class="preview" src="/display" style="aspect-ratio: 16/9" />
	</div>
	<div class="secondary">
		<ul>
			<hr>
			{#if currentSongs[0]}
				{#each currentSongs[currentSong].lyrics as lyric}
					<li class="lyric" on:click|preventDefault={evt => currentLyric = Array.from(document.querySelectorAll(".lyric")).indexOf(evt.target)}>{lyric}</li>
					<hr>
				{/each}
			{:else}
				<h1>No songs</h1>
			{/if}
		</ul>
	</div>
</div>

<div class="menu-container {showMenu ? "active" : ""}">
	{#if showMenu}
		<Menu {channel} {currentSongs} {songs} on:close={() => showMenu = false} />
	{:else}
		<button transition:fade={{duration: 250}} on:click={() => showMenu = true}><i class="bi bi-list"></i></button>
	{/if}
</div>

<style lang="postcss">
.main {
	display: flex;
	height: 100%;
}
.secondary {
	display: flex;
	flex-direction: column;
	place-items: center;
	width: calc(50% - 0.5px);
	height: calc(100%);
	overflow: scroll;
	&:nth-child(1) {
		border-right: 1px var(--border-color) solid;
	}
	.lyric, .song {
		padding: 3px;
		font-size: 16px;
		transition: all 200ms;
		white-space: pre-line;
		&::first-line {
			font-size: 20px;
		}
		&:hover {
			background-color: rgb(18, 29, 29);
			cursor: pointer;
		}
  }
	.songs {
		height: calc(50% - 1px);
		width: calc(100%);
		border-bottom: 1px var(--border-color) solid;
	}
	.preview {
		height: calc(50% - 2px);
		border: 1px var(--border-color) solid;
		margin-bottom: -6px;
	}
	ul {
		width: 100%;
	}
}
.menu-container {
	position: absolute;
	display: flex;
	bottom: 10px;
	left: 10px;
  backdrop-filter: blur(16px);
  background-color: #1010109a;
	border: 1px var(--border-color) solid;
	border-radius: 10px;
	width: 40px;
	height: 40px;
	align-items: center;
	justify-content: center;
	transition: all 500ms cubic-bezier(calc(2/3), 0, calc(1/3), 1);
	&.active {
		left: 5vw;
		bottom: 5vh;
  	border-radius: 32px;
		height: 90vh;
		width: 90vw;
		box-shadow: 0 0 100px #1010109a;
	}
	button {
		display: flex;
		position: absolute;
		background-color: rgba(0, 0, 0, 0);
		border: none;
		color: white;
		transition: all 500ms;
		height: 40px;
		width: 40px;
		border-radius: 10px;
		align-items: center;
		justify-content: center;
		&:hover {
			background-color: rgb(18, 29, 29);
		}
		i {
			font-size: xx-large;
		}
	}
}
</style>