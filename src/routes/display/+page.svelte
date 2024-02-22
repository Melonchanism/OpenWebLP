<script lang="ts">
import { onMount } from "svelte";
import { cubicOut } from "svelte/easing";
import { crossfade, fade } from "svelte/transition";
import type { SettingsObj } from "$lib/types";
const channel = new BroadcastChannel("lyrics");
//@ts-expect-error
let settings: SettingsObj = {};
let transitioning = false;
let currentLyric = "";
let nextLyric = "";
let type = "";
let songName = "";
const [send, receive] = crossfade({
  duration: 300,
  easing: cubicOut
})
onMount(() => {
  setTimeout(() => channel.postMessage({ type: "fetch" }), 100);
  settings = JSON.parse(localStorage.getItem("settings")!);
});
channel.addEventListener("message", evt => {
  if (evt.data.type === "lyrics") {
    if (settings.crossfade !== "none") {
      nextLyric = evt.data.message.lyric;
      type = evt.data.message.type;
      songName = evt.data.message.song;
      transitioning = true;
      setTimeout(() => {
        nextLyric !== " " ? currentLyric = nextLyric : null;
        transitioning = false;
        nextLyric = " ";
      }, 301);
    } else {
      currentLyric = evt.data.message.lyric;
      type = evt.data.message.type;
      songName = evt.data.message.name;
    }
  } else if (evt.data.type === "fullscreen" && top === self && !document.fullscreenElement) {
    document.body.requestFullscreen();
  } else if (evt.data.type === "settingupdate") {
    settings = JSON.parse(localStorage.getItem("settings")!);
  };
});
</script>

<svelte:window
  on:keydown={evt => channel.postMessage({ type: "keypress", message: { key: evt.key } })}
  on:resize={() => channel.postMessage({ type: "aspectratio", message: innerWidth / innerHeight })}
/>

<div class="main" style:font-size={`${settings.displayfontsize}vh`}>
  {#if settings.crossfade === "fancy"}
    {#if (transitioning)}
      <h1 in:receive={{key: "lyric"}}>{nextLyric}</h1>
    {:else}
      <h1 out:send|global='{{key:"lyric"}}'>{currentLyric}</h1>
    {/if}
    {#if !settings.simple}
      <p>{type}</p>
      <p>{songName}</p>
    {/if}
  {:else}
    {#if (transitioning)}
      <h1 in:fade|global={{duration: 300}}>{nextLyric}</h1>
    {:else}
      <h1 out:fade|global={{duration: 300}}>{currentLyric}</h1>
    {/if}
    {#if !settings.simple}
      <p>{type}</p>
      <p>{songName}</p>
    {/if}
  {/if}
</div>

<style lang="less">
.main {
  width: 100vw;
  height: 100vh;
  h1 {
    top: 50%;
    left: 50%;
    width: fit-content;
    transform: translate(-50%, -50%);
    transition: all 250ms;
    text-align: center;
    font-weight: 600;
    font-size: inherit;
    position: absolute;
    white-space: pre-line;
  }
  p {
    position: absolute;
    font-size: 0.5vw;
    &:nth-of-type(1) {
      bottom: 5px;
      left: 5px;
    }
    &:nth-of-type(2) {
      bottom: 5px;
      right: 5px;
    }
  }
}
</style>