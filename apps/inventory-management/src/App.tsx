import { QueryClient, QueryClientProvider } from "@hospitality/hospitality-ui";
import { RouterProvider } from "@tanstack/react-router";

import { router } from "./routes";
export const queryClient = new QueryClient({});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

function Routes() {
  return <RouterProvider context={{ user: null }} router={router} />;
}
