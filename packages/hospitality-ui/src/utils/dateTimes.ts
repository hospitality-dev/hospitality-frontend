import { addDays, differenceInDays, isBefore, parseISO } from "date-fns";

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
  return differenceInDays(input, now);
}
