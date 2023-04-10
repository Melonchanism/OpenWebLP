import "./style.css";
import { parseHTML, decodeSongs, encodeSongs, s, sa } from "./lib/parsing";
import type { Songs } from "./lib/types";
//To-do: Remove the next 2 lines for production, they are for preloading example songs.
import { example } from "./lib/ex";
if (location.href.split("?")[1] === "example") example();
localStorage.setItem("firsttime", "false");
let display: Window | null,
 editor: Window | null,
 configurer: Window | null,
 preview = s<HTMLIFrameElement>("iframe"),
 songlist = s<HTMLOListElement>("#songlist"),
 lyriclist = s<HTMLOListElement>("#lyriclist"),
 song: number = 0,
 lyric: number = 0,
 songs: Songs[] = (() => {
  if (localStorage.getItem("songs")) return JSON.parse(localStorage.getItem("songs"));
  else return [{
   name: "No songs found",
   lyrics: ["No songs found"]
  }]; 
 })(),
 displayFontSize = "calc(3vh + 3vw)",
 config = {
  display: `<title>OpenWebLP Display</title><style>body{background-color:black;color:white;font-family:sans-serif;overflow:hidden;margin:0px;width:100vw;height:100vh;}h1{font-size:${displayFontSize};text-align:center;user-select:none;}div{top:50%;left:50%;transform:translate(-50%, -50%);position:absolute;margin:0px;width:100vw}</style><link rel="icon" href=${document.querySelector<HTMLLinkElement>("link[rel='icon']").href}>`,
  editor: `<title>OpenWebLP Editor</title><style>body{background-color:black;color:white;font-family:sans-serif;margin:0px;overflow:hidden}textarea{margin:0px;border:none;padding:15px;background-color:black;width:100vw;height:100vh;color:white; resize:none;}</style><link rel="icon" href=${document.querySelector<HTMLLinkElement>("link[rel='icon']").href}>`,
  configurer: `<title>OpenWebLP Settings</title><style>body{background-color:black;color:white;font-family:sans-serif;margin:0px;overflow:hidden;top:50%;left:50%;transform:translate(-50%, -50%);position:absolute}input{background-color:#111111;color:white;border:none;margin:1px;font-size:2rem; width:400px}</style><link rel="icon" href=${document.querySelector<HTMLLinkElement>("link[rel='icon']").href}>`,
 },
 browser = (() => {
  ///@ts-ignore
  if (typeof document.body.mozMatchesSelector === "function") return "firefox";
  ///@ts-ignore
  else if (typeof chrome === "object") return "chromium";
  ///@ts-ignore
  else if (typeof elem.webkitRequestFullscreen === "function") return "webkit";
  else return "unknown";
 })();

function handleKey(event: KeyboardEvent) {
 const key: string = event.key;
 if (key === "ArrowDown" || key === "ArrowUp" || key === "ArrowLeft" || key === "ArrowRight" || key === "F1" || key === "F3" || key === "F5" || key === "F6" || key === "F7" || key === "F10") event.preventDefault();
 if (key === "ArrowDown") setLyric(lyric + 1);
 else if (key === "ArrowUp") setLyric(lyric - 1);
 else if (key === "ArrowLeft") setSong(song - 1);
 else if (key === "ArrowRight") setSong(song + 1);
 else if (key === "f" && display && display?.closed === false) (async () => {
  if (browser !== "webkit") await display.document.body.requestFullscreen();
  //@ts-ignore
  else if (browser === "webkit") await display.document.body.webkitRequestFullscreen();
  const displaySize = display.document.body.getBoundingClientRect();
  preview.style.width = `${displaySize.width.toString()}px`;
  preview.style.height = `${displaySize.height.toString()}px`;
 })();
 else if (key === "1") setLyric(0);
 else if (key === "2") setLyric(1);
 else if (key === "3") setLyric(2);
 else if (key === "4") setLyric(3);
 else if (key === "5") setLyric(4);
 else if (key === "6") setLyric(5);
 else if (key === "7") setLyric(6);
 else if (key === "8") setLyric(7);
 else if (key === "9") setLyric(8);
 else if (key === "0") setLyric(9);
 else if (key === "-") setLyric(10);
 else if (key === "=") setLyric(11);
 else if (key === "Backspace") setLyric(12);
 else if (key === "F1") setSong(0);
 else if (key === "F2") setSong(1);
 else if (key === "F3") setSong(2);
 else if (key === "F4") setSong(3);
 else if (key === "F5") setSong(4);
 else if (key === "F6") setSong(5);
 else if (key === "F7") setSong(6);
 else if (key === "F8") setSong(7);
 else if (key === "F9") setSong(8);
 else if (key === "F10") setSong(9);
};

