export { s, sa } from "smallselectors";

/*
export function decodeSongs(input: Songs[]): string {
 let output = "";
 input.forEach((item: Songs) => {
  output += (item.name + "\n" + item.lyrics.join("\n\n").replaceAll("|", "\n") + "\n\n\n");
 });
 return output.slice(0, -3);
};

export function encodeSongs(input: string): Songs[] {
 let newSongs: Songs[] = [];
 input.split("\n\n\n").forEach((item: string) => {
  let name = item.split("\n", 1)[0];
  let lyrics: string[] = item.slice(name.length + 1).split("\n\n").map(item => item.replaceAll("\n", "|"));
  newSongs.push({ name, lyrics })
 });
 return newSongs;
};
*/
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
export class Songs {
 name: string;
 lyrics: string[];

 constructor(name: string, lyrics: string[]) {
  this.name = name;
  this.lyrics = lyrics;
 }

 static parse(input: string): Songs[] {
  let newSongs: Songs[] = [];
  for (const item of input.split("\n\n\n")) {
   let name = item.split("\n", 1)[0];
   let lyrics: string[] = item
    .slice(name.length + 1)
    .split("\n\n")
    .map((item) => item.replaceAll("\n", "|"));
   newSongs.push(new Songs(name, lyrics));
  }
  return newSongs;
 }

 static decode(input: Songs[]): string {
  let output = "";
  for (const item of input) {
   output += item.name + "\n" + item.lyrics.join("\n\n").replaceAll("|", "\n") + "\n\n\n";
  }
  return output.slice(0, -3);
 }
}