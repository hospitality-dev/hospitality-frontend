import { useAtom, useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";

import { dialogAtom, DialogState } from "../../atoms";

export function useDialog() {
  const [dialog, setDialog] = useAtom(dialogAtom);
  const closeDialog = useResetAtom(dialogAtom);

  function openDialog(d: Omit<DialogState, "isOpen">) {
    setDialog(() => ({
      ...d,
      isOpen: true,
    }));
  }

  return { dialog, openDialog, closeDialog };
}

export function useDialogValue() {
  return useAtomValue(dialogAtom);
}
