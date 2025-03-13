import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import { drawerAtom } from "../../atoms";
import { DrawerTypes } from "../../types";

export function useDrawer<T extends DrawerTypes["type"]>(title: string, type: T) {
  const [drawer, setDrawer] = useAtom(drawerAtom);
  const closeDrawer = useResetAtom(drawerAtom);

  function openDrawer(data?: DrawerTypes["data"] | null) {
    setDrawer((prev) => ({ ...prev, title, isOpen: true, type, data }));
  }

  return { drawer, openDrawer, closeDrawer };
}
