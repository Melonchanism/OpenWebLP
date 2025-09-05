import { supabase } from "$lib/supabase.server"
import { json } from "@sveltejs/kit"

export async function POST({ request }) {
	const requestData = await request.json()

	if (requestData.id !== -1) {
		const { error } = await supabase.from("songs").update(requestData).eq("id", requestData.id)
		return new Response(null, { status: 202 })
	} else {
		delete requestData.id
		const { data, error } = await supabase.from("songs").insert(requestData).select("id")
		if (error) throw error
		return json(data[0].id ?? -1, { status: 201 })
	}
}
