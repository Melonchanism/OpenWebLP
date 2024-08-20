<script>
	import { menuFade, recieve, send } from "$lib/transitions"
	let { sidePanel = $bindable(), blank = $bindable() } = $props()
</script>

<div class="sidebar">
	<div class="top">
		<button title="Songs" onclick={() => (sidePanel !== "songs" ? (sidePanel = "songs") : (sidePanel = null))}>
			{#if sidePanel === "songs"}
				<i transition:menuFade class="bi bi-file-earmark-music-fill"></i>
				<div class="selector" in:recieve={{ key: "sidepanel" }} out:send={{ key: "sidepanel" }}></div>
			{:else}
				<i transition:menuFade class="bi bi-file-earmark-music"></i>
			{/if}
		</button>
		<button title="Settings" onclick={() => (sidePanel !== "settings" ? (sidePanel = "settings") : (sidePanel = null))}>
			{#if sidePanel === "settings"}
				<i transition:menuFade class="bi bi-gear-fill"></i>
				<div class="selector" in:recieve={{ key: "sidepanel" }} out:send={{ key: "sidepanel" }}></div>
			{:else}
				<i transition:menuFade class="bi bi-gear"></i>
			{/if}
		</button>
	</div>
	<div class="bottom">
		<button title="Blank Screen" class={blank ? "active" : ""} onclick={() => (blank = !blank)}>
			{#if blank}
				<i transition:menuFade class="bi bi-aspect-ratio-fill"></i>
			{:else}
				<i transition:menuFade class="bi bi-aspect-ratio"></i>
			{/if}
		</button>
	</div>
</div>

<style>
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
					border-radius: inherit;
				}
				&:first-child {
					margin-top: 4px;
					border-top-left-radius: 8px;
					border-top-right-radius: 8px;
				}
				&:last-child {
					margin-bottom: 4px;
					border-bottom: 1px solid var(--border-subtle);
					border-bottom-left-radius: 8px;
					border-bottom-right-radius: 8px;
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
</style>
