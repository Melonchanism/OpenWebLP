import type { Songs } from "./types";

export const browser: "firefox" | "chromium" | "webkit" | "unknown" = (() => {
 ///@ts-ignore
 if (typeof window.InstallTrigger === "object") return "firefox";
 ///@ts-ignore
 else if (typeof window.chrome === "object") return "chromium";
 ///@ts-ignore
 else if (document.webkitExitFullscreen) return "webkit";
 else return "unknown";
})();

export function decodeSongs(input:Songs[]):string {
 let mapping = "";
 input.forEach((item:Songs) => {
  mapping += (item.name + "\n" + item.lyrics.join("\n\n").replaceAll("|", "\n") + "\n\n\n");
 });
 return mapping.slice(0, -3);
};

export function encodeSongs(input: string):Songs[] { 
 let newSongs: Songs[] = [];
 input.split("\n\n\n").forEach((item:string) => {
  let name = item.split("\n", 1)[0];
  let lyrics: string[] = item.slice(name.length + 1).split("\n\n").map(item => item.replaceAll("\n", "|"));
  newSongs.push({ name, lyrics })
 });
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