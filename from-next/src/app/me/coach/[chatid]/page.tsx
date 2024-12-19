import { notFound, redirect } from "next/navigation";

import { getProfile } from "../../../../supabase-utils/server-queries/auth";
import { getChatWithId } from "../../../../supabase-utils/server-queries/chat";
import { MeHeader } from "../../../../components/me-header";
import { CoachChat } from "../_components/chat";
import { getGoal } from "../../../../supabase-utils/server-queries/goal";
import { getLatestHealthInfo } from "../../../../supabase-utils/server-queries/health-info";

export default async function ChatIdPage(props: {
  params: Promise<{ chatid: string }>;
}) {
  // NOTE:
  // check is chat is old
  // if old ask for new chat
  // if not old, just render

  const profile = await getProfile();

  if (!profile) {
    return redirect("/");
  }

  const params = await props.params;
  const { chatid } = params;

  const chat = await getChatWithId(chatid, profile.user_email);

  if (!chat) {
    notFound();
  }

  const userGoal = await getGoal(profile.user_email);
  const latestHealthInfo = await getLatestHealthInfo(profile.user_email);

  if (!userGoal || !latestHealthInfo) {
    return redirect("/me/coach");
  }
  console.log("🚀 ~ file: page.tsx:28 ~ chat:", chat.chat);
  const initialMessage = JSON.parse(chat.chat);
  console.log("🚀 ~ file: page.tsx:40 ~ initialMessage:", initialMessage);

  return (
    <div className="flex h-dvh flex-1 flex-col items-center overflow-hidden">
      <MeHeader currentPageTitle={`${profile.username}님`} />

      <div className="mb-4 w-full max-w-3xl flex-1 overflow-y-auto border border-red-500/20 px-4">
        <CoachChat
          chatId={chatid}
          initialMessages={[]}
          userGoal={userGoal}
          latestHealthInfo={latestHealthInfo}
        />
      </div>
    </div>
  );
}
