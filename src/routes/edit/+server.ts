import { json } from "@sveltejs/kit"
import { supabase } from "$lib/supabase.server"

export async function POST({ request }) {
	const data = await request.json()

	if (data.id !== -1) {
		const { error } = await supabase.from("songs").update(data).eq("id", data.id)
	}

	return json({}, { status: 202 })
}
