import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MobileBentoGridProps {
  className?: string;
  exercises: React.ReactNode;
  meals: React.ReactNode;
}

export function MobileBentoGrid({
  className,
  exercises,
  meals,
}: MobileBentoGridProps) {
  return (
    <Tabs
      defaultValue="exercises"
      className={cn("flex h-full flex-col border border-border", className)}
    >
      <TabsList className="flex items-center">
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="meals">Meals</TabsTrigger>
      </TabsList>

      <TabsContent value="exercises" className="flex-1 overflow-y-auto">
        {exercises}
      </TabsContent>

      <TabsContent value="meals" className="flex-1 overflow-y-auto">
        {meals}
      </TabsContent>
    </Tabs>
  );
}
