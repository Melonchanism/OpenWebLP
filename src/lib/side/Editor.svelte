<script lang="ts">
	import { menuBlur } from "../transitions"
	import { menuID } from "$lib/contextMenu"
	import { type Song, LyricType } from "$lib/localStorage"

	let { songs = $bindable() }: { songs: Song[] } = $props()
</script>

<div transition:menuBlur class="sidepanelcontent">
	<h2>Edit Song</h2>
	{#if $menuID !== -1}
	<div class="editor">
	 <div class="inputgroup">
		  <span>Title: </span>
		  <input type="text" onkeydown={evt => evt.stopPropagation()} bind:value={songs[songs.findIndex((song) => song.id === $menuID)]!.name} />
		</div>
	   <div class="inputgroup">
		  <span>Artists: </span>
		  <input type="text" onkeydown={evt => evt.stopPropagation()} bind:value={songs[songs.findIndex((song) => song.id === $menuID)]!.artist} />
		</div>
		<div class="list">
		  {#each songs[songs.findIndex((song) => song.id === $menuID)]!.lyrics as lyric}
				<div class="lyric">
				  <div class="metadata">
					<select bind:value={lyric.type}>
					  {#each Object.values(LyricType) as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
					<input bind:value={lyric.number} type="number">
				</div>
        <textarea
          onkeydown={(evt) => {
            evt.stopPropagation();
            setTimeout(() => evt.currentTarget.style.height = `${evt.currentTarget.scrollHeight}px`, 1)
          }}
          bind:value={lyric.text}></textarea>
				</div>
			{/each}
		</div>
	</div>
	{/if}
</div>

<style>
  div.editor {
    display: flex;
    flex-direction: column;
    gap: 8px;
    div.inputgroup {
      border-radius: 8px;
      border: 1px var(--element) solid;
      width: calc(100% - 16px);
      margin: 0 8px;
      display: grid;
      grid-template-columns: auto 1fr;
      overflow: hidden;
      font-size: 20px;
      span {
        color: gray;
        background: var(--stacked-element);
      }
      input {
        font-size: 1em;
        width: calc(100% - 4px);
      }
      * {
        padding: 2px;
      }
    }
    div.list {
      margin-top: 0;
      overflow: scroll;
      max-height: calc(100vh - 136px);
      border-radius: 0;
      div.lyric {
        div.metadata {
          display: flex;
          margin-bottom: 4px;
          input {
            width: 50px;
            margin-left: 4px;
          }
          * {
            padding: 4px;
            border-radius: 8px;
          }
        }
        textarea {
          width: calc(100% - 8px - 2px);
          resize: none;
          min-height: 100px;
          border-radius: 8px;
          border: 1px var(--border-subtle) solid;
          padding: 4px;
        }
      }
    }
  }
</style>
