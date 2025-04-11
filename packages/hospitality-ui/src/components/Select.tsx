import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  size as floatingSize,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { availableIcons, OptionType, Size, Variant } from "../types/baseTypes";
import { OptionItem } from "./OptionItem";

type Props<OT> = {
  label?: string;
  value: string | string[] | undefined | null;
  isMultiple?: boolean;
  isDisabled?: boolean;
  hasNoBorder?: boolean;
  variant?: Variant;
  size?: Size;
  icon?: availableIcons;
  options: OptionType<OT>[];
  onChange: (item: OptionType<OT> | null) => void;
};

const classes = tv({
  slots: {
    container: "flex h-fit w-full min-w-fit flex-col",
    labelClasses: "font-small font-light text-gray-900",
    selectBox: "relative flex w-full items-center rounded-md bg-white",
    base: "box-content flex w-full flex-1 cursor-pointer appearance-none items-center gap-x-1 rounded-md border px-1 shadow-sm outline-0",
    icon: "text-primary ml-auto pt-0.5",
    optionsContainer:
      "z-[61] divide-y divide-gray-300 overflow-y-auto rounded-md border border-gray-400 bg-white shadow-lg outline-0",
  },

  variants: {
    variant: {
      primary: "border-primary",
      secondary: "border-secondary",
      info: "border-info",
      success: "border-success",
      warning: "border-warning",
      error: "border-error",
    },
    size: {
      xs: { labelClasses: "text-[10px]", base: "h-6" },
      sm: { labelClasses: "text-xs", base: "h-7" },
      md: { labelClasses: "text-sm", base: "h-8 min-h-8" },
      lg: { labelClasses: "text-lg", base: "h-9" },
      xl: { labelClasses: "text-xl", base: "h-10" },
    },

    isDisabled: { true: "border-secondary cursor-not-allowed text-gray-400" },
    hasNoBorder: { true: "border-0 outline-0 outline-none" },
  },
});

export function Select<OT>({
  label,
  variant = "primary",
  size = "md",
  // isMultiple = false,
  isDisabled = false,
  hasNoBorder,
  onChange,
  options = [],
  value,
}: Props<OT>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 }),
      floatingSize({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const listRef = useRef<Array<HTMLElement | null>>([]);

  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    // This is a large list, allow looping.
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([dismiss, role, listNav, click]);

  const selectedItem = options.find((opt) => opt?.value === value);
  const { base, container, labelClasses, icon, selectBox, optionsContainer } = classes({
    variant,
    size,
    isDisabled: isDisabled || !options.length,
    hasNoBorder,
  });
  return (
    <div className={container()}>
      <p className={labelClasses()}>{label ? <label>{label}</label> : null}</p>
      <div className={selectBox()}>
        <div
          ref={refs.setReference}
          aria-autocomplete="none"
          aria-labelledby="select-label"
          className={base()}
          tabIndex={0}
          {...getReferenceProps()}>
          {selectedItem?.additionalData &&
          typeof selectedItem.additionalData === "object" &&
          "iso3" in selectedItem.additionalData ? (
            <img src={`/flags/${selectedItem.additionalData.iso3}.svg`} />
          ) : null}
          {!options?.length ? "No options" : selectedItem?.label || "Select one"}
          <div className={icon()}>
            <Icon icon={Icons["arrow-down"]} />
          </div>
        </div>
      </div>
      {isOpen ? (
        <FloatingFocusManager context={context} modal={false}>
          <div ref={refs.setFloating} className={optionsContainer()} style={floatingStyles} {...getFloatingProps()}>
            {options.map((opt, i) => (
              <div
                key={opt.id || opt.value}
                ref={(node) => {
                  listRef.current[i] = node;
                }}
                aria-selected={i === activeIndex}
                role="option"
                tabIndex={i === activeIndex ? 0 : -1}
                {...getItemProps({ className: "outline-0 outline-none" })}>
                <OptionItem isActive={i === activeIndex} isSelected={opt?.value === value} item={opt} onChange={onChange} />
              </div>
            ))}
          </div>
        </FloatingFocusManager>
      ) : null}
    </div>
  );
}
