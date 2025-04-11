import { QueryClientProvider, RouterProvider } from "@hospitality/hospitality-ui";

import { queryClient, router } from "./routes";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider context={{ auth: null }} router={router} />
    </QueryClientProvider>
  );
}
