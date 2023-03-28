import type { Songs } from "./types";

export const browser: "firefox" | "chromium" | "webkit" | "unknown" = (() => {
 ///@ts-ignore
 if (typeof mozRTCPeerConnection === "function") return "firefox";
 ///@ts-ignore
 else if (typeof window.chrome === "object") return "chromium";
 ///@ts-ignore
 else if (document.webkitExitFullscreen) return "webkit";
 else return "unknown";
})();

export function decodeSongs(input:Songs[]):string {
 let output = "";
 input.forEach((item:Songs) => {
  output += (item.name + "\n" + item.lyrics.join("\n\n").replaceAll("|", "\n") + "\n\n\n");
 });
 return output.slice(0, -3);
};

export function encodeSongs(input: string):Songs[] { 
 let newSongs: Songs[] = [];
 input.split("\n\n\n").forEach((item:string) => {
  let name = item.split("\n", 1)[0];
  let lyrics: string[] = item.slice(name.length + 1).split("\n\n").map(item => item.replaceAll("\n", "|"));
  newSongs.push({ name, lyrics })
 });
 console.log(JSON.stringify(newSongs));
 return newSongs;
};

export function parseHTML(input: string | string[]) {
 if (typeof input === "object") {
  input.forEach(item => {
   item.replace(">", "&gt;").replace("<", "&lt;").replace("&", "&amp;").replace('"', "&quot;").replace("'", "&apos;");
  });
 } else {
  input.replace(">", "&gt;").replace("<", "&lt;").replace("&", "&amp;").replace('"', "&quot;").replace("'", "&apos;");
 };
 return input;
};

export const icon = document.querySelector<HTMLLinkElement>("link[rel='icon']").href;