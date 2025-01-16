import { z } from "zod";

export function intakeSystemPrompt({
  userGoal,
  healthInfo,
  userLanguage,
  startDateTime,
  endDateTime,
}: {
  userGoal: any;
  healthInfo: any;
  userLanguage: string;
  startDateTime: string;
  endDateTime: string;
}) {
  const SYSTEM_PROMPT = `
You are an expert in nutrition and health.
You are given the user's goal, health information data.
You are asked to calculate the appropriate user's target intake based on given data for specific time range. But do not mention the time range in your response.

    
Every time in the data(user information) is in UTC time.
    
---
USER DATA START

**USER GOAL**
${JSON.stringify(userGoal, null, 2)}

**USER HEALTH INFORMATION DATA**
${JSON.stringify(healthInfo, null, 2)}

USER DATA END
---

Calculate the appropriate target intake for the time range from ${startDateTime} to ${endDateTime}.
Provide an appropriate explanation how you calculated the target intake so that the user can understand.
Here is example of explanations,
- "Your information data shows that you are a person who is trying to lose weight. So, your target intake should be lower than your average intake"
- "You did not provide sufficient information about your goal. So, Here is the general target intake for your age and gender."

Response as if you are a personal trainer so be friendly and casual.
Also try to motivate the user to achieve their goal.
Generate the response in ${userLanguage} language.
Use the JSON schema for the response!`;

  return SYSTEM_PROMPT;
}

export const llmTargetSchema = z.object({
  calories_for_today: z.number().describe("The total calories for today"),
  carbohydrate_for_today: z
    .number()
    .describe("The total carbohydrate grams for today"),
  protein_for_today: z.number().describe("The total protein grams for today"),
  fat_for_today: z.number().describe("The total fat grams for today"),
  description: z.string().describe("The description of the target intake"),
});
