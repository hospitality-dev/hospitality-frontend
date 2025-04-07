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

type Props<OT = null> = {
  label?: string;
  value: string | string[];
  isMultiple?: boolean;
  isDisabled?: boolean;
  hasNoBorder?: boolean;
  variant?: Variant;
  size?: Size;
  icon?: availableIcons;
  options: OptionType<null>[];
  onChange: (item: OptionType<OT> | null) => void;
};

const classes = tv({
  slots: {
    container: "flex h-fit w-full flex-col",
    labelClasses: "font-small text-gray-900",
    selectBox: "relative flex w-full items-center bg-white",
    base: "box-content flex w-full flex-1 cursor-pointer appearance-none items-center rounded-md border px-1 shadow-sm outline-0",
    icon: "absolute right-1",
    optionsContainer: "z-[61] divide-y divide-gray-200 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg",
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
      xs: { labelClasses: "text-xs", base: "h-6" },
      sm: { labelClasses: "text-sm", base: "h-7" },
      md: { base: "h-8 min-h-8" },
      lg: { labelClasses: "text-lg", base: "h-9" },
      xl: { labelClasses: "text-xl", base: "h-10" },
    },
    isDisabled: { true: "cursor-not-allowed" },
    hasNoBorder: { true: "border-0 outline-0 outline-none" },
  },
});

export function Select({
  label,
  variant = "info",
  size = "md",
  // isMultiple = false,
  isDisabled = false,
  hasNoBorder,
  onChange,
  options = [],
  value,
}: Props) {
  const { base, container, labelClasses, icon, selectBox, optionsContainer } = classes({
    variant,
    size,
    isDisabled: isDisabled || !options.length,
    hasNoBorder,
  });
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
    // This is a large list, allow looping.
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([dismiss, role, listNav, click]);

  const selectedItemLabel = options.find((opt) => opt?.value === value)?.label || "";

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
          {!options?.length ? "No options" : selectedItemLabel || "Select one"}
          <span className={icon()}>
            <Icon icon={Icons["arrow-down"]} />
          </span>
        </div>
      </div>
      {isOpen ? (
        <FloatingFocusManager context={context} modal={false}>
          <div ref={refs.setFloating} className={optionsContainer()} style={floatingStyles} {...getFloatingProps()}>
            {options.map((opt, i) => (
              <div
                key={opt.value}
                ref={(node) => {
                  listRef.current[i] = node;
                }}
                aria-selected={i === activeIndex}
                role="option"
                tabIndex={i === activeIndex ? 0 : -1}
                {...getItemProps({})}>
                <OptionItem item={opt} onChange={onChange} />
              </div>
            ))}
          </div>
        </FloatingFocusManager>
      ) : null}
    </div>
  );
}
