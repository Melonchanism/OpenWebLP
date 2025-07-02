import { cubicOut, quadOut } from "svelte/easing"
import { crossfade, blur, fade } from "svelte/transition"

export const menuBlur = (node: Element) => blur(node, { duration: 300 })
export const menuFade = (node: Element) => fade(node, { duration: 300 })
export const [send, recieve] = crossfade({
	duration: 150,
	easing: cubicOut,
	//@ts-ignore
	fallback: fade,
})
