import { ReactNode, useState } from "react";

import { Icons } from "../enums";
import { ActionType, availableIcons, Size, Variant } from "../types";
import { Title } from "./Title";

type Props = {
  label: string;
  icon?: availableIcons;
  children: ReactNode;
  isOpen?: boolean;
  variant?: Variant;
  size?: Size;
  items?: ActionType[];
};

export function Collapsible({ icon, label, children, isOpen, items, variant = "primary", size = "md" }: Props) {
  const [isExpanded, setIsExpanded] = useState(!!isOpen);

  return (
    <details open={isExpanded}>
      <summary
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsExpanded((prev) => !prev);
        }}>
        <Title
          hasBorder
          icon={icon}
          items={[
            ...(items || []),
            {
              id: "collapse",
              icon: Icons[isExpanded ? "arrow-up" : "arrow-down"],
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
