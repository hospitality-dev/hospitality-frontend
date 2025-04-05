import { ValidationError } from "@tanstack/react-form";

import { AddressesType, OptionType } from "../types";

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
export function formatAddressesForOptions(data: AddressesType[]): OptionType[] {
  if (!data) return [];
  return data.map((item) => ({
    label: getSentenceCase(`${item.address.road} ${item.address.houseNumber}`),
    description: `${item.address.suburb} | ${item.address.city} | ${item.address.postcode}`,
    value: item.placeId.toString(),
  }));
}

export function formatErrorsForHelperText(errors: ValidationError[]) {
  return errors.join("\n ");
}
