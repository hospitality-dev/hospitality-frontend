import { QueryClient, QueryClientProvider, ReactQueryDevtools, RouterProvider } from "@hospitality/hospitality-ui";

import { router } from "./routes";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3 * 60 * 1000, // expressed in ms, equal to 3 mins
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider context={{ auth: null }} router={router} />

      <ReactQueryDevtools client={queryClient} />
    </QueryClientProvider>
  );
}
