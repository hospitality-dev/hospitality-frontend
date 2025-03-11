import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
type SidebarState = {
  isSidebarOpen: boolean;
  isModulesOpen: boolean;
};
type DrawerState = {
  isOpen: boolean;
};
export const sidebarStateAtom = atom<SidebarState>({ isSidebarOpen: false, isModulesOpen: true });

export const drawerAtom = atomWithReset<DrawerState>({ isOpen: false });
