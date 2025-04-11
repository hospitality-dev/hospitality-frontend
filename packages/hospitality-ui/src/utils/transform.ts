import { ValidationError } from "@tanstack/react-form";
import { ZodIssue } from "zod";

import { AddressesType, ContactGroupType, ContactType, OptionType } from "../types";

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

export function groupBy<T, K extends keyof T>(data: T[], key: K) {
  return data.reduce<Record<string, T[]>>(
    (prev, curr) => {
      const groupKey = String(curr[key]);
      if (!prev[groupKey]) {
        prev[groupKey] = [];
      }
      prev[groupKey].push(curr);
      return prev;
    },
    {} as Record<string, T[]>
  );
}

export function groupByContacts(data: ContactType[]) {
  return data.reduce<Record<ContactGroupType, ContactType[]>>(
    (prev, curr) => {
      let key: ContactGroupType = "other";
      if (curr.contactType.includes("address")) {
        key = "address";
      } else if (curr.contactType.includes("phone")) {
        key = "phone";
      } else if (curr.contactType.includes("email")) {
        key = "email";
      } else if (curr.contactType.includes("website")) {
        key = "website";
      }
      if (!prev?.[key]) {
        prev[key] = [curr];
      } else {
        prev[key].push(curr);
      }
      return prev;
    },
    {} as Record<ContactGroupType, ContactType[]>
  );
}
