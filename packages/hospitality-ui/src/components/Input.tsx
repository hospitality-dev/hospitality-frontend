import { ChangeEvent, MouseEvent as ReactMouseEvent } from "react";
import { tv } from "tailwind-variants";

import { availableIcons, Size, Variant } from "../types/baseTypes";
import { Button } from "./Button";

type Props = {
  label?: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  isDisabled?: boolean;
  isAutofocused?: boolean;
  variant?: Variant;
  size?: Size;
  placeholder?: string;
  type?: HTMLInputElement["type"];
  action?: {
    onClick: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: availableIcons;
    tooltip?: string;
  };
};

const classes = tv({
  slots: {
    container: "group flex h-fit w-full flex-col outline-0",
    inputContainer:
      "flex w-full cursor-pointer flex-nowrap items-center justify-between rounded-md border px-2 text-gray-900 shadow-sm outline-0",
    inputClasses: "flex-1 pr-2 focus-within:outline-0 focus:outline-0",
    labelClasses: "font-small text-gray-900",
    helperTextClasses: "text-sm",
  },
  variants: {
    variant: {
      primary: {
        inputContainer: "border-primary focus-within:border-info-highlight",
      },
      secondary: {
        inputContainer: "border-secondary focus-within:border-info-highlight",
      },
      info: {
        inputContainer: "border-info-border focus-within:border-info-highlight",
      },
      success: {
        inputContainer: "border-success focus-within:border-success-highlight",
      },
      warning: {
        inputContainer: "border-warning group-has-[input:focus]:border-warning-highlight",
        labelClasses: "group-has-[input:focus]:text-warning-highlight text-warning",
        helperTextClasses: "text-warning",
      },
      error: {
        inputContainer: "border-error group-has-[input:focus]:error-highlight",
        labelClasses: "text-error",
        helperTextClasses: "text-error",
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
  variant = "primary",
  size = "md",
  isDisabled = false,
  isAutofocused,
  placeholder,
  helperText,
  value,
  onChange,
  type = "text",
  action,
}: Props) {
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
          autoFocus={isAutofocused}
          className={inputClasses()}
          disabled={isDisabled}
          onChange={onChange}
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
