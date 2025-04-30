import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
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
import { ValidationError } from "@tanstack/react-form";
import { FocusEventHandler, useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { ZodIssue } from "zod";

import { Icons } from "../enums";
import { AvailableIcons, OptionType, Size, Variant } from "../types/baseTypes";
import { formatErrorsForHelperText } from "../utils";
import { Input } from "./Input";
import { OptionItem } from "./OptionItem";

type Props = {
  label?: string;
  value: string | string[] | undefined | null;
  isMultiple?: boolean;
  isDisabled?: boolean;
  hasNoBorder?: boolean;
  hasSearch?: boolean;
  variant?: Variant;
  size?: Size;
  icon?: AvailableIcons;
  options: OptionType[];
  helperText?: string;
  onChange: (item: OptionType | null) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  errors?: ValidationError[] | ZodIssue[];
};

const classes = tv({
  slots: {
    container: "flex h-fit w-full flex-col",
    labelClasses: "font-small font-light text-gray-900",
    selectBox: "relative flex w-full max-w-full items-center rounded-md bg-white",
    base: "box-content flex w-full flex-1 cursor-pointer appearance-none items-center gap-x-1 rounded-md border px-1 shadow-sm outline-0",
    icon: "text-primary ml-auto pt-0.5",
    optionsContainer:
      "[&>:has(label)>div>div]:focus-within:border-primary-highlight relative z-[61] divide-y divide-gray-300 overflow-y-auto rounded-md border border-gray-400 bg-white shadow-lg outline-0 [&>:has(label)>div]:border-0 [&>div>:has(label)>div]:rounded-none [&>div>:has(label)>div]:shadow-none [&>div>:has(label)>p]:hidden",
    searchContainer: "sticky top-0 max-h-fit",
    selectedItemLabel: "w-full max-w-full truncate select-none",
    selectedItemContent: "flex w-full max-w-full items-center gap-x-0.5",
    selectedItemImage: "h-5",
    helperTextClasses: "h-3.5 text-sm",
  },

  variants: {
    variant: {
      primary: "border-primary focus:border-info-highlight",
      secondary: "border-secondary focus:border-info-highlight",
      info: "border-info focus:border-info-highlight",
      success: "border-success focus:border-success-highlight",
      warning: "border-warning focus:border-warning-highlight",
      error: "border-error focus:border-error-highlight",
    },
    size: {
      xs: { labelClasses: "text-[10px]", base: "h-6" },
      sm: { labelClasses: "text-xs", base: "h-7" },
      md: { labelClasses: "text-sm", base: "h-8 min-h-8" },
      lg: { labelClasses: "text-lg", base: "h-9" },
      xl: { labelClasses: "text-xl", base: "h-10" },
    },

    isDisabled: { true: "cursor-not-allowed text-gray-400" },
    hasNoBorder: { true: "border-0 shadow-none outline-0 outline-none focus:border" },
    hasNoHelperText: {
      true: {
        helperTextClasses: "hidden",
      },
    },
  },
});

export function Select({
  label,
  variant = "primary",
  size = "md",
  // isMultiple = false,
  isDisabled = false,
  hasNoBorder,
  hasSearch,
  onChange,
  options = [],
  errors,
  value,
  onBlur,
  helperText,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(options.findIndex((opt) => opt.value === value));
  const [filter, setFilter] = useState("");
  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    placement: "bottom-start",
    open: isDisabled ? false : isOpen,
    onOpenChange: isDisabled ? () => {} : setIsOpen,
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
  const searchRef = useRef<HTMLDivElement | null>(null);

  const dismiss = useDismiss(context);
  const click = useClick(context, { event: "mousedown" });
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    scrollItemIntoView: true,
    focusItemOnOpen: true,
    // This is a large list, allow looping.
    loop: true,
  });
  const selectedItemIdx = options.findIndex((opt) => opt.value === value);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role, listNav, click]);

  const {
    base,
    container,
    labelClasses,
    icon,
    selectBox,
    optionsContainer,
    searchContainer,
    helperTextClasses,
    selectedItemLabel,
    selectedItemContent,
    selectedItemImage,
  } = classes({
    variant: errors?.length ? "error" : variant,
    size,
    isDisabled: isDisabled || !options.length,
    hasNoBorder,
    hasNoHelperText: !errors?.length && !helperText,
  });

  const filteredItems = filter
    ? options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(filter.toLowerCase()) ||
          opt.additionalData?.phonecode?.toString().includes(filter.replace("+", ""))
      )
    : options;
  useEffect(() => {
    if (isOpen && hasSearch && searchRef?.current) {
      const input = searchRef?.current?.children.item(0) as HTMLInputElement | null;
      if (input && document.activeElement !== input) {
        input.focus();
      }
    }
  }, [isOpen]);
  return (
    <div className={container()} onBlur={onBlur}>
      {label ? (
        <p className={labelClasses()}>
          <label>{label}</label>
        </p>
      ) : null}
      <div className={selectBox()}>
        <div
          ref={refs.setReference}
          aria-autocomplete="none"
          aria-labelledby="select-label"
          className={base()}
          tabIndex={0}
          {...getReferenceProps()}>
          <span className={selectedItemLabel()}>
            {!options?.length ? "No options" : null}
            {options.length && !value ? "Select one" : null}
            {options.length && value ? (
              <div className={selectedItemContent()}>
                {options[selectedItemIdx]?.image ? (
                  <img className={selectedItemImage()} src={options[selectedItemIdx]?.image} />
                ) : null}
                <div className="w-full max-w-full truncate">
                  {options[selectedItemIdx]?.additionalData?.selectedLabel || options[selectedItemIdx]?.label || ""}
                </div>
              </div>
            ) : null}
          </span>
          <div className={icon()}>
            <Icon icon={Icons.arrowDown} />
          </div>
        </div>
      </div>
      {errors?.length || helperText ? <p className={helperTextClasses()}>{formatErrorsForHelperText(errors || [])}</p> : null}

      {isOpen && !isDisabled && options.length ? (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div ref={refs.setFloating} className={optionsContainer()} style={floatingStyles} {...getFloatingProps()}>
              {hasSearch ? (
                <div ref={searchRef} className={searchContainer()}>
                  <Input
                    label=""
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Search by country name or prefix"
                    type="search"
                    value={filter}
                    variant="secondary"
                  />
                </div>
              ) : null}
              {filteredItems.map((opt, i) => (
                <div
                  key={opt.id}
                  ref={(node) => {
                    listRef.current[i] = node;
                  }}
                  aria-selected={i === activeIndex}
                  className="border-r border-r-gray-300 outline-0 outline-none nth-[2]:border-t-0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isDisabled && !opt.isDisabled && activeIndex !== null) {
                      e.preventDefault();
                      e.stopPropagation();
                      const optIdx = options.findIndex((filteredOpt) => filteredOpt.id === opt.id);
                      setFilter("");
                      onChange(opt);
                      if (optIdx > -1 && optIdx !== undefined) {
                        setSelectedIndex(optIdx);
                      }
                      setIsOpen(false);
                    }
                  }}
                  role="option"
                  tabIndex={i === activeIndex ? 0 : -1}>
                  <OptionItem
                    isActive={i === activeIndex}
                    isSelected={selectedIndex === i}
                    item={opt}
                    onChange={(item) => {
                      const optIdx = options.findIndex((filteredOpt) => filteredOpt.id === opt.id);
                      if (optIdx > -1 && optIdx !== undefined) {
                        onChange(item);
                        setSelectedIndex(optIdx);
                        setFilter("");
                        setIsOpen(false);
                      }
                      setFilter("");
                      setIsOpen(false);
                    }}
                  />
                </div>
              ))}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      ) : null}
    </div>
  );
}
