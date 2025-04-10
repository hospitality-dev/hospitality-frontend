import { tv } from "tailwind-variants";

import { Size, Variant } from "../types/baseTypes";
import { Image } from "./Image";

type Props = {
  label?: string;
  variant?: Variant;
  size?: Size;
  imageId?: string | null;
  onClick?: () => void;
};

const classes = tv({
  base: "bg-secondary flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 font-medium text-white shadow select-none",
  variants: {
    variant: {
      primary: "border-transparent",
      secondary: "border-transparent",
      info: "border-info",
      success: "border-success",
      warning: "border-warning",
      error: "border-error",
    },
    size: {
      xs: "h-10 w-10 text-base",
      sm: "h-11 w-11 text-lg",
      md: "h-12 w-12 text-xl",
      lg: "h-13 w-13 text-2xl",
      xl: "h-14 w-14 text-3xl",
    },
    hasAction: {
      true: "cursor-pointer",
      false: "cursor-default",
    },
  },
});

function getInitials(name: Props["label"]) {
  if (!name) {
    return "";
  }
  const parts = name.split(" ");
  let initials = "";
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== "") {
      initials += parts[i][0];
    }
    if (i === 2) {
      break;
    }
  }
  return initials;
}

export function Avatar({ label, variant = "primary", size = "md", imageId, onClick }: Props) {
  return (
    <div className={classes({ variant, size, hasAction: !!onClick })} onClick={onClick}>
      {imageId ? <Image imageId={imageId} /> : getInitials(label)}
    </div>
  );
}
