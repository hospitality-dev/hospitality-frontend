/* eslint-disable camelcase */
import {
  AuthContextType,
  authFetchFunction,
  getLoginRoute,
  locationsAvailableProductsFields,
  LocationsAvailableProductsQuery,
  LoginResponseType,
  ProductCategoriesQuery,
  productCategoryFields,
  QueryClient,
  RolesQuery,
  RolesType,
} from "@hospitality/hospitality-ui";
import {
  LocationsAvailableProductsSettingsType,
  ProductsCategoriesType,
} from "@hospitality/hospitality-ui/src/types/productTypes";
import { createRootRouteWithContext, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { Layout } from "./components";
import { LocationSelect, Login } from "./pages";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3 * 60 * 1000, // expressed in ms, equal to 3 mins
    },
  },
});

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
      auth: await queryClient.ensureQueryData<LoginResponseType>({
        queryKey: ["users", userId],
        queryFn: () => authFetchFunction<LoginResponseType>({ method: "GET", userReset: () => {}, route: "session" }),
      }),
    };
  },
  component: Outlet,
  // errorComponent: () => "ERROR",
  // onError: (err) => fetch("https://thearkive.requestcatcher.com/test", { method: "POST", body: JSON.stringify(err) }),
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
    if (!c.context.auth?.user) {
      throw redirect({ to: "/login" });
    }
  },
  path: "/location-select",
  component: LocationSelect,
});

// #region EMPLOYEE_ROUTES
const employeeManagementRoute = createRoute({
  path: "/employee-management",
  getParentRoute: () => mainLayout,
}).lazy(() => import("@hospitality/employee-management").then((d) => d.EmployeeManagementRoute));

// #endregion EMPLOYEE_ROUTES

// #region INVENTORY_ROUTES
const inventoryCategoryRoute = createRoute({
  path: "inventory-management",
  getParentRoute: () => mainLayout,
  loader: async (ctx) => {
    const categories = await queryClient.ensureQueryData<ProductsCategoriesType[]>(ProductCategoriesQuery);
    const firstCategoryId = categories.at(0)?.id;
    if (!("categoryId" in ctx.params) && firstCategoryId) {
      throw redirect({ to: `/inventory-management/$categoryId`, params: { categoryId: firstCategoryId } });
    }
  },

  component: Outlet,
});
const productInventoryRoute = createRoute({
  getParentRoute: () => inventoryCategoryRoute,
  path: "/$categoryId",
}).lazy(() => import("@hospitality/inventory-management").then((d) => d.ProductInventoryRoute));

// #endregion INVENTORY_ROUTES

// #region REPORT_ROUTES
const reportsRootRoute = createRoute({
  path: "reports",
  getParentRoute: () => mainLayout,
}).lazy(() => import("@hospitality/reports").then((d) => d.ReportsLayoutRoute));
const reportsDashboard = createRoute({
  getParentRoute: () => reportsRootRoute,
  path: "dashboard",
}).lazy(() => import("@hospitality/reports").then((d) => d.ReportsDashboardRoute));
const reportsGeneratedReports = createRoute({
  getParentRoute: () => reportsRootRoute,
  path: "generated-reports",
}).lazy(() => import("@hospitality/reports").then((d) => d.ReportsGeneratedReportsRoute));
// #endregion REPORT_ROUTES

// #region SETTINGS_ROUTES
const settingsRootRoute = createRoute({ path: "settings", getParentRoute: () => mainLayout }).lazy(() =>
  import("@hospitality/settings").then((d) => d.SettingsLayoutRoute)
);

const settingsUsers = createRoute({
  getParentRoute: () => settingsRootRoute,
  path: "user",
  loader: async () => {
    return {
      roles: await queryClient.ensureQueryData<RolesType[]>(RolesQuery),
    };
  },
}).lazy(() => import("@hospitality/settings").then((d) => d.SettingsUsersRoute));
const settingsLocation = createRoute({
  getParentRoute: () => settingsRootRoute,
  path: "location",
}).lazy(() => import("@hospitality/settings").then((d) => d.SettingsLocationRoute));
const settingsProducts = createRoute({
  getParentRoute: () => settingsRootRoute,
  path: "products",
  loader: async () => {
    return {
      locationsAvailableProducts:
        await queryClient.ensureQueryData<LocationsAvailableProductsSettingsType>(LocationsAvailableProductsQuery),
      categories: await queryClient.ensureQueryData<ProductsCategoriesType[]>(ProductCategoriesQuery),
      productCategoryFields,
      locationsAvailableProductsFields,
    };
  },
}).lazy(() => import("@hospitality/settings").then((d) => d.SettingsProductsRoute));

// #endregion SETTINGS_ROUTES

const routeTree = rootRoute.addChildren([
  mainLayout.addChildren([
    employeeManagementRoute,
    inventoryCategoryRoute.addChildren([productInventoryRoute]),
    settingsRootRoute.addChildren([settingsUsers, settingsLocation, settingsProducts]),
    reportsRootRoute.addChildren([reportsDashboard, reportsGeneratedReports]),
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
