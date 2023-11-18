<script lang="ts">
import { fade, scale, slide } from "svelte/transition";
import { createEventDispatcher, onMount } from "svelte";
import DragList from "./DragList.svelte";
import { cubicInOut } from "svelte/easing";
type Song = {
  name: string;
  lyrics: string[];
};
export let channel: BroadcastChannel;
export let currentSongs: Song[];
export let songs: Song[];
let route = "settings";
let editingSong = 0;
let editingSongList: HTMLDivElement, storedSongList: HTMLDivElement, currentSongList: HTMLDivElement, editorTextArea: HTMLTextAreaElement;
let settings = JSON.parse(localStorage.getItem("settings")!) ?? {
  crossfade: true,
};
const dispatch = createEventDispatcher();
onMount(() => {
  document.querySelectorAll(".setting > input").forEach(elm => elm.addEventListener("input", () => {
    setTimeout(() => {
      localStorage.setItem("settings", JSON.stringify(settings));
      channel.postMessage({type: "settingupdate"});
    }, 50);
  }));
});
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

<div class="main" transition:scale={{duration: 500, easing: cubicInOut}}>
  <div class="navbar">
    <h1><button class="close" on:click={() => dispatch("close")}><i class="bi bi-x-lg" /></button>Menu</h1>
    <h2 on:click={() => route = "settings"} aria-current={route === "settings"}><i class="bi bi-gear" /><span>Settings</span></h2>
    <h2 on:click={() => route = "songselector"} aria-current={route === "songselector"}><i class="bi bi-music-note" /><span>Select Songs</span></h2>
    <h2 on:click={() => route = "editor"} aria-current={route === "editor"}><i class="bi bi-pen" /><span>Editor</span></h2>
    <h2 on:click={() => route = "about"} aria-current={route === "about"}><i class="bi bi-info" /><span>About</span></h2>
  </div>
  <div class="content" >
    {#if (route === "settings")}
      <div class="settings" in:fade>
        <div class="setting"><h2>CrossFade Animation</h2><input type="checkbox" bind:checked={settings.crossfade} /></div>
        <hr>
        <div class="setting"><h2>Simple mode</h2><input type="checkbox" /></div>
        <hr>
        <div class="setting"><h2>test</h2><input type="checkbox" /></div>
        <hr>
        <div class="setting"><h2>test</h2><input on:keydown|stopPropagation /></div>
      </div>
    {:else if (route === "songselector")}
      <div class="songselector" in:fade>
        <div class="songlist">
          <h1><i class="bi bi-floppy" />Stored</h1>
          <hr />
          <DragList items={songs} name="stored" />
        </div>
        <div class="songlist">
          <h1><i class="bi bi-tv" />Current</h1>
          <hr />
          <DragList bind:items={currentSongs} name="current" />
        </div> 
      </div>
    {:else if (route === "editor")}
      <div class="editor" in:fade>
        <div class="songlist" bind:this={editingSongList}>
          <h1><i class="bi bi-file-earmark-plus" />New Song</h1>
          {#each songs as song}
            <h3 on:click={evt => editingSong = Array.from(editingSongList.querySelectorAll("h3")).indexOf(evt.target)}>{song.name}</h3>
          {/each}
        </div> 
        <textarea placeholder="input" spellcheck="false" bind:this={editorTextArea} on:keydown|stopPropagation />
      </div>
    {:else if (route === "about")}
      <div in:fade>
        <h1>This is free and open source software</h1>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
.main {
  display: flex;
  width: 90vw;
  height: 90vh;
  .navbar {
    display: flex;
    flex-direction: column;
    width: 20%;
    border-right: 1px var(--border-color) solid;
    h1 {
      margin-left: 15px;
      margin-top: 5px;
      margin-bottom: 15px;
      display: flex;
    }
    h2 {
      margin-left: 15px;
      margin-right: 15px;
      transition: all 250ms;
      border-radius: 10px;
      &:hover {
        background-color: rgb(18, 29, 29);
        cursor: pointer;
      }
      i {
        margin: 5px;
      }
      span {
        margin-left: 5px;
      }
    }
  }
  .content {
    width: 80%;
    height: 100%;
    .settings {
      .setting {
        display: flex;
        margin: 15px;
        width: calc(100% - 30px);
        input {
          margin-top: 5.5px;
          height: 23px;
          float: right;
          background-color: var(--border-color);
          color: white;
          border: 1px var(--border-color) solid;
          &[type=checkbox] {
            width: 23px;
          }
        }
      }
    }
    .editor {
      height: 100%;
      width: 100%;
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
    }
    .songselector {
      display: flex;
      height: 100%;
      width: 100%;
    }
    .songselector .songlist, .editor .songlist {
      width: 50%;
      &:nth-child(1) {
        border-right: 1px var(--border-color) solid;
      }
      &:nth-child(2) h1 {
        border-top-right-radius: 32px
      }
      h1 {
        transition: all 250ms;
        &:hover {
          cursor: pointer;
          background-color: rgb(18, 29, 29);
        }
        .bi {
          margin: 4px;
        }
      }
      h3 {
        padding-top: 5px;
        padding-bottom: 5px;
        transition: all 250ms;
        &:hover {
          cursor: pointer;
          background-color: rgb(18, 29, 29);
        }
      }
    }
  }
  .close {
    display: grid;
    place-content: center;
    background-color: transparent;
    border: none;
    color: white;
    width: 50px;
    height: 50px;
    cursor: pointer;
    i {
      font-size: 2rem;
    }
  }
}
</style>