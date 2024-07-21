import {fade} from "svelte/transition";

export const sidebarFade = (node: Element) => fade(node, {duration: 300})