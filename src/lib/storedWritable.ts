import { browser } from "$app/environment"
import { writable, type Writable } from "svelte/store"

export interface StoredWrtiable<T> extends Writable<T> {
	/**
	 * Whether the event storage event listener been setup or not
	 */
	browserLoaded?: boolean
}

/**
 * Creates a svelte `Writable` store that binds to localStorage
 * @param defaultValue - initial value -- Must be JSON.stringify-able
 * @param key - The localStorage key to be used
 * @param masterPath - the value that `location.pathname` must equal for the value to be set. Helps prevent "feedback" in multi window apps
 * @returns `StoredWrtiable<T>` extends `Writable<T>`
 */
export function storedWritable<T>(
	defaultValue: T,
	key: string,
	masterPath?: string
): StoredWrtiable<T> {
	let store: StoredWrtiable<T>
	if (browser && localStorage?.getItem(key) != null) {
		store = writable<T>(JSON.parse(localStorage.getItem(key)!))
	} else {
		store = writable<T>(defaultValue)
	}

	store.subscribe((val: T) => {
		if (browser && (masterPath === location.pathname || masterPath == null))
			localStorage.setItem(key, JSON.stringify(val))
		if (browser && !store.browserLoaded) {
			addEventListener("storage", (evt) => {
				if (evt.key == key) store.set(JSON.parse(evt.newValue!))
			})
			store.browserLoaded = true
		}
	})

	return store
}
