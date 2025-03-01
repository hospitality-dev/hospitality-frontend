import { UpdaterFn } from "@tanstack/react-form";
import { ChangeEvent } from "react";
import { tv } from "tailwind-variants";

import { Size, Variant } from "../types/baseTypes";

type Props = {
  label?: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => UpdaterFn<string | number | undefined, void> | undefined;
  helperText?: string;
  isDisabled?: boolean;
  variant?: Variant;
  size?: Size;
  placeholder?: string;
};

// const classes = tv({
//   base: "cursor-pointer rounded-lg border-2 p-2 font-medium text-black shadow",
//   variants: {
//     variant: {
//       primary: "border-gray-900 focus:outline-gray-600",
//       secondary: "border-gray-600 focus:outline-gray-400",
//       info: "border-blue-600 focus:outline-blue-400",
//       success: "border-green-600 focus:outline-green-400",
//       warning: "border-orange-600 focus:outline-orange-400",
//       error: "border-red-800 focus:outline-red-500",
//     },
//     size: { xs: "h-6 w-32 text-xs", sm: "h-7 w-36 text-sm", md: "h-8 w-38", lg: "h-9 w-42 text-lg", xl: "h-10 w-48 text-xl" },
//     isDisabled: { true: "cursor-not-allowed", false: "" },
//   },
// });

const classes = tv({
  slots: {
    inputClasses: "cursor-pointer rounded-lg border-2 px-2 py-4 text-gray-900",
    container: "flex h-fit w-full flex-col",
    labelClasses: "font-small text-gray-900",
  },
  variants: {
    variant: {
      primary: {
        inputClasses: "border-gray-900 focus:outline-gray-600",
      },
      secondary: {
        inputClasses: "border-gray-600 focus:outline-gray-400",
      },
      info: {
        inputClasses: "border-blue-600 focus:outline-blue-400",
      },
      success: {
        inputClasses: "border-green-600 focus:outline-green-400",
      },
      warning: {
        inputClasses: "border-orange-600 focus:outline-orange-400",
        labelClasses: "text-orange-600",
      },
      error: {
        inputClasses: "border-red-800 focus:outline-red-500",
        labelClasses: "text-red-800",
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
  placeholder,
  helperText,
  value,
  onChange,
}: Props) {
  const { inputClasses, container, labelClasses } = classes({ variant, size, isDisabled });
  return (
    <div className={container()}>
      <label className={labelClasses()}>{label ? <span>{label}</span> : null}</label>
      <input className={inputClasses()} disabled={isDisabled} onChange={onChange} placeholder={placeholder} value={value} />
      <p>{helperText}</p>
    </div>
  );
}
