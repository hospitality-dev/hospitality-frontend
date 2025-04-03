import { Result } from "@zxing/library";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

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
      type: "add_new_user";
      data: null;
    }
  | {
      type: "add_user_from_location";
      data: null;
    }
) & { title: string };

type DrawerState = {
  isOpen: boolean;
  closeOnOutsideClick?: boolean;
  title: string;
} & DrawerTypes;

type BarcodeScannerState = {
  isOpen: boolean;
  onResult: (result: Result) => void;
};

// ======================
export const sidebarStateAtom = atom<SidebarState>({ isSidebarOpen: false, isModulesOpen: true });
// ======================
export const drawerAtom = atomWithReset<DrawerState>({ isOpen: false, type: null, title: "", data: null });
// ======================
export const barcodeScannerAtom = atomWithReset<BarcodeScannerState>({ isOpen: false, onResult: () => {} });
