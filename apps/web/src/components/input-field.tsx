import { UseFormRegister, Path } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

interface InputFieldProps<T extends z.ZodType> {
  label: string;
  unit?: string;
  isOptional?: boolean;
  register: UseFormRegister<z.infer<T>>;
  name: Path<z.infer<T>>;
  isNumber?: boolean;
  className?: string;
}

export function InputField<T extends z.ZodType>({
  label,
  unit,
  isOptional,
  register,
  name,
  isNumber,
  className,
}: InputFieldProps<T>) {
  return (
    <div className={cn("inline-flex min-h-10 items-start gap-2", className)}>
      <div className="flex flex-col">
        <label className="w-[8ch]">{label}</label>
        {isOptional && (
          <span className="text-xs text-muted-foreground/50">선택사항</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <input
          className={cn(
            "w-[8ch] border text-end",
            "rounded-md bg-transparent px-1 pr-[6px]",
            "focus:outline-none",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          )}
          type={isNumber ? "number" : "text"}
          {...register(name, {
            setValueAs: (value) => (isNumber ? Number(value) : value),
          })}
        />

        {unit && <span>{unit}</span>}
      </div>
    </div>
  );
}
