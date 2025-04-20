import { createLazyRoute, UserProfile } from "@hospitality/hospitality-ui";

import { SettingsLayout } from "./components";
import { LocationSettings, ProductSettings } from "./pages";

export const SettingsLayoutRoute = createLazyRoute("/settings")({
  component: SettingsLayout,
});

export const SettingsUsersRoute = createLazyRoute("/settings/user")({
  component: UserProfile,
});

export const SettingsLocationRoute = createLazyRoute("/settings/location")({
  component: LocationSettings,
});

export const SettingsProductsRoute = createLazyRoute("/settings/products")({
  component: ProductSettings,
});
