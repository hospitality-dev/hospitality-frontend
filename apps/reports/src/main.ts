import { createLazyRoute } from "@hospitality/hospitality-ui";

import { ReportsLayout } from "./components";
import { GeneratedReports } from "./pages";
import { Dashboard } from "./pages/Dashboard";

export const ReportsLayoutRoute = createLazyRoute("/reports")({
  component: ReportsLayout,
});

export const ReportsDashboardRoute = createLazyRoute("/reports/dashboard")({
  component: Dashboard,
});

export const ReportsGeneratedReportsRoute = createLazyRoute("/reports/generated-reports")({
  component: GeneratedReports,
});
