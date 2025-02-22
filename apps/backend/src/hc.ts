import { hc } from "hono/client";
import { routes } from "./app";

const client = hc<typeof routes>("");
export type Client = typeof client;

// NOTE: for better type inference performance, go see hono rpc docs for more info
export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof routes>(...args);
