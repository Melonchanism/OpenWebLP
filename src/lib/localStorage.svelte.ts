import {writable} from "svelte/store";
import type {Lyric} from "$lib/songs.js";

export type DisplayData = {
  name: string,
  artists: string[],
  lyric: Lyric
}
export let displayData = writable<DisplayData | null>(null);

export type Settings = {
  transition: Transition
}
export enum Transition {
  fade = "fade",
  morph = "morph",
  stack = "stack",
}
export let settings = writable<Settings| null>( null)

export let aspectRatio = writable<number | null>(null)