import { AnyRoute, createRoute } from "@hospitality/hospitality-ui";

export function inventoryHome(rootRoute: AnyRoute) {
  return createRoute({
    getParentRoute: () => rootRoute,
    path: "dashboard",
    component: () => {
      return "INVENTORY DASHBOARD";
    },
  });
}
