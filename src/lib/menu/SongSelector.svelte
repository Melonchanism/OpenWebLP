<script lang="ts">
import DragList from './input/DragList.svelte'
import { send, recieve } from "./crossfade";
import songsStore from "$lib/stores/songs"
import currentSongsStore from "$lib/stores/currentSongs";
$: currentSongs = $currentSongsStore;
$: songs = $songsStore
</script>

<div class="songselector" in:send|global={{key:"menu"}} out:recieve|global={{key:"menu"}}>
  <div class="songlist">
    <h1><i class="bi bi-floppy" />Stored</h1>
      {#each songs as song}
        <h3>{song.name}</h3>
      {/each}
  </div>
  <div class="songlist">
    <h1><i class="bi bi-tv" />Current</h1>
      {#each currentSongs as song}
        <h3>{song.name}</h3>
      {/each}
  </div> 
</div>

<style lang="postcss">
.songselector {
  position: absolute;
  height: 100%;
  width: inherit;
  display: flex;
  .songlist {
    width: 50%;
    height: 100%;
    overflow-y: scroll;
    h3 {
      border-bottom: 1px var(--border-color) solid;
      transition: background-color opacity 250ms;
      height: 30px;
      padding-top: 5px;
      padding-bottom: 5px;
      cursor: grab;
      &:hover {
        background-color: rgb(18, 29, 29);
      }
      &:is(.dragging) {
        opacity: 0;
        background-color: rgb(39, 66, 66) !important;
      }
    }
    &:first-child {
      border-right: 1px var(--border-color) solid;
    }
    h1 {
      transition: all 250ms;
      border-bottom: 1px var(--border-color) solid;
      .bi {
        margin: 4px;
      }
    }
  }
}
</style>