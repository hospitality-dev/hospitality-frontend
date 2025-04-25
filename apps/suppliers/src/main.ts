import { createLazyRoute } from "@hospitality/hospitality-ui";

import { SuppliersLayout } from "./components";
import { Suppliers } from "./pages/Suppliers";
export const SuppliersLayoutRoute = createLazyRoute("/suppliers")({
  component: SuppliersLayout,
});

export const SuppliersRoute = createLazyRoute("/")({
  component: Suppliers,
});
