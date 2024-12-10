import { AppSidebar } from "@/app/me/my-sidebar";
import { getProfile } from "@/supabase-utils/server-queries/auth";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function MeDateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  return (
    <div className="relative flex">
      <TooltipProvider>
        <AppSidebar profile={profile} />
        {children}
      </TooltipProvider>
    </div>
  );
}
