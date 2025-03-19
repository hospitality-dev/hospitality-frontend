import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useRef, useState } from "react";

export function BarcodeScanner() {
  const videoRef = useRef(null);
  const [barcode] = useState(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let isScanning = true;

    async function startScanning() {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        const selectedDeviceId = videoInputDevices[0].deviceId;

        codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, error) => {
          if (result) {
            fetch("https://thearkive.requestcatcher.com/test", { method: "POST", body: JSON.stringify(result.getText()) });
          }
          if (error && isScanning) {
            console.error(error);
          }
        });
      } catch (err) {
        console.error("Error starting barcode scanner:", err);
      }
    }

    startScanning();

    return () => {
      isScanning = false;
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} height="auto" width="100%" />
      {barcode && (
        <div>
          <h2>Scanned Barcode:</h2>
          <p>{barcode}</p>
        </div>
      )}
    </div>
  );
}
