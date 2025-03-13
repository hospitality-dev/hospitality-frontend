import { Icon } from "@iconify/react/dist/iconify.js";
import { tv } from "tailwind-variants";

import { availableIcons, Size, Variant } from "../types";

type Props = { label: string; icon?: availableIcons; variant?: Variant; size?: Size; hasBorder?: boolean };

const classes = tv({
  slots: {
    title: "flex-1 border-transparent font-medium",
    border: "block h-[3px] rounded-l-2xl bg-gradient-to-r to-transparent",
  },
  variants: {
    variant: {
      primary: {
        border: "border-gray-400",
      },
      secondary: {
        border: "border-gray-200",
      },
      info: {
        border: "border-blue-300",
      },
      success: {
        border: "border-green-300",
      },
      warning: {
        border: "border-orange-300",
      },
      error: {
        border: "border-red-300",
      },
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
      true: {
        title: "border-b",
      },
    },
  },
});

export function Title({ label, variant = "info", size = "md", hasBorder, icon }: Props) {
  const { title, border } = classes({ variant, size, hasBorder });
  return (
    <h3 className={title()}>
      <span className="flex items-center">
        {icon ? <Icon className="-rotate-45" color="#cccbbb" fontSize={28} icon={icon} /> : null}
        <span>{label}</span>
      </span>
      {hasBorder ? <span className={border()} /> : null}
    </h3>
  );
}
