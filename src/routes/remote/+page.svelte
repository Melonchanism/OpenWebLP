<script lang="ts">
  import { supabase } from "$lib/supabase";
  import { scale, fade } from "svelte/transition";
  import { allSongs, myService } from "$lib/songs";
  import "../../styles.css";
  import type { RealtimeChannel } from "@supabase/supabase-js";

  let code: string;
  let showLogin = $state(true);
  let channel: RealtimeChannel;

  let currentLyric = $state(0);
  let currentSong = $state(0);

  function init() {
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
      <input type="text" inputmode="numeric" bind:value={code} />
      <input type="submit" />
    </form>
  </div>
  <div class="loginbackground" transition:fade={{ duration: 300 }} />
{/if}

<style>
  div.main {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-columns: auto auto;
    gap: 8px;
    button {
      height: calc(50dvh - 4px);
      margin: 0;
    }
  }
  div.login {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    form {
      display: flex;
      flex-direction: column;
    }
  }
  div.loginbackground {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }
</style>
