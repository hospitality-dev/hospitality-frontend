import { QueryClient, QueryClientProvider, ReactQueryDevtools, RouterProvider } from "@hospitality/hospitality-ui";
import { router } from "./routes";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider context={{ user: null }} router={router} />

      <ReactQueryDevtools client={queryClient} />
    </QueryClientProvider>
  );
}
