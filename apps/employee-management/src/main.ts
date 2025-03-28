import { createLazyRoute } from "@hospitality/hospitality-ui";

import { EmployeeManagement } from "./pages";
export const EmployeeManagementRoute = createLazyRoute("/employee-management")({
  component: EmployeeManagement,
});
