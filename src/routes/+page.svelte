<script lang="ts">
import songs from "$lib/example.json";
import { onMount } from "svelte";
import Menu from "./Menu.svelte";
const channel = new BroadcastChannel("lyrics");
let currentSong = 0;
let currentLyric = 0;
let loaded = false;
let showMenu = false;
onMount(() => loaded = true)
channel.addEventListener("message", evt => {
	if (evt.data.type === "fetch") {
		channel.postMessage({
			type: "lyrics",
			message: songs[currentSong].lyrics[currentLyric]
		});
	} else if (evt.data.type === "keypress") {
		handeKey(evt.data.message);
	} else if (evt.data.type === "aspectratio") document.querySelector("iframe")!.style.aspectRatio = evt.data.message;
	console.log(evt.data)
});
function handeKey(evt: { preventDefault?: () => any; key: string; }) {
	evt.preventDefault && (evt.key === "ArrowUp" || evt.key === "ArrowDown") ? evt.preventDefault() : null;
	switch (evt.key) {
		case "ArrowUp":
			songs[currentSong].lyrics[currentLyric - 1] ? currentLyric-- : null;
			break;
		case "ArrowDown":
			songs[currentSong].lyrics[currentLyric + 1] ? currentLyric++ : null;
			break;
		case "ArrowLeft":
			songs[currentSong - 1].lyrics[0] ? currentSong-- : null;
			break;
		case "ArrowRight":
			songs[currentSong + 1].lyrics[0] ? currentSong++ : null;
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
}
$: if (currentLyric !== -1 && currentSong !== -1 && loaded) {
	let lyricElems = document.querySelectorAll(".lyric");
	let songElems = document.querySelectorAll(".song");
	lyricElems.forEach(elem => {
		elem.ariaCurrent = "false";
	});
	lyricElems[currentLyric].ariaCurrent = "true";
	lyricElems[currentLyric].scrollIntoView({ behavior: "smooth", block: "center" });
	songElems.forEach(elem => {
		elem.ariaCurrent = "false";
	});
	songElems[currentSong].ariaCurrent = "true";
	channel.postMessage({
		type: "lyrics",
		message: songs[currentSong].lyrics[currentLyric]
	});
};
</script>

<svelte:window on:keydown={handeKey} />

<div class="main">
	<div class="secondary">
		<div class="songs">
			<ul>
				<hr>
				{#each songs as song}
					<li class="song" on:click|preventDefault={evt => {
						currentSong = Array.from(document.querySelectorAll(".song")).indexOf(evt.target);
						currentLyric = 0;
						}}>{song.name}</li>
					<hr>
				{/each}
			</ul>
		</div>
		<iframe class="preview" src="/display" style="aspect-ratio: 16/9" />
	</div>
	<div class="secondary">
		<ul>
			<hr>
			{#each songs[currentSong].lyrics as lyric}
				<li class="lyric" on:click|preventDefault={evt => currentLyric = Array.from(document.querySelectorAll(".lyric")).indexOf(evt.target)}>{@html lyric.replaceAll("\\n", "<br>")}</li>
				<hr>
			{/each}
		</ul>
	</div>
</div>

{#if showMenu}
	<Menu {channel} {songs} on:close={() => showMenu = false} />
{/if}

<style lang="postcss">
.main {
	display: flex;
	height: 100%;
}
.secondary {
	display: flex;
	flex-direction: column;
	place-items: center;
	border: 1px var(--border-color) solid;
	width: calc(50% - 2px);
	height: calc(100% - 2px);
	overflow: scroll;
	.lyric, .song {
		padding: 3px;
		font-size: 16px;
		transition: all 200ms;
		&:is(.current) {
			background-color: rgb(39, 66, 66) !important;
		}
		&::first-line {
			font-size: 20px;
		}
		&:hover {
			background-color: rgb(18, 29, 29);
			cursor: pointer;
		}
  }
	.songs {
		height: calc(50% - 2px);
		width: calc(100% - 2px);
		border-bottom: 1px var(--border-color) solid;
	}
	.preview {
		height: calc(50% - 2px);
		/* width: calc(100% - 2px); */
		border: 1px var(--border-color) solid;
		margin-bottom: -6px;
	}
	ul {
		width: 100%;
	}
}
</style>