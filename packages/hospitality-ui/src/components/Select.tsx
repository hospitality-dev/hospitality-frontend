import { Icon } from "@iconify/react";
import { ChangeEvent } from "react";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { availableIcons, OptionType, Size, Variant } from "../types/baseTypes";

type Props = {
  label?: string;
  value: string | string[];
  isMultiple?: boolean;
  isDisabled?: boolean;
  variant?: Variant;
  size?: Size;
  icon?: availableIcons;
  options: OptionType[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const classes = tv({
  slots: {
    container: "flex h-fit w-full flex-col",
    labelClasses: "font-small text-gray-900",
    selectBox: "relative flex w-full items-center",
    base: "box-content flex w-full flex-1 cursor-pointer appearance-none items-center rounded-md border-2 px-1 outline-0",
    icon: "absolute right-1",
  },

  variants: {
    variant: {
      primary: "border-gray-600",
      secondary: "border-gray-400",
      info: "border-blue-600",
      success: "border-green-600",
      warning: "border-orange-600",
      error: "border-red-800",
    },
    size: {
      xs: { labelClasses: "text-xs", base: "h-6" },
      sm: { labelClasses: "text-sm", base: "h-7" },
      md: { base: "h-8 min-h-8" },
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
  options,
  value,
}: Props) {
  const { base, container, labelClasses, icon, selectBox } = classes({ variant, size, isDisabled });
  return (
    <div className={container()}>
      <p className={labelClasses()}>{label ? <label>{label}</label> : null}</p>
      <div className={selectBox()}>
        <select className={base()} disabled={isDisabled} multiple={isMultiple} onChange={onChange} value={value}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={icon()}>
          <Icon icon={Icons["arrow-down"]} />
        </span>
      </div>
    </div>
  );
}
