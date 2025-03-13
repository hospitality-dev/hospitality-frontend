import { Icon } from "@iconify/react/dist/iconify.js";
import { tv } from "tailwind-variants";

import { availableIcons, Size, Variant } from "../types";

type Props = { label: string; icon?: availableIcons; variant?: Variant; size?: Size; hasBorder?: boolean };

const classes = tv({
  base: "flex-1 py-0.5 font-medium select-none",
  variants: {
    variant: {
      primary: "border-gray-300",
      secondary: "border-gray-200",
      info: "border-blue-300",
      success: "border-green-300",
      warning: "border-orange-300",
      error: "border-red-300",
    },
    size: {
      xs: {
        title: "text-xs",
      },
      sm: {
        title: "text-sm",
      },
      md: {
        title: "text-base",
      },
      lg: {
        title: "text-lg",
      },
      xl: {
        title: "text-xl",
      },
    },
    hasBorder: {
      true: "border-b",
    },
  },
});

export function Title({ label, variant = "info", size = "md", hasBorder, icon }: Props) {
  return (
    <h3 className={classes({ variant, size, hasBorder })}>
      <span className="flex items-center">
        {icon ? <Icon className="-rotate-45" color="#cccbbb" fontSize={28} icon={icon} /> : null}
        <span>{label}</span>
      </span>
    </h3>
  );
}
