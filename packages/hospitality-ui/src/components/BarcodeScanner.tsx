import { BrowserMultiFormatReader } from "@zxing/library";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { barcodeScannerAtom } from "../atoms";
import { Select } from "./Select";

export function BarcodeScanner() {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevice, setVideoDevice] = useState<string>();
  const { onResult } = useAtomValue(barcodeScannerAtom);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();

    async function init() {
      setVideoDevices(await reader.listVideoInputDevices());
    }

    init();

    if (videoDevice) {
      reader.decodeFromVideoDevice(videoDevice, "barcode_scanner", (result) => {
        if (result) {
          onResult(result);
          fetch("https://thearkive.requestcatcher.com/test", { method: "POST", body: JSON.stringify(result.getText()) });
        }
      });
    }
  }, [videoDevice]);

  return (
    <div className="absolute top-0 left-0 z-50 flex h-screen w-screen flex-col bg-gray-200 p-4">
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
