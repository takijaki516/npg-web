import { LogOut } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

import { authClient } from "@/lib/better-auth";

export function UserSignoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.navigate({
                href: "/",
              });
            },
          },
        });
      }}
      className="flex cursor-pointer items-center gap-2"
    >
      <LogOut className="size-4" />
      로그아웃
    </button>
  );
}
