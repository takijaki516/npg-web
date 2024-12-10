"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConfirmWorkoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfirmWorkoutDialog({
  open,
  onOpenChange,
}: ConfirmWorkoutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>생성</Button>
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>운동 루틴 생성</DialogTitle>
          <DialogDescription>
            운동할 날짜를 선택해주세요. 생성하고 나중에 세부적으로 조정가능해요.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
