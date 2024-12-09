import { AppSidebar } from "@/components/my-sidebar";
import { getProfile } from "@/supabase-utils/server-queries";

export default async function MeLayout({
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
      <AppSidebar profile={profile} />

      {children}
    </div>
  );
}
