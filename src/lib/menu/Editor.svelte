<script lang="ts">
import songsStore from "$lib/stores/songs"
import currentSongsStore from "$lib/stores/currentSongs";
import { send, recieve } from "./crossfade";
import type { Song } from "$lib/types";
$: currentSongs = $currentSongsStore;
$: songs = $songsStore
$: allSongs = [...songs, ...currentSongs]
let editingSong = 0;
let editingSongList: HTMLDivElement, editorTextArea: HTMLTextAreaElement;
function decode(song: Song) {
  return song.name + "\n" + song.lyrics.join("\n\n")
};
$: if (editingSong !== -1 && editingSongList) {
  const songElems = Array.from(editingSongList.querySelectorAll("h3"))
  songElems.forEach(elm => elm.ariaCurrent = "");
  songElems[editingSong].ariaCurrent = "true";
  editorTextArea.value = decode(songs[editingSong]);
};
</script>

<div class="editor" in:send|global={{key:"menu"}} out:recieve|global={{key:"menu"}}>
  <div class="songlist" bind:this={editingSongList}>
    <h1><i class="bi bi-file-earmark-plus" />New Song</h1>
    {#each allSongs as song}
      <h3 on:click={evt => editingSong = Array.from(editingSongList.querySelectorAll("h3")).indexOf(evt.target)}>{song.name}</h3>
    {/each}
  </div> 
  <textarea placeholder="input" spellcheck="false" bind:this={editorTextArea} on:keydown|stopPropagation />
</div>

<style lang="postcss">
.editor {
  position: absolute;
  height: 100%;
  width: inherit;
  display: flex;
  textarea {
    background-color: transparent;
    color: white;
    border: none;
    resize: none;
    width: 50%;
    height: 100%;
    border-top-right-radius: 32px;
    border-bottom-right-radius: 32px;
  }
  .songlist {
    width: 50%;
    border-right: 1px var(--border-color) solid;
    h3 {
      padding-top: 5px;
      padding-bottom: 5px;
      border-bottom: 1px var(--border-color) solid;
    }
    h1 {
      border-bottom: 1px var(--border-color) solid;
      .bi {
        margin: 4px;
      }
    }
  }
}
</style>