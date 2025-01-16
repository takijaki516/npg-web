import { honoClient } from "../hono";

export async function deleteFood(foodId: string) {
  const res = await honoClient.foods.$delete({
    json: {
      foodId,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete food");
  }

  return res.json();
}
