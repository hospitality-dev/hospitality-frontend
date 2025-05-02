import { addDays, differenceInMilliseconds, format, isBefore, parseISO } from "date-fns";

const msInDay = 1000 * 60 * 60 * 24;
export function checkIsBefore({ date, days }: { date?: string | null; days: number }): boolean | null {
  if (!date) return null;

  const formatted = parseISO(date);
  const now = new Date();
  const daysFromNow = addDays(now, days);
  return isBefore(formatted, daysFromNow);
}

export function getDayDifferenceFromNow(date?: string | null): number | null {
  if (!date) return null;
  const now = new Date();
  const input = parseISO(date);
  return differenceInMilliseconds(input, now) / msInDay;
}

export function getDayDifferenceFromAhead(date?: string | null): number | null {
  if (!date) return null;
  const now = new Date();
  const input = parseISO(date);
  return differenceInMilliseconds(input, now) / msInDay;
}

export function formatFromUTC(date: string, dateTimeFormat?: string) {
  const parsedDate = parseISO(date);
  return format(parsedDate, dateTimeFormat || "dd.MM.yyyy.");
}

export function formatDateStringToFormat(value: string, returnFormat: string = "dd.MM.yyyy") {
  return format(new Date(value), returnFormat);
}
