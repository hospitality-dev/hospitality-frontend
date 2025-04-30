import { Result } from "@zxing/library";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { ActionType, AllowedFileTypes, AllowedUploadTypes, Size, Variant } from "../types";

type SidebarState = {
  isSidebarOpen: boolean;
  isModulesOpen: boolean;
};

export type DrawerTypes = (
  | { type: null; data: null }
  | { type: "products_categories"; data?: { id?: string } }
  | { type: "create_products"; data: { id?: string; categoryId?: string; barcode?: string } }
  | {
      type: "manage_product_inventory";
      data: { id?: string; barcode?: string } & (
        | { type: "add_products"; categoryId: string }
        | { type: "remove_products"; categoryId: string; maxAmount: number }
      );
    }
  | {
      type: "upload";
      data: { id: string; types: AllowedFileTypes[]; isMultiple?: boolean; uploadType: AllowedUploadTypes };
    }
  | {
      type: "add_new_user" | "add_user_from_location" | "create_manufacturer" | "create_supplier";
      data: null;
    }
  | {
      type: "create_brand";
      data: { parentId: string };
    }
  | { type: "create_purchases"; data: { url: string } }
  //* for modify_purchase ID is the purchase ID i.e. the purchase_items' parent_id field
  | { type: "modify_purchase"; data: { id: string } }
  | { type: "update_supplier"; data: { id: string } }
) & { title: string };

type DrawerState = {
  isOpen: boolean;
  closeOnOutsideClick?: boolean;
  title: string;
  size?: Size;
} & DrawerTypes;

export type DialogState = {
  isOpen: boolean;
  title: string;
  description?: { content: string; variant?: Variant };
  actions?: ActionType[];
};
type BarcodeScannerState = {
  isOpen: boolean;
  onResult: (result: Result) => void;
};

// ======================
export const sidebarStateAtom = atom<SidebarState>({ isSidebarOpen: false, isModulesOpen: true });
// ======================
export const drawerAtom = atomWithReset<DrawerState>({ isOpen: false, type: null, title: "", data: null });
// ======================
export const dialogAtom = atomWithReset<DialogState>({ isOpen: false, actions: [], title: "", description: undefined });
// ======================
export const barcodeScannerAtom = atomWithReset<BarcodeScannerState>({ isOpen: false, onResult: () => {} });
