import "./style.css";
import { browser, parseHTML } from "./lib/misc";
import type { Songs } from "./lib/types";
let display: Window | null,
 editor: Window | null,
 preview: HTMLIFrameElement = document.querySelector("iframe"),
 songlist: HTMLOListElement = document.querySelector("#songlist"),
 lyriclist: HTMLOListElement = document.querySelector("#lyriclist"),
 song: number = 0,
 lyric: number = 0,
 songs: Songs[] = JSON.parse(`[{"name":"Rediscover You","lyrics":["[Verse 1]|I need to just admit my faith is paper thin|I'm feeling so burned out on religion|I say an empty prayer, I sing a tired song|I need to just admit that the passion's gone|And I want to get it back","[Chorus]|You told me look for You and I will find|So I'm here like I'm searching for the first time|Revive me, Jesus, make this cold heart start to move|Help me rediscover You","[Verse 2]|I want to learn to pray the way that David prayed|I want my soul to burn when I hear Your name|I want to feel like new, I want to hunger for You|Bring me back to life like only You can do|'Cause I don't want to stay the same","[Chorus]|You told me look for You and I will find|So I'm here like I'm searching for the first time|Revive me, Jesus, make this cold heart start to move|Help me rediscover You","[Outro]|You told me look for You and I will find|So I'm here like I'm searching for the first time|Revive me, Jesus, make this cold heart start to move|I want to burn for You|Bring me back to life|Jesus, help me rediscover You"]}, {"name":"Another In The Fire","lyrics":["VERSE 1|There's a grace when the heart is under fire|Another way when the walls are closing in|And when I look at the space between|Where I used to be and this reckoning|I know I will never be alone","CHORUS|There was another in the fire|Standing next to me|There was another in the waters|Holding back the seas|And should I ever need reminding|Of how I've been set free|There is a cross that bears the burden|Where another died for me","TAG|There is another in the fire","VERSE 2|All my debt left for dead beneath the waters|I'm no longer a slave to my sin anymore|And should I fall in the space between|What remains of me and this reckoning|Either way I won't bow|To the things of this world|And I know I will never be alone","CHORUS 2|There is another in the fire|Standing next to me|There is another in the waters|Holding back the seas|And should I ever need reminding|What power set me free|There is a grave that holds no body|And now that power lives in me","BRIDGE|And I can see the light in the darkness|As the darkness bows to Him|I can hear the roar in the heavens|As the space between wears thin|I can feel the ground shake beneath us|As the prison walls cave in|Nothing stands between us|Nothing stands between us","VERSE 3|There is no other name|But the Name that is Jesus|He who was and still is|And will be through it all|So come what may in the space between|All the things unseen and this reckoning|I know I will never be alone","CHORUS 3|There'll be another in the fire|Standing next to me|There'll be another in the waters|Holding back the seas|And should I ever need reminding|How good You've been to me|I'll count the joy come every battle|'Cause I know that's where You'll be"]}]`);

const config = {
 display: `<title>WebLP Display</title><style>body{background-color:black;color:white;font-family:sans-serif;overflow:hidden;margin:0px;width:100vw;height:100vh;}h1{font-size:96px;text-align:center;user-select:none;}div{top:50%;left:50%;transform:translate(-50%, -50%);position:absolute;margin:0px;width:100vw}</style><link rel="icon" href=${document.querySelector<HTMLLinkElement>("link[rel='icon']").href}>`,
 editor: `<title>WebLP Editor</title><style>body{background-color:black;color:white;font-family:sans-serif;}</style><link rel="icon" href=${document.querySelector<HTMLLinkElement>("link[rel='icon']").href}>`,
};

function handleKey(event: KeyboardEvent) {
 const key = event.key;
 if (key === "ArrowDown" || key === "ArrowUp" || key === "ArrowLeft" || key === "ArrowRight") event.preventDefault();
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
 let displayText:any = parseHTML(songs[song].lyrics[lyric].split("|"));
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
 songListItems.forEach(item => {
  item.addEventListener("click", () => {
   const index = Array.from(songListItems).indexOf(item);
   song = index;
   lyric = 0;
   render();
  });
 })
 songlist.querySelector("li.selected").scrollIntoView({ behavior: "smooth", block: "center" });
 songs[song].lyrics.forEach(item => {
  lyriclistHTML += `<li class="lyriclistitem">${item.replaceAll("|", "<br>")}</li><hr>`;
 });
 lyriclist.innerHTML = lyriclistHTML.slice(0, -4);
 const lyricListItems = document.querySelectorAll<HTMLLIElement>("li.lyriclistitem");
 lyricListItems.forEach(item => item.classList.remove("selected"));
 lyricListItems.item(lyric).classList.add("selected");
 lyricListItems.forEach(item => { 
  item.addEventListener("click", () => {
   const index = Array.from(lyricListItems).indexOf(item);
   lyric = index;
   render();
  });
 });
 lyriclist.querySelector("li.selected").scrollIntoView({ behavior: "smooth", block: "center" });
 if (display && display?.closed === false) display.document.body.innerHTML = `<div><h1>${displayText}</h1></div>`;
 preview.contentDocument.body.innerHTML = `<div><h1>${displayText}</h1></div>`;
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
      editor.alert("Not implemented yet! (Sorry!)");
      editor.close();
     });
    } else if (browser() === "chromium" || browser() === "webkit") {
     editor.document.head.innerHTML = config.editor;
     editor.alert("Not implemented yet! (Sorry!)")
     editor.close();
   }} else handleKey(event);
 })});
 render();
 addEventListener("beforeunload", () => {
  if (typeof display?.closed === "boolean" && display.closed === false) display.close();
  if (typeof editor?.closed === "boolean" && editor.closed === false) editor.close();
})});