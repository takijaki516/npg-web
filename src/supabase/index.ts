import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  alert("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  alert("NEXT_PUBLIC_SUPABASE_URL is required");
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
}

console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
