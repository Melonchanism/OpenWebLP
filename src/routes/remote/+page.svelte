<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";
  import { scale } from "svelte/transition";
  import "../../styles.css";

  let code: string;
  let showLogin = true;

  function init() {
    console.log("initializing");
    let channel = supabase.channel(code!);
    showLogin = false;
    channel
      .on("broadcast", { event: "test" }, (payload) => {
        channel.send({
          type: "broadcast",
          event: "test",
          payload: { message: "echo" + payload.payload.message },
        });
      })
      .subscribe();
  }
</script>

{#if showLogin}
  <div class="main glass" transition:scale={{ duration: 300 }}>
    <h1>Enter Code</h1>
    <form on:submit|preventDefault={init}>
      <input type="text" bind:value={code} />
    </form>
  </div>
{/if}

<style>
  div.main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
