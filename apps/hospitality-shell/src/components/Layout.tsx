import { Navbar, Outlet, Sidebar, TanStackRouterDevtools } from "@hospitality/hospitality-ui";

export function Layout() {
  return (
    <main className="flex h-screen w-screen flex-nowrap overflow-hidden bg-gray-200">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Navbar />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </main>
  );
}
