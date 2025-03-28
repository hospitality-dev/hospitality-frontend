import { OptionType } from "../types";

export function getSentenceCase(field: string) {
  const text = field?.replaceAll(/[_-]/g, " ")?.replace(/([A-Z])/g, " $1") || "";
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

export function formatForOptions<T extends { id: string; title: string }>(data?: T[]): OptionType[] {
  if (!data) return [];
  return data.map((item) => ({ label: item.title, value: item.id }));
}
