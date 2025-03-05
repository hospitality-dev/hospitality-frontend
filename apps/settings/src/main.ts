import { createLazyRoute } from "@hospitality/hospitality-ui";

import { UsersSettings } from "./pages";
export { SettingsLayout } from "./components";
export const SettingsUsersRoute = createLazyRoute("/settings/users")({
  component: UsersSettings,
});
