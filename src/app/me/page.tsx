import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { MeHeader } from "@/components/me-header";
import { getProfile } from "@/supabase-utils/server-queries";

export default async function MePage() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center">
      <MeHeader currentPageTitle={`${profile.username}님`} />

      <div className="flex w-full max-w-3xl flex-col p-4 md:py-6">
        <main className="flex flex-col lg:w-full lg:items-center">
          <BentoGrid className="grid w-full grid-rows-5 gap-4 md:grid-cols-2">
            <BentoGridItem className="row-start-1 row-end-4 rounded-xl md:col-span-full">
              Today
            </BentoGridItem>
            <BentoGridItem className="row-start-4 row-end-6 hidden rounded-xl md:inline-block">
              Workouts
            </BentoGridItem>
            <BentoGridItem className="row-start-4 row-end-6 hidden rounded-xl md:inline-block">
              Meals
            </BentoGridItem>

            <BentoGridItem className="row-start-4 row-end-6 md:hidden">
              MobileBottomGrid
            </BentoGridItem>
          </BentoGrid>
        </main>
      </div>
    </div>
  );
}
