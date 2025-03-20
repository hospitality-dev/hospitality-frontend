import { createLazyRoute } from "@hospitality/hospitality-ui";

import { ProductInventory } from "./pages";

export const InvetoryDashboardRoute = createLazyRoute("/inventory-management")({
  component: ProductInventory,
});
