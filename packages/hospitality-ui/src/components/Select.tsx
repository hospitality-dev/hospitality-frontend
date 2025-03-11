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
  slots: {
    base: "flex h-fit w-20 flex-1 cursor-pointer appearance-none items-center rounded-md border-2 px-1 outline-0",
    container: "flex h-fit w-full flex-col",
    labelClasses: "font-small text-gray-900",
    icon: "absolute right-1",
    selectBox: "relative flex w-fit items-center",
  },

  variants: {
    variant: {
      primary: "border-gray-900",
      secondary: "border-gray-600",
      info: "border-blue-600",
      success: "border-green-600",
      warning: "border-orange-600",
      error: "border-red-800",
    },
    size: {
      xs: { labelClasses: "text-xs", base: "h-6" },
      sm: { labelClasses: "text-sm", base: "h-7" },
      md: { base: "h-8" },
      lg: { labelClasses: "text-lg", base: "h-9" },
      xl: { labelClasses: "text-xl", base: "h-10" },
    },
    isDisabled: { true: "cursor-not-allowed" },
  },
});

export function Select({
  label,
  variant = "info",
  size = "md",
  isMultiple = false,
  isDisabled = false,
  onChange,
  value,
}: Props) {
  const { base, container, labelClasses, icon, selectBox } = classes({ variant, size, isDisabled });
  return (
    <div className={container()}>
      <p className={labelClasses()}>{label ? <label>{label}</label> : null}</p>
      <div className={selectBox()}>
        <select className={base()} disabled={isDisabled} isMultiple={isMultiple} onChange={onChange} value={value}>
          <option value="aaa">aaa</option>
          <option value="bbb">bbb</option>
          <option value="ccc">ccc</option>
        </select>
        <span className={icon()}>
          <Icon icon={Icons["arrow-down"]} />
        </span>
      </div>
    </div>
  );
}
