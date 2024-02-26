<script lang="ts">
  let settings: {
    transition: string;
    info: boolean;
  } = JSON.parse(
    localStorage.getItem("settings") ?? `{"transition": "fade", "info": false}`,
  );

  function update() {
    setTimeout(
      () => localStorage.setItem("settings", JSON.stringify(settings)),
      1,
    );
  }
</script>

<div class="main">
  <div class="section">
    <h2>Visual</h2>
    <div class="items">
      <div class="item">
        <div class="info">
          Transition
          <br />
          The animation that plays when the lyrics switch
        </div>
        <select
          name="transition"
          class="input"
          bind:value={settings.transition}
          on:input={update}
        >
          <option value="none">None</option>
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
      <button
        class="item {settings.info ? 'current' : ''}"
        on:click={() => (settings.info = !settings.info)}
        on:click={update}
      >
        <div class="info">
          Show Info
          <br />
          Decides if info is shown on the presentation
        </div>
        <div class="indicator" />
      </button>
      <div class="item">
        <div class="info">
          Theme
          <br />
          The color scheme of the console window
        </div>
        <select
          name="theme"
          class="input"
          value={localStorage.getItem("theme") ?? "dark"}
          on:input={(evt) => {
            // @ts-ignore
            localStorage.setItem("theme", evt.target?.value);
            window.dispatchEvent(new StorageEvent("storage", { key: "theme" }));
          }}
        >
          <option value="dark">Default Dark</option>
          <option value="solarized">Solarized Dark</option>
          <option value="ayu">Ayu Dark</option>
          <option value="ew">Ew Light Mode</option>
        </select>
      </div>
      <div class="item">
        <div class="info">
          Font
          <br />
          The global font used in the console and presentation
        </div>
        <select
          name="font"
          class="input"
          value={localStorage.getItem("font") ?? "sans-serif"}
          on:input={(evt) => {
            // @ts-ignore
            localStorage.setItem("font", evt.target?.value);
            window.dispatchEvent(new StorageEvent("storage", { key: "font" }));
          }}
        >
          <option value="sans-serif">Sans-Serif</option>
          <option value="roboto">Roboto</option>
          <option value="montserrat">Montserrat</option>
        </select>
      </div>
    </div>
  </div>
</div>

<style>
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
        div.item,
        button.item {
          display: grid;
          grid-template-columns: auto auto;
        }
      }
    }
  }

  select {
    background: transparent;
    font-size: 20px;
    width: min-content;
    justify-self: right;
    padding: 0 16px 0 16px;
    -webkit-appearance: none;
  }
  :global(div.indicator) {
    background: var(--background-color);
    justify-self: right;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    transition: background-color 200ms;
  }
  :global(button.item.current > div.indicator) {
    background: #22b600;
  }
</style>
