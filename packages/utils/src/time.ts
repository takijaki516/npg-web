import { DateTime } from "luxon";

export function convertToRangeOfDayUTCTime({
  localDate,
  timezone,
}: {
  localDate: string;
  timezone: string;
}) {
  const startDateTime = DateTime.fromFormat(
    `${localDate} 00:00:00`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timezone,
    }
  );
  const tomorrowStartDateTime = startDateTime.plus({ days: 1 });

  const utcStartDateTime = startDateTime
    .toUTC()
    .toFormat("yyyy-MM-dd HH:mm:ss");
  const utcTomorrowStartDateTime = tomorrowStartDateTime
    .toUTC()
    .toFormat("yyyy-MM-dd HH:mm:ss");

  return {
    utcStartDateTime,
    utcTomorrowStartDateTime,
  };
}

export function convertToRangeOfSpecificDayUTCTime({
  startLocalDate,
  endLocalDate,
  timezone,
}: {
  startLocalDate: string;
  endLocalDate: string;
  timezone: string;
}) {
  const startDateTime = DateTime.fromFormat(
    `${startLocalDate} 00:00:00`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timezone,
    }
  );
  const endDateTime = DateTime.fromFormat(
    `${endLocalDate} 00:00:00`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timezone,
    }
  );

  const utcStartDateTime = startDateTime
    .toUTC()
    .toFormat("yyyy-MM-dd HH:mm:ss");
  const utcEndDateTime = endDateTime.toUTC().toFormat("yyyy-MM-dd HH:mm:ss");

  return { utcStartDateTime, utcEndDateTime };
}

export function convertToUTCTime({
  localDateTime,
  timezone,
}: {
  localDateTime: string;
  timezone: string;
}) {
  const dateTime = DateTime.fromFormat(
    `${localDateTime}`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timezone,
    }
  );

  const utcDateTime = dateTime.toUTC().toFormat("yyyy-MM-dd HH:mm:ss");

  return { utcDateTime };
}

/**
 * @param localYearMonth - yyyy-mm
 */
export function convertToRangeOfMonthUTCTime({
  localYearMonth,
  timezone,
}: {
  localYearMonth: string;
  timezone: string;
}) {
  const startDateTime = DateTime.fromFormat(
    `${localYearMonth}-01 00:00:00`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timezone,
    }
  );
  const nextMonthStartDateTime = startDateTime.plus({ months: 1 });

  const utcStartDateTime = startDateTime
    .toUTC()
    .toFormat("yyyy-MM-dd HH:mm:ss");
  const utcNextMonthStartDateTime = nextMonthStartDateTime
    .toUTC()
    .toFormat("yyyy-MM-dd HH:mm:ss");

  return {
    utcStartDateTime,
    utcNextMonthStartDateTime,
  };
}

export function convertToTimezoneDateTime({
  utcDateTime,
  timezone,
}: {
  utcDateTime: string;
  timezone: string;
}) {
  const dateTime = DateTime.fromFormat(
    `${utcDateTime}`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: "utc",
    }
  );

  const timezoneDateTime = dateTime
    .setZone(timezone)
    .toFormat("yyyy-MM-dd HH:mm:ss");

  return { timezoneDateTime };
}

export function getDatesKeyObject<T>(
  startDate: string,
  endDate: string,
  defaultValue: T
): Record<string, T> {
  const dates: Record<string, T> = {};
  let current = DateTime.fromFormat(startDate, "yyyy-MM-dd");
  const end = DateTime.fromFormat(endDate, "yyyy-MM-dd");

  while (current <= end) {
    const dateKey = current.toFormat("yyyy-MM-dd");
    dates[dateKey] = defaultValue;
    current = current.plus({ days: 1 });
  }

  return dates;
}
