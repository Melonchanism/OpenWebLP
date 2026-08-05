import { supabase } from "$lib/supabase"
import type { Song } from "$lib/localStorage"
export const ssr = false

export async function load() {
	const { data, error } = await supabase.from("songs").select()

	if (error) console.log(error)
	return {
		songs: (data as Song[]) ?? [],
	}
}
