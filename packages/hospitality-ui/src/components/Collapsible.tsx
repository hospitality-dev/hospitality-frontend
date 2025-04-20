import { ReactNode, useLayoutEffect, useState } from "react";

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

export function Collapsible({ icon, label, children, isOpen, isInitialOpen, items, variant = "primary", size = "md" }: Props) {
  const [isExpanded, setIsExpanded] = useState(!!isOpen || !!isInitialOpen);

  useLayoutEffect(() => {
    if (isOpen !== undefined) setIsExpanded(isOpen);
  }, [isOpen]);

  return (
    <details open={isExpanded}>
      <summary
        className="cursor-pointer p-0.5"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsExpanded((prev) => !prev);
        }}>
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
      </summary>
      {isExpanded ? children : null}
    </details>
  );
}
