import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { DrawerTypes } from "../types";
type SidebarState = {
  isSidebarOpen: boolean;
  isModulesOpen: boolean;
};
type DrawerState = {
  isOpen: boolean;
  type: DrawerTypes["type"] | null;
  data: DrawerTypes["data"] | null;
  title: string;
};
export const sidebarStateAtom = atom<SidebarState>({ isSidebarOpen: false, isModulesOpen: true });

export const drawerAtom = atomWithReset<DrawerState>({ isOpen: false, type: null, title: "", data: null });
