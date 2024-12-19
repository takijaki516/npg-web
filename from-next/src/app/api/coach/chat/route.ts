import { streamText, type CoreMessage, type Message } from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { v4 as uuidv4 } from "uuid";

import { genWorkoutTool } from "./gen-workout-tool";
import { supabaseServerClient } from "../../../../supabase-utils/server";
import type { Database } from "../../../../lib/types/database.types";
import { getChatWithId, saveChat } from "../../../../supabase-utils/server-queries/chat";
import { fetchWithProxy } from "../../../../lib/proxy-fetcher";

const openaiWithProxy = createOpenAI({
  fetch: fetchWithProxy,
});

export const googleWithProxy = createGoogleGenerativeAI({
  fetch: fetchWithProxy,
});

export async function POST(req: Request) {
  const supabase = await supabaseServerClient<Database>();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", data.user.id)
    .limit(1)
    .single();
  if (!profile || !profile.user_id) {
    return new Response("Unauthorized", { status: 401 });
  }

  // TODO: separate into different functions and refine system prompt
  const latestUserGoal = supabase
    .from("user_goals")
    .select("*")
    .limit(1)
    .single();
  const latestUserHealthInfo = supabase
    .from("health_info")
    .select("*")
    .order("date", { ascending: false })
    .limit(1)
    .single();

  const [userGoal, userHealthInfo] = await Promise.all([
    latestUserGoal,
    latestUserHealthInfo,
  ]);

  let { id, messages }: { messages: Message[]; id: string } = await req.json();
  console.log("🚀 ~ file: route.ts:45 ~ POST ~ id:", id);
  console.log("🚀 ~ file: route.ts:45 ~ POST ~ messages:", messages);
  const chat = await getChatWithId(id, profile.user_email);
  if (!chat) {
    await saveChat({
      chatId: id,
      userId: profile.user_id,
      userEmail: profile.user_email,
    });
  }

  let systemPrompt = `You are a coach for a fitness app. Use the supplied tools to assist the user.
    As a fitness coach answer user's question appropriately.
    If user asks for you to generate a workout plan, leverage a tool.

    CONVERSATION_START_DATE: <coach247_CONVERSATION_START_DATE_inserting_mark>
    
    CURRENT_DATE: <coach247_CURRENT_DATE_inserting_mark>

    CURRENT_USER_GOAL: ${JSON.stringify(userGoal.data)}

    CURRENT_USER_HEALTH_INFO: ${JSON.stringify(userHealthInfo.data)}
    `;

  // if start of conversation, set system prompt
  if (messages.length === 1) {
    const updatedDate = new Date().toISOString();
    systemPrompt = systemPrompt.replace(
      "<coach247_CONVERSATION_START_DATE_inserting_mark>",
      updatedDate,
    );
    systemPrompt = systemPrompt.replace(
      "<coach247_CURRENT_DATE_inserting_mark>",
      updatedDate,
    );

    messages = [
      {
        id: uuidv4(),
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ];
  } else {
    systemPrompt = systemPrompt.replace(
      "<coach247_CURRENT_DATE_inserting_mark>",
      new Date().toISOString(),
    );
    // update system prompt to reference current user goal and health info
    messages[0].content = systemPrompt;
  }

  // NOTE: AI
  const result = streamText({
    model: googleWithProxy("gemini-2.0-flash-exp"),
    tools: {
      gen_workout: genWorkoutTool,
    },
    messages,
    onFinish: async ({ response }) => {
      response.messages.map((message) => {
        console.log(
          "🚀 ~ file: route.ts:99 ~ response.messages.map ~ message:",
          message,
        );
      });

      try {
        const newMessages = [...messages, ...response.messages];
      } catch (e) {
        console.error(e);
      }
    },
  });

  return result.toDataStreamResponse();
}
