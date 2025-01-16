import * as React from "react";
import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  AlarmClock,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { useParams } from "@tanstack/react-router";
import { DateTime } from "luxon";
import { useQuery } from "@tanstack/react-query";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { getRangeHealthInfoOptions } from "@/lib/queries/user-health-info";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChartSkeleton } from "../skeletons/barchart-skeleton";

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
  setHealthInfoFormDate: (date: string) => void;
}

export function BarChartComponent({
  setDialogOpen,
  setHealthInfoFormDate,
}: BarChartComponentProps) {
  const currentDate = DateTime.now().toFormat("yyyy-MM-dd");

  const { yearmonth } = useParams({
    from: "/(user)/_layout/info/$yearmonth",
  });
  const isMobile = useIsMobile();
  const [isZoomed, setIsZoomed] = React.useState(false);
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
    setHealthInfoFormDate(payload.date);
    setDialogOpen(true);
  }

  if (healthInfoQuery.isLoading) {
    return <BarChartSkeleton />;
  }

  if (healthInfoQuery.isError || !healthInfoQuery.data) {
    return (
      <div className="flex h-full min-h-[200px] w-full flex-1 items-center justify-center bg-muted/20">
        <div
          className="flex cursor-pointer flex-col gap-1 rounded-md border border-border p-2 text-muted-foreground/60 transition-colors hover:text-primary"
          onClick={() => {
            healthInfoQuery.refetch();
          }}
        >
          <span>재시도</span>
          <RotateCw className="size-10 animate-spin" />
        </div>
      </div>
    );
  }

  const healthInfoData = Object.entries(healthInfoQuery.data).map(
    ([date, healthInfo]) => ({
      date,
      weight: healthInfo.weightKg,
    }),
  );

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center gap-2">
      <div className="flex w-full justify-center">
        <span className="flex items-center">
          <ChevronLeft
            size={isMobile ? 16 : 24}
            className="cursor-pointer text-primary/60 transition-colors hover:text-primary"
            onClick={() => {
              if (isZoomed) {
                setStartDate(startDate.minus({ week: 1 }));
              } else {
                setStartDate(startDate.startOf("month").minus({ month: 1 }));
              }
            }}
          />
          <span className="flex items-center sm:text-xl">
            {isZoomed &&
              !isMobile &&
              `${startDate.toFormat("yyyy-MM-dd")}~${startDate.plus({ day: 6 }).toFormat("yyyy-MM-dd")}`}
            {isZoomed &&
              isMobile &&
              `${startDate.toFormat("MM-dd")}~${startDate.plus({ day: 6 }).toFormat("MM-dd")}`}
            {!isZoomed && startDate.toFormat("yyyy-MM")}
          </span>
          <ChevronRight
            size={isMobile ? 16 : 24}
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

        <span
          className={cn("absolute right-2 top-2 flex items-center xs:gap-2")}
        >
          <AlarmClock
            className={cn(
              "cursor-pointer text-primary/60 transition-colors hover:text-primary",
              "size-5 xs:size-6",
            )}
            onClick={() => {
              if (isZoomed) {
                setStartDate(DateTime.now().startOf("week"));
              } else {
                setStartDate(DateTime.now().startOf("month"));
              }
            }}
          />
          <ZoomIn
            className={cn(
              "cursor-pointer text-primary/60 transition-colors hover:text-primary",
              isZoomed && "text-primary",
              "size-5 xs:size-6",
            )}
            onClick={() => {
              setIsZoomed(true);
            }}
          />
          <ZoomOut
            className={cn(
              "cursor-pointer text-primary/60 transition-colors hover:text-primary",
              !isZoomed && "text-primary",
              "size-5 xs:size-6",
            )}
            onClick={() => {
              setIsZoomed(false);
              setStartDate(startDate.startOf("month"));
            }}
          />
        </span>
      </div>

      <div className="relative max-h-[200px] w-full flex-1">
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
              shape={
                <CustomBar onClick={handleBarClick} currentDate={currentDate} />
              }
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
  const {
    x,
    y,
    width,
    height,
    payload,
    index,
    background,
    onClick,
    currentDate,
  } = props;

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
        style={{
          cursor: "pointer",
          fill:
            payload.date === currentDate
              ? "hsl(var(--chart-2))"
              : "hsl(var(--chart-1))",
        }}
      />
    </g>
  );
};
