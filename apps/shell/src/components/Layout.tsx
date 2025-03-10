import { getSentenceCase, Navbar, Outlet, Sidebar, TanStackRouterDevtools } from "@hospitality/hospitality-ui";

import { AvailableModules } from "../enums";

const sections = [
  {
    title: "MODULES",
    links: AvailableModules.map((module) => ({ title: getSentenceCase(module), to: `${module}/dashboard` })),
  },
];

export function Layout() {
  return (
    <main className="flex h-screen w-screen flex-nowrap overflow-hidden bg-gray-200">
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
