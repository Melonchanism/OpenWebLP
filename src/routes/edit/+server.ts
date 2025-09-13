import type { Song } from "$lib/localStorage.js"
import { supabase } from "$lib/supabase.server"
import { json } from "@sveltejs/kit"

export async function POST({ request }) {
	const requestData: Song = await request.json()

	if (requestData.id !== -1) {
		const { error } = await supabase.from("songs").update(requestData).eq("id", requestData.id)
		if (error) throw error
		return new Response(null, { status: 202 })
	} else {
		//@ts-expect-error
		delete requestData.id
		const { data, error } = await supabase.from("songs").insert(requestData).select("id")
		if (error) throw error
		return json(data[0].id ?? -1, { status: 201 })
	}
}
