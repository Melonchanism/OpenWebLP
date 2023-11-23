<script lang="ts">
import type { Song } from "$lib/types";
import Sortable from "sortablejs";
export let items: Song[];
</script>

<div>
	{#each items as item}
		<h3>{item.name}</h3>
	{/each}
</div>