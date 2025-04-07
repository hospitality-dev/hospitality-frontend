import { MaskitoOptions } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { ChangeEvent, HTMLInputTypeAttribute, KeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { tv } from "tailwind-variants";

import { availableIcons, Size, Variant } from "../types/baseTypes";
import { defaultMask, numbersOnlyMask, phoneMask } from "../utils";
import { Button } from "./Button";

type AllowedTypes = Extract<HTMLInputTypeAttribute, "text" | "number" | "tel">;

type Props = {
  label?: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  helperText?: string;
  isDisabled?: boolean;
  isAutofocused?: boolean;
  variant?: Variant;
  size?: Size;
  placeholder?: string;
  type?: AllowedTypes;
  action?: {
    onClick: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: availableIcons;
    tooltip?: string;
  };
};

const masks: Record<AllowedTypes, MaskitoOptions> = {
  number: numbersOnlyMask,
  text: defaultMask,
  tel: phoneMask,
};

const classes = tv({
  slots: {
    container: "group flex h-fit w-full flex-col outline-0",
    inputContainer:
      "flex w-full cursor-pointer flex-nowrap items-center justify-between rounded-md border bg-white px-2 text-gray-900 shadow-sm outline-0",
    inputClasses: "flex-1 pr-2 focus-within:outline-0 focus:outline-0",
    labelClasses: "font-small text-gray-900",
    helperTextClasses: "text-sm",
  },
  variants: {
    variant: {
      primary: {
        inputContainer: "border-primary focus-within:border-info-highlight",
        helperTextClasses: "text-primary",
      },
      secondary: {
        inputContainer: "border-secondary focus-within:border-info-highlight",
        helperTextClasses: "text-secondary",
      },
      info: {
        inputContainer: "border-info-border focus-within:border-info-highlight",
        helperTextClasses: "text-info-highlight",
      },
      success: {
        inputContainer: "border-success focus-within:border-success-highlight",
        helperTextClasses: "text-success-highlight",
      },
      warning: {
        inputContainer: "border-warning group-has-[input:focus]:border-warning-highlight",
        labelClasses: "group-has-[input:focus]:text-warning-highlight text-warning",
        helperTextClasses: "text-warning-highlight",
      },
      error: {
        inputContainer: "border-error group-has-[input:focus]:error-highlight",
        labelClasses: "text-error",
        helperTextClasses: "text-error-highlight",
      },
    },
    size: {
      xs: { labelClasses: "text-xs", inputClasses: "h-6 py-2 text-sm" },
      sm: { labelClasses: "text-sm", inputClasses: "h-7 py-2" },
      md: { inputClasses: "h-8 text-lg" },
      lg: { labelClasses: "text-lg", inputClasses: "h-9 text-xl" },
      xl: { labelClasses: "text-xl", inputClasses: "h-10 text-2xl" },
    },
    isDisabled: { true: { inputClasses: "cursor-not-allowed" } },
  },
});

export function Input({
  label,
  name,
  variant = "primary",
  size = "md",
  isDisabled = false,
  isAutofocused,
  placeholder,
  helperText,
  value,
  onChange,
  onKeyDown,
  type = "text",
  action,
}: Props) {
  const inputRef = useMaskito({ options: masks[type] });
  const { inputClasses, inputContainer, container, labelClasses, helperTextClasses } = classes({
    variant,
    size,
    isDisabled,
  });

  return (
    <div className={container()}>
      <label className={labelClasses()}>{label ? <span>{label}</span> : null}</label>
      <div className={inputContainer()}>
        <input
          ref={inputRef}
          autoComplete="off"
          autoFocus={isAutofocused}
          className={inputClasses()}
          disabled={isDisabled}
          name={name}
          onInput={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {action ? (
          <span className="top-0.5 right-2 w-fit">
            <Button hasNoBorder icon={action.icon} isOutline onClick={action.onClick} size="md" />
          </span>
        ) : null}
      </div>
      {helperText ? <p className={helperTextClasses()}>{helperText}</p> : null}
    </div>
  );
}
