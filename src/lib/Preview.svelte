<script lang="ts">
import { onMount } from "svelte";

let aspectRatio = $state(16/9)
let sml = $state(false);

let container: HTMLDivElement

onMount(() => {
  aspectRatio = parseFloat(localStorage.getItem("aspectRatio") ?? "1")
  containPreview()
  $effect(containPreview)
})

function containPreview() {
  const rect = container.getBoundingClientRect()
  sml = rect.width / rect.height < aspectRatio
}
</script>

<svelte:window
  onstorage={evt => {if (evt.key === "aspectRatio") aspectRatio = parseFloat(evt.newValue ?? "1")}}
  onresize={containPreview}
/>

<div bind:this={container} class="container {sml ? 'sml' : ''}" style:--aspect-ratio={aspectRatio}>
  <iframe src="/display" title="Preview"></iframe>
</div>

<style lang="scss">
div.container {
  display: grid;
  place-items: center;
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  &.sml > iframe {
    width: calc(100% - 2px);
    height: auto;
  }
}
iframe {
  height: calc(100% - 2px);
  min-height: 0;
  aspect-ratio: var(--aspect-ratio);
  border: 1px solid var(--border);
}
</style>