<script lang="ts">
  import Sortable from "sortablejs";
  import { slide } from "svelte/transition";
  import { allSongs, myServiceStore } from "$lib/songs";
  import { onMount } from "svelte";
  import { Service } from "$lib/types";

  let listElm: HTMLDivElement;
  let listElm2: HTMLDivElement;

  let list: Sortable;

  let search = $state("");

  const myService = $myServiceStore;

  onMount(() => {
    new Sortable(listElm, {
      group: {
        name: "songs",
        pull: "clone",
        put: false,
      },
      sort: false,
      animation: 150,
    });
    list = new Sortable(listElm2, {
      group: "songs",
      removeOnSpill: true,
      animation: 150,
      ghostClass: "moving",
      onAdd: createService,
      onRemove: createService,
      onMove: createService,
      onSpill: () => setTimeout(createService, 300),
    });
  });
  function createService() {
    setTimeout(() => {
      let output: number[] = [];
      list.toArray().forEach((item) => {
        output.push(parseInt(item));
      });
      myServiceStore.set(new Service("auto", output));
    }, 50);
  }
</script>

<div class="main">
  <div class="column">
    <h2>All</h2>
    <input
      type="text"
      placeholder="Search"
      on:keydown|stopPropagation={() => {}}
      bind:value={search}
    />
    <div class="list" bind:this={listElm}>
      {#each $allSongs as song}
        {#if `${song.name} ${song.artist}`
          .toLowerCase()
          .search(search.toLowerCase()) !== -1}
          <div
            class="item"
            data-id={$allSongs.indexOf(song)}
            transition:slide={{ duration: 300 }}
          >
            {song.name}
            <br />
            {song.artist}
          </div>
        {/if}
      {/each}
    </div>
  </div>
  <div class="column">
    <h2>Current</h2>
    <div class="list" bind:this={listElm2}>
      {#each myService.songs as index}
        <div class="item" data-id={index}>
          {$allSongs[index].name}
          <br />
          {$allSongs[index].artist}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  div.main {
    display: grid;
    grid-template-columns: 50% 50%;
    max-height: inherit;
    h2 {
      text-align: center;
    }
    input {
      background: #222222c5;
      font-size: 20px;
      margin-left: 8px;
      border-radius: 8px;
      padding: 4px;
      width: calc(100% - 24px);
    }
    div.column {
      max-height: inherit;
      overflow-y: scroll;
      overflow-x: hidden;
      div.list {
        min-height: 60vh;
        display: flex;
        flex-direction: column;
      }
    }
  }
  :global(div.item.moving) {
    transition: opacity 300ms;
    opacity: 0.2;
  }
</style>
