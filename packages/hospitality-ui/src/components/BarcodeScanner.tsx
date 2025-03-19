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

        // Function to get the resolution of a device by querying its capabilities
        async function getDeviceResolution(deviceId: string) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: deviceId } },
          });
          const track = stream.getVideoTracks()[0];
          const capabilities = track.getCapabilities();
          const width = capabilities.width ? capabilities.width.max || 0 : 0;
          const height = capabilities.height ? capabilities.height.max || 0 : 0;
          track.stop(); // Stop the stream once we have the capabilities
          return width * height;
        }

        // Find the best camera by resolution
        let bestDevice = null;
        let bestResolution = 0;
        for (const device of videoInputDevices) {
          const resolution = await getDeviceResolution(device.deviceId);
          if (resolution > bestResolution) {
            bestResolution = resolution;
            bestDevice = device;
          }
        }

        if (bestDevice) {
          const selectedDeviceId = bestDevice.deviceId;
          // Start the video stream with the best camera
          codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, error) => {
            if (result) {
              fetch("https://thearkive.requestcatcher.com/test", { method: "POST", body: JSON.stringify(result.getText()) });
            }
            if (error && isScanning) {
              console.error(error);
            }
          });
        }
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
