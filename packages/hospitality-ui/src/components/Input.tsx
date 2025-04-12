import { MaskitoOptions } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { ValidationError } from "@tanstack/react-form";
import { ChangeEvent, FocusEventHandler, KeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { tv } from "tailwind-variants";
import { ZodIssue } from "zod";

import { countriesPhoneCodes } from "../enums";
import { AllowedInputTypes, availableIcons, OptionType, Size, Variant } from "../types/baseTypes";
import { defaultMask, formatErrorsForHelperText, numbersOnlyMask, phoneMask, websiteMask } from "../utils";
import { Button } from "./Button";
import { Select } from "./Select";

type Props<OT> = {
  label?: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  selectValue?: string | null;
  onSelectChange?: (item: OptionType<OT> | null) => void;
  helperText?: string;
  isDisabled?: boolean;
  isAutofocused?: boolean;
  variant?: Variant;
  size?: Size;
  placeholder?: string;
  type?: AllowedInputTypes;
  action?: {
    onClick: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: availableIcons;
    tooltip?: string;
  };
  errors?: ValidationError[] | ZodIssue[];
};

const masks: Record<AllowedInputTypes, MaskitoOptions> = {
  number: numbersOnlyMask,
  text: defaultMask,
  search: defaultMask,
  password: defaultMask,
  tel: phoneMask,
  url: websiteMask,
};

const classes = tv({
  slots: {
    container: "group flex h-fit w-full flex-col outline-0",
    inputContainer:
      "flex w-full cursor-pointer flex-nowrap items-center justify-between overflow-hidden rounded-md border bg-white px-2 text-gray-900 shadow-sm outline-0",
    inputClasses: "flex-1 pr-2 focus-within:outline-0 focus:outline-0",
    labelClasses: "font-small text-gray-900",
    helperTextClasses: "h-3.5 text-sm",
    selectClasses: "",
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
      xs: { labelClasses: "text-[10px]", inputClasses: "h-6 py-2 text-xs" },
      sm: { labelClasses: "text-xs", inputClasses: "h-7 py-2 text-sm" },
      md: { labelClasses: "text-sm", inputClasses: "h-8 text-base" },
      lg: { labelClasses: "text-lg", inputClasses: "h-9 text-lg" },
      xl: { labelClasses: "text-xl", inputClasses: "h-10 text-xl" },
    },
    type: {
      tel: {
        inputContainer: "pr-1 pl-0",
        selectClasses: "w-fit",
      },
      number: "",
      password: "",
      text: "",
      search: "",
      email: "",
      url: "",
    },
    isDisabled: { true: { inputClasses: "cursor-not-allowed" } },
  },
});

export function Input({
  label,
  name,
  variant = "primary",
  selectValue,
  onSelectChange,
  size = "md",
  isDisabled = false,
  isAutofocused,
  placeholder,
  helperText,
  value,
  onChange,
  onKeyDown,
  onBlur,
  type = "text",
  action,
  errors,
}: Props<(typeof countriesPhoneCodes)[number]["additionalData"]>) {
  const inputRef = useMaskito({ options: masks[type] });
  const { inputClasses, inputContainer, container, labelClasses, helperTextClasses, selectClasses } = classes({
    variant: errors?.length ? "error" : variant,
    size,
    isDisabled,
    type,
  });

  return (
    <div className={container()}>
      <label className={labelClasses()}>{label ? <span>{label}</span> : null}</label>

      <div className={inputContainer()}>
        {type === "tel" ? (
          <div className={selectClasses()}>
            <Select
              hasNoBorder
              onChange={(item) => {
                if (onSelectChange) onSelectChange(item);
              }}
              options={countriesPhoneCodes}
              value={selectValue}
            />
          </div>
        ) : null}
        <input
          ref={inputRef}
          autoComplete="off"
          autoFocus={isAutofocused}
          className={inputClasses()}
          disabled={isDisabled}
          name={name}
          onBlur={onBlur}
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
      <p className={helperTextClasses()}>{errors ? formatErrorsForHelperText(errors || []) : helperText}</p>
    </div>
  );
}
