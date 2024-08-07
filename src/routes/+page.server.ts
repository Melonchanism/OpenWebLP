import { supabase } from "$lib/supabase";
import type {Song} from "$lib/songs.js";

export async function load() {
  const { data } = await supabase.from("songs").select();
  return {
    songs: data as Song[] ?? [],
  };
}
