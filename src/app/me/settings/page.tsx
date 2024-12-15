import { MeHeader } from "@/components/me-header";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { getProfile } from "@/supabase-utils/server-queries";
import Lang from "./lang";
import { Separator } from "@/components/ui/separator";
import TimeZone from "./timezone";

export default async function SettingsPage() {
  const profile = await getProfile();

  if (!profile || !profile.user_id) {
    return null;
  }

  return (
    <div className="flex h-dvh flex-1 flex-col items-center">
      <MeHeader currentPageTitle={`${profile.username}님`} />

      <main className="flex flex-1 flex-col items-stretch justify-center gap-4">
        <Lang profile={profile} />
        <TimeZone profile={profile} />
      </main>
    </div>
  );
}
