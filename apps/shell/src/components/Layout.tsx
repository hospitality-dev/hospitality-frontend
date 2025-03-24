import {
  BarcodeScanner,
  Drawer,
  getSentenceCase,
  Navbar,
  Outlet,
  Sidebar,
  TanStackRouterDevtools,
  useBarcodeScanner,
} from "@hospitality/hospitality-ui";

import { Modules } from "../enums";

const sections = [
  {
    title: "MODULES",
    links: Modules.map((module) => ({ title: getSentenceCase(module.id), to: `/${module.id}`, icon: module.icon })),
  },
];

export function Layout() {
  const { scannerState } = useBarcodeScanner();
  return (
    <main className="bg-layout relative flex h-screen w-screen flex-nowrap overflow-hidden">
      <Drawer />
      {scannerState.isOpen ? <BarcodeScanner /> : null}
      <Sidebar sections={sections} />
      <div className="flex w-full flex-col">
        <Navbar />
        <div className="overflow-auto p-4">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </main>
  );
}
