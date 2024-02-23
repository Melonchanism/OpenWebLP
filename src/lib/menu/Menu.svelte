<script lang="ts">
  import { scale } from "svelte/transition";
  import Settings from "$lib/menu/routes/Settings.svelte";
  import Service from "$lib/menu/routes/Service.svelte";
  import Editor from "$lib/menu/routes/Editor.svelte";
  import About from "$lib/menu/routes/About.svelte";

  let show = false;
  let route = "settings";
</script>

<svelte:window
  on:keydown={(evt) => (evt.key === "Escape" ? (show = false) : null)}
/>

{#if show}
  <div class="main glass" transition:scale>
    <div class="sidebar">
      <h1 class="title">Menu</h1>
      <div>
        <button
          class="item {route === 'settings' ? 'current' : ''}"
          on:click={() => (route = "settings")}
        >
          <i class="bi bi-gear" /> Settings
        </button>
        <button
          class="item {route === 'service' ? 'current' : ''}"
          on:click={() => (route = "service")}
        >
          <i class="bi bi-music-note-list" /> Service
        </button>
        <button
          class="item {route === 'editor' ? 'current' : ''}"
          on:click={() => (route = "editor")}
        >
          <i class="bi bi-pencil" /> Editor
        </button>
        <button
          class="item {route === 'about' ? 'current' : ''}"
          on:click={() => (route = "about")}
        >
          <i class="bi bi-info-circle" /> About
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
      {:else if route === "about"}
        <About />
      {/if}
    </div>
  </div>
{/if}

<button
  class="toggle glass {show ? 'open' : ''}"
  name="menu"
  on:click={() => (show = !show)}
>
  {#if show}
    <i class="bi bi-x-lg" style="font-size: xx-large" />
  {:else}
    <i class="bi bi-list" style="font-size: xx-large" />
  {/if}
</button>

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
      border-right: 2px solid var(--border-color);
      h1.title {
        margin-left: 56px;
        margin-top: 8px;
        @media (max-width: 1000px) {
          opacity: 0;
          width: 0;
        }
      }
      div {
        display: flex;
        flex-direction: column;
        button.item {
          width: calc(100% - 16px);
          @media (max-width: 1000px) {
            width: auto;
            font-size: 0px !important;
            color: transparent;
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
    color: white;
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 16px;
    left: 16px;
    transition: all 300ms;
    &.open {
      left: calc(10vw + 8px);
      bottom: calc(90vh - 48px);
      @media (max-width: 1000px) {
        left: 8px;
        bottom: calc(100vh - 48px);
      }
    }
  }
</style>
