import { tv } from "tailwind-variants";

import { isOutline, Size, Variant } from "../types/baseTypes";

type Props = { label?: string; variant?: Variant; size?: Size; isOutline?: isOutline };

const classes = tv({
  base: "flex cursor-pointer items-center rounded-sm px-4 py-2 text-white shadow active:shadow-none",
  variants: {
    variant: {
      primary: "bg-gray-700 hover:bg-gray-900 active:bg-gray-900",
      secondary: "bg-gray-300 text-gray-700 hover:bg-gray-600 hover:text-white active:bg-gray-600",
      info: "border-blue-600 bg-blue-500 hover:bg-blue-600 active:bg-blue-600",
      success: "bg-green-500 hover:bg-green-600 active:bg-green-600",
      warning: "bg-orange-500 hover:bg-orange-600 active:bg-orange-600",
      error: "bg-red-600 hover:bg-red-800 active:bg-red-800",
    },
    size: { xs: "h-6 text-xs", sm: "h-7 text-sm", md: "h-8", lg: "h-9 text-lg", xl: "h-10 text-xl" },
    isOutline: { true: "border-2 border-black bg-transparent text-black", false: "" },
  },
});

export function Button({ label, variant = "primary", size = "md", isOutline = false }: Props) {
  return <button className={classes({ variant, size, isOutline })}>{label}</button>;
}
