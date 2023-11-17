import { writable, type Writable } from "svelte/store";
type Song = {
  name: string;
  lyrics: string[];
};

export default writable([]) as Writable<Song[]>;