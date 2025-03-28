import {
  BarcodeScanner,
  Drawer,
  Navbar,
  Outlet,
  Sidebar,
  TanStackRouterDevtools,
  useBarcodeScanner,
  useScreenSize,
} from "@hospitality/hospitality-ui";

import { Modules } from "../enums";

const sections = [
  {
    title: "MODULES",
    links: Modules.map((module) => ({ title: module.title, to: `/${module.id}`, icon: module.icon })),
  },
];

export function Layout() {
  const { scannerState } = useBarcodeScanner();
  const { isLg } = useScreenSize();
  return (
    <main className="bg-layout relative flex h-screen w-screen flex-nowrap overflow-hidden">
      <Drawer />
      {scannerState.isOpen ? <BarcodeScanner /> : null}
      {isLg ? <Sidebar sections={sections} /> : null}
      <div className="flex w-full flex-col">
        <Navbar />
        <div className="overflow-auto p-4">
          <Outlet />
        </div>
        {isLg ? null : <Sidebar sections={sections} />}
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </main>
  );
}
