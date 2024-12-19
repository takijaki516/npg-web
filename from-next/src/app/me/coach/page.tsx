import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { MeHeader } from "../../../components/me-header";
import { getProfile } from "../../../supabase-utils/server-queries/auth";
import { CoachChat } from "./_components/chat";
import { getLatestHealthInfo } from "../../../supabase-utils/server-queries/health-info";
import { UserHealthInfoForm } from "./_components/user-health-info-form";
import { getOrCreateGoal } from "../../../supabase-utils/server-queries/goal";

export default async function CoachPage() {
  const profile = await getProfile();

  if (!profile || !profile.user_id) {
    return redirect("/");
  }

  // if user doesn't have health info, user can't use llm(llm need health info)
  const latestHealthInfo = await getLatestHealthInfo(profile.user_email);

  let renderContent;

  if (!latestHealthInfo) {
    renderContent = <UserHealthInfoForm profile={profile} />;
  } else {
    // user has health info, user can user coach
    // get user goal, if user doesn't have goal, create goal with default settings
    const userGoal = await getOrCreateGoal(profile.user_email, profile.user_id);

    renderContent = (
      <CoachChat
        chatId={uuidv4()}
        initialMessages={[]}
        userGoal={userGoal}
        latestHealthInfo={latestHealthInfo}
      />
    );
  }

  return (
    <div className="flex h-dvh flex-1 flex-col items-center overflow-hidden">
      <MeHeader currentPageTitle={`${profile.username}님`} />

      <div className="mb-4 w-full max-w-3xl flex-1 overflow-y-auto border border-red-500/20 px-4">
        {renderContent}
      </div>
    </div>
  );
}
