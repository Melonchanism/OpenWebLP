<script lang="ts">
  import { displayData, service } from "$lib/localStorage"
  import { onMount } from "svelte"
  import { menuBlur, send, recieve } from "$lib/transitions"
  import { showMenu, menuPos, menuID, sidePanel } from "$lib/contextMenu"
  import Sortable from "sortablejs"
  import Preview from "$lib/Preview.svelte"
  import SideBar from "$lib/side/Bar.svelte"
	import Panel from "$lib/side/Panel.svelte"
	import ContextMenu from "$lib/ContextMenu.svelte"

  let { data } = $props()
  let songs = $state(data.songs)

  const keyChannel = new BroadcastChannel("key")
  keyChannel.addEventListener("message", evt => handleKey(evt.data))

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
    $service = JSON.parse(localStorage.getItem("service") ?? "[]")
    $effect(() => localStorage.setItem("service", JSON.stringify($service)))
    $displayData = JSON.parse(localStorage.getItem("displayData") ?? "null")
    displayData.subscribe((data) => {localStorage.setItem("displayData", JSON.stringify(data))})
  })

  function recreateService() {
    $service = sortable.toArray().map((itm: string) => parseInt(itm))
    listElm.querySelector("button.added-song")?.remove()
    console.log($service)
  }

  let current = $state({ song: 0, lyric: 0 })
  let blank = $state(false)

  $effect(() => {
    if ($service[0]) {
      //@ts-ignore
      document.querySelectorAll(".songs > div > button")?.item(current.song)?.scrollIntoViewIfNeeded()
      //@ts-ignore
      document.querySelectorAll(".lyrics > div > button")?.item(current.lyric)?.scrollIntoViewIfNeeded()
      scrollTo(0, -1)
      if (!blank) {
        displayData.set({
          name: songs.find((song) => song.id === $service[current.song])?.name ?? "",
          artist: songs.find((song) => song.id === $service[current.song])?.artist ?? "",
          lyric: songs.find((song) => song.id === $service[current.song])?.lyrics[current.lyric],
        })
      } else {
        displayData.set({name: "", artist: "", lyric: { type: "", text: "", number: -1 }})
      }
    }
  })

  $effect.pre(() => {
    $service
    current.song
    current.lyric = 0
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
        if (evt.cancelable) evt.preventDefault()
        if ($service[current.song - 1 - (evt.shiftKey as unknown as number)])
          current.song -= 1 + (evt.shiftKey as unknown as number)
        break
      case "ArrowRight":
        if (evt.cancelable) evt.preventDefault()
        if ($service[current.song + 1 + (evt.shiftKey as unknown as number)])
          current.song += 1 + (evt.shiftKey as unknown as number)
        break
      case "ArrowUp":
        if (evt.cancelable) evt.preventDefault()
        if (songs.find((song) => song.id === $service[current.song])?.lyrics[current.lyric - 1 - (evt.shiftKey as unknown as number)])
          current.lyric -= 1 + (evt.shiftKey as unknown as number)
        break
      case "ArrowDown":
        if (evt.cancelable) evt.preventDefault()
        if (songs.find((song) => song.id === $service[current.song])?.lyrics[current.lyric + 1 + (evt.shiftKey as unknown as number)])
          current.lyric += 1 + (evt.shiftKey as unknown as number)
        break
      default:
        if (parseInt(evt.key) > 0 && songs.find((song) => song.id === $service[current.song])?.lyrics[parseInt(evt.key) - 1]) current.lyric = parseInt(evt.key) - 1
        else if ($service[parseInt(evt.key.substring(1)) - 1]) current.song = parseInt(evt.key.substring(1)) - 1
    }
  }
</script>

<svelte:window onbeforeunload={() => displayData.set(null)} onkeydown={handleKey} />

<div class="main">
  <SideBar bind:blank />
  <div class="console {$sidePanel ? 'sidepanelactive' : ''}">
    <Panel bind:songs />
    <div class="songs">
      <div class="list" bind:this={listElm}>
        {#if $service}
          <!-- I have no idea how Math.random() works but I think that all the elements just get refreshed -->
          {#each $service as id, idx (Math.random())}
            <button
              data-id={id}
              onclick={() => (current.song = idx)}
              oncontextmenu={(evt) => {
                evt.preventDefault()
                $menuID = id
                $showMenu = true
                $menuPos = { x: evt.clientX, y: evt.clientY }
              }}>
              <kbd>F{idx + 1}</kbd>
              <div>
                <h3>{songs.find((song) => song.id === id)?.name}</h3>
                <p>{songs.find((song) => song.id === id)?.artist}</p>
                {#if current.song === idx}
                  <div class="selector" in:recieve={{ key: "song" }} out:send={{ key: "song" }}></div>
                {/if}
              </div>
            </button>
          {/each}
        {/if}
      </div>
    </div>
    <div class="lyrics">
      {#if $service[0]}
      {#key current.song}
        <div class="list" transition:menuBlur>
          {#each songs.find((song) => song.id === $service[current.song])!.lyrics as lyric, idx}
            <button onclick={() => (current.lyric = idx)}>
              <kbd>{idx + 1}</kbd>
                <div>
                  <h3>{lyric.type} {lyric.number}</h3>
                  <p>{lyric.text}</p>
                  {#if current.lyric === idx}
                    <div class="selector" in:recieve={{ key: "lyric" }} out:send={{ key: "lyric" }}></div>
                  {/if}
                </div>
            </button>
          {/each}
        </div>
      {/key}
      {/if}
    </div>
    <div class="preview">
      <Preview />
    </div>
  </div>
  <ContextMenu {data} />
</div>

<style>
  div.main {
    display: grid;
    grid-template-columns: 48px 1fr;
    div.console {
      display: grid;
      position: relative;
      grid-template-areas: "songs lyrics" "preview lyrics";
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr;
      height: calc(100vh - 16px);
      gap: 8px;
      margin: 8px;
      transition: left 400ms cubic-bezier(0.42, 0, 0.58, 1);
      left: 0;
      &.sidepanelactive {
        left: calc(50% - 4px);
      }
      & > div {
        border: 1px solid var(--border);
        border-radius: 8px;
        overflow: scroll;
        &.songs {
          grid-area: songs;
          position: relative;
        }
        &.lyrics {
          grid-area: lyrics;
          position: relative;
        }
        &.preview {
          grid-area: preview;
        }
        .list {
          min-height: calc(100% - 20px);
          width: calc(100% - 16px);
          position: absolute;
          & > button {
            display: flex;
            align-items: center;
            &:hover {
              color: #b4b4b4;
            }
            kbd {
              color: gray;
              position: relative;
              margin-right: 8px;
              top: 50%;
            }
          }
        }
      }
    }
  }
</style>
