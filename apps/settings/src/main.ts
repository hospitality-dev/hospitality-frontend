import { createLazyRoute } from "@hospitality/hospitality-ui";

import { SettingsLayout } from "./components";
import { UsersSettings } from "./pages";
import { ProductSettings } from "./pages/ProductSettings";
export const SettingsLayoutRoute = createLazyRoute("/settings")({
  component: SettingsLayout,
});
export const SettingsUsersRoute = createLazyRoute("/settings/users")({
  component: UsersSettings,
});

export const SettingsProductsRoute = createLazyRoute("/settings/products")({
  component: ProductSettings,
});
