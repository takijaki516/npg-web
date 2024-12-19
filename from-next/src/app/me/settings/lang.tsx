"use client";

import * as React from "react";
import { RotateCw } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { type Database } from "../../../lib/types/database.types";
import { supabaseClient } from "../../../supabase-utils/client";
interface LangProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export default function Lang({ profile }: LangProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [lang, setLang] = React.useState(profile.language);

  async function handleUpdateLanguage() {
    const supabase = supabaseClient<Database>();
    try {
      setIsLoading(true);

      const res = await supabase
        .from("profiles")
        .update({
          language: lang,
        })
        .eq("user_id", profile.user_id!)
        .eq("user_email", profile.user_email);

      if (res.error) {
        toast.error("언어 변경에 실패했습니다.");
        return;
      }

      toast.success("언어가 변경되었습니다.");
    } catch (err) {
      console.error(err);
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-52 items-center gap-2">
      <div className="whitespace-nowrap">
        {profile.language === "ko" ? "언어" : "Language"}
      </div>

      <Select value={lang} onValueChange={setLang}>
        <SelectTrigger>{lang === "ko" ? "한국어" : "English"}</SelectTrigger>
        <SelectContent>
          <SelectItem value="ko" onClick={() => setLang("ko")}>
            Korean/한국어
          </SelectItem>
          <SelectItem value="en" onClick={() => setLang("en")}>
            English
          </SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleUpdateLanguage}>
        {isLoading ? <RotateCw className="h-4 w-4 animate-spin" /> : "저장"}
      </Button>
    </div>
  );
}
