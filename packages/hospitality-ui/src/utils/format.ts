import { ValidationError } from "@tanstack/react-form";
import { format, parse, parseISO } from "date-fns";
import camelCase from "lodash.camelcase";
import { ZodIssue } from "zod";

import { ContactTypeIcons } from "../enums";
import { AddressesType, ContactTypes, OptionType, ProductsType, UsersType } from "../types";
import { CountriesType } from "../types/worldTypes";
import { getSentenceCase } from "./transform";

export function formatForOptions<T extends { id: string; title: string; isDisabled?: boolean; isHidden?: boolean }>(
  data?: T[],
  isSentenceCase?: boolean
): OptionType[] {
  if (!data) return [];
  return data.map((item) => ({
    isDisabled: item.isDisabled,
    isHidden: item.isHidden,
    id: item.id,
    label: isSentenceCase === true || isSentenceCase === undefined ? getSentenceCase(item.title) : item.title,
    value: item.id,
  }));
}
export function formatAddressesForOptions(data: AddressesType[]): OptionType[] {
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

export function formatPhoneForOptions(data?: CountriesType[], isSentenceCase?: boolean): OptionType[] {
  if (!data) return [];
  return data.map((item) => ({
    id: item.id,
    label: `${(isSentenceCase === true || isSentenceCase === undefined ? getSentenceCase(item.title) : item.title).trim()} (+${item.phonecode})`,
    value: item.iso3,
    image: `/flags/${item.iso3}.svg`,
    additionalData: { phonecode: item.phonecode, selectedLabel: `+${item.phonecode}` },
  }));
}

export function formatErrorsForHelperText(errors: ValidationError[] | ZodIssue[]) {
  if (errors.length === 1) return errors[0]?.toString() || "";

  return Array.from(new Set(errors.map(String))).join(" | ");
}

export function formatDisplayItem(item: OptionType): string {
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

export function camelCaseContactType(type: ContactTypes): keyof ContactTypeIcons {
  return camelCase(type) as keyof ContactTypeIcons;
}

export function formatStringToISO(value: string) {
  const date = parse(value, "dd.MM.yyyy", new Date());
  return date.toISOString();
}

export function formatISOToString(value: string) {
  return format(parseISO(value), "dd. MMMM yyyy.");
}

// days are a float
export function getDayCountString(days: number) {
  if (days > -1 && days <= 0) return "Today";
  if (days > 0 && days <= 1) return "Tomorrow";
  return `${Math.ceil(days)} days`;
}

const rsdCurrencyFormatter = new Intl.NumberFormat("rs-RS", { style: "currency", currency: "RSD", maximumFractionDigits: 2 });
// const eurCurrencyFormatter = new Intl.NumberFormat("rs-RS", { style: "currency", currency: "EUR" });
export function formatCurrency(amount: number): string {
  return rsdCurrencyFormatter.format(amount);
}

export function formatProductUnits({
  weight,
  weightUnit,
  volume,
  volumeUnit,
}: Pick<ProductsType, "weight" | "weightUnit" | "volume" | "volumeUnit">) {
  let final = "";
  if (weight) {
    final += weight;
    final += weightUnit;
    if (volume) {
      final += " | ";
    }
  }
  if (volume) {
    final += volume;
    final += volumeUnit;
  }

  if (final.length > 0) return `(${final})`;
  return final;
}
