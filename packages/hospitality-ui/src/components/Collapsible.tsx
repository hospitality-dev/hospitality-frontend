import { ReactNode, useLayoutEffect, useState } from "react";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { ActionType, AvailableIcons, Size, Variant } from "../types";
import { Title } from "./Title";

type Props = {
  label: string;
  icon?: AvailableIcons;
  children: ReactNode;
  isOpen?: boolean;
  isInitialOpen?: boolean;
  variant?: Variant;
  size?: Size;
  items?: ActionType[];
};
const classes = tv({
  base: "min-w-full overflow-auto transition-[height]",
  variants: {
    isOpen: {
      true: "overflow-hidden",
      false: "h-0 overflow-hidden",
    },
  },
});
export function Collapsible({ icon, label, children, isOpen, isInitialOpen, items, variant = "primary", size = "md" }: Props) {
  const [isExpanded, setIsExpanded] = useState(!!isOpen || !!isInitialOpen);

  useLayoutEffect(() => {
    if (isOpen !== undefined) setIsExpanded(isOpen);
  }, [isOpen]);

  return (
    <div className="flex-col">
      <Title
        hasBorder={isExpanded}
        icon={icon}
        items={[
          ...(isExpanded ? items || [] : []),
          {
            id: "collapse",
            icon: Icons[isExpanded ? "arrowUp" : "arrowDown"],
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded((prev) => !prev);
            },
            label: "",
          },
        ]}
        label={label}
        size={size}
        variant={variant}
      />
      <div className={classes({ isOpen: isExpanded })} style={{ height: isExpanded ? "calc-size(auto, size)" : 0 }}>
        <div
          className="cursor-pointer p-0.5"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded((prev) => !prev);
          }}></div>
        {children}
      </div>
    </div>
  );
}
