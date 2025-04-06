import { tv } from "tailwind-variants";

import { OptionType } from "../types";

const classes = tv({
  base: "flex cursor-pointer flex-col gap-y-1 p-2 hover:bg-blue-200",
  variants: {
    isSelected: {
      true: "text-info bg-blue-100",
    },
    isDisabled: {
      true: "bg-secondary-highlight text-primary cursor-not-allowed",
    },
  },
});

export function OptionItem<OT = null>({
  isActive,
  isSelected,
  item,
  onChange,
}: {
  isActive?: boolean;
  isSelected?: boolean;
  item: OptionType<OT>;
  onChange: (item: OptionType<OT>) => void;
}) {
  return (
    <div
      aria-selected={isActive}
      className={classes({ isSelected, isDisabled: !!item?.isDisabled })}
      id={item.value}
      onClick={() => {
        if (item.isDisabled) return;
        onChange(item);
      }}
      role="option">
      <span className="font-semibold">{item.label}</span>
      {item.description ? <span className="text-sm">{item.description}</span> : null}
    </div>
  );
}
