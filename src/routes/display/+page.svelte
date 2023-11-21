<script lang="ts">
import { onMount } from "svelte";
import { cubicOut } from "svelte/easing";
import { crossfade, fade } from "svelte/transition";
const channel = new BroadcastChannel("lyrics");
let settings = {};
let transitioning = false;
let currentLyric = "";
let nextLyric = "";
let type = "";
const [send, recieve] = crossfade({
  duration: 300,
  easing: cubicOut
})
onMount(() => {
  setTimeout(() => channel.postMessage({ type: "fetch" }), 100);
  settings = JSON.parse(localStorage.getItem("settings")!);
});
channel.addEventListener("message", evt => {
  if (evt.data.type === "lyrics") {
    console.log(settings);
    if (settings.crossfade !== "none") {
      console.log(evt.data)
      nextLyric = evt.data.message.lyric;
      type = evt.data.message.type
      transitioning = true;
      setTimeout(() => {
        nextLyric !== " " ? currentLyric = nextLyric : null;
        transitioning = false;
        nextLyric = " ";
      }, 301);
    } else {
      currentLyric = evt.data.message.lyric;
    }
  } else if (evt.data.type === "fullscreen" && top === self && !document.fullscreenElement) {
    document.body.requestFullscreen();
    setTimeout(() => channel.postMessage({ type: "aspectratio", message: innerWidth / innerHeight }), 200)
  } else if (evt.data.type === "settingupdate") {
    settings = JSON.parse(localStorage.getItem("settings")!);
  };
});
</script>

<svelte:window on:keydown={evt => channel.postMessage({ type: "keypress", message: { key: evt.key } })} />

<div class="main" style:font-size={`${settings.displayfontsize / 2}vh`}>
  {#if settings.crossfade === "fancy"}
    {#if (transitioning)}
      <h1 in:send={{key: "lyric"}}>{nextLyric}</h1>
    {:else}
      <h1 out:recieve={{key:"lyric"}}>{currentLyric}</h1>
    {/if}
    <p>{type}</p>
    <p></p>
  {:else}
    {#if (transitioning)}
      <h1 in:fade={{duration: 300}}>{nextLyric}</h1>
    {:else}
      <h1 out:fade={{duration: 300}}>{currentLyric}</h1>
    {/if}
    <p></p>
    <p></p>
  {/if}
</div>

<style lang="postcss">
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  h1 {
    transition: all 250ms;
    text-align: center;
    font-weight: 600;
    font-size: inherit, 7vh;
    position: absolute;
    white-space: pre-line;
  }
  p {
    position: absolute;
    font-size: x-small;
    &:nth-of-type(1) {
      bottom: 5px;
      left: 5px;
    }
    &:nth-of-type(1) {
      bottom: 5px;
      right: 5px;
    }
  }
}
</style>