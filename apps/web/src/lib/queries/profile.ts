import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

async function getProfile() {
  const res = await honoClient.user.profile.$get();

  if (!res.ok) {
    throw new Error("failed to get profile");
  }

  const body = await res.json();

  return body.profile;
}

export const getProfileOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: getProfile,
  staleTime: 5000,
});

export type Profile = NonNullable<Awaited<ReturnType<typeof getProfile>>>;
