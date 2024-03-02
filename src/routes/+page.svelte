<script lang="ts">
  import Preview from "$lib/Preview.svelte";
  import Menu from "$lib/menu/Menu.svelte";
  import { blur } from "svelte/transition";
  import { onMount } from "svelte";
  import "../styles.css";
  import { allSongs, myService } from "$lib/songs";
  import { supabase } from "$lib/supabase";
  import type { RealtimeChannel } from "@supabase/supabase-js";
  import { remote } from "$lib/remote";

  const displayChannel = new BroadcastChannel("key");

  let currentSong = $state(0);
  let currentLyric = $state(0);

  let isBlank = false;

  let remoteChannel: RealtimeChannel | undefined;

  let previewAspectRatio = $state(16 / 9);

  onMount(() => {
    $effect(() => {
      if (
        $myService.songs.length > 0 &&
        $allSongs[$myService.songs[currentSong]]
      ) {
        const lyric =
          $allSongs[$myService.songs[currentSong]].lyrics[currentLyric];
        if (!isBlank) {
          localStorage.setItem("lyricInfo", `${lyric.type} ${lyric.number}`);
          localStorage.setItem(
            "songInfo",
            `${$allSongs[$myService.songs[currentSong]].name} | ${$allSongs[$myService.songs[currentSong]].artist}`,
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
        remoteChannel?.send({
          type: "broadcast",
          event: "test",
          payload: {
            lyric: currentLyric,
            song: currentSong,
          },
        });
      } else if ($myService.songs.length > 0) {
        currentSong = 0;
        currentLyric = 0;
        remoteChannel?.send({
          type: "broadcast",
          event: "test",
          payload: {
            lyric: currentLyric,
            song: currentSong,
          },
        });
      } else {
        localStorage.setItem("lyricInfo", "");
        localStorage.setItem("songInfo", "");
        localStorage.setItem("lyric", "");
      }
    });
    displayChannel.addEventListener("message", (evt) => {
      typeof evt.data === "object"
        ? handleKey(evt.data[0], undefined, evt.data[1])
        : (previewAspectRatio = evt.data);
    });
    remote.subscribe((val) => {
      let code = val.code;
      if (val.enabled) {
        remoteChannel = supabase.channel(code);
        remoteChannel
          .on("broadcast", { event: "test" }, (dat: any) => {
            if (dat.payload.song != null) currentSong = dat.payload.song;
            if (dat.payload.lyric != null) currentLyric = dat.payload.lyric;
          })
          .on("presence", { event: "join" }, () => {
            remoteChannel?.send({
              type: "broadcast",
              event: "test",
              payload: {
                lyric: currentLyric,
                song: currentSong,
              },
            });
          })
          .subscribe();
      } else {
        remoteChannel?.unsubscribe();
        remoteChannel = undefined;
      }
    });
    updateTheme();
    updateFont();
  });

  function handleKey(key: string, evt?: KeyboardEvent, shift?: boolean) {
    switch (key) {
      case "ArrowDown":
        evt?.preventDefault();
        !shift
          ? $allSongs[$myService.songs[currentSong]].lyrics[currentLyric + 1]
            ? currentLyric++
            : null
          : $allSongs[$myService.songs[currentSong]].lyrics[currentLyric + 2]
            ? (currentLyric += 2)
            : null;
        break;
      case "ArrowUp":
        evt?.preventDefault();
        !shift
          ? $allSongs[$myService.songs[currentSong]].lyrics[currentLyric - 1]
            ? currentLyric--
            : null
          : $allSongs[$myService.songs[currentSong]].lyrics[currentLyric - 2]
            ? (currentLyric -= 2)
            : null;
        break;
      case "ArrowRight":
        if ($allSongs[$myService.songs[currentSong + 1]]) {
          currentLyric = 0;
          currentSong++;
        }
        break;
      case "ArrowLeft":
        if ($allSongs[$myService.songs[currentSong - 1]]) {
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
            $allSongs[$myService.songs[currentSong]].lyrics[currentLyric];
          localStorage.setItem("lyricInfo", `${lyric.type} ${lyric.number}`);
          localStorage.setItem(
            "songInfo",
            `${$allSongs[$myService.songs[currentSong]].name} by: ${$allSongs[$myService.songs[currentSong]].artist}`,
          );
          localStorage.setItem("lyric", lyric.text);
        }
        break;
      case "d":
        open("/display", "_blank", "popup");
        break;
    }
  }
  function updateTheme() {
    document.querySelector("body")!.classList.value = "";
    document
      .querySelector("body")
      ?.classList.add(localStorage.getItem("theme") || "dark");
  }
  function updateFont() {
    document
      .querySelector("body")!
      .style.setProperty(
        "--font",
        localStorage.getItem("font") || "sans-serif",
      );
  }
</script>

<svelte:window
  on:keydown={(evt) => handleKey(evt.key, evt, evt.shiftKey)}
  on:storage={(evt) => (evt.key === "theme" ? updateTheme() : updateFont())}
/>

<div class="main">
  <div class="grid-item songs" style:grid-area="songs">
    {#each $myService.songs as index}
      <button
        class="item"
        transition:blur={{ duration: 300 }}
        on:click={(evt) => {
          evt.preventDefault();
          currentLyric = 0;
          currentSong =
            Array.from(
              //@ts-ignore
              evt.target?.parentElement.querySelectorAll("button"),
            ).indexOf(evt.target) || 0;
        }}
      >
        {$allSongs[index]?.name}
        <br />
        {$allSongs[index]?.artist}
      </button>
    {/each}
  </div>
  <div class="grid-item lyrics" style:grid-area="lyrics">
    {#if $myService.songs.length > 0 && $allSongs[$myService.songs[currentSong]]}
      {#each $allSongs[$myService.songs[currentSong]].lyrics as lyric}
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
    <Preview bind:aspectRatio={previewAspectRatio} />
  </div>
</div>

<Menu />

<style>
  .main {
    --grid-item: calc(50% - 5px);
    display: grid;
    height: 100%;
    grid-template-areas: "songs lyrics" "preview lyrics";
    grid-template-rows: var(--grid-item) var(--grid-item);
    grid-template-columns: var(--grid-item) var(--grid-item);
    gap: 10px;
    .grid-item {
      display: flex;
      flex-direction: column;
      border: var(--border-color) solid 1px;
      border-radius: 4px;
      overflow: scroll;
    }
  }
</style>
