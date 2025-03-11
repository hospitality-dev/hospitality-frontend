import { Icon } from "@iconify/react";
import { MouseEventHandler } from "react";
import { tv } from "tailwind-variants";

import { availableIcons, Size, Variant } from "../types/baseTypes";

type Props = {
  label?: string;
  variant?: Variant;
  size?: Size;
  isOutline?: boolean;
  isDisabled?: boolean;
  icon?: availableIcons;
  hasNoBorder?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

const classes = tv({
  base: "flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm px-4 py-2 font-medium text-white shadow transition-all select-none active:scale-95 active:shadow-none",
  variants: {
    variant: {
      primary: "border-gray-900 bg-gray-700 hover:bg-gray-900 active:bg-gray-900",
      secondary: "border-gray-600 bg-gray-300 text-gray-700 hover:bg-gray-600 hover:text-white active:bg-gray-600",
      info: "border-blue-600 bg-blue-500 hover:bg-blue-600 active:bg-blue-600",
      success: "border-green-600 bg-green-500 hover:bg-green-600 active:bg-green-600",
      warning: "border-orange-600 bg-orange-500 hover:bg-orange-600 active:bg-orange-600",
      error: "border-red-800 bg-red-600 hover:bg-red-800 active:bg-red-800",
    },
    size: { xs: "h-6 text-xs", sm: "h-7 text-sm", md: "h-8", lg: "h-9 text-lg", xl: "h-10 text-xl" },
    isOutline: { true: "border-2 bg-transparent text-black", false: "" },
    isDisabled: {
      true: "cursor-not-allowed bg-gray-400 text-gray-300 shadow-none transition-none hover:bg-gray-400 active:scale-100 active:bg-gray-400",
    },
    hasNoBorder: { true: "border-0 shadow-none hover:bg-transparent active:bg-transparent", false: "" },
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
}: Props) {
  if (!label && !icon) return null;
  return (
    <button className={classes({ variant, size, isOutline, hasNoBorder, isDisabled })} disabled={isDisabled} onClick={onClick}>
      {label ? <div className="max-w-5/6 truncate">{label}</div> : null} {icon ? <Icon icon={icon} /> : null}
    </button>
  );
}
