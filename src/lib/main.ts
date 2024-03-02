export type song = {
  name: string;
  artist: string;
  lyrics: verse[];
};

export type verse = {
  type:
    | "Intro"
    | "Verse"
    | "Pre-Chorus"
    | "Chorus"
    | "Bridge"
    | "Tag"
    | "Ending";
  number: number;
  text: string;
};

export class Service {
  name: string;
  date: Date | null;
  songs: number[];
  constructor(name: string, songs: number[], date?: Date) {
    this.name = name;
    this.songs = songs;
    this.date = date ?? new Date();
  }
}
