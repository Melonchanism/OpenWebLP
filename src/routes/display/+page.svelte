<script lang="ts">
	import { displayData, settings, Transition, DisplayBGType } from "$lib/localStorage"
	import { onMount, tick } from "svelte"

	const keyChannel = new BroadcastChannel("key")

	onMount(() => {
		localStorage.setItem("aspectRatio", `${innerWidth / innerHeight}`)
		displayData.set(JSON.parse(localStorage.getItem("displayData") ?? "null"))
	})
</script>

<svelte:window
	onstorage={(evt) => {
		if (evt.key === "displayData")
			if ($settings?.display.transition !== Transition.none)
				//@ts-expect-error
				document.startViewTransition(async () => {
					$displayData = JSON.parse(evt.newValue ?? "null")
					await tick()
				})
			else $displayData = JSON.parse(evt.newValue ?? "null")
	}}
	onresize={() => {
		if (window.top === window) localStorage.setItem("aspectRatio", `${innerWidth / innerHeight}`)
	}}
	onkeydown={(evt) => {
		console.log(evt.key)
		if (evt.key !== "d") {
			keyChannel.postMessage({
				key: evt.key,
				shiftKey: evt.shiftKey,
			})
		}
	}}
/>

<svelte:head>
	<title>OpenWebLP v3.2 Display</title>
</svelte:head>

<div
	style={`
  color: ${$settings?.display.font.color};
  background: ${
		$settings?.display.bg.type === DisplayBGType.color
			? $settings?.display.bg.value
			: $settings?.display.bg.type === DisplayBGType.gradient
				? `linear-gradient(${$settings?.display.bg.value[0]}, ${$settings?.display.bg.value[1]})`
				: `url('${$settings?.display.bg.value}');`
	};
  font-family: ${$settings?.display.font.family};
  `}
	class="main"
>
	<div
		class="lyric-container"
		style={`view-transition-name: ${$settings?.display.transition !== Transition.morph && $settings?.display.transition !== Transition.fade ? $settings?.display.transition : ""};`}
	>
		<h1
			style={`
      font-weight: ${$settings?.display.font.weight};
      view-transition-name: ${$settings?.display.transition === Transition.morph ? "Morph" : ""};
      font-size: calc((2.7vw + 2.7vh) * ${$settings?.display.font.size});
      `}
		>
			{$displayData?.lyric?.text}
		</h1>
	</div>
	<div class="info-container">
		<p>
			{$displayData?.name ?? " "}<br />{$displayData?.artist ?? " "}
		</p>
		<p>{$displayData?.lyric?.type} {$displayData?.lyric?.number !== -1 ? $displayData?.lyric?.number : ""}</p>
	</div>
</div>

<style>
	div.main {
		width: 100vw;
		height: 100vh;
		background-repeat: no-repeat !important;
		background-size: cover !important;
		div.lyric-container {
			position: fixed;
			display: grid;
			place-items: center;
			height: 100dvh;
			width: 100vw;
			h1 {
				width: fit-content;
				white-space: pre-wrap;
				text-align: center;
			}
		}
		div.info-container {
			position: fixed;
			bottom: 0;
			left: 4px;
			width: calc(100vw - 8px);
			display: flex;
			justify-content: space-between;
			align-items: end;
			p {
				font-size: calc(0.7vw + 0.7vh);
			}
		}
	}

	::view-transition-old(*),
	::view-transition-new(*) {
		animation-duration: 500ms;
	}

	::view-transition-old(Morph),
	::view-transition-new(Morph) {
		height: 100%;
		width: 100%;
	}

	::view-transition-old(Stack) {
		animation-name: fade-out, scale-out;
	}
	::view-transition-new(Stack) {
		animation-name: fade-in, scale-in;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}
	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes scale-in {
		from {
			scale: 0.25;
		}
	}
	@keyframes scale-out {
		to {
			scale: 4;
		}
	}
</style>
