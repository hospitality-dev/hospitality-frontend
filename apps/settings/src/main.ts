import { createLazyRoute } from "@hospitality/hospitality-ui";

import { UsersSettings } from "./pages";
import { ProductSettings } from "./pages/ProductSettings";
export { SettingsLayout } from "./components";
export const SettingsUsersRoute = createLazyRoute("/settings/users")({
  component: UsersSettings,
});

export const SettingsProductsRoute = createLazyRoute("/settings/products")({
  component: ProductSettings,
});
