import dayjs from "dayjs";

export const NairaFormatter = (value: number) => {
  const result = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "NGN",
  }).format(value);

  return result.replace("NGN", "₦");
};

export const DateOnlyFormatter = (value: string) =>
  dayjs(value).format("DD/MM/YYYY");

export const NumberToHourMin = (value: number) => {
  const hr = Math.floor(value / 60);
  const min = (value - 60 * hr).toString().padStart(2, "0");

  return `${hr}h ${min}m`;
};

export const DayAndMonthFormatter = (value: string) =>
  dayjs(value).format("MMMM DD");
