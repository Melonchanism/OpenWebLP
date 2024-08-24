import { supabase } from "$lib/supabase.server"
import type { Song } from "$lib/localStorage"

export async function load() {
	const { data, error } = await supabase.from("songs").select()

	console.log("server load function used")

	return {
		songs: (data as Song[]) ?? [],
	}
}