function render() {
 let displayText:any = parseHTML(songs[song].lyrics[lyric].split("|"));
 displayText.shift();
 displayText = displayText.join("<br>");
 let songlistHTML: string = "",
  lyriclistHTML: string = "";
 songs.forEach(item => {
  songlistHTML += `<li class="songlistitem">${item.name}</li><hr>`;
 });
 songlist.innerHTML = songlistHTML.slice(0, -4);
 const songListItems = Array.from(sa<HTMLLIElement>("li.songlistitem"));
 songListItems.forEach(item => item.classList.remove("selected"));
 songListItems[song].classList.add("selected");
 songListItems.forEach(item => {
  item.addEventListener("click", () => setSong(songListItems.indexOf(item)));
 });
 s("#songlist > li.selected").scrollIntoView({ behavior: "smooth", block: "center" });
 songs[song].lyrics.forEach(item => {
  lyriclistHTML += `<li class="lyriclistitem">${item.replaceAll("|", "<br>")}</li><hr>`;
 });
 lyriclist.innerHTML = lyriclistHTML.slice(0, -4);
 const lyricListItems = Array.from(sa<HTMLLIElement>("li.lyriclistitem"));
 lyricListItems.forEach(item => item.classList.remove("selected"));
 lyricListItems[lyric].classList.add("selected");
 lyricListItems.forEach(item => { 
  item.addEventListener("click", () => setLyric(lyricListItems.indexOf(item)));
 });
 s("#lyriclist > li.selected").scrollIntoView({ behavior: "smooth", block: "center" });
 if (display && display?.closed === false) display.document.body.innerHTML = `<div><h1>${displayText}</h1></div>`;
 preview.contentDocument.body.innerHTML = `<div><h1>${displayText}</h1></div>`;
};

function displayInit() {
 display.document.head.innerHTML = config.display;
 display.addEventListener("keydown", handleKey)
 render();
};

function editorInit() {
 editor.document.head.innerHTML = config.editor;
 editor.document.body.innerHTML = `<textarea autofocus spellcheck="false"></textarea>`;
 const input = editor.document.querySelector<HTMLTextAreaElement>("textarea");
 input.value = decodeSongs(songs);
 input.addEventListener("keydown", (event: KeyboardEvent) => {
  const key = event.key
  if (key === "Enter" && event.ctrlKey) { 
   songs = encodeSongs(input.value);
   if (!songs[song]?.lyrics[lyric]) setSong(0);
   render();
   localStorage.setItem("songs", JSON.stringify(songs));
  };
 });
 editor.addEventListener("keydown", event => { if (event.key === "Escape") editor.close() });
};

