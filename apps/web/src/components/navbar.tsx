import { Home } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { supabase } from "@/lib/supabase";
// import { ThemeToggle } from "./theme-toggle";
import { UserDropdown } from "./user-dropdown";
import { Button } from "@/components/ui/button";
import { type Database } from "@/lib/types/database.types";

interface NavbarProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
}

export function Navbar({ profile }: NavbarProps) {
  async function handleTest() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback",
      },
    });

    console.log(data, error);
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


//https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=618922330263-8cq9giikm0lpkbmril83gakq77ma7ajc.apps.googleusercontent.com&redirect_to=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback&redirect_uri=http%3A%2F%2Flocalhost%3A54321%2Fauth%2Fv1%2Fcallback&response_type=code&scope=email%20profile&state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzQ5OTMyODksInNpdGVfdXJsIjoiaHR0cDovLzEyNy4wLjAuMTo1MTczIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJnb29nbGUiLCJyZWZlcnJlciI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTE3My9hdXRoL2NhbGxiYWNrIiwiZmxvd19zdGF0ZV9pZCI6IiJ9.69JLh-ZQj8eBr5TmVhbsoFoAZjlX5q824iCIwPoCKxQ&service=lso&o2v=2&ddm=1&flowName=GeneralOAuthFlow
// http://127.0.0.1:54321/auth/v1/authorize?provider=google&redirect_to=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback