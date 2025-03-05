import { Link as TanstackLink, LinkOptions } from "@tanstack/react-router";
import * as React from "react";
import { tv } from "tailwind-variants";

import { Variant } from "../types";

const classes = tv({
  base: "inline cursor-pointer transition-colors",
  variants: {
    variant: {
      primary: "text-gray-900 hover:text-gray-400 active:text-gray-950",
      secondary: "text-white hover:text-gray-200 active:text-gray-500",
      info: "text-blue-500 hover:text-blue-300 active:text-blue-700",
      success: "text-green-500 hover:text-green-300 active:text-green-700",
      warning: "text-orange-500 hover:text-orange-300 active:text-orange-700",
      error: "text-red-600 hover:text-red-400 active:text-red-800",
    },
    isDisabled: {
      true: "cursor-not-allowed",
    },
  },
});

interface BasicLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target">, LinkOptions {
  isDisabled?: boolean;
  variant?: Variant;
}

export function Link(props: BasicLinkProps) {
  return (
    <TanstackLink
      {...props}
      className={classes({
        variant: props.variant || "primary",
        isDisabled: !!props?.isDisabled,
        className: props?.className || "",
      })}
      onClick={(e) => {
        if (props.isDisabled) {
          e.preventDefault();
        }
      }}
    />
  );
}
