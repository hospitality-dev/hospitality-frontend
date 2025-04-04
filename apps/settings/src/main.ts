import { createLazyRoute } from "@hospitality/hospitality-ui";

import { SettingsLayout } from "./components";
import { LocationSettings } from "./pages";
import { ProductSettings } from "./pages/ProductSettings";
export const SettingsLayoutRoute = createLazyRoute("/settings")({
  component: SettingsLayout,
});
export const SettingsLocationRoute = createLazyRoute("/settings/location")({
  component: LocationSettings,
});

export const SettingsProductsRoute = createLazyRoute("/settings/products")({
  component: ProductSettings,
});
