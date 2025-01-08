import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

async function getProfile() {
  const res = await honoClient.user.profile.$get();

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  const body = await res.json();

  return body.profile;
}

export const getProfileOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: getProfile,
  staleTime: Infinity,
});

export type Profile = NonNullable<Awaited<ReturnType<typeof getProfile>>>;
