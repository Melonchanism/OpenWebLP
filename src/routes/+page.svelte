<script lang="ts">
  import Preview from "$lib/Preview.svelte";
  import Menu from "$lib/menu/Menu.svelte";
  import { blur } from "svelte/transition";
  import { onMount } from "svelte";
  import "../styles.less";
  import { allSongs, myServiceStore } from "$lib/songs";

  const channel = new BroadcastChannel("key");

  let currentSong = $state(0);
  let currentLyric = $state(0);

  let isBlank = false;

  onMount(() => {
    $effect(() => {
      if (
        $myServiceStore.songs.length > 0 &&
        $allSongs[$myServiceStore.songs[currentSong]]
      ) {
        const lyric =
          $allSongs[$myServiceStore.songs[currentSong]].lyrics[currentLyric];
        if (!isBlank) {
          localStorage.setItem("lyricInfo", `${lyric.type} ${lyric.number}`);
          localStorage.setItem(
            "songInfo",
            `${$allSongs[$myServiceStore.songs[currentSong]].name} | ${$allSongs[$myServiceStore.songs[currentSong]].artist}`,
          );
          localStorage.setItem("lyric", lyric.text);
        }
        document
          .querySelectorAll("div.lyrics button.item, div.songs button.item")
          ?.forEach((itm) => itm.classList.remove("current"));
        document
          .querySelectorAll("div.lyrics button.item")
          ?.item(currentLyric)
          ?.classList.add("current");
        document
          .querySelectorAll("div.lyrics button.item")
          ?.item(currentLyric)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        document
          .querySelectorAll("div.songs button.item")
          ?.item(currentSong)
          ?.classList.add("current");
        document
          .querySelectorAll("div.songs button.item")
          ?.item(currentSong)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
      } else if ($myServiceStore.songs.length > 0) {
        currentSong = 0;
        currentLyric = 0;
      } else {
        localStorage.setItem("lyricInfo", "");
        localStorage.setItem("songInfo", "");
        localStorage.setItem("lyric", "");
      }
    });
    channel.addEventListener("message", (evt) =>
      handleKey(evt.data[0], undefined, evt.data[1]),
    );
  });

  function handleKey(key: string, evt?: KeyboardEvent, shift?: boolean) {
    switch (key) {
      case "ArrowDown":
        evt?.preventDefault();
        !shift
          ? $allSongs[$myServiceStore.songs[currentSong]].lyrics[
              currentLyric + 1
            ]
            ? currentLyric++
            : null
          : $allSongs[$myServiceStore.songs[currentSong]].lyrics[
                currentLyric + 2
              ]
            ? (currentLyric += 2)
            : null;
        break;
      case "ArrowUp":
        evt?.preventDefault();
        !shift
          ? $allSongs[$myServiceStore.songs[currentSong]].lyrics[
              currentLyric - 1
            ]
            ? currentLyric--
            : null
          : $allSongs[$myServiceStore.songs[currentSong]].lyrics[
                currentLyric - 2
              ]
            ? (currentLyric -= 2)
            : null;
        break;
      case "ArrowRight":
        if ($allSongs[$myServiceStore.songs[currentSong + 1]]) {
          currentLyric = 0;
          currentSong++;
        }
        break;
      case "ArrowLeft":
        if ($allSongs[$myServiceStore.songs[currentSong - 1]]) {
          currentLyric = 0;
          currentSong--;
        }
        break;
      case "b":
        isBlank = !isBlank;
        if (isBlank) {
          localStorage.setItem("lyricInfo", "");
          localStorage.setItem("songInfo", "");
          localStorage.setItem("lyric", "");
        } else {
          const lyric =
            $allSongs[$myServiceStore.songs[currentSong]].lyrics[currentLyric];
          localStorage.setItem("lyricInfo", `${lyric.type} ${lyric.number}`);
          localStorage.setItem(
            "songInfo",
            `${$allSongs[$myServiceStore.songs[currentSong]].name} by: ${$allSongs[$myServiceStore.songs[currentSong]].artist}`,
          );
          localStorage.setItem("lyric", lyric.text);
        }
        break;
      case "f":
        document.querySelector("iframe")?.requestFullscreen();
        break;
      case "d":
        open("/display", "_blank", "popup");
        break;
    }
  }
</script>

<svelte:window on:keydown={(evt) => handleKey(evt.key, evt, evt.shiftKey)} />

<div class="main">
  <div class="grid-item songs" style:grid-area="songs">
    {#each $myServiceStore.songs as index}
      <button
        class="item"
        on:click={(evt) => {
          currentLyric = 0;
          currentSong = Array.from(
            // @ts-ignore
            evt.target?.parentElement?.querySelectorAll("button"),
          ).indexOf(evt.target);
        }}
        transition:blur={{ duration: 300 }}
      >
        {$allSongs[index].name}
        <br />
        {$allSongs[index].artist}
      </button>
    {/each}
  </div>
  <div class="grid-item lyrics" style:grid-area="lyrics">
    {#if $myServiceStore.songs.length > 0 && $allSongs[$myServiceStore.songs[currentSong]]}
      {#each $allSongs[$myServiceStore.songs[currentSong]].lyrics as lyric}
        <button
          class="item"
          on:click={(evt) =>
            (currentLyric = Array.from(
              // @ts-ignore
              evt.target?.parentElement?.querySelectorAll("button"),
            ).indexOf(evt.target))}
        >
          {lyric.type}
          {lyric.number}
          <br />
          {lyric.text}
        </button>
      {/each}
    {/if}
  </div>
  <div class="grid-item" style:grid-area="preview">
    <Preview />
  </div>
</div>

<Menu />

<style lang="less">
  @gridItem: calc(50% - 5px);
  .main {
    display: grid;
    height: 100%;
    grid-template-areas: "songs lyrics" "preview lyrics";
    grid-template-rows: @gridItem @gridItem;
    grid-template-columns: @gridItem @gridItem;
    gap: 10px;
    .grid-item {
      display: flex;
      flex-direction: column;
      border: var(--border-color) solid 2px;
      border-radius: 4px;
      overflow: scroll;
    }
  }
</style>
