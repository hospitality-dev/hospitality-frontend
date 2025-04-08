import { string } from "zod";

import { formatErrorsForHelperText } from "./transform";

export function emailValidation(f: { value: unknown }): string | undefined {
  const res = string().email("Please enter a valid email.").safeParse(f.value);
  if (!res.success) {
    return formatErrorsForHelperText(res.error.errors.map((i) => i.message));
  }
  return undefined;
}

export function urlValidation(f: { value: unknown }): string | undefined {
  const res = string()
    .regex(/^https:\/\/([\w-]+\.)+[\w-]+$/, "Please enter a valid URL.")
    .regex(
      /\.(com|net|app|org|co|io|xyz|co.uk|co.ca|co.us|rs|срб|)$/,
      "Only .com .net .app .org .co .io .xyz .co.uk .co.ca .co.us .rs .срб are allowed as top level domains."
    )
    .safeParse(f.value);
  if (!res.success) {
    return formatErrorsForHelperText(res.error.errors.map((i) => i.message));
  }
  return undefined;
}
