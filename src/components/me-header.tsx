import { Hand } from "lucide-react";

interface MeHeaderProps {
  currentPageTitle: string;
}

export function MeHeader({ currentPageTitle }: MeHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full flex-shrink-0 bg-background/80 backdrop-blur-lg">
      <div className="flex h-full w-full max-w-3xl items-center gap-2 px-8">
        <Hand size={24} className="rotate-45" />
        <span>{currentPageTitle}</span>
      </div>
    </header>
  );
}
