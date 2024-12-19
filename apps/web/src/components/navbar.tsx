import { Home } from "lucide-react";
import { Link } from "@tanstack/react-router";

// import { ThemeToggle } from "./theme-toggle";
import { UserDropdown } from "./user-dropdown";
import { Button } from "@/components/ui/button";
import { type Database } from "@/lib/types/database.types";

interface NavbarProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
}

export function Navbar({ profile }: NavbarProps) {
  async function handleTest() {
    const authorizeParams = new URLSearchParams();

    const state = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    authorizeParams.append("response_type", "code");
    authorizeParams.append("client_id", "5o2o6ogu0huht3dpr8qn1q8ef0");
    authorizeParams.append(
      "redirect_uri",
      `http://localhost:7788/auth/callback`,
    );
    authorizeParams.append("state", state);
    authorizeParams.append("identity_provider", "Google");
    authorizeParams.append("scope", "profile email openid");

    const url = `https://npg-auth.auth.ap-northeast-2.amazoncognito.com/oauth2/authorize?${authorizeParams.toString()}`;

    const res = await fetch(url);

    console.log(res);
  }

  return (
    <nav className="sticky top-0 flex w-full justify-center bg-background/80 py-4 backdrop-blur-lg">
      <div className="container flex items-center justify-between px-4">
        <Link href="/">
          <Home />
        </Link>

        <div className="flex items-center gap-4">
          {profile ? (
            <UserDropdown profile={profile} align="end" />
          ) : (
            <Button variant={"outline"} asChild>
              <Link href="/login">로그인</Link>
            </Button>
          )}

          <Button variant={"outline"} onClick={handleTest}>
            테스트
          </Button>

          {/* <ThemeToggle /> */}
        </div>
      </div>
    </nav>
  );
}
