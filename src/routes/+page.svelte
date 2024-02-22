<script lang="ts">
  import currentSongsStore from "$lib/stores/currentSongs";
  import songsStore from "$lib/stores/songs";
  import { onMount } from "svelte";
  import Menu from "$lib/menu/Menu.svelte";
  import { fade } from "svelte/transition";
  const channel = new BroadcastChannel("lyrics");
  let currentSong = 0;
  let currentLyric = 0;
  let loaded = false;
  let showMenu = false;
  $: currentSongs = $currentSongsStore;
  $: songs = $songsStore;
  onMount(() => (loaded = true));
  channel.addEventListener("message", (evt) => {
    if (evt.data.type === "fetch") {
      channel.postMessage({
        type: "lyrics",
        message: {
          lyric:
            currentSongs[currentSong]?.lyrics[currentLyric]
              ?.split("\n")
              .slice(1)
              .join("\n") ?? "OpenWebLp",
          type: currentSongs[currentSong]?.lyrics[currentLyric]?.split(
            "\n",
            1,
          )[0],
        },
      });
    } else if (evt.data.type === "keypress") {
      handeKey(evt.data.message);
    } else if (evt.data.type === "aspectratio")
      document.querySelector("iframe")!.style.aspectRatio = evt.data.message;
  });
  function handeKey(evt: { preventDefault?: () => any; key: string }) {
    evt.preventDefault && (evt.key === "ArrowUp" || evt.key === "ArrowDown")
      ? evt.preventDefault()
      : null;
    switch (evt.key) {
      case "ArrowUp":
        currentSongs[currentSong]?.lyrics[currentLyric - 1]
          ? currentLyric--
          : null;
        break;
      case "ArrowDown":
        currentSongs[currentSong]?.lyrics[currentLyric + 1]
          ? currentLyric++
          : null;
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
      case "b":
        channel.postMessage({
          type: "lyrics",
          message: {
            lyric: "",
            type: "blank",
            song: "",
          },
        });
        break;
      case "Escape":
        evt.preventDefault ? (showMenu = false) : null;
        break;
    }
  }
  $: if (currentLyric !== -1 && currentSongs[0] && loaded) {
    let songElems = document.querySelectorAll(".song");
    let lyricElems = document.querySelectorAll(".lyric");
    lyricElems.forEach((elem) => {
      elem.ariaCurrent = "false";
    });
    if (lyricElems.length > 0) {
      lyricElems[currentLyric]!.ariaCurrent = "true";
      lyricElems[currentLyric]!.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      songElems.forEach((elem) => {
        elem.ariaCurrent = "false";
      });
      songElems[currentSong].ariaCurrent = "true";
      channel.postMessage({
        type: "lyrics",
        message: {
          lyric: currentSongs[currentSong]?.lyrics[currentLyric]
            ?.split("\n")
            .slice(1)
            .join("\n"),
          type: currentSongs[currentSong]?.lyrics[currentLyric]?.split(
            "\n",
            1,
          )[0],
          song: currentSongs[currentSong]?.name,
        },
      });
    } else {
      setTimeout(() => {
        currentLyric = 1;
        currentLyric = 0;
      }, 10);
    }
  }
  $: if (currentSong !== -1) {
    setTimeout(() => {
      currentLyric = 0;
    }, 10);
  }
</script>

<svelte:window on:keydown={handeKey} />

<div class="main">
  <div class="secondary">
    <div class="songs">
      <ul>
        {#if currentSongs[0]}
          {#each currentSongs as song}
            <li
              class="song"
              on:click|preventDefault={(evt) => {
                currentSong = Array.from(
                  document.querySelectorAll(".song"),
                ).indexOf(evt.target);
              }}
            >
              {song.name}
            </li>
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
      {#if currentSongs[0]}
        {#each currentSongs[currentSong].lyrics as lyric}
          <li
            class="lyric"
            on:click|preventDefault={(evt) =>
              (currentLyric = Array.from(
                document.querySelectorAll(".lyric"),
              ).indexOf(evt.target))}
          >
            {lyric}
          </li>
        {/each}
      {:else}
        <h1>No songs</h1>
      {/if}
    </ul>
  </div>
</div>
{#if showMenu}
  <Menu {channel} on:close={() => (showMenu = false)} />
{/if}

<div class="menu-container {showMenu ? 'active' : ''}">
  {#if !showMenu}
    <button
      transition:fade|global={{ duration: 400 }}
      on:click={() => (showMenu = true)}><i class="bi bi-list"></i></button
    >
  {:else}
    <button
      transition:fade|global={{ duration: 400 }}
      on:click={() => (showMenu = false)}><i class="bi bi-x-lg"></i></button
    >
  {/if}
</div>

<style lang="less">
  .main {
    display: flex;
    height: 100%;
    width: 100%;
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
    .lyric,
    .song {
      padding: 3px;
      font-size: 16px;
      transition: all 200ms;
      border-bottom: 1px var(--border-color) solid;
      white-space: pre-line;
      &::first-line {
        font-size: 20px;
      }
      &:hover {
        background-color: rgb(18, 29, 29);
        cursor: pointer;
      }
      &:first-child {
        border-top: 1px var(--border-color) solid;
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
    -webkit-backdrop-filter: blur(16px);
    background-color: #1010109a;
    border: 1px var(--border-color) solid;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    transition: all 500ms;
    &.active {
      bottom: calc(100vh - 50px);
    }
    button {
      display: flex;
      position: absolute;
      background-color: rgba(0, 0, 0, 0);
      border: none;
      color: white;
      transition: all 250ms;
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
