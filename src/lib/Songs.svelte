<script lang="ts">
  import Sortable from "sortablejs"
  import { onMount } from "svelte"
  import type { Song } from "./songs"
  import { flip } from "svelte/animate"
  import { blur } from "svelte/transition"
  let { songs }: { songs: Song[] } = $props()

  let searchVal = $state("")

  let sortedSongs = $derived(
    songs
      .toSorted((itm1, itm2) => (itm1.name > itm2.name ? 1 : -1))
      .filter((itm) => itm.name.toLowerCase().startsWith(searchVal.toLowerCase())),
  )

  let listElm: HTMLDivElement
  onMount(() => {
    let sortable = new Sortable(listElm, {
      animation: 300,
      ghostClass: "dragging",
      group: {
        name: "songs",
        pull: "clone",
        put: false,
      },
      sort: false,
    })
  })
</script>

<h2>Songs</h2>
<div>
  <input bind:value={searchVal} onkeydown={(evt) => evt.stopPropagation()} type="text" placeholder="Search..." />
</div>
<div bind:this={listElm} class="list">
  {#each sortedSongs as item (item.id)}
    <div animate:flip={{ duration: 300 }} transition:blur={{ duration: 300 }} data-id={item.id}>
      <h3>{item.name}</h3>
      <p>{item.artists.reduce((carry, artist) => `${carry}, ${artist}`)}</p>
    </div>
  {/each}
</div>

<style>
  h2 {
    margin: 8px;
  }
  input {
    border-radius: 8px;
    padding: 4px;
    margin-left: 8px;
    width: calc(100% - 24px);
  }
</style>
