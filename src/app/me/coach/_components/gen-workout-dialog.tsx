"use client";

import * as React from "react";
import { useChat } from "ai/react";
import { ko } from "date-fns/locale";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConfirmWorkoutDialog } from "./confirm-workout-dialog";

export function GenWorkoutDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

  const [selectedLocalDates, setLocalSelectedDates] = React.useState<
    Date[] | undefined
  >(undefined);

  const genExercise = useChat({
    api: "/api/coach/gen-plan",
  });

  console.log(
    "🚀 ~ file: gen-workout.tsx:19 ~ GenWorkoutDialog ~ selectedLocalDates:",
    selectedLocalDates,
  );

  function handleGenExercise() {
    genExercise.append({
      role: "user",
      content: "운동 루틴 생성",
    });
  }

  React.useEffect(() => {}, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTrigger asChild>
        <button className="rounded-md px-2 py-1 hover:bg-muted">
          <span>운동 루틴 생성</span>
        </button>
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

        <div className="flex w-full justify-center">
          <Calendar
            locale={ko}
            className="w-fit"
            mode="multiple"
            selected={selectedLocalDates}
            onSelect={setLocalSelectedDates}
          />
        </div>

        <Button onClick={handleGenExercise}>TEST</Button>

        <div className="flex flex-row items-stretch justify-between gap-1">
          <Input placeholder="간단한 의견을 남겨주세요" />

          <ConfirmWorkoutDialog
            open={confirmDialogOpen}
            onOpenChange={setConfirmDialogOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
