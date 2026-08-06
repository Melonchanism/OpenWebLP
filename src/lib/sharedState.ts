import { writable, get } from "svelte/store"
import { supabase } from "./supabase"
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
}
export let sidePanel = writable<SidePanel>(SidePanel.None)
export let animating = writable(false)
sidePanel.subscribe(() => {
	animating.set(true)
	setTimeout(() => animating.set(false), 301)
})

export let editing = writable(false)
export let editingRevert = writable<Song>()
export let editingSong = writable<number | undefined>()

export function edit(songID: number) {
	editingSong.set(songID)
	window.onbeforeunload = (evt) => evt.preventDefault()
	editing.set(true)
}

export async function save(song: Song) {
	editing.set(false)
	const { error } = await supabase.from("songs").update(song).eq("id", song.id)
	if (error) throw error
	window.onbeforeunload = null
	editingSong.set(undefined)
}
