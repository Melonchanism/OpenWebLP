<script lang="ts">
	import { menuBlur } from "../transitions"
	import { menuID } from "$lib/contextMenu"
	import type { Song } from "$lib/localStorage"

	let { data }: { data: { songs: Song[] } } = $props()
</script>

<div transition:menuBlur class="sidepanelcontent">
	<h2>Edit Song</h2>
	<!-- {#if $menuID !== -1} -->
	<!-- <input type="text" value={data?.songs?.find((song) => song.id === $menuID)?.name ?? ""} /> -->
	<!-- {/if} -->
</div>
