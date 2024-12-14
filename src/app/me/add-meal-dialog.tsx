"use client";

import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface AddMealDialogProps {
  className?: string;
}

export function AddMealDialog({ className }: AddMealDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className={cn(className)}>
          <Plus className="h-9 w-9" />
        </Button>
      </DialogTrigger>

      <DialogContent></DialogContent>
    </Dialog>
  );
}
