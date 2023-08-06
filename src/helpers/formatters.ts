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
  dayjs.utc(value).format("DD/MM/YYYY");

export const NumberToHourMin = (value: number) => {
  const hr = Math.floor(value / 60);
  const min = (value - 60 * hr).toString().padStart(2, "0");

  return `${hr}h ${min}m`;
};

export const DayAndMonthFormatter = (value: string) =>
  dayjs.utc(value).format("MMMM DD");

export const CompleteDateFormatter = (value: string) =>
  dayjs.utc(value).format("MMMM DD, YYYY");

export const IsDaySame = (value1: string, value2: string) =>
  dayjs.utc(value1).isSame(value2, "day");

export const dateFromNow = (value: string) => dayjs.utc(value).fromNow();

export const DateAndTimeFormat = (value: string) =>
  dayjs.utc(value).add(1, "hour").format("DD/MM/YY hh:mm:ss A");
