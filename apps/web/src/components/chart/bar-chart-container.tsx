import * as React from "react";
import { DateTime } from "luxon";

import { BarChartComponent } from "./bar-chart";
import { AddHealthInfoDialogContainer } from "@/components/add-health-info-dialog";

export function BarChartContainer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [healthInfoFormDate, setHealthInfoFormDate] = React.useState(() =>
    DateTime.now().toFormat("yyyy-MM-dd"),
  );

  return (
    <>
      <BarChartComponent
        setDialogOpen={setIsOpen}
        setHealthInfoFormDate={setHealthInfoFormDate}
      />
      <AddHealthInfoDialogContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        healthInfoDate={healthInfoFormDate}
      />
    </>
  );
}
