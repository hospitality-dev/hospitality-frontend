import { BarcodeScanner as Scanner } from "@capacitor-mlkit/barcode-scanning";
import { useEffect, useState } from "react";

import { Select } from "./Select";

export function BarcodeScanner() {
  const [videoDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevice, setVideoDevice] = useState<string>();
  // const closeBarcodeScanner = useResetAtom(barcodeScannerAtom);

  // function close(e: globalThis.KeyboardEvent) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (e.key === "Escape") closeBarcodeScanner();
  // }

  useEffect(() => {
    async function startScanning() {
      try {
        const result = await Scanner.scan();
        if (result.barcodes) {
          fetch("https://thearkive.requestcatcher.com/test", { method: "POST", body: JSON.stringify(result.barcodes) });
        }
      } catch (error) {
        console.error("Error scanning barcode", error);
      }
    }
    startScanning();
  }, []);

  return (
    <div className="bg-layout absolute top-0 left-0 z-50 flex h-screen w-screen flex-col p-4">
      <div className="relative flex h-full flex-col">
        <Select
          onChange={({ target }) => setVideoDevice(target.value)}
          options={videoDevices.map((d) => ({ label: d.label, value: d.deviceId }))}
          size="xl"
          value={videoDevice || ""}
        />
        <div className="absolute top-1/2 z-10 h-0.5 w-full bg-red-500" />
        <video height="200" id="barcode_scanner" width="300" />
      </div>
    </div>
  );
}
