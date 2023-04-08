import "./style.css";
import { s, sa } from "smallselectors";
import { icon, browser } from "./lib/acronyms";
import { parseHTML, decodeSongs, encodeSongs } from "./lib/parsing";
import type { Songs } from "./lib/types";
let display: Window | null,
 editor: Window | null,
 preview = s <HTMLIFrameElement>("iframe"),
 songlist = s <HTMLOListElement>("#songlist"),
 lyriclist = s <HTMLOListElement>("#lyriclist"),
 song: number = 0,
 lyric: number = 0,
 songs: Songs[] = JSON.parse(`[{"name":"Rediscover You","lyrics":["verse 1|I need to just admit my faith is paper thin|I'm feeling so burned out on religion|I say an empty prayer, I sing a tired song|I need to just admit that the passion's gone|And I wanna get it back","chorus|You told me, look for You and I will find|So I'm here like I'm searching for the first time|Revive me, Jesus, make this cold heart start to move|Help me rediscover","verse 2|I wanna learn to pray the way that David prayed|I want my soul to burn when I hear Your name|I wanna feel like new, I wanna hunger for You|Bring me back to life like only You can do|'Cause I don't wanna stay the same","chorus|You told me, look for You and I will find|So I'm here like I'm searching for the first time|Revive me, Jesus, make this cold heart start to move|Help me rediscover You","tag|Lord, I wanna be Yours today|I wanna know the passion of the saints|And how they were changed","chorus|You told me, look for You and I will find|So I'm here like I'm searching for the first time|Revive me, Jesus, make this cold heart start to move|I wanna burn for You, bring me back to life|Jesus, help me rediscover You"]},{"name":"Another In The Fire","lyrics":["VERSE 1|There's a grace when the heart is under fire|Another way when the walls are closing in|And when I look at the space between|Where I used to be and this reckoning|I know I will never be alone","CHORUS|There was another in the fire|Standing next to me|There was another in the waters|Holding back the seas|And should I ever need reminding|Of how I've been set free|There is a cross that bears the burden|Where another died for me","TAG|There is another in the fire","VERSE 2|All my debt left for dead beneath the waters|I'm no longer a slave to my sin anymore|And should I fall in the space between|What remains of me and this reckoning|Either way I won't bow|To the things of this world|And I know I will never be alone","CHORUS 2|There is another in the fire|Standing next to me|There is another in the waters|Holding back the seas|And should I ever need reminding|What power set me free|There is a grave that holds no body|And now that power lives in me","BRIDGE|And I can see the light in the darkness|As the darkness bows to Him|I can hear the roar in the heavens|As the space between wears thin|I can feel the ground shake beneath us|As the prison walls cave in|Nothing stands between us|Nothing stands between us","VERSE 3|There is no other name|But the Name that is Jesus|He who was and still is|And will be through it all|So come what may in the space between|All the things unseen and this reckoning|I know I will never be alone","CHORUS 3|There'll be another in the fire|Standing next to me|There'll be another in the waters|Holding back the seas|And should I ever need reminding|How good You've been to me|I'll count the joy come every battle|'Cause I know that's where You'll be"]},{"name":"What a beautiful name","lyrics":["[Verse 1]|You were the Word at the beginning|One with God the Lord Most High|Your hidden glory in creation|Now revealed in You our Christ","[Chorus 1]|What a beautiful Name it is|What a beautiful Name it is|The Name of Jesus Christ my King|What a beautiful Name it is|Nothing compares to this|What a beautiful Name it is|The Name of Jesus","[Verse 2]|You didn't want Heaven without us|So Jesus You brought Heaven down|My sin was great Your love was greater|What could separate us now?","[Chorus 2]|What a wonderful Name it is|What a wonderful Name it is|The Name of Jesus Christ my King|What a wonderful Name it is|Nothing compares to this|What a wonderful Name it is|The Name of Jesus","[Instrumentals]","[Bridge 1]|Death could not hold You|The veil tore before You|You silenced the boast of sin and grave|The Heavens are roaring|The praise of Your glory|For You are raised to life again","[Bridge 2]|You have no rival|You have no equal|Now and forever God You reign|Yours is the Kingdom|Yours is the glory|Yours is the Name above all names","[Chorus 3]|What a powerful Name it is, What a powerful Name it is|The Name of Jesus Christ my King|What a powerful Name it is, Nothing can stand against|What a powerful Name it is, The Name of Jesus(x3)"]},{"name":"Waymaker","lyrics":["[Verse 1]|You are here, moving in our midst|I worship You, I worship You|You are here, working in this place|I worship You, I worship You|You are here, moving in our midst|I worship You, I worship You|You are here, working in this place|I worship You, I worship You","[Chorus]|You are|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are|You are|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are","[Verse 2]|You are here, touching every heart|I worship You, I worship You|You are here, healing every heart|I worship You, I worship You","[Verse 3]|You are here, turning lives around|I worship You, I worship You|You are here, mending every heart|I worship You, yeah, I worship You, Lord","[Chorus]|And You are|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are|Yeah, You are the waymaker|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are|Yeah, sing it again|You are, yeah","[Chorus 2]|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are|Oh, it's who You are, Jesus, yeah|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are","[Pre - Chorus]|Sing that is who You are|Oh, that is who You are|Oh, and that is who You are|My Jesus, that is who You are|Oh, we lift You up, that is who You are|My Jesus","[Chorus]|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are|Yes it is, that is who You are|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are","[Bridge 1]|Let's sing this together, even when I don't see it|Come on, even when|Even when I don't see it, You're working|Even when I don't feel it, You're working|You never stop, You never stop working|You never stop, You never stop working|Come on","[Bridge 2]|And even when I don't see it, You're working|Even when I don't feel it, You're working|You never stop, You never stop working|You never stop, You never stop working|Oh-oh","[Bridge 3]|Even when I don't see it, You're working|Even when I don't feel it, You're working|You never stop, You never stop working|You never stop, You never stop working|Even when I don't see it, You're working|Even when I don't feel it, You're working|You never stop, You never stop working|You never stop, You never stop working","[Chorus]|You are the way maker, yeah|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are","[Pre - Chorus]|Sing that is who You are|Oh, that is who You are|Oh, that is who You are |That is who You are |Oh, that is who You are|Oh, it's who You are, my Jesus","[Chorus]|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are|You are|Waymaker, miracle worker|Promise keeper, light in the darkness|My God, that is who You are","[Spontaneous]|Oh, His name is above|His name is above depression|His name is above loneliness|Oh, His name is above disease|His name is above cancer|His name is above every other name","[Outro]|That is who You are (That is who You are)|That is who You are (That is who You are)|Jesus|That is who You are (That is who You are)|Oh, I know that is who You are (That is who You are)"]}]`),
 config = {
  display: `<title>OpenWebLP Display</title><style>body{background-color:black;color:white;font-family:sans-serif;overflow:hidden;margin:0px;width:100vw;height:100vh;}h1{font-size:calc(2.8vh + 2.8vw);text-align:center;user-select:none;}div{top:50%;left:50%;transform:translate(-50%, -50%);position:absolute;margin:0px;width:100vw}</style><link rel="icon" href=${icon}>`,
  editor: `<title>OpenWebLP Editor</title><style>body{background-color:black;color:white;font-family:sans-serif;margin:0px;overflow:hidden}textarea{margin:0px;border:none;padding:15px;background-color:black;width:100vw;height:100vh;color:white; resize:none;}</style><link rel="icon" href=${icon}>`,
 };

