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
      className={cn("flex flex-1 flex-col border border-border", className)}
    >
      <TabsList className="flex items-center">
        <TabsTrigger value="exercises">운동</TabsTrigger>
        <TabsTrigger value="meals">식단</TabsTrigger>
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
