import { Icon } from "@iconify/react/dist/iconify.js";
import { tv } from "tailwind-variants";

import { ActionType, availableIcons, Size, Variant } from "../types";
import { Button } from "./Button";

type Props = {
  label: string;
  icon?: availableIcons;
  variant?: Variant;
  size?: Size;
  hasBorder?: boolean;
  items?: ActionType[];
};

const classes = tv({
  slots: {
    base: "flex w-full flex-1 items-center gap-x-1 uppercase select-none",
    actionsContainer: "ml-auto flex items-center gap-x-1",
    actionButtonContainer: "h-7 w-7",
  },
  variants: {
    variant: {
      primary: "border-primary font-normal",
      secondary: "border-secondary font-light",
      info: "border-info-highlight",
      success: "border-success-highlight",
      warning: "border-warning-highlight",
      error: "border-error-highlight",
    },
    size: {
      xs: "text-xs [&>svg]:text-sm",
      sm: "text-sm [&>svg]:text-base",
      md: "text-base [&>svg]:text-lg",
      lg: "text-lg [&>svg]:text-xl",
      xl: "text-xl [&>svg]:text-2xl",
    },
    hasBorder: {
      true: "border-b",
    },
  },
});

export function Title({ label, variant = "info", size = "md", hasBorder, icon, items }: Props) {
  const { base, actionsContainer, actionButtonContainer } = classes({ variant, size, hasBorder });
  return (
    <h3 className={base()}>
      {icon ? <Icon fontSize={22} icon={icon} /> : null}
      <span>{label}</span>
      <div className={actionsContainer()}>
        {(items || []).map((item) => (
          <div key={item.id} className={actionButtonContainer()}>
            <Button
              allowedPlacements={item.allowedPlacements || []}
              hasNoBorder
              icon={item.icon}
              isOutline
              items={item.items || []}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (item.onClick) item.onClick(e);
              }}
              variant={item.variant || "primary"}
            />
          </div>
        ))}
      </div>
    </h3>
  );
}
