<script lang="ts">
  import { displayData } from "$lib/localStorage.svelte"
  import { onMount } from "svelte"
  import { crossfade, fade, fly } from "svelte/transition"
  import { sidebarFade } from "$lib/transitions"
  import { cubicInOut } from "svelte/easing"
  import Sortable from "sortablejs"
  import Preview from "$lib/Preview.svelte"
  import Settings from "$lib/Settings.svelte"
  import Songs from "$lib/Songs.svelte"

  const { data } = $props()

  let listElm: HTMLDivElement
  let sortable: Sortable
  onMount(() => {
    sortable = new Sortable(listElm, {
      animation: 300,
      ghostClass: "dragging",
      group: {
        name: "songs",
      },
      removeOnSpill: true,
      onEnd: recreateService,
      onAdd: recreateService,
    })
  })

  const [send, recieve] = crossfade({
    duration: 300,
    fallback: fade,
  })

  let service = $state([{ id: 1 }, { id: 4 }, { id: 5 }, { id: 4 }])

  function recreateService() {
    service = sortable.toArray().map((itm: string) => {
      return { id: parseInt(itm) }
    })
    listElm.querySelectorAll("div").forEach((elm) => elm.remove())
    console.log(service)
  }

  let current = $state({ song: 0, lyric: 0 })
  let blank = $state(false)
  let sidePanel: string | null = $state(null)

  $effect(() => {
    document.querySelectorAll(".songs > div > button")?.item(current.song)?.scrollIntoViewIfNeeded()
    document.querySelectorAll(".lyrics > div > button")?.item(current.lyric)?.scrollIntoViewIfNeeded()
    scrollTo(0, -1)
    if (!blank) {
      displayData.set({
        name: data.songs.find((song) => song.id === service[current.song].id)?.name,
        artists: data.songs.find((song) => song.id === service[current.song].id)?.artists,
        lyric: data.songs.find((song) => song.id === service[current.song].id)?.lyrics[current.lyric],
      })
    } else {
      displayData.set({name: "", artists: [""], lyric: { type: "", text: "", number: "" }})
    }
  })

  $effect.pre(() => {
    current.song
    current.lyric = 0
  })

  onMount(() => {
    displayData.subscribe((data) => {
      localStorage.setItem("displayData", JSON.stringify(data))
    })
    displayData.set(JSON.parse(localStorage.getItem("displayData") ?? "null"))
  })

  function handleKey(evt: KeyboardEvent) {
    console.log(evt.key)
    switch (evt.key) {
      case "d":
        open("/display", "_blank", "popup")
        break
      case "b":
        blank = !blank
        break
      case "ArrowLeft":
        evt.preventDefault()
        if (service[current.song - 1 - (evt.shiftKey as unknown as number)])
          current.song -= 1 + (evt.shiftKey as unknown as number)
        break
      case "ArrowRight":
        evt.preventDefault()
        if (service[current.song + 1 + (evt.shiftKey as unknown as number)])
          current.song += 1 + (evt.shiftKey as unknown as number)
        break
      case "ArrowUp":
        evt.preventDefault()
        if (data.songs.find((song) => song.id === service[current.song].id)!.lyrics[current.lyric - 1 - (evt.shiftKey as unknown as number)])
          current.lyric -= 1 + (evt.shiftKey as unknown as number)
        break
      case "ArrowDown":
        evt.preventDefault()
        if (data.songs.find((song) => song.id === service[current.song].id)!.lyrics[current.lyric + 1 + (evt.shiftKey as unknown as number)])
          current.lyric += 1 + (evt.shiftKey as unknown as number)
        break
    }
  }
</script>

<svelte:window onbeforeunload={() => displayData.set(null)} onkeydown={handleKey} />

