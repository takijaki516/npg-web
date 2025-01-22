import { Info } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LLMDescriptionAlertDialogProps {
  llmDescription: string;
}

export function LLMDescriptionAlertDialog({
  llmDescription,
}: LLMDescriptionAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md p-1 transition-colors hover:bg-muted sm:hidden">
        <Info size={20} />
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col rounded-md">
        <AlertDialogTitle>AI 추천 칼로리양</AlertDialogTitle>

        <AlertDialogDescription className="max-h-52 overflow-y-auto rounded-md border border-dashed p-2 text-base text-primary">
          {llmDescription}
        </AlertDialogDescription>

        <AlertDialogFooter className="w-fit self-end">
          <AlertDialogCancel>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
