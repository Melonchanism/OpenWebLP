<script lang="ts">
  import since from "days-since";
  import { onMount } from "svelte";
  import { crossfade } from "svelte/transition";

  let animationPct = $state(0);
  let h1Elm: HTMLHeadingElement;
  let imgElm: HTMLImageElement;
</script>

<div
  class="main"
  on:scroll={(evt) => {
    console.log(evt.target?.scrollTop);
    if (evt.target?.scrollTop === 0) animationPct = 0;
    else if (evt.target?.scrollTop >= 264) animationPct = 1;
    else animationPct = evt.target?.scrollTop / 264;
    h1Elm.style.fontSize = `${0.75 + 1.25 * (1 - animationPct)}em`;
    imgElm.style.height = `${52 + 143 * (1 - animationPct)}px`;
    h1Elm.style.transform = `translate(${52 * animationPct}px, ${-52 * animationPct}px)`;
    imgElm.style.transform = `translate(${-95 * animationPct}px)`;
  }}
>
  <div class="spacer" />
  <div class="titlebar">
    <img src="favicon.png" alt="hireslogo" bind:this={imgElm} />
    <h1 bind:this={h1Elm}>OpenWebLP</h1>
  </div>
  <div class="titlebarbackground" />
  <h2>v3</h2>
  <h3>
    Licenced Under: <a href="https://www.gnu.org/licenses/gpl-3.0.txt"
      >The GNU GPL v3</a
    >
  </h3>
  <div class="links">
    <a href="https://github.com/melonchanism/openweblp" target="_blank"
      >GitHub</a
    >
    <a href="https://github.com/SortableJS/Sortable" target="_blank">Sortable</a
    >
    <a href="https://svelte.dev/" target="_blank">Svelte</a>
  </div>
  <p>
    Idk I wrote this thing <i>{since(1708329600000)}</i> days ago because I was
    bored, and added support for random things for some reason. This is v3 of
    something that I have already made a few times,
    <a href="https://openweblp.web.app/" target="_blank">OpenWebLP 1</a>, and
    <a
      href="https://openweblp-git-v2-melonchanism.vercel.app?_vercel_share=TVHwLLLDutez1PJ3YrSnG0wHFCLPKJ2x"
      target="_blank">OpenWebLP 2</a
    > (never fully finished), and I felt like creating yet another one, but this
    time, bigger, better, faster, and fancier, and it's still a work in progress.
    This time, I decided to make it actually viable without having to learn 2 million
    keyboard shortcuts, and one day, it might somehow replace OpenLP (probably not,
    but it's a nice thought).
  </p>
  <div class="info">
    <div>
      <h2>Features</h2>
      <ul>
        <li>Drag and drop</li>
        <li>Customizable (not yet)</li>
        <li>Mobile friendly for some reason</li>
        <li>Easy to use</li>
        <li>Fast</li>
        <li>Cool Transitions</li>
      </ul>
    </div>
    <div>
      <h2>Keyboard Shortcuts</h2>
      <ul>
        <li>D: open display</li>
        <li>F: fullscreen display or preview</li>
        <li>B: toggle blank screen</li>
        <li>Arrow Up: previous lyric</li>
        <li>Arrow Down: next lyric</li>
        <li>Arrow Left: previous song</li>
        <li>Arrow Right: next song</li>
      </ul>
    </div>
  </div>
  <p>
    scro<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    o<br />
    l test
  </p>
</div>

<style>
  div.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    max-height: inherit;
    div.titlebar {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      font-size: 52px;
      z-index: 98;
      img {
        height: 196px;
      }
    }
    div.titlebarbackground {
      position: absolute;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      width: 80%;
      height: 52px;
    }
    div.spacer {
      width: 100%;
      height: 315px;
      flex-shrink: 0;
      z-index: 99;
      transition: height 300ms;
    }
    div.links {
      text-align: center;
      display: flex;
      flex-direction: row;
      margin: 8px;
      a {
        margin: 4px;
      }
    }
    div.info {
      display: flex;
      justify-content: space-around;
      width: 600px;
      h2 {
        text-align: center;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        li {
          margin: 4px;
        }
      }
    }
    p {
      text-align: justify;
      max-width: 600px;
    }
  }
</style>
