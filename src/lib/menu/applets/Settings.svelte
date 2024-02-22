<script lang="ts">
import {send, recieve} from "../crossfade";
import Switch from "../input/Switch.svelte";
import type {SettingsObj} from "$lib/types";

export let channel: BroadcastChannel;
let settings: SettingsObj = JSON.parse(localStorage.getItem("settings")!);
$: if (settings) {
	localStorage.setItem("settings", JSON.stringify(settings));
	channel.postMessage({type: "settingupdate"});
	console.log("settingsupdate");
}
</script>

<div
  class="main"
  in:send|global={{ key: "menu" }}
  out:recieve|global={{ key: "menu" }}
>
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
    <Switch bind:toggled={settings.simple}/>
  </div>
  <div class="setting">
    <h2>Test</h2>
    <p>- what</p>
    <Switch toggled={true}/>
  </div>
  <div class="setting">
    <h2>Display Font Size</h2>
    <p>
      - Size of display font (Honestly I don't know what to scale it by)
    </p>
    <select bind:value={settings.displayfontsize}>
      <option value="3">Extra Small</option>
      <option value="5">Small</option>
      <option value="7">Medium</option>
      <option value="10">large</option>
    </select>
  </div>
</div>

<style lang="less">
.main {
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

    select {
      width: 100px;
      position: absolute;
      display: flex;
      right: 30px;
      background-color: var(--border-color);
      color: white;
      border: 5px var(--border-color) solid;
      border-radius: 8px;
      -webkit-appearance: none;
    }

    p {
      margin-left: 4px;
    }
  }
}
</style>
