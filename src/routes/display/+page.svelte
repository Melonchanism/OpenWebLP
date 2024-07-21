<script lang="ts">
  import { displayData, settings } from "$lib/localStorage.svelte"
  import { onMount, tick } from "svelte"

  onMount(() => {
    localStorage.setItem("aspectRatio", innerWidth / innerHeight)
    displayData.set(JSON.parse(localStorage.getItem("displayData") ?? "null"))
  })
</script>

<svelte:window
  onstorage={(evt) => {
    if (evt.key === "displayData")
      document.startViewTransition(async () => {
        displayData.set(JSON.parse(evt.newValue ?? "null"))
        await tick()
      })
  }}
  onresize={() => {
    if (window.top === window) localStorage.setItem("aspectRatio", innerWidth / innerHeight)
  }}
/>

<div class="main">
  <div class="lyric-container">
    <h1 class={$settings?.transition ?? ""}>
      {$displayData?.lyric?.text}
    </h1>
  </div>
  <div class="info-container">
    <p>
      {$displayData?.name ?? " "}<br />{$displayData?.artists.reduce((carry, artist) => carry + `, ${artist}`) ?? " "}
    </p>
    <p>{$displayData?.lyric?.type} {$displayData?.lyric?.number}</p>
  </div>
</div>

<style>
  div.main {
    div.lyric-container {
      position: fixed;
      display: grid;
      place-items: center;
      height: 100dvh;
      width: 100vw;
      h1 {
        font-size: calc(2.7vw + 2.7vh);
        font-weight: normal;
        width: fit-content;
        white-space: pre-wrap;
        text-align: center;
        &.morph {
          view-transition-name: lyric;
        }
      }
    }
    div.info-container {
      position: fixed;
      bottom: 0;
      left: 4px;
      width: calc(100vw - 8px);
      display: flex;
      justify-content: space-between;
      align-items: end;
      p {
        font-size: calc(0.7vw + 0.7vh);
        /*font-weight: lighter;*/
      }
    }
  }

  ::view-transition-old(lyric),
  ::view-transition-new(lyric) {
    height: 100%;
    width: 100%;
    animation-duration: 300ms;
  }
</style>
