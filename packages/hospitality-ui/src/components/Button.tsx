import { Icon } from "@iconify/react";
import { MouseEventHandler } from "react";
import { tv } from "tailwind-variants";

import { availableIcons, Size, Variant } from "../types/baseTypes";
import { Dropdown, DropdownItemType } from "./Dropdown";

type Props = {
  label?: string;
  variant?: Variant;
  size?: Size;
  isOutline?: boolean;
  isDisabled?: boolean;
  icon?: availableIcons;
  hasNoBorder?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  items?: DropdownItemType[];
};

const classes = tv({
  slots: {
    base: "flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm px-4 py-2 font-medium text-white shadow transition-all select-none active:scale-95 active:shadow-none",
    labelClasses: "max-w-5/6 truncate",
  },
  variants: {
    variant: {
      primary: "bg-primary hover:bg-primary-highlight active:bg-gray-900",
      secondary: "bg-secondary hover:bg-secondary-highlight text-white active:bg-gray-600",
      info: "bg-info hover:bg-info-highlight active:bg-blue-600",
      success: "bg-success hover:bg-success-highlight active:bg-green-600",
      warning: "border-warning bg-warning hover:bg-warning-highlight active:bg-orange-600",
      error: "border-error bg-error hover:bg-error-highlight active:bg-red-800",
    },
    size: { xs: "h-6 text-xs", sm: "h-7 text-sm", md: "h-8", lg: "h-9 text-lg", xl: "h-10 text-xl" },
    isOutline: { true: "border-2 bg-transparent text-black", false: "" },
    isDisabled: {
      true: "bg-disabled cursor-not-allowed text-gray-200 shadow-none transition-none",
    },
    hasNoBorder: { true: "border-0 shadow-none hover:bg-transparent active:bg-transparent", false: "" },
    hasIconOnly: {
      true: "px-0",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      isOutline: true,
      hasNoBorder: false,
      class: "text-gray-900 hover:text-white active:text-white",
    },
    {
      variant: "secondary",
      isOutline: true,
      hasNoBorder: false,
      class: "text-gray-600 hover:text-white active:text-white",
    },
    {
      variant: "info",
      isOutline: true,
      hasNoBorder: false,
      class: "text-blue-600 hover:text-white active:text-white",
    },
    {
      variant: "success",
      isOutline: true,
      hasNoBorder: false,
      class: "text-green-600 hover:text-white active:text-white",
    },
    {
      variant: "warning",
      isOutline: true,
      hasNoBorder: false,
      class: "text-orange-600 hover:text-white active:text-white",
    },
    {
      variant: "error",
      isOutline: true,
      hasNoBorder: false,
      class: "text-red-600 hover:text-white active:text-white",
    },
    {
      variant: "primary",
      isOutline: true,
      hasNoBorder: true,
      class: "text-gray-900",
    },
    {
      variant: "secondary",
      isOutline: true,
      hasNoBorder: true,
      class: "text-gray-600",
    },
    {
      variant: "info",
      isOutline: true,
      hasNoBorder: true,
      class: "text-blue-600",
    },
    {
      variant: "success",
      isOutline: true,
      hasNoBorder: true,
      class: "text-green-600",
    },
    {
      variant: "warning",
      isOutline: true,
      hasNoBorder: true,
      class: "text-orange-600",
    },
    {
      variant: "error",
      isOutline: true,
      hasNoBorder: true,
      class: "text-red-600",
    },
  ],
});

export function Button({
  label,
  variant = "primary",
  size = "md",
  isOutline = false,
  isDisabled,
  hasNoBorder,
  icon,
  onClick,
  items,
}: Props) {
  if (!label && !icon) return null;
  const { base, labelClasses } = classes({ variant, size, isOutline, hasNoBorder, isDisabled, hasIconOnly: !label && !!icon });
  return (
    <Dropdown isDisabled={!items?.length} items={items || []}>
      <button className={base()} disabled={isDisabled} onClick={onClick}>
        {label ? <div className={labelClasses()}>{label}</div> : null} {icon ? <Icon fontSize={22} icon={icon} /> : null}
      </button>
    </Dropdown>
  );
}
