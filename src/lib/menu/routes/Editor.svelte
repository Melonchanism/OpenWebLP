<script>
import {allSongs} from "$lib/songs";

let currentSong = 0;
</script>

<div class="main">
  <div class="list">
    <div>
      <button class="item">
        <i class="bi bi-file-earmark-plus" />
        New Song
      </button>
    </div>
    <div>
      {#each allSongs as song}
        <button class="item" on:click={evt => {
        currentSong = allSongs.indexOf(song)
        evt.target?.parentElement.querySelectorAll("button").forEach(itm => itm.classList.remove("current"));
        evt.target?.classList.add("current");
      }}>
          {song.name}
          <br>
          {song.artist}
        </button>
      {/each}
    </div>
  </div>
  <div class="editor">
    {#each allSongs[currentSong].lyrics as lyric}
      <button class="item">
        {lyric.type} {lyric.number}
        <br>
        {lyric.text}
      </button>
    {/each}
  </div>
</div>

<style lang="less">
div.main {
  display: grid;
  grid-template-columns: 50% 50%;
  max-height: inherit;
  div.list, div.editor {
    max-height: inherit;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>