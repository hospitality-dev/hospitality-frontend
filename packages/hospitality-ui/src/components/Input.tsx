import { ChangeEvent } from "react";
import { tv } from "tailwind-variants";

import { Size, Variant } from "../types/baseTypes";

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
};

const classes = tv({
  slots: {
    container: "group flex h-fit w-full flex-col outline-0",
    inputClasses: "cursor-pointer rounded-md border-2 px-2 py-4 text-gray-900 outline-0",
    labelClasses: "font-small text-gray-900",
    helperTextClasses: "text-sm",
  },
  variants: {
    variant: {
      primary: {
        inputClasses: "border-gray-500 focus:border-blue-400",
      },
      secondary: {
        inputClasses: "border-gray-400 focus:border-blue-400",
      },
      info: {
        inputClasses: "border-blue-600 focus:border-blue-400",
      },
      success: {
        inputClasses: "border-green-600 focus:border-green-400",
      },
      warning: {
        inputClasses: "border-orange-600 group-has-[input:focus]:border-orange-400",
        labelClasses: "text-orange-600 group-has-[input:focus]:text-orange-400",
        helperTextClasses: "text-orange-600 group-has-[input:focus]:text-orange-400",
      },
      error: {
        inputClasses: "border-red-600 group-has-[input:focus]:border-red-400",
        labelClasses: "text-red-600",
        helperTextClasses: "text-red-600",
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
}: Props) {
  const { inputClasses, container, labelClasses, helperTextClasses } = classes({ variant, size, isDisabled });
  return (
    <div className={container()}>
      <label className={labelClasses()}>{label ? <span>{label}</span> : null}</label>
      <input
        autoFocus={isAutofocused}
        className={inputClasses()}
        disabled={isDisabled}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <p className={helperTextClasses()}>{helperText}</p>
    </div>
  );
}
