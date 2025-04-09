import { ValidationError } from "@tanstack/react-form";
import { ZodIssue } from "zod";

import { AddressesType, ContactType, OptionType } from "../types";

export function getSentenceCase(field: string) {
  const text = field?.replaceAll(/[_-]/g, " ")?.replace(/([A-Z])/g, " $1") || "";
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

export function formatForOptions<T extends { id: string; title: string }>(
  data?: T[],
  isSentenceCase?: boolean
): OptionType<null>[] {
  if (!data) return [];
  return data.map((item) => ({
    label: isSentenceCase === true || isSentenceCase === undefined ? getSentenceCase(item.title) : item.title,
    value: item.id,
  }));
}
export function formatAddressesForOptions(
  data: AddressesType[]
): OptionType<Pick<ContactType, "latitude" | "longitude" | "boundingBox" | "placeId">>[] {
  if (!data) return [];
  return data.map((item) => {
    const label = `${item.address.road} ${item.address.houseNumber}`.trim();
    const description = [item.address.suburb, item.address.city, item.address.postcode].filter(Boolean).join(" | ");
    return {
      id: crypto.randomUUID(),
      label: `${item.address.road} ${item.address.houseNumber}`.trim(),
      description: [item.address.suburb, item.address.city, item.address.postcode].filter(Boolean).join(" | "),
      value: formatDisplayItem({ label, description, value: item.placeId.toString() }),
      additionalData: {
        latitude: item.lat,
        longitude: item.lng,
        boundingBox: item.boundingbox,
        placeId: item.placeId,
      },
    };
  });
}

export function formatErrorsForHelperText(errors: ValidationError[] | ZodIssue[]) {
  return errors.join("\n ");
}

export function formatDisplayItem<OT>(item: OptionType<OT>): string {
  return `${item.label}${item.description ? ` | ${item.description}` : ""}`.trim();
}
