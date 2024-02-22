<script lang="ts">
  import { scale } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { send, recieve } from "./crossfade";
  import Settings from "./applets/Settings.svelte";
  import SongSelector from "./applets/SongManager.svelte";
  import Editor from "./applets/Editor.svelte";

  export let channel: BroadcastChannel;
  const dispatch = createEventDispatcher();
  let route = "settings";
</script>

<div class="main" transition:scale|global={{ duration: 500, easing: cubicOut }}>
  <div class="navbar">
    <h1>Menu</h1>
    <h2
      on:click={() => (route = "settings")}
      aria-current={route === "settings"}
    >
      <i class="bi bi-gear" /><span>Settings</span>
    </h2>
    <h2
      on:click={() => (route = "songselector")}
      aria-current={route === "songselector"}
    >
      <i class="bi bi-music-note" /><span>Select Songs</span>
    </h2>
    <h2 on:click={() => (route = "editor")} aria-current={route === "editor"}>
      <i class="bi bi-pen" /><span>Editor</span>
    </h2>
    <h2 on:click={() => (route = "about")} aria-current={route === "about"}>
      <i class="bi bi-info" /><span>About</span>
    </h2>
  </div>
  <div class="content">
    {#if route === "settings"}
      <Settings {channel} />
    {:else if route === "songselector"}
      <SongSelector />
    {:else if route === "editor"}
      <Editor />
    {:else if route === "about"}
      <div
        class="about"
        in:send|global={{ key: "menu" }}
        out:recieve|global={{ key: "menu" }}
      >
        <h1>This is free and open source software</h1>
      </div>
    {/if}
  </div>
</div>

<style lang="less">
  .main {
    display: flex;
    position: absolute;
    left: 10vw;
    bottom: 10vh;
    border-radius: 32px;
    height: 80vh;
    width: 80vw;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background-color: #1010109a;
    box-shadow: 0 0 900px #101010;
    border: 1px var(--border-color) solid;
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
  }
</style>
