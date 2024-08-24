import { crossfade, blur, fade } from "svelte/transition"

export const menuBlur = (node: Element) => blur(node, { duration: 300 })
export const menuFade = (node: Element) => fade(node, { duration: 300 })
export const [send, recieve] = crossfade({
	duration: (d) => Math.log(d + 1) * 62.5,
	//@ts-ignore
	fallback: fade,
})
