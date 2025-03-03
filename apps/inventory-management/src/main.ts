import { createLazyRoute } from "@hospitality/hospitality-ui";

export const InvetoryDashboard = createLazyRoute("/inventory/dashboard")({
  component: () => {
    return "INVENTORY DASHBOARD";
  },
});
