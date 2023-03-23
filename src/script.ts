import "./style.css";
import { browser } from "./misc";
import type { Songs } from "./misc";
let display: Window | null,
 editor: Window | null,
 preview: HTMLIFrameElement = document.querySelector("iframe"),
 songlist: HTMLOListElement = document.querySelector("#songlist"),
 lyriclist: HTMLOListElement = document.querySelector("#lyriclist"),
 song: number = 0,
 lyric: number = 0,
 songs: Songs[] = JSON.parse(`[{"name":"rediscover you", "lyrics":["[lyric1]|I need to just admit|my faith is paper thin|i'm feeling so burn out,|on religon","hi|I say an empty prayer,| I sing a tired song,| I need to just admit,| that the passion's gone,","hi|and i wanna get it back","hi|you told me, look for you and I wil find,|So i'm here,|like I'm searching for the first time,|revive me,|jesus make this cold hart start to move,","hi|help me rediscover,"]}, {"name":"yes", "lyrics":["hi|2", "idk|what","hi|2", "idk|what","hi|2", "idk|what","hi|2", "idk|what","hi|2", "idk|what","hi|2", "idk|what","hi|2", "idk|what","hi|2", "idk|what","hi|2", "idk|what","hi|2", "idk|what","hi|2", "idk|what","hi|2", "idk|what"]}]`);

const config = {
 display: `<title>WebLP Display</title><style>body{background-color:black;color:white;font-family:sans-serif;overflow:hidden;margin:0px;width:100vw;height:100vh;}h1{font-size:96px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;white-space:nowrap;}</style><link rel="icon" href=${document.querySelector<HTMLLinkElement>("link[rel='icon']").href}>`,
 editor: `<title>WebLP Editor</title><style>body{background-color:black;color:white;font-family:sans-serif;}</style><link rel="icon" href=${document.querySelector<HTMLLinkElement>("link[rel='icon']").href}>`,
};

function handleKey(event: KeyboardEvent) {
 const key = event.key;
 if (key === "ArrowDown" && songs[song].lyrics[lyric + 1]) lyric++;
 else if (key === "ArrowUp" && songs[song].lyrics[lyric - 1]) lyric--;
 else if (key === "ArrowLeft" && songs[song - 1]) {
  song--;
  lyric = 0;
 } else if (key === "ArrowRight" && songs[song + 1]) {
  song++;
  lyric = 0;
 } else if (key === "f" && display && display?.closed === false) display.document.body.requestFullscreen();
 render();
};

function render() {
 let displayText:any = songs[song].lyrics[lyric].split("|");
 displayText.shift();
 displayText = displayText.join("<br>");
 let songlistHTML: string = "",
  lyriclistHTML: string = "";
 songs.forEach(item => {
  songlistHTML += `<li class="songlistitem">${item.name}</li><hr>`;
 });
 songlist.innerHTML = songlistHTML.slice(0, -4);
 const songListItems = document.querySelectorAll<HTMLLIElement>("li.songlistitem");
 songListItems.forEach(item => item.classList.remove("selected"));
 songListItems.item(song).classList.add("selected");
 songlist.querySelector("li.selected").scrollIntoView({ behavior: "smooth", block: "center" });
 songs[song].lyrics.forEach(item => {
  lyriclistHTML += `<li class="lyriclistitem">${item.replaceAll("|", "<br>")}</li><hr>`;
 });
 lyriclist.innerHTML = lyriclistHTML.slice(0, -4);
 const lyricListItems = document.querySelectorAll<HTMLLIElement>("li.lyriclistitem")
 lyricListItems.forEach(item => item.classList.remove("selected"));
 lyricListItems.item(lyric).classList.add("selected");
 lyriclist.querySelector("li.selected").scrollIntoView({ behavior: "smooth", block: "center" });
 if (display && display?.closed === false) display.document.body.innerHTML = `<h1>${displayText}</h1>`;
 preview.contentDocument.body.innerHTML = `<h1>${displayText}</h1>`;
};

addEventListener("load", () => {
 preview.contentDocument.head.innerHTML = config.display;
 preview.contentDocument.addEventListener("keydown", handleKey);
 [window, preview.contentDocument].forEach(item => {
  ///@ts-ignore
  item.addEventListener("keydown", (event: KeyboardEvent) => {
   const key = event.key
   if (key === "d") {
    if (typeof display?.closed === "boolean" && display.closed === false) display.close();
    display = window.open("about:blank", "_blank", "width=960, height=540, popup");
    if (browser() === "firefox") {
     display.addEventListener("load", () => {
      display.document.head.innerHTML = config.display;
      display.addEventListener("keydown", handleKey)
      render();
     });
    } else if (browser() === "chromium" || browser() === "webkit") {
     display.document.head.innerHTML = config.display;
     display.addEventListener("keydown", handleKey)
     render();
    };
   } else if (key === "e") {
    if (typeof editor?.closed === "boolean" && editor.closed === false) editor.close();
    editor = window.open("about:blank", "_blank");
    if (browser() === "firefox") {
     editor.addEventListener("load", () => {
      editor.document.head.innerHTML = config.editor;
     });
    } else if (browser() === "chromium" || browser() === "webkit") {
     editor.document.head.innerHTML = config.editor;
   }} else handleKey(event);
 })});
 render();
 addEventListener("beforeunload", () => {
  if (typeof display?.closed === "boolean" && display.closed === false) display.close();
  if (typeof editor?.closed === "boolean" && editor.closed === false) editor.close();
})});