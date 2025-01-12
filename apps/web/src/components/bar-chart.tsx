import * as React from "react";
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { useParams } from "@tanstack/react-router";
import { DateTime } from "luxon";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { getRangeHealthInfoOptions } from "@/lib/queries/user-health-info";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UseFormReturn } from "react-hook-form";
import { insertHealthInfoSchema } from "@repo/shared-schema";
import { cn } from "@/lib/utils";

const chartConfig = {
  weight: {
    label: "몸무게",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface ChartPayload {
  date: string;
  weight: number;
}

interface BarChartComponentProps {
  setDialogOpen: (open: boolean) => void;
  form: UseFormReturn<z.infer<typeof insertHealthInfoSchema>>;
}

export function BarChartComponent({
  setDialogOpen,
  form,
}: BarChartComponentProps) {
  const { yearmonth } = useParams({
    from: "/(user)/_layout/info/$yearmonth",
  });

  // if mobile get week, else get month
  const isMobile = useIsMobile();
  const [isZoomed, setIsZoomed] = React.useState(() =>
    isMobile ? true : false,
  );

  const [startDate, setStartDate] = React.useState<DateTime>(
    DateTime.fromFormat(`${yearmonth}-01`, "yyyy-MM-dd"),
  );

  const healthInfoQuery = useQuery(
    getRangeHealthInfoOptions({
      startDate: startDate.toFormat("yyyy-MM-dd"),
      endDate: isZoomed
        ? startDate.plus({ day: 6 }).toFormat("yyyy-MM-dd")
        : startDate.plus({ month: 1 }).minus({ day: 1 }).toFormat("yyyy-MM-dd"),
    }),
  );

  function handleBarClick(payload: ChartPayload) {
    setDialogOpen(true);
    form.setValue("measuredDate", payload.date);
  }

  if (healthInfoQuery.isLoading) {
    return <div className="h-full w-full">Loading...</div>;
  }

  if (healthInfoQuery.isError) {
    return <div className="h-full w-full">Error</div>;
  }

  if (!healthInfoQuery.data) {
    return <div className="h-full w-full">No data</div>;
  }

  const healthInfoData = Object.entries(healthInfoQuery.data).map(
    ([date, healthInfo]) => ({
      date,
      weight: healthInfo.weightKg,
    }),
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full justify-center gap-2">
        <span className="flex">
          <ChevronLeft
            className="cursor-pointer text-primary/60 transition-colors hover:text-primary"
            onClick={() => {
              if (isZoomed) {
                setStartDate(startDate.minus({ week: 1 }));
              } else {
                setStartDate(startDate.minus({ month: 1 }));
              }
            }}
          />
          <span>
            {!isMobile && startDate.toFormat("yyyy-MM")}
            {isMobile &&
              `${startDate.toFormat("yyyy-MM-dd")} ~ ${startDate.endOf("week").toFormat("yyyy-MM-dd")}`}
          </span>
          <ChevronRight
            className="cursor-pointer text-primary/60 transition-colors hover:text-primary"
            onClick={() => {
              if (isZoomed) {
                setStartDate(startDate.plus({ week: 1 }));
              } else {
                setStartDate(startDate.plus({ month: 1 }));
              }
            }}
          />
        </span>

        <span className="absolute right-2 top-2 flex gap-2">
          <ZoomIn
            className={cn(
              "cursor-pointer text-primary/60 transition-colors hover:text-primary",
              isZoomed && "text-primary",
            )}
            onClick={() => setIsZoomed(true)}
          />
          <ZoomOut
            className={cn(
              "cursor-pointer text-primary/60 transition-colors hover:text-primary",
              !isZoomed && "text-primary",
            )}
            onClick={() => setIsZoomed(false)}
          />
        </span>
      </div>

      <div className="relative h-[200px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={healthInfoData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(8, 10)}
            />

            <ChartTooltip content={<ChartTooltipContent />} />

            <Bar
              dataKey="weight"
              shape={<CustomBar onClick={handleBarClick} />}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

// Custom bar component that includes a full-height clickable background
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomBar = (props: any) => {
  const { x, y, width, height, payload, index, background, onClick } = props;

  return (
    <g>
      {/* Full-height clickable background */}
      <Rectangle
        x={x}
        y={0}
        width={width}
        height={background.height}
        fill="transparent"
        onClick={(e) => {
          e.stopPropagation();
          onClick(payload, index);
        }}
        style={{ cursor: "pointer" }}
      />

      {/* The actual bar */}
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={"hsl(var(--chart-1))"}
        radius={[3, 3, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onClick(payload, index);
        }}
        style={{ cursor: "pointer" }}
      />
    </g>
  );
};
