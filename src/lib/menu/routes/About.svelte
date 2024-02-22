<script lang="ts">
import since from "days-since"
</script>

<div class="main">
  <div>
    <img src="favicon.png" />
    <h1>OpenWebLP</h1>
  </div>
  <h2>v3</h2>
  <h3>Licenced Under: GNU GPL V3</h3>
  <p>
    Idk I wrote this thing about <strong style="color: rgb(157, 255, 157)">{since(1708300800000)}</strong> days ago because I was bored, and added support for random things for some reason. This is v3 of something that I have already made a few times, <a href="https://openweblp.web.app/" target="_blank">OpenWebLP 1</a>, and <a href="https://openweblp-git-v2-melonchanism.vercel.app?_vercel_share=TVHwLLLDutez1PJ3YrSnG0wHFCLPKJ2x" target="_blank">OpenWebLP 2</a> (never fully finished), and I felt like creating yet another one, but this time, bigger, better, faster, and fancier, and it's still a work in progress. This time, I decided to make it actually viable without having to learn 2 million keyboard shortcuts, and one day, it might somehow replace OpenLP.
  </p>
</div>

<style>
div.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    img {
      width: 64px;
      margin-right: 8px;
    }
  }
  p {
    text-align: justify;
    max-width: 600px;
    a {
      color: rgb(200, 200, 255);
    }
  }
  & > * {
    margin: 8px;
  }
}
</style>