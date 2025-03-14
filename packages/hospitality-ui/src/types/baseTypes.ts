import { valueof } from "@hospitality/hospitality-ui/src";

import { Icons } from "../enums/icons";

// =========ENTITIES=========
export type AvailableEntities = "users" | "companies" | "locations" | "roles" | "products" | "products_categories";
// =========COMPONENTS=========
export type Variant = "primary" | "secondary" | "info" | "success" | "warning" | "error";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type OptionType = { label: string; value: string };

export type PositionType = (
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "right-start"
  | "right-end"
  | "left-start"
  | "left-end"
  | "bottom-start"
  | "top-start"
  | "top-end"
  | "bottom-end"
)[];

export type availableIcons = valueof<typeof Icons>;
export type IconThickness = "thin" | "light" | "regular" | "bold" | "fill";
export interface IconType {
  icon: availableIcons;
  fontSize?: number;
  color?: string;
  hFlip?: boolean;
  vFlip?: boolean;
  className?: string;
  thickness?: IconThickness;
}

// =========RESPONSE=========
export type ResponseType<T> = { data: T; ok: boolean; message: string };
