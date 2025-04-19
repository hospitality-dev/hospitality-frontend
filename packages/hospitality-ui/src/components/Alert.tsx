import { Icon } from "@iconify/react";
import { ReactNode } from "@tanstack/react-router";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { AvailableIcons, Size, Variant } from "../types/baseTypes";
import { Button } from "./Button";

type Props = {
  content: ReactNode;
  title?: string;
  icon?: AvailableIcons;
  hasDismiss?: () => void;
  action?: { icon?: AvailableIcons; label?: string; variant?: Variant; size?: Size; onClick: () => void };
  variant?: Variant;
  size?: Size;
};

const classes = tv({
  base: "flex w-fit items-start justify-center rounded border p-2 select-none",
  variants: {
    variant: {
      primary: "text-primary bg-white",
      secondary: "text-secondary bg-white",
      info: "text-info border-info bg-blue-200/50",
      success: "text-success bg-green-200/50",
      warning: "text-warning bg-orange-200/50",
      error: "text-error bg-red-200/50",
    },
    size: { xs: "h-4 text-xs", sm: "h-5 text-sm", md: "h-fit", lg: "h-7 text-lg", xl: "h-8 text-xl" },
  },
});

export function Alert({ title, variant = "primary", size = "md", content, hasDismiss, action }: Props) {
  if (hasDismiss) {
    if (title && !action) {
      return (
        <div className={classes({ variant, size, className: "w-full flex-col justify-center gap-4" })}>
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-4">
              <span className="flex items-center">
                <Icon icon={Icons.beer} />
              </span>
              <h4 className="text-lg font-medium">{title}</h4>
            </div>
            <div>
              <Button hasNoBorder icon={Icons.close} isOutline onClick={undefined} variant={variant} />
            </div>
          </div>
          <div>
            <p>{content}</p>
          </div>
        </div>
      );
    } else if (!title && !action) {
      return (
        <div className={classes({ variant, size, className: "flex w-full items-center justify-between" })}>
          <div className="flex gap-4 text-lg">
            <span className="flex items-center">
              <Icon icon={Icons.beer} />
            </span>
            <p>{content}</p>
          </div>
          <div>
            <Button hasNoBorder icon={Icons.close} isOutline onClick={undefined} variant={variant} />
          </div>
        </div>
      );
    } else if (action && title) {
      return (
        <div className={classes({ variant, size, className: "w-full flex-col justify-center gap-4" })}>
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-4">
              <span className="flex items-center">
                <Icon icon={Icons.beer} />
              </span>
              <h4 className="text-lg font-medium">{title}</h4>
            </div>
          </div>
          <div>
            <p>{content}</p>
          </div>
          <div className="flex gap-4">
            <div>
              <Button icon={action.icon} label={action.label} onClick={undefined} variant={variant} />
            </div>
            <div className="w-28">
              <Button isOutline label="Dismiss" onClick={undefined} variant={variant} />
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className={classes({ variant, size, className: "flex w-full items-center justify-between" })}>
        <div className="flex gap-4 text-lg">
          <span className="flex items-center">
            <Icon icon={Icons.beer} />
          </span>
          <p>{content}</p>
        </div>
        <div>
          <Button hasNoBorder icon={Icons.close} isOutline onClick={undefined} variant={variant} />
        </div>
      </div>
    );
  }
}
