import { string } from "zod";

import { formatErrorsForHelperText } from "./transform";

export function emailValidation(f: { value: unknown }): string | undefined {
  const res = string().email("Please enter a valid email.").safeParse(f.value);
  if (!res.success) {
    return formatErrorsForHelperText(res.error.errors.map((i) => i.message));
  }
  return undefined;
}
