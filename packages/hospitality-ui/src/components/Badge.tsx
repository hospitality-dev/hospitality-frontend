import { tv } from "tailwind-variants";

import { Size, Variant } from "../types/baseTypes";

type Props = {
  label: string;
  variant?: Variant;
  size?: Size;
  customColor?: string;
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
    size: { xs: "h-6 text-xs", sm: "h-7 text-sm", md: "h-8", lg: "h-9 text-lg", xl: "h-10 rounded-full text-xl" },
  },
});

export function Badge({ label, variant = "primary", size = "md", customColor }: Props) {
  return (
    <div>
      <p>{label}</p>
    </div>
  );
}
