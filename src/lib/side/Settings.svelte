<script lang="ts">
	import type { HexString } from "../localStorage"
	import { DisplayBGType, Font, Transition, settings } from "../localStorage"
	import { menuBlur, menuFade, send, recieve } from "../transitions"

	let route = $state("display")

	// Update new Display Background value after changing Type
	let oldType = $state.snapshot($settings?.display.bg.type)
	$effect.pre(() => {
		if (!($settings?.display.bg.type === oldType) && $settings) {
			switch ($settings.display.bg.type) {
				case DisplayBGType.color:
					$settings?.display.bg.value[0] ? ($settings.display.bg.value = $settings.display.bg.value[0] as HexString) : "#000000"
					break
				case DisplayBGType.gradient:
					$settings?.display.bg.value[0] === "#"
						? ($settings.display.bg.value = [$settings?.display.bg.value, $settings?.display.bg.value] as [HexString, HexString])
						: ($settings.display.bg.value = ["#000000", "#000000"])
					break
				case DisplayBGType.image:
					$settings.display.bg.value = ""
					break
			}
		}
		oldType = $state.snapshot($settings?.display.bg.type)
	})
</script>

<div transition:menuBlur class="sidepanelcontent">
	<h2>Settings</h2>
	<div class="tabbar">
		<button class={route === "display" ? "active" : ""} onclick={() => (route = "display")}>
			{#if route === "display"}
				<i transition:menuFade class="bi bi-tv-fill"></i>
				<div class="selector" in:recieve={{ key: "settings" }} out:send={{ key: "settings" }}></div>
			{:else}
				<i transition:menuFade class="bi bi-tv"></i>
			{/if}
			<p>Display</p>
		</button>
		<button class={route === "editor" ? "active" : ""} onclick={() => (route = "editor")}>
			{#if route === "editor"}
				<i transition:menuFade class="bi bi-pencil-fill"></i>
				<div class="selector" in:recieve={{ key: "settings" }} out:send={{ key: "settings" }}></div>
			{:else}
				<i transition:menuFade class="bi bi-pencil"></i>
			{/if}
			<p>Editor</p>
		</button>
	</div>
	<div class="settings">
		{#if route === "display"}
			<div class="panel" transition:menuBlur>
				<div class="list">
					<div>
						<div>
							<h3>Background Type</h3>
							<p>The type of background used on the display</p>
						</div>
						<div>
							<select bind:value={$settings.display.bg.type}>
								{#each Object.values(DisplayBGType) as value}
									<option {value}>{value}</option>
								{/each}
							</select>
						</div>
					</div>
					{#if $settings?.display.bg.type === DisplayBGType.color}
						<div>
							<div>
								<h3>Background Color</h3>
								<p>The single color of the background that fills the whole display</p>
							</div>
							<div><input bind:value={$settings.display.bg.value} type="color" /></div>
						</div>
					{:else if $settings?.display.bg.type === DisplayBGType.gradient}
						<div>
							<div>
								<h3>Background Colors</h3>
								<p>The colors that are used to create a gradient for the display</p>
							</div>
							<div>
								<input bind:value={$settings.display.bg.value[0]} type="color" /><input
									bind:value={$settings.display.bg.value[1]}
									type="color"
								/>
							</div>
						</div>
					{:else if $settings?.display.bg.type === DisplayBGType.image}
						<div>
							<div>
								<h3>Background Image URL</h3>
								<p>The URL of an image that will be displayed on the display</p>
							</div>
							<div>
								<input
									onkeydowncapture={(evt) => evt.stopPropagation()}
									bind:value={$settings.display.bg.value}
									placeholder="URL"
									type="text"
								/>
							</div>
						</div>
					{/if}
				</div>
				<div class="list">
					<div>
						<div>
							<h3>Font</h3>
							<p>The font used on the display</p>
						</div>
						<div>
							<select bind:value={$settings.display.font.family}>
								{#each Object.values(Font) as value}
									<option {value}>{value}</option>
								{/each}
							</select>
						</div>
					</div>
					<div>
						<div>
							<h3>Font Weight</h3>
							<p>The weight of the font on the display (boldness / thinness) (Only on some fonts)</p>
						</div>
						<div>
							<input bind:value={$settings.display.font.weight} min="100" max="900" step="100" type="range" />
							<div class="tooltip left">{$settings.display.font.weight}</div>
						</div>
					</div>
					<div>
						<div>
							<h3>Font Size Scale</h3>
							<p>The size of the text on the display relative to the default</p>
						</div>
						<div>
							<input bind:value={$settings.display.font.size} min="0.1" max="2" step="0.1" type="range" />
							<div class="tooltip left">{$settings.display.font.size}</div>
						</div>
					</div>
					<div>
						<div>
							<h3>Text Color</h3>
							<p>The color of the text on the display</p>
						</div>
						<div>
							<input bind:value={$settings.display.font.color} type="color" />
						</div>
					</div>
				</div>
				<div class="list">
					<div>
						<div>
							<h3>Transition</h3>
							<p>The transition used when changing lyrics</p>
						</div>
						<div>
							<select bind:value={$settings.display.transition}>
								{#each Object.values(Transition) as transition}
									<option value={transition}>{transition}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
			</div>
		{:else if route === "editor"}
			<div class="panel" transition:menuBlur>
				<h3>Hello</h3>
			</div>
		{/if}
	</div>
</div>

<style>
	.sidepanelcontent {
		.tabbar {
			justify-content: center;
			button {
				position: relative;
				width: 50px;
				height: 45px;
				i {
					position: absolute;
					top: 4px;
					z-index: 2;
				}
				p {
					position: absolute;
					bottom: 4px;
					font-size: 0.75em;
				}
			}
		}
		.settings {
			position: relative;
			.panel {
				position: absolute;
				width: calc(100%);
				.list > div {
					display: flex;
					justify-content: space-between;
					& > div:first-child {
						display: flex;
						flex-direction: column;
						p {
							color: lightgray;
						}
					}
					& > div:last-child {
						display: flex;
						position: relative;
						gap: 8px;
						input,
						select {
							height: 100%;
							width: 75px;
							border-radius: 8px;
						}
						input[type="color"] {
							border: 1px solid white;
							padding: 0;
						}
						input[type="text"],
						input[type="range"],
						select {
							width: 200px;
						}
						input {
							padding: 0 8px;
						}
						&:hover > div.tooltip {
							scale: 1;
						}
					}
				}
			}
		}
	}
</style>
