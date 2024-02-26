<script lang="ts">
  import { blur } from "svelte/transition";

  let remoteEnabled = false;
</script>

<div class="main">
  <div class="section">
    <button
      class="item {remoteEnabled ? 'current' : ''}"
      on:click={() => (remoteEnabled = !remoteEnabled)}
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
  {#if remoteEnabled}
    <div class="section" transition:blur={{ delay: 300 }}>
      <div class="item">
        <div class="info">
          Remote Code
          <br />
          This is the code you will need to enter on the remote page
        </div>
        <input type="text" value="123456" readonly />
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
      }
    }
  }
  input {
    text-align: right;
  }
</style>
