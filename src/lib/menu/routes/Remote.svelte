<script lang="ts">
  import { blur } from "svelte/transition";
  import { remote } from "$lib/remote";
</script>

<div class="main">
  <div class="section">
    <button
      class="item {$remote.enabled ? 'current' : ''}"
      on:click={() =>
        remote.update((oldval) => {
          oldval.enabled = !oldval.enabled;
          oldval.enabled
            ? (oldval.code = `${Math.round(Math.random() * 9)}${Math.round(Math.random() * 9)}${Math.round(Math.random() * 9)}${Math.round(Math.random() * 9)}`)
            : (oldval.code = "");
          return oldval;
        })}
    >
      <div class="info">
        Enable Remote
        <br />
        Decides if the remote control is enabled via
        <a href="/remote" target="_blank">/remote</a>
      </div>
      <div class="indicator" />
    </button>
  </div>
  {#if $remote.enabled}
    <div class="section" transition:blur={{ duration: 300 }}>
      <div class="item">
        <div class="info">
          Remote Code
          <br />
          This is the code you will need to enter on the remote page
        </div>
        <h2 class="value">{$remote.code}</h2>
      </div>
    </div>
  {/if}
</div>

<style>
  div.main {
    display: flex;
    flex-direction: column;
    div.section {
      display: flex;
      flex-direction: column;
      div.item,
      button.item {
        display: grid;
        grid-template-columns: auto auto;
        h2.value {
          text-align: right;
          align-self: center;
        }
      }
    }
  }
  input {
    text-align: right;
  }
</style>
