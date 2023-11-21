<script lang="ts">
import DragList from "./input/DragList.svelte";
import { send, recieve } from "./crossfade";
import songsStore from "$lib/stores/songs"
import currentSongsStore from "$lib/stores/currentSongs";
$: currentSongs = $currentSongsStore;
$: songs = $songsStore
</script>

<div class="songselector" in:send={{key:"menu"}} out:recieve={{key:"menu"}}>
  <div class="songlist">
    <h1><i class="bi bi-floppy" />Stored</h1>
    <DragList items={songs} name="stored" />
  </div>
  <div class="songlist">
    <h1><i class="bi bi-tv" />Current</h1>
    <DragList items={currentSongs} name="current" />
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
    &:nth-child(1) {
      border-right: 1px var(--border-color) solid;
    }
    &:nth-child(2) h1 {
      border-top-right-radius: 32px
    }
    h1 {
      transition: all 250ms;
      border-bottom: 1px var(--border-color) solid;
      &:hover {
        cursor: pointer;
        background-color: rgb(18, 29, 29);
      }
      .bi {
        margin: 4px;
      }
    }
  }
}
</style>