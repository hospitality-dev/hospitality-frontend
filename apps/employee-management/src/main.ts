import { createLazyRoute, UserSettings } from "@hospitality/hospitality-ui";

import { EmployeeManagement } from "./pages";

export const EmployeeManagementRoute = createLazyRoute("/employee-management")({
  component: EmployeeManagement,
});

export const EmployeeProfileRoute = createLazyRoute("/employee-management/$userId")({
  component: UserSettings,
});
