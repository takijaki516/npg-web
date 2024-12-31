import { hc } from "hono/client";
import { routes } from "./app";

const client = hc<typeof routes>("");
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof routes>(...args);
