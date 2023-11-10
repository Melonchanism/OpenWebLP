<script lang="ts">
import { onMount } from "svelte";
const channel = new BroadcastChannel("lyrics");
let settings = {};
let currentLyric = "";
let nextLyric = "";
onMount(() => {
  channel.postMessage({
    type: "fetch"
  });
  settings = JSON.parse(localStorage.getItem("settings")!) ?? { crossfade: true, }
});
channel.addEventListener("message", evt => {
  if (evt.data.type === "lyrics") {
    if (settings.crossfade) {
      nextLyric = evt.data.message.split("\\n").slice(1).join("<br>");
      document.querySelector(".future")?.classList.add("new");
      document.querySelector(".future")?.classList.remove("future");
      document.querySelector(".current")?.classList.add("old");
      document.querySelector(".current")?.classList.remove("current");
      setTimeout(() => {
        nextLyric !== "" ? currentLyric = nextLyric : null;
        nextLyric = "";
        document.querySelector(".old")?.classList.add("current");
        document.querySelector(".old")?.classList.remove("old");
        document.querySelector(".new")?.classList.add("future");
        document.querySelector(".new")?.classList.remove("new");
      }, 300);
    } else {
      currentLyric = evt.data.message.split("\\n").slice(1).join("<br>");
    }
  } else if (evt.data.type === "fullscreen" && top === self) {
    document.body.requestFullscreen();
    setTimeout(() => channel.postMessage({ type: "aspectratio", message: innerWidth / innerHeight }), 200)
  } else if (evt.data.type === "settingupdate") {
    settings = JSON.parse(localStorage.getItem("settings")!);
  };
});
</script>

<svelte:window on:keydown={evt => channel.postMessage({ type: "keypress", message: { key: evt.key } })} />

<div class="main">
  <h1 class="current">{@html currentLyric}</h1>
  <h1 class="future">{@html nextLyric}</h1>
</div>

<style lang="postcss">
.main {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  h1 {
    text-align: center;
    font-weight: 600;
    font-size: 7vh;
    position: absolute;
    animation-duration: 300ms;
    &:is(.new) {
      animation-name: fade-in;
    }
    &:is(.old) {
      animation-name: fade-out;
    }
    &:is(.future) {
      opacity: 0;
    }
  }
}
</style>