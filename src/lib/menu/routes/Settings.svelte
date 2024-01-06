<script lang="ts">
let settings: {
	transition: string,
  info: boolean
} = JSON.parse(localStorage.getItem("settings") ?? `{"transition": "fade", "info": false}`)

function update() {
	setTimeout(() => localStorage.setItem("settings", JSON.stringify(settings)), 1)
}
</script>

<div class="main">
  <div class="section">
    <h2>Visual</h2>
    <div class="items">
      <div class="item">
        <div class="info">
          Transition
          <br>
          The animation that plays when the lyrics switch
        </div>
        <select name="transition" class="input" bind:value={settings.transition} on:input={update}>
          <option value="fade">Crossfade</option>
          <option value="slide">Slide Left</option>
          <option value="reverse-slide">Slide Right</option>
          <option value="scroll">Scroll</option>
          <option value="reverse-scroll">Scroll Reverse</option>
          <option value="rotate">Rotate</option>
          <option value="stack">Stack</option>
          <option value="reverse-stack">Stack Reverse</option>
        </select>
      </div>
      <button class="item {settings.info ? 'current' : ''}" on:click={() => settings.info = !settings.info} on:click={update}>
        <div class="info">
          Show Info
          <br>
          Decides if info is shown on the presentation
        </div>
        <div class="indicator" />
      </button>
    </div>
  </div>
</div>

<style lang="less">
div.main {
  display: flex;
  flex-direction: column;
  div.section {
    display: flex;
    flex-direction: column;
    h2 {
      margin: 8px 0 0 8px;
    }
    div.items {
      display: flex;
      flex-direction: column;
      div.item, button.item {
        display: grid;
        grid-template-columns: auto auto;
        div.info:first-line {
          font-size: 25px;
          font-weight: normal;
        }
        &.current > div.indicator {
          background: #22b600;
        }
      }
    }
  }
}

select {
  background: #252525;
  font-size: 20px;
  width: min-content;
  justify-self: right;
  padding: 0 16px 0 16px;
  -webkit-appearance: none;
}
div.indicator {
  background: var(--background-color);
  justify-self: right;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: background-color 200ms;
}
</style>