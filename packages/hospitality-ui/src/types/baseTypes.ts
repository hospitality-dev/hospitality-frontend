import { Icons } from "../enums/icons";

export type Variant = "primary" | "secondary" | "info" | "success" | "warning" | "error";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type availableIcons = keyof typeof Icons;

export interface BaseEntityType {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
