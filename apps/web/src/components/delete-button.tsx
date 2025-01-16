import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteButtonProps {
  deleteFunction: () => void;
  className?: string;
  dialog?: boolean;
}

export function DeleteButton({
  deleteFunction,
  className,
  dialog = false,
}: DeleteButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!dialog) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteFunction();
        }}
      >
        <X className="text-red-500/60 transition-colors hover:text-red-500" />
      </button>
    );
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        className={cn(className)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <X className="text-red-500/60 transition-colors hover:text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제하시겠어요?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제하면 복구할 수 없어요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFunction();
              }}
            >
              삭제
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
