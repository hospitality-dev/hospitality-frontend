import { createLazyRoute } from "@hospitality/hospitality-ui";

import { Dashboard, ProductSettings } from "./pages";

export const InvetoryDashboardRoute = createLazyRoute("/inventory-management/dashboard")({
  component: Dashboard,
});

export const InvetoryProductsSettingsRoute = createLazyRoute("/inventory-management/products/settings")({
  component: ProductSettings,
});
