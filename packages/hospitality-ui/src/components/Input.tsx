import { tv } from "tailwind-variants";

import { availableIcons, Size, Variant } from "../types/baseTypes";

type Props = {
  label?: string;
  variant?: Variant;
  size?: Size;
  isOutline?: boolean;
  icon?: availableIcons;
};

export function Input(props: Props) {
  return <div>Input</div>;
}
