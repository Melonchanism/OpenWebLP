import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://blpwkswhxjbsllazzbdr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscHdrc3doeGpic2xsYXp6YmRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4Mjg0MDMsImV4cCI6MjAyNDQwNDQwM30.Hs4ghBwZGDwCqA6rv-NVXj03ooIyNdlgg7OjVfFmOdw";

export const supabase = createClient(supabaseUrl!, supabaseKey!);
