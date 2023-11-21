<script lang="ts">
import { send, recieve } from "./crossfade";
import Switch from "./input/Switch.svelte";
export let channel: BroadcastChannel;
let settings = JSON.parse(localStorage.getItem("settings")!);
$: if (settings) {
  localStorage.setItem("settings", JSON.stringify(settings));
  channel.postMessage({type: "settingupdate"});
  console.log("settingsupdate");
};
</script>

<div class="settings" in:send={{key:"menu"}} out:recieve={{key:"menu"}}>
  <div class="setting">
    <h2>CrossFade Animation</h2>
    <p>- Fade between lyrics</p>
    <select bind:value={settings.crossfade}>
      <option value="fancy">Fancy</option>
      <option value="normal">Normal</option>
      <option value="none">None</option>
    </select>
  </div>
  <div class="setting">
    <h2>Simple mode</h2>
    <p>- Only show the lyric on the display</p>
    <Switch bind:on={settings.simple} />
  </div>
  <div class="setting">
    <h2>Test</h2>
    <p>- what</p>
    <Switch on={true} />
  </div>
  <div class="setting">
    <h2>Display Font Size</h2>
    <p>- Size of display font (% of vertical height)</p>
    <input type="number" inputmode="numeric" min="1" max="100" bind:value={settings.displayfontsize} on:keydown|stopPropagation={(evt) => {
      "1234567890".search(evt.key) === -1 && !evt.ctrlKey && evt.key !== "Backspace" ? evt.preventDefault() : null;
    }} />
  </div>
</div>

<style lang="postcss">
.settings {
  height: 100%;
  width: inherit;
  position: absolute;
  overflow: scroll;
  .setting {
    display: flex;
    padding: 15px;
    width: calc(100% - 30px);
    align-items: center;
    border-bottom: 1px var(--border-color) solid;
    input, select {
      height: 25px;
      position: absolute;
      right: 30px;
      background-color: var(--border-color);
      color: white;
      border: 1px var(--border-color) solid;
    }
    p {
      margin-left: 4px;
    }
  }
}
</style>