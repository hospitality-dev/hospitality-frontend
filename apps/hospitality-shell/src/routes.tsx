import {
  AuthContextType,
  fetchFunction,
  getSearchParams,
  ResponseType,
  Link,
  User,
  useReadProps,
} from "@hospitality/hospitality-ui";
import { createRootRouteWithContext, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import { z } from "zod";

import { queryClient } from "./App";
import { Layout } from "./components";
import { Login } from "./pages";

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
    return (
      <div>
        <Link to="/inventory/dashboard">INVENTORY</Link>
        <br />
        ROOT
      </div>
    );
  },
});

// const inventoryRoutes = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "inventory",
// });
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
const inventoryRootRoute = createRoute({ path: "inventory", getParentRoute: () => rootRoute, component: Outlet });
const invRoutes = createRoute({ getParentRoute: () => inventoryRootRoute, path: "dashboard" }).lazy(() =>
  import("@hospitality/inventory-management").then((d) => d.InvetoryDashboard)
);

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, dashboardRoute, inventoryRootRoute.addChildren([invRoutes])]);

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
