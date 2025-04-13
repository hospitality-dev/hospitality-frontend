import {
  autoPlacement,
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  size as floatingSize,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { ValidationError } from "@tanstack/react-form";
import { FocusEventHandler, useEffect, useRef, useState } from "react";
import { ZodIssue } from "zod";

import { OptionType, Size, Variant } from "../types";
import { formatDisplayItem } from "../utils";
import { Input } from "./Input";
import { OptionItem } from "./OptionItem";

type Props = {
  label: string;
  query: string;
  value?: string;
  displayTitle?: string | null;
  variant?: Variant;
  size?: Size;
  helperText?: string;
  onQueryChange: (value: string) => void;
  onChange: (item: OptionType | null) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  options: OptionType[];
  isSearch?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isAutofocused?: boolean;
  errors?: ValidationError[] | ZodIssue[];
};

export function Autocomplete({
  label,
  variant = "primary",
  size = "md",
  onQueryChange,
  onChange,
  query,
  value,
  isSearch,
  isDisabled,
  options = [],
  isAutofocused,
  helperText,
  displayTitle,
  onBlur,
  errors,
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({
        mainAxis: 5,
      }),
      autoPlacement({ allowedPlacements: ["bottom", "top"] }),
      flip({ padding: 10 }),
      floatingSize({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
    ],
  });

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    openOnArrowKeyDown: true,
    virtual: true,
    loop: true,
  });
  const focus = useFocus(context);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([focus, role, dismiss, listNav]);
  const items = isSearch ? options : options.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  const displayItem = items.find((el) => el?.value === value);

  useEffect(() => {
    if (query && items.length) {
      setOpen(true);
      setActiveIndex(0);
    }
  }, [query, items.length]);
  return (
    <>
      <div
        {...getReferenceProps({
          onClick: () => setOpen(true),
          "aria-autocomplete": "list",
          ref: refs.setReference,
        })}
        className="h-fit w-full">
        <Input
          errors={errors}
          helperText={helperText}
          isAutofocused={isAutofocused}
          isDisabled={isDisabled}
          label={label}
          name="search"
          onBlur={onBlur}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if ((e.key === "Backspace" || e.key === "Delete") && value) {
              e.preventDefault();
              e.stopPropagation();
              onQueryChange("");
              onChange(null);
            } else if (e.key === "Enter" && !value && activeIndex !== null) {
              onChange(items[activeIndex]);
            } else if (e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowUp" && e.key !== "ArrowDown" && value) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          size={size}
          type="search"
          value={displayItem ? formatDisplayItem(displayItem) : query || displayTitle || ""}
          variant={variant}
        />
      </div>
      {open && items.length ? (
        <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
          <div
            {...getFloatingProps({
              ref: refs.setFloating,
              style: floatingStyles,
              className: "divide-y divide-gray-300 bg-white rounded-md border border-gray-400 shadow-lg overflow-y-auto z-[61]",
            })}>
            {items.map((item, index) => (
              <div
                key={item.id || item.value}
                {...getItemProps({
                  ref(node) {
                    listRef.current[index] = node;
                  },
                })}>
                <OptionItem
                  isActive={activeIndex === index}
                  isSelected={item.value === value}
                  item={item}
                  onChange={onChange}
                />
              </div>
            ))}
          </div>
        </FloatingFocusManager>
      ) : null}
    </>
  );
}
