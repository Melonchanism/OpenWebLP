<script lang="ts">
  import { allSongs, myService } from "$lib/songs";
  import { scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { Service } from "$lib/main";

  let currentSong = $state(0);
  let currentLyric = $state(0);
  let editing = $state("none");

  let songsList: HTMLDivElement;
  let lyricsList: HTMLDivElement;

  onMount(() => {
    songsList.querySelector("button")?.classList.add("current");
  });
</script>

<svelte:body
  on:keydown={(evt) => {
    if (evt.key === "Escape" && editing !== "none") {
      evt.stopPropagation();
      editing = "none";
      lyricsList
        .querySelectorAll("button")
        .forEach((itm) => itm.classList.remove("current"));
    }
  }}
/>

<div class="main">
  <div class="list">
    <h1>Stuff will not store atm</h1>
    <div>
      <button
        class="item"
        on:click={() => {
          allSongs.update((songs) => {
            songs.push({
              name: "New Song",
              artist: "Artist",
              lyrics: [],
            });
            return songs;
          });
        }}
      >
        <i class="bi bi-file-earmark-plus" />
        New Song
      </button>
    </div>
    <div bind:this={songsList}>
      {#each $allSongs as song}
        <button
          class="item"
          on:click={(evt) => {
            if (currentSong === $allSongs.indexOf(song)) {
              editing = "song";
            } else {
              currentSong = $allSongs.indexOf(song);
              songsList
                .querySelectorAll("button")
                .forEach((itm) => itm.classList.remove("current"));
              // @ts-ignore
              evt.target?.classList.add("current");
            }
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
      <button
        class="item"
        on:click={() => {
          allSongs.update((songs) => {
            songs[currentSong].lyrics.push({
              type: "Verse",
              number: 0,
              text: "New Lyric",
            });
            return songs;
          });
        }}
      >
        <i class="bi bi-plus-circle" />
        New Lyric
      </button>
    </div>
    <div bind:this={lyricsList}>
      {#if $allSongs[currentSong]}
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
      {/if}
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
      <h1 class="title">Edit Lyric</h1>
    </div>
    <div class="input-grid-lyric">
      <textarea
        rows="9"
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
      <button
        class="notitem"
        style:grid-area="delete"
        on:click={() => {
          if (confirm("are you sure??")) {
            allSongs.update((songs) => {
              songs[currentSong].lyrics.splice(currentLyric, 1);
              return songs;
            });
            editing = "none";
          }
        }}
      >
        <i class="bi bi-trash" />
        Delete Lyric
      </button>
    </div>
  </div>
{:else if editing === "song"}
  <div class="secondary glass" transition:scale={{ duration: 300 }}>
    <div class="titlebar">
      <button class="close glass" on:click={() => (editing = "none")}>
        <i class="bi bi-x-lg" style="font-size: xx-large" />
      </button>
      <h1 class="title">Edit Song</h1>
    </div>
    <div class="input-grid-song">
      <input
        type="text"
        placeholder="Song Name..."
        on:keydown|stopPropagation={() => {}}
        bind:value={$allSongs[currentSong].name}
      />
      <input
        type="text"
        placeholder="Song Artist..."
        on:keydown|stopPropagation={() => {}}
        bind:value={$allSongs[currentSong].artist}
      />
      <button
        class="notitem"
        on:click={() => {
          if (confirm("are you sure??")) {
            let songToDelete = $myService.songs.indexOf(currentSong);
            myService.update((store) => {
              songToDelete !== -1 ? store.songs.splice(songToDelete, 1) : null;
              let updated = store.songs.map((itm: number) => {
                if (itm > currentSong) {
                  return itm - 1;
                } else return itm;
              });
              return new Service(store.name, updated);
            });
            allSongs.update((songs) => {
              songs.splice(currentSong, 1);
              return songs;
            });
            editing = "none";
          }
        }}
      >
        <i class="bi bi-trash" />
        Delete Song
      </button>
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
    }
    div.input-grid-lyric {
      display: grid;
      grid-template-areas: "text text" "type numbre" "delete delete";
      max-height: 100vh;
      textarea {
        background-color: var(--item-background-color);
        height: max-content;
        resize: none;
        max-height: calc(100vh - 170px);
      }
    }
    div.input-grid-song {
      display: flex;
      flex-direction: column;
      input,
      button {
        background-color: var(--item-background-color);
        font-size: 17px;
        margin: 8px;
        padding: 4px;
        border-radius: 8px;
      }
    }
    button {
      color: red;
    }
  }
</style>