<div class="main">
  <div class="sidebar">
    <div class="top">
      <button title="Songs" onclick={() => (sidePanel !== "songs" ? (sidePanel = "songs") : (sidePanel = null))}>
        {#if sidePanel === "songs"}
          <i transition:sidebarFade class="bi bi-file-earmark-music-fill"></i>
          <div class="selector" in:recieve={{ key: "sidepanel" }} out:send={{ key: "sidepanel" }}></div>
        {:else}
          <i transition:sidebarFade class="bi bi-file-earmark-music"></i>
        {/if}
      </button>
      <button
        title="Settings"
        onclick={() => (sidePanel !== "settings" ? (sidePanel = "settings") : (sidePanel = null))}
      >
        {#if sidePanel === "settings"}
          <i transition:sidebarFade class="bi bi-gear-fill"></i>
          <div class="selector" in:recieve={{ key: "sidepanel" }} out:send={{ key: "sidepanel" }}></div>
        {:else}
          <i transition:sidebarFade class="bi bi-gear"></i>
        {/if}
      </button>
    </div>
    <div class="bottom">
      <button title="Blank Screen" class={blank ? "active" : ""} onclick={() => (blank = !blank)}>
        {#if blank}
          <i transition:sidebarFade class="bi bi-aspect-ratio-fill"></i>
        {:else}
          <i transition:sidebarFade class="bi bi-aspect-ratio"></i>
        {/if}
      </button>
    </div>
  </div>
  <div class="console {sidePanel ? 'sidepanelactive' : ''}">
    {#if sidePanel}
      <div transition:fly={{ duration: 400, easing: cubicInOut, opacity: 1 }} class="sidepanel">
        {#if sidePanel === "songs"}
          <Songs songs={data.songs} />
        {:else if sidePanel === "settings"}
          <Settings />
        {/if}
      </div>
    {/if}
    <div class="songs">
      <div class="list" bind:this={listElm}>
        {#each service as idObj (idObj)}
          <button data-id={idObj.id} onclick={() => (current.song = service.indexOf(idObj))}>
            <h3>{data.songs.find((song) => song.id === idObj.id)?.name}</h3>
            <p>
              {data.songs
                .find((song) => song.id === idObj.id)
                ?.artists.reduce((carry, artist) => carry + `, ${artist}`)}
            </p>
            {#if service[current.song] === idObj}
              <div class="selector" in:recieve={{ key: "song" }} out:send={{ key: "song" }}></div>
            {/if}
          </button>
        {/each}
      </div>
    </div>
    <div class="lyrics">
      <div class="list">
        {#each data.songs.find((song) => song.id === service[current.song].id)!.lyrics as lyric}
          <button onclick={() => (current.lyric = data.songs.find((song) => song.id === service[current.song].id)!.lyrics.indexOf(lyric))}>
            <h3>{lyric.type} {lyric.number}</h3>
            <p>{lyric.text}</p>
            {#if current.lyric === data.songs.find((song) => song.id === service[current.song].id)!.lyrics.indexOf(lyric)}
              <div class="selector" in:recieve={{ key: "lyric" }} out:send={{ key: "lyric" }}></div>
            {/if}
          </button>
        {/each}
      </div>
    </div>
    <div class="preview">
      <Preview />
    </div>
  </div>
</div>

<style>
  div.main {
    display: grid;
    grid-template-columns: 48px 1fr;
    div.sidebar {
      background-color: rgb(20, 20, 20);
      border-right: 1px solid var(--border);
      display: grid;
      grid-template-rows: 1fr 1fr;
      z-index: 2;
      & > div {
        display: flex;
        flex-direction: column;
        &.bottom {
          flex-direction: column-reverse;
          justify-content: end;
        }
        button {
          position: relative;
          background: none;
          border: 1px solid var(--border-subtle);
          border-bottom: none;
          width: 40px;
          height: 40px;
          margin: 0 4px;
          .selector {
            width: 100%;
            height: 100%;
            background: var(--border);
          }
          &.active {
            background: var(--border);
          }
          &:first-child {
            margin-top: 4px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            .selector {
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
          }
          &:last-child {
            margin-bottom: 4px;
            border-bottom: 1px solid var(--border-subtle);
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            .selector {
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
            }
          }
          i {
            position: absolute;
            top: 10px;
            left: 11px;
            z-index: 2;
          }
        }
      }
    }
    div.console {
      display: grid;
      position: relative;
      grid-template-areas: "songs lyrics" "preview lyrics";
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr;
      height: calc(100vh - 16px);
      gap: 8px;
      margin: 8px;
      transition: translate 400ms cubic-bezier(0.42, 0, 0.58, 1);
      &.sidepanelactive {
        translate: calc(50% + 4px);
      }
      & > div {
        border: 1px solid var(--border);
        border-radius: 8px;
        overflow: scroll;
        &.songs {
          grid-area: songs;
        }
        &.lyrics {
          grid-area: lyrics;
        }
        &.preview {
          grid-area: preview;
        }
        &.sidepanel {
          position: absolute;
          left: calc(-50% - 4px);
          background: rgb(20, 20, 20);
          backdrop-filter: blur(20px);
          width: calc(50% - 6px);
          height: calc(100% - 2px);
        }
      }
    }
  }
</style>
