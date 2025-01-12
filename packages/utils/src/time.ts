import { DateTime } from "luxon";

/**
 * @returns
 * startTimeOfDay: inclusive
 * endTimeOfDay: exclusive
 */
export function convertToRangeOfDayUTCTime({
  localDateTime,
  timeZone,
}: {
  localDateTime: string;
  timeZone: string;
}) {
  const justDate = localDateTime.split(" ")[0];

  const startDateTime = DateTime.fromFormat(
    `${justDate} 00:00:00`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timeZone,
    }
  );
  const endDateTime = startDateTime.plus({ days: 1 });

  const startDateTimeSQL = startDateTime.toUTC().toSQL();
  const endDateTimeSQL = endDateTime.toUTC().toSQL();

  return {
    startUTCTimeOfDay: startDateTimeSQL,
    endUTCTimeOfDay: endDateTimeSQL,
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
    }
  );

  const endDateTime = DateTime.fromFormat(
    `${endLocalDate} 00:00:00`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timeZone,
    }
  );

  const startDateTimeSQL = startDateTime.toUTC().toSQL();
  const endDateTimeSQL = endDateTime.toUTC().toSQL();

  return { startDateTime: startDateTimeSQL, endDateTime: endDateTimeSQL };
}

export function convertToUTCTime({
  localDateTime,
  timeZone,
}: {
  localDateTime: string;
  timeZone: string;
}) {
  const dateTime = DateTime.fromFormat(
    `${localDateTime}`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timeZone,
    }
  );

  const dateTimeSQL = dateTime.toUTC().toSQL();

  return { utcDateTime: dateTimeSQL };
}

export function convertToRangeOfMonthUTCTime({
  localYearMonth,
  timeZone,
}: {
  localYearMonth: string;
  timeZone: string;
}) {
  const startDateTime = DateTime.fromFormat(
    `${localYearMonth}-01 00:00:00`,
    "yyyy-MM-dd HH:mm:ss",
    {
      zone: timeZone,
    }
  );
  const endDateTime = startDateTime.plus({ months: 1 });

  return {
    startDateTime: startDateTime.toUTC().toSQL(),
    endDateTime: endDateTime.toUTC().toSQL(),
  };
}

export function convertToTimezoneDate({
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

  return dateTime.setZone(timezone).toFormat("yyyy-MM-dd");
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
