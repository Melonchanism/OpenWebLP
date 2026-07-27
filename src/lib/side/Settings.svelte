<script lang="ts">
	import { DisplayBGType, Font, Transition, settings } from "../localStorage"
	import { menuBlur } from "../transitions"
	import RangeSlider from "svelte-range-slider-pips"
</script>

<div transition:menuBlur class="sidepanelcontent">
	<h2>Settings</h2>
	<div class="settings">
		<div class="panel" transition:menuBlur>
			<div class="list">
				<div>
					<h3>BG Mode</h3>
					<select bind:value={$settings.display.bg.type}>
						{#each Object.values(DisplayBGType) as value}
							<option {value}>{value}</option>
						{/each}
					</select>
				</div>
				{#if $settings?.display.bg.type === DisplayBGType.color}
					<div>
						<h3>BG Color</h3>
						<input bind:value={$settings.display.bg.value} type="color" />
					</div>
				{:else if $settings?.display.bg.type === DisplayBGType.css}
					<div>
						<h3>CSS String</h3>
						<input
							onkeydowncapture={(evt) => evt.stopPropagation()}
							bind:value={$settings.display.bg.value}
							placeholder="eg. url('https://example.com/')"
							type="text"
						/>
					</div>
				{/if}
			</div>
			<div class="list">
				<div>
					<h3>Font</h3>
					<select bind:value={$settings.display.font.family}>
						{#each Object.values(Font) as value}
							<option {value}>{value}</option>
						{/each}
					</select>
				</div>
				<div>
					<h3>Font Weight (WIP)</h3>
					<RangeSlider min={100} max={900} step={100} bind:value={$settings.display.font.weight} pips float />
				</div>
				<div>
					<h3>Font Scale</h3>
					<RangeSlider
						min={0.5}
						max={1.5}
						step={0.1}
						bind:value={$settings.display.font.size}
						pips
						float
						formatter={(v, i, p) => `${(v * 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`}
					/>
				</div>
				<div>
					<h3>Color</h3>
					<input bind:value={$settings.display.font.color} type="color" />
				</div>
			</div>
			<div class="list">
				<div>
					<h3>Transition</h3>
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

<style>
	.sidepanelcontent {
		.settings {
			position: relative;
			.panel {
				position: absolute;
				width: calc(100%);
				.list > div {
					display: grid;
					grid-template-columns: auto 1fr;
					justify-content: space-between;
					padding: 12px;
					& > :last-child {
						justify-self: end;
						display: flex;
						position: relative;
						gap: 8px;
						&:is(input),
						&:is(select) {
							max-width: 150px;
							display: flex;
							border-radius: 8px;
							padding: 8px;
						}
						&:is(input[type="color"]) {
							border: 1px solid gray;
							padding: 0;
						}
					}
				}
			}
		}
	}

	input[type="color"]::-webkit-color-swatch-wrapper {
		padding: 1px !important;
	}

	:global(.rangeSlider) {
		width: 150px;
		padding: 0 !important;
		margin: 0 !important;
		justify-self: end;
		--slider-accent: var(--highlight);
		--slider-accent-100: var(--slider-accent);
		--slider-base: var(--stacked-element2);
		--slider-base-100: var(--stacked-element);
		--slider-bg: var(--stacked-element);
		--slider-fg: var(--slider-bg);
	}
</style>
