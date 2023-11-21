<script lang="ts">
import { flip } from "svelte/animate";
import { dndzone, overrideItemIdKeyNameBeforeInitialisingDndZones, type DndEvent } from "svelte-dnd-action";
import currentSongs from "$lib/stores/currentSongs";
import songs from "$lib/stores/songs";
export let name: string;
export let items: {
  name: string,
  lyrics: string[]
}[];
overrideItemIdKeyNameBeforeInitialisingDndZones("name");
interface asdfEvent extends CustomEvent {
  detail: DndEvent;
}
function dndConsider(evt: asdfEvent) {
  items = evt.detail.items;
  console.log(items);
  items.forEach(itm => itm.name === evt.detail.info.id ? evt.preventDefault() : null)
}
function dndFinalize(evt: asdfEvent) {
  items = evt.detail.items;
  name === "current" ? currentSongs.set(items) : songs.set(items);
}
</script>

<div class="main" use:dndzone={{items, flipDurationMs: 250}} on:consider={dndConsider} on:finalize={dndFinalize}>
  {#each items as item(item.name)}
    <h3 animate:flip={{duration: 250}}>{item.name !== "id:dnd-shadow-placeholder-0000" ? item.name : ""}</h3>
  {/each}
</div>

<style lang="postcss">
.main {
  width: 100%;
  height: 100%;
  h3 {
    border-bottom: 1px var(--border-color) solid;
    transition: all 250ms;
    padding-top: 5px;
    padding-bottom: 5px;
    &:hover {
      cursor: pointer;
      background-color: rgb(18, 29, 29);
    }
    &:empty {
      border: none;
    }
  }
}
</style>