"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";
import { toast } from "sonner";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { type Database } from "@/lib/types/database.types";
import { supabaseClient } from "@/supabase-utils/client";

interface TimeZoneProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export default function TimeZone({ profile }: TimeZoneProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [timeZone, setTimeZone] = React.useState(profile.timezone);

  async function handleUpdateTimeZone() {
    const supabase = supabaseClient<Database>();
    try {
      setIsLoading(true);

      const res = await supabase
        .from("profiles")
        .update({
          timezone: timeZone,
        })
        .eq("user_id", profile.user_id!)
        .eq("user_email", profile.user_email);

      if (res.error) {
        toast.error("시간대 변경에 실패했습니다.");
        return;
      }

      toast.success("시간대가 변경되었습니다.");
    } catch (err) {
      console.error(err);
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-52 gap-2">
      <Select value={timeZone} onValueChange={setTimeZone}>
        <SelectTrigger>
          {profile.language === "ko"
            ? timeZone === "Asia/Seoul"
              ? "한국"
              : "뉴욕"
            : timeZone === "Asia/Seoul"
              ? "Korea"
              : "New York"}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Asia/Seoul">
            {profile.language === "ko" ? "한국" : "Korea"}
          </SelectItem>
          <SelectItem value="America/New_York">
            {profile.language === "ko" ? "뉴욕" : "New York"}
          </SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleUpdateTimeZone}>
        {isLoading ? <RotateCw className="h-4 w-4 animate-spin" /> : "저장"}
      </Button>
    </div>
  );
}
