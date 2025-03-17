import { Result } from "@zxing/library";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

type SidebarState = {
  isSidebarOpen: boolean;
  isModulesOpen: boolean;
};

export type DrawerTypes =
  | { type: null; data: null }
  | { type: "products_categories"; data?: { id?: string } }
  | { type: "products"; data: { id?: string; categoryId?: string; barcode?: string } };

type DrawerState = {
  isOpen: boolean;

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
