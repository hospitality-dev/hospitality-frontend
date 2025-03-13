import { Result } from "@zxing/library";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import { barcodeScannerAtom } from "../../atoms";

export function useBarcodeScanner() {
  const [scannerState, setScannerState] = useAtom(barcodeScannerAtom);
  const closeBarcodeScanner = useResetAtom(barcodeScannerAtom);

  function setOnResult(onResult: (result: Result) => void) {
    setScannerState({ isOpen: true, onResult });
  }

  return { scannerState, closeBarcodeScanner, setOnResult };
}
