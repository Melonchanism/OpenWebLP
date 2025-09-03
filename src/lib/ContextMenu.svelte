<script lang="ts">
	import { fade } from "svelte/transition"
	import {
		menuShown,
		menuElement,
		menuPos,
		menuServiceIndex,
		sidePanel,
		SidePanel,
	} from "$lib/sharedState"
	import { service } from "./localStorage"
	import { clickoutside } from "@svelte-put/clickoutside"

	function editSong() {
		$sidePanel = SidePanel.Editor
		close()
	}

	function removeSong() {
		if ($menuServiceIndex != null) {
			if ($menuServiceIndex != 0) {
				$service = $service.toSpliced($menuServiceIndex!, 1)
			} else {
				$service = $service.slice(1)
			}
		}
		close()
	}

	function close() {
		$menuShown = false
		$menuServiceIndex = null
		$menuElement?.classList.remove("highlighted")
	}
	$effect(() => {
		console.log($menuServiceIndex)
	})
</script>

{#if $menuShown}
	<div
		class="menu"
		style={`top: ${$menuPos.y - 4}px; left: ${$menuPos.x}px;`}
		out:fade={{ duration: 150 }}
		use:clickoutside
		onclickoutside={close}
	>
		<button onmouseup={editSong} onclick={editSong}>
			<i class="bi bi-pencil"></i>
			<p>Edit Song</p>
		</button>
		{#if $menuServiceIndex != null}
			<button onmouseup={removeSong} onclick={removeSong}>
				<i class="bi bi-file-earmark-minus"></i>
				<p>Remove From Service</p>
			</button>
		{/if}
	</div>
{/if}

<style lang="scss">
	div.menu {
		border: 1px var(--border) solid;
		border-radius: 8px;
		box-shadow: 0 10px 32px rgba(0, 0, 0, 0.5);
		background: rgba(32, 32, 32, 0.7);
		backdrop-filter: blur(20px);
		position: fixed;
		z-index: 5;
		padding: 2px;
		& > * {
			display: flex;
			background: none;
			border-radius: 8px;
			padding: 6px;
			width: 100%;
			i {
				margin-right: 4px;
			}
		}
		& > button:hover {
			transition: background 0ms;
			background: var(--highlight);
		}
	}
</style>
