import { Icon } from "@iconify/react/dist/iconify.js";
import { tv } from "tailwind-variants";

import { availableIcons, Size, Variant } from "../types";
import { Button } from "./Button";
import { DropdownItemType } from "./Dropdown";

type Props = {
  label: string;
  icon?: availableIcons;
  variant?: Variant;
  size?: Size;
  hasBorder?: boolean;
  items?: {
    id: string;
    label: string;
    onClick: () => void;
    icon: availableIcons;
    isDisabled?: boolean;
    items?: DropdownItemType[];
  }[];
};

const classes = tv({
  base: "flex-1 font-medium select-none",
  variants: {
    variant: {
      primary: "border-primary-highlight",
      secondary: "border-secondary-highlight",
      info: "border-info-highlight",
      success: "border-success-highlight",
      warning: "border-warning-highlight",
      error: "border-error-highlight",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    hasBorder: {
      true: "border-b",
    },
  },
});

export function Title({ label, variant = "info", size = "md", hasBorder, icon, items }: Props) {
  return (
    <h3 className={classes({ variant, size, hasBorder })}>
      <span className="flex items-center">
        {icon ? <Icon className="-rotate-45" color="#cccbbb" fontSize={28} icon={icon} /> : null}
        <span>{label}</span>
        {(items || []).map((item) => (
          <div key={item.id} className="ml-auto">
            <Button
              allowedPlacements={["left", "left-start", "left-end"]}
              hasNoBorder
              icon={item.icon}
              isOutline
              items={item.items || []}
              onClick={item.onClick}
            />
          </div>
        ))}
      </span>
    </h3>
  );
}
