import { streamText, type CoreMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { genWorkoutTool } from "./gen-workout-tool";

export async function POST(req: Request) {
  let { messages }: { messages: CoreMessage[] } = await req.json();

  console.log("🚀 ~ file: route.ts:7 ~ POST ~ messages:", messages);

  if (messages.length === 1) {
    const userGoal = getUserGoal();
    const userHealthInfo = getUserHealthInfo();

    const systemPrompt = `You are a coach for a fitness app. Use the supplied tools to assist the user.
    As a fitness coach answer user's question appropriately.
    If user asks for you to generate a workout plan, leverage a tool.

    User's goal: ${userGoal}
    User's health info: ${userHealthInfo}
    `;

    // set data
    messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ];
  }

  const result = streamText({
    model: openai("gpt-4o-mini"),
    tools: {
      gen_workout: genWorkoutTool,
    },
    messages,
  });

  return result.toDataStreamResponse();
}
