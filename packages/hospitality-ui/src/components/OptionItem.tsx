import { tv } from "tailwind-variants";

import { OptionType } from "../types";
import { Icon } from "./Icon";

const classes = tv({
  slots: {
    base: "hover:text-info-highlight flex cursor-pointer flex-col gap-y-1 p-2 outline-0 outline-none hover:bg-blue-50",
    label: "flex flex-nowrap items-center gap-x-1 font-semibold",
  },
  variants: {
    isActive: {
      true: { base: "text-info-highlight bg-blue-50" },
    },
    isSelected: {
      true: { base: "text-info bg-blue-100" },
    },
    isDisabled: {
      true: { base: "cursor-not-allowed bg-gray-50 text-gray-400 hover:bg-gray-300 hover:text-gray-400" },
    },
  },
});

export function OptionItem({
  isActive,
  isSelected,
  item,
  onChange,
  query,
}: {
  query: string;
  isActive?: boolean;
  isSelected?: boolean;
  item: OptionType;
  onChange: (item: OptionType) => void;
}) {
  const { base, label } = classes({ isSelected, isActive, isDisabled: !!item?.isDisabled });
  return (
    <div
      aria-selected={isActive}
      className={base()}
      id={item.value}
      onClick={() => {
        if (item.isDisabled) return;
        if (item.onClick) {
          item.onClick({ item, query });
        } else {
          onChange(item);
        }
      }}
      role="option">
      <div className={label()}>
        <span>{item.image ? <img className="w-5" src={item.image} /> : null}</span>
        <span>{item.label}</span>
        {item?.icon ? (
          <span className="ml-auto">
            <Icon fontSize={20} icon={item.icon} />
          </span>
        ) : null}
      </div>
      {item.description ? <span className="text-sm">{item.description}</span> : null}
    </div>
  );
}
