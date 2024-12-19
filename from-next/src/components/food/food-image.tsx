import { Soup } from "lucide-react";
import { cn } from "../../lib/utils";

interface FoodImageProps {
  className?: string;
  src?: string;
}

export function FoodImage({ className, src }: FoodImageProps) {
  return (
    <div
      className={cn(
        "flex aspect-square w-full items-center justify-center rounded-md border",
        className,
      )}
    >
      {!src || src === "" ? (
        <Soup size={48} className="text-muted-foreground" />
      ) : (
        <img src={src} alt="food" className="object-cover" />
      )}
    </div>
  );
}
