import { Icon } from "@iconify/react";
import { UpdaterFn } from "@tanstack/react-form";
import { ChangeEvent } from "react";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { availableIcons, Size, Variant } from "../types/baseTypes";

type Props = {
  label?: string;
  value: string | string[];
  isMultiple?: boolean;
  isDisabled?: boolean;
  variant?: Variant;
  size?: Size;
  icon?: availableIcons;
  onChange: (e: ChangeEvent<HTMLInputElement>) => UpdaterFn<string | string[], void> | undefined;
};

const classes = tv({
  base: "relative flex h-fit cursor-pointer items-center rounded-md border-2",
  variants: {
    variant: {
      primary: "border-gray-900",
      secondary: "border-gray-600",
      info: "border-blue-600",
      success: "border-green-600",
      warning: "border-orange-600",
      error: "border-red-800",
    },
    // size: { xs: "h-4 text-xs", sm: "h-5 text-sm", md: "h-6", lg: "h-7 text-lg", xl: "h-8 text-xl" },
    isDisabled: { true: "cursor-not-allowed" },
  },
});

export function Select({ label, variant = "info", size = "md", isMultiple = false, isDisabled = false, onChange }: Props) {
  return (
    <div className="flex flex-col">
      {label ? <label>{label}</label> : null}
      <div className={classes({ variant, size, isDisabled, isMultiple })}>
        <select className="flex-1 appearance-none p-2 outline-0" disabled={isDisabled} onChange={onChange}>
          <option value="aaa">aaa</option>
          <option value="bbb">bbb</option>
          <option value="ccc">ccc</option>
        </select>
        <span className="absolute right-1">
          <Icon icon={Icons["arrow-down"]} />
        </span>
      </div>
    </div>
  );
}
