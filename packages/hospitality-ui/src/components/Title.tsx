import { Icon } from "@iconify/react/dist/iconify.js";
import { tv } from "tailwind-variants";

import { availableIcons, Size, Variant } from "../types";

type Props = { label: string; icon?: availableIcons; variant?: Variant; size?: Size; hasBorder?: boolean };

const classes = tv({
  slots: {
    title: "font-medium",
    border: "block h-0.5 rounded-l-2xl bg-gradient-to-r to-transparent",
  },
  variants: {
    variant: {
      primary: {
        border: "from-gray-400",
      },
      secondary: {
        border: "from-gray-200",
      },
      info: {
        border: "from-blue-300",
      },
      success: {
        border: "from-green-300",
      },
      warning: {
        border: "from-orange-300",
      },
      error: {
        border: "from-red-300",
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
  },
});

export function Title({ label, variant = "primary", size = "md", hasBorder, icon }: Props) {
  const { title, border } = classes({ variant, size });
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
