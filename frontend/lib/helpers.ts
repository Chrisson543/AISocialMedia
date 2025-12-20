import { format } from "date-fns";

export function formatDate(date: string | number | Date) {
  const ONE_SECOND = 1000;
  const ONE_MINUTE = 60 * ONE_SECOND;
  const ONE_HOUR   = 60 * ONE_MINUTE;
  const ONE_DAY    = 24 * ONE_HOUR;

  const currentDate = Date.now();
  const postDate = new Date(date).getTime();
  const timeGap = currentDate - postDate;

  if (timeGap >= ONE_DAY) {
    return format(postDate, "MMM dd");
  } else if (timeGap >= ONE_HOUR) {
    return Math.floor(timeGap / ONE_HOUR) + "h";
  } else if (timeGap >= ONE_MINUTE) {
    return Math.floor(timeGap / ONE_MINUTE) + "m";
  } else {
    return Math.floor(timeGap / ONE_SECOND) + "s";
  }
}
