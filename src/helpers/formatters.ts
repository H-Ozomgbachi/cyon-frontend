import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const NairaFormatter = (value: number) => {
  const result = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "NGN",
  }).format(value);

  return result.replace("NGN", "₦");
};

export const DateOnlyFormatter = (value: string) =>
  dayjs.utc(value).local().format("DD/MM/YYYY");

export const NumberToHourMin = (value: number) => {
  const hr = Math.floor(value / 60);
  const min = (value - 60 * hr).toString().padStart(2, "0");

  return `${hr}h ${min}m`;
};

export const DayAndMonthFormatter = (value: string) =>
  dayjs.utc(value).local().format("MMMM DD");

export const CompleteDateFormatter = (value: string) =>
  dayjs.utc(value).local().format("MMMM DD, YYYY");

export const IsDaySame = (value1: string, value2: string) =>
  dayjs.utc(value1).local().isSame(dayjs.utc(value2).local(), "day");

export const dateFromNow = (value: string) => dayjs.utc(value).local().fromNow();

export const DateAndTimeFormat = (value: string) =>
  dayjs.utc(value).local().format("DD/MM/YY hh:mm:ss A");

// Convert UTC date string to local Date object for display
export const UtcToLocalDate = (value: string) =>
  dayjs.utc(value).local().toDate();

// Format UTC date to local time with full date and time
export const FullDateTimeFormat = (value: string) =>
  dayjs.utc(value).local().format("MMMM DD, YYYY [at] h:mm A");
