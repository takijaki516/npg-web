import { DateTime } from "luxon";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToRangeOfDayInUTCTime({
  localDate,
  timeZone,
}: {
  timeZone: string;
  localDate: string;
}) {
  const startDateTime = DateTime.fromFormat(
    `${localDate} 00:00:00`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timeZone,
    },
  );
  const endDateTime = startDateTime.plus({ days: 1 });

  const startDateTimeSQL = startDateTime.toUTC().toSQL();
  const endDateTimeSQL = endDateTime.toUTC().toSQL();

  return { startTimeOfDay: startDateTimeSQL, endTimeOfDay: endDateTimeSQL };
}

export function convertToUTCTime({
  localDate,
  timeZone,
}: {
  localDate: string;
  timeZone: string;
}) {
  const dateTime = DateTime.fromFormat(`${localDate}`, "yyyy-MM-dd HH:mm:ss", {
    zone: timeZone,
  });

  console.log("🚀 ~ file: utils.ts:40 ~ dateTime:", dateTime);

  const dateTimeSQL = dateTime.toUTC().toSQL();

  return { dateTime: dateTimeSQL };
}
