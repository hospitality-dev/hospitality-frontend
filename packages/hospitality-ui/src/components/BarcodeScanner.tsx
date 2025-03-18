import { BrowserMultiFormatReader } from "@zxing/library";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useEffect, useState } from "react";

import { barcodeScannerAtom } from "../atoms";
import { Select } from "./Select";

export function BarcodeScanner() {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevice, setVideoDevice] = useState<string>();
  const { onResult } = useAtomValue(barcodeScannerAtom);
  const closeBarcodeScanner = useResetAtom(barcodeScannerAtom);

  function close(e: globalThis.KeyboardEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "Escape") closeBarcodeScanner();
  }

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    async function init() {
      const devices = await reader.listVideoInputDevices();
      if (devices.length) {
        setVideoDevices(devices);
        fetch("https://thearkive.requestcatcher.com/test", {
          method: "POST",
          body: JSON.stringify(devices.map((d) => d.label)),
        });
        setVideoDevice(devices[0].deviceId);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (videoDevice) {
      const reader = new BrowserMultiFormatReader();

      reader.decodeFromVideoDevice(videoDevice, "barcode_scanner", (result) => {
        if (result) {
          onResult(result);
          fetch("https://thearkive.requestcatcher.com/test", { method: "POST", body: JSON.stringify(result.getText()) });
        }
      });
    }
    document.addEventListener("keydown", close);

    return () => {
      document.removeEventListener("keydown", close);
    };
  }, [videoDevice]);

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
        <video className="aspect-square h-full w-full" id="barcode_scanner" />
      </div>
      {/* <Scanner
        classNames={{
          container: "max-w-52",
        }}
        components={{ zoom: true, torch: true, finder: true }}
        constraints={{
          deviceId: d?.[3]?.deviceId,
        }}
        formats={["code_39", "code_93", "code_128", "ean_8", "ean_13", "itf"]}
        onError={(result) =>
          fetch("https://thearkive.requestcatcher.com/test", { method: "POST", body: JSON.stringify(result) })
        }
        onScan={(result) =>
          fetch("https://thearkive.requestcatcher.com/test", { method: "POST", body: JSON.stringify(result) })
        }
        paused={false}
      /> */}
    </div>
  );
}