function configurerInit() {
 configurer.document.head.innerHTML = config.configurer;
 configurer.document.body.innerHTML = `<form><input type="text" id="c1" placeholder="Display Bg Color" value="${window.getComputedStyle(preview.contentDocument.body).getPropertyValue("background-color")}"/><br><input type="text" id="c2" placeholder="Display Text Color" value="${window.getComputedStyle(preview.contentDocument.body).getPropertyValue("color")}"/><br><input type="text" id="c3" placeholder="Display Font Size" value="${displayFontSize}"/><br><input type="text" id="c4"/><br><input type="submit" value="Update"/></form>`;
 const form = configurer.document.querySelector("form")
 form.addEventListener("submit", (event: SubmitEvent) => { 
  event.preventDefault();
  ///@ts-ignore
  const [c1, c2, c3, c4] = Array.from(configurer.document.querySelectorAll<HTMLInputElement>("input[type='text']"));
  displayFontSize = c3.value;
  config = {
   display: `<title>OpenWebLP Display</title><style>body{background-color:${c1.value};color:${c2.value};font-family:sans-serif;overflow:hidden;margin:0px;width:100vw;height:100vh;}h1{font-size:${displayFontSize};text-align:center;user-select:none;}div{top:50%;left:50%;transform:translate(-50%, -50%);position:absolute;margin:0px;width:100vw}</style><link rel="icon" href=${document.querySelector<HTMLLinkElement>("link[rel='icon']").href}>`,
   editor: `<title>OpenWebLP Editor</title><style>body{background-color:black;color:white;font-family:sans-serif;margin:0px;overflow:hidden}textarea{margin:0px;border:none;padding:15px;background-color:black;width:100vw;height:100vh;color:white; resize:none;}</style><link rel="icon" href=${document.querySelector<HTMLLinkElement>("link[rel='icon']").href}>`,
   configurer: `<title>OpenWebLP Settings</title><style>body{background-color:black;color:white;font-family:sans-serif;margin:0px;overflow:hidden;top:50%;left:50%;transform:translate(-50%, -50%);position:absolute}input{background-color:#111111;color:white;border:none;margin:1px;font-size:2rem; width:400px}</style><link rel="icon" href=${document.querySelector<HTMLLinkElement>("link[rel='icon']").href}>`,
  };
  preview.contentDocument.head.innerHTML = config.display;
  if (display && display?.closed === false) display.document.head.innerHTML = config.display;
  if (editor && editor?.closed === false) editor.document.head.innerHTML = config.editor;
  if (configurer && configurer?.closed === false) configurer.document.head.innerHTML = config.configurer;
 });
 configurer.addEventListener("keydown", event => { if (event.key === "Escape") configurer.close() });
};

function setSong(number: number) {
 if (songs[number]) {
  song = number;
  lyric = 0;
 };
 render();
};

function setLyric(number: number) {
 if (songs[song].lyrics[number]) lyric = number;
 render();
};

addEventListener("load", () => {
 preview.contentDocument.head.innerHTML = config.display;
 preview.contentDocument.addEventListener("keydown", handleKey);
 [document, preview.contentDocument].forEach(item => {
  item.addEventListener("keydown", (event: KeyboardEvent) => {
   const key = event.key
   if (key === "d") {
    if (typeof display?.closed === "boolean" && display.closed === false) display.close();
    display = open(`about:blank`, "_blank", "width=960, height=540, popup");
    if (browser === "firefox") display.addEventListener("load", displayInit);
    else if (browser === "chromium" || browser === "webkit") displayInit();
   } else if (key === "e") {
    if (typeof editor?.closed === "boolean" && editor.closed === false) editor.close();
    editor = open(`about:blank`, "_blank", "width=1366, height=768, popup");
    if (browser === "firefox") editor.addEventListener("load", editorInit);
    else if (browser === "chromium" || browser === "webkit") editorInit();
   } else if (key === "s") {
    if (typeof configurer?.closed === "boolean" && configurer.closed === false) configurer.close();
    configurer = open("about:blank", "_blank", "width=480, height=270, popup");
    if (browser === "firefox") configurer.addEventListener("load", configurerInit);
    else if (browser === "chromium" || browser === "webkit") configurerInit();
   } else handleKey(event);
  });
 });
 render();
 addEventListener("beforeunload", () => {
  if (typeof display?.closed === "boolean" && display.closed === false) display.close();
  if (typeof editor?.closed === "boolean" && editor.closed === false) editor.close();
  if (typeof configurer?.closed === "boolean" && configurer.closed === false) configurer.close();
 });
});