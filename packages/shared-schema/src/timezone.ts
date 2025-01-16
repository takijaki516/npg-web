import { z } from "zod";

export const alterTimezoneSchema = z.object({
  timezone: z.string(),
});
