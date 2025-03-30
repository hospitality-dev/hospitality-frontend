import { tv } from "tailwind-variants";

import { Size, Variant } from "../types/baseTypes";

type Props = {
  label: string;
  variant?: Variant;
  size?: Size;
  customColor?: string;
};

const classes = tv({
  base: "flex w-fit cursor-pointer items-center justify-center rounded p-2 font-medium text-white shadow select-none",
  variants: {
    variant: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
    },
    size: { xs: "h-4 text-xs", sm: "h-5 text-sm", md: "h-6", lg: "h-7 text-lg", xl: "h-8 text-xl" },
  },
});

export function Badge({ label, variant = "primary", size = "md", customColor }: Props) {
  return (
    <div>
      <p className={classes({ variant, size })} style={{ backgroundColor: customColor }}>
        {label}
      </p>
    </div>
  );
}
