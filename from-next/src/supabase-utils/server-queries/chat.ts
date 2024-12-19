import * as React from "react";
import { supabaseServerClient } from "../server";
import { Database } from "../../lib/types/database.types";

export async function getChatWithId(chatId: string, userEmail: string) {
  const supabase = await supabaseServerClient<Database>();

  const { data } = await supabase
    .from("chats")
    .select("*")
    .eq("user_email", userEmail)
    .eq("chat_id", chatId)
    .single();

  return data;
}

export async function saveChat({
  chatId,
  userId,
  userEmail,
}: {
  chatId: string;
  userId: string;
  userEmail: string;
}) {
  const supabase = await supabaseServerClient<Database>();

  const { error } = await supabase.from("chats").insert({
    chat_id: chatId,
    user_id: userId,
    user_email: userEmail,
  }).select()

  // TODO: handle error
}
