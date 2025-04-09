import { ReactNode } from "react";
import { tv } from "tailwind-variants";

import { Variant } from "../types";

type Props = {
  children: ReactNode;
  isFullWidth?: boolean;
  hasNoShadow?: boolean;
  variant?: Variant;
};

const classes = tv({
  base: "cursor-pointer overflow-hidden rounded border-3 border-transparent bg-white shadow-sm transition-shadow hover:shadow-md",
  variants: {
    isFullWidth: {
      true: "w-full",
      false: "aspect-square w-fit min-w-32",
    },
    hasNoShadow: {
      true: "shadow-none hover:shadow-none",
    },
    variant: {
      primary: "bg-white",
      secondary: "bg-gray-100",
      info: "border-3 border-blue-500",
      success: "border-3 border-green-500",
      warning: "border-3 border-orange-500",
      error: "border-3 border-red-500",
    },
  },
});

export function Card({ children, isFullWidth, hasNoShadow, variant = "primary" }: Props) {
  return <div className={classes({ isFullWidth, variant, hasNoShadow })}>{children}</div>;
}
