/* eslint-disable camelcase */
import { Navbar, QueryClient, QueryClientProvider, Sidebar } from "@hospitality/hospitality-ui";
import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { z } from "zod";

import { Login } from "./pages";
const queryClient = new QueryClient({});
const rootRoute = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-screen w-screen flex-nowrap">
          <Sidebar />
          <div className="flex w-full flex-col">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  loader: () => {
    fetch("http://localhost:4000/api/v1/users", { credentials: "include" });
    // throw redirect({
    //   search: { code_challenge: "", code_challenge_method: "S256", state: "", redirect_uri: "" },
    //   to: "/login",
    // });
  },
  path: "/",
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  validateSearch: z.object({
    code_challenge: z.string(),
    code_challenge_method: z.literal("S256"),
    redirect_uri: z.string().url(),
    state: z.string().uuid(),
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    if (!deps?.code_challenge || !deps?.code_challenge_method || !deps?.redirect_uri || !deps?.state) {
      throw redirect({ to: "/" });
    }
  },
  component: Login,
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
