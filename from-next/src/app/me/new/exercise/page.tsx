import { MeHeader } from "../../../../components/me-header";
import { getProfile } from "../../../../supabase-utils/server-queries/auth";
import { ExerciseForm } from "./exercise-form";
import { CoachIcon } from "@/components/logo";

export default async function NewExercisePage() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }
  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center">
      <MeHeader currentPageTitle={`${profile.username}님`} />

      <div className="flex w-full max-w-3xl flex-col p-4 md:py-6">
        <main className="flex flex-col border border-red-600 lg:w-full lg:items-center">
          <h1 className="w-full text-start text-3xl font-bold">운동 추가</h1>

          {/* <ExerciseForm profile={profile} /> */}
        </main>
      </div>
    </div>
  );
}
