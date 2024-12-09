import Link from "next/link";
import { Plus } from "lucide-react";

import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { MeHeader } from "@/components/me-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProfile } from "@/supabase-utils/server-queries";

export default async function MePage() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center">
      <MeHeader currentPageTitle={`${profile.username}님`} />

      <div className="flex w-full max-w-3xl flex-col p-4 pb-[100px] md:pt-6">
        <main className="flex flex-col lg:w-full lg:items-center">
          <BentoGrid className="grid w-full gap-4 md:grid-cols-2">
            <BentoGridItem className="rounded-xl md:col-span-full">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                  <span>Today</span>
                </div>

                <div></div>
              </div>
            </BentoGridItem>

            <BentoGridItem className="hidden rounded-xl md:inline-block">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                  <span>Workouts</span>

                  <Link
                    href="/me/exercises/new"
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    <Plus className="h-9 w-9" />
                  </Link>
                </div>

                <div></div>
              </div>
            </BentoGridItem>

            <BentoGridItem className="hidden rounded-xl md:inline-block">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                  <span>Meals</span>

                  <Link
                    href="/me/meals/new"
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    <Plus className="h-9 w-9" />
                  </Link>
                </div>

                <div></div>
              </div>
            </BentoGridItem>

            <BentoGridItem className="md:hidden">
              MobileBottomGrid
            </BentoGridItem>
          </BentoGrid>
        </main>
      </div>
    </div>
  );
}
