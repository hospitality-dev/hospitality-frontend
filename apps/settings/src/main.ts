import { createLazyRoute } from "@hospitality/hospitality-ui";

import { SettingsLayout } from "./components";
import { LocationSettings, ProductSettings, UserSettings } from "./pages";

export const SettingsLayoutRoute = createLazyRoute("/settings")({
  component: SettingsLayout,
});

export const SettingsUsersRoute = createLazyRoute("/settings/user")({
  component: UserSettings,
});

export const SettingsLocationRoute = createLazyRoute("/settings/location")({
  component: LocationSettings,
});

export const SettingsProductsRoute = createLazyRoute("/settings/products")({
  component: ProductSettings,
});
