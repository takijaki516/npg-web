import { createBrowserClient } from "@supabase/ssr";

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  alert("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  alert("NEXT_PUBLIC_SUPABASE_URL is required");
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
}

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function supabaseClient<T>() {
  return createBrowserClient<T>(SUPABASE_URL, SUPABASE_ANON_KEY);
}
