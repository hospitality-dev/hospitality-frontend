import { UpdaterFn } from "@tanstack/react-form";
import { ChangeEvent } from "react";
import { tv } from "tailwind-variants";

import { Size, Variant } from "../types/baseTypes";

type Props = {
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => UpdaterFn<boolean, void>;
  variant?: Variant;
  size?: Size;
};

const classes = tv({
  base: "cursor-pointer appearance-none rounded-md border-2",
  variants: {
    variant: {
      primary: "border-gray-900",
      secondary: "border-gray-600",
      info: "border-blue-600",
      success: "border-green-600",
      warning: "border-orange-600",
      error: "border-red-800",
    },
    size: { xs: "h-6 w-6 text-xs", sm: "h-7 w-7 text-sm", md: "h-8 w-8", lg: "h-9 w-9 text-lg", xl: "h-10 w-10 text-xl" },
    isDisabled: { true: "cursor-not-allowed" },
  },
});

export function Checkbox({ variant = "success", size = "md", isChecked = false, isDisabled = false, onChange }: Props) {
  return (
    <input
      checked={isChecked}
      className={classes({ variant, size, isDisabled })}
      disabled={isDisabled}
      onChange={onChange}
      type="checkbox"></input>
  );
}
