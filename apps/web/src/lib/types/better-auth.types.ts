import type { User } from "better-auth";

export type AppUser = User & {
  timezone: string;
};

export {};
