<script lang="ts">
	import { DisplayBGType, Font, Transition, settings } from "../localStorage"
	import { menuBlur, menuFade, send, recieve } from "../transitions"
</script>

<div transition:menuBlur class="sidepanelcontent">
	<h2>Settings</h2>
	<div class="settings">
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
				{:else if $settings?.display.bg.type === DisplayBGType.css}
					<div>
						<div>
							<h3>Custom CSS String</h3>
							<p>A css string that will be parsed</p>
						</div>
						<div>
							<input
								onkeydowncapture={(evt) => evt.stopPropagation()}
								bind:value={$settings.display.bg.value}
								placeholder="eg. url('https://example.com/')"
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
						<p>The boldness / thinness of the displayed font (YMMV)</p>
					</div>
					<div>
						<input
							bind:value={$settings.display.font.weight}
							min="100"
							max="900"
							step="100"
							type="range"
						/>
						<div class="tooltip left">{$settings.display.font.weight}</div>
					</div>
				</div>
				<div>
					<div>
						<h3>Font Size Scale</h3>
						<p>The size of the text on the display relative to the default</p>
					</div>
					<div>
						<input
							bind:value={$settings.display.font.size}
							min="0.1"
							max="2"
							step="0.1"
							type="range"
						/>
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
	</div>
</div>

<style lang="scss">
	.sidepanelcontent {
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
							color: gray;
							font-size: 0.9em;
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
