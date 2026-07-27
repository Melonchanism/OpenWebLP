<script lang="ts">
	import { onMount } from "svelte"
	import { aspectRatio, resolution } from "./localStorage"
	import { SidePanel, sidePanel, animating } from "./sharedState"

	let sml = $state(false)

	let container: HTMLDivElement

	onMount(() => {
		containPreview()
		new ResizeObserver(containPreview).observe(container)
		$effect(containPreview)
	})

	function containPreview() {
		const rect = container.getBoundingClientRect()
		sml = rect.width / rect.height < $aspectRatio
	}
</script>

<div bind:this={container} class="container" style:--aspect-ratio={$aspectRatio}>
	<iframe
		class="{sml ? 'sml' : ''} {$sidePanel !== SidePanel.None ? 'panelopen' : ''} {$animating ? 'animating' : ''}"
		style:--width={$resolution.width}
		style:--height={$resolution.height}
		src="/display"
		title="Preview"
	></iframe>
</div>

<style>
	div.container {
		height: 100%;
		width: 100%;
		position: relative;
	}
	iframe {
		border: 0.1px var(--border-subtle) solid;
		width: calc(var(--width) * 1px);
		height: calc(var(--height) * 1px);
		position: absolute;
		top: 50%;
		left: 50%;
		transform-origin: 50% 50%;
		transform: translate(-50%, -50%) scale(calc((50vh - 40px) / 1px / var(--height)));
		min-height: 0;
		&.sml {
			transform: translate(-50%, -50%) scale(calc((50vw - 60px) / 1px / var(--width)));
		}
		&.panelopen.sml {
			transform: translate(-50%, -50%) scale(calc((min(33vw, (100vw - 400px) / 2)) / 1px / var(--width)));
		}
		&.animating {
			transition: transform 300ms;
		}
	}
</style>
