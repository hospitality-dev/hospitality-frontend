import { MaskitoOptions } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { ValidationError } from "@tanstack/react-form";
import { ChangeEvent, FocusEventHandler, HTMLAttributes, KeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { tv } from "tailwind-variants";
import { ZodIssue } from "zod";

import { Icons } from "../enums";
import { useList } from "../hooks";
import { AllowedInputTypes, AvailableIcons, OptionType, Size, Variant } from "../types/baseTypes";
import { CountriesType } from "../types/worldTypes";
import {
  dateMask,
  dateTimeMask,
  defaultMask,
  formatErrorsForHelperText,
  formatPhoneForOptions,
  phoneMask,
  websiteMask,
  whatsAppMask,
} from "../utils";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Select } from "./Select";

type Props = {
  label?: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  selectValue?: string | null;
  onSelectChange?: (item: OptionType | null) => void;
  helperText?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isAutofocused?: boolean;
  variant?: Variant;
  size?: Size;
  placeholder?: string;
  type?: AllowedInputTypes;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  action?: {
    onClick: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: AvailableIcons;
    tooltip?: string;
  };
  errors?: ValidationError[] | ZodIssue[];
  step?: string;
  options?: OptionType[];
};

const masks: Record<AllowedInputTypes, MaskitoOptions | null> = {
  text: defaultMask,
  number: null,
  search: defaultMask,
  password: defaultMask,
  tel: phoneMask,
  url: websiteMask,
  datetime: dateTimeMask,
  date: dateMask,
  whatsapp: whatsAppMask,
};

const classes = tv({
  slots: {
    container: "group flex h-fit w-full flex-col outline-0",
    inputContainer:
      "flex w-full cursor-pointer flex-nowrap items-center overflow-hidden rounded-md border bg-white px-2 text-gray-900 shadow-sm outline-0",
    inputClasses: "flex-1 pr-2 focus-within:outline-0 focus:outline-0",
    labelClasses: "font-small text-gray-900",
    helperTextClasses: "h-3.5 text-sm",
    selectClasses: "[&>div>div>div:focus]:rounded-l-none [&>div>div>div:focus]:border-y-0 [&>div>div>div:focus]:border-r-0",
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
      date: "",
      datetime: "",
      whatsapp: "",
    },
    isDisabled: { true: { inputContainer: "bg-secondary cursor-not-allowed", inputClasses: "cursor-not-allowed" } },
    isLoading: {
      true: { inputContainer: "cursor-not-allowed bg-gray-200", inputClasses: "cursor-not-allowed text-gray-300" },
    },
    hasRightSelect: {
      true: {
        inputContainer: "pr-0",
        selectClasses: "truncate",
      },
    },
  },
});

function TelephoneSelect({ selectValue, onSelectChange }: Pick<Props, "onSelectChange" | "selectValue">) {
  const { data } = useList<CountriesType>(
    { model: "resources", fields: ["id", "title", "iso3", "phonecode"] },
    { urlSuffix: "countries", staleTime: Infinity }
  );

  return (
    <Select
      hasNoBorder
      hasSearch
      onChange={(item) => {
        if (onSelectChange && item)
          onSelectChange({
            id: item?.id,
            value: item?.value,
            label: item?.label,
            image: item?.image,
            additionalData: {
              phonecode: item?.additionalData?.phonecode as string,
              selectedLabel: `+${item?.additionalData?.phonecode || "0"}`,
            },
          });
      }}
      options={formatPhoneForOptions(data)}
      value={selectValue}
    />
  );
}

export function Input({
  label,
  variant = "primary",
  selectValue,
  onSelectChange,
  size = "md",
  isDisabled = false,
  isLoading,
  isAutofocused,
  placeholder,
  helperText,
  value,
  onChange,
  onKeyDown,
  onBlur,
  type = "text",
  inputMode = "text",
  errors,
  action,
  step = "any",
  options,
}: Props) {
  const inputRef = useMaskito({ options: masks[type] });
  const { inputClasses, inputContainer, container, labelClasses, helperTextClasses, selectClasses } = classes({
    variant: errors?.length ? "error" : variant,
    size,
    isDisabled,
    isLoading,
    type,
    hasRightSelect: !!options?.length,
  });

  return (
    <div className={container()}>
      <label className={labelClasses()}>{label ? <span>{label}</span> : null}</label>

      <div className={inputContainer()}>
        {type === "tel" ? (
          <div className={selectClasses()}>
            <TelephoneSelect onSelectChange={onSelectChange} selectValue={selectValue} />
          </div>
        ) : null}
        <input
          ref={inputRef}
          aria-autocomplete="none"
          autoComplete="new-password"
          autoFocus={isAutofocused}
          className={inputClasses()}
          disabled={isDisabled || isLoading}
          inputMode={inputMode}
          onBlur={onBlur}
          onInput={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          step={step}
          type={type === "date" ? "text" : type}
          value={value}
        />
        {action && !isLoading ? (
          <span className="top-0.5 right-2 w-fit">
            <Button
              hasNoBorder
              icon={action.icon}
              isDisabled={isDisabled || isLoading}
              isOutline
              onClick={action.onClick}
              size="md"
            />
          </span>
        ) : null}
        {isLoading ? <Icon className="animate-spin" icon={Icons.loading} /> : null}
        {options?.length ? (
          <div className={selectClasses()}>
            <Select
              hasNoBorder
              isDisabled={isDisabled || isLoading}
              onChange={(item) => {
                if (onSelectChange) onSelectChange(item);
              }}
              options={options}
              value={selectValue}
            />
          </div>
        ) : null}
      </div>
      {errors?.length || helperText ? (
        <p className={helperTextClasses()}>{formatErrorsForHelperText(errors || []) || helperText}</p>
      ) : null}
    </div>
  );
}
