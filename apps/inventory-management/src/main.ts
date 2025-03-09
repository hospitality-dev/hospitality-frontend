import { createLazyRoute } from "@hospitality/hospitality-ui";

import { Dashboard } from "./pages";

export const InvetoryDashboardRoute = createLazyRoute("/inventory-management/dashboard")({
  component: Dashboard,
});
