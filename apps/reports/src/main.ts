import { createLazyRoute } from "@hospitality/hospitality-ui";

import { Reports } from "./pages";
export const ReportsRoute = createLazyRoute("/reports")({
  component: Reports,
});
