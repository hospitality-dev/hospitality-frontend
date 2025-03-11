/* eslint-disable camelcase */
import {
  AuthContextType,
  authFetchFunction,
  fetchFunction,
  getLoginRoute,
  LoginResponse,
  ProductsCategories,
} from "@hospitality/hospitality-ui";
import { SettingsLayout } from "@hospitality/settings";
import { createRootRouteWithContext, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { queryClient } from "./App";
import { Layout } from "./components";
import { LocationSelect, Login } from "./pages";

const rootRoute = createRootRouteWithContext<AuthContextType>()({
  beforeLoad: async (c) => {
    const userId = localStorage.getItem("user_id");
    if (!userId && c.location.pathname !== "/login") {
      getLoginRoute();
      return;
    }
    if (c.location.pathname === "/login") {
      return { auth: null };
    }
    return {
      auth: await queryClient.ensureQueryData<LoginResponse>({
        queryKey: ["users", userId],
        queryFn: () => authFetchFunction<LoginResponse>({ method: "GET", userReset: () => {}, route: "session" }),
      }),
    };
  },
  component: Outlet,
});

const mainLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Layout,
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
  beforeLoad: (c) => {
    if (c.context.auth?.user?.locationId) {
      throw redirect({ to: "/settings/users" });
    }
  },
  path: "/location-select",
  component: LocationSelect,
});

// #region INVENTORY_ROUTES
const inventoryRootRoute = createRoute({ path: "inventory-management", getParentRoute: () => mainLayout, component: Outlet });
const invDashboard = createRoute({ getParentRoute: () => inventoryRootRoute, path: "dashboard" }).lazy(() =>
  import("@hospitality/inventory-management").then((d) => d.InvetoryDashboardRoute)
);

// #endregion INVENTORY_ROUTES

// #region SETTINGS_ROUTES
const settingsRootRoute = createRoute({ path: "settings", getParentRoute: () => mainLayout, component: SettingsLayout });
const settingsUsers = createRoute({ getParentRoute: () => settingsRootRoute, path: "users" }).lazy(() =>
  import("@hospitality/settings").then((d) => d.SettingsUsersRoute)
);
const settingsProducts = createRoute({
  getParentRoute: () => settingsRootRoute,
  path: "products",
  loader: async () =>
    queryClient.ensureQueryData<ProductsCategories[]>({
      queryKey: ["products_categories", "list"],
      queryFn: () =>
        fetchFunction<ProductsCategories[]>({
          method: "GET",
          userReset: () => {},
          searchParams: new URLSearchParams([["fields", "id,title"]]),
          model: "products_categories",
        }),
      staleTime: 5 * 60 * 1000,
    }),
}).lazy(() => import("@hospitality/settings").then((d) => d.SettingsProductsRoute));
// #endregion SETTINGS_ROUTES

const routeTree = rootRoute.addChildren([
  mainLayout.addChildren([
    inventoryRootRoute.addChildren([invDashboard]),
    settingsRootRoute.addChildren([settingsUsers, settingsProducts]),
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
