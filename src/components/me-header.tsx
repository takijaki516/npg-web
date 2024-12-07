interface MeHeaderProps {
  currentPageTitle: string;
}

export function MeHeader({ currentPageTitle }: MeHeaderProps) {
  return (
    <header className="sticky top-0 flex h-16 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="flex h-full w-full max-w-3xl items-center px-8">
        <span>{currentPageTitle}</span>
      </div>
    </header>
  );
}
