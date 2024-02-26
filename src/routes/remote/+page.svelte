<script lang="ts">
  import { supabase } from "$lib/supabase";
  import { scale } from "svelte/transition";
  import { allSongs, myService } from "$lib/songs";
  import "../../styles.css";
  import type { RealtimeChannel } from "@supabase/supabase-js";

  let code: string;
  let showLogin = $state(true);
  let channel: RealtimeChannel;

  let currentLyric = $state(0);
  let currentSong = $state(0);

  function init() {
    console.log("initializing");
    channel = supabase.channel(code!);
    showLogin = false;
    channel
      .on("broadcast", { event: "test" }, (dat) => {
        if (dat.payload.lyric != null) currentLyric = dat.payload.lyric;
        if (dat.payload.song != null) currentSong = dat.payload.song;
        console.log(dat);
      })
      .subscribe();
    channel.track({});
  }
  $effect(() => {
    currentSong + currentLyric;
    if (channel) {
      channel.send({
        type: "broadcast",
        event: "test",
        payload: {
          lyric: currentLyric,
          song: currentSong,
        },
      });
    }
  });
</script>

<div class="main">
  <button
    class="notitem"
    on:click={() => {
      if (
        channel &&
        $allSongs[$myService.songs[currentSong]]?.lyrics[currentLyric - 1]
      ) {
        currentLyric--;
      }
    }}>Previous Lyric</button
  >
  <button
    class="notitem"
    on:click={() => {
      if (
        channel &&
        $allSongs[$myService.songs[currentSong]]?.lyrics[currentLyric + 1]
      ) {
        currentLyric++;
      }
    }}>Next Lyric</button
  >
  <button
    class="notitem"
    on:click={() => {
      if (channel && $allSongs[$myService.songs[currentSong - 1]]) {
        currentLyric = 0;
        currentSong--;
      }
    }}>Previous Song</button
  >
  <button
    class="notitem"
    on:click={() => {
      if (channel && $allSongs[$myService.songs[currentSong + 1]]) {
        currentLyric = 0;
        currentSong++;
      }
    }}>Next Song</button
  >
</div>
{#if showLogin}
  <div class="login glass" transition:scale={{ duration: 300 }}>
    <h1>Enter Code</h1>
    <form on:submit|preventDefault={init}>
      <input type="text" bind:value={code} />
      <input type="submit" />
    </form>
  </div>
{/if}

<style>
  div.main {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-columns: auto auto;
    button {
      height: 40dvh;
    }
  }
  div.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    form {
      display: flex;
      flex-direction: column;
    }
  }
</style>
