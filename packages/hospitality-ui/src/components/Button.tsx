import { tv } from "tailwind-variants";
import { Size, Variant } from "../types/baseTypes";

type Props = { label?: string; variant?: Variant; size?: Size };

const classes = tv({
  base: "shadow active:shadow-none rounded-md",
  variants: {
    variant: {
      primary: "bg-gray-700 hover:bg-gray-900 active:bg-gray-900",
      secondary: "bg-gray-300 hover:bg-gray-600 active:bg-gray-600",
      info: "bg-blue-500 hover:bg-blue-600  active:bg-blue-600 ",
      success: "bg-green-500 hover:bg-green-600  active:bg-green-600",
      warning: "bg-orange-500 hover:bg-orange-600  active:bg-orange-600",
      error: "bg-red-600 hover:bg-red-800  active:bg-red-800",
    },
    size: { xs: "", sm: "", md: "", lg: "", xl: "" },
  },
});

export default function Button({
  label,
  variant = "primary",
  size = "md",
}: Props) {
  return <button className={classes({ variant })}>{label}</button>;
}
