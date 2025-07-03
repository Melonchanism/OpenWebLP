import { writable } from "svelte/store"

export let showMenu = writable(false)
export let menuPos = writable({ x: 0, y: 0 })
export let menuID = writable(1)

export enum SidePanel {
	None,
	Songs,
	Settings,
	Editor,
}
export let sidePanel = writable<SidePanel>(SidePanel.None)
