import { Navbar } from "../../components/navbar";

export const runtime = "edge";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background">
      <Navbar />

      {children}
    </div>
  );
}
