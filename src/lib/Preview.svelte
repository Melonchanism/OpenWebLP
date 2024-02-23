<script lang="ts">
  import { onMount } from "svelte";

  let sml = false;
  let aspectRatio = 16 / 9;

  onMount(() => {
    const elm = document
      .querySelector("div.container")!
      .getBoundingClientRect();
    if (elm.width / elm.height < aspectRatio) sml = true;
    else sml = false;
    addEventListener("resize", () => {
      const elm = document
        .querySelector("div.container")!
        .getBoundingClientRect();
      if (elm.width / elm.height < aspectRatio) sml = true;
      else sml = false;
    });
  });
</script>

<div class="container {sml ? 'sml' : ''}" style:--aspect-ratio={aspectRatio}>
  <iframe src="/display" title="Preview" />
</div>

<style>
  div.container {
    display: grid;
    place-items: center;
    height: 100%;
    &.sml > iframe {
      width: calc(100% - 2px);
      height: auto;
    }
  }
  iframe {
    height: calc(100% - 2px);
    min-height: 0;
    aspect-ratio: var(--aspect-ratio);
    border: 1px solid var(--border-color);
  }
</style>
