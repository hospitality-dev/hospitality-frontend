import { ValidationError } from "@tanstack/react-form";
import camelCase from "lodash.camelcase";
import { ZodIssue } from "zod";

import { Icons } from "../enums";
import { AddressesType, ContactType, ContactTypes, OptionType, UsersType } from "../types";
import { CountriesType } from "../types/worldTypes";
import { getSentenceCase } from "./transform";

export function formatForOptions<T extends { id: string; title: string }>(
  data?: T[],
  isSentenceCase?: boolean
): OptionType<null>[] {
  if (!data) return [];
  return data.map((item) => ({
    id: item.id,
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
      value: formatDisplayItem({ label, description, value: item.placeId.toString(), id: item.placeId.toString() }),
      additionalData: {
        latitude: item.lat,
        longitude: item.lng,
        boundingBox: item.boundingbox,
        placeId: item.placeId,
      },
    };
  });
}

export function formatPhoneForOptions(data?: CountriesType[], isSentenceCase?: boolean): OptionType<{ phonecode: string }>[] {
  if (!data) return [];
  return data.map((item) => ({
    id: item.id,
    label: isSentenceCase === true || isSentenceCase === undefined ? getSentenceCase(item.title) : item.title,
    value: item.iso3,
    image: `/flags/${item.iso3}.svg`,
    additionalData: { phonecode: item.phonecode },
  }));
}

export function formatErrorsForHelperText(errors: ValidationError[] | ZodIssue[]) {
  if (errors.length === 1) return errors[0]?.toString() || "";

  return Array.from(new Set(errors.map(String))).join(" | ");
}

export function formatDisplayItem<OT>(item: OptionType<OT>): string {
  return `${item.label}${item.description ? ` | ${item.description}` : ""}`.trim();
}

export function getUserInfo(user?: Pick<UsersType, "id" | "firstName" | "lastName" | "imageId">) {
  if (!user)
    return {
      id: "",
      imageId: null,
      title: "",
    };
  return {
    id: user.id,
    imageId: user.imageId,
    title: `${user.firstName} ${user.lastName}`,
  };
}

export function camelCaseContactType(type: ContactTypes) {
  return camelCase(type) as keyof typeof Icons;
}
