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
            onSuccess: async () => {
              await router.invalidate();
              await router.navigate({
                href: "/",
                reloadDocument: true,
              });
            },
          },
        });
      }}
      className="flex w-full cursor-pointer items-center gap-2 transition-colors hover:text-red-500"
    >
      <LogOut size={20} />
      <span>로그아웃</span>
    </button>
  );
}
