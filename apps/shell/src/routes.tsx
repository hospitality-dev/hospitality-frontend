/* eslint-disable camelcase */
import { AuthContextType, authFetchFunction, LoginResponse } from "@hospitality/hospitality-ui";
import { SettingsLayout } from "@hospitality/settings";
import { createRootRouteWithContext, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { queryClient } from "./App";
import { Layout } from "./components";
import { LocationSelect, Login } from "./pages";

const rootRoute = createRootRouteWithContext<AuthContextType>()({
  beforeLoad: async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return null;
    const auth = await queryClient.ensureQueryData<LoginResponse>({
      queryKey: ["users", userId],
      queryFn: () => authFetchFunction<LoginResponse>({ method: "GET", userReset: () => {}, route: "session" }),
    });
    return { auth };
  },
  component: Outlet,
});
const mainLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Layout,
  beforeLoad: (p) => {
    if (!p.context.auth?.user?.locationId) {
      throw redirect({
        to: "/location-select",
      });
    }
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,

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

const locationSelectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/location-select",
  component: LocationSelect,
});

// #region INVENTORY_ROUTES
const inventoryRootRoute = createRoute({ path: "inventory-management", getParentRoute: () => rootRoute, component: Outlet });
const invDashboard = createRoute({ getParentRoute: () => inventoryRootRoute, path: "dashboard" }).lazy(() =>
  import("@hospitality/inventory-management").then((d) => d.InvetoryDashboardRoute)
);
const invProductSettings = createRoute({ getParentRoute: () => inventoryRootRoute, path: "products/settings" }).lazy(() =>
  import("@hospitality/inventory-management").then((d) => d.InvetoryProductsSettingsRoute)
);
// #endregion INVENTORY_ROUTES

// #region SETTINGS_ROUTES
const settingsRootRoute = createRoute({ path: "settings", getParentRoute: () => rootRoute, component: SettingsLayout });
const settingsUsers = createRoute({ getParentRoute: () => settingsRootRoute, path: "users" }).lazy(() =>
  import("@hospitality/settings").then((d) => d.SettingsUsersRoute)
);
// #endregion SETTINGS_ROUTES

const routeTree = rootRoute.addChildren([
  mainLayout.addChildren([
    indexRoute,
    inventoryRootRoute.addChildren([invDashboard, invProductSettings]),
    settingsRootRoute.addChildren([settingsUsers]),
  ]),
  loginRoute,
  locationSelectRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    auth: null,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
