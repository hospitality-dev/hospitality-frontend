import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import { drawerAtom } from "../../atoms";

export function useDrawer() {
  const [drawer, setDrawer] = useAtom(drawerAtom);
  const closeDrawer = useResetAtom(drawerAtom);

  function openDrawer() {
    setDrawer((prev) => ({ ...prev, isOpen: true }));
  }

  return { drawer, openDrawer, closeDrawer };
}
