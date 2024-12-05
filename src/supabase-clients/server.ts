import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  alert("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  alert("NEXT_PUBLIC_SUPABASE_URL is required");
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
}

// console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
// console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function supabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
