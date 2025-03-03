import { createLazyRoute } from "@hospitality/hospitality-ui";

export const InvetoryDashboard = createLazyRoute("/inventory-management/dashboard")({
  component: () => {
    return "INVENTORY DASHBOARD";
  },
});
