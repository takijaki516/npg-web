import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

import { fetchWithProxy } from "@/lib/proxy-fetcher";

export const googleWithProxy = createGoogleGenerativeAI({
  fetch: fetchWithProxy,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  // const usersLanguage = "KOREAN";

  // Access form data values
  const image = formData.get("image") as File;
  const userRequest = formData.get("userRequest") as string;
  // const userLanguage = formData.get("userLanguage") as string;

  console.log(image);

  const result = await generateObject({
    model: googleWithProxy("gemini-2.0-flash-exp"),
    system: PROMPT1,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: userRequest,
          },
          {
            type: "image",
            image: await image.arrayBuffer(),
          },
        ],
      },
    ],
    schema: llmCalorieResponseSchema,
  });

  return result.toJsonResponse();
}

export const llmCalorieResponseSchema = z.object({
  foodName: z
    .string()
    .describe(
      "The name of the foods in image, If there are multiple foods, list them all",
    ),
  calories: z.number().describe("The total calories of the foods in image"),
  protein: z.number().describe("The total protein of the foods in image"),
  fat: z.number().describe("The total fat of the foods in image"),
  carbohydrate: z
    .number()
    .describe("The total carbohydrate of the foods in image"),
});

export const PROMPT1 = `
You are an expert in nutritionist.
Your task is to analyze the food items from the image or "Nutrition Facts".

If the given image is foods itself, cautiously analyze the foods and calculate the total calories, protein, fat, and carbohydrate.
If the given image is "Nutrition Facts", read the "Nutrition Facts" and cautiously analyze the nutrition facts and calculate the total calories, protein, fat, and carbohydrate.

Think step by step before you calculate the calories, protein, fat, and carbohydrate. This is very important.

Also remember to provide the name of the foods in image, if there are multiple foods, list them all.

Lastly, you must follow user's language.
If the user's language is Korean, you should respond in Korean!

USER'S LANGUAGE: KOREAN
`;
