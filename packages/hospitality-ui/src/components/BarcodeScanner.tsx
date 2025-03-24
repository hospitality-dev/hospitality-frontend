import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from "@zxing/library";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

import { barcodeScannerAtom } from "../atoms";
import { Icons } from "../enums";
import { useBarcodeScanner } from "../hooks";
import { Button } from "./Button";

const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8];
const hints = new Map();
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

export function BarcodeScanner() {
  const defaultCamera = localStorage.getItem("defaultCamera");
  const [isLoading, setIsLoading] = useState(!!defaultCamera);
  const videoRef = useRef(null);
  const { closeBarcodeScanner } = useBarcodeScanner();
  const { onResult } = useAtomValue(barcodeScannerAtom);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader(hints);

    async function startScanning() {
      try {
        setIsLoading(true);
        if (!defaultCamera) {
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
          let bestResolution = 0;
          for (const device of videoInputDevices) {
            const resolution = await getDeviceResolution(device.deviceId);
            if (resolution > bestResolution) {
              bestResolution = resolution;
              localStorage.setItem("defaultCamera", device.deviceId);
            }
          }
        }
        const camera = localStorage.getItem("defaultCamera");
        if (camera) {
          setIsLoading(false);
          // Start the video stream with the best camera
          codeReader.decodeFromVideoDevice(camera, videoRef.current, (result, error) => {
            if (result) {
              onResult(result);
              closeBarcodeScanner();
            }

            if (error) {
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
      setIsLoading(false);

      codeReader.reset();
    };
  }, []);

  return (
    <div className="bg-layout absolute top-0 left-0 z-[51] flex h-screen w-screen flex-col p-4">
      <div className="relative flex h-full flex-col justify-center">
        <div className="absolute top-0 right-0 z-[21] w-8">
          <Button
            icon={Icons.close}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeBarcodeScanner();
            }}
          />
        </div>
        {isLoading ? null : (
          <>
            <div className="absolute top-1/2 z-10 h-0.5 w-full bg-red-500" />
            <video ref={videoRef} className="aspect-square w-full" />
          </>
        )}
      </div>
    </div>
  );
}
