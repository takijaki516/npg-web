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
      className="group flex w-full cursor-pointer items-center gap-2"
    >
      <LogOut
        size={20}
        className="transition-colors group-hover:text-red-600/80"
      />
      로그아웃
    </button>
  );
}
