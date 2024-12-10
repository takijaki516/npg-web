import { MeHeader } from "@/components/me-header";
import { getProfile } from "@/supabase-utils/server-queries/auth";
import { CoachChat } from "./_components/chat";
import { getLatestHealthInfo } from "@/supabase-utils/server-queries/health-info";
import { getOrCreateGoal } from "@/supabase-utils/server-queries/goal";
import { UserHealthInfoForm } from "./_components/user-health-info-form";

export default async function CoachPage() {
  const profile = await getProfile();

  if (!profile || !profile.user_id) {
    return null;
  }

  const [latestHealthInfo, latestGoal] = await Promise.all([
    getLatestHealthInfo(profile.user_email),
    getOrCreateGoal(profile.user_email, profile.user_id),
  ]);

  let renderContent;

  if (!latestHealthInfo || !latestGoal) {
    console.log("왜");
    renderContent = <UserHealthInfoForm profile={profile} />;
  } else {
    renderContent = <CoachChat userGoal={latestGoal} />;
  }

  return (
    <div className="flex h-dvh flex-1 flex-col items-center overflow-hidden">
      <MeHeader currentPageTitle={`${profile.username}님`} />

      <div className="mb-4 w-full max-w-3xl flex-1 overflow-y-auto border border-red-500 px-4">
        {renderContent}
      </div>
    </div>
  );
}
