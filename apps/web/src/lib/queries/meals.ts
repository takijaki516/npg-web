import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import {
  aiCalcFoodCalorieSchema,
  insertMealSchema,
  llmCalorieResponseSchema,
} from "@repo/shared-schema";
import { v4 as uuidv4 } from "uuid";

import { honoClient } from "@/lib/hono";

export const GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY = "DAILY_MEALS_WITH_FOODS";

const getDailyMealsWithFoods = async ({
  currentLocalDate,
}: {
  currentLocalDate: string;
}) => {
  const res = await honoClient.meals["daily-meals"].$get({
    query: {
      currentLocalDate,
    },
  });

  if (!res.ok) {
    throw new Error("failed to get daily meals with foods");
  }

  const body = await res.json();

  return body.meals;
};

export function getDailyMealsWithFoodsOptions({
  currentLocalDate,
}: {
  currentLocalDate: string;
}) {
  return queryOptions({
    queryKey: [GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY, currentLocalDate],
    queryFn: ({ queryKey }) =>
      getDailyMealsWithFoods({
        currentLocalDate: queryKey[1],
      }),
    staleTime: Infinity,
  });
}

export type DailyMealsWithFoods = NonNullable<
  Awaited<ReturnType<typeof getDailyMealsWithFoods>>
>;

// insert query
export async function insertMeal(data: z.infer<typeof insertMealSchema>) {
  // loop through foods and add image
  const foodsWithPic = await Promise.all(
    // food with no food image
    data.foods.map(async (food) => {
      if (!food.foodPicFile) {
        return {
          ...food,
        };
      }

      const fileUUID = uuidv4();
      const fileType = food.foodPicFile.type;

      const presignedRes = await honoClient.presign.$post({
        json: {
          key: fileUUID,
          action: "PUT",
          fileType,
        },
      });

      if (!presignedRes.ok) {
        throw new Error("failed to presign");
      }

      const presignedBody = await presignedRes.json();

      if (!presignedBody.url) {
        throw new Error("failed to presign");
      }

      await fetch(presignedBody.url, {
        method: "PUT",
        body: food.foodPicFile,
        headers: {
          "Content-Type": fileType,
        },
      });

      return {
        ...food,
        foodPic: presignedBody.key,
        foodPicFile: null,
      };
    }),
  );

  data.foods = foodsWithPic;

  const res = await honoClient.meals.$post({
    json: data,
  });

  if (!res.ok) {
    throw new Error("failed to add meal");
  }

  const { meal } = await res.json();

  return meal;
}

// update query
export async function updateMeal(data: z.infer<typeof insertMealSchema>) {
  // handle image
  const foodsWithPic = await Promise.all(
    data.foods.map(async (food) => {
      // food with no food image
      if (!food.foodPicFile) {
        return {
          ...food,
        };
      }

      // TODO: if there is a already a food pic then delete that food pic

      // create new food pic
      const fileUUID = uuidv4();
      const fileType = food.foodPicFile.type;

      const presignedRes = await honoClient.presign.$post({
        json: {
          key: fileUUID,
          action: "PUT",
          fileType,
        },
      });

      if (!presignedRes.ok) {
        throw new Error("failed to presign");
      }

      const presignedBody = await presignedRes.json();

      if (!presignedBody.url) {
        throw new Error("failed to presign");
      }

      await fetch(presignedBody.url, {
        method: "PUT",
        body: food.foodPicFile,
        headers: {
          "Content-Type": fileType,
        },
      });

      return {
        ...food,
        foodPic: presignedBody.key,
        foodPicFile: null,
      };
    }),
  );

  data.foods = foodsWithPic;

  const res = await honoClient.meals.$put({
    json: data,
  });

  if (!res.ok) {
    throw new Error("failed to update meal");
  }

  const { meal } = await res.json();

  return meal;
}

// ai-calc-food-calorie
export async function aiCalcFoodCalorie(
  data: z.infer<typeof aiCalcFoodCalorieSchema>,
) {
  const res = await honoClient.meals["ai-calc-food-calorie"].$post({
    form: data,
  });

  if (!res.ok) {
    throw new Error("failed to calc food calorie");
  }

  const body = (await res.json()) as z.infer<typeof llmCalorieResponseSchema>;

  return body;
}

// delete meal
export async function deleteMealMutationFn({ id }: { id: string }) {
  const res = await honoClient.meals.$delete({
    json: { id },
  });

  if (!res.ok) {
    throw new Error("failed to delete meal");
  }

  return res.json();
}
