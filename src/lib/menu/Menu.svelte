<script lang="ts">
import { scale } from "svelte/transition";
import { createEventDispatcher } from "svelte";
import { cubicInOut } from "svelte/easing";
import { send, recieve } from "./crossfade";
import Settings from "./Settings.svelte";
import SongSelector from "./SongSelector.svelte";
import Editor from "./Editor.svelte";
export let channel: BroadcastChannel;
const dispatch = createEventDispatcher();
let route = "settings";
</script>

<div class="main" transition:scale|global={{duration: 400, easing: cubicInOut}}>
  <div class="navbar">
    <h1><button class="close" on:click={() => dispatch("close")}><i class="bi bi-x-lg" /></button>Menu</h1>
    <h2 on:click={() => route = "settings"} aria-current={route === "settings"}><i class="bi bi-gear" /><span>Settings</span></h2>
    <h2 on:click={() => route = "songselector"} aria-current={route === "songselector"}><i class="bi bi-music-note" /><span>Select Songs</span></h2>
    <h2 on:click={() => route = "editor"} aria-current={route === "editor"}><i class="bi bi-pen" /><span>Editor</span></h2>
    <h2 on:click={() => route = "about"} aria-current={route === "about"}><i class="bi bi-info" /><span>About</span></h2>
  </div>
  <div class="content" >
    {#if (route === "settings")}
      <Settings {channel} />
    {:else if (route === "songselector")}
      <SongSelector />
    {:else if (route === "editor")}
      <Editor />
    {:else if (route === "about")}
      <div class="about" in:send|global={{key:"menu"}} out:recieve|global={{key:"menu"}}>
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
    overflow: scroll;
    display: flex;
    flex-direction: column;
    width: 20%;
    min-width: 220px;
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
    .about {
      position: absolute;
      height: 100%;
      width: 80%;
      display: flex;
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