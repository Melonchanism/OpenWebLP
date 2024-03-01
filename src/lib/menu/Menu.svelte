<script lang="ts">
  import { scale, fade } from "svelte/transition";
  import Settings from "$lib/menu/routes/Settings.svelte";
  import Service from "$lib/menu/routes/Service.svelte";
  import Editor from "$lib/menu/routes/Editor.svelte";
  import Remote from "$lib/menu/routes/Remote.svelte";
  import About from "$lib/menu/routes/About.svelte";

  let show = false;
  let route: "settings" | "service" | "editor" | "about" | "remote" =
    "settings";
</script>

<svelte:window
  on:keydown={(evt) => (evt.key === "Escape" ? (show = false) : null)}
/>

{#if show}
  <div class="main glass" transition:scale={{ duration: 300 }}>
    <div class="sidebar">
      <div class="titlebar">
        <button class="toggle glass" on:click={() => (show = false)}>
          <i class="bi bi-x-lg" style="font-size: xx-large" />
        </button>
        <h1 class="title">Menu</h1>
      </div>
      <div class="navlinks">
        <button
          class="item {route === 'settings' ? 'current' : ''}"
          on:click={() => (route = "settings")}
        >
          <i class="bi bi-gear" /><span>Settings</span>
        </button>
        <button
          class="item {route === 'service' ? 'current' : ''}"
          on:click={() => (route = "service")}
        >
          <i class="bi bi-music-note-list" /><span>Service</span>
        </button>
        <button
          class="item {route === 'editor' ? 'current' : ''}"
          on:click={() => (route = "editor")}
        >
          <i class="bi bi-pencil" /><span>Editor</span>
        </button>
        <button
          class="item {route === 'remote' ? 'current' : ''}"
          on:click={() => (route = "remote")}
        >
          <i class="bi bi-router" /><span>Remote</span>
        </button>
        <button
          class="item {route === 'about' ? 'current' : ''}"
          on:click={() => (route = "about")}
        >
          <i class="bi bi-info-circle" /><span>About</span>
        </button>
      </div>
    </div>
    <div class="content">
      {#if route === "settings"}
        <Settings />
      {:else if route === "service"}
        <Service />
      {:else if route === "editor"}
        <Editor />
      {:else if route === "remote"}
        <Remote />
      {:else if route === "about"}
        <About />
      {/if}
    </div>
  </div>
{:else}
  <button
    class="toggle original glass"
    name="menu"
    on:click={() => (show = true)}
    transition:fade={{ duration: 300 }}
  >
    <i class="bi bi-list" style="font-size: xx-large" />
  </button>
{/if}

<style>
  div.main {
    display: grid;
    grid-template-columns: 20% 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80dvw;
    height: 80dvh;
    @media (max-width: 1000px) {
      top: 0;
      left: 0;
      transform: none;
      width: 100dvw;
      height: 100dvh;
      grid-template-columns: min-content auto;
    }
    div.sidebar {
      border-right: 1px solid var(--border-color);
      div.titlebar {
        display: flex;
        align-items: center;
        h1.title {
          @media (max-width: 1000px) {
            opacity: 0;
            width: 0;
          }
        }
      }
      div.navlinks {
        display: flex;
        flex-direction: column;
        button.item {
          width: calc(100% - 16px);
          @media (max-width: 1000px) {
            width: auto;
            font-size: 0px !important;
            span {
              display: none;
            }
          }
        }
      }
    }
    div.content {
      max-height: 80vh;
      @media (max-width: 1000px) {
        max-height: 100vh;
      }
      height: inherit;
    }
  }
  button.toggle {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    margin: 8px;
    &.original {
      position: fixed;
      bottom: 16px;
      left: 16px;
    }
  }
</style>
