import { valueof } from "@hospitality/hospitality-ui/src";

import { Icons } from "../enums/icons";

// =========ENTITIES=========
export type AvailableEntities = "users" | "companies" | "locations" | "roles" | "products" | "products_categories";
// =========COMPONENTS=========
export type Variant = "primary" | "secondary" | "info" | "success" | "warning" | "error";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type DrawerTypes =
  | { type: "products_categories"; data?: { id?: string } }
  | { type: "products"; data: { id: string } | { categoryId: string } };

export type availableIcons = valueof<typeof Icons>;

// =========RESPONSE=========
export type ResponseType<T> = { data: T; ok: boolean; message: string };
