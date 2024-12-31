import { DateTime } from "luxon";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @returns
 * startTimeOfDay: inclusive
 * endTimeOfDay: exclusive
 */
export function convertToRangeOfDayUTCTime({
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

  return {
    utcStartTimeOfDay: startDateTimeSQL,
    utcEndTimeOfDay: endDateTimeSQL,
  };
}

/**
 * @param startLocalDate - inclusive
 * @param endLocalDate - exclusive
 */
export function convertToRangeOfSpecificDayUTCTime({
  endLocalDate,
  startLocalDate,
  timeZone,
}: {
  startLocalDate: string;
  endLocalDate: string;
  timeZone: string;
}) {
  const startDateTime = DateTime.fromFormat(
    `${startLocalDate} 00:00:00`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timeZone,
    },
  );

  const endDateTime = DateTime.fromFormat(
    `${endLocalDate} 00:00:00`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timeZone,
    },
  );

  const startDateTimeSQL = startDateTime.toUTC().toSQL();
  const endDateTimeSQL = endDateTime.toUTC().toSQL();

  return { startDateTime: startDateTimeSQL, endDateTime: endDateTimeSQL };
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

  const dateTimeSQL = dateTime.toUTC().toSQL();

  return { dateTime: dateTimeSQL };
}

export function utcToLocalTime({
  utcTime,
  timezone,
}: {
  utcTime: string;
  timezone: string;
}) {
  const dateTime = DateTime.fromSQL(utcTime, { zone: "utc" }).setZone(timezone);

  return dateTime.toFormat("yyyy-MM-dd HH:mm:ss");
}