function handleKey(event: KeyboardEvent) {
 const key: string = event.key;
 if (key === "ArrowDown" || key === "ArrowUp" || key === "ArrowLeft" || key === "ArrowRight" || key === "F1" || key === "F3" || key === "F5" || key === "F6" || key === "F7" || key === "F10") event.preventDefault();
 if (key === "ArrowDown") setLyric(lyric + 1);
 else if (key === "ArrowUp") setLyric(lyric - 1);
 else if (key === "ArrowLeft") setSong(song - 1);
 else if (key === "ArrowRight") setSong(song + 1);
 else if (key === "f") fullscreenDisplay();
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
 const songListItems = sa<HTMLLIElement>("li.songlistitem");
 songListItems.forEach(item => item.classList.remove("selected"));
 songListItems.item(song).classList.add("selected");
 songListItems.forEach(item => {
  item.addEventListener("click", () => setSong(Array.from(songListItems).indexOf(item)));
 });
 songlist.querySelector("li.selected").scrollIntoView({ behavior: "smooth", block: "center" });
 songs[song].lyrics.forEach(item => {
  lyriclistHTML += `<li class="lyriclistitem">${item.replaceAll("|", "<br>")}</li><hr>`;
 });
 lyriclist.innerHTML = lyriclistHTML.slice(0, -4);
 const lyricListItems = sa<HTMLLIElement>("li.lyriclistitem");
 lyricListItems.forEach(item => item.classList.remove("selected"));
 lyricListItems.item(lyric).classList.add("selected");
 lyricListItems.forEach(item => { 
  item.addEventListener("click", () => setLyric(Array.from(lyricListItems).indexOf(item)));
 });
 document.querySelector("#lyriclist > li.selected").scrollIntoView({ behavior: "smooth", block: "center" });
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
  if (event.key === "Enter" && event.ctrlKey) { 
   songs = encodeSongs(input.value);
   if (!songs[song]?.lyrics[lyric]) setSong(0);
   render();
   editor.alert("Updated");
  };
 });
};

async function fullscreenDisplay() {
 if (display && display?.closed === false) {
  if (browser !== "webkit") await display.document.body.requestFullscreen();
  //@ts-ignore
  else if (browser === "webkit") await display.document.body.webkitRequestFullscreen();
  const displaySize = display.document.body.getBoundingClientRect();
  preview.style.width = displaySize.width + "px";
  preview.style.height = displaySize.height + "px";
 };
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
}

addEventListener("load", () => {
 preview.contentDocument.head.innerHTML = config.display;
 preview.contentDocument.addEventListener("keydown", handleKey);
 [document, preview.contentDocument].forEach(item => {
  item.addEventListener("keydown", (event: KeyboardEvent) => {
   const key = event.key
   if (key === "d") {
    if (typeof display?.closed === "boolean" && display.closed === false) display.close();
    display = window.open(`${document.location.href}display.html`, "_blank", "width=960, height=540, popup");
    if (browser === "firefox") display.addEventListener("load", displayInit);
    else if (browser === "chromium" || browser === "webkit") displayInit();
   } else if (key === "e") {
    if (typeof editor?.closed === "boolean" && editor.closed === false) editor.close();
    editor = window.open(`${document.location.href}editor.html`, "_blank");
    if (browser === "firefox") editor.addEventListener("load", editorInit);
    else if (browser === "chromium" || browser === "webkit") editorInit();
   } else handleKey(event);
  });
 });
 render();
 addEventListener("beforeunload", () => {
  if (typeof display?.closed === "boolean" && display.closed === false) display.close();
  if (typeof editor?.closed === "boolean" && editor.closed === false) editor.close();
 });
});