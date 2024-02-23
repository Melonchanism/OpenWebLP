<script lang="ts">
  import { onMount } from "svelte";
  import "../../styles.css";

  const channel = new BroadcastChannel("key");

  let animationName = "none";

  let transitioning = false;
  let elm1: HTMLHeadingElement;
  let settings: {
    transition: string;
    info: boolean;
  };

  let displayText = "";
  let displayText2 = "";
  let songInfo = "";
  let lyricInfo = "";
  onMount(() => {
    updateSettings();
    updateDisplay();
    addEventListener("storage", (evt) => {
      if (evt.key === "lyric") updateDisplay();
      else if (evt.key === "settings") updateSettings();
    });
  });

  function updateDisplay() {
    lyricInfo = localStorage.getItem("lyricInfo") ?? "";
    songInfo = localStorage.getItem("songInfo") ?? "";
    if (settings.transition !== "none") {
      elm1?.style ? (elm1.style.animationName = `${animationName}-in`) : null;
      transitioning = true;
      displayText2 = localStorage.getItem("lyric") ?? "";
      setTimeout(() => {
        transitioning = false;
        displayText = displayText2;
        elm1?.style ? (elm1.style.animationName = "none") : null;
      }, 400);
    } else {
      displayText = localStorage.getItem("lyric") ?? "";
      displayText2 = displayText;
    }
  }

  function updateSettings() {
    settings = JSON.parse(
      localStorage.getItem("settings") ??
        `{"transition": "fade", "info": false}`,
    );
    animationName = settings.transition;
  }
</script>

<svelte:window
  on:keydown={(evt) =>
    evt.key !== "f"
      ? channel.postMessage([evt.key, evt.shiftKey])
      : document.body.requestFullscreen()}
/>

{#if transitioning}
  <div class="container">
    <h1 style:animation-name="{animationName}-out">
      {displayText}
    </h1>
  </div>
{/if}
<div class="container">
  <h1 style:animation-name="{animationName}-in" bind:this={elm1}>
    {displayText2}
  </h1>
</div>
{#if settings?.info ?? false}
  <div class="info">
    <p>{lyricInfo}</p>
    <p>{songInfo}</p>
  </div>
{/if}

<style>
  :global(body) {
    background-color: black;
    color: white;
  }
  div.container {
    display: grid;
    position: absolute;
    width: 100vw;
    height: 100vh;
    place-content: center;
  }

  div.info {
    position: fixed;
    display: grid;
    grid-template-columns: auto auto;
    width: 100vw;
    bottom: 0;
    p {
      font-size: calc(0.5vw + 0.5vh);
      &:last-child {
        text-align: right;
      }
    }
  }

  h1 {
    white-space: pre;
    font-size: calc(2.5vw + 2.5vh);
    font-weight: normal;
    text-align: center;
    animation-fill-mode: forwards;
    animation-duration: 400ms;
  }
</style>
