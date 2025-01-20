import { useInstallPromptStore } from "@/lib/zustand/install-event-store";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function PWAInstallButton() {
  const { event, setEvent } = useInstallPromptStore();

  async function handleInstallClick() {
    if (!event) return;
    await event.prompt();
    setEvent(null);
  }

  if (!event) return null;

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Button className="font-semibold" onClick={handleInstallClick}>
          어플 설치
        </Button>
      </TooltipTrigger>

      <TooltipContent
        sideOffset={6}
        align="start"
        side="bottom"
        className="bg-muted text-muted-foreground"
      >
        PWA어플을 설치할 수 있어요.
      </TooltipContent>
    </Tooltip>
  );
}
