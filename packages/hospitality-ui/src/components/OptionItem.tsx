import { tv } from "tailwind-variants";

import { OptionType } from "../types";

const classes = tv({
  base: "hover:text-info-highlight flex cursor-pointer flex-col gap-y-1 p-2 hover:bg-blue-50",
  variants: {
    isActive: {
      true: "text-info-highlight bg-blue-50",
    },
    isSelected: {
      true: "text-info bg-blue-100",
    },
    isDisabled: {
      true: "cursor-not-allowed bg-gray-50 text-gray-400 hover:bg-gray-300 hover:text-gray-400",
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
      className={classes({ isSelected, isActive, isDisabled: !!item?.isDisabled })}
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
