import { AuthContextType, fetchFunction, getSearchParams, ResponseType, User, useReadProps } from "@hospitality/hospitality-ui";
import { createRootRouteWithContext, createRoute, createRouter } from "@tanstack/react-router";
import { z } from "zod";

import { queryClient } from "./App";
import { Layout } from "./components";
import { Login } from "./pages";
import { inventoryHome } from "../../inventory-management/src/routes";

const rootRoute = createRootRouteWithContext<AuthContextType>()({
  beforeLoad: async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return null;
    const user = await queryClient.ensureQueryData<ResponseType<User>>({
      queryKey: ["users", userId],
      queryFn: () =>
        fetchFunction({
          method: "GET",
          id: userId,
          model: "users",
          searchParams: getSearchParams<useReadProps<User>["fields"], useReadProps<User>["relations"]>(
            ["id", "firstName", "lastName", "username"],
            ["role"]
          ),
          userReset: () => {},
        }),
    });
    return { user };
  },
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    return "ROOT";
  },
});

const inventoryRoutes = createRoute({
  getParentRoute: () => rootRoute,
  path: "inventory/$",
});

inventoryRoutes.addChildren([inventoryHome(inventoryRoutes)]);

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => {
    return "DASHBOARD";
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  beforeLoad: (params) => {
    console.info(params.context);
  },
  path: "/login",
  validateSearch: z.object({
    code_challenge: z.string().optional(),
    code_challenge_method: z.literal("S256").optional(),
    redirect_uri: z.string().url().optional(),
    state: z.string().uuid().optional(),
  }),
  loaderDeps: ({ search }) => search,

  component: Login,
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, dashboardRoute, inventoryRoutes]);

export const router = createRouter({
  routeTree,
  context: {
    user: null,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
