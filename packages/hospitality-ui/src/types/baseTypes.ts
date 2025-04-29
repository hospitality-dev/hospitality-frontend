import { Placement } from "@floating-ui/react";
import {
  AvailableActionsEnum,
  AvailableEntitiesEnum,
  AvailableFileTypes,
  AvailableSearchableEntitiesEnum,
  valueof,
} from "@hospitality/hospitality-ui/src";
import { AnyRoute, ReactNode } from "@tanstack/react-router";
import { HTMLInputTypeAttribute, MouseEventHandler } from "react";

import { Icons } from "../enums/icons";

// =========ENTITIES=========
export type AvailableEntities = (typeof AvailableEntitiesEnum)[number];
export type AvailableActions = (typeof AvailableActionsEnum)[number];
export type AvailableSearchableEntities = (typeof AvailableSearchableEntitiesEnum)[number];
// =========COMPONENTS=========
export type Variant = "primary" | "secondary" | "info" | "success" | "warning" | "error";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type AvailableIcons = valueof<typeof Icons>;
export type IconThickness = "thin" | "light" | "regular" | "bold" | "fill";

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

export type OptionType = {
  id: string;
  label: string;
  description?: string;
  value: string;
  isDisabled?: boolean;
  image?: string;
  icon?: string;
  additionalData?: Record<string, string | string[] | number | number[] | null>;
};

export type DropdownItemType = {
  id: string;
  allowedPlacements?: PositionType;
  title?: string;
  child?: ReactNode;
  icon?: AvailableIcons;
  image?: string;
  iconColor?: string;
  iconThickness?: IconThickness;
  subItems?: DropdownItemType[];
  isDisabled?: boolean;
  isHidden?: boolean;
  onClick?: () => void;
  variant?: Variant;
  tooltip?: string;
  placement?: Placement;
};

export type ActionType = {
  id: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  isDisabled?: boolean;
  icon?: AvailableIcons;
  iconColor?: string;
  iconThickness?: IconThickness;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  items?: DropdownItemType[];
  allowedPlacements?: Placement[];
};

export interface IconType {
  icon: AvailableIcons;
  fontSize?: number;
  color?: string;
  hFlip?: boolean;
  vFlip?: boolean;
  className?: string;
  thickness?: IconThickness;
}
export type AllowedInputTypes =
  | Extract<HTMLInputTypeAttribute, "text" | "number" | "tel" | "search" | "password" | "url" | "date">
  | "datetime"
  | "whatsapp";

export type AllowedFileTypes = (typeof AvailableFileTypes)[number];

export type AllowedUploadTypes =
  | "company_logo"
  | "location_logo"
  | "company_image"
  | "location_image"
  | "user_avatar"
  | "product_image";

export type TabType = {
  id: string;
  title: string;
  link?: AnyRoute["to"];
  isNavControlled?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
};

export type TableStateType<T> = {
  page?: number | null;
  sort?: { field: keyof T; type: "asc" | "desc" } | null;
};
export type TableActionType<T> =
  | { type: "SET_PAGE"; page: number | null }
  | { type: "SET_SORT"; sort: { type: "asc" | "desc"; field: keyof T } | null }
  | { type: "RESET" };

export type TableExpandableTypes = "product_grouped_by_expiration_date" | "purchases" | "suppliers" | "manufacturers";

// =========REQUEST=========
type RequestFilterOperators = "eq" | "neq" | "gt" | "gte" | "is" | "is not" | "in" | "not in" | "ilike";
type RequestFilterType<T> = {
  field: keyof T;
  operator: RequestFilterOperators;
  value: string | number | string[] | number[] | RequestFilterType<T>;
};
type RequestFilterBase<T> = {
  and?: (RequestFilterType<T> | RequestFilterBase<T>[])[];
  or?: (RequestFilterType<T> | RequestFilterBase<T>[])[];
};
export type RequestFilters<T> = RequestFilterBase<T>;
// =========RESPONSE=========
export type ResponseType<T> = { data: T; ok: boolean; message: string };
