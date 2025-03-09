import { valueof } from "@hospitality/hospitality-ui/src";

import { Icons } from "../enums/icons";

// =========ENTITIES=========
export type AvailableEntities = "users" | "companies" | "locations" | "roles" | "products";
// =========COMPONENTS=========
export type Variant = "primary" | "secondary" | "info" | "success" | "warning" | "error";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type availableIcons = valueof<typeof Icons>;

export interface BaseEntityType {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// =========RESPONSE=========
export type ResponseType<T> = { data: T; ok: boolean; message: string };
