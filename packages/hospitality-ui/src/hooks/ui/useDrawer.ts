import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import { drawerAtom, DrawerTypes } from "../../atoms";

type DrawerData<T extends DrawerTypes["type"]> = Extract<DrawerTypes, { type: T }>["data"];

export function useDrawer<T extends DrawerTypes["type"]>(type: T, closeOnOutsideClick?: boolean) {
  const [drawer, setDrawer] = useAtom(drawerAtom);
  const closeDrawer = useResetAtom(drawerAtom);

  function openDrawer(title: DrawerTypes["title"], data?: DrawerData<T>) {
    if (data === null || type === null) return;

    // @ts-expect-error TS can't differentiate the type well enough even though it's correct
    setDrawer((prev) => ({
      ...prev,
      title,
      type,
      data,
      closeOnOutsideClick,
      isOpen: true,
    }));
  }

  return { drawer, openDrawer, closeDrawer };
}
