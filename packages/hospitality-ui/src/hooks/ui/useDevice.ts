import { useEffect, useState } from "react";

type DeviceType = "phone" | "tablet" | "desktop" | "unknown";

function detectDeviceType(ua: string): DeviceType {
  if (/iphone|android.*mobile|windows phone/.test(ua)) return "phone";
  if (/ipad|android(?!.*mobile)/.test(ua)) return "tablet";
  if (/mac|windows|linux/.test(ua)) return "desktop";
  return "unknown";
}

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown");

  useEffect(() => {
    const ua = navigator.userAgent;
    setDeviceType(detectDeviceType(ua.toLowerCase()));
  }, []);

  return deviceType;
}
