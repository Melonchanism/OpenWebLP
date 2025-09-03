import { writable } from "svelte/store"
import { type Song } from "./localStorage"

export let menuShown = writable(false)
export let menuPos = writable({ x: 0, y: 0 })
export let menuID = writable<number | null>()
export let menuElement = writable<HTMLElement | null>()
export let menuServiceIndex = writable<number | null>()

export function showMenu(event: Event, id: number, serviceIndex: number | null = null) {
	event.preventDefault()
	menuShown.set(true)
	menuID.set(id)
	menuServiceIndex.set(serviceIndex)
	let buttonElement = event.target as HTMLElement
	while (buttonElement.nodeName !== "BUTTON") {
		buttonElement = buttonElement.parentElement!
	}
	menuElement.update((elm) => {
		elm?.classList.remove("highlighted")
		return buttonElement
	})
	buttonElement.classList.add("highlighted")
	const rect = buttonElement.getBoundingClientRect()
	menuPos.set({ x: rect.left, y: rect.bottom })
}

export let blank = writable(false)

export enum SidePanel {
	None,
	Songs,
	Settings,
	Editor,
}
export let sidePanel = writable<SidePanel>(SidePanel.None)

export let songs = writable<Song[]>([])
