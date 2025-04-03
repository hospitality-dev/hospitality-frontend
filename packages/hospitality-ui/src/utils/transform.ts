import { ValidationError } from "@tanstack/react-form";

import { OptionType, UsersType } from "../types";

export function getSentenceCase(field: string) {
  const text = field?.replaceAll(/[_-]/g, " ")?.replace(/([A-Z])/g, " $1") || "";
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

export function formatForOptions<T extends { id: string; title: string }>(data?: T[], isSentenceCase?: boolean): OptionType[] {
  if (!data) return [];
  return data.map((item) => ({
    label: isSentenceCase === true || isSentenceCase === undefined ? getSentenceCase(item.title) : item.title,
    value: item.id,
  }));
}

export function formatErrorsForHelperText(errors: ValidationError[]) {
  return errors.join("\n ");
}

export function getUserInfo(user: UsersType) {
  return {
    id: user.id,
    title: `${user.firstName} ${user.lastName}`,
  };
}
