import {
  autoPlacement,
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  size as floatingSize,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { useEffect, useRef, useState } from "react";

import { OptionType, Size, Variant } from "../types";
import { Input } from "./Input";
import { OptionItem } from "./OptionItem";

type Props<OT> = {
  label: string;
  query: string;
  value?: string;
  variant?: Variant;
  size?: Size;
  helperText?: string;
  onQueryChange: (value: string) => void;
  onChange: (item: OptionType<OT> | null) => void;
  options: OptionType<OT>[];
  isSearch?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export function Autocomplete<OT = null>({
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
}: Props<OT>) {
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
      autoPlacement(),
      flip({ padding: 10 }),
      floatingSize({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([role, dismiss, listNav]);
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
          ref: refs.setReference,
          "aria-autocomplete": "list",
        })}>
        <Input
          isDisabled={isDisabled}
          label={label}
          name="search"
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if ((e.key === "Backspace" || e.key === "Delete") && value) {
              e.preventDefault();
              e.stopPropagation();
              onQueryChange("");
              onChange(null);
            } else if (e.key !== "Backspace" && e.key !== "Delete" && value) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          size={size}
          type="search"
          value={displayItem?.label || query}
          variant={variant}
        />
      </div>
      {open && items.length ? (
        <FloatingPortal>
          <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
            <div
              {...getFloatingProps({
                ref: refs.setFloating,
                style: floatingStyles,
                className: "divide-y divide-gray-200 bg-white rounded-md border border-gray-300 shadow-lg overflow-y-auto",
              })}>
              {items.map((item, index) => (
                <OptionItem
                  key={item.value}
                  isActive={activeIndex === index}
                  isSelected={item.value === value}
                  item={item}
                  onChange={onChange}
                />
              ))}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      ) : null}
    </>
  );
}
