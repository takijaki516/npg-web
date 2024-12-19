import { createClient } from "npm:@supabase/supabase-js@2.47.8";
import { generateObject } from "npm:ai";
import { google } from "npm:@ai-sdk/google";

Deno.serve(async (req) => {
  const { name } = await req.json();

  const data = {
    message: `Hello ${name}!`,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});
