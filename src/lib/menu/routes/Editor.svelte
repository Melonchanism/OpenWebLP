<script lang="ts">
  import { allSongs } from "$lib/songs";
  import { scale } from "svelte/transition";
  import { onMount } from "svelte";

  let currentSong = 0;
  let currentLyric = 0;
  let editing = "none";

  let songsList: HTMLDivElement;
  let lyricsList: HTMLDivElement;

  onMount(() => {
    songsList.querySelector("button")?.classList.add("current");
  });
</script>

<div class="main">
  <div class="list">
    <div>
      <button class="item">
        <i class="bi bi-file-earmark-plus" />
        New Song
      </button>
    </div>
    <div bind:this={songsList}>
      {#each $allSongs as song}
        <button
          class="item"
          on:click={(evt) => {
            currentSong = $allSongs.indexOf(song);
            songsList
              .querySelectorAll("button")
              .forEach((itm) => itm.classList.remove("current"));
            // @ts-ignore
            evt.target?.classList.add("current");
          }}
        >
          {song.name}
          <br />
          {song.artist}
        </button>
      {/each}
    </div>
  </div>
  <div class="list">
    <div>
      <button class="item">
        <i class="bi bi-plus-circle" />
        New Lyric
      </button>
    </div>
    <div bind:this={lyricsList}>
      {#each $allSongs[currentSong].lyrics as lyric}
        <button
          class="item"
          on:click={(evt) => {
            currentLyric = $allSongs[currentSong].lyrics.indexOf(lyric);
            lyricsList
              .querySelectorAll("button")
              .forEach((itm) => itm.classList.remove("current"));
            //@ts-ignore
            evt.target?.classList.add("current");
            editing = "lyric";
          }}
        >
          {lyric.type}
          {lyric.number}
          <br />
          {lyric.text}
        </button>
      {/each}
    </div>
  </div>
</div>

{#if editing === "lyric"}
  <div class="secondary glass" transition:scale={{ duration: 300 }}>
    <div class="titlebar">
      <button
        class="close glass"
        on:click={() => {
          editing = "none";
          lyricsList
            .querySelectorAll("button")
            .forEach((itm) => itm.classList.remove("current"));
        }}
      >
        <i class="bi bi-x-lg" style="font-size: xx-large" />
      </button>
      <h2 class="title">Edit Lyric</h2>
    </div>
    <div class="input-grid">
      <textarea
        rows="15"
        cols="50"
        placeholder="Lyric..."
        on:keydown|stopPropagation={() => {}}
        bind:value={$allSongs[currentSong].lyrics[currentLyric].text}
        style:grid-area="text"
      />
      <select
        name="type"
        bind:value={$allSongs[currentSong].lyrics[currentLyric].type}
        style:grid-area="type"
      >
        <option value="Verse">Verse</option>
        <option value="Pre-Chorus">Pre-Chorus</option>
        <option value="Chorus">Chorus</option>
        <option value="Bridge">Bridge</option>
        <option value="Tag">Tag</option>
        <option value="Intro">Intro</option>
        <option value="Ending">Ending</option>
      </select>
      <input
        type="number"
        placeholder="Number..."
        bind:value={$allSongs[currentSong].lyrics[currentLyric].number}
        style:grid-area="numbre"
      />
    </div>
  </div>
{/if}

<style>
  div.main {
    display: grid;
    grid-template-columns: 50% 50%;
    max-height: inherit;
    div.list {
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
  div.secondary {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    div.titlebar {
      display: flex;
      align-items: center;
      button.close {
        color: white;
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        margin: 8px;
        z-index: 1;
      }
      h2.title {
        margin-right: 8px;
      }
    }
    div {
      display: grid;
      grid-template-areas: "text text" "type numbre";
      textarea {
        background-color: var(--item-background-color);
        font-size: 16px;
        height: max-content;
        margin: 8px;
        padding: 4px;
        border-radius: 8px;
      }
      select,
      input {
        background-color: var(--item-background-color);
        -webkit-appearance: none;
        font-size: 17px;
        margin: 8px;
        padding: 4px;
        border-radius: 8px;
      }
    }
  }
</style>
