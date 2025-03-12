import { Drawer, getSentenceCase, Navbar, Outlet, Sidebar, TanStackRouterDevtools } from "@hospitality/hospitality-ui";

import { Modules } from "../enums";

const sections = [
  {
    title: "MODULES",
    links: Modules.map((module) => ({ title: getSentenceCase(module), to: `${module}/dashboard` })),
  },
];

export function Layout() {
  return (
    <main className="relative flex h-screen w-screen flex-nowrap overflow-hidden bg-gray-200">
      <Drawer />
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
