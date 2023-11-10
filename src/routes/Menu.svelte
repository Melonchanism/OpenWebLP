<script lang="ts">
import { fade, slide } from "svelte/transition";
import { createEventDispatcher, onMount } from "svelte";
export let channel: BroadcastChannel;
export let songs;
let route = "settings";
let settings = JSON.parse(localStorage.getItem("settings")!) ?? {
  crossfade: true,
}
const dispatch = createEventDispatcher();
onMount(() => {
  document.querySelectorAll(".setting > input").forEach(elm => elm.addEventListener("input", () => {
    setTimeout(() => {
      localStorage.setItem("settings", JSON.stringify(settings));
      channel.postMessaage({type: "settingupdate"});
    }, 50);
  }));
});
</script>

<div class="main" transition:slide>
  <div class="navbar">
    <h1>Menu</h1>
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
        <div class="setting"><h2>test</h2><input type="checkbox" /></div>
        <hr>
        <div class="setting"><h2>test</h2><input type="checkbox" /></div>
        <hr>
        <div class="setting"><h2>test</h2><input on:keydown|stopPropagation /></div>
      </div>
    {:else if (route === "songselector")}
      <div class="songselector">
        <div class="songlist">
          <hr />
          {#each songs as song}
            <h3>{song.name}</h3>
            <hr />
          {/each}
        </div>
        <div class="songlist">
          <hr />
          {#each songs as song}
            <h3>{song.name}</h3>
            <hr />
          {/each}
        </div> 
      </div>
    {:else if (route === "editor")}
      <div class="editor" in:fade>
        <div class="songlist">
          <h2><i class="bi bi-file-earmark-plus" />New Song</h2>
          <hr />
          {#each songs as song}
            <h3>{song.name}</h3>
            <hr />
          {/each}
        </div> 
        <textarea placeholder="input" />
      </div>
    {:else if (route === "about")}
      <div in:fade>
        <h1>This is free and open source software</h1>
      </div>
    {/if}
  </div>
  <button class="close" on:click={() => dispatch("close")}><i class="bi bi-x-lg" /></button>
</div>

<style lang="postcss">
.main {
  backdrop-filter: blur(8px);
  background-color: #10101059;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70vw;
  height: 70vh;
  transform: translate(-50%, -50%);
  border-radius: 32px;
  .navbar {
    display: flex;
    flex-direction: column;
    width: 30%;
    border-right: 1px var(--border-color) solid;
    h1 {
      margin-left: 15px;
      margin-top: 5px;
      margin-bottom: 15px;
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
    width: 70%;
    height: 100%;
    .settings {
      .setting {
        display: flex;
        margin: 15px;
        width: calc(100% - 30px);
        input {
          margin-top: 5.5px;
          height: 23px;
          position: absolute;
          right: 100px;
          background-color: var(--border-color);
          color: white;
          border: 1px var(--border-color) solid;
          &[type=checkbox] {
            width: 23px;
          }
        }
      }
      .save {
        position: absolute;
        bottom: 15px;
        width: 50px;
        height: 25px;
        background-color: #00000000;
        border: none;
        border-radius: 8px;
        color: white;
        transition: all 250ms;
        &:hover {
          background-color: rgb(18, 29, 29);
        }
      }
    }
    .editor {
      height: 100%;
      width: 100%;
      display: flex;
      textarea {
        background-color: #00000000;
        color: white;
        border: none;
        resize: none;
        width: 50%;
        height: 100%;
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
    }
  }
  .close {
    display: grid;
    place-content: center;
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #00000000;
    border: none;
    color: white;
    width: 50px;
    height: 50px;
    cursor: pointer;
    i {
      font-size: 3rem;
    }
  }
}
</style>