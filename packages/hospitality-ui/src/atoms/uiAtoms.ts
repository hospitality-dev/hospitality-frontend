import { atom } from "jotai";
type SidebarState = {
  isSidebarOpen: boolean;
  isModulesOpen: boolean;
};
export const sidebarStateAtom = atom<SidebarState>({ isSidebarOpen: false, isModulesOpen: true });
