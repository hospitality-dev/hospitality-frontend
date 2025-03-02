import { Navbar, Outlet, QueryClient, QueryClientProvider, Sidebar, TanStackRouterDevtools } from "@hospitality/hospitality-ui";

const queryClient = new QueryClient({});

export function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-screen flex-nowrap">
        <Sidebar />
        <div className="flex w-full flex-col">
          <Navbar />
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
}
