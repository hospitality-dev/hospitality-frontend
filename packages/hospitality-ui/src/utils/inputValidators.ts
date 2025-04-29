import { string } from "zod";

import { AvailableDomains } from "../enums";
import { formatErrorsForHelperText } from "./format";

export function emailValidation(f: { value: unknown }): string | undefined {
  const res = string().email("Please enter a valid email.").safeParse(f.value);
  if (!res.success) {
    return formatErrorsForHelperText(res.error.errors.map((i) => i.message));
  }
  return undefined;
}

export function urlValidation(f: { value: unknown }): string | undefined {
  const res = string()
    .regex(/^https:\/\/((\w*\.)(\w*)((\.|\/)*)([\w]+)((\.|\/)*)([\w]+))+$/, "Please enter a valid URL.")
    .refine((str) => AvailableDomains.some((domain) => str.includes(`.${domain}`)), {
      message: "Must include a valid domain extension.",
    })
    .safeParse(f.value);
  if (!res.success) {
    return formatErrorsForHelperText(res.error.errors.map((i) => i.message));
  }
  return undefined;
}
export function whatsAppValidation(f: { value: unknown }): string | undefined {
  const res = string()
    .regex(/^https:\/\/(wa.me)\/\d+$/, "Please enter a valid WhatsApp link.")
    .safeParse(f.value);
  if (!res.success) {
    return formatErrorsForHelperText(res.error.errors.map((i) => i.message));
  }
  return undefined;
}
