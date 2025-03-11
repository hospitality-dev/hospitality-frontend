import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import { drawerAtom } from "../../atoms";
import { DrawerTypes } from "../../types";

export function useDrawer(title: string, type: DrawerTypes["type"]) {
  const [drawer, setDrawer] = useAtom(drawerAtom);
  const closeDrawer = useResetAtom(drawerAtom);

  function openDrawer() {
    setDrawer((prev) => ({ ...prev, title, isOpen: true, type }));
  }

  return { drawer, openDrawer, closeDrawer };
}
