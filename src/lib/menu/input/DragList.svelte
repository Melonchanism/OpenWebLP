<script lang="ts">
import type { Song } from "$lib/types";
import Sortable from "sortablejs";
import {onMount} from "svelte";
export let items: Song[];
export let copy = false;
let listElm: HTMLDivElement;
onMount(() => {
	const list = new Sortable(listElm, {
		group: {
			name:"shared",
			pull: copy ? "clone" : undefined,
			put: !copy
		},
		sort: !copy,
		animation: 150,
		swapClass: "dragging"
	})
})
</script>

<div bind:this={listElm}>
	{#each items as item}
		<h3>{item.name}</h3>
	{/each}
</div>

<style lang="less">
h3 {
	padding: 5px;
	:is(.dragging) {
		transition: height 150ms;
		height: 0;
	}
}
</style>